# Data surfaces — tables, charts, dashboards

Professional tools are judged on data legibility, not on the hero. If the surface carries
numbers, this file outranks aesthetic preference. A dashboard that is beautiful and unreadable
is a failed dashboard; a plain table that answers the question in two seconds is a good one.

## The rule that catches most of it

**Every number earns three things: an alignment, a unit, and a comparison.** If a number has
no unit and nothing to compare against, it is decoration with a decimal point.

## Tables

The table is the hardest thing on the page and the one most often left to the framework.

| Decision | Rule |
| --- | --- |
| Alignment | Numbers right, text left, never center a column of numbers |
| Digits | `font-variant-numeric: tabular-nums`; fixed decimals per column (12.4, not 12.4218) |
| Headers | Name the unit — "Gols", "Nota", "Ø idade" — and repeat it nowhere else |
| Sorting | Active column shows direction; the whole `<th>` is the button, ≥ 44 px tall |
| Sticky header | Past ~12 rows, headers stick; the row of the subject (my team, this account) sticks too |
| Zebra | Only past ~8 columns or long rows, and at 2–4% ink — never gray-200 stripes |
| Row height | 32–40 px in a dense desktop tool; 44+ where fingers are involved |
| Emphasis | The row that matters gets a 3 px accent edge + weight, not a full colored fill |
| Status | Text + shape, not a colored dot alone: "Suspenso (2)", "Dúvida — tornozelo" |
| Truncation | Ellipsis + `title`; never wrap mid-word to save a column |
| Long tables | The table gets its own scroller — the page never scrolls sideways because of it |
| Empty | "Nenhum jogador com esse filtro" + the action that clears the filter |
| a11y | Real `<table>`, `<th scope>`, `<caption>` or `aria-label`, sortable via `<button>` inside `<th>` |

Numeric columns of different magnitudes should share decimal places and, where it helps,
a common width. A table with five font sizes and no alignment logic is a soup, not a table.

**Formulas in the page must reconcile.** Goals in the squad list must sum to goals in the
standings; points must equal 3W + D. Someone always checks, and a contradiction destroys trust
in every other number on the screen.

## Charts

Choose by the question, not by the shape that looks nice in the mockup:

| Question | Encoding |
| --- | --- |
| Compare categories | Horizontal bars, sorted by value, zero baseline |
| Change over time | Line, 1–2 series, direct label at the end |
| Distribution | Histogram or strip/dot plot, never a pie |
| Composition, few parts | Stacked bar. Pie only for 2–3 parts, and rarely |
| Two variables | Scatter with a light reference line |
| Cumulative progress | Bullet or a single bar against a target |

Non-negotiables:

- **A chart without a reference is a picture.** Average line, target, previous period, or the
  league median — one of them, labeled.
- **Bars start at zero.** Lines may not, and must say so if the axis is clipped.
- **Color is never the only encoding.** Direct labels, dashes, shapes, or position — the chart
  must survive grayscale and color-blindness.
- **3–5 gridlines, not a millimetre grid.** Label the unit once, on the axis, not on every tick.
- **Categorical series cap at 5.** Past that, small multiples — same axes, one series each.
- No 3D, no gradients inside bars, no gauge/speedometer, no donut with eight slices, no dual
  Y-axis (two charts, stacked, share the X).
- Label the endpoint and the outlier, not every point.
- Sparkline for a trailing series: no axes, no grid, last value labeled next to it.

Minimal chart CSS that stays legible: 1 px axis in `--rule`, 11–12 px muted tick labels,
series in the accent plus one secondary hue, generous space above the plot.

## Stat tiles / KPI

- One number, one label, one comparison: `12º` · `Posição` · `−3 vs. rodada 8`.
- The number is at least twice the label size; the unit is smaller than the number and muted.
- Tabular numerals, so tiles do not jitter when data updates.
- The icon never carries the meaning; it decorates the label at most.
- A grid of identical tiles is not hierarchy. If everything is a tile, nothing is.

## Dashboard composition

1. Order blocks by the decision the user came to make — "what do I have to act on now?" first,
   history second, reference data last.
2. Vary weight: one dominant block, two or three secondary, the rest small. Uniform card grids
   read as a menu, not a dashboard.
3. Global filters (period, competition, unit) live in one sticky bar, always visible, and the
   active range is written out — never implied by a selected pill alone.
4. Density is a decision, not an accident: state the row height, the type scale, and the gutter
   once in `DESIGN.md`, then obey them.

## Professional primitives

- **Empty, loading, error** for every block that fetches — shaped like the content (skeletons
  with the same line lengths and block sizes, not four identical gray bars).
- **Inline edit** for table cells that get corrected often; commit on blur, Esc cancels.
- **Toasts**: one line, one action, ~4 s, dismissible, never for errors that need a decision.
- **Modals**: focus trapped, Esc closes, focus returns to the trigger, destructive action
  demands the object's name typed or a second confirm.
- **Timestamps**: relative in the list ("há 2 h"), absolute on hover/`title`.
- **Pagination** for tables and lists of records; infinite scroll only for feeds.
- **Command palette** once the tool has more than ~3 sections; `/` focuses search.
- **Keyboard**: every action reachable without a mouse, visible `:focus-visible` at all times.

## Definition of done for a data surface

- [ ] Every column has an alignment rule, a unit, and enough precision to be comparable.
- [ ] The subject's row/state is identifiable without relying on color.
- [ ] Numbers reconcile across every place they appear.
- [ ] Each chart answers a stated question and shows a reference (average, target, prior).
- [ ] Charts survive grayscale; series are labeled directly.
- [ ] Empty, loading and error exist for at least the fetching blocks.
- [ ] Tables get their own scroller; the page does not scroll sideways.
- [ ] Sorting/filtering works from the keyboard and announces its state.
- [ ] No decorative chart, no gauge, no 3D, no dual axis.
