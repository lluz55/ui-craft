# Palettes

A palette is six roles, not twenty tokens. But before the roles, choose the **strategy** — because
the reason every AI-generated page ends up warm off-white, near-black and one muted accent is that
nobody chooses a strategy; they choose "tasteful" six times and get the same page.

| Role | Meaning |
| --- | --- |
| `surface` | The page/background |
| `surface-2` | Raised or inset surface (cards, wells, headers) |
| `ink` | Primary text |
| `muted` | Secondary text, metadata (must still hit 4.5:1 on `surface`) |
| `accent` | The single chroma that means "action / attention" |
| `rule` | Borders, dividers, hairlines |

`accent-ink` = text drawn on top of `accent`. Check it, do not assume white.

## Choose the strategy first

| Strategy | What the surface says | Reach for it when |
| --- | --- | --- |
| **Paper** | Printed, crafted, slow, human | Editorial, food, hospitality, publishing, craft goods |
| **White room** | Precise, fast, clinical, honest | Tools, dashboards, docs, SaaS, health, finance |
| **Saturated field** | Confident, branded, memorable | Marketing pages, consumer brands, launches, culture |
| **Dark first** | Instrument, studio, night work | Infra, observability, creative tools, media, trading |
| **Mono ramp** | One hue, many values — data as the subject | Analytics, technical docs, dense ops |
| **Duotone** | Graphic, opinionated, poster-like | Events, portfolios, campaigns, editorial features |
| **Brutalist contrast** | Loud on purpose, no softness | Utilities, civic, developer tools, statements |

Whichever you pick, the next unrelated task should not pick the same one. Variety is a decision,
not a garnish.

## The default kit and its cousins (do not ship without a reason)

The kit everyone recognizes: `#6366F1` indigo · `#F4F1EA` cream · `#D97757` terracotta ·
`#0B0B0B` tinted near-black · `#C6F24E` acid green · `#111827` slate · `#1F2937` card-on-dark.

The cousin that fools people, including us: **warm off-white paper + near-black ink + one muted
accent**, with hairline rules and no shadows. It is not on the list, so it feels like a decision —
but it is the same decision every time: `#F2EDE1 #EFEAD9 #F2EEE4 #F3F0E7 #EFEBE0` all sit within
hue 40–53°, saturation 26–48%, lightness 89–93%. If you land there, say in one sentence why *this*
product needs it, or switch strategy.

## Palettes

Strategy in the last column. All `muted` values pass 4.5:1 on their `surface`.

| Name | surface / surface-2 / ink / muted / accent / accent-ink / rule | Use for | Strategy |
| --- | --- | --- | --- |
| **White Room** | `#FFFFFF` `#F5F7F8` `#101418` `#5A6670` `#1450C8` `#FFFFFF` `#E3E7EA` | SaaS, docs, tools, marketplaces | White room |
| **Ice Ink** | `#F4F7FA` `#FFFFFF` `#0F1720` `#5B6B7A` `#0E7490` `#FFFFFF` `#DCE4EA` | Fintech, analytics, B2B consoles | White room |
| **Clinical Calm** | `#F6FAFB` `#FFFFFF` `#17262B` `#566C72` `#0E7C86` `#FFFFFF` `#D5E1E2` | Health, clinics, insurance | White room |
| **Cool Newsprint** | `#F3F4EF` `#FFFFFF` `#14170F` `#5C6357` `#B23A2E` `#FFFFFF` `#DBDDD2` | Publishing, studios, archives | Paper |
| **Bone & Brick** | `#FAF6EE` `#FFFFFF` `#2A211C` `#776A5E` `#B4553A` `#FFFFFF` `#E5DBCB` | Hospitality, food, workshops | Paper |
| **Sage Ledger** | `#F2F1E7` `#FAF9F2` `#1D2A21` `#5D6B5C` `#3D6B4E` `#FFFFFF` `#D7D6C5` | Wellness, education, slow products | Paper |
| **Fresh Market** | `#FDFCF4` `#FFFFFF` `#22301F` `#66755F` `#C43D2E` `#FFFFFF` `#E2E1D2` | Grocery, food delivery, markets | Paper |
| **Butter & Clay** | `#F7ECCB` `#FBF3DE` `#221A0D` `#6B5A34` `#A63D19` `#FFF8F0` `#E0CE9F` | Bakeries, delis, retro retail | Paper / Duotone |
| **Chalk & Sun** | `#FBFAF5` `#FFFFFF` `#1B2A33` `#5A6E76` `#E0A32E` `#1B2A33` `#DDE3DF` | Education, community, civic | White room |
| **Plum Press** | `#F3EFF6` `#FAF7FC` `#241B2B` `#6B5F75` `#7A3E9D` `#FFFFFF` `#DED5E5` | Culture, events, creative tools | Duotone |
| **Dust Rose** | `#F6E6E4` `#FBF1EF` `#2A1B1A` `#6E5150` `#1F4D5C` `#F2FBFC` `#E3C9C6` | Beauty, wellness, editorial culture | Duotone |
| **Pale Mint** | `#EAF4EE` `#F3FAF6` `#17251C` `#4F6A57` `#B8492C` `#FFF6F1` `#C9DFD0` | Consumer health, education, care | Paper / Duotone |
| **Signal** | `#FBFBF6` `#FFFFFF` `#111111` `#61615B` `#F2C200` `#111111` `#E1E0D3` | Utilities, transport, civic service | Brutalist |
| **Copper Frame** | `#F1EFEA` `#FFFFFF` `#1A1A18` `#6A6962` `#A65E2E` `#FFFFFF` `#DEDBD2` | Hardware, industrial B2B | White room / Paper |
| **Sunfaded** | `#F7E9D2` `#FDF4E3` `#3A2B22` `#7C6039` `#B23B1C` `#F7E9D2` `#E3CDAE` | Retro brands, music, events | Paper |
| **Slate Ramp** | `#F2F4F6` `#E7EBEF` `#0E1317` `#55606B` `#0E1317` `#F2F4F6` `#C9D1D8` | Analytics, technical docs, dense ops | Mono ramp |
| **Deep Forest** | `#0F3D2E` `#15513D` `#F2F7F1` `#A9C4B4` `#F2C14E` `#1A1305` `#2C6B52` | Food, outdoors, premium produce | Saturated field |
| **Ultramarine** | `#1B2A6B` `#24368A` `#F0F3FF` `#A9B6E8` `#FFC94D` `#1B1A05` `#33459E` | Launches, consumer tech, sport | Saturated field |
| **Oxblood** | `#141113` `#1E191C` `#F3EDEA` `#A69992` `#8C2F39` `#FFF5F4` `#2B2226` | Luxury, fashion, spirits | Dark first |
| **Noir Neon** | `#0A0A0A` `#141414` `#F5F5F5` `#A3A3A3` `#FF3D8B` `#0A0A0A` `#262626` | Creative tools, music, statements | Brutalist |
| **Cold Steel + Amber** | `#0E1116` `#161B22` `#E6E9EE` `#8A93A1` `#E8A33D` `#141414` `#232A33` | Dev tools, infra, observability | Dark first |
| **Blueprint** | `#0F2A43` `#14344F` `#E9EFF3` `#9DB4C4` `#E3B341` `#0F2A43` `#2B4A63` | Engineering, hardware, schematics | Dark first / Mono |
| **Graphite & Ember** | `#121212` `#1B1B1B` `#F1EEE9` `#9A948C` `#B24622` `#FFF6F1` `#2C2A28` | Premium hardware, creative tools | Dark first |
| **Deep Sea** | `#0B1F2A` `#11303E` `#EAF2F0` `#8FA8A5` `#E9B44C` `#0B1F2A` `#20414F` | Finance, logistics, travel | Dark first |
| **Night Market** | `#0F1418` `#161C21` `#F2EFE8` `#96A0A6` `#3FA796` `#06201C` `#232C31` | Consumer apps, social, media | Dark first |

Six of the twenty-five are dark, three are saturated fields, one is a mono ramp, one is brutalist.
That spread is the point; a table where 15 of 16 light palettes are warm off-white teaches the
model exactly one answer.

## Product type → starting point

Colour and product have to be *congruent* for the pairing to be perceived as appropriate —
functional products read better in functional colour, sensory-social products in warmer, more
saturated colour (Bottomley & Doyle, 2006). So the question is not "which palette is pretty" but
"which character does this product have, and does the colour agree with it".

| Product | Character | Start from | Not |
| --- | --- | --- | --- |
| SaaS dashboard, dev tool | Functional, precise | White Room, Ice Ink, Slate Ramp | paper, textures |
| Infra, observability, trading | Instrument, night | Cold Steel + Amber, Blueprint | cream |
| Consumer fintech | Functional, reassuring | Ice Ink, Deep Sea, White Room | playful pastels |
| Institutional finance, legal | Functional, conservative | White Room, Blueprint | saturated fields |
| Health, clinics, insurance | Functional, calm | Clinical Calm, Pale Mint, Ice Ink | warm paper |
| Food, bakery, hospitality | Sensory, material | Bone & Brick, Butter & Clay, Fresh Market, Deep Forest | cold gray |
| Grocery, delivery, markets | Sensory, practical | Fresh Market, Signal, Butter & Clay | luxury noir |
| Wellness, beauty | Sensory, personal | Dust Rose, Pale Mint, Sage Ledger | clinical blue |
| Education, community | Warm, legible | Chalk & Sun, Pale Mint, Sage Ledger | neon on black |
| Publishing, editorial, archives | Printed, authored | Cool Newsprint, Slate Ramp, Oxblood | glassy gradients |
| Fashion, luxury, spirits | Sensory, restrained | Oxblood, Graphite & Ember, Deep Forest | bright accent kits |
| Consumer tech, sport, launches | Confident, branded | Ultramarine, Deep Forest, Noir Neon | generic indigo |
| Creative tools, music, media | Studio, night | Graphite & Ember, Noir Neon, Night Market | white room |
| Hardware, industrial B2B | Functional, material | Copper Frame, Slate Ramp, Blueprint | pastel |
| Utilities, transport, civic | Functional, unmistakable | Signal, White Room, Ultramarine | muted pastels |
| Events, culture, campaigns | Sensory, graphic | Plum Press, Dust Rose, Sunfaded, Ultramarine | corporate blue |

## The repetition rule

1. **A project keeps its palette.** If `DESIGN.md` exists, load it and use it — consistency inside a
   product beats novelty across screens. This rule is about the *next unrelated project*, not the
   next page.
2. **Never ship the same strategy twice in a row** in a session. If the last surface was Paper, the
   next one is White room, Dark first, Saturated field or Duotone. Write one line saying which.
3. **If you catch yourself at warm paper + near-black + one muted accent**, you have arrived at the
   cream-paper tell. Name the reason, or switch.

## Adjusting a palette

1. **Change the strategy, not the temperature,** when the result feels like every other page.
   Warming or cooling a cream surface does not change which family it belongs to.
2. **Change the accent's value, not its hue,** to fix contrast before changing the hue.
3. **One accent only.** Success/warning/error are semantic, not brand.
4. **Dark mode is a re-map, not an inversion**: surface near-black but not `#000`, ink near-white
   but not `#FFF`, accent slightly desaturated and lightened to keep contrast.

## Contrast checks (do these on the real hex)

| Pair | Minimum |
| --- | --- |
| `ink` on `surface` | 7:1 (body copy) |
| `muted` on `surface` | 4.5:1 |
| `accent-ink` on `accent` | 4.5:1 (3:1 if the text is ≥24px or ≥19px bold) |
| `rule` on `surface` | no requirement — but if a border *is* the only affordance, 3:1 |
| focus ring vs `surface` and vs `accent` | 3:1 minimum against both |

`muted` is where palettes die. `#8A8A8A` on `#FFFFFF` is 3.5:1 — fails. Aim for `#6B6B6B` or darker
on white.

## Categorical colour for charts

These six are the UK Government Analysis Function categorical palette: every colour is at least
3:1 against white, **adjacent colours in this order are at least 3:1 against each other**, and the
set is checked for colour-vision deficiency.

`#12436D` dark blue · `#28A197` turquoise · `#801650` dark pink · `#F46A25` orange ·
`#3D3D3D` dark grey · `#A285D1` light purple

Rules that come with them: never let colour be the only channel (WCAG 1.4.1), label series
directly instead of relying on a legend, keep a plain background behind charts, and use a
sequential single-hue ramp — not a rainbow — for ordered data.

## Flutter mapping

```dart
// ColorScheme roles, not raw colors, at call sites
ColorScheme(
  brightness: Brightness.light,
  primary: accent,
  onPrimary: accentInk,
  secondary: ink,
  onSecondary: surface,
  surface: surface,
  onSurface: ink,
  surfaceContainerLowest: surface2,
  onSurfaceVariant: muted,
  outline: rule,
  error: errorColor, onError: Colors.white,
)
```

`ColorScheme.fromSeed` tints every surface with the seed color under Material 3
(`surfaceTintColor`). Either set tints to transparent deliberately, or build the scheme explicitly
as above.
