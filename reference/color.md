# Color

Load when the palette needs work, when contrast fails, or when dark mode is in scope.

## Build the palette in this order

1. **Surface and ink first.** Fix the paper: warm (`#FAF6EE`), cool (`#F3F4EF`), neutral (`#FAFAF8`), or dark (`#0E1116`). Then ink — never `#000` on paper, never `#FFF` on dark.
2. **Muted.** Find the lightest gray that still hits 4.5:1 on surface. That is your muted. If you want lighter, the text must be larger or bolder.
3. **One accent.** Choose by meaning: the product's material (copper, oxide, moss) or its signal (safety yellow, transit red). Not by "looks nice with gray".
4. **Accent-ink.** Text on the accent. Compute it — white on `#F2C200` is 1.9:1 and fails.
5. **Rule/borders.** Derived from muted with low alpha, or a dedicated warm/cool gray.
6. **Semantic colors.** Success/warning/error/danger, all contrast-checked against surface *and* against their own tinted backgrounds.

## Rules

- One accent. Semantic colors are not accents and never decorate.
- Accent is for: primary action, active state, selection, one data series, key links. Not for headings, backgrounds, or icon tinting across the page.
- Tint surfaces derived from the accent (`accent` at 6–8% alpha) instead of inventing new hues.
- Do not encode meaning in hue alone — pair with icon, label, or position (color-blind users).
- Neutral grays that lean warm or cool are a personality decision; mixing warm and cool grays is a defect.
- 60/30/10 is a starting point, not a law: surface dominates, ink is structural, accent is rare.

## Contrast, computed

| Purpose | Ratio | Notes |
| --- | --- | --- |
| Body text | 4.5:1 (aim 7:1) | 16px regular counts as body |
| Large text | 3:1 | ≥24px, or ≥19px at 600+ |
| UI boundaries, icons that carry meaning | 3:1 | A border that is the only affordance |
| Disabled text | exempt | But must still be *perceivably* disabled, not invisible |
| Focus ring | 3:1 vs surface and vs adjacent color | Ring on a same-hue button disappears |

Quick guesses that usually fail: `#999` on white (2.8:1), `#777` on `#F4F1EA` (3.9:1), white on `#F2C200`, white on `#22C55E`, `#8B5CF6` text on white (4.3:1).

## Dark mode

Not an inversion. Build a second scheme:

- Surface: near-black with a tint of the brand hue (`#0E1116`, `#141113`), not `#000`.
- Raised surfaces get *lighter*, not brighter-white: `#161B22` over `#0E1116`.
- Ink: near-white (`#E6E9EE`), never `#FFF`.
- Accent: lighten and desaturate ~10–15% — the light-mode accent is too dark to read on dark.
- Borders become lighter low-alpha, shadows stop working — use borders for elevation.
- Muted text needs re-checking: a gray that passed on white often fails on dark.
- Images and logos: ensure transparent PNGs with dark ink still work (provide a monochrome variant or a backdrop).

## Color for data

- Sequential: one hue, light→dark. Categorical: 4–8 hues of similar lightness, distinguishable at small size.
- Never rely on red/green alone for +/-; add sign, arrow, or label.
- Highlight *one* series; gray the rest. A chart where everything is colored communicates nothing.
- Backgrounds behind data must not compete with the data's hue.

## Flutter specifics

- `ColorScheme` roles (`primary`, `surface`, `onSurfaceVariant`, `outline`) instead of passing `Color` objects around.
- `ColorScheme.fromSeed` applies Material 3 tonal tinting to surfaces — set `surfaceTintColor: Colors.transparent` deliberately, or the whole UI shifts hue.
- Use `Color.withValues(alpha:)` (Flutter ≥3.27) rather than deprecated `withOpacity`.
- Verify both `Brightness` values in one widget test or one screenshot; a hardcoded `Colors.black87` usually breaks dark mode.

## Checklist

- [ ] Every pair in the palette checked on real hex values, both modes.
- [ ] Muted text passes; placeholders pass or are decorative-only.
- [ ] Accent-ink computed, not assumed white.
- [ ] Focus ring visible on every background it lands on.
- [ ] No second accent smuggled in as "secondary".
- [ ] Semantic colors readable on their tinted backgrounds.
