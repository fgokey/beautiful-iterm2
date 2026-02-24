import type { Theme } from "@/lib/themes";
import type { CSSProperties } from "react";

type ThemeCardProps = {
  theme: Theme;
  selected: boolean;
  rating?: number;
  selectedFont: string;
  onSelect: (themeId: string) => void;
};

export function ThemeCard({ theme, selected, rating, selectedFont, onSelect }: ThemeCardProps) {
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
    "--theme-tag-bg": theme.palette.tagBg,
    "--theme-tag-text": theme.palette.tagText,
    "--theme-border": theme.palette.border,
    "--theme-glow": theme.palette.glow,
    "--terminal-font": `"${selectedFont}", "Fira Code", "JetBrains Mono", "IBM Plex Mono", monospace`
  } as CSSProperties;

  return (
    <button
      type="button"
      className={`theme-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(theme.id)}
      aria-pressed={selected}
      style={terminalStyle}
    >
      <div className="terminal-preview">
        <div className="terminal-header">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="terminal-title">iTerm2</span>
        </div>
        <div className="terminal-body">
          <div className="prompt-line">
            <span className="prompt-symbol">❯</span>
            <span className="prompt-path">~/projects</span>
            <span className="prompt-git">main</span>
          </div>
          <div className="command-line">$ {theme.commandPreview}</div>
          <div className="output-line">
            <span className="keyword">status:</span> <span className="string">{theme.outputPreview}</span>
          </div>
          <div className="prompt-line">
            <span className="prompt-symbol">❯</span>
            <span className="prompt-path">~/projects</span>
            <span className="prompt-git">main</span>
            <span className="command-inline">
              git <span className="cursor" />
            </span>
          </div>
        </div>
      </div>

      <div className="theme-info">
        <div className="card-header">
          <span className="badge">{theme.badge}</span>
          {rating ? <span className="rating">★ {rating.toFixed(1)}</span> : <span className="rating empty">未评分</span>}
        </div>
        <h3>{theme.name}</h3>
        <p>{theme.description}</p>
        <div className="tags">
          {theme.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </button>
  );
}
