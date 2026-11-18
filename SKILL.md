---
name: ui-craft
description: Use when building, redesigning, or reviewing any frontend interface — web pages, dashboards, marketing sites, or Flutter app screens — or when a UI looks generic, over-decorated, or "AI-made". Covers brief capture, aesthetic direction, implementation, blind-spot critique, and a verifiable quality floor for both web and Flutter.
---

# ui-craft

Interfaces fail in two directions.

**Generic**: Inter, `#6366F1`, `rounded-lg`, centered hero, three identical cards, "Empower your workflow". It reads as *a website*, not as *this* product.

**Incoherent**: five fonts, four accent colors, a gradient on every surface, motion because motion is fun. It reads as effort, not as craft.

This skill removes both failure modes the same way: force a point of view, write it down in two durable files, then hold the result to a floor you can actually verify.

## Router

No argument → print the command menu below and stop.

Detect the stack before anything else:

| Signal in the project | Stack |
| --- | --- |
| `pubspec.yaml` | Flutter |
| `package.json`, `next.config.*`, `vite.config.*`, `index.html` | Web |
| Both, and the work item names neither | Ask which surface, once |
| Neither | Ask what you are building and in what |

Then load, in this order and never all at once:

1. this file (always);
2. `reference/web.md` or `reference/flutter.md` — the platform you are actually editing;
3. the command's reference section below;
4. tables from `reference/` only when the task needs them (`styles.md`, `fonts.md`, `palettes.md`, `anti-patterns.md`);
   if the surface carries tables, charts or numbers, `reference/data.md` is mandatory — on a data surface, legibility outranks composition;
5. `reference/verify.md` before you claim anything about how it looks;
6. `reference/craft-floor.md` immediately before delivering.

## Commands

| Command | Use when |
| --- | --- |
| `shape` | Before any code: capture the brief, pick a direction, write the plan. Creates PRODUCT.md and DESIGN.md on first run. |
| `build` | Implement the shaped plan. |
| `critique` | Judge a result (yours or someone else's) against the rubric and name what is wrong. |
| `audit` | Mechanical floor: accessibility, states, responsive, performance, platform idioms. Terse `file:line` findings. |
| `polish` | Last pass: spacing rhythm, alignment, copy, icons, focus rings, empty states. |
| `harden` | Edge cases: long text, no data, 320px, 200% zoom, offline, destructive actions, i18n, motion sensitivity. |

Refinement references loaded on demand by `build` or `polish`: `reference/typeset.md`, `reference/color.md`, `reference/layout.md`, `reference/motion.md`. They are not separate commands.

## Non-negotiables

1. **The brief outranks your taste.** If the product is a parts catalog for machine shops, it must look like it belongs in a machine shop, not like a design-award entry. Decoration that contradicts the subject is a defect.
2. **One idea, fully executed.** Bold in one place — type, color, layout, or motion — and restrained everywhere else. Two competing bold moves read as noise.
3. **No default kit.** Neutral gray + indigo + one radius + soft shadow on cards is the absence of a decision. See `reference/anti-patterns.md`; if the design contains items from the rejection list, it is not done.
4. **Every state exists.** Empty, loading, error, success, disabled, overflow, 400-character name, no image, no network, 320px, 200% zoom. A happy path alone is half a screen.
5. **Never claim you looked when you did not.** Find out which kind of agent you are — sighted or blind — and verify by the matching path in `reference/verify.md`. A model that cannot accept images measures geometry and contrast instead of pretending to see, and says exactly that in the report.
6. **Decisions get names and numbers.** "Warm paper `#F7F3EC`, display serif, 1.2 ratio" — not "clean and modern".

## Context files

Two durable files per project. They are the reason the third screen matches the first.

- **`PRODUCT.md`** — what this is, who it is for, what it must communicate, what it must never do, the real content and constraints (languages, data, brand assets that exist).
- **`DESIGN.md`** — the system: named palette with hex values and roles, type roles and scale, spacing unit, radii, borders, shadow policy, motion policy, component inventory, principles, and an explicit *banned* list.
- **Surface brief** — for a single work item: goal, audience, the one bold move, the states in scope.

Templates and the extraction procedure (when a repo already has a design): `reference/documents.md`. Write these files only when the task earns them: first run of a project, an explicitly requested system, or a surface with more than one screen. For a one-off page, keep the plan in the brief and move on.

## Workflow

```
shape ──▶ build ──▶ critique (critique + audit) ──▶ fix once ──▶ verify ──▶ report
```

1. **shape** — read PRODUCT.md/DESIGN.md if present; otherwise interview briefly and write them. Produce the plan: subject signal, direction, palette, type, layout, states, and the one bold move.
2. **build** — implement the plan. Do not invent palette or type while coding; if the plan is wrong, stop and revise the plan.
3. **critique** — score against `reference/critique.md` and answer the question that kills generic design: *would I arrive here for any similar page?*
4. **audit** — run `reference/audit.md` for the platform. Report `file:line`.
5. **fix once** — apply everything that is not a taste dispute. One round.
6. **verify** — `reference/verify.md`. Probe first: can you actually see an image? Sighted agents look at 1440 and 390; blind agents run `scripts/shot.mjs --full --deep` and read the numbers. Both report which one they were.
7. **report** — the delivery contract below.

Never skip verification because it is inconvenient, and never simulate it. If there is no browser and no image tool, say "unverified" in the contract and name what you could not check.

## Command detail

### shape

Input: a brief, a repo, or a request. Output: a plan, plus PRODUCT.md/DESIGN.md when earned.

1. **Anchor in the subject.** What is this thing, physically? A bakery, a database tool, a bus schedule. Extract three concrete signals: material, vocabulary, and one artefact of the trade. These become texture, not decoration.
2. **Choose one direction** from `reference/styles.md` — or a named hybrid. Write one sentence of *why this direction and not the neighboring one*. Load `reference/fonts.md` and `reference/palettes.md` and pick from restrained sets; do not generate a palette from scratch unless the brand demands it.
3. **Name the one bold move.** The single place where this page is allowed to be surprising. Everything else obeys the grid.
4. **Choose the chromatic strategy before the colours** — paper, white room, saturated field, dark first, mono ramp, duotone, or brutalist contrast (`reference/palettes.md`). Then write the palette as 4–6 named hex values with roles (surface, ink, muted, accent, accent-ink), not twelve tokens. If the project already has a palette, reuse it and say so; if the last surface you built used paper, this one does not get to use paper again.
5. **Write the type scale** as roles: display, heading, body, label, data. One family, or two with a clear split (display vs text). Sizes from a ratio, measure ≤ 80 characters.
6. **Sketch the layout in ASCII** — three to five blocks, with the alignment logic and the reading path. Cheap, fast, exposes the empty middle column before you write CSS.
7. **List the states in scope** for this surface.
8. **Self-check before coding:** close the plan, and ask *would I arrive at this same plan for a different product in the same category?* If yes, the plan is a template. Return to step 2.

Stop here and show the plan when the surface is large, the brand is contested, or the user asked to see it. Otherwise continue into `build`.

### build

1. Re-read `DESIGN.md`; treat it as law.
2. Build structure first: semantic HTML / widget tree, real content, no placeholder lorem.
3. Then the visual layer: surfaces, type, spacing from the unit, borders and shadows from the policy.
4. Then states, in this order: empty → loading → error → success → disabled.
5. Then the platform layer (`reference/web.md` / `reference/flutter.md`): focus rings, keyboard, semantics, tap targets, safe areas, reduced motion, theme variants.
6. Reject your own first instinct once: after the first pass renders, name the two most "default-looking" elements and either justify or replace them.
7. If the surface carries numbers, build with `reference/data.md` open, not as a later polish: column alignment and units, reconciliation between views, and a stated reference for every chart.

Rules of thumb that survive both platforms:

- Spacing from one unit (`4px` or `4dp`), not from vibes. Section rhythm repeats.
- Alignment is the cheapest quality signal: left edges of text, numbers, and icons share a line.
- Optical corrections are allowed (overline padding, glyph sidebearing) but must be commented.
- Numbers use tabular figures in tables and timers.
- Shadows only where elevation is real (menus, sheets, dragged items). Static cards get borders.
- Motion: entrance under 300ms, ease-out; exits faster; nothing loops unless it signals life/activity.

### critique

Load `reference/critique.md`. Score 0–10 per axis, then answer the killer question.

Output: overall verdict, the axes below 7 with the *reason*, the single change with the highest leverage, and what is already good (so a fix round does not flatten it).

Do not soften. "Looks nice" is not a finding.

### audit

Load `reference/audit.md` for the platform. Emit terse findings grouped by file: `path:line — rule violated — fix`. Zero findings is a valid result; say what you checked.

Cover at minimum: contrast and focus visibility, label/name on every control, keyboard and screen-reader path, hit targets, overflow at 320px/text scale, images with dimensions, no layout thrash, URL/state sync where relevant, destructive-action confirmation, `prefers-reduced-motion`.

### polish

The pass that separates crafted from merely correct. Work the list in order, stop when the surface is consistent:

1. Vertical rhythm — equal gaps within groups, larger gaps between groups, one exception maximum.
2. Alignment — text baselines, trailing numbers right-aligned, icons optically centered.
3. Type — measure, line-height for the size, no widow headings, real quotation marks, no ALL-CAPS body.
4. Color — accent used sparingly and consistently; muted text still passes contrast; dark mode is coherent, not inverted.
5. Icons — one family, one stroke weight, one size set.
6. Copy — active voice, buttons say what happens, errors state cause and remedy, empties invite an action.
7. Chrome — focus rings, hover, active, disabled states distinguishable.

### harden

Walk `reference/audit.md`'s state table against the built surface and fix, in order of likelihood of shipping broken: long content, missing data, small viewport, slow network, permissions, locale, keyboard-only, zoom, destructive actions.

Anything that cannot be fixed now gets reported, not hidden.

## Delivery contract

Every UI delivery ends with this block, verbatim shape:

```
Decided:        <one line: direction + palette name + type roles>
Verified:       <what you actually checked — render? widths? contrast? keyboard?>
Not verified:   <what you could not check, and why>
Known gaps:     <states/screens deliberately out of scope>
```

An empty "Not verified" is suspicious. If you did not open the render, it is not empty.

## Failure modes

| Shortcut | Why it fails | Do instead |
| --- | --- | --- |
| "I'll pick colors while implementing" | The palette becomes whatever the first component needed | Write 4–6 named hex values in `shape` |
| Reaching for a dark hero + gradient + glass cards | It is the current default kit; it says nothing about the product | Anchor the surface in the subject's material |
| Adding a second accent "for hierarchy" | Two accents means no accent | Hierarchy from scale, weight, and space |
| Skipping states because "the API isn't ready" | Empty and error states define the layout | Design them with fake data now |
| "The screenshot doesn't matter, the code is clean" | Users see pixels, not code | Look at the render, or say you didn't |
| "The layout feels balanced" with no image tool | That sentence is fabricated evidence | Probe your capability, then run the measuring path |
| Making everything bold to avoid flatness | Uniform boldness is flatness | One bold move, restraint elsewhere |
| Copy-pasting the plan for the next screen | Consistent-looking, context-free | Re-derive from PRODUCT.md, keep DESIGN.md |
| Decorating with the subject's vocabulary (fake circuit traces, fake coffee rings) | Reads as costume | Use material, type, and color as the signal |

## References

| File | Contents |
| --- | --- |
| `reference/web.md` | CSS/HTML/Tailwind/React implementation rules, a11y, perf, forms, dark mode |
| `reference/flutter.md` | ThemeData/ColorScheme/TextTheme, semantics, layout, platform idioms, testing |
| `reference/documents.md` | PRODUCT.md / DESIGN.md templates, extraction from existing code |
| `reference/styles.md` | 12 directions: when to use, when not to, signatures |
| `reference/fonts.md` | Pairings with fallbacks, per-direction character |
| `reference/palettes.md` | Named palettes by product type, with roles |
| `reference/anti-patterns.md` | The rejection list, web + Flutter specific |
| `reference/critique.md` | Rubric, axes, killer questions |
| `reference/data.md` | Tables, charts, KPI tiles, dashboards, dense-tool primitives — the professional-surface floor |
| `reference/audit.md` | Mechanical checklist per platform |
| `reference/verify.md` | Sighted vs blind verification paths, `scripts/shot.mjs` usage, what each may claim |
| `reference/craft-floor.md` | The floor: pass/fail items before delivery |
| `reference/typeset.md` | Scale, measure, hierarchy, numerals |
| `reference/color.md` | Color systems, contrast, dark mode, accents |
| `reference/layout.md` | Grids, breakpoints, spacing, density |
| `reference/motion.md` | Durations, easing, choreography, reduced motion |
| `eval/PROTOCOL.md` | How this skill is validated A/B against a blind judge |
