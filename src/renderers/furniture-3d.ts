import * as THREE from "three";
import type { FurnitureObject } from "../types/config";

function parseColor(hex: string | undefined, fallback: number): number {
  if (!hex) return fallback;
  const cleaned = hex.trim().replace(/^#/, "");
  const parsed = Number.parseInt(cleaned, 16);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export function buildFurniture3DGroup(item: FurnitureObject): THREE.Group {
  const [sx, sy, sz] = item.size;
  const [px, py, pz] = item.position;
  const group = new THREE.Group();
  group.position.set(px, pz, py);
  if (item.rotation_deg) {
    group.rotation.y = THREE.MathUtils.degToRad(-item.rotation_deg);
  }

  const baseColor = parseColor(item.color, 0x3b4454);
  const couchMat = new THREE.MeshStandardMaterial({ color: baseColor, roughness: 0.84 });
  const cushionMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.88 });

  if (item.kind === "couch" || item.kind === "couch_l" || item.kind === "couch_u") {
    const seatH = sz * 0.44;
    const backH = sz * 0.6;
    const backT = Math.min(0.24, sy * 0.25);

    // Hauptteil Sitz + Rückenlehne (Blickrichtung standardmäßig nach -Z)
    const seat = new THREE.Mesh(new THREE.BoxGeometry(sx, seatH, sy), couchMat);
    seat.position.set(0, -sz / 2 + seatH / 2, 0);
    group.add(seat);

    const back = new THREE.Mesh(new THREE.BoxGeometry(sx, backH, backT), cushionMat);
    back.position.set(0, -sz / 2 + seatH + backH * 0.28, sy / 2 - backT / 2);
    group.add(back);

    const armW = Math.min(0.18, sx * 0.08);
    const armH = sz * 0.62;

    if (item.kind === "couch") {
      const leftArm = new THREE.Mesh(new THREE.BoxGeometry(armW, armH, sy), couchMat);
      leftArm.position.set(-sx / 2 + armW / 2, -sz / 2 + armH / 2, 0);
      const rightArm = new THREE.Mesh(new THREE.BoxGeometry(armW, armH, sy), couchMat);
      rightArm.position.set(sx / 2 - armW / 2, -sz / 2 + armH / 2, 0);
      group.add(leftArm, rightArm);
    }

    if (item.kind === "couch_l") {
      const wingW = Math.min(sx * 0.65, Math.max(0.65, item.wing_width_m ?? 0.95));
      const wingD = Math.max(0.6, item.wing_depth_m ?? 1.15);
      const isRight = item.l_side === "right";
      const wingCenterX = isRight ? sx / 2 - wingW / 2 : -sx / 2 + wingW / 2;
      const wingCenterZ = -sy / 2 - wingD / 2;

      const wingSeat = new THREE.Mesh(new THREE.BoxGeometry(wingW, seatH, wingD), couchMat);
      wingSeat.position.set(wingCenterX, -sz / 2 + seatH / 2, wingCenterZ);
      group.add(wingSeat);

      const outerEdgeX = isRight ? sx / 2 - backT / 2 : -sx / 2 + backT / 2;
      const sideBack = new THREE.Mesh(new THREE.BoxGeometry(backT, backH, wingD), cushionMat);
      sideBack.position.set(outerEdgeX, -sz / 2 + seatH + backH * 0.28, wingCenterZ);
      group.add(sideBack);
    }

    if (item.kind === "couch_u") {
      const wingW = Math.min(sx * 0.4, Math.max(0.6, item.wing_width_m ?? 0.9));
      const wingD = Math.max(0.6, item.wing_depth_m ?? 1.15);
      const wingCenterZ = -sy / 2 - wingD / 2;

      const leftWing = new THREE.Mesh(new THREE.BoxGeometry(wingW, seatH, wingD), couchMat);
      leftWing.position.set(-sx / 2 + wingW / 2, -sz / 2 + seatH / 2, wingCenterZ);
      const rightWing = new THREE.Mesh(new THREE.BoxGeometry(wingW, seatH, wingD), couchMat);
      rightWing.position.set(sx / 2 - wingW / 2, -sz / 2 + seatH / 2, wingCenterZ);

      const leftBack = new THREE.Mesh(new THREE.BoxGeometry(backT, backH, wingD), cushionMat);
      leftBack.position.set(-sx / 2 + backT / 2, -sz / 2 + seatH + backH * 0.28, wingCenterZ);
      const rightBack = new THREE.Mesh(new THREE.BoxGeometry(backT, backH, wingD), cushionMat);
      rightBack.position.set(sx / 2 - backT / 2, -sz / 2 + seatH + backH * 0.28, wingCenterZ);

      group.add(leftWing, rightWing, leftBack, rightBack);
    }

    return group;
  }

  if (item.kind === "wardrobe" || item.kind === "sideboard") {
    const bodyMat = new THREE.MeshStandardMaterial({
      color: parseColor(item.color, item.kind === "wardrobe" ? 0x475569 : 0x334155),
      roughness: 0.72,
    });
    const body = new THREE.Mesh(new THREE.BoxGeometry(sx, sz, sy), bodyMat);
    group.add(body);

    // Dezente Tür-/Frontfugen zur Erkennbarkeit als Schrank/Sideboard
    const seamMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
    const doors = Math.max(2, Math.round(sx / 0.6));
    for (let i = 1; i < doors; i += 1) {
      const xOff = -sx / 2 + (sx * i) / doors;
      const seam = new THREE.Mesh(new THREE.BoxGeometry(0.015, sz * 0.92, 0.015), seamMat);
      seam.position.set(xOff, 0, -sy / 2 - 0.005);
      group.add(seam);
    }
    return group;
  }

  if (item.kind === "tv" || item.kind === "screen") {
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.2,
      metalness: 0.35,
    });
    const bezelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    const frame = new THREE.Mesh(new THREE.BoxGeometry(sx, sz, sy), bezelMat);
    const panel = new THREE.Mesh(new THREE.BoxGeometry(sx * 0.95, sz * 0.9, sy + 0.01), frameMat);
    group.add(frame, panel);
    return group;
  }

  if (item.kind === "table" || item.kind === "desk") {
    const topMat = new THREE.MeshStandardMaterial({
      color: parseColor(item.color, 0x4b5563),
      roughness: 0.68,
    });
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    const topH = Math.min(0.06, sz * 0.12);
    const top = new THREE.Mesh(new THREE.BoxGeometry(sx, topH, sy), topMat);
    top.position.set(0, sz / 2 - topH / 2, 0);
    group.add(top);

    const legH = Math.max(0.1, sz - topH);
    const legGeom = new THREE.BoxGeometry(0.05, legH, 0.05);
    const dx = sx / 2 - 0.06;
    const dy = sy / 2 - 0.06;
    for (const [lx, ly] of [
      [-dx, -dy],
      [dx, -dy],
      [-dx, dy],
      [dx, dy],
    ]) {
      const leg = new THREE.Mesh(legGeom, legMat);
      leg.position.set(lx, -topH / 2, ly);
      group.add(leg);
    }
    return group;
  }

  if (item.kind === "bed") {
    const frameMat = new THREE.MeshStandardMaterial({ color: baseColor, roughness: 0.8 });
    const mattressMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.9 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(sx, sz * 0.65, sy), frameMat);
    base.position.set(0, -sz * 0.17, 0);
    const headboard = new THREE.Mesh(new THREE.BoxGeometry(sx, sz * 1.4, 0.12), frameMat);
    headboard.position.set(0, sz * 0.2, sy / 2 - 0.06);
    const pillow = new THREE.Mesh(new THREE.BoxGeometry(sx * 0.8, 0.12, 0.4), mattressMat);
    pillow.position.set(0, sz * 0.22, sy / 2 - 0.35);
    group.add(base, headboard, pillow);
    return group;
  }

  if (item.kind === "custom_poly" && item.polygon && item.polygon.length >= 3) {
    const shape = new THREE.Shape();
    item.polygon.forEach((pt, idx) => {
      if (idx === 0) shape.moveTo(pt.x, -pt.y);
      else shape.lineTo(pt.x, -pt.y);
    });
    shape.closePath();
    const geom = new THREE.ExtrudeGeometry(shape, { depth: sz, bevelEnabled: false });
    geom.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshStandardMaterial({ color: baseColor, roughness: 0.78 });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(0, -sz / 2, 0);
    group.add(mesh);
    return group;
  }

  const fallback = new THREE.Mesh(
    new THREE.BoxGeometry(sx, sz, sy),
    new THREE.MeshStandardMaterial({ color: baseColor, roughness: 0.75 }),
  );
  group.add(fallback);
  return group;
}
