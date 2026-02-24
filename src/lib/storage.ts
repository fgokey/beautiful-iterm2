const RATINGS_KEY = "theme-ratings-v1";
const SELECTED_FONT_KEY = "selected-font-v1";
const BEAUTIFY_OPTIONS_KEY = "beautify-options-v1";

export type RatingsMap = Record<string, number>;

export function loadRatings(): RatingsMap {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(RATINGS_KEY);
    if (!raw) {
      return {};
    }
    return JSON.parse(raw) as RatingsMap;
  } catch {
    return {};
  }
}

export function saveRatings(ratings: RatingsMap): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
}

export function loadSelectedFont(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage.getItem(SELECTED_FONT_KEY);
  } catch {
    return null;
  }
}

export function saveSelectedFont(font: string): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SELECTED_FONT_KEY, font);
}

export type StoredBeautifyOptions = {
  statusBar: boolean;
  glassUi: boolean;
  cursorFx: boolean;
  tmuxTheme: boolean;
};

export function loadBeautifyOptions(): StoredBeautifyOptions | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(BEAUTIFY_OPTIONS_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<StoredBeautifyOptions>;
    if (
      typeof parsed.statusBar === "boolean" &&
      typeof parsed.glassUi === "boolean" &&
      typeof parsed.cursorFx === "boolean" &&
      typeof parsed.tmuxTheme === "boolean"
    ) {
      return parsed as StoredBeautifyOptions;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveBeautifyOptions(options: StoredBeautifyOptions): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(BEAUTIFY_OPTIONS_KEY, JSON.stringify(options));
}
