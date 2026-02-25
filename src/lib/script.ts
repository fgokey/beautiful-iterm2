import type { Theme } from "@/lib/themes";

export type BeautifyOptions = {
  statusBar: boolean;
  glassUi: boolean;
  cursorFx: boolean;
  tmuxTheme: boolean;
};

export const DEFAULT_BEAUTIFY_OPTIONS: BeautifyOptions = {
  statusBar: true,
  glassUi: true,
  cursorFx: true,
  tmuxTheme: false
};

function boolToFlag(value: boolean): string {
  return value ? "1" : "0";
}

type FontInstallMode = "brew" | "builtin" | "manual";

type FontInstallConfig = {
  mode: FontInstallMode;
  cask?: string;
  note?: string;
};

const FONT_INSTALL_CONFIG: Record<string, FontInstallConfig> = {
  "Fira Code": { mode: "brew", cask: "font-fira-code" },
  "JetBrains Mono": { mode: "brew", cask: "font-jetbrains-mono" },
  "Source Code Pro": { mode: "brew", cask: "font-source-code-pro" },
  "IBM Plex Mono": { mode: "brew", cask: "font-ibm-plex" },
  Inconsolata: { mode: "brew", cask: "font-inconsolata" },
  "Roboto Mono": { mode: "brew", cask: "font-roboto-mono" },
  "DM Mono": { mode: "brew", cask: "font-dm-mono" },
  "Space Mono": { mode: "brew", cask: "font-space-mono" },
  "Ubuntu Mono": { mode: "brew", cask: "font-ubuntu-mono-derivative-powerline" },
  "Victor Mono": { mode: "brew", cask: "font-victor-mono" },
  "Overpass Mono": { mode: "brew", cask: "font-overpass" },
  "Anonymous Pro": { mode: "brew", cask: "font-anonymous-pro" },
  Iosevka: { mode: "brew", cask: "font-iosevka" },
  Menlo: { mode: "builtin", note: "macOS built-in font" },
  Monaco: { mode: "builtin", note: "macOS built-in font" }
};

function resolveFontInstallConfig(font: string): FontInstallConfig {
  return FONT_INSTALL_CONFIG[font] ?? { mode: "manual", note: "No managed installer mapped for this font" };
}

export function generateQuickScript(theme: Theme, font: string, options: BeautifyOptions): string {
  const fontConfig = resolveFontInstallConfig(font);

  return `#!/bin/bash
# iTerm2 quick setup - ${theme.name}
set -euo pipefail

THEME_URL="${theme.themeUrl}"
THEME_DIR="$HOME/Library/Colors"
THEME_FILE="$THEME_DIR/${theme.id}.itermcolors"

INSTALL_STATUS_BAR="${boolToFlag(options.statusBar)}"
INSTALL_GLASS_UI="${boolToFlag(options.glassUi)}"
INSTALL_CURSOR_FX="${boolToFlag(options.cursorFx)}"
INSTALL_TMUX_THEME="${boolToFlag(options.tmuxTheme)}"
SELECTED_FONT="${font}"
FONT_INSTALL_MODE="${fontConfig.mode}"
FONT_CASK="${fontConfig.cask ?? ""}"
FONT_NOTE="${fontConfig.note ?? ""}"

echo "Theme: ${theme.name}"
echo "Font: ${font}"
mkdir -p "$THEME_DIR"
curl --fail --silent --show-error --location --retry 2 --connect-timeout 10 "$THEME_URL" -o "$THEME_FILE"
echo "Downloaded: $THEME_FILE"
if [ "$FONT_INSTALL_MODE" = "brew" ]; then
  echo "Font install candidate: $SELECTED_FONT ($FONT_CASK)"
elif [ "$FONT_INSTALL_MODE" = "builtin" ]; then
  echo "Font already built-in: $SELECTED_FONT"
else
  echo "Font install not managed automatically: $SELECTED_FONT ($FONT_NOTE)"
fi

echo "For full beautify install/uninstall lifecycle, use manager script:"
echo "  bash ${theme.id}-theme.sh install"
echo "  bash ${theme.id}-theme.sh uninstall"
`;
}

export function generateInstallManagerScript(theme: Theme, options: BeautifyOptions, font: string): string {
  const fontConfig = resolveFontInstallConfig(font);

  return `#!/bin/bash
# iTerm2 theme manager - ${theme.name}
set -euo pipefail

RED="\\033[0;31m"
GREEN="\\033[0;32m"
YELLOW="\\033[1;33m"
BLUE="\\033[0;34m"
NC="\\033[0m"

THEME_NAME="${theme.name}"
THEME_URL="${theme.themeUrl}"
THEME_DIR="$HOME/Library/Colors"
THEME_FILE="$THEME_DIR/${theme.id}.itermcolors"

INSTALL_STATUS_BAR="${boolToFlag(options.statusBar)}"
INSTALL_GLASS_UI="${boolToFlag(options.glassUi)}"
INSTALL_CURSOR_FX="${boolToFlag(options.cursorFx)}"
INSTALL_TMUX_THEME="${boolToFlag(options.tmuxTheme)}"
SELECTED_FONT="${font}"
FONT_INSTALL_MODE="${fontConfig.mode}"
FONT_CASK="${fontConfig.cask ?? ""}"
FONT_NOTE="${fontConfig.note ?? ""}"

STATE_DIR="$HOME/.iterm2-theme-preview"
STATE_FILE="$STATE_DIR/${theme.id}.state"
DYNAMIC_PROFILE_DIR="$HOME/Library/Application Support/iTerm2/DynamicProfiles"
DYNAMIC_PROFILE_FILE="$DYNAMIC_PROFILE_DIR/iterm2-theme-preview-beautify.json"
DYNAMIC_PROFILE_BACKUP_FILE="$STATE_DIR/${theme.id}.dynamic-profile.backup.json"
PROFILE_NAME="ITP Beautify Profile"
PROFILE_GUID="iterm2-theme-preview-beautify-profile"
DEFAULT_BOOKMARK_GUID_KEY="Default Bookmark Guid"
PROFILE_FONT_SIZE=13
PROFILE_FONT_VALUE="${font} 13"

TMUX_PREINSTALLED=1
TPM_INSTALLED_BY_SCRIPT=0
TMUX_CONF_MANAGED=0
DYNAMIC_PROFILE_MANAGED=0
DYNAMIC_PROFILE_BACKED_UP=0
FONT_INSTALLED_BY_SCRIPT=0
DEFAULT_BOOKMARK_GUID_ORIGINAL=""
DEFAULT_BOOKMARK_GUID_BACKED_UP=0

require_bash() {
  if [ -z "\${BASH_VERSION:-}" ]; then
    echo "Please run this script with bash:"
    echo "  bash $0 install"
    exit 1
  fi
}

ensure_state_dir_writable() {
  mkdir -p "$STATE_DIR" >/dev/null 2>&1 || true
  if [ ! -d "$STATE_DIR" ]; then
    echo -e "\${RED}State dir unavailable: $STATE_DIR\${NC}"
    echo "Please create it and ensure current user has write permission."
    exit 1
  fi
  if [ ! -w "$STATE_DIR" ]; then
    echo -e "\${RED}State dir not writable: $STATE_DIR\${NC}"
    echo "Run:"
    echo "  sudo chown -R \"$(id -un)\":staff \"$STATE_DIR\""
    echo "  chmod -R u+rwX \"$STATE_DIR\""
    exit 1
  fi
}

check_installed() {
  [ -f "$THEME_FILE" ]
}

brew_available() {
  command -v brew >/dev/null 2>&1
}

brew_pkg_installed() {
  brew list "$1" >/dev/null 2>&1
}

brew_cask_installed() {
  brew list --cask "$1" >/dev/null 2>&1
}

init_state_file() {
  ensure_state_dir_writable
  cat > "$STATE_FILE" <<EOF_STATE
TMUX_PREINSTALLED=1
TPM_INSTALLED_BY_SCRIPT=0
TMUX_CONF_MANAGED=0
DYNAMIC_PROFILE_MANAGED=0
DYNAMIC_PROFILE_BACKED_UP=0
FONT_INSTALLED_BY_SCRIPT=0
DEFAULT_BOOKMARK_GUID_ORIGINAL=
DEFAULT_BOOKMARK_GUID_BACKED_UP=0
EOF_STATE
}

save_state_file() {
  cat > "$STATE_FILE" <<EOF_STATE
TMUX_PREINSTALLED=$TMUX_PREINSTALLED
TPM_INSTALLED_BY_SCRIPT=$TPM_INSTALLED_BY_SCRIPT
TMUX_CONF_MANAGED=$TMUX_CONF_MANAGED
DYNAMIC_PROFILE_MANAGED=$DYNAMIC_PROFILE_MANAGED
DYNAMIC_PROFILE_BACKED_UP=$DYNAMIC_PROFILE_BACKED_UP
FONT_INSTALLED_BY_SCRIPT=$FONT_INSTALLED_BY_SCRIPT
DEFAULT_BOOKMARK_GUID_ORIGINAL=$DEFAULT_BOOKMARK_GUID_ORIGINAL
DEFAULT_BOOKMARK_GUID_BACKED_UP=$DEFAULT_BOOKMARK_GUID_BACKED_UP
EOF_STATE
}

read_default_bookmark_guid() {
  defaults read com.googlecode.iterm2 "$DEFAULT_BOOKMARK_GUID_KEY" 2>/dev/null || true
}

set_default_bookmark_guid() {
  local current_default_guid
  if [ "\${DEFAULT_BOOKMARK_GUID_BACKED_UP:-0}" != "1" ]; then
    current_default_guid="$(read_default_bookmark_guid)"
    DEFAULT_BOOKMARK_GUID_ORIGINAL="$current_default_guid"
    DEFAULT_BOOKMARK_GUID_BACKED_UP=1
  fi

  if defaults write com.googlecode.iterm2 "$DEFAULT_BOOKMARK_GUID_KEY" -string "$PROFILE_GUID" >/dev/null 2>&1; then
    echo -e "\${GREEN}Set iTerm2 default profile: \${PROFILE_NAME}\${NC}"
  else
    echo -e "\${YELLOW}Unable to set iTerm2 default profile automatically.\${NC}"
  fi
}

restore_default_bookmark_guid() {
  if [ "\${DEFAULT_BOOKMARK_GUID_BACKED_UP:-0}" != "1" ]; then
    return
  fi

  if [ -n "\${DEFAULT_BOOKMARK_GUID_ORIGINAL:-}" ]; then
    defaults write com.googlecode.iterm2 "$DEFAULT_BOOKMARK_GUID_KEY" -string "$DEFAULT_BOOKMARK_GUID_ORIGINAL" >/dev/null 2>&1 || true
  else
    defaults delete com.googlecode.iterm2 "$DEFAULT_BOOKMARK_GUID_KEY" >/dev/null 2>&1 || true
  fi
}

install_font_if_needed() {
  case "$FONT_INSTALL_MODE" in
    brew)
      if brew_available; then
        if brew_cask_installed "$FONT_CASK"; then
          if [ "\${FONT_INSTALLED_BY_SCRIPT:-0}" != "1" ]; then
            FONT_INSTALLED_BY_SCRIPT=0
          fi
          echo -e "\${YELLOW}Font already installed: \${SELECTED_FONT}\${NC}"
        else
          brew tap homebrew/cask-fonts >/dev/null 2>&1 || true
          brew install --cask "$FONT_CASK"
          FONT_INSTALLED_BY_SCRIPT=1
          echo -e "\${GREEN}Installed font: \${SELECTED_FONT}\${NC}"
        fi
      else
        echo -e "\${YELLOW}Homebrew not found. Font install skipped: \${SELECTED_FONT}\${NC}"
      fi
      ;;
    builtin)
      FONT_INSTALLED_BY_SCRIPT=0
      echo -e "\${GREEN}Using built-in font: \${SELECTED_FONT}\${NC}"
      ;;
    *)
      FONT_INSTALLED_BY_SCRIPT=0
      echo -e "\${YELLOW}Font install not managed automatically: \${SELECTED_FONT}\${NC}"
      [ -n "$FONT_NOTE" ] && echo -e "\${YELLOW}Note: \${FONT_NOTE}\${NC}"
      ;;
  esac
}

uninstall_font_if_needed() {
  if [ "$FONT_INSTALL_MODE" = "brew" ] && [ "\${FONT_INSTALLED_BY_SCRIPT:-0}" = "1" ]; then
    if brew_available; then
      brew uninstall --cask "$FONT_CASK" >/dev/null 2>&1 || true
      echo -e "\${GREEN}Removed font installed by script: \${SELECTED_FONT}\${NC}"
    fi
  fi
}

load_state_file() {
  if [ -f "$STATE_FILE" ]; then
    if [ ! -r "$STATE_FILE" ]; then
      echo -e "\${RED}State file not readable: $STATE_FILE\${NC}"
      echo "Please fix file permission and re-run."
      exit 1
    fi
    # shellcheck disable=SC1090
    source "$STATE_FILE"
  fi
}

write_dynamic_profile() {
  mkdir -p "$DYNAMIC_PROFILE_DIR"
  ensure_state_dir_writable

  FONT_BLOCK="$(printf '\n        "Normal Font": "%s",\n        "Non Ascii Font": "%s",' "$PROFILE_FONT_VALUE" "$PROFILE_FONT_VALUE")"
  THEME_COLOR_BLOCK=''
  GLASS_BLOCK=''
  CURSOR_BLOCK=''
  STATUS_BAR_BLOCK=''

  if [ "$INSTALL_GLASS_UI" = "1" ]; then
    GLASS_BLOCK='\n        "Use Transparency": true,\n        "Transparency": 0.22,\n        "Blur": true,\n        "Blur Radius": 28,'
  fi

  if [ "$INSTALL_CURSOR_FX" = "1" ]; then
    CURSOR_BLOCK='\n        "Cursor Type": 2,\n        "Blinking Cursor": true,'
  fi

  if [ "$INSTALL_STATUS_BAR" = "1" ]; then
    STATUS_BAR_BLOCK='\n        "Show Status Bar": true,'
  fi

  if command -v python3 >/dev/null 2>&1 && [ -f "$THEME_FILE" ]; then
    THEME_COLOR_BLOCK="$(python3 - "$THEME_FILE" <<'EOF_PY'
import json
import plistlib
import sys

theme_file = sys.argv[1]
with open(theme_file, "rb") as f:
    data = plistlib.load(f)

keys = sorted([k for k in data.keys() if "Color" in k])
parts = []
for key in keys:
    parts.append(f'\\n        "{key}": {json.dumps(data[key], separators=(",", ":"))},')
print("".join(parts), end="")
EOF_PY
)"
  fi

  if [ -f "$DYNAMIC_PROFILE_FILE" ] && [ "\${DYNAMIC_PROFILE_MANAGED:-0}" != "1" ] && [ "\${DYNAMIC_PROFILE_BACKED_UP:-0}" != "1" ]; then
    if ! cp "$DYNAMIC_PROFILE_FILE" "$DYNAMIC_PROFILE_BACKUP_FILE"; then
      echo -e "\${RED}Failed to backup dynamic profile to: $DYNAMIC_PROFILE_BACKUP_FILE\${NC}"
      echo "Please fix write permission for $STATE_DIR and re-run."
      exit 1
    fi
    DYNAMIC_PROFILE_BACKED_UP=1
  fi

  cat > "$DYNAMIC_PROFILE_FILE" <<EOF_PROFILE
{
  "Profiles": [
    {
      "Name": "$PROFILE_NAME",$THEME_COLOR_BLOCK
      "Guid": "$PROFILE_GUID",$FONT_BLOCK$GLASS_BLOCK$CURSOR_BLOCK$STATUS_BAR_BLOCK
      "Tags": ["iterm2-theme-preview"]
    }
  ]
}
EOF_PROFILE

  DYNAMIC_PROFILE_MANAGED=1
}

remove_dynamic_profile() {
  if [ "\${DYNAMIC_PROFILE_MANAGED:-0}" = "1" ]; then
    if [ "\${DYNAMIC_PROFILE_BACKED_UP:-0}" = "1" ] && [ -f "$DYNAMIC_PROFILE_BACKUP_FILE" ]; then
      mv "$DYNAMIC_PROFILE_BACKUP_FILE" "$DYNAMIC_PROFILE_FILE"
    else
      rm -f "$DYNAMIC_PROFILE_FILE"
    fi
  fi
}

apply_profile_to_current_session() {
  osascript <<'EOF_OSA' >/dev/null 2>&1 || true
tell application "iTerm2"
  if (count of windows) = 0 then
    create window with profile "ITP Beautify Profile"
  else
    repeat with w in windows
      tell w
        set newTab to (create tab with profile "ITP Beautify Profile")
        tell newTab to select
      end tell
    end repeat
  end if
  activate
end tell
EOF_OSA
}

apply_theme_preset_to_all_sessions() {
  osascript <<EOF_OSA >/dev/null 2>&1 || true
tell application "iTerm2"
  repeat with w in windows
    repeat with t in tabs of w
      repeat with s in sessions of t
        try
          set color preset of s to "$THEME_NAME"
        end try
      end repeat
    end repeat
  end repeat
end tell
EOF_OSA
}

append_tmux_block() {
  TMUX_CONF="$HOME/.tmux.conf"
  if [ ! -f "$TMUX_CONF" ]; then
    touch "$TMUX_CONF"
  fi

  if ! grep -q "# iterm2-theme-preview-tmux-start" "$TMUX_CONF"; then
    cat >> "$TMUX_CONF" <<'EOF_TMUX'

# iterm2-theme-preview-tmux-start
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'catppuccin/tmux'
set -g @catppuccin_flavor 'mocha'
set -g @catppuccin_status_background 'none'
run '~/.tmux/plugins/tpm/tpm'
# iterm2-theme-preview-tmux-end
EOF_TMUX
    TMUX_CONF_MANAGED=1
  fi
}

remove_tmux_block() {
  TMUX_CONF="$HOME/.tmux.conf"
  if [ -f "$TMUX_CONF" ]; then
    awk '
      /# iterm2-theme-preview-tmux-start/ {skip=1; next}
      /# iterm2-theme-preview-tmux-end/ {skip=0; next}
      skip!=1 {print}
    ' "$TMUX_CONF" > "$TMUX_CONF.tmp" && mv "$TMUX_CONF.tmp" "$TMUX_CONF"
  fi
}

ensure_tpm() {
  if [ -d "$HOME/.tmux/plugins/tpm" ]; then
    TPM_INSTALLED_BY_SCRIPT=0
  else
    git clone https://github.com/tmux-plugins/tpm "$HOME/.tmux/plugins/tpm" >/dev/null 2>&1
    TPM_INSTALLED_BY_SCRIPT=1
  fi
}

remove_tpm_if_needed() {
  if [ "\${TPM_INSTALLED_BY_SCRIPT:-0}" = "1" ]; then
    rm -rf "$HOME/.tmux/plugins/tpm"
  fi
}

show_help() {
  echo "Usage:"
  echo "  $0 install"
  echo "  $0 uninstall"
  echo "  $0 status"
  echo "  $0 verify"
}

install_theme() {
  echo -e "\${BLUE}Installing: \${THEME_NAME}\${NC}"
  ensure_state_dir_writable
  if [ -f "$STATE_FILE" ]; then
    load_state_file
  else
    init_state_file
  fi

  if check_installed; then
    echo -e "\${YELLOW}Theme already installed: \${THEME_FILE}\${NC}"
  else
    mkdir -p "$THEME_DIR"
    curl --fail --silent --show-error --location --retry 2 --connect-timeout 10 "$THEME_URL" -o "$THEME_FILE"
    echo -e "\${GREEN}Theme downloaded: \${THEME_FILE}\${NC}"
  fi

  install_font_if_needed

  if [ "$INSTALL_STATUS_BAR" = "1" ] || [ "$INSTALL_GLASS_UI" = "1" ] || [ "$INSTALL_CURSOR_FX" = "1" ]; then
    write_dynamic_profile
    set_default_bookmark_guid
    apply_profile_to_current_session
    apply_theme_preset_to_all_sessions
    echo -e "\${GREEN}Applied iTerm2 beautify profile preset\${NC}"
  fi

  if [ "$INSTALL_TMUX_THEME" = "1" ]; then
    if brew_available; then
      if brew_pkg_installed "tmux"; then
        if [ "\${TMUX_PREINSTALLED:-1}" != "0" ]; then
          TMUX_PREINSTALLED=1
        fi
      else
        TMUX_PREINSTALLED=0
        brew install tmux
      fi
      ensure_tpm
      append_tmux_block
      [ -x "$HOME/.tmux/plugins/tpm/bin/install_plugins" ] && "$HOME/.tmux/plugins/tpm/bin/install_plugins" >/dev/null 2>&1 || true
      echo -e "\${GREEN}Installed tmux beautify preset\${NC}"
    else
      echo -e "\${YELLOW}Homebrew not found. tmux beautify skipped.\${NC}"
    fi
  fi

  save_state_file

  echo ""
  echo "Done. If profile did not switch automatically, open iTerm2 and choose profile: $PROFILE_NAME"
}

uninstall_theme() {
  echo -e "\${BLUE}Uninstalling: \${THEME_NAME}\${NC}"
  ensure_state_dir_writable
  load_state_file

  if check_installed; then
    rm "$THEME_FILE"
    echo -e "\${GREEN}Theme removed: \${THEME_FILE}\${NC}"
  else
    echo -e "\${YELLOW}Theme file not present.\${NC}"
  fi

  if [ "$INSTALL_STATUS_BAR" = "1" ] || [ "$INSTALL_GLASS_UI" = "1" ] || [ "$INSTALL_CURSOR_FX" = "1" ]; then
    remove_dynamic_profile
    restore_default_bookmark_guid
    echo -e "\${GREEN}Removed iTerm2 beautify profile preset\${NC}"
  fi

  uninstall_font_if_needed

  if [ "$INSTALL_TMUX_THEME" = "1" ]; then
    if [ "\${TMUX_CONF_MANAGED:-0}" = "1" ]; then
      remove_tmux_block
    fi
    remove_tpm_if_needed
    if brew_available && [ "\${TMUX_PREINSTALLED:-1}" = "0" ]; then
      brew uninstall tmux >/dev/null 2>&1 || true
    fi
    echo -e "\${GREEN}Removed tmux beautify preset\${NC}"
  fi

  rm -f "$DYNAMIC_PROFILE_BACKUP_FILE"
  rm -f "$STATE_FILE"
}

show_status() {
  if check_installed; then
    echo -e "\${GREEN}Theme installed\${NC}: $THEME_FILE"
  else
    echo -e "\${YELLOW}Theme not installed\${NC}"
  fi

  echo "Enabled optional modules in this script:"
  echo "  - selected font: $SELECTED_FONT (mode: $FONT_INSTALL_MODE)"
  [ "$INSTALL_STATUS_BAR" = "1" ] && echo "  - iTerm2 status bar preset"
  [ "$INSTALL_GLASS_UI" = "1" ] && echo "  - glass/blur/window style preset"
  [ "$INSTALL_CURSOR_FX" = "1" ] && echo "  - cursor style & animation preset"
  [ "$INSTALL_TMUX_THEME" = "1" ] && echo "  - tmux beautify suite"
}

verify_theme() {
  VERIFY_FAILED=0
  current_default_guid="$(read_default_bookmark_guid)"

  if check_installed; then
    echo -e "\${GREEN}[OK]\${NC} Theme file exists: $THEME_FILE"
  else
    echo -e "\${RED}[FAIL]\${NC} Theme file missing: $THEME_FILE"
    VERIFY_FAILED=1
  fi

  if [ "$INSTALL_STATUS_BAR" = "1" ] || [ "$INSTALL_GLASS_UI" = "1" ] || [ "$INSTALL_CURSOR_FX" = "1" ]; then
    if [ -f "$DYNAMIC_PROFILE_FILE" ]; then
      echo -e "\${GREEN}[OK]\${NC} Dynamic profile file exists"
    else
      echo -e "\${RED}[FAIL]\${NC} Dynamic profile file missing: $DYNAMIC_PROFILE_FILE"
      VERIFY_FAILED=1
    fi

    if [ "$current_default_guid" = "$PROFILE_GUID" ]; then
      echo -e "\${GREEN}[OK]\${NC} Default iTerm2 profile is beautify profile"
    else
      echo -e "\${RED}[FAIL]\${NC} Default iTerm2 profile guid mismatch: \${current_default_guid:-<empty>}"
      VERIFY_FAILED=1
    fi

    if grep -F -q '"Normal Font": "'"$PROFILE_FONT_VALUE"'"' "$DYNAMIC_PROFILE_FILE"; then
      echo -e "\${GREEN}[OK]\${NC} Dynamic profile font set: $PROFILE_FONT_VALUE"
    else
      echo -e "\${YELLOW}[WARN]\${NC} Dynamic profile font not set as expected"
    fi

    if [ "$INSTALL_GLASS_UI" = "1" ]; then
      if grep -F -q '"Use Transparency": true' "$DYNAMIC_PROFILE_FILE" && grep -F -q '"Blur Radius": 28' "$DYNAMIC_PROFILE_FILE"; then
        echo -e "\${GREEN}[OK]\${NC} Glass profile keys detected (transparency + blur)"
      else
        echo -e "\${YELLOW}[WARN]\${NC} Glass profile keys not fully detected"
      fi
    fi
  fi

  case "$FONT_INSTALL_MODE" in
    brew)
      if brew_available && brew_cask_installed "$FONT_CASK"; then
        echo -e "\${GREEN}[OK]\${NC} Font installed: $SELECTED_FONT ($FONT_CASK)"
      else
        echo -e "\${YELLOW}[WARN]\${NC} Font not detected or brew unavailable: $SELECTED_FONT"
      fi
      ;;
    builtin)
      echo -e "\${GREEN}[OK]\${NC} Built-in font selected: $SELECTED_FONT"
      ;;
    *)
      echo -e "\${YELLOW}[WARN]\${NC} Font auto-install unmanaged: $SELECTED_FONT"
      ;;
  esac

  if [ "$INSTALL_TMUX_THEME" = "1" ]; then
    TMUX_CONF="$HOME/.tmux.conf"
    if [ -f "$TMUX_CONF" ] && grep -q "# iterm2-theme-preview-tmux-start" "$TMUX_CONF"; then
      echo -e "\${GREEN}[OK]\${NC} tmux beautify block detected in $TMUX_CONF"
    else
      echo -e "\${YELLOW}[WARN]\${NC} tmux beautify block not found in $TMUX_CONF"
    fi
  fi

  if [ "$VERIFY_FAILED" = "1" ]; then
    exit 1
  fi
}

case "\${1:-}" in
  install)
    require_bash
    install_theme
    ;;
  uninstall)
    require_bash
    uninstall_theme
    ;;
  status)
    require_bash
    show_status
    ;;
  verify)
    require_bash
    verify_theme
    ;;
  help|--help|-h)
    show_help
    ;;
  *)
    echo -e "\${RED}Unknown command: $1\${NC}"
    show_help
    exit 1
    ;;
esac
`;
}
