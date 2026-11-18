# Directions

Twelve ways a product can look. Pick **one** (or a named hybrid of two adjacent ones) and commit. Read the "not when" column before you fall in love.

A direction is not a paint job: it decides type, color, spacing, borders, imagery, and motion together. If you take the type from one row and the color from another, you have a hybrid — write down which two and why.

---

### 1. Editorial Broadsheet
**Signature** — Newsprint warmth, hairline rules, asymmetric two-column grid, large serif display against tight sans body, captions and datelines.
**Use when** — Content is the product: publications, long-form marketing, studios, cultural institutions, anything with a point of view.
**Not when** — The product is a tool people operate at speed; serif body slows scan-heavy UI.
**Bold move** — One enormous headline that breaks the column, with everything else in strict alignment.
**Watch out** — Cream + terracotta + display serif is now the default "tasteful AI" kit. Vary the paper (cool newsprint, pale sage, bone), or use photography to carry the warmth.

### 2. Swiss / International
**Signature** — Helvetica-lineage grotesque, strong left alignment, visible grid, one accent, generous margins, photography as evidence rather than decoration.
**Use when** — Institutions, B2B credibility, portfolios, anything that must read as competent and calm.
**Not when** — The brand's value is warmth, play, or intimacy. Swiss cannot do cozy.
**Bold move** — An oversized numeral, index number, or rule that establishes the grid as content.
**Watch out** — Without an actual grid, Swiss becomes "gray text on white with too much padding". Show the structure.

### 3. Refined Minimal (product UI)
**Signature** — Near-white or near-black surfaces, one radius family, 1px borders instead of shadows, small caps labels, dense but airy data, subtle accent used only for state.
**Use when** — SaaS dashboards, developer tools, fintech, settings-heavy products.
**Not when** — Consumer brands, landing pages for non-technical buyers — it reads as "another startup".
**Bold move** — Typography scale contrast: a 64px number next to 12px labels, with nothing in between.
**Watch out** — The "SaaS card kit": identical cards, one radius, `rgba(0,0,0,.1)` shadow, indigo accent. That is the absence of a direction.

### 4. Technical / Terminal
**Signature** — Monospace as a first-class typeface, exposed coordinates/ids/timestamps, hairline frame, muted syntax-like colors, bitmap or engineering icons.
**Use when** — Developer tools, infrastructure, hardware, data pipelines, anything whose audience reads logs for fun.
**Not when** — The audience does not work in a terminal; monospace everywhere reads as costume.
**Bold move** — A live-looking readout (metric, log line, schematic) that is real data, not decoration.
**Watch out** — Fake code, fake hex dumps, and neon green on black. Use the product's real artifacts.

### 5. Brutalist Raw
**Signature** — Heavy borders, no radius, flat color blocks, oversized type, deliberate roughness, visible structure.
**Use when** — Culture, music, independent products, anything that must feel un-corporate and honest.
**Not when** — Trust-sensitive domains (health, banking, legal) where roughness reads as risk.
**Bold move** — A single block of pure color with type that exceeds its container on purpose.
**Watch out** — Brutalism without craft is just bad layout. The grid still has to be exact.

### 6. Warm Craft / Artisan
**Signature** — Off-white paper, ink-dark browns, muted clay/sage accents, humanist or slab serif, real texture (paper grain, stamp, risograph imperfection), generous line spacing.
**Use when** — Food, craft goods, hospitality, workshops, local businesses, anything hand-made.
**Not when** — Time-critical tools or anything that needs to feel precise and fast.
**Bold move** — One photographic or illustrated artefact of the trade, treated as the emblem.
**Watch out** — This is the most-saturated aesthetic of 2025. Differentiate with material and photography, not with more cream and terracotta.

### 7. Soft Organic
**Signature** — Rounded shapes (but not everything), pastel or desaturated palettes, generous whitespace, soft shadow only under floating elements, illustration over photography.
**Use when** — Health, education, family, wellbeing, anything for non-technical or anxious users.
**Not when** — The product needs authority or density; softness reads as unserious.
**Bold move** — One large organic shape (blob, arch, wave) that frames the primary action.
**Watch out** — Rounded everything + pastel everywhere = no hierarchy. Keep one hard edge for contrast.

### 8. Retro Analog
**Signature** — 70s/80s print palette (mustard, rust, teal, cream), grain, halftone, condensed or rounded display type, badges and stamps.
**Use when** — Music, events, food, retro-tech products, brands with personality and nostalgia.
**Not when** — Enterprise or regulated products.
**Bold move** — A poster-like hero with a halftoned photo and a badge.
**Watch out** — Nostalgia without the grain/texture reads as clipart.

### 9. High-Contrast Noir
**Signature** — Deep near-black surfaces, one saturated accent (or none — pure white type), large type on dark, dramatic imagery, minimal chrome.
**Use when** — Premium hardware, creative tools, nightlife, portfolios, cinematic products.
**Not when** — Dense data entry, long reading, or long sessions in daylight.
**Bold move** — A dark hero where the product itself is the only lit object.
**Watch out** — Dark ≠ premium by itself; without contrast discipline it looks like a template. Never pure `#000` + pure `#fff`.

### 10. Playful Geometric
**Signature** — Bold geometric sans, primary-adjacent palette, circles/arcs, rotation, thick strokes, memphis-adjacent accents (used sparingly).
**Use when** — Consumer apps, kids/education, social, creator tools, brands that must feel fun.
**Not when** — Financial, medical, or any context where a joke lands wrong.
**Bold move** — A geometric composition where shapes carry meaning (a chart that is a set of arcs).
**Watch out** — Shapes for their own sake. Every circle must have a job.

### 11. Cinematic Full-bleed
**Signature** — Edge-to-edge photography or video, type over image with scrims, minimal chrome, serif or wide sans, generous negative space in the image itself.
**Use when** — Travel, real estate, hospitality, physical products, portfolios with great assets.
**Not when** — No photography budget. Full-bleed with weak assets is the worst outcome in this list.
**Bold move** — One full-viewport image with a single line of type and nothing else.
**Watch out** — Text over busy images without a scrim; and hero images that only work at 1440px.

### 12. Data Dense / Ops
**Signature** — Tight rows, tabular figures, zebra or rule separators, status colors as the only chroma, compact type (13–14px), keyboard-first affordances.
**Use when** — Trading, logistics, admin, monitoring, anything where the user's job is scanning.
**Not when** — Marketing pages or first-run experiences.
**Bold move** — A single number rendered large and static while everything around it is dense.
**Watch out** — Density without hierarchy is a spreadsheet. Row height, alignment, and one accent cell matter more than color.

---

## Hybrids that work

- Editorial + Refined Minimal → content-heavy product with a calm UI (docs, writing tools).
- Technical + Swiss → infrastructure marketing that respects engineers.
- Warm Craft + Editorial → food, hospitality, publishing.
- Noir + Cinematic → premium hardware or physical product.
- Data Dense + Technical → ops tooling.

## Hybrids that fight

- Brutalist + Soft Organic (whose roughness wins?).
- Cinematic + Data Dense (image real estate vs scan density).
- Playful Geometric + Swiss (the grid kills the joke).

## How to record the choice

In `DESIGN.md`:

```
Direction: Warm Craft + Editorial (hybrid)
Why: the product is a roastery sold by subscription; the page must feel like the bag, not like a SaaS onboarding.
Not this: Soft Organic — pastel healthiness contradicts the roast.
```
