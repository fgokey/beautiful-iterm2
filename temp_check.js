        // Global state
        let selectedTheme = null;
        let selectedThemeName = null;
        let selectedFontName = 'Fira Code';

        // Theme configurations with installation scripts
        const themeConfigs = {
            'mocha': {
                name: 'Catppuccin Mocha',
                installUrl: 'https://raw.githubusercontent.com/catppuccin/iTerm/main/catppuccin-mocha.itermcolors',
                script: (font) => `#!/bin/bash
# iTerm2 配置脚本 - Catppuccin Mocha + ${font}
set -e

echo "🎨 配置 iTerm2 主题: Catppuccin Mocha"
echo "🔤 配置字体: ${font}"

# 1. 下载主题文件
THEME_URL="https://raw.githubusercontent.com/catppuccin/iTerm/main/catppuccin-mocha.itermcolors"
THEME_DIR="$HOME/Library/Colors"
THEME_FILE="$THEME_DIR/catppuccin-mocha.itermcolors"

# 创建目录
mkdir -p "$THEME_DIR"

echo "📥 下载主题文件..."
curl -fsSL "$THEME_URL" -o "$THEME_FILE"

echo "✅ 主题文件已下载到: $THEME_FILE"
echo ""
echo "📝 下一步："
echo "   1. 打开 iTerm2"
echo "   2. 打开 Preferences (⌘+,)"
echo "   3. 点击 Profiles > Colors"
echo "   4. 点击 Color Presets > Import..."
echo "   5. 选择刚下载的主题文件"
echo "   6. 点击 Color Presets > Catppuccin Mocha"
echo ""
echo "🔤 字体安装："
echo "   如果需要安装 ${font}，请运行："
echo "   brew install --cask font-${font.toLowerCase().replace(/ /g, '-')}"
`
            },
            'frappe': {
                name: 'Catppuccin Frappe',
                installUrl: 'https://raw.githubusercontent.com/catppuccin/iTerm/main/catppuccin-frappe.itermcolors',
                script: (font) => `#!/bin/bash
# iTerm2 配置脚本 - Catppuccin Frappé + ${font}
set -e

echo "🎨 配置 iTerm2 主题: Catppuccin Frappé"
echo "🔤 配置字体: ${font}"

THEME_URL="https://raw.githubusercontent.com/catppuccin/iTerm/main/catppuccin-frappe.itermcolors"
THEME_DIR="$HOME/Library/Colors"
THEME_FILE="$THEME_DIR/catppuccin-frappe.itermcolors"

mkdir -p "$THEME_DIR"

echo "📥 下载主题文件..."
curl -fsSL "$THEME_URL" -o "$THEME_FILE"

echo "✅ 主题文件已下载到: $THEME_FILE"
echo ""
echo "📝 下一步："
echo "   1. 打开 iTerm2 > Preferences (⌘+,)"
echo "   2. Profiles > Colors > Import..."
echo "   3. 选择主题文件后应用"
echo ""
echo "🔤 字体安装: brew install --cask font-${font.toLowerCase().replace(/ /g, '-')}"
`
            },
            'macchiato': {
                name: 'Catppuccin Macchiato',
                installUrl: 'https://raw.githubusercontent.com/catppuccin/iTerm/main/catppuccin-macchiato.itermcolors',
                script: (font) => `#!/bin/bash
# iTerm2 配置脚本 - Catppuccin Macchiato + ${font}
set -e

echo "🎨 配置 iTerm2 主题: Catppuccin Macchiato"

THEME_URL="https://raw.githubusercontent.com/catppuccin/iTerm/main/catppuccin-macchiato.itermcolors"
THEME_DIR="$HOME/Library/Colors"
THEME_FILE="$THEME_DIR/catppuccin-macchiato.itermcolors"

mkdir -p "$THEME_DIR"
curl -fsSL "$THEME_URL" -o "$THEME_FILE"

echo "✅ 已下载: $THEME_FILE"
echo "📝 在 iTerm2 中导入并应用该主题"
`
            },
            'dracula': {
                name: 'Dracula',
                installUrl: 'https://raw.githubusercontent.com/dracula/iterm/master/dracula.itermcolors',
                script: (font) => `#!/bin/bash
# iTerm2 配置脚本 - Dracula + ${font}
set -e

echo "🎨 配置 iTerm2 主题: Dracula"

THEME_URL="https://raw.githubusercontent.com/dracula/iterm/master/dracula.itermcolors"
THEME_DIR="$HOME/Library/Colors"
THEME_FILE="$THEME_DIR/dracula.itermcolors"

mkdir -p "$THEME_DIR"
curl -fsSL "$THEME_URL" -o "$THEME_FILE"

echo "✅ 已下载: $THEME_FILE"
echo "📝 在 iTerm2 中导入并应用该主题"
echo "🔤 字体: brew install --cask font-${font.toLowerCase().replace(/ /g, '-')}"
`
            },
            'tokyo': {
                name: 'Tokyo Night',
                installUrl: 'https://raw.githubusercontent.com/fabioaq/iterm2-tokyo-night/master/tokyo-night.itermcolors',
                script: (font) => `#!/bin/bash
# iTerm2 配置脚本 - Tokyo Night + ${font}
set -e

echo "🎨 配置 iTerm2 主题: Tokyo Night"

THEME_URL="https://raw.githubusercontent.com/fabioaq/iterm2-tokyo-night/master/tokyo-night.itermcolors"
THEME_DIR="$HOME/Library/Colors"
THEME_FILE="$THEME_DIR/tokyo-night.itermcolors"

mkdir -p "$THEME_DIR"
curl -fsSL "$THEME_URL" -o "$THEME_FILE"

echo "✅ 已下载: $THEME_FILE"
echo "📝 在 iTerm2 中导入并应用该主题"
`
            },
            'onedark': {
                name: 'One Dark',
                installUrl: 'https://raw.githubusercontent.com/one-dark/iterm-one-dark/master/OneDark.itermcolors',
                script: (font) => `#!/bin/bash
# iTerm2 配置脚本 - One Dark + ${font}
set -e

echo "🎨 配置 iTerm2 主题: One Dark"

THEME_URL="https://raw.githubusercontent.com/one-dark/iterm-one-dark/master/OneDark.itermcolors"
THEME_DIR="$HOME/Library/Colors"
THEME_FILE="$THEME_DIR/OneDark.itermcolors"

mkdir -p "$THEME_DIR"
curl -fsSL "$THEME_URL" -o "$THEME_FILE"

echo "✅ 已下载: $THEME_FILE"
echo "📝 在 iTerm2 中导入并应用该主题"
`
            }
        };

        // DOM elements
        const configPanel = document.getElementById('configPanel');
        const configPanelClose = document.getElementById('configPanelClose');
        const selectedThemeEl = document.getElementById('selectedTheme');
        const selectedFontEl = document.getElementById('selectedFont');
        const configScriptEl = document.getElementById('configScript');
        const copyScriptBtn = document.getElementById('copyScript');
        const downloadScriptBtn = document.getElementById('downloadScript');
        const toast = document.getElementById('toast');

        // Font Selector Functionality
        const fontSelector = document.getElementById('fontSelector');
        const fontLoadingStatus = document.getElementById('fontLoadingStatus');
        const root = document.documentElement;

        // Font loading detection
        const fonts = [
            'Fira Code',
            'JetBrains Mono',
            'Source Code Pro',
            'IBM Plex Mono',
            'Inconsolata',
            'Space Mono',
            'Anonymous Pro',
            'Ubuntu Mono',
            'Roboto Mono',
            'DM Mono'
        ];

        // Check if fonts are loaded using FontFaceSet
        function checkFontsLoaded() {
            const fontFaceSet = document.fonts;
            let loadedCount = 0;

            fonts.forEach(font => {
                if (fontFaceSet.check(\`16px "\${font}"\`)) {
                    loadedCount++;
                }
            });

            return loadedCount;
        }

        // Initial font load check
        function updateFontStatus() {
            const loadedCount = checkFontsLoaded();
            const totalFonts = fonts.length;

            if (loadedCount < totalFonts) {
                fontLoadingStatus.textContent = \`🔄 字体加载中... (\${loadedCount}/\${totalFonts})\`;
                fontLoadingStatus.className = 'font-loading-status loading';
            } else {
                fontLoadingStatus.textContent = '✅ 所有字体已加载完成';
                fontLoadingStatus.className = 'font-loading-status loaded';
                setTimeout(() => {
                    fontLoadingStatus.textContent = '';
                }, 3000);
            }
        }

        // Check font status periodically
        let checkInterval = setInterval(updateFontStatus, 500);

        // Stop checking after 10 seconds
        setTimeout(() => {
            clearInterval(checkInterval);
            updateFontStatus();
        }, 10000);

        // Listen for font load events
        document.fonts.ready.then(() => {
            clearInterval(checkInterval);
            updateFontStatus();
        });

        // Font change handler
        fontSelector.addEventListener('change', function() {
            const selectedFont = this.value;
            const fontName = this.options[this.selectedIndex].getAttribute('data-font');

            // Update CSS variable
            root.style.setProperty('--terminal-font', selectedFont);

            // Show loading status for the specific font
            fontLoadingStatus.textContent = \`🔄 切换到 \${fontName}...\`;
            fontLoadingStatus.className = 'font-loading-status loading';

            // Wait a brief moment for the font to apply
            setTimeout(() => {
                fontLoadingStatus.textContent = \`✅ 已切换到 \${fontName}\`;
                fontLoadingStatus.className = 'font-loading-status loaded';

                // Clear the message after 2 seconds
                setTimeout(() => {
                    fontLoadingStatus.textContent = '';
                }, 2000);
            }, 300);

            // Save preference to localStorage
            try {
                localStorage.setItem('preferredTerminalFont', selectedFont);
                localStorage.setItem('preferredFontName', fontName);
            } catch (e) {
                // localStorage not available, that's fine
            }

            // Update selected font name
            selectedFontName = fontName;
            if (selectedTheme) {
                updateConfigPanel();
            }
        });

        // Load saved font preference
        window.addEventListener('DOMContentLoaded', function() {
            try {
                const savedFont = localStorage.getItem('preferredTerminalFont');
                const savedFontName = localStorage.getItem('preferredFontName');
                if (savedFont) {
                    // Find the option with this value
                    for (let i = 0; i < fontSelector.options.length; i++) {
                        if (fontSelector.options[i].value === savedFont) {
                            fontSelector.selectedIndex = i;
                            root.style.setProperty('--terminal-font', savedFont);
                            if (savedFontName) {
                                selectedFontName = savedFontName;
                            }
                            break;
                        }
                    }
                }
            } catch (e) {
                // localStorage not available, use default
            }
        });

        // Add smooth font transition to all terminal content
        const style = document.createElement('style');
        style.textContent = \`
            .terminal-content {
                transition: font-family 0.3s ease;
            }
        \`;
        document.head.appendChild(style);

        // Theme Selection Functionality
        const themeCards = document.querySelectorAll('.theme-card');

        console.log('Found theme cards:', themeCards.length);
        console.log('Config panel element:', configPanel);

        themeCards.forEach((card, index) => {
            console.log(\`Setting up click listener for card \${index}\`, card.getAttribute('data-theme'));

            card.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                console.log('Card clicked!');
                const theme = this.getAttribute('data-theme');
                const themeName = this.getAttribute('data-theme-name');

                console.log('Selected theme:', theme, themeName);

                // Remove selection from all cards
                themeCards.forEach(c => c.classList.remove('selected'));

                // Add selection to clicked card
                this.classList.add('selected');

                // Update selected theme
                selectedTheme = theme;
                selectedThemeName = themeName;

                console.log('Calling updateConfigPanel and showConfigPanel');

                // Update and show config panel
                updateConfigPanel();
                showConfigPanel();
            });
        });

        function updateConfigPanel() {
            console.log('updateConfigPanel called', { selectedTheme, selectedThemeName });

            if (!selectedTheme || !selectedThemeName) {
                console.log('No theme selected, returning');
                return;
            }

            const themeConfig = themeConfigs[selectedTheme];
            if (!themeConfig) {
                console.log('No theme config found for', selectedTheme);
                return;
            }

            console.log('Theme config found:', themeConfig);

            // Update selection display
            selectedThemeEl.textContent = themeConfig.name;
            selectedFontEl.textContent = selectedFontName;

            // Generate script
            const script = themeConfig.script(selectedFontName);
            configScriptEl.textContent = script;

            console.log('Config panel updated');
        }

        function showConfigPanel() {
            console.log('showConfigPanel called');
            console.log('Config panel element:', configPanel);
            console.log('Adding visible class');
            configPanel.classList.add('visible');
            console.log('Config panel classes after adding:', configPanel.className);
        }

        function hideConfigPanel() {
            configPanel.classList.remove('visible');
        }

        // Close panel
        configPanelClose.addEventListener('click', hideConfigPanel);

        // Copy script
        copyScriptBtn.addEventListener('click', function() {
            const script = configScriptEl.textContent;
            if (script.includes('选择一个主题')) return;

            navigator.clipboard.writeText(script).then(() => {
                showToast();
                this.classList.add('copied');
                setTimeout(() => {
                    this.classList.remove('copied');
                }, 2000);
            });
        });

        // Download script
        downloadScriptBtn.addEventListener('click', function() {
            const script = configScriptEl.textContent;
            if (script.includes('选择一个主题')) return;

            const blob = new Blob([script], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'iterm2-config.sh';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });

        function showToast() {
            toast.classList.add('visible');
            setTimeout(() => {
                toast.classList.remove('visible');
            }, 2000);
        }

        // Keyboard shortcut to close panel (Escape)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hideConfigPanel();
            }
        });

        // Click outside panel to close
        document.addEventListener('click', function(e) {
            if (configPanel.classList.contains('visible') &&
                !configPanel.contains(e.target) &&
                !e.target.closest('.theme-card')) {
                // Don't close if clicking on a theme card
                hideConfigPanel();
            }
        });
