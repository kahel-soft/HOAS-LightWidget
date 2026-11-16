import * as THREE from "three";
import type { LightPlacement, LightVisualStyle } from "../types/config";

export interface LightVisualHandle {
  entityId: string;
  coreMaterials: THREE.MeshStandardMaterial[];
  haloMaterials: THREE.MeshBasicMaterial[];
  haloMeshes: THREE.Object3D[];
  selectionObjects: THREE.Object3D[];
  pointLights: THREE.PointLight[];
}

export function resolveEffectiveLightStyle(light: LightPlacement): LightVisualStyle {
  if (light.visual_style) {
    return {
      kind: light.visual_style.kind,
      scale: light.visual_style.scale ?? 1,
      rotation_deg: light.visual_style.rotation_deg ?? 0,
    };
  }
  if (light.geometry.type === "polyline") {
    return { kind: "led_strip", scale: 1, rotation_deg: 0 };
  }
  if (light.geometry.type === "vertical_column") {
    return { kind: "floor_strip", scale: 1, rotation_deg: 0 };
  }
  return { kind: "bulb", scale: 1, rotation_deg: 0 };
}

export function buildLight3DObject(
  light: LightPlacement,
  lightsGroup: THREE.Group,
  hitMeshes: THREE.Object3D[],
): LightVisualHandle {
  const handle: LightVisualHandle = {
    entityId: light.entity_id,
    coreMaterials: [],
    haloMaterials: [],
    haloMeshes: [],
    selectionObjects: [],
    pointLights: [],
  };

  const style = resolveEffectiveLightStyle(light);
  const scale = Math.max(0.5, Math.min(2.2, style.scale ?? 1));

  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    roughness: 0.25,
    metalness: 0.12,
  });
  const housingMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.65,
    metalness: 0.35,
  });
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const selectMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
  });
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });

  handle.coreMaterials.push(coreMat);
  handle.haloMaterials.push(haloMat);

  const geomDef = light.geometry;

  if (geomDef.type === "polyline" && geomDef.points.length >= 2) {
    const vecs = geomDef.points.map((p) => new THREE.Vector3(p[0], p[2], p[1]));
    const curve = new THREE.CatmullRomCurve3(vecs, false, "catmullrom", 0.04);
    const radius = (geomDef.thickness_m ?? 0.032) * scale;

    // LED-Strip Profil-Optik: dunkle Träger-Schiene + leuchtendes LED-Band + LED-Knotenpunkte
    const strip = new THREE.Mesh(new THREE.TubeGeometry(curve, 32, radius, 8, false), coreMat);
    strip.userData.entityId = light.entity_id;
    lightsGroup.add(strip);
    hitMeshes.push(strip);

    // Einzelne LED-Punkte entlang des Strips für sofortige Strip-Erkennbarkeit
    const dotCount = Math.min(24, Math.max(6, Math.round(curve.getLength() * 4)));
    for (let i = 0; i <= dotCount; i += 1) {
      const p = curve.getPointAt(i / dotCount);
      const ledNode = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.18, 8, 6), coreMat);
      ledNode.position.copy(p);
      lightsGroup.add(ledNode);
    }

    const hit = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 18, radius * 3.8, 8, false),
      hitMat,
    );
    hit.userData.entityId = light.entity_id;
    lightsGroup.add(hit);
    hitMeshes.push(hit);

    const halo = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 24, radius * 3.0, 10, false),
      haloMat,
    );
    lightsGroup.add(halo);
    handle.haloMeshes.push(halo);

    const selectTube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 24, radius * 2.1, 8, false),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.48,
        depthWrite: false,
      }),
    );
    selectTube.visible = false;
    lightsGroup.add(selectTube);
    handle.selectionObjects.push(selectTube);

    const sampleCount = Math.min(3, vecs.length);
    for (let i = 0; i < sampleCount; i += 1) {
      const t = sampleCount === 1 ? 0.5 : i / (sampleCount - 1);
      const pos = curve.getPointAt(t);
      const ptLight = new THREE.PointLight(0xffffff, 0, 5.2, 1.8);
      ptLight.position.copy(pos);
      lightsGroup.add(ptLight);
      handle.pointLights.push(ptLight);
    }
    return handle;
  }

  if (geomDef.type === "vertical_column") {
    const [fx, fy, fz] = geomDef.from;
    const [tx, ty, tz] = geomDef.to;
    const start = new THREE.Vector3(fx, fz, fy);
    const end = new THREE.Vector3(tx, tz, ty);
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const len = Math.max(start.distanceTo(end), 0.2);
    const radius = (geomDef.radius_m ?? 0.042) * scale;

    // Standfuß am Boden (z=0 bis start)
    const baseDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 3.0, radius * 3.4, 0.03, 16),
      housingMat,
    );
    baseDisc.position.set(fx, 0.015, fy);
    lightsGroup.add(baseDisc);

    if (style.kind === "floor_lamp") {
      // Stehlampe mit Mast + Lampenschirm oben
      const poleLen = Math.max(0.2, end.y - 0.12);
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 0.4, radius * 0.45, poleLen, 10),
        housingMat,
      );
      pole.position.set(fx, poleLen / 2, fy);
      lightsGroup.add(pole);

      const shade = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 3.2, radius * 4.5, 0.26 * scale, 18, 1, true),
        coreMat,
      );
      shade.material.side = THREE.DoubleSide;
      shade.position.copy(end);
      shade.userData.entityId = light.entity_id;
      lightsGroup.add(shade);
      hitMeshes.push(shade);

      const halo = new THREE.Mesh(new THREE.SphereGeometry(radius * 6.5, 16, 12), haloMat);
      halo.position.copy(end);
      lightsGroup.add(halo);
      handle.haloMeshes.push(halo);

      const hit = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 4.5, radius * 4.5, len + 0.2, 10),
        hitMat,
      );
      hit.position.copy(mid);
      hit.userData.entityId = light.entity_id;
      lightsGroup.add(hit);
      hitMeshes.push(hit);
    } else {
      // Vertikale Stehlampen-LED-Säule
      const core = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, len, 14),
        coreMat,
      );
      core.position.copy(mid);
      core.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        end.clone().sub(start).normalize(),
      );
      core.userData.entityId = light.entity_id;
      lightsGroup.add(core);
      hitMeshes.push(core);

      const hit = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 3.6, radius * 3.6, len + 0.12, 10),
        hitMat,
      );
      hit.position.copy(mid);
      hit.quaternion.copy(core.quaternion);
      hit.userData.entityId = light.entity_id;
      lightsGroup.add(hit);
      hitMeshes.push(hit);

      const halo = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 3.2, radius * 3.2, len + 0.06, 14),
        haloMat,
      );
      halo.position.copy(mid);
      halo.quaternion.copy(core.quaternion);
      lightsGroup.add(halo);
      handle.haloMeshes.push(halo);
    }

    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius * 3.2, 0.015, 8, 24), selectMat);
    ring.position.copy(mid);
    ring.rotation.x = Math.PI / 2;
    ring.visible = false;
    lightsGroup.add(ring);
    handle.selectionObjects.push(ring);

    const ptLight = new THREE.PointLight(0xffffff, 0, 6.0, 1.7);
    ptLight.position.copy(style.kind === "floor_lamp" ? end : mid);
    lightsGroup.add(ptLight);
    handle.pointLights.push(ptLight);
    return handle;
  }

  if (geomDef.type !== "point") {
    return handle;
  }

  // Point-basierte Lampen mit individuellem Design
  const [lx, ly, lz] = geomDef.position;
  const radius = (geomDef.radius_m ?? 0.085) * scale;
  const anchor = new THREE.Group();
  anchor.position.set(lx, lz, ly);
  if (style.rotation_deg) {
    anchor.rotation.y = THREE.MathUtils.degToRad(-style.rotation_deg);
  }
  lightsGroup.add(anchor);

  if (style.kind === "spot") {
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.75, radius * 0.9, radius * 1.4, 14),
      housingMat,
    );
    body.rotation.x = Math.PI / 2.6;
    anchor.add(body);

    const lens = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.85, 14, 10), coreMat);
    lens.position.set(0, -radius * 0.3, -radius * 0.55);
    lens.userData.entityId = light.entity_id;
    anchor.add(lens);
    hitMeshes.push(lens);

    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(radius * 3.4, radius * 5.2, 16, 1, true),
      haloMat,
    );
    cone.position.set(0, -radius * 2.1, -radius * 1.8);
    cone.rotation.x = -Math.PI * 0.78;
    anchor.add(cone);
    handle.haloMeshes.push(cone);
  } else if (style.kind === "led_strip") {
    // Kurzer gerader LED-Strip auf Punkt-Basis
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(radius * 5.5, radius * 0.65, radius * 0.75),
      coreMat,
    );
    bar.userData.entityId = light.entity_id;
    anchor.add(bar);
    hitMeshes.push(bar);

    const halo = new THREE.Mesh(
      new THREE.BoxGeometry(radius * 6.5, radius * 1.8, radius * 2.2),
      haloMat,
    );
    anchor.add(halo);
    handle.haloMeshes.push(halo);
  } else if (style.kind === "table_lamp" || style.kind === "floor_lamp") {
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.85, radius * 1.05, radius * 0.9, 14),
      housingMat,
    );
    base.position.set(0, -radius * 0.75, 0);
    anchor.add(base);

    const shade = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 1.15, radius * 1.6, radius * 1.6, 18),
      coreMat,
    );
    shade.position.set(0, radius * 0.45, 0);
    shade.userData.entityId = light.entity_id;
    anchor.add(shade);
    hitMeshes.push(shade);

    const halo = new THREE.Mesh(new THREE.SphereGeometry(radius * 3.2, 16, 12), haloMat);
    anchor.add(halo);
    handle.haloMeshes.push(halo);
  } else if (style.kind === "ceiling") {
    const panel = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 2.1, radius * 2.1, radius * 0.45, 20),
      coreMat,
    );
    panel.userData.entityId = light.entity_id;
    anchor.add(panel);
    hitMeshes.push(panel);

    const halo = new THREE.Mesh(new THREE.SphereGeometry(radius * 3.8, 16, 12), haloMat);
    anchor.add(halo);
    handle.haloMeshes.push(halo);
  } else {
    // Klassische Lampe / Glühbirne
    const socket = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.45, radius * 0.55, radius * 0.7, 12),
      housingMat,
    );
    socket.position.set(0, -radius * 0.9, 0);
    anchor.add(socket);

    const bulb = new THREE.Mesh(new THREE.SphereGeometry(radius, 18, 14), coreMat);
    bulb.userData.entityId = light.entity_id;
    anchor.add(bulb);
    hitMeshes.push(bulb);

    const halo = new THREE.Mesh(new THREE.SphereGeometry(radius * 3.0, 16, 12), haloMat);
    anchor.add(halo);
    handle.haloMeshes.push(halo);
  }

  const hit = new THREE.Mesh(new THREE.SphereGeometry(radius * 2.7, 10, 8), hitMat);
  hit.userData.entityId = light.entity_id;
  anchor.add(hit);
  hitMeshes.push(hit);

  const ring = new THREE.Mesh(new THREE.RingGeometry(radius * 1.7, radius * 2.2, 24), selectMat);
  ring.rotation.x = -Math.PI / 2;
  ring.visible = false;
  anchor.add(ring);
  handle.selectionObjects.push(ring);

  const ptLight = new THREE.PointLight(0xffffff, 0, 5.5, 1.8);
  anchor.add(ptLight);
  handle.pointLights.push(ptLight);

  return handle;
}
