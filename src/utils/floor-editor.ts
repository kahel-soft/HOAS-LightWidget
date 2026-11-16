import type { FurnitureObject, Point2D } from "../types/config";

export function snapToGrid(value: number, step = 0.25): number {
  const factor = 1 / step;
  return Math.round(value * factor) / factor;
}

export function createRectPolygon(widthM: number, depthM: number): Point2D[] {
  const w = Math.max(1, snapToGrid(widthM, 0.25));
  const d = Math.max(1, snapToGrid(depthM, 0.25));
  return [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w, y: d },
    { x: 0, y: d },
  ];
}

export function createLShapePolygon(
  totalWidthM: number,
  totalDepthM: number,
  cutWidthM: number,
  cutDepthM: number,
): Point2D[] {
  const w = Math.max(2, snapToGrid(totalWidthM, 0.25));
  const d = Math.max(2, snapToGrid(totalDepthM, 0.25));
  const cw = Math.min(w - 0.75, Math.max(0.5, snapToGrid(cutWidthM, 0.25)));
  const cd = Math.min(d - 0.75, Math.max(0.5, snapToGrid(cutDepthM, 0.25)));

  return [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w, y: d - cd },
    { x: w - cw, y: d - cd },
    { x: w - cw, y: d },
    { x: 0, y: d },
  ];
}

/**
 * Erzeugt einen kombinierten Grundriss für zwei offene/verbundene Bereiche nebeneinander.
 */
export function createCombinedRoomsPolygon(
  width1M: number,
  depth1M: number,
  width2M: number,
  depth2M: number,
  offsetYM = 0,
): Point2D[] {
  const w1 = Math.max(1.5, snapToGrid(width1M, 0.25));
  const d1 = Math.max(1.5, snapToGrid(depth1M, 0.25));
  const w2 = Math.max(1.5, snapToGrid(width2M, 0.25));
  const d2 = Math.max(1.5, snapToGrid(depth2M, 0.25));
  const off = snapToGrid(Math.max(0, offsetYM), 0.25);

  if (off === 0 && d1 === d2) {
    return createRectPolygon(w1 + w2, d1);
  }

  const pts: Point2D[] = [
    { x: 0, y: 0 },
    { x: w1, y: 0 },
  ];

  if (off > 0) {
    pts.push({ x: w1, y: off }, { x: w1 + w2, y: off });
  } else {
    pts.push({ x: w1 + w2, y: 0 });
  }

  const rightBottom = off + d2;
  pts.push({ x: w1 + w2, y: rightBottom });

  if (rightBottom !== d1) {
    pts.push({ x: w1, y: rightBottom }, { x: w1, y: d1 });
  }

  pts.push({ x: 0, y: d1 });
  return pts;
}

/**
 * Rastet den nächsten Polygonpunkt orthogonal (waagerecht oder senkrecht) am Vorgängerpunkt ein.
 */
export function snapOrthogonalPoint(
  prevPoint: Point2D | undefined,
  candidate: Point2D,
  step = 0.25,
): Point2D {
  const sx = snapToGrid(Math.max(0, candidate.x), step);
  const sy = snapToGrid(Math.max(0, candidate.y), step);
  if (!prevPoint) {
    return { x: sx, y: sy };
  }
  const dx = Math.abs(sx - prevPoint.x);
  const dy = Math.abs(sy - prevPoint.y);
  return dx >= dy ? { x: sx, y: prevPoint.y } : { x: prevPoint.x, y: sy };
}

export function removePolygonVertex(polygon: Point2D[], index: number): Point2D[] {
  if (polygon.length <= 3) return polygon;
  return polygon.filter((_, i) => i !== index);
}

/**
 * Fügt auf der nächstgelegenen Wandkante des Polygons einen neuen Eckpunkt ein.
 */
export function insertPolygonVertexOnNearestEdge(
  polygon: Point2D[],
  point: Point2D,
  step = 0.25,
): Point2D[] {
  if (polygon.length < 3) return polygon;
  let bestIdx = 0;
  let bestDist = Infinity;

  for (let i = 0; i < polygon.length; i += 1) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    const abx = b.x - a.x;
    const aby = b.y - a.y;
    const lenSq = abx * abx + aby * aby;
    const t = lenSq > 0 ? Math.max(0, Math.min(1, ((point.x - a.x) * abx + (point.y - a.y) * aby) / lenSq)) : 0;
    const projX = a.x + t * abx;
    const projY = a.y + t * aby;
    const dist = Math.hypot(point.x - projX, point.y - projY);
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }
  }

  const snapped = { x: snapToGrid(Math.max(0, point.x), step), y: snapToGrid(Math.max(0, point.y), step) };
  const next = [...polygon];
  next.splice(bestIdx + 1, 0, snapped);
  return next;
}

export interface LocalRect2D {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Liefert lokale 2D-Rechtecke (zentriert um 0,0) für Standard-, L-Form- und U-Form-Möbel.
 */
export function getFurnitureLocalRects(item: FurnitureObject): LocalRect2D[] {
  const [sx, sy] = item.size;
  if (item.kind === "couch_l") {
    const wingW = Math.min(sx * 0.65, Math.max(0.65, item.wing_width_m ?? 0.95));
    const wingD = Math.max(0.6, item.wing_depth_m ?? 1.15);
    const wingX = item.l_side === "right" ? sx / 2 - wingW : -sx / 2;
    return [
      { x: -sx / 2, y: -sy / 2, width: sx, height: sy },
      { x: wingX, y: -sy / 2 - wingD, width: wingW, height: wingD },
    ];
  }
  if (item.kind === "couch_u") {
    const wingW = Math.min(sx * 0.4, Math.max(0.6, item.wing_width_m ?? 0.9));
    const wingD = Math.max(0.6, item.wing_depth_m ?? 1.15);
    return [
      { x: -sx / 2, y: -sy / 2, width: sx, height: sy },
      { x: -sx / 2, y: -sy / 2 - wingD, width: wingW, height: wingD },
      { x: sx / 2 - wingW, y: -sy / 2 - wingD, width: wingW, height: wingD },
    ];
  }
  return [{ x: -sx / 2, y: -sy / 2, width: sx, height: sy }];
}
