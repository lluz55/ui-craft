# ui-craft

A skill for designing and building frontend interfaces — web and Flutter — with a point of view, a durable design system, and a floor you can verify.

It exists because two failure modes are everywhere: the **generic** result (Inter, `#6366F1`, `rounded-lg`, three identical cards, "Empower your workflow") and the **incoherent** one (five fonts, four accents, motion because motion is fun). Neither is a taste problem you can argue away; both are decision problems, and decisions can be forced.

```
shape ──▶ build ──▶ critique + audit ──▶ fix once ──▶ report
```

## What it does

| Command | Use when |
| --- | --- |
| `shape` | Before code: anchor in the subject, pick a direction, write the plan (and `PRODUCT.md` / `DESIGN.md`) |
| `build` | Implement the plan |
| `critique` | Score against a rubric; answer "could this be any product in this category?" |
| `audit` | Mechanical floor: a11y, states, responsive, platform idioms — `file:line` findings |
| `polish` | Rhythm, alignment, type, color, icons, copy |
| `harden` | Long text, no data, 320px, 200% zoom, offline, destructive actions, i18n |

Four refinement references load on demand: `typeset`, `color`, `layout`, `motion`.

Platform is detected from the project (`pubspec.yaml` → Flutter, `package.json` → web), and the spine is shared — the design judgement does not change because the renderer did.

## Why not just use one of the five great existing skills

Each of them is strong at one layer, and none covers web + Flutter with one design spine:

- **Anthropic `frontend-design`** — best point of view and the best catalog of tells; no floor, no tokens, no Flutter.
- **AkyRayy `Frontend-Design-SKILLS-for-AI`** — best rejection gate; web only, and some bans are taste.
- **`ui-ux-pro-max`** — best decision data (80 styles, 192 palettes); a menu where a decision should be, Python required.
- **Vercel `web-design-guidelines`** — best mechanical audit; zero aesthetics, web only.
- **`impeccable`** — best command surface and durable context; heavy machinery, no Flutter.

The comparison and what was taken from each: [`research/01-five-skills.md`](research/01-five-skills.md). The decisions (and what was rejected): [`research/02-decisions.md`](research/02-decisions.md).

## Install

As a skill for an agent harness that reads `SKILL.md` (DeepSeek Harness, Claude Code, Codex-style skill directories):

```bash
git clone https://github.com/lluz55/ui-craft.git
ln -s "$(pwd)/ui-craft" ~/.dsh/skills/ui-craft     # or copy it into .dsh/skills/
```

Or drop `SKILL.md` + `reference/` into an existing skills directory — no runtime, no scripts, no absolute paths.

## Usage

```
ui-craft                       # prints the command menu
ui-craft shape                 # plan a surface
ui-craft build                 # implement
ui-craft critique              # judge the result
ui-craft audit                 # find floor violations
ui-craft polish
ui-craft harden
```

The skill also fires without an explicit command when a task involves designing, redesigning, or reviewing a UI.

## Structure

```
SKILL.md                  the spine: router, non-negotiables, workflow, delivery contract
reference/
  web.md                  HTML/CSS/React/Tailwind: semantics, a11y, forms, perf, theme
  flutter.md              ThemeData/ColorScheme/TextTheme, LayoutBuilder, Semantics, platform idioms
  documents.md            PRODUCT.md / DESIGN.md / surface brief templates + extraction
  styles.md               12 directions: signature, use when, not when, bold move, watch out
  fonts.md                pairings with fallbacks + per-direction shortcuts
  palettes.md             named palettes by product type, with roles and contrast rules
  anti-patterns.md        the rejection list (web + Flutter)
  critique.md             the rubric, the three lenses, evidence rules
  data.md                 tables, charts, KPI tiles, dashboards, dense-tool floor
  audit.md                mechanical checks, per platform, `file:line` output
  craft-floor.md          the pass/fail gate read before delivering
  verify.md               sighted vs blind verification, and what each may claim
  typeset.md color.md layout.md motion.md    refinements loaded on demand
eval/
  PROTOCOL.md             frozen tasks, A/B arms, blind judge, direction, threshold
  JUDGE.md                the judge's rubric and output contract
  tasks/                  T1-brand, T2-product, T3-flutter, T4-ops
research/                 the five source skills, what was taken, what was rejected, decisions
scripts/shot.mjs          zero-dependency render + screenshot + layout audit (CDP)
scripts/shot.sh           minimal chromium screenshot helper (no metrics)
runs/                     one directory per eval round (A, B, judge, KEY.txt, verdict.md)
```

## Evaluation

The skill is validated, not asserted. Four frozen tasks (a bakery subscription page, a fleet telemetry dashboard, a club-management hub, a Flutter savings screen) are built twice in clean contexts — with and without the skill — and a blind judge scores the screenshots and code without knowing which arm used the skill. The orchestrator applies direction with `KEY.txt`.

Pass threshold: `improvement_magnitude >= 7.0`.

Details and known instrument limitations: [`eval/PROTOCOL.md`](eval/PROTOCOL.md). Rounds live in `runs/`.

## Status

Early. The spine and references are written. One blind smoke test is committed under `runs/demo-1/` (a context-free agent built T1 from the skill alone): zero horizontal overflow at 1440/390, zero contrast failures, every declared font loaded, and a delivery contract that states honestly what it could not see. The formal A/B round is next.

Note on verification: the skill now has two paths, because not every model can look at a screenshot. `reference/verify.md` makes the agent probe its own capability first — sighted agents look, blind agents measure with `scripts/shot.mjs --deep` and say so. Neither is allowed to fake the other.

Practically: if the model running the skill accepts images, you get the visual loop. If it does not, you get geometry and computed contrast instead of invented adjectives.

Issues and counter-examples welcome — especially Flutter surfaces, where the toolchain gap makes the eval weaker than the web one.

## License

MIT
