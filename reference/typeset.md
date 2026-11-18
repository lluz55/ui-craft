# Typesetting

Load when type needs to carry the surface, or when text feels "off" and the cause is not the font.

## Scale

Pick a ratio and stick to it. Sizes are roles, not arbitrary numbers.

| Ratio | Feel | Use |
| --- | --- | --- |
| 1.125 (major second) | Tight, utilitarian | Dense product UI |
| 1.2 (minor third) | Composed | Most product and marketing surfaces |
| 1.25 (major third) | Editorial | Long-form, publishing |
| 1.333 (perfect fourth) | Dramatic | Landing pages, one bold move |
| 1.5 (perfect fifth) | Poster | Display-only, never for UI |

From a 17px base at 1.25: `17 · 21 · 26 · 33 · 41 · 51 · 64`. Round to whole pixels, keep the ratio in `DESIGN.md`, and stop before the scale produces a size you do not have content for.

Hierarchy usually needs only **three** levels. If you have six, the middle ones are fighting: use weight or color for the levels in between.

## Measure and rhythm

- Body measure: 45–75 characters (`max-width: 65ch` web / `ConstrainedBox(maxWidth: 620)` Flutter). Narrower for long reads, wider only for tables.
- Line-height: `1.6–1.7` at 16–18px, `1.4` at 20–24, `1.2` at 32, `1.0–1.05` at 56+.
- Paragraph spacing: `0.75em–1em`, never a full blank line in UI.
- Vertical rhythm: every block's margins are multiples of the base line-height (or close, adjusted optically).
- First-line indent only in justified long-form; never in UI.

## Detail work that reads as quality

| Detail | Rule |
| --- | --- |
| Quotation marks | Curly, always: `"…"` in prose, `'` for apostrophes |
| Dashes | Em dash — for breaks, en dash – for ranges, hyphen only inside words |
| Ellipsis | Single character `…`, not three periods |
| Units | Non-breaking space: `25 kg`, `R$ 40`, `2 min` |
| Numbers | Tabular in tables/timers/prices; oldstyle only in prose |
| Small caps | Real `font-variant-caps` or uppercase with +5% tracking; never fake by lowercase |
| Hanging punctuation | Optional; if you do it, do it on quotes in display type |
| Widows/orphans | `text-wrap: balance` on headings, `pretty` on short paragraphs |
| Underlines | `text-underline-offset: 2–3px`, `text-decoration-thickness` from the font weight |
| Optical alignment | Trailing quote/asterisk pulled left with negative margin in display sizes |
| Code | Monospace at 90% of body size, with background tint and `overflow-x` |

## Weight and contrast

- Two weights of one family outperform two families at one weight.
- Do not use `font-weight: 300` for body text on light backgrounds — it thins out under contrast loss.
- Dimmed text is not hierarchy: use weight and size first, color second, opacity never.

## Web specifics

```css
:root { --measure: 65ch; }
h1, h2 { text-wrap: balance; letter-spacing: -0.02em; }
p { max-width: var(--measure); text-wrap: pretty; }
.num { font-variant-numeric: tabular-nums; }
```

- `font-size` in `rem`; `letter-spacing` in `em` (scales with size).
- Disable ligatures in code/ids: `font-variant-ligatures: none`.
- `hyphens: auto` only in justified long-form, with `lang` set.
- System fallback chain must preserve metrics: put a close metric fallback before `sans-serif`.

## Flutter specifics

- `TextTheme` roles, not `TextStyle` at call sites.
- `height` is a multiplier: `height: 1.6` = CSS `line-height: 1.6`.
- `letterSpacing` is in logical pixels — convert from `em` mentally: `-0.02 * fontSize`.
- `Text.rich` for mixed weight inline; `WidgetSpan` only when truly necessary.
- `TextOverflow.ellipsis` + `maxLines` on constrained labels; never let a 40-char label push a row apart.
- Localized strings expand 30% — design for the longer language.

## Type anti-patterns

- Display serif for body copy; body sans at 24px as a "display".
- Justified text with no hyphenation, or justified text on the web at all.
- Letterspaced body text; all-caps sentences longer than a line.
- Three weights of three families (nine combinations, no system).
- Headline sizes chosen per screen instead of from the scale.
- Text over imagery without a scrim and a contrast check.
