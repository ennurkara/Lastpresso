# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static bilingual (DE/EN) landing page for **Lastpresso** — a matcha & espresso café in Edling, Bavaria. No build step, no framework, no Node.js. The entire folder can be drag-dropped into a hosting provider.

**Deployed at:** `https://lastpresso.de/` via Netlify (auto-deploys from GitHub `main` branch)

## File Structure

| File | Responsibility |
|------|---------------|
| `index.html` | Full page markup, all sections, bilingual `data-de`/`data-en` attributes |
| `css/styles.css` | All styling — CSS custom properties, layout, components, responsive breakpoints |
| `js/main.js` | Nav scroll effect, GSAP cup animation, DE/EN language toggle, cup image fallback |
| `impressum.html` | German Impressum (legal notice) — `noindex` |
| `datenschutz.html` | GDPR privacy policy — `noindex` |
| `assets/fonts/` | Self-hosted Inter (variable, 400–600) and Playfair Display (italic 400–700, bold 700) |
| `assets/js/` | Self-hosted GSAP 3 (`gsap.min.js`) and `ScrollTrigger.min.js` |
| `assets/images/` | Hero cup (`matcha-cup.png`), Instagram posts (`insta1–3.jpg`), menu previews (`1–3.png`) |
| `assets/logo/` | Logo variants (`beige.png`, `matcha.png`) |
| `assets/menu/` | Menu PDF (`speisekarte-menu.pdf`) |
| `assets/data/` | Google review screenshots (`review1–3.png`) |

## Page Sections

`index.html` contains these sections in order: `#hero`, `#about`, `#menu` (Speisekarte — shows `1–3.png` previews + PDF link), `#customize` (Matcha Customizing — lets users pick purée, milk, syrup), `#drinks` (signature drinks with size badges), `#visit` (external Google Maps and Apple Maps link buttons + opening hours), `#reviews` (Google review screenshots), `#instagram`.

## Architecture

### Bilingual System
All user-visible text elements carry `data-de` and `data-en` attributes. `js/main.js:initLangToggle()` swaps `textContent` of every matching element on button click. Default language is German (`lang="de"`).

### Animations
GSAP + ScrollTrigger are loaded from `assets/js/` (self-hosted, no CDN). The hero cup rotates 360° as the user scrolls through `#hero`. If GSAP is unavailable, the animation silently skips.

### No External Requests
All fonts (Inter, Playfair Display), scripts (GSAP, ScrollTrigger), and images are self-hosted. The map actions in `#visit` are external Google Maps and Apple Maps link buttons, avoiding third-party runtime requests. This design was chosen to eliminate GDPR cookie consent requirements under the LG München 2022 ruling.

### Responsive Breakpoints (in `css/styles.css`)
- Mobile-first base: `--max-width: 480px`
- `@media (min-width: 540px)` — tablet-sm
- `@media (min-width: 700px)` — tablet
- `@media (min-width: 900px)` — desktop-sm
- `@media (min-width: 1200px)` — desktop

### Design Tokens
CSS custom properties defined at `:root` in `css/styles.css`:
- `--bg: #120e0a` (dark espresso background)
- `--accent-green: #7ab060` (matcha green, used for `<em>` highlights)
- `--accent-pink: #c04060` (strawberry accent)
- `--font-serif: 'Playfair Display'` / `--font-sans: 'Inter'`

## Deployment

Push to `main` → Netlify auto-deploys. No build command. Publish directory is the repo root.

Custom domain `lastpresso.de` is managed via Strato DNS pointing to Netlify.

## Visual Testing

`docs/visual-check.js` is a Playwright script that captures screenshots at 8 viewport widths (360–1440px). Run with:

```bash
node docs/visual-check.js
```

Screenshots are saved to `docs/screenshots/`.
