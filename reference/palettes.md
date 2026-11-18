# Palettes

Pick by **what the product is**, then adjust one thing to make it yours (a warmer paper, a cooler ink, a different accent hue). A palette is six roles, not twenty tokens.

| Role | Meaning |
| --- | --- |
| `surface` | The page/background |
| `surface-2` | Raised or inset surface (cards, wells, headers) |
| `ink` | Primary text |
| `muted` | Secondary text, metadata (must still hit 4.5:1 on `surface`) |
| `accent` | The single chroma that means "action / attention" |
| `rule` | Borders, dividers, hairlines |

`accent-ink` = text drawn on top of `accent`. Check it, do not assume white.

## The default kit (do not ship without a reason)

`#6366F1` indigo · `#F4F1EA` cream · `#D97757` terracotta · `#0B0B0B` tinted near-black · `#C6F24E` acid green · `#111827` slate · `#1F2937` card-on-dark.

Any of these alone is fine. Cream + serif + terracotta, or indigo + `rounded-lg` + `shadow-sm`, is the 2025 AI kit. If you land there, change two roles and write down why.

## Palettes

| Name | surface / surface-2 / ink / muted / accent / accent-ink / rule | Use for | Direction |
| --- | --- | --- | --- |
| **Cool Newsprint** | `#F3F4EF` `#FFFFFF` `#14170F` `#5C6357` `#B23A2E` `#FFFFFF` `#DBDDD2` | Publishing, docs, studios | Editorial |
| **Bone & Brick** | `#FAF6EE` `#FFFFFF` `#2A211C` `#776A5E` `#B4553A` `#FFFFFF` `#E5DBCB` | Hospitality, food, workshops | Warm Craft |
| **Sage Ledger** | `#F2F1E7` `#FAF9F2` `#1D2A21` `#5D6B5C` `#3D6B4E` `#FFFFFF` `#D7D6C5` | Wellness, education, slow products | Warm Craft / Organic |
| **Cold Steel + Amber** | `#0E1116` `#161B22` `#E6E9EE` `#8A93A1` `#E8A33D` `#141414` `#232A33` | Dev tools, infra, observability | Technical |
| **Blueprint** | `#0F2A43` `#14344F` `#E9EFF3` `#9DB4C4` `#E3B341` `#0F2A43` `#2B4A63` | Engineering, hardware, schematics | Technical / Swiss |
| **Graphite & Ember** | `#121212` `#1B1B1B` `#F1EEE9` `#9A948C` `#C6502B` `#FFF6F1` `#2C2A28` | Premium hardware, creative tools | Noir |
| **Oxblood** | `#141113` `#1E191C` `#F3EDEA` `#A69992` `#8C2F39` `#FFF5F4` `#2B2226` | Luxury, fashion, spirits | Noir / Editorial |
| **Chalk & Sun** | `#FBFAF5` `#FFFFFF` `#1B2A33` `#5A6E76` `#E0A32E` `#1B2A33` `#DDE3DF` | Education, community, civic | Swiss / Soft |
| **Fresh Market** | `#FDFCF4` `#FFFFFF` `#22301F` `#66755F` `#C43D2E` `#FFFFFF` `#E2E1D2` | Grocery, food delivery, markets | Editorial / Craft |
| **Clinical Calm** | `#F6FAFB` `#FFFFFF` `#17262B` `#566C72` `#0E7C86` `#FFFFFF` `#D5E1E2` | Health, clinics, insurance | Refined Minimal |
| **Plum Press** | `#F3EFF6` `#FAF7FC` `#241B2B` `#6B5F75` `#7A3E9D` `#FFFFFF` `#DED5E5` | Creative tools, culture, events | Editorial / Playful |
| **Signal** | `#FBFBF6` `#FFFFFF` `#111111` `#61615B` `#F2C200` `#111111` `#E1E0D3` | Utilities, transport, civic services | Swiss / Brutalist |
| **Deep Sea** | `#0B1F2A` `#11303E` `#EAF2F0` `#8FA8A5` `#E9B44C` `#0B1F2A` `#20414F` | Finance, logistics, travel | Noir / Data |
| **Copper Frame** | `#F1EFEA` `#FFFFFF` `#1A1A18` `#6A6962` `#A65E2E` `#FFFFFF` `#DEDBD2` | Hardware, industrial, B2B | Swiss / Craft |
| **Sunfaded** | `#F7E9D2` `#FDF4E3` `#3A2B22` `#8A6E4B` `#D14D28` `#F7E9D2` `#E3CDAE` | Retro brands, music, events | Retro Analog |
| **Night Market** | `#0F1418` `#161C21` `#F2EFE8` `#96A0A6` `#3FA796` `#06201C` `#232C31` | Consumer apps, social, media | Playful / Noir |

## Adjusting a palette

1. **Warm or cool the neutrals.** A neutral gray that leans blue reads tech; leaning yellow/green reads paper and time.
2. **Change the accent's value, not its hue,** to fix contrast before changing the hue.
3. **One accent only.** If you need a second signal (success/warning/error), those are semantic, not brand.
4. **Dark mode is a re-map, not an inversion**: surface near-black but not `#000`, ink near-white but not `#FFF`, accent slightly desaturated and lightened to keep contrast.

## Contrast checks (do these on the real hex)

| Pair | Minimum |
| --- | --- |
| `ink` on `surface` | 7:1 (body copy) |
| `muted` on `surface` | 4.5:1 |
| `accent-ink` on `accent` | 4.5:1 (3:1 if the text is ≥24px or ≥19px bold) |
| `rule` on `surface` | no requirement — but if a border *is* the only affordance, 3:1 |
| focus ring vs `surface` and vs `accent` | 3:1 minimum against both |

`muted` is where palettes die. `#8A8A8A` on `#FFFFFF` is 3.5:1 — fails. Aim for `#6B6B6B` or darker on white.

## Product type → starting point

| Product | Palette | Direction |
| --- | --- | --- |
| SaaS dashboard / dev tool | Cold Steel + Amber | Refined Minimal / Technical |
| Infra / observability | Blueprint or Cold Steel | Technical |
| Fintech consumer | Deep Sea | Refined Minimal |
| Fintech institutional | Swiss gray + one restrained accent | Swiss |
| Health | Clinical Calm | Refined Minimal / Organic |
| Food / hospitality | Bone & Brick, Fresh Market | Warm Craft |
| Wellness / education (consumer) | Sage Ledger, Chalk & Sun | Soft Organic |
| Publishing / studio | Cool Newsprint | Editorial |
| Fashion / luxury | Oxblood | Noir / Editorial |
| Hardware / industrial B2B | Copper Frame | Swiss |
| Events / culture | Plum Press, Night Market, Sunfaded | Retro / Playful |
| Utility / transport / civic | Signal | Swiss / Brutalist |

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

`ColorScheme.fromSeed` tints every surface with the seed color under Material 3 (`surfaceTintColor`). Either set tints to transparent deliberately, or build the scheme explicitly as above.
