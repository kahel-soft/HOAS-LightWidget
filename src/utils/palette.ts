import type { PaletteColor } from "../types/config";
import { kelvinToRgb, rgbToHex } from "./color";

function whiteSwatch(kelvin: number, label: string): PaletteColor {
  return {
    id: `white_${kelvin}`,
    label,
    kind: "white",
    kelvin,
    hex: rgbToHex(kelvinToRgb(kelvin)),
  };
}

export const WHITE_PALETTE: PaletteColor[] = [
  whiteSwatch(2000, "2000K Kerze"),
  whiteSwatch(2200, "2200K Glut"),
  whiteSwatch(2700, "2700K Warm"),
  whiteSwatch(3000, "3000K Wohn"),
  whiteSwatch(4000, "4000K Neutral"),
  whiteSwatch(5500, "5500K Tag"),
  whiteSwatch(6500, "6500K Kalt"),
];

export const COLOR_PALETTE: PaletteColor[] = [
  // Amber / Gold
  { id: "amber_soft", label: "Sanft-Amber", kind: "color", hex: "#ffd9a0" },
  { id: "amber_mid", label: "Honig-Gold", kind: "color", hex: "#ffb347" },
  { id: "amber_vivid", label: "Bernstein", kind: "color", hex: "#ff8811" },
  { id: "amber_deep", label: "Glut-Orange", kind: "color", hex: "#e65100" },

  // Koralle / Rot
  { id: "red_soft", label: "Lachston", kind: "color", hex: "#ffadad" },
  { id: "red_coral", label: "Koralle", kind: "color", hex: "#ff6b6b" },
  { id: "red_vivid", label: "Kaminrot", kind: "color", hex: "#ef233c" },
  { id: "red_deep", label: "Rubin", kind: "color", hex: "#b5172c" },

  // Rose / Magenta
  { id: "pink_soft", label: "Rosé", kind: "color", hex: "#ffc6e5" },
  { id: "pink_mid", label: "Flamingo", kind: "color", hex: "#ff70a6" },
  { id: "pink_vivid", label: "Magenta", kind: "color", hex: "#e6198e" },
  { id: "pink_deep", label: "Beere", kind: "color", hex: "#9d174d" },

  // Violett / Lavendel
  { id: "violet_soft", label: "Lavendel", kind: "color", hex: "#d8b4fe" },
  { id: "violet_mid", label: "Amethyst", kind: "color", hex: "#a855f7" },
  { id: "violet_vivid", label: "Violett", kind: "color", hex: "#7c3aed" },
  { id: "violet_deep", label: "Ultraviolett", kind: "color", hex: "#4c1d95" },

  // Blau / Eisblau
  { id: "blue_soft", label: "Eisblau", kind: "color", hex: "#bae6fd" },
  { id: "blue_sky", label: "Himmelblau", kind: "color", hex: "#38bdf8" },
  { id: "blue_vivid", label: "Kobalt", kind: "color", hex: "#2563eb" },
  { id: "blue_deep", label: "Tiefblau", kind: "color", hex: "#1d35a7" },

  // Cyan / Türkis
  { id: "cyan_soft", label: "Aquamarin", kind: "color", hex: "#a5f3fc" },
  { id: "cyan_mid", label: "Türkis", kind: "color", hex: "#22d3ee" },
  { id: "cyan_vivid", label: "Lagune", kind: "color", hex: "#06b6d4" },
  { id: "cyan_deep", label: "Petrol", kind: "color", hex: "#0e7490" },

  // Mint / Grün
  { id: "green_soft", label: "Mint", kind: "color", hex: "#bbf7d0" },
  { id: "green_mid", label: "Limette", kind: "color", hex: "#4ade80" },
  { id: "green_vivid", label: "Smaragd", kind: "color", hex: "#10b981" },
  { id: "green_deep", label: "Waldgrün", kind: "color", hex: "#15803d" },
];

export const DEFAULT_FAVORITES: PaletteColor[] = [
  WHITE_PALETTE[2], // 2700K Warm
  COLOR_PALETTE[1], // Honig-Gold
  COLOR_PALETTE[13], // Amethyst
  COLOR_PALETTE[17], // Himmelblau
];

export function pushRecentColor(
  recent: PaletteColor[],
  color: PaletteColor,
  maxItems = 8,
): PaletteColor[] {
  const filtered = recent.filter((item) => item.id !== color.id);
  return [color, ...filtered].slice(0, maxItems);
}

export function toggleFavoriteColor(
  favorites: PaletteColor[],
  color: PaletteColor,
): PaletteColor[] {
  const exists = favorites.some((item) => item.id === color.id);
  if (exists) {
    return favorites.filter((item) => item.id !== color.id);
  }
  return [color, ...favorites].slice(0, 12);
}
