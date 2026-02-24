import type { CSSProperties } from "react";

import type { BeautifyOptions } from "@/lib/script";
import type { Theme } from "@/lib/themes";

type ThemeShowcaseProps = {
  theme: Theme;
  selectedFont: string;
  options: BeautifyOptions;
};

export function ThemeShowcase({ theme, selectedFont, options }: ThemeShowcaseProps) {
  const terminalStyle = {
    "--theme-bg": theme.palette.terminalBg,
    "--theme-bg-alt": theme.palette.terminalBgAlt,
    "--theme-text": theme.palette.text,
    "--theme-path": theme.palette.promptPath,
    "--theme-git": theme.palette.promptGit,
    "--theme-symbol": theme.palette.promptSymbol,
    "--theme-command": theme.palette.command,
    "--theme-output": theme.palette.output,
    "--theme-keyword": theme.palette.keyword,
    "--theme-string": theme.palette.string,
    "--theme-number": theme.palette.number,
    "--theme-cursor": theme.palette.cursor,
    "--theme-info-bg": theme.palette.infoBg,
    "--theme-border": theme.palette.border,
    "--theme-glow": theme.palette.glow,
    "--terminal-font": `"${selectedFont}", "Fira Code", "JetBrains Mono", "IBM Plex Mono", monospace`
  } as CSSProperties;

  return (
    <section className={`showcase-card ${options.glassUi ? "glass-enabled" : ""}`} style={terminalStyle}>
      <div className="showcase-top">
        <span className="showcase-label">详细预览</span>
        <span className="showcase-theme">{theme.name}</span>
      </div>
      <div className="terminal-preview">
        <div className="terminal-header">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="terminal-title">iTerm2</span>
        </div>
        <div className="terminal-body showcase-terminal-body">
          <div className="prompt-line">
            <span className="prompt-symbol">❯</span>
            <span className="prompt-path">
              {options.glassUi ? "◉ ~/workspace/iterm2" : "~/workspace/iterm2"}
            </span>
            <span className="prompt-git">main</span>
          </div>
          <div className="command-line">$ {theme.commandPreview}</div>
          <div className="output-line">
            <span className="keyword">status:</span> <span className="string">{theme.outputPreview}</span>
          </div>

          {options.tmuxTheme ? (
            <>
              <div className="command-line">$ tmux new -s dev</div>
              <div className="tmux-preview-bar">[dev] 1:zsh*  2:editor  3:server | CPU 19% | 14:28</div>
            </>
          ) : null}

          <div className="prompt-line">
            <span className="prompt-symbol">❯</span>
            <span className="prompt-path">
              {options.glassUi ? "◉ ~/workspace/iterm2" : "~/workspace/iterm2"}
            </span>
            <span className="prompt-git">main</span>
          </div>
          <div className="command-line cursor-line">
            $ git status <span className={`cursor ${options.cursorFx ? "fx-on" : "fx-off"}`} />
          </div>
        </div>
        {options.statusBar ? (
          <div className="statusbar-preview">
            <span>⌘ profile: ITP Beautify</span>
            <span>⚙ dev</span>
            <span>🔋 87%</span>
            <span>CPU 22%</span>
            <span>14:28</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
