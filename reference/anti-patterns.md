# Rejection list

If a delivered surface contains items from this list, it is not done. Fix or justify in writing — "the brief asked for it" is a justification; "it looked empty" is not.

## Visual slop

- The default kit: indigo `#6366F1`, `rounded-lg`, `shadow-sm`, Inter, gray-50 page, three identical cards.
- Cream `#F4F1EA` + display serif + terracotta `#D97757`, in that exact combination.
- Near-black page + acid green or vermilion accent, used as a personality substitute.
- Purple-to-blue gradient on a hero or a button. Any gradient used as decoration rather than light or material.
- Glassmorphism over a background that carries no information.
- Emoji as icons in a professional surface.
- Icon-in-a-rounded-square as the only logo mark (the "AI startup badge").
- Every card the same radius, the same shadow, the same padding, the same everything.
- Shadows on static cards (borders belong there). Shadows on text.
- A second accent "to create hierarchy". Hierarchy comes from scale, weight, space.
- All-caps body copy. Letter-spaced lowercase body. Justified text on the web.
- A hero image that only makes sense at 1440px.
- Decorative elements with no job: floating blobs, dotted grids behind content, "aurora" backgrounds, sparkles.

## Chrome and template tells

- Eyebrow label in ALL CAPS + tracking, above every heading.
- "A · B · C" feature rows, "WORD — fragment" headings, "→" appended to every link.
- A tinted `#0B0B0B` dark section inserted into an otherwise light page for no structural reason.
- Monospace used for labels in a non-technical product.
- Numbered "01 / 02 / 03" lists where order carries no meaning.
- A fake browser chrome / fake window frame as the hero visual.
- Testimonial with a stock photo and a job title that does not exist.
- Logo strip with gray logos that all have different optical weights.

## Structural slop

- Centered everything: hero, features, testimonials, CTA, footer — one column, no asymmetry, no edges.
- The empty middle column: a three-column feature grid where copy is 20 characters wide.
- Cards used for content that is not a unit: prose split into cards, a single sentence in a 300px box.
- Tabs for three short items. Accordion for four short items. Carousel for anything essential.
- Sticky header that eats 15% of a mobile viewport.
- Forms as a wall of inputs with no grouping and no progression.
- A dashboard where every widget is a card with the same weight — nothing is the headline number.
- Settings pages without sections, search, or destructive-action separation.
- Content that requires hover to be understood on a touch device.

## Copy slop

- "Empower", "seamless", "unlock", "supercharge", "revolutionize", "effortless", "next-generation", "cutting-edge", "game-changing".
- "Built for the modern X" / "The future of Y" as a value proposition.
- A CTA that says "Learn more" or "Get started" on every button. Say what happens: "Criar workspace", "Baixar planilha", "Agendar demo".
- Errors that apologize ("Oops! Something went wrong 😅") instead of stating cause and remedy.
- Empty states that are just an illustration and "No data".
- Placeholder copy left in: Lorem ipsum, "Your text here", "Feature one/Feature two", "Company Name".
- Fake metrics with no source ("10x faster", "99.9% uptime" when unmeasured).
- Exclamation marks in product UI. Ellipses for trailing states ("Loading...").
- Title Case In Buttons And Labels in languages that do not use it (PT-BR, ES, FR).

## Code slop

**Web**

- `style="..."` sprinkled next to a design system; magic hex values outside tokens.
- `!important` to win a specificity fight.
- `outline: none` with no replacement.
- `transition: all`.
- `div` with `onClick` and no role/keyboard handler.
- Placeholder-as-label, `user-scalable=no`, blocked paste.
- Fixed pixel heights on text containers.
- `100vh` on mobile instead of `100dvh`.
- `any` casts to silence type errors in UI state.

**Flutter**

- `Color(0xFF...)` and `EdgeInsets.all(16)` at call sites instead of theme/tokens.
- `ColorScheme.fromSeed` alone, with Material 3 tinting every surface.
- `Container` where `Padding`/`SizedBox`/`DecoratedBox` would do (extra layout/paint cost and unclear intent).
- `Column` inside `SingleChildScrollView` for a list that can exceed a screen.
- `shrinkWrap: true` on a long list.
- `MediaQuery.of(context).size.width` to branch on device instead of `LayoutBuilder`.
- Ignoring `MediaQuery.textScaler` — layouts that break at 2.0 are broken.
- Icon-only `IconButton` without `tooltip`/`Semantics` label.
- Hardcoded Portuguese/English strings in widgets on a localized app.
- `setState` on a page to change one leaf's hover color.

## Platform-specific traps

**Web**

- `min-width: auto` on a flex child containing a long string → horizontal page scroll.
- Sticky footer inside a short page that overlaps content.
- Modal that does not trap focus or restore it.
- Destructive action with a bare confirm dialog and no consequence text.
- Autoplay video with sound; scroll-jacking.

**Flutter**

- `SafeArea` missing on a bottom sheet or dialog.
- Ripple/missed feedback on custom tappable surfaces (`InkWell` inside a `Container` with a color — the ink is invisible).
- Cupertino and Material widgets mixed in one surface without intent.
- Animations that ignore `MediaQuery.disableAnimations`.
- Hit areas that are the icon's 24dp, not 48dp.
- Overflow stripes shipped because the developer only tested one device width.

## Data slop

| Pattern | Why it fails |
| --- | --- |
| A grid of identical KPI tiles | Everything at the same weight means nothing has weight |
| Gauge / speedometer / dial | Three numbers of ink to say one number |
| Donut or pie with 8 slices | Nobody can compare angles; use bars |
| Sparkline with no reference and no label | A decorative squiggle |
| Dual Y-axis | Two scales means any two lines can be made to "correlate" |
| 3D bars, gradient-filled bars | Distorts the encoding the reader is measuring |
| Zebra stripes at gray-200 | Reads as a table from 2011, and fights the border logic |
| Centered numeric columns | Destroys the digit alignment that makes scanning possible |
| Chart inside a card inside a card | Two shadows and two radii for one object |
| Numbers that do not add up | One contradiction invalidates every other number |

## When something from this list is correct

Some briefs genuinely need a gradient (an actual light source), a serif (an actual publication), or a carousel (a photo gallery with no primary item). In those cases:

1. write the justification in `DESIGN.md` under **Deliberate exceptions**;
2. make the execution specific to the product — not the generic version of the pattern.
