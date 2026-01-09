## Sara Rodriguez Rojo - Portfolio

Single-page site for interviews in the US. Copy matches my resume: dual master's program (M.S. AI at Illinois Tech + Master in Computer Engineering at UPM), experience at Oxigent/DNV, and personal systems projects.

## Highlights

- Quiet layout with generous spacing, light palette, and a subtle floating accent background for motion.
- Sections cover Hero, About, Experience, Projects, Education, Skills, Scholarships/Activities, and Contact.
- Text stays factual, no metrics or fluff beyond what the CV states.
- Only JavaScript is a tiny snippet for the mobile navigation toggle.

## Project structure

```
.
├─ index.html   # Content + structure
├─ style.css    # Theme, layout, animation, responsive rules
├─ CNAME        # Optional custom domain for GitHub Pages
└─ README.md
```

## Run locally

```powershell
# From the repo root
npx http-server -p 5173 -c-1 .
```

Then open http://localhost:5173/. Any static server works (VS Code Live Server, `npx serve`, Netlify dev, etc.).

## Customize

- Edit the hero paragraph or bullet list in `index.html` as coursework or roles change.
- Refresh the `#projects` cards when new work is ready.
- Tweak colors and spacing via the variables near the top of `style.css`.

## Deployment

- Push `main` to GitHub and enable Pages (root directory).
- Keep the `CNAME` file only if a custom domain is configured.

## Contact

Sara Rodriguez Rojo - Chicago, IL - sara.rod.rojo@gmail.com - linkedin.com/in/sara-rodriguez-rojo