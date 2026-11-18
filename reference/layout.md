# Layout

Load when the structure feels wrong: floating blocks, uneven rhythm, an empty middle, a page with no edges.

## Space first

- **One unit.** `4px` / `4dp`. Every gap, padding, and size is a multiple. Sizes in the palette: `4 8 12 16 24 32 48 64 96 128`.
- **Proximity does the grouping.** Gap inside a group < gap between groups. If two blocks are equidistant from three neighbors, there is no grouping.
- **Section rhythm repeats.** A page with section paddings of 80, 96, 72, 120 has no rhythm. Pick 2 values (e.g. 96 desktop / 48 mobile) and keep them.
- **Whitespace is not leftover.** It belongs to the block below it (optical), and it should grow with viewport, not stay fixed.

## Grids

| Structure | Grid | Notes |
| --- | --- | --- |
| Marketing page | 12 columns, max 1200–1280, gutter 24–32 | Content rarely needs more than 6 columns |
| Editorial | 6 columns + margin column for notes/captions | Asymmetry comes from spanning, not from breaking the grid |
| Dashboard | 12 columns, 16–24 gutter, dense | Widgets snap to 3/4/6/12; one widget owns the "hero number" slot |
| Settings/forms | Single column, 480–640 max, grouped sections | Two-column forms only for short, paired fields |
| Data table | Fluid, sticky first column on narrow screens | Never rely on horizontal scroll without an affordance |

## Responsive

Breakpoints are content-driven, not device-driven: pick where the layout breaks.

- 320 / 390 (phone, portrait) — single column, 16–20px page padding, no fixed widths.
- 600–768 (portrait tablet / small laptop) — 2 columns max, navigation collapses or narrows.
- 1024 (laptop) — full grid; sidebars appear.
- 1440+ — cap the content; do not stretch the measure. Increase margins, not line length.

Mobile-specific: reorder by importance, not by DOM accident (`order` in flex/grid with care for accessibility), no hover-only affordance, sticky CTA only if it does not cover content, `dvh` units.

Flutter mapping:

```dart
LayoutBuilder(builder: (context, c) {
  final w = c.maxWidth;
  if (w < 600) return const PhoneLayout();
  if (w < 1024) return const TabletLayout();
  return const DesktopLayout();
});
```

## Structure patterns that work

**Hero.** One claim, one action, one proof (screenshot, number, photo). Asymmetry beats centering: text column at 55%, visual bleeding off the right edge.

**Feature grid.** 3 items = one row with generous gaps; 4–6 items = 2 rows with a different rhythm (do not make a 3×2 grid of identical cards). Give one item more weight, or use a list with a number/index instead of cards.

**Dashboard.** One headline number at 2–3× the size of everything else; secondary metrics as a row; charts with titles above and units visible; the table at the bottom, sorted by what matters.

**Pricing.** 2–3 tiers, one emphasized (border/accent, not a bigger card); feature rows aligned; the CTA identical in position across tiers.

**Form.** One column, labels above, groups with subtitles, the submit action aligned to the field edge, errors inline.

**Settings.** Sections with one-line descriptions, destructive actions isolated at the bottom with their own visual weight, save state visible.

**Empty page.** One sentence, one action, one piece of product-specific illustration (or none). Never a centered gray box saying "No data".

## Density

Choose a density and apply it everywhere:

| Density | Row height | Type | Use |
| --- | --- | --- | --- |
| Comfortable | 56–64px | 16 | Consumer, marketing, onboarding |
| Compact | 40–44px | 14 | Admin, dashboards |
| Dense | 32–36px | 13–14 tabular | Trading, logs, monitoring |

Mixed density in one product reads as unfinished. If two areas differ, that is a stated decision.

## Details that carry the layout

- Optical alignment: icons and bullets pulled slightly left so their *visual* edge aligns with text.
- Edge alignment: a container's left edge should match the section's left edge; misaligned containers are visible at a glance.
- Hierarchy via contrast of size, not of brightness.
- Break the grid once per page, if at all — and let it break toward the content (image bleeding, oversized numeral), not sideways.
- Scroll length: a marketing page that scrolls more than ~6 screens needs a reason; a dashboard must fit above the fold in its primary view.

## Layout anti-patterns

- Three equal cards as the only structure (feature grid, pricing, testimonials, blog posts).
- Centered headline + centered subhead + centered buttons + centered everything.
- The 20-character-wide text column in a 3×2 grid.
- Fixed pixel widths on content containers (`width: 1100px`).
- Right-aligned body text, or ragged edges on both sides.
- Sticky header + sticky subheader + sticky filter bar (mobile viewport gone).
- Sections separated only by whitespace with no alignment difference — the page reads as one long blur.
- A grid that is visible in the code but not in the result.
