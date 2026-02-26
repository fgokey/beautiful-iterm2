"use client";

import { useEffect, useMemo, useState } from "react";

import { ConfigPanel } from "@/components/ConfigPanel";
import { ThemeCard } from "@/components/ThemeCard";
import { ThemeShowcase } from "@/components/ThemeShowcase";
import { DEFAULT_BEAUTIFY_OPTIONS, type BeautifyOptions } from "@/lib/script";
import { loadBeautifyOptions, loadRatings, loadSelectedFont, saveBeautifyOptions, saveSelectedFont } from "@/lib/storage";
import { DEFAULT_THEME_ID, THEMES, findTheme } from "@/lib/themes";

const FONTS = [
  "Fira Code",
  "JetBrains Mono",
  "Source Code Pro",
  "IBM Plex Mono",
  "Inconsolata",
  "Roboto Mono",
  "DM Mono",
  "Space Mono",
  "Ubuntu Mono",
  "Victor Mono",
  "Overpass Mono",
  "Anonymous Pro",
  "Iosevka",
  "Menlo",
  "Monaco"
];

export function HomeClient() {
  const [selectedThemeId, setSelectedThemeId] = useState(DEFAULT_THEME_ID);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [beautifyOptions, setBeautifyOptions] = useState<BeautifyOptions>(DEFAULT_BEAUTIFY_OPTIONS);
  const [readyToPersist, setReadyToPersist] = useState(false);

  useEffect(() => {
    setRatings(loadRatings());
    const persistedFont = loadSelectedFont();
    if (persistedFont && FONTS.includes(persistedFont)) {
      setSelectedFont(persistedFont);
    }
    const persistedOptions = loadBeautifyOptions();
    if (persistedOptions) {
      setBeautifyOptions(persistedOptions);
    }
    setReadyToPersist(true);
  }, []);

  useEffect(() => {
    if (!readyToPersist) {
      return;
    }
    saveSelectedFont(selectedFont);
  }, [readyToPersist, selectedFont]);

  useEffect(() => {
    if (!readyToPersist) {
      return;
    }
    saveBeautifyOptions(beautifyOptions);
  }, [readyToPersist, beautifyOptions]);

  const selectedTheme = useMemo(() => findTheme(selectedThemeId) ?? THEMES[0], [selectedThemeId]);

  function toggleBeautifyOption(key: keyof BeautifyOptions) {
    setBeautifyOptions((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (readyToPersist) {
        saveBeautifyOptions(next);
      }
      return next;
    });
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <h1>iTerm💎美颜小助手💎</h1>
        <p>
          已收录 {THEMES.length} 个主题。左侧选主题，右侧固定显示详细终端预览和安装配置，无需回滚页面。
        </p>
      </section>

      <section className="font-selector">
        <label htmlFor="font-select">终端字体</label>
        <select
          id="font-select"
          value={selectedFont}
          onChange={(event) => {
            const nextFont = event.target.value;
            setSelectedFont(nextFont);
            if (readyToPersist) {
              saveSelectedFont(nextFont);
            }
          }}
        >
          {FONTS.map((font) => (
            <option value={font} key={font}>
              {font}
            </option>
          ))}
        </select>
      </section>

      <section className="layout-grid">
        <div className="theme-grid">
          {THEMES.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              selected={theme.id === selectedThemeId}
              rating={ratings[theme.id]}
              selectedFont={selectedFont}
              onSelect={setSelectedThemeId}
            />
          ))}
        </div>

        <aside className="side-panel">
          <ThemeShowcase theme={selectedTheme} selectedFont={selectedFont} options={beautifyOptions} />
          <ConfigPanel
            selectedTheme={selectedTheme}
            selectedFont={selectedFont}
            options={beautifyOptions}
            onToggleOption={toggleBeautifyOption}
          />
        </aside>
      </section>
    </main>
  );
}
