# Design System Specification: Pink & White Elegance

## 1. Visual Direction & Aesthetic Philosophy
- **Aesthetic:** Editorial luxury meets romantic botanical celebration.
- **Atmosphere:** Soft blush, champagne accents, crisp white layered card stock, tactile vintage details (wax seal, spinning vinyl, gold foil hints).
- **Core Principle:** Subtle, natural motion over exaggerated gimmickry; high contrast legibility for all event details.

## 2. Color Palette & Tokens
- **Canvas / Surfaces:**
  - `--pink-50`: `#fdf2f8` (Subtle tinted canvas)
  - `--ivory`: `#fffdf7` (Paper background)
  - `--blush`: `#fce4ec` (Soft container highlight)
  - `--white`: `#ffffff` (Crisp paper cards)
- **Primary & Accent Pinks:**
  - `--pink-300`: `#f9a8d4` (Delicate accents)
  - `--pink-400`: `#f472b6` (Vibrant elements)
  - `--pink-500`: `#ec4899` (Primary brand pink)
  - `--pink-600`: `#db2777` (Deep rose)
  - `--rose-gold`: `#b76e79` (Earthy metallic blush)
- **Metallics:**
  - `--gold`: `#d4af37` (Champagne gold)
  - `--gold-light`: `#e8d48b` (Warm highlight)
- **Text & Hierarchy:**
  - `--text-dark`: `#4a3035` (Deep plum/espresso — minimum 4.5:1 contrast against pink-50)
  - `--text-medium`: `#6b4c52` (Secondary details, subtitles)
  - `--text-light`: `#9b7980` (Timestamps, labels, metadata)

## 3. Typography
- **Display Script:** `Great Vibes`, `Alex Brush` (Hero name, celebratory script flourishes; line-height generous, never used in all-caps).
- **Editorial Serif:** `Cormorant Garamond`, `Playfair Display` (Headings, countdown numbers, quote cards; elegant classic proportions).
- **Clean Sans / UI:** `Jost` / `Montserrat` / System UI (Navigation dots, buttons, RSVP form fields, timestamps).

## 4. Spacing, Elevation & Shadows
- **Card Radius:** `16px` to `24px` for content cards; `50%` for circular badges & avatar buttons.
- **Shadows:**
  - Soft: `0 4px 20px rgba(219, 39, 119, 0.08)`
  - Medium: `0 8px 30px rgba(219, 39, 119, 0.12)`
  - Glow: `0 0 40px rgba(244, 114, 182, 0.2)`

## 5. Motion & Physics
- **Transitions:** Easing must decelerate smoothly using exponential curves (`cubic-bezier(0.16, 1, 0.3, 1)` or `ease-out-quart`).
- **No Dated Bounce:** Avoid bouncy spring overshoots (`cubic-bezier(0.68, -0.55, 0.265, 1.55)`).
- **Micro-interactions:** Hover lifts of 2-4px, soft shadow bloom on interactive cards.

## 6. Anti-Patterns & Quality Guardrails (Impeccable Guidelines)
- Avoid generic text gradients (`background-clip: text`) on headings — use solid, deeply saturated colors (`--pink-600`, `--gold`).
- Maintain WCAG AA compliance for small text against blush backgrounds.
- Keep animation frame rates smooth and non-blocking for mobile interactions.
