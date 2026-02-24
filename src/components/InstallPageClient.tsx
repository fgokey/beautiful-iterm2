"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import type { BeautifyOptions } from "@/lib/script";
import { DEFAULT_BEAUTIFY_OPTIONS, generateInstallManagerScript } from "@/lib/script";
import type { Theme } from "@/lib/themes";

type InstallPageClientProps = {
  theme: Theme;
};

function toBool(input: string | null, fallback: boolean): boolean {
  if (input === null) {
    return fallback;
  }
  return input === "true";
}

export function InstallPageClient({ theme }: InstallPageClientProps) {
  const searchParams = useSearchParams();
  const selectedFont = searchParams.get("font") ?? "Fira Code";
  const options: BeautifyOptions = useMemo(
    () => ({
      statusBar: toBool(searchParams.get("statusBar"), DEFAULT_BEAUTIFY_OPTIONS.statusBar),
      glassUi: toBool(searchParams.get("glassUi"), DEFAULT_BEAUTIFY_OPTIONS.glassUi),
      cursorFx: toBool(searchParams.get("cursorFx"), DEFAULT_BEAUTIFY_OPTIONS.cursorFx),
      tmuxTheme: toBool(searchParams.get("tmuxTheme"), DEFAULT_BEAUTIFY_OPTIONS.tmuxTheme)
    }),
    [searchParams]
  );
  const script = useMemo(() => generateInstallManagerScript(theme, options, selectedFont), [theme, options, selectedFont]);
  const scriptName = `${theme.id}-theme.sh`;

  function downloadScript() {
    const blob = new Blob([script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${theme.id}-theme.sh`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  return (
    <main className="install-shell">
      <h1>{theme.name} 脚本下载安装</h1>
      <p>这个页面专门用于下载可重复执行的安装/卸载脚本。</p>
      <section className="selected-options-box">
        <div className="selected-options-title">本次脚本包含的可选模块</div>
        <div className="selected-options-list">
          <span className="selected-option-item enabled">字体配置 {selectedFont}</span>
          <span className={`selected-option-item ${options.statusBar ? "enabled" : "disabled"}`}>
            状态栏预设 {options.statusBar ? "ON" : "OFF"}
          </span>
          <span className={`selected-option-item ${options.glassUi ? "enabled" : "disabled"}`}>
            玻璃/透明风格 {options.glassUi ? "ON" : "OFF"}
          </span>
          <span className={`selected-option-item ${options.cursorFx ? "enabled" : "disabled"}`}>
            光标动画预设 {options.cursorFx ? "ON" : "OFF"}
          </span>
          <span className={`selected-option-item ${options.tmuxTheme ? "enabled" : "disabled"}`}>
            tmux 美化套件 {options.tmuxTheme ? "ON" : "OFF"}
          </span>
        </div>
      </section>
      <section className="usage-box">
        <div className="usage-title">脚本运行方法</div>
        <p>1. 点击下方“下载安装管理脚本”，然后在终端进入脚本所在目录。</p>
        <p>2. 必须使用 bash 执行（不要用 sh）。</p>
        <p>3. 按下面命令执行（支持一键安装 / 卸载 / 状态检查 / 生效校验）：</p>
        <pre className="usage-commands">{`chmod +x ${scriptName}
bash ${scriptName} install
bash ${scriptName} uninstall
bash ${scriptName} status
bash ${scriptName} verify`}</pre>
        <p>说明：安装会应用主题与已选模块；卸载只回滚脚本管理的改动，不会误删其他配置。</p>
      </section>
      <pre>{script}</pre>
      <div className="panel-actions compact install-actions">
        <button type="button" onClick={downloadScript}>
          下载安装管理脚本
        </button>
        <a href={theme.themeUrl} target="_blank" rel="noreferrer">
          直接查看主题源文件
        </a>
        <Link className="install-link wide" href="/">
          返回主题列表
        </Link>
      </div>
    </main>
  );
}
