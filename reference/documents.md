# Context documents

Two files make a project coherent across sessions. Keep them short — one screen each. They are contracts, not documentation.

Write them when: first run on a project, the user asks for a system, or the surface has more than one screen. For a one-off page, keep the plan in the brief instead.

## PRODUCT.md

```markdown
# <Product>

## What it is
One paragraph, concrete. A "subscription roastery in Recife that ships 250g bags weekly" — not "a platform for coffee lovers".

## Who it is for
Two personas maximum, with what they are doing when they arrive.

## What it must communicate
Three things, prioritized. The first one is what the layout must make obvious in 3 seconds.

## What it must never do
Constraints with teeth: "never look like a supermarket", "no stock photography of people laughing with laptops", "must work on a 5-year-old Android phone".

## Real content and assets
Actual copy that exists, real product names, photos available (and their quality), logos, legal text. Note what does not exist yet.

## Languages and locales
Default language, translations available, currency/date/number formats.

## Stack and constraints
Framework, design system in use (if any), what cannot be changed, performance budget.
```

## DESIGN.md

```markdown
# Design system — <Product>

## Direction
Editorial Broadsheet, warm variant. (Why: the product is long-form journalism sold by subscription.)
Not this: Refined Minimal — it would make the writing look like a dashboard.

## The one bold move
A 96px display serif headline that crosses the column rule on the home surface. Everywhere else: strict two-column grid.

## Palette
| Role | Hex | Notes |
| --- | --- | --- |
| surface | #F3F4EF | cool newsprint, not cream |
| surface-2 | #FFFFFF | cards, quotes |
| ink | #14170F | |
| muted | #5C6357 | 5.2:1 on surface |
| accent | #B23A2E | oxide red, links and active states only |
| accent-ink | #FFFFFF | |
| rule | #DBDDD2 | 1px hairlines |

Semantic: success #3D6B4E · warning #B4761F · error #A83232.

## Type
| Role | Family | Size / line-height / spacing |
| --- | --- | --- |
| display | Newsreader 500 | 56–96 / 1.02 / -1.5px |
| heading | Newsreader 500 | 32 / 1.15 / -0.5px |
| body | Instrument Sans 400 | 17 / 1.65 / 0 |
| label | Instrument Sans 500 | 13 / 1.2 / 0.4px |
| data | JetBrains Mono 400 | 14 / 1.4 / tabular |

Measure: 62ch body, 78ch on wide screens.

## Space and shape
Unit 4px. Section padding 96/64/40 (desktop/tablet/mobile). Card padding 24. Radius: 0 (brutalist edges) or 2px on inputs. Borders 1px `rule`; no shadows except overlays.

## Motion
120ms micro, 240ms surfaces, ease-out `cubic-bezier(.2,0,0,1)`. No entrance animations on text. Reduced motion: opacity only.

## Components
Buttons (primary/secondary/ghost), link styles, card, form field, table, tag, dialog, empty state, toast. Each has states: default, hover, focus-visible, active, disabled, loading.

## Deliberate exceptions
(Anti-patterns allowed, with reason.) Full-bleed photo hero: the product is physical and photography is the evidence.

## Banned
Purple gradients, card shadows, emoji as icons, ALL-CAPS headlines, testimonial stock photos.
```

## Surface brief

```markdown
# <Surface> — <date>
Goal:            <what this screen achieves for the user>
Entry point:     <URL / navigation path>
In scope:        <screens/states>
Out of scope:    <explicitly>
Reuses:          <DESIGN.md components; what is new and must be added>
Success:         <observable test>
```

## Extracting a design that already exists

When a repo has UI and no `DESIGN.md`, reverse-engineer it instead of imposing a new one:

1. Grep for tokens: `globals.css`, `tailwind.config.*`, `theme.ts`, `theme.dart`, `Colors.*`, `EdgeInsets.all(`, `border-radius:`.
2. Collect the top 5 hex values by frequency and their contexts (background, text, border).
3. Collect type: font families, the 6 most frequent `font-size` values, weights.
4. Collect shape: radii, shadows, border widths.
5. Write the draft `DESIGN.md`, then diff it against what the code does: inconsistencies (5 different radii, 3 near-identical grays) are findings, not facts.
6. Report the drift: "you have 4 radii and 11 grays; here are the canonical 3 and 2".

Do not "fix" the design silently while documenting it. Extract first, propose the consolidation second.

## Keeping them honest

- If code and `DESIGN.md` disagree, the code is what users see — update the doc or fix the code, never leave both.
- Every new component gets a line in `DESIGN.md`; every new color gets a role.
- If a rule is broken twice on purpose, it is not a rule — change the doc.
