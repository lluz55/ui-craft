# PLAN — Fermento (T1, brand surface)

## Subject signals

- **Material**: butter-yellow paper of a bakery order slip, espresso-brown ink, one clay-red second ink. No photos exist; the surface must be honest without them, so the print object replaces the photograph.
- **Vocabulary**: fornada, fermentação longa, casca, miolo, moinho, bicicleta, bairro, sábado antes das 9h.
- **Artefact of the trade**: the weekly bake slip — breads, weights, hours, route. It becomes the hero object, set in type, not drawn.

## Direction

**Warm Craft + Editorial (hybrid)** — a two-ink poster/ledger for two people who bake, not a landing page.
Why: the buyer is deciding on taste and trust, and the only available evidence is words, numbers and material.
Not this: Soft Organic (pastel healthiness contradicts a dark crust) and Cinematic (no photographs available — full-bleed with weak assets is the worst outcome).

## Chromatic strategy

**Duotone on a butter field** (`palettes.md`: Butter & Clay, the bakery row). Two inks only: butter paper + clay. The clay is a *field*, not a button tint, so this is not the cream-paper cousin: the page is a two-colour print job, the ink is espresso, and the accent occupies a full section.

| role | hex | use |
| --- | --- | --- |
| surface | `#F5E9C8` | butter paper, page ground |
| surface-2 | `#FBF3DE` | bake slip, inset panels |
| ink | `#211A0E` | text, rules that must shout |
| muted | `#6B5A34` | metadata, captions (5.54:1 on surface) |
| accent (field) | `#A63D19` | clay section, primary button |
| accent-ink | `#FFF6EC` | text on clay (5.95:1) |
| rule | `#DFC995` | hairlines, borders |

Measured contrasts: ink/surface 14.25, muted/surface 5.54, accent-ink/accent 5.95, butter/clay 6.55. Focus ring: ink on butter (14:1), butter on clay (6.55:1) — remapped inside the clay section.

## Type

One family, two cuts (allowed third role: mono for the bake slip's timings/weights only).

- **Display** — Fira Sans Condensed Bold, 44/52/72/96 clamp, line-height .95, tracking −.02em. Used for the h1, section headings, and the 24/48 numerals.
- **Heading** — Fira Sans Condensed SemiBold, 26–34px, 1.05.
- **Body** — Fira Sans Regular, 16–17px, 1.65, measure ≤ 62ch. Medium for emphasis only.
- **Label** — Fira Sans Medium, 13px, tracking .02em, sentence case (no ALL-CAPS eyebrow kit).
- **Data / slip** — Fira Mono Regular, 13px, tabular numerals, weights and hours only.

Radius: 0. Shadows: none. Borders: 1px `rule`; 2px `ink` where a rule is structure.

## Bold move

**The 24 h / 48 h spread.** Two numerals in the clay section — the 48 set at up to 8rem and doing the shouting, the 24 smaller and recessive, both on the same right-hand axis. Everything else is a strict single-column grid. This is the bakery's only obsession, rendered as the only loud thing on the page. (Numerals are sized to their column, not cropped: a numeral cut by its own box would read as a defect, not as print.)

## Layout (ASCII)

```
1440
┌──────────────────────────────────────────────────────────────┐
│ FERMENTO      os pães · a semana · assinatura      [Assinar] │ hairline
├───────────────────────────────────┬──────────────────────────┤
│ label: assinatura semanal         │  FICHA DA SEMANA         │
│ PÃO DE 48 HORAS,                  │  ─────────────────────   │
│ ENTREGUE DE BICICLETA             │  fermentação longa 1 kg  │
│ NO SÁBADO.                        │  centeio, melaço  700 g  │
│ body: 3 pães, sexta/sábado,       │  baguete 40 un.   320 g  │
│ 3 bairros, cancele quando quiser  │  ─────────────────────   │
│ R$ 68 / mês   [Assinar por R$ 68] │  sábado, antes das 9h    │
├───────────────────────────────────┴──────────────────────────┤
│ CLAY FIELD:  ┌ 24 h ┐                    ┌ 48 h ──────────┐  │
│              baguete                     pão de fermentação  │
│              copy margem esquerda (55ch)                  →  │
├──────────────────────────────────────────────────────────────┤
│ OS TRÊS PÃES — ledgers rows, hairlines, weight right-aligned │
├──────────────────────────────────────────────────────────────┤
│ A SEMANA — quinta moinho | sexta forno | sábado bicicleta    │
├──────────────────────────────────────────────────────────────┤
│ ASSINATURA — 1 pão R$68 / 2 pães R$118 + form (fieldset)     │
├──────────────────────────────────────────────────────────────┤
│ O QUE AINDA NÃO TEMOS — honest list, two columns on desktop  │
├──────────────────────────────────────────────────────────────┤
│ footer: endereço moral + contato                             │
└──────────────────────────────────────────────────────────────┘

390
┌──────────────────────┐
│ FERMENTO      Assinar│
│ h1 (2 lines, 44px)   │
│ price + CTA full-width│
│ slip (stacked rows)  │
│ 24 h / 48 h stacked  │
│ breads stacked       │
│ week stacked         │
│ plans stacked        │
│ form                 │
└──────────────────────┘
```

Reading path: offer → evidence (slip, time, breads) → week → price/form → honesty.

## States in scope

- link/button hover, active, `:focus-visible` (2px ring, offset 2px)
- form: default, focus, `:user-invalid` inline message, required helper, submit (mailto handoff)
- unavailable: baguete scarcity note (40/week) — stated in copy, not a fake control
- responsive: 320, 390, 768, 1440; 200% zoom
- `prefers-reduced-motion` (transitions only on borders/color, ≤150ms)
- no JS at all; no network beyond the six local font files
- no photos: no placeholder rectangles anywhere; the slip and numerals carry the visual weight

## Self-check

Would this plan serve another bakery? The 48-hour obsession, the two-ink bake slip, the bike route and the "what we don't have" section are Fermento's facts. A generic bakery would get photos, a hero image and three cards. Passed.
