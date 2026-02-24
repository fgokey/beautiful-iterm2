export type Theme = {
  id: string;
  name: string;
  badge: string;
  description: string;
  tags: string[];
  themeUrl: string;
  commandPreview: string;
  outputPreview: string;
  palette: {
    terminalBg: string;
    terminalBgAlt: string;
    text: string;
    promptPath: string;
    promptGit: string;
    promptSymbol: string;
    command: string;
    output: string;
    keyword: string;
    string: string;
    number: string;
    cursor: string;
    infoBg: string;
    tagBg: string;
    tagText: string;
    border: string;
    glow: string;
  };
};

export const THEMES: Theme[] = [
  {
    id: "mocha",
    name: "Catppuccin Mocha",
    badge: "HOT",
    description: "极致暗调，纯黑背景高对比度，夜间工作首选。",
    tags: ["深色", "高对比", "夜间"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Catppuccin%20Mocha.itermcolors",
    commandPreview: "npm install",
    outputPreview: "added 1423 packages in 32s",
    palette: {
      terminalBg: "#1e1e2e",
      terminalBgAlt: "#181825",
      text: "#cdd6f4",
      promptPath: "#89b4fa",
      promptGit: "#a6e3a1",
      promptSymbol: "#f38ba8",
      command: "#f9e2af",
      output: "#bac2de",
      keyword: "#cba6f7",
      string: "#a6e3a1",
      number: "#fab387",
      cursor: "#f5e0dc",
      infoBg: "#11111b",
      tagBg: "#45475a",
      tagText: "#f5e0dc",
      border: "#585b70",
      glow: "rgba(203, 166, 247, 0.35)"
    }
  },
  {
    id: "frappe",
    name: "Catppuccin Frappe",
    badge: "推荐",
    description: "平衡中性，深灰背景，适合通用开发环境。",
    tags: ["中性", "通用", "推荐"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Catppuccin%20Frappe.itermcolors",
    commandPreview: "npm run dev",
    outputPreview: "Server running at http://localhost:3000",
    palette: {
      terminalBg: "#303446",
      terminalBgAlt: "#292c3c",
      text: "#c6d0f5",
      promptPath: "#8caaee",
      promptGit: "#a6d189",
      promptSymbol: "#e78284",
      command: "#e5c890",
      output: "#a5adce",
      keyword: "#ca9ee6",
      string: "#a6d189",
      number: "#ef9f76",
      cursor: "#f2d5cf",
      infoBg: "#232634",
      tagBg: "#51576d",
      tagText: "#f2d5cf",
      border: "#626880",
      glow: "rgba(202, 158, 230, 0.3)"
    }
  },
  {
    id: "macchiato",
    name: "Catppuccin Macchiato",
    badge: "优雅",
    description: "柔和紫调，低饱和度护眼，适合长时间工作。",
    tags: ["紫色", "护眼", "优雅"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Catppuccin%20Macchiato.itermcolors",
    commandPreview: "docker compose up -d",
    outputPreview: "Creating network app_default",
    palette: {
      terminalBg: "#24273a",
      terminalBgAlt: "#1e2030",
      text: "#cad3f5",
      promptPath: "#8aadf4",
      promptGit: "#a6da95",
      promptSymbol: "#ed8796",
      command: "#eed49f",
      output: "#a5adcb",
      keyword: "#c6a0f6",
      string: "#a6da95",
      number: "#f5a97f",
      cursor: "#f4dbd6",
      infoBg: "#181926",
      tagBg: "#494d64",
      tagText: "#f4dbd6",
      border: "#5a5e7a",
      glow: "rgba(198, 160, 246, 0.3)"
    }
  },
  {
    id: "dracula",
    name: "Dracula",
    badge: "经典",
    description: "经典暗色方案，颜色辨识度高。",
    tags: ["紫色", "经典", "流行"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Dracula.itermcolors",
    commandPreview: "pytest tests/",
    outputPreview: "PASSED 23 tests in 4.2s",
    palette: {
      terminalBg: "#282a36",
      terminalBgAlt: "#1d1e26",
      text: "#f8f8f2",
      promptPath: "#8be9fd",
      promptGit: "#50fa7b",
      promptSymbol: "#ff79c6",
      command: "#f1fa8c",
      output: "#bd93f9",
      keyword: "#bd93f9",
      string: "#50fa7b",
      number: "#ffb86c",
      cursor: "#f8f8f2",
      infoBg: "#191a21",
      tagBg: "#555870",
      tagText: "#f8f8f2",
      border: "#676b8a",
      glow: "rgba(255, 121, 198, 0.28)"
    }
  },
  {
    id: "tokyo",
    name: "Tokyo Night",
    badge: "现代",
    description: "现代深蓝配色，适配多数编辑器主题风格。",
    tags: ["蓝色", "现代", "极简"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/TokyoNight%20Storm.itermcolors",
    commandPreview: "go run main.go",
    outputPreview: "Starting server on :8080",
    palette: {
      terminalBg: "#1a1b26",
      terminalBgAlt: "#16161e",
      text: "#a9b1d6",
      promptPath: "#7aa2f7",
      promptGit: "#9ece6a",
      promptSymbol: "#f7768e",
      command: "#e0af68",
      output: "#7dcfff",
      keyword: "#bb9af7",
      string: "#9ece6a",
      number: "#ff9e64",
      cursor: "#c0caf5",
      infoBg: "#15161d",
      tagBg: "#414868",
      tagText: "#c0caf5",
      border: "#565f89",
      glow: "rgba(122, 162, 247, 0.35)"
    }
  },
  {
    id: "onedark",
    name: "One Dark",
    badge: "VSCode",
    description: "和 VSCode One Dark 接近，迁移成本低。",
    tags: ["经典", "VSCode", "流行"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Atom%20One%20Dark.itermcolors",
    commandPreview: "npm test",
    outputPreview: "42 passed, 0 failed",
    palette: {
      terminalBg: "#282c34",
      terminalBgAlt: "#21252b",
      text: "#abb2bf",
      promptPath: "#61afef",
      promptGit: "#98c379",
      promptSymbol: "#e06c75",
      command: "#e5c07b",
      output: "#56b6c2",
      keyword: "#c678dd",
      string: "#98c379",
      number: "#d19a66",
      cursor: "#abb2bf",
      infoBg: "#1c1f24",
      tagBg: "#4b5263",
      tagText: "#d0d0d0",
      border: "#5c6370",
      glow: "rgba(97, 175, 239, 0.28)"
    }
  },
  {
    id: "nord",
    name: "Nord",
    badge: "清新",
    description: "北欧冷色调，观感克制，久看不累。",
    tags: ["蓝色", "清新", "护眼"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Nord.itermcolors",
    commandPreview: "git status",
    outputPreview: "On branch main",
    palette: {
      terminalBg: "#2e3440",
      terminalBgAlt: "#242933",
      text: "#d8dee9",
      promptPath: "#88c0d0",
      promptGit: "#a3be8c",
      promptSymbol: "#bf616a",
      command: "#ebcb8b",
      output: "#81a1c1",
      keyword: "#81a1c1",
      string: "#a3be8c",
      number: "#b48ead",
      cursor: "#d8dee9",
      infoBg: "#222831",
      tagBg: "#3b4252",
      tagText: "#d8dee9",
      border: "#434c5e",
      glow: "rgba(136, 192, 208, 0.3)"
    }
  },
  {
    id: "monokai",
    name: "Monokai",
    badge: "经典",
    description: "高对比经典风格，适合喜欢鲜明色彩的用户。",
    tags: ["深色", "经典", "高对比"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Monokai%20Classic.itermcolors",
    commandPreview: "ruby app.rb",
    outputPreview: "Server started on port 3000",
    palette: {
      terminalBg: "#272822",
      terminalBgAlt: "#1e1f1a",
      text: "#f8f8f2",
      promptPath: "#66d9ef",
      promptGit: "#a6e22e",
      promptSymbol: "#f92672",
      command: "#e6db74",
      output: "#a1efe4",
      keyword: "#f92672",
      string: "#e6db74",
      number: "#ae81ff",
      cursor: "#f8f8f2",
      infoBg: "#1a1b17",
      tagBg: "#3e3d32",
      tagText: "#f8f8f2",
      border: "#49483e",
      glow: "rgba(166, 226, 46, 0.3)"
    }
  },
  {
    id: "nightowl",
    name: "Night Owl",
    badge: "夜色",
    description: "深蓝夜色风格，常见于前端开发主题组合。",
    tags: ["蓝色", "现代", "VSCode"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Night%20Owl.itermcolors",
    commandPreview: "pnpm dev",
    outputPreview: "ready - started server on 3000",
    palette: {
      terminalBg: "#011627",
      terminalBgAlt: "#02111d",
      text: "#d6deeb",
      promptPath: "#82aaff",
      promptGit: "#c3e88d",
      promptSymbol: "#f78c6c",
      command: "#ffcb6b",
      output: "#7fdbca",
      keyword: "#c792ea",
      string: "#c3e88d",
      number: "#f78c6c",
      cursor: "#d6deeb",
      infoBg: "#00121f",
      tagBg: "#072840",
      tagText: "#d6deeb",
      border: "#0a344e",
      glow: "rgba(130, 170, 255, 0.3)"
    }
  },
  {
    id: "material",
    name: "Material Design",
    badge: "Google",
    description: "Material 风格，层次清晰，整体偏中性。",
    tags: ["蓝色", "Material", "Google"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Material%20Design%20Colors.itermcolors",
    commandPreview: "flutter run",
    outputPreview: "Launching lib/main.dart...",
    palette: {
      terminalBg: "#263238",
      terminalBgAlt: "#1e272c",
      text: "#eeffff",
      promptPath: "#82aaff",
      promptGit: "#c3e88d",
      promptSymbol: "#f07178",
      command: "#ffcb6b",
      output: "#89ddff",
      keyword: "#c792ea",
      string: "#c3e88d",
      number: "#f78c6c",
      cursor: "#eeffff",
      infoBg: "#1a2227",
      tagBg: "#37474f",
      tagText: "#eeffff",
      border: "#455a64",
      glow: "rgba(130, 170, 255, 0.28)"
    }
  },
  {
    id: "latte",
    name: "Catppuccin Latte",
    badge: "浅色",
    description: "明亮浅色系，白天环境阅读更轻松。",
    tags: ["浅色", "柔和", "日间"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Catppuccin%20Latte.itermcolors",
    commandPreview: "pnpm lint",
    outputPreview: "No issues found in 48 files",
    palette: {
      terminalBg: "#eff1f5",
      terminalBgAlt: "#e6e9ef",
      text: "#4c4f69",
      promptPath: "#1e66f5",
      promptGit: "#40a02b",
      promptSymbol: "#d20f39",
      command: "#df8e1d",
      output: "#5c5f77",
      keyword: "#8839ef",
      string: "#40a02b",
      number: "#fe640b",
      cursor: "#dc8a78",
      infoBg: "#dce0e8",
      tagBg: "#ccd0da",
      tagText: "#1e1e2e",
      border: "#bcc0cc",
      glow: "rgba(136, 57, 239, 0.25)"
    }
  },
  {
    id: "solarized",
    name: "Solarized Dark",
    badge: "经典",
    description: "低对比经典配色，强调长期阅读舒适度。",
    tags: ["经典", "低对比", "护眼"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Solarized%20Dark%20Patched.itermcolors",
    commandPreview: "git log --oneline -5",
    outputPreview: "5 commits listed",
    palette: {
      terminalBg: "#002b36",
      terminalBgAlt: "#001f27",
      text: "#839496",
      promptPath: "#268bd2",
      promptGit: "#859900",
      promptSymbol: "#dc322f",
      command: "#b58900",
      output: "#2aa198",
      keyword: "#6c71c4",
      string: "#859900",
      number: "#cb4b16",
      cursor: "#93a1a1",
      infoBg: "#001a21",
      tagBg: "#073642",
      tagText: "#93a1a1",
      border: "#586e75",
      glow: "rgba(38, 139, 210, 0.28)"
    }
  },
  {
    id: "gruvbox",
    name: "Gruvbox Dark",
    badge: "复古",
    description: "复古暖色调，层次清楚，辨识度很高。",
    tags: ["暖色", "复古", "高辨识"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Gruvbox%20Dark.itermcolors",
    commandPreview: "cargo test",
    outputPreview: "test result: ok. 86 passed",
    palette: {
      terminalBg: "#282828",
      terminalBgAlt: "#1d2021",
      text: "#ebdbb2",
      promptPath: "#83a598",
      promptGit: "#b8bb26",
      promptSymbol: "#fb4934",
      command: "#fabd2f",
      output: "#8ec07c",
      keyword: "#d3869b",
      string: "#b8bb26",
      number: "#fe8019",
      cursor: "#fbf1c7",
      infoBg: "#1b1b1b",
      tagBg: "#3c3836",
      tagText: "#ebdbb2",
      border: "#504945",
      glow: "rgba(250, 189, 47, 0.26)"
    }
  },
  {
    id: "everforest",
    name: "Everforest Dark",
    badge: "自然",
    description: "偏自然绿系，整体柔和，适合长时间 coding。",
    tags: ["绿色", "柔和", "护眼"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Everforest%20Dark%20Hard.itermcolors",
    commandPreview: "python manage.py runserver",
    outputPreview: "Watching for file changes with StatReloader",
    palette: {
      terminalBg: "#2d353b",
      terminalBgAlt: "#232a2e",
      text: "#d3c6aa",
      promptPath: "#7fbbb3",
      promptGit: "#a7c080",
      promptSymbol: "#e67e80",
      command: "#dbbc7f",
      output: "#83c092",
      keyword: "#d699b6",
      string: "#a7c080",
      number: "#e69875",
      cursor: "#d3c6aa",
      infoBg: "#20272b",
      tagBg: "#3a464c",
      tagText: "#d3c6aa",
      border: "#4f5b58",
      glow: "rgba(127, 187, 179, 0.25)"
    }
  },
  {
    id: "ayu",
    name: "Ayu Mirage",
    badge: "流行",
    description: "Ayu 系列中的平衡方案，明暗和饱和度适中。",
    tags: ["平衡", "现代", "中高对比"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Ayu%20Mirage.itermcolors",
    commandPreview: "npm run typecheck",
    outputPreview: "Type check completed successfully",
    palette: {
      terminalBg: "#1f2430",
      terminalBgAlt: "#171b24",
      text: "#cccac2",
      promptPath: "#73d0ff",
      promptGit: "#bbe67e",
      promptSymbol: "#f28779",
      command: "#ffd173",
      output: "#5ccfe6",
      keyword: "#d4bfff",
      string: "#bbe67e",
      number: "#ffad66",
      cursor: "#ffcc66",
      infoBg: "#151922",
      tagBg: "#31374b",
      tagText: "#cccac2",
      border: "#4b556d",
      glow: "rgba(115, 208, 255, 0.25)"
    }
  },
  {
    id: "kanagawa",
    name: "Kanagawa",
    badge: "和风",
    description: "对比适中，色彩温和，适合追求质感的主题搭配。",
    tags: ["低饱和", "质感", "日式"],
    themeUrl: "https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Kanagawa%20Wave.itermcolors",
    commandPreview: "kubectl get pods -A",
    outputPreview: "All namespaces healthy",
    palette: {
      terminalBg: "#1f1f28",
      terminalBgAlt: "#16161d",
      text: "#dcd7ba",
      promptPath: "#7e9cd8",
      promptGit: "#98bb6c",
      promptSymbol: "#e46876",
      command: "#e6c384",
      output: "#7fb4ca",
      keyword: "#957fb8",
      string: "#98bb6c",
      number: "#ffa066",
      cursor: "#c8c093",
      infoBg: "#15151c",
      tagBg: "#2a2a37",
      tagText: "#dcd7ba",
      border: "#3b3b4d",
      glow: "rgba(126, 156, 216, 0.24)"
    }
  }
];

export const DEFAULT_THEME_ID = "mocha";

export function findTheme(themeId: string): Theme | undefined {
  return THEMES.find((theme) => theme.id === themeId);
}
