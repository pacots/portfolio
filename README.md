## Portfolio — Sara Rodriguez Rojo

This is my personal portfolio site: a clean, professional, and easy-to-maintain space to share my profile, experience, projects, and experiments (including a small web minigame). The visual theme is consistent across pages and the navigation is shared.

## Features

- Unified navigation on every page
   - Sticky header with links to About, Experience, Projects, Education, Skills, and Contact.
   - Responsive “⋯ More” menu: if links don’t fit on one line, the extra items collapse into a dropdown.
- Consistent aesthetic
   - Accessible dark theme, subtle gradients and cards, Inter font.
   - Fluid layout via a `container`, even spacing, and reusable components.
- Main content (home)
   - About, Experience, Projects (with repositories), Education, Skills, Awards & Activities, and Contact.
- Games
   - “Catch the Circle” minigame with:
      - Difficulty (Easy/Medium/Hard/Insane).
      - 30-second timer.
      - Persistent High Score (localStorage).
      - Metrics: Score, Hits, Misses, Accuracy.
      - Shortcuts: Space = Start/Pause, R = Reset.
      - Themed to match the global site, with shared navbar.

## Project structure

```
.
├─ index.html                  # Landing page (home)
├─ style.css                   # Global theme (colors, layout, components)
├─ src/
│  ├─ components/
│  │  ├─ navbar.html          # Shared navigation component (loaded via fetch in child pages)
│  │  └─ navbar.css           # Inherits from global styles; minimal overrides
│  └─ pages/
│     └─ games/
│        ├─ games.html        # Games index (uses global theme + navbar)
│        ├─ games.css         # Page-specific styles for the list
│        └─ catch-the-circle/
│           ├─ index.html     # Minigame
│           ├─ catch-the-circle.css
│           └─ catch-the-circle.js
├─ CNAME                       # (Optional) Custom domain for GitHub Pages
└─ README.md
```

## Run locally

You can open `index.html` directly in your browser. However, because the navbar component is loaded via `fetch` on subpages, a local server is recommended.

PowerShell (Windows):

```powershell
# From the project root
npx http-server -p 5173 -c-1 .
```

Then open:
- Home: http://localhost:5173/
- Games: http://localhost:5173/src/pages/games/games.html
- Catch the Circle: http://localhost:5173/src/pages/games/catch-the-circle/index.html

Alternatives:
- VS Code Live Server (Right-click index.html → “Open with Live Server”).
- `npx serve -l 5173 .` or `npx live-server --port=5173 --no-browser`.

## Quick customization

- Contact: edit the `#contact` section in `index.html` (email, LinkedIn, phone, location).
- “Download CV” button: add your PDF to the repo and link it from the home page.
- Projects: add or reorder links in `#projects`.
- Languages: the main content is in English; a Spanish version with a language toggle can be added.

## Deployment (GitHub Pages)

- Publish the main branch via Settings → Pages.
- If you have a custom domain, keep the `CNAME` file and point your DNS to GitHub Pages.

## Technical notes

- The navbar on the minigame and other internal pages is loaded dynamically from `src/components/navbar.html`.
- The home page currently has inline navigation but shares the same styles and an overflow script for the “⋯ More” menu. If desired, it can be switched to use the shared component as well.
- No build step: this is a static site (HTML/CSS/JS).

## Author

Sara Rodriguez Rojo — Chicago, IL · sara.rod.rojo@gmail.com · linkedin.com/in/sara-rodriguez-rojo

Suggestions or ideas are welcome!