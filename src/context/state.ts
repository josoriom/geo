import type { ZipFileEntry } from "../hooks/useGeoJsonFromZip";

export interface ColorTheme {
  marker: string;
  min: string;
  max: string;
}

export interface GeoState {
  zipName: string;
  zipLocation: string;
  availableFiles: ZipFileEntry[];
  // displayFiles: Set<string>;
  activeGradientFile: string | null;
  colors: ColorTheme;
  activeTab: number;
  isMenuExpanded: boolean;
  isBarplotExpanded: boolean;
}

export const GEO_INITIAL_STATE: GeoState = {
  zipName: "allSensoryWithWeights.zip",
  zipLocation: "/data/allSensoryWithWeights.zip",
  availableFiles: [],
  // displayFiles: new Set(),
  activeGradientFile: null,
  // colors: { base: "#94a3b8", min: "#ef4444", max: "#22c55e" },
  colors: { marker: "#94a3b8", min: "#0a65cd", max: "#e40749" },
  activeTab: 0,
  isMenuExpanded: true,
  isBarplotExpanded: true,
};
