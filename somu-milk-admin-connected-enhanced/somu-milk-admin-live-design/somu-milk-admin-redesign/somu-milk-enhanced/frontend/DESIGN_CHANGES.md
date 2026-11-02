# Design update — what changed

Only styling was changed. Your pages, routes, cart logic and data are untouched.

## New / changed files
- `src/theme.css` (NEW) — one place for colours, fonts, shadows, rounded corners and page polish. Imported last in `App.jsx`.
- `index.html` — real page title, description, Google Fonts (Poppins + Playfair Display).
- `src/index.css` — body font updated.
- `src/pages/CUSTOMER/Home/Home.jsx` — only the hero image overlay gradient was changed (for readable text).
- All customer CSS files, Navbar.css, Footer.css — hardcoded greens replaced with variables
  (`var(--brand-600)` etc.), so the palette can be changed from `theme.css`.

## Highlights
- Poppins body text + Playfair Display headings
- Warm cream + gold accent alongside your green brand colour
- Frosted sticky navbar, smaller logo, pill-style actions
- Hero: left-to-right overlay, gold call-to-action
- Product photos fill their cards, softer shadows and hover lift
- "From Somu to Your Door" section: deep green instead of flat mint
- Footer: deep green with gold hover accents
- "Popular Products" heading alignment fixed
- Keyboard focus rings, reduced-motion support, page fade-in

## To change the look later
Edit the variables at the top of `src/theme.css` (e.g. `--brand-600`, `--gold`, `--font-display`).
