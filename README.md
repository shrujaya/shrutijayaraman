# shrutijayaraman

Personal portfolio site. React + Vite, no framework beyond that.

## Running it

```bash
npm install
npm run dev
```

Vite serves on port 5173 unless that port is taken, in which case it picks the
next free one and prints the URL.

```bash
npm run build     # production build into dist/
npm run preview   # serve the built output
npm run lint      # oxlint
```

## Where things live

| File | What's in it |
| --- | --- |
| `src/content.js` | Every piece of text on the site: bio, skills, roles, education, projects, posts, links. This is the only file to edit for a content change. |
| `src/App.jsx` | Page structure and the five panels. |
| `src/styles.css` | Design tokens and all styling. Colors, fonts and spacing are CSS custom properties at the top. |
| `src/effects.js` | Scroll behaviour: the panel reveal, cursor glow, card tilt, scroll spy, and the résumé button's glitch label. |
| `public/` | Avatar frames, favicon, résumé PDF. |

## Notes

- The avatar has two frames, `avatar.png` and `avatar-wink.png`, identical
  except for one eye. Hovering the portrait cuts between them to wink.
- Reading times in the Writing panel are word count at 225 wpm; Substack does
  not publish its own.
- Everything respects `prefers-reduced-motion`.
