import type { Point2D } from "../types/config";

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
