# REPORT — Fermento (T1 brand surface)

## What was built

`index.html` + `styles.css` (no JS, no build, no network beyond six local font files copied to `fonts/`). pt-BR. One page that sells a weekly bread subscription: hero offer → bake slip → 24 h/48 h evidence → the three breads → the week → plans + order form → what the bakery does not have.

First artefact: `PLAN.md` (direction, chromatic strategy, palette with hex, type roles, ASCII layout, bold move, states). No PRODUCT.md/DESIGN.md: this is a one-off surface, which `documents.md`'s own rule exempts.

## Direction and decisions

- **Direction**: Warm Craft + Editorial, executed as a two-ink print job. Not Soft Organic (pastel contradicts a dark crust) and not Cinematic (real photos do not exist here; full-bleed with weak assets is the worst outcome in the list).
- **Chromatic strategy**: duotone on a butter field — Butter & Clay from `palettes.md`, with the clay used as a *section field*, not as a button tint. This is deliberately not the cream-paper cousin: the ground is saturated butter (`#F5E9C8`), the second ink covers a full section, and the page has no near-black-on-cream "tasteful" composition.
- **Type**: Fira Sans (text), Fira Sans Condensed Bold/SemiBold (display and headings), Fira Mono (bake-slip weights/hours only — a monospace data role, not label decoration). Radius 0, no shadows, hairlines for structure.
- **Bold move**: the 24 h / 48 h numerals in the clay section; everything else stays on the grid.
- **Content**: no stock photography, no placeholder rectangles. The bake slip is the visual object — it carries weights, scarcity (40 baguetes) and the Saturday-before-9h route in type. The "O que ainda não temos" section states the absences from the brief (no app, no loyalty, no gluten-free yet, no delivery outside the three neighborhoods).

## Verification — Path B (blind)

**Probe result**: `read_image` on `shot-1440.png` returned *"model deepseek/deepseek-v4.1-flash does not declare image input"*. So this is a blind verification; no visual judgement is claimed anywhere below.

Command used, per `reference/verify.md`:

```
node /home/lluz/dev/ui-craft/scripts/shot.mjs index.html shot-1440.png 1440 900 --full --deep
node /home/lluz/dev/ui-craft/scripts/shot.mjs index.html shot-390.png   390 844 --full --deep
node /home/lluz/dev/ui-craft/scripts/shot.mjs index.html /tmp/a320.png  320 700 --full --deep
```

| measurement | 1440 | 390 | 320 |
| --- | --- | --- | --- |
| `overflowX` | 0 | 0 | 0 |
| `offenders` | [] | [] | [] |
| `clipped` | [] | [] | [] |
| `contrastFails` | [] | [] | [] |
| `fontStatus` | loaded (6/6 faces) | loaded (6/6) | loaded (6/6) |
| `scrollHeight` | 4349 | 5536 | 6125 |
| headings | one h1, no skips | one h1, no skips | one h1, no skips |
| focusables | 18 | 15 | 15 |

Contrast over the real hex values (computed by the script): ink/surface 14.25, muted/surface 5.54, accent-ink/accent 5.95, accent/surface 5.26, butter/clay 6.55, muted/surface-2 6.05.

`small` reports only the two native radio inputs at 20×20. Per `verify.md` this is the known false positive: the effective target is the label, which is 44 px tall and clickable (`.radio-row label { min-height: 2.75rem }`), and the input itself is native-sized. The footer e-mail link, the one genuine small target in the first run (128×17), was raised to a 44 px inline-flex target.

Fix round (once): added the bread table's column labels (`Pão / Peso / Fermentação`) which were in CSS but missing from the markup, added `sr-only` "de fermentação" to the mobile hours values (the header row hides below 640 px), fixed the footer e-mail target, and gave the radio labels an explicit 44 px target. Re-ran all three widths: still zero overflow, zero clipped, zero contrast failures.

## Delivery contract

```
Decided:        Warm Craft + Editorial hybrid, duotone butter/clay two-ink print job;
                Fira Sans Condensed display, Fira Sans body, Fira Mono slip data;
                bold move = the 24 h / 48 h numerals in the clay section.
Verified:       blind (read_image refused: no image input). Rendered 1440/390/320 with
                shot.mjs --full --deep: overflowX 0, offenders [], clipped [],
                contrastFails [] at all three; contrast 4.98–15.57:1 on real hex;
                6/6 local fonts loaded; one h1, no heading skips; 18/15 focusables
                in DOM order; radios' effective label targets 44px.
Not verified:   rhythm, hierarchy, atmosphere, and whether the direction reads —
                no visual confirmation was possible. Hover/focus-visible renders,
                the mailto form's real submit, and 200% zoom were not captured.
Known gaps:     No backend/checkout (form hands off to the visitor's mail client);
                no dark theme (deliberate: single print edition); no photography
                (none exists in this environment); nav links are in the footer
                below 640px rather than in the header.
```
