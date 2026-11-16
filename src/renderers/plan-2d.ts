import { svg, nothing } from "lit";
import type { LightPlacement, Point2D, RoomConfig } from "../types/config";
import { computeRoomBounds } from "../utils/config";
import type { VisualLightState } from "../utils/color";
import { rgbToCss } from "../utils/color";
import { snapToGrid } from "../utils/floor-editor";

export type EditTool = "lights" | "floor" | "furniture" | "camera";

export interface EditInteractionHandlers {
  enabled: boolean;
  tool: EditTool;
  sketchPoints?: Point2D[];
  onMoveLightXY?: (entityId: string, x: number, y: number, polylineIdx?: number) => void;
  onMoveLightXZ?: (entityId: string, x: number, z: number, part?: "from" | "to" | number) => void;
  onMovePolygonVertex?: (index: number, x: number, y: number) => void;
  onMoveFurnitureXY?: (furnitureId: string, x: number, y: number) => void;
  onMoveCameraPov?: (handle: "position" | "target", x: number, y: number) => void;
  onCanvasTapXY?: (x: number, y: number) => void;
}

export interface Plan2DHandlers {
  selectedIds: Set<string>;
  visualStates: Map<string, VisualLightState>;
  onSelectLight: (entityId: string, additive: boolean) => void;
  edit?: EditInteractionHandlers;
}

export interface ViewBoxRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function clientToViewBoxCoords(
  rect: { left: number; top: number; width: number; height: number },
  vb: ViewBoxRect,
  clientX: number,
  clientY: number,
): { x: number; y: number } {
  const safeW = Math.max(rect.width, 1);
  const safeH = Math.max(rect.height, 1);
  const scale = Math.min(safeW / vb.width, safeH / vb.height);
  const renderedW = vb.width * scale;
  const renderedH = vb.height * scale;
  const offsetX = rect.left + (safeW - renderedW) / 2;
  const offsetY = rect.top + (safeH - renderedH) / 2;

  return {
    x: vb.x + (clientX - offsetX) / scale,
    y: vb.y + (clientY - offsetY) / scale,
  };
}

function startSvgDrag(
  downEvent: PointerEvent,
  vb: ViewBoxRect,
  onMove: (x: number, y: number) => void,
): void {
  downEvent.stopPropagation();
  const targetEl = downEvent.currentTarget as Element | null;
  const svgEl = targetEl?.closest("svg");
  if (!svgEl) return;

  const handleMove = (moveEvent: PointerEvent) => {
    const rect = svgEl.getBoundingClientRect();
    const pt = clientToViewBoxCoords(rect, vb, moveEvent.clientX, moveEvent.clientY);
    onMove(pt.x, pt.y);
  };

  const handleUp = () => {
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerup", handleUp);
  };

  window.addEventListener("pointermove", handleMove);
  window.addEventListener("pointerup", handleUp);
}

function getLightAnchorXY(light: LightPlacement): [number, number] {
  if (light.geometry.type === "point") {
    return [light.geometry.position[0], light.geometry.position[1]];
  }
  if (light.geometry.type === "vertical_column") {
    return [light.geometry.from[0], light.geometry.from[1]];
  }
  const pts = light.geometry.points;
  return pts.length > 0 ? [pts[0][0], pts[0][1]] : [0, 0];
}

function hasCoLocatedLight(lights: LightPlacement[], target: LightPlacement): boolean {
  if (target.geometry.type === "polyline") return false;
  const [tx, ty] = getLightAnchorXY(target);
  return lights.some((other) => {
    if (other.entity_id === target.entity_id || other.geometry.type === "polyline") {
      return false;
    }
    const [ox, oy] = getLightAnchorXY(other);
    return Math.hypot(ox - tx, oy - ty) < 0.18;
  });
}

export function renderTopDownSvg(room: RoomConfig, handlers: Plan2DHandlers) {
  const bounds = computeRoomBounds(room.floor_polygon);
  const pad = 0.55;
  const vb: ViewBoxRect = {
    x: bounds.minX - pad,
    y: bounds.minY - pad,
    width: bounds.width + pad * 2,
    height: bounds.depth + pad * 2,
  };
  const viewBox = `${vb.x} ${vb.y} ${vb.width} ${vb.height}`;
  const polyPoints = room.floor_polygon.map((p) => `${p.x},${p.y}`).join(" ");
  const [camX, camY] = room.camera_pov.position;
  const [tgtX, tgtY] = room.camera_pov.target;
  const dirAngle = Math.atan2(tgtY - camY, tgtX - camX);
  const coneLen = 1.4;
  const spread = 0.46;
  const coneP1 = `${camX + Math.cos(dirAngle - spread) * coneLen},${camY + Math.sin(dirAngle - spread) * coneLen}`;
  const coneP2 = `${camX + Math.cos(dirAngle + spread) * coneLen},${camY + Math.sin(dirAngle + spread) * coneLen}`;

  const edit = handlers.edit;
  const isEditing = Boolean(edit?.enabled);

  const gridLinesX: number[] = [];
  const gridLinesY: number[] = [];
  if (isEditing) {
    for (let x = Math.floor(vb.x); x <= Math.ceil(vb.x + vb.width); x += 0.5) {
      gridLinesX.push(x);
    }
    for (let y = Math.floor(vb.y); y <= Math.ceil(vb.y + vb.height); y += 0.5) {
      gridLinesY.push(y);
    }
  }

  const handleSvgBackgroundClick = (e: MouseEvent) => {
    if (!isEditing || !edit?.onCanvasTapXY) return;
    const svgEl = e.currentTarget as SVGSVGElement;
    const pt = clientToViewBoxCoords(svgEl.getBoundingClientRect(), vb, e.clientX, e.clientY);
    edit.onCanvasTapXY(pt.x, pt.y);
  };

  return svg`
    <svg
      viewBox=${viewBox}
      preserveAspectRatio="xMidYMid meet"
      aria-label="2D Draufsicht"
      @click=${handleSvgBackgroundClick}
    >
      ${isEditing
        ? svg`
            ${gridLinesX.map(
              (gx) => svg`
                <line
                  x1=${gx}
                  y1=${vb.y}
                  x2=${gx}
                  y2=${vb.y + vb.height}
                  stroke="rgba(148,163,184,0.12)"
                  stroke-width="0.015"
                />
              `,
            )}
            ${gridLinesY.map(
              (gy) => svg`
                <line
                  x1=${vb.x}
                  y1=${gy}
                  x2=${vb.x + vb.width}
                  y2=${gy}
                  stroke="rgba(148,163,184,0.12)"
                  stroke-width="0.015"
                />
              `,
            )}
          `
        : nothing}

      <polygon
        points=${polyPoints}
        fill="rgba(255,255,255,0.035)"
        stroke="rgba(148,163,184,0.65)"
        stroke-width="0.06"
      />

      ${(room.inner_walls ?? []).map(
        (wall) => svg`
          <line
            x1=${wall.from[0]}
            y1=${wall.from[1]}
            x2=${wall.to[0]}
            y2=${wall.to[1]}
            stroke="rgba(148,163,184,0.8)"
            stroke-width="0.08"
            stroke-linecap="round"
          />
        `,
      )}

      <!-- Aktive Skizzen-Linie beim Neuzeichnen des Grundrisses -->
      ${isEditing && edit?.sketchPoints && edit.sketchPoints.length > 0
        ? svg`
            <polyline
              points=${edit.sketchPoints.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="#f59e0b"
              stroke-width="0.08"
              stroke-dasharray="0.12 0.08"
            />
            ${edit.sketchPoints.map(
              (p) => svg`<circle cx=${p.x} cy=${p.y} r="0.1" fill="#f59e0b" />`,
            )}
          `
        : nothing}

      <!-- Couch-Blickfeld -->
      <polygon points="${camX},${camY} ${coneP1} ${coneP2}" fill="rgba(56,189,248,0.09)" />
      <circle cx=${camX} cy=${camY} r="0.08" fill="#38bdf8" opacity="0.85" />

      <!-- Möbel -->
      ${room.furniture.map((f) => {
        const [px, py] = f.position;
        const [sx, sy] = f.size;
        const transform = f.rotation_deg ? `rotate(${f.rotation_deg} ${px} ${py})` : "";
        const canDragFurniture = isEditing && edit?.tool === "furniture";
        return svg`
          <g
            transform=${transform}
            style=${canDragFurniture ? "cursor:grab" : ""}
            @pointerdown=${(e: PointerEvent) => {
              if (!canDragFurniture || !edit?.onMoveFurnitureXY) return;
              startSvgDrag(e, vb, (nx, ny) => {
                edit.onMoveFurnitureXY?.(f.id, snapToGrid(nx, 0.1), snapToGrid(ny, 0.1));
              });
            }}
          >
            <rect
              x=${px - sx / 2}
              y=${py - sy / 2}
              width=${sx}
              height=${sy}
              rx="0.06"
              fill=${f.kind === "tv" || f.kind === "screen" ? "rgba(15,23,42,0.85)" : "rgba(100,116,139,0.28)"}
              stroke=${canDragFurniture ? "#f59e0b" : "rgba(148,163,184,0.45)"}
              stroke-width=${canDragFurniture ? "0.05" : "0.035"}
            />
          </g>
        `;
      })}

      <!-- Lichter -->
      ${[...room.lights]
        .sort((a, b) => {
          const order = { polyline: 0, point: 1, vertical_column: 2 };
          return order[a.geometry.type] - order[b.geometry.type];
        })
        .map((light) => {
          const visual = handlers.visualStates.get(light.entity_id);
          const isOn = visual?.isOn ?? false;
          const isSelected = handlers.selectedIds.has(light.entity_id);
          const color = visual ? visual.cssColor : "#52525b";
          const glowColor = visual ? rgbToCss(visual.rgb, 0.28 * visual.brightness01) : "transparent";
          const canDragLights = isEditing && edit?.tool === "lights";

          const onClick = (e: MouseEvent) => {
            e.stopPropagation();
            handlers.onSelectLight(light.entity_id, e.shiftKey || e.ctrlKey || e.metaKey);
          };

          if (light.geometry.type === "polyline") {
            const polyGeom = light.geometry;
            const pts = polyGeom.points.map((p) => `${p[0]},${p[1]}`).join(" ");
            return svg`
              <g class="svg-light" @click=${onClick}>
                ${isOn
                  ? svg`<polyline points=${pts} fill="none" stroke=${glowColor} stroke-width="0.34" stroke-linecap="round" stroke-linejoin="round" />`
                  : nothing}
                ${isSelected
                  ? svg`<polyline points=${pts} fill="none" stroke="#38bdf8" stroke-width="0.22" stroke-linecap="round" stroke-linejoin="round" opacity="0.85" />`
                  : nothing}
                <polyline
                  points=${pts}
                  fill="none"
                  stroke=${color}
                  stroke-width="0.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <polyline points=${pts} fill="none" stroke="transparent" stroke-width="0.34" />
                ${canDragLights
                  ? polyGeom.points.map(
                      (pt, idx) => svg`
                        <circle
                          cx=${pt[0]}
                          cy=${pt[1]}
                          r="0.12"
                          fill="#f59e0b"
                          stroke="#fff"
                          stroke-width="0.03"
                          style="cursor:grab"
                          @pointerdown=${(e: PointerEvent) => {
                            if (!edit?.onMoveLightXY) return;
                            startSvgDrag(e, vb, (nx, ny) => {
                              edit.onMoveLightXY?.(
                                light.entity_id,
                                snapToGrid(nx, 0.05),
                                snapToGrid(ny, 0.05),
                                idx,
                              );
                            });
                          }}
                        />
                      `,
                    )
                  : nothing}
              </g>
            `;
          }

          const [lx, ly] = getLightAnchorXY(light);
          const coLocated = hasCoLocatedLight(room.lights, light);
          const isOuterRing = coLocated && light.geometry.type === "point";
          const radius = isOuterRing ? 0.2 : light.geometry.type === "vertical_column" ? 0.11 : 0.14;

          return svg`
            <g
              class="svg-light"
              style=${canDragLights ? "cursor:grab" : ""}
              @click=${onClick}
              @pointerdown=${(e: PointerEvent) => {
                if (!canDragLights || !edit?.onMoveLightXY) return;
                startSvgDrag(e, vb, (nx, ny) => {
                  edit.onMoveLightXY?.(
                    light.entity_id,
                    snapToGrid(nx, 0.05),
                    snapToGrid(ny, 0.05),
                  );
                });
              }}
            >
              ${isOn ? svg`<circle cx=${lx} cy=${ly} r=${radius + 0.22} fill=${glowColor} />` : nothing}
              ${isSelected
                ? svg`<circle cx=${lx} cy=${ly} r=${radius + 0.08} fill="none" stroke="#38bdf8" stroke-width="0.05" />`
                : nothing}
              ${isOuterRing
                ? svg`<circle cx=${lx} cy=${ly} r=${radius} fill="none" stroke=${color} stroke-width="0.075" />`
                : svg`<circle cx=${lx} cy=${ly} r=${radius} fill=${color} stroke="#fff" stroke-width="0.03" />`}
              <circle cx=${lx} cy=${ly} r="0.28" fill="transparent" />
            </g>
          `;
        })}

      <!-- Grundriss-Eckpunkte zum Verschieben -->
      ${isEditing && edit?.tool === "floor" && (!edit.sketchPoints || edit.sketchPoints.length === 0)
        ? room.floor_polygon.map(
            (pt, idx) => svg`
              <circle
                cx=${pt.x}
                cy=${pt.y}
                r="0.14"
                fill="#f59e0b"
                stroke="#fff"
                stroke-width="0.04"
                style="cursor:grab"
                @pointerdown=${(e: PointerEvent) => {
                  if (!edit.onMovePolygonVertex) return;
                  startSvgDrag(e, vb, (nx, ny) => {
                    edit.onMovePolygonVertex?.(idx, snapToGrid(nx, 0.25), snapToGrid(ny, 0.25));
                  });
                }}
              />
            `,
          )
        : nothing}

      <!-- Kamera / Couch-POV Griffe -->
      ${isEditing && edit?.tool === "camera"
        ? svg`
            <line
              x1=${camX}
              y1=${camY}
              x2=${tgtX}
              y2=${tgtY}
              stroke="#38bdf8"
              stroke-width="0.05"
              stroke-dasharray="0.1 0.08"
            />
            <circle
              cx=${camX}
              cy=${camY}
              r="0.16"
              fill="#38bdf8"
              stroke="#fff"
              stroke-width="0.04"
              style="cursor:grab"
              @pointerdown=${(e: PointerEvent) => {
                startSvgDrag(e, vb, (nx, ny) => {
                  edit.onMoveCameraPov?.("position", snapToGrid(nx, 0.1), snapToGrid(ny, 0.1));
                });
              }}
            />
            <circle
              cx=${tgtX}
              cy=${tgtY}
              r="0.14"
              fill="#f59e0b"
              stroke="#fff"
              stroke-width="0.04"
              style="cursor:grab"
              @pointerdown=${(e: PointerEvent) => {
                startSvgDrag(e, vb, (nx, ny) => {
                  edit.onMoveCameraPov?.("target", snapToGrid(nx, 0.1), snapToGrid(ny, 0.1));
                });
              }}
            />
          `
        : nothing}
    </svg>
  `;
}

export function renderFrontSvg(room: RoomConfig, handlers: Plan2DHandlers) {
  const bounds = computeRoomBounds(room.floor_polygon);
  const pad = 0.5;
  const vb: ViewBoxRect = {
    x: bounds.minX - pad,
    y: -room.height_m - pad,
    width: bounds.width + pad * 2,
    height: room.height_m + pad * 2,
  };
  const viewBox = `${vb.x} ${vb.y} ${vb.width} ${vb.height}`;

  const meterLines: number[] = [];
  for (let z = 0.5; z < room.height_m; z += 0.5) {
    meterLines.push(Number(z.toFixed(2)));
  }

  const edit = handlers.edit;
  const canDragLights = Boolean(edit?.enabled && edit.tool === "lights");

  return svg`
    <svg viewBox=${viewBox} preserveAspectRatio="xMidYMid meet" aria-label="Frontalansicht">
      <rect
        x=${bounds.minX}
        y=${-room.height_m}
        width=${bounds.width}
        height=${room.height_m}
        fill="rgba(255,255,255,0.035)"
        stroke="rgba(148,163,184,0.6)"
        stroke-width="0.06"
      />

      ${meterLines.map(
        (z) => svg`
          <line
            x1=${bounds.minX}
            y1=${-z}
            x2=${bounds.maxX}
            y2=${-z}
            stroke="rgba(148,163,184,0.16)"
            stroke-width="0.02"
            stroke-dasharray="0.08 0.08"
          />
          <text x=${bounds.minX + 0.06} y=${-z - 0.04} fill="rgba(148,163,184,0.65)" font-size="0.16">
            ${z.toFixed(1)}m
          </text>
        `,
      )}

      <!-- Möbel-Querschnitt -->
      ${room.furniture.map((f) => {
        const [px, , pz] = f.position;
        const [sx, , sz] = f.size;
        return svg`
          <rect
            x=${px - sx / 2}
            y=${-(pz + sz / 2)}
            width=${sx}
            height=${sz}
            rx="0.04"
            fill=${f.kind === "tv" || f.kind === "screen" ? "rgba(15,23,42,0.8)" : "rgba(100,116,139,0.2)"}
            stroke="rgba(148,163,184,0.35)"
            stroke-width="0.03"
          />
        `;
      })}

      <!-- Lichter nach Höhe Z -->
      ${room.lights.map((light) => {
        const visual = handlers.visualStates.get(light.entity_id);
        const isOn = visual?.isOn ?? false;
        const isSelected = handlers.selectedIds.has(light.entity_id);
        const color = visual ? visual.cssColor : "#52525b";
        const glowColor = visual ? rgbToCss(visual.rgb, 0.28 * visual.brightness01) : "transparent";

        const onClick = (e: MouseEvent) => {
          e.stopPropagation();
          handlers.onSelectLight(light.entity_id, e.shiftKey || e.ctrlKey || e.metaKey);
        };

        if (light.geometry.type === "vertical_column") {
          const [fx, , fz] = light.geometry.from;
          const [tx, , tz] = light.geometry.to;
          return svg`
            <g class="svg-light" @click=${onClick}>
              ${isOn
                ? svg`<line x1=${fx} y1=${-fz} x2=${tx} y2=${-tz} stroke=${glowColor} stroke-width="0.34" stroke-linecap="round" />`
                : nothing}
              ${isSelected
                ? svg`<line x1=${fx} y1=${-fz} x2=${tx} y2=${-tz} stroke="#38bdf8" stroke-width="0.2" stroke-linecap="round" />`
                : nothing}
              <line x1=${fx} y1=${-fz} x2=${tx} y2=${-tz} stroke=${color} stroke-width="0.1" stroke-linecap="round" />
              <line x1=${fx} y1=${-fz} x2=${tx} y2=${-tz} stroke="transparent" stroke-width="0.35" stroke-linecap="round" />
              ${canDragLights
                ? svg`
                    <circle
                      cx=${fx}
                      cy=${-fz}
                      r="0.11"
                      fill="#f59e0b"
                      stroke="#fff"
                      stroke-width="0.03"
                      style="cursor:ns-resize"
                      @pointerdown=${(e: PointerEvent) => {
                        startSvgDrag(e, vb, (nx, ny) => {
                          edit?.onMoveLightXZ?.(
                            light.entity_id,
                            snapToGrid(nx, 0.05),
                            snapToGrid(Math.max(0.05, Math.min(room.height_m, -ny)), 0.05),
                            "from",
                          );
                        });
                      }}
                    />
                    <circle
                      cx=${tx}
                      cy=${-tz}
                      r="0.11"
                      fill="#f59e0b"
                      stroke="#fff"
                      stroke-width="0.03"
                      style="cursor:ns-resize"
                      @pointerdown=${(e: PointerEvent) => {
                        startSvgDrag(e, vb, (nx, ny) => {
                          edit?.onMoveLightXZ?.(
                            light.entity_id,
                            snapToGrid(nx, 0.05),
                            snapToGrid(Math.max(0.05, Math.min(room.height_m, -ny)), 0.05),
                            "to",
                          );
                        });
                      }}
                    />
                  `
                : nothing}
            </g>
          `;
        }

        if (light.geometry.type === "polyline") {
          const polyGeom = light.geometry;
          const pts = polyGeom.points.map((p) => `${p[0]},${-p[2]}`).join(" ");
          return svg`
            <g class="svg-light" @click=${onClick}>
              ${isOn
                ? svg`<polyline points=${pts} fill="none" stroke=${glowColor} stroke-width="0.28" stroke-linecap="round" />`
                : nothing}
              ${isSelected
                ? svg`<polyline points=${pts} fill="none" stroke="#38bdf8" stroke-width="0.18" stroke-linecap="round" />`
                : nothing}
              <polyline points=${pts} fill="none" stroke=${color} stroke-width="0.08" stroke-linecap="round" />
              <polyline points=${pts} fill="none" stroke="transparent" stroke-width="0.34" stroke-linecap="round" />
              ${canDragLights
                ? polyGeom.points.map(
                    (pt, idx) => svg`
                      <circle
                        cx=${pt[0]}
                        cy=${-pt[2]}
                        r="0.1"
                        fill="#f59e0b"
                        stroke="#fff"
                        stroke-width="0.03"
                        style="cursor:ns-resize"
                        @pointerdown=${(e: PointerEvent) => {
                          startSvgDrag(e, vb, (nx, ny) => {
                            edit?.onMoveLightXZ?.(
                              light.entity_id,
                              snapToGrid(nx, 0.05),
                              snapToGrid(Math.max(0.05, Math.min(room.height_m, -ny)), 0.05),
                              idx,
                            );
                          });
                        }}
                      />
                    `,
                  )
                : nothing}
            </g>
          `;
        }

        const [lx, , lz] = light.geometry.position;
        return svg`
          <g
            class="svg-light"
            style=${canDragLights ? "cursor:grab" : ""}
            @click=${onClick}
            @pointerdown=${(e: PointerEvent) => {
              if (!canDragLights || !edit?.onMoveLightXZ) return;
              startSvgDrag(e, vb, (nx, ny) => {
                edit.onMoveLightXZ?.(
                  light.entity_id,
                  snapToGrid(nx, 0.05),
                  snapToGrid(Math.max(0.05, Math.min(room.height_m, -ny)), 0.05),
                );
              });
            }}
          >
            ${isOn ? svg`<circle cx=${lx} cy=${-lz} r="0.32" fill=${glowColor} />` : nothing}
            ${isSelected
              ? svg`<circle cx=${lx} cy=${-lz} r="0.21" fill="none" stroke="#38bdf8" stroke-width="0.05" />`
              : nothing}
            <circle cx=${lx} cy=${-lz} r="0.13" fill=${color} stroke="#fff" stroke-width="0.03" />
            <circle cx=${lx} cy=${-lz} r="0.28" fill="transparent" />
          </g>
        `;
      })}
    </svg>
  `;
}
