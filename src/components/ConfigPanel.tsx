"use client";

import Link from "next/link";
import { useMemo } from "react";

import type { BeautifyOptions } from "@/lib/script";
import { generateQuickScript } from "@/lib/script";
import type { Theme } from "@/lib/themes";

type ConfigPanelProps = {
  selectedTheme: Theme;
  selectedFont: string;
  options: BeautifyOptions;
  onToggleOption: (key: keyof BeautifyOptions) => void;
};

export function ConfigPanel({ selectedTheme, selectedFont, options, onToggleOption }: ConfigPanelProps) {
  const script = useMemo(() => generateQuickScript(selectedTheme, selectedFont, options), [selectedTheme, selectedFont, options]);

  const optionQuery = new URLSearchParams({
    statusBar: String(options.statusBar),
    glassUi: String(options.glassUi),
    cursorFx: String(options.cursorFx),
    tmuxTheme: String(options.tmuxTheme),
    font: selectedFont
  }).toString();

  async function copyScript() {
    await navigator.clipboard.writeText(script);
  }

  return (
    <aside className="action-panel">
      <div className="beautify-options compact">
        <label className={`option-setting ${options.statusBar ? "active" : ""}`}>
          <span className="option-switch-wrap">
            <input
              className="option-setting-input"
              type="checkbox"
              checked={options.statusBar}
              onChange={() => onToggleOption("statusBar")}
            />
            <span className="option-switch-control">
              <span className="option-switch-thumb" />
            </span>
          </span>
          <span className="option-setting-meta">
            <span className="option-setting-title">状态栏预设</span>
            <span className="option-setting-desc">在终端底部显示时间、CPU、电量等状态信息。</span>
          </span>
        </label>
        <label className={`option-setting ${options.glassUi ? "active" : ""}`}>
          <span className="option-switch-wrap">
            <input
              className="option-setting-input"
              type="checkbox"
              checked={options.glassUi}
              onChange={() => onToggleOption("glassUi")}
            />
            <span className="option-switch-control">
              <span className="option-switch-thumb" />
            </span>
          </span>
          <span className="option-setting-meta">
            <span className="option-setting-title">毛玻璃风格</span>
            <span className="option-setting-desc">启用透明、模糊和边框高光，模拟系统玻璃质感。</span>
          </span>
        </label>
        <label className={`option-setting ${options.cursorFx ? "active" : ""}`}>
          <span className="option-switch-wrap">
            <input
              className="option-setting-input"
              type="checkbox"
              checked={options.cursorFx}
              onChange={() => onToggleOption("cursorFx")}
            />
            <span className="option-switch-control">
              <span className="option-switch-thumb" />
            </span>
          </span>
          <span className="option-setting-meta">
            <span className="option-setting-title">光标动画</span>
            <span className="option-setting-desc">应用条状光标与呼吸闪烁节奏，增强动态感。</span>
          </span>
        </label>
        <label className={`option-setting ${options.tmuxTheme ? "active" : ""}`}>
          <span className="option-switch-wrap">
            <input
              className="option-setting-input"
              type="checkbox"
              checked={options.tmuxTheme}
              onChange={() => onToggleOption("tmuxTheme")}
            />
            <span className="option-switch-control">
              <span className="option-switch-thumb" />
            </span>
          </span>
          <span className="option-setting-meta">
            <span className="option-setting-title">tmux 美化</span>
            <span className="option-setting-desc">安装 Catppuccin 主题和状态栏样式，统一视觉语言。</span>
          </span>
        </label>
      </div>
      <div className="panel-actions compact">
        <button type="button" onClick={copyScript}>
          复制脚本
        </button>
        <Link className="install-link" href={`/install/${selectedTheme.id}?${optionQuery}`}>
          进入脚本下载安装页
        </Link>
      </div>
    </aside>
  );
}
