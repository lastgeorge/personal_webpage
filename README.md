# Personal Academic Website

A personal academic portfolio website built with Vue 3, TypeScript, and Tailwind CSS. Features a responsive layout, dark/light mode, smooth page transitions, and a searchable publications list with live citation counts.

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server (opens http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The production build outputs to `dist/`. It is a fully static site — no backend required. The base URL is configured as `/xqian/` in `vite.config.js`; change that if deploying to a different path.

---

## Project Structure

```
website/
├── public/
│   └── pdf/                    # PDFs available for download
├── src/
│   ├── assets/
│   │   ├── publications.json   # All publication data (edit to add/update pubs)
│   │   ├── main.css            # Global styles and CSS variables
│   │   └── XinQian.jpeg        # Profile photo
│   ├── components/
│   │   ├── LoadingBar.vue      # Top progress bar shown during navigation
│   │   ├── PageTransition.vue  # Fade+slide animation wrapper for page changes
│   │   └── ThemeToggle.vue     # Moon/sun button to switch dark/light mode
│   ├── router/
│   │   └── index.ts            # Route definitions (4 pages + catch-all redirect)
│   ├── stores/
│   │   └── theme.ts            # Pinia store: dark/light theme with localStorage persistence
│   ├── views/
│   │   ├── HomeView.vue        # Profile, awards, and major projects
│   │   ├── PublicationsView.vue # Searchable publication list with INSPIRE citations
│   │   ├── ResearchView.vue    # Current and past research projects
│   │   └── ContactView.vue     # Useful external links
│   ├── App.vue                 # Root layout: header, sidebar, router-view, footer
│   ├── main.ts                 # App entry point — registers Vue, Pinia, Router, Motion
│   └── environment.d.ts        # TypeScript declarations for .vue and .json imports
├── index.html                  # HTML shell; includes inline script for early theme init
├── vite.config.js              # Vite config (port 3000, base path, @ alias)
├── tailwind.config.js          # Tailwind config (dark mode via class, custom dark palette)
├── tsconfig.json               # TypeScript config (strict, ESNext, path aliases)
└── package.json                # Scripts and dependencies
```

---

## Pages

| Route | View | Purpose |
|---|---|---|
| `/` | `HomeView.vue` | Profile photo, bio, awards, major research summaries |
| `/research` | `ResearchView.vue` | Current and past research projects with links |
| `/publications` | `PublicationsView.vue` | Full publication list, searchable, with citation fetch |
| `/contact` | `ContactView.vue` | External links organized by category |

---

## How to Update Content

### Adding or editing publications

All publication data lives in **`src/assets/publications.json`**. The file is an object whose keys are category names (e.g. `"DUNE"`, `"MicroBooNE"`, `"Daya Bay"`). Each category contains an array of publication objects:

```json
{
  "CategoryName": [
    {
      "title": "Paper title",
      "authors": "Author list string",
      "arxiv": "https://arxiv.org/abs/...",
      "journal": "https://doi.org/...",
      "journal_ref": "Phys. Rev. Lett. 123, 456 (2024)",
      "year": 2024
    }
  ]
}
```

Fields `arxiv`, `journal`, and `journal_ref` are optional — omit them if not available. The publication list is rendered and filtered entirely from this file; no code changes are needed to add new entries.

### Changing profile content (bio, awards, projects on home page)

Edit **`src/views/HomeView.vue`** directly. The content is written as template HTML within the component.

### Adding a PDF for download

Drop the file into **`public/pdf/`** and link to it as `/xqian/pdf/filename.pdf` (adjust the base path as needed).

### Updating research project descriptions

Edit **`src/views/ResearchView.vue`**. Projects are listed as template HTML grouped into "Current" and "Past" sections.

### Changing the profile photo

Replace `src/assets/XinQian.jpeg` and update the `src` reference in `HomeView.vue` if the filename changes.

---

## Architecture Notes

### Theme (dark/light mode)

Dark mode is implemented in three coordinated layers:

1. **`index.html`** — An inline `<script>` runs before Vue loads to apply the `dark` class to `<html>` immediately, preventing a flash of the wrong theme.
2. **`src/stores/theme.ts`** — A Pinia store manages the toggle, persists the choice to `localStorage`, and watches the OS preference.
3. **`tailwind.config.js`** — Tailwind's `darkMode: 'class'` strategy means any `dark:` utility applies when the `dark` class is on `<html>`.

### State management

Only one Pinia store exists (`theme.ts`). All other data (publications, research descriptions) is static JSON or hardcoded template content — no server or database is involved.

### Routing & transitions

Vue Router handles four routes. `PageTransition.vue` wraps each `<RouterView>` to produce a fade+slide animation between pages. `LoadingBar.vue` hooks into router navigation guards to show a top progress bar while pages load.

### Publications search & citations

`PublicationsView.vue` filters the JSON data client-side as the user types. Citation counts are fetched live from the [INSPIRE HEP API](https://inspirehep.net/api) using the arXiv ID when a publication is expanded.

---

## Tech Stack

| Tool | Version | Role |
|---|---|---|
| Vue 3 | 3.5 | UI framework (Composition API) |
| TypeScript | 5.7 | Type safety |
| Vite | 6.2 | Dev server and bundler |
| Pinia | 3.0 | State management |
| Vue Router | 4.5 | Client-side routing |
| Tailwind CSS | 3.4 | Utility-first styling |
| @vueuse/motion | 2.2 | Animation utilities |
| @mdi/font | 7.4 | Material Design icon set |
| Sass | 1.85 | CSS preprocessing |
