import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { RoomConfig } from "../types/config";
import { computeRoomBounds } from "../utils/config";
import type { VisualLightState } from "../utils/color";
import { buildFurniture3DGroup } from "./furniture-3d";
import { buildLight3DObject, type LightVisualHandle } from "./lights-3d";

export type CameraPreset = "pov" | "orbit";

export interface Stage3DOptions {
  onSelectLight?: (entityId: string, additive: boolean) => void;
}

export class PreviewStage3D {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls | null = null;
  private roomGroup: THREE.Group;
  private lightsGroup: THREE.Group;
  private resizeObserver: ResizeObserver | null = null;
  private raycaster = new THREE.Raycaster();
  private hitMeshes: THREE.Object3D[] = [];
  private lightHandles = new Map<string, LightVisualHandle>();
  private currentRoom: RoomConfig | null = null;
  private onSelectLight?: (entityId: string, additive: boolean) => void;
  private pointerDownPos: { x: number; y: number } | null = null;
  private rafId: number | null = null;
  private isDisposed = false;

  constructor(container: HTMLElement, options: Stage3DOptions = {}) {
    this.container = container;
    this.onSelectLight = options.onSelectLight;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0f1218);
    this.roomGroup = new THREE.Group();
    this.lightsGroup = new THREE.Group();
    this.scene.add(this.roomGroup);
    this.scene.add(this.lightsGroup);

    const width = Math.max(container.clientWidth, 300);
    const height = Math.max(container.clientHeight, 200);
    this.camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 60);

    try {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "low-power",
      });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setSize(width, height);
      this.container.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.08;
      this.controls.maxPolarAngle = Math.PI * 0.49;
      this.controls.minDistance = 0.7;
      this.controls.maxDistance = 16;
      this.controls.addEventListener("change", () => this.scheduleRender());

      this.renderer.domElement.addEventListener("pointerdown", this.handlePointerDown);
      this.renderer.domElement.addEventListener("pointerup", this.handlePointerUp);
    } catch {
      this.renderer = null;
    }

    const ambient = new THREE.AmbientLight(0xdbeafe, 0.32);
    this.scene.add(ambient);

    const hemi = new THREE.HemisphereLight(0xe2e8f0, 0x1e293b, 0.25);
    this.scene.add(hemi);

    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this.container);
    }
  }

  public get isWebGLReady(): boolean {
    return this.renderer !== null;
  }

  public renderRoom(room: RoomConfig, preset: CameraPreset = "pov"): void {
    this.currentRoom = room;
    this.clearGroup(this.roomGroup);
    this.clearGroup(this.lightsGroup);
    this.hitMeshes = [];
    this.lightHandles.clear();

    const bounds = computeRoomBounds(room.floor_polygon);
    const centerX = bounds.minX + bounds.width / 2;
    const centerY = bounds.minY + bounds.depth / 2;

    // Bodenfläche
    const shape = new THREE.Shape();
    room.floor_polygon.forEach((pt, idx) => {
      if (idx === 0) {
        shape.moveTo(pt.x, -pt.y);
      } else {
        shape.lineTo(pt.x, -pt.y);
      }
    });
    shape.closePath();

    const floorGeom = new THREE.ShapeGeometry(shape);
    floorGeom.rotateX(-Math.PI / 2);
    const floorColor = room.theme?.floor_color
      ? Number.parseInt(room.theme.floor_color.replace(/^#/, ""), 16) || 0x1d222c
      : 0x1d222c;
    const floorMat = new THREE.MeshStandardMaterial({
      color: floorColor,
      roughness: 0.85,
      metalness: 0.05,
    });
    this.roomGroup.add(new THREE.Mesh(floorGeom, floorMat));

    const gridHelper = new THREE.GridHelper(
      Math.ceil(Math.max(bounds.width, bounds.depth)) + 2,
      14,
      0x334155,
      0x1e293b,
    );
    gridHelper.position.set(centerX, 0.004, centerY);
    this.roomGroup.add(gridHelper);

    // Außenwände (leicht transluzent, reflektieren PointLights)
    const wallColor = room.theme?.wall_color
      ? Number.parseInt(room.theme.wall_color.replace(/^#/, ""), 16) || 0x334155
      : 0x334155;
    const wallPoints: THREE.Vector3[] = [];
    const pts = room.floor_polygon;
    for (let i = 0; i < pts.length; i += 1) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      this.addWallPlane(a.x, a.y, b.x, b.y, room.height_m, 0.28, wallColor);
      wallPoints.push(
        new THREE.Vector3(a.x, 0, a.y),
        new THREE.Vector3(b.x, 0, b.y),
        new THREE.Vector3(a.x, room.height_m, a.y),
        new THREE.Vector3(b.x, room.height_m, b.y),
        new THREE.Vector3(a.x, 0, a.y),
        new THREE.Vector3(a.x, room.height_m, a.y),
      );
    }

    // Optionale Innenwände / Raumteiler
    for (const wall of room.inner_walls ?? []) {
      const h = wall.height_m ?? room.height_m;
      this.addWallPlane(wall.from[0], wall.from[1], wall.to[0], wall.to[1], h, 0.42, wallColor);
      wallPoints.push(
        new THREE.Vector3(wall.from[0], 0, wall.from[1]),
        new THREE.Vector3(wall.to[0], 0, wall.to[1]),
        new THREE.Vector3(wall.from[0], h, wall.from[1]),
        new THREE.Vector3(wall.to[0], h, wall.to[1]),
      );
    }

    // Fenster & Türen zur Raumorientierung
    for (const feat of room.wall_features ?? []) {
      const dx = feat.to[0] - feat.from[0];
      const dy = feat.to[1] - feat.from[1];
      const len = Math.hypot(dx, dy);
      if (len < 0.05) continue;
      const isWindow = feat.kind === "window";
      const h = isWindow ? 1.15 : 2.05;
      const centerYPos = isWindow ? 1.45 : 1.025;
      const featMesh = new THREE.Mesh(
        new THREE.BoxGeometry(len, h, 0.06),
        new THREE.MeshBasicMaterial({
          color: isWindow ? 0x38bdf8 : 0xf59e0b,
          transparent: true,
          opacity: 0.28,
        }),
      );
      featMesh.position.set(
        (feat.from[0] + feat.to[0]) / 2,
        centerYPos,
        (feat.from[1] + feat.to[1]) / 2,
      );
      featMesh.rotation.y = -Math.atan2(dy, dx);
      this.roomGroup.add(featMesh);
    }

    const wallLineGeom = new THREE.BufferGeometry().setFromPoints(wallPoints);
    const wallLineMat = new THREE.LineBasicMaterial({ color: 0x475569 });
    this.roomGroup.add(new THREE.LineSegments(wallLineGeom, wallLineMat));

    // Referenzmöbel (inkl. L-/U-Couch & Schränke)
    for (const item of room.furniture) {
      this.roomGroup.add(buildFurniture3DGroup(item));
    }

    // Lichtobjekte mit eigenem Design
    for (const light of room.lights) {
      const handle = buildLight3DObject(light, this.lightsGroup, this.hitMeshes);
      this.lightHandles.set(light.entity_id, handle);
    }

    this.setCameraPreset(preset);
  }

  public setCameraPreset(preset: CameraPreset): void {
    if (!this.currentRoom) return;
    const room = this.currentRoom;
    const bounds = computeRoomBounds(room.floor_polygon);
    const centerX = bounds.minX + bounds.width / 2;
    const centerY = bounds.minY + bounds.depth / 2;

    if (preset === "pov") {
      const [cx, cy, cz] = room.camera_pov.position;
      const [tx, ty, tz] = room.camera_pov.target;
      this.camera.position.set(cx, cz, cy);
      if (this.controls) {
        this.controls.target.set(tx, tz, ty);
        this.controls.update();
      } else {
        this.camera.lookAt(tx, tz, ty);
      }
    } else {
      const dist = Math.max(bounds.width, bounds.depth) * 1.15;
      this.camera.position.set(centerX + dist * 0.35, room.height_m * 1.55, bounds.maxY + dist * 0.55);
      if (this.controls) {
        this.controls.target.set(centerX, 0.7, centerY);
        this.controls.update();
      } else {
        this.camera.lookAt(centerX, 0.7, centerY);
      }
    }

    this.scheduleRender();
  }

  public updateLightStates(
    states: Map<string, VisualLightState>,
    selectedIds: Set<string>,
  ): void {
    for (const [entityId, handle] of this.lightHandles.entries()) {
      const visual = states.get(entityId);
      const isSelected = selectedIds.has(entityId);

      for (const obj of handle.selectionObjects) {
        obj.visible = isSelected;
      }

      const isOn = visual?.isOn ?? false;
      const brightness01 = visual?.brightness01 ?? 0;
      const color = visual
        ? new THREE.Color(visual.rgb.r / 255, visual.rgb.g / 255, visual.rgb.b / 255)
        : new THREE.Color(0x52525b);

      for (const mat of handle.coreMaterials) {
        if (isOn) {
          mat.color.copy(color);
          mat.emissive.copy(color);
          mat.emissiveIntensity = 0.55 + brightness01 * 1.35;
        } else {
          mat.color.setHex(0x475569);
          mat.emissive.setHex(0x000000);
          mat.emissiveIntensity = 0;
        }
      }

      for (const haloMat of handle.haloMaterials) {
        haloMat.color.copy(color);
        haloMat.opacity = isOn ? 0.14 + brightness01 * 0.34 : 0;
      }

      for (const haloMesh of handle.haloMeshes) {
        haloMesh.visible = isOn;
        const scale = 0.85 + brightness01 * 0.6;
        haloMesh.scale.setScalar(scale);
      }

      const perLightIntensity =
        handle.pointLights.length > 0
          ? (isOn ? (0.8 + brightness01 * 2.8) / Math.sqrt(handle.pointLights.length) : 0)
          : 0;

      for (const ptLight of handle.pointLights) {
        ptLight.color.copy(color);
        ptLight.intensity = perLightIntensity;
      }
    }

    this.scheduleRender();
  }

  public resize(): void {
    if (!this.renderer) return;
    const width = Math.max(this.container.clientWidth, 1);
    const height = Math.max(this.container.clientHeight, 1);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.scheduleRender();
  }

  public dispose(): void {
    this.isDisposed = true;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    if (this.renderer) {
      this.renderer.domElement.removeEventListener("pointerdown", this.handlePointerDown);
      this.renderer.domElement.removeEventListener("pointerup", this.handlePointerUp);
    }
    this.controls?.dispose();
    this.controls = null;
    this.clearGroup(this.roomGroup);
    this.clearGroup(this.lightsGroup);
    this.hitMeshes = [];
    this.lightHandles.clear();
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
      this.renderer = null;
    }
  }

  private scheduleRender(): void {
    if (this.isDisposed || !this.renderer || this.rafId !== null) {
      return;
    }
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      if (this.isDisposed || !this.renderer) return;
      const needsMore = this.controls?.update() ?? false;
      this.renderer.render(this.scene, this.camera);
      if (needsMore) {
        this.scheduleRender();
      }
    });
  }

  private addWallPlane(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    height: number,
    opacity: number,
    wallColor = 0x334155,
  ): void {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    if (len < 0.01) return;

    const geom = new THREE.PlaneGeometry(len, height);
    const mat = new THREE.MeshStandardMaterial({
      color: wallColor,
      roughness: 0.9,
      metalness: 0.05,
      transparent: true,
      opacity,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const wall = new THREE.Mesh(geom, mat);
    wall.position.set((x1 + x2) / 2, height / 2, (y1 + y2) / 2);
    wall.rotation.y = -Math.atan2(dy, dx);
    this.roomGroup.add(wall);
  }

  private handlePointerDown = (event: PointerEvent): void => {
    this.pointerDownPos = { x: event.clientX, y: event.clientY };
  };

  private handlePointerUp = (event: PointerEvent): void => {
    if (!this.pointerDownPos || !this.renderer || !this.onSelectLight) return;
    const dist = Math.hypot(
      event.clientX - this.pointerDownPos.x,
      event.clientY - this.pointerDownPos.y,
    );
    this.pointerDownPos = null;
    if (dist > 7) return;

    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    const hits = this.raycaster.intersectObjects(this.hitMeshes, false);
    if (hits.length > 0) {
      const entityId = hits[0].object.userData.entityId;
      if (typeof entityId === "string") {
        this.onSelectLight(entityId, event.shiftKey || event.ctrlKey || event.metaKey);
      }
    }
  };

  private clearGroup(group: THREE.Group): void {
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      } else if (child instanceof THREE.Group) {
        this.clearGroup(child);
      }
    }
  }
}
