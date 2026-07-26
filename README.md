# Kannan N — Portfolio (React)

A React + Vite version of the portfolio, converted from the original static HTML build.

## Run it locally in VS Code

1. Open this folder in VS Code (`File → Open Folder`).
2. Open a terminal in VS Code (`Terminal → New Terminal`).
3. Install dependencies:
   ```
   npm install
   ```
4. Start the dev server:
   ```
   npm run dev
   ```
5. Open the URL it prints (usually `http://localhost:5173`) in your browser. Changes to any file in `src/` hot-reload automatically.

## Build for deployment

```
npm run build
```

This creates a `dist/` folder with static files you can deploy to GitHub Pages, Netlify, or Vercel.

## Project structure

```
├── index.html          Vite entry HTML (loads fonts + mounts React)
├── src/
│   ├── main.jsx         React root
│   ├── App.jsx          All page sections as components
│   └── index.css        Design system (colors, layout, animations)
├── package.json
└── vite.config.js
```

## Making changes

- **Content** (name, projects, skills, achievements, certifications, contact links): edit the arrays/text near the top of each component in `src/App.jsx` (e.g. `PROJECTS`, `CERTS`, `ACHIEVEMENTS`).
- **Colors/fonts**: edit the CSS variables at the top of `src/index.css` under `:root`.
- **Sections**: each section (About, Skills, Projects, etc.) is its own component function in `App.jsx` — easy to reorder, duplicate, or extend.
