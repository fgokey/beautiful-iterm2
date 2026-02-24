# beautiful-iterm2

Next.js + TypeScript refactor for iTerm2 theme preview and script download.

## Stack

- Next.js (App Router)
- TypeScript
- Static export (`next export` via `output: "export"`)
- GitHub + Vercel deployment

## Local development

```bash
npm install
npm run dev
```

## Build static output

```bash
npm run build
```

Static files are generated in `out/`, which is compatible with Vercel static hosting.

## Key pages

- `/` theme selection + script preview
- `/install/[theme]` dedicated install-script download page
