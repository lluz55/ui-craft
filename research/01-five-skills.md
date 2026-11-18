# The five skills this one learned from

Read in full (SKILL.md and, where present, the references), 2025-11. Not summaries from blog posts — the actual files, at the URLs below.

## 1. Anthropic — `frontend-design`

`https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md` · ~9.4 KB · single file, no scripts, no references.

**Mechanism.** A studio design lead persona with a point of view. Grounds every decision in the *subject*: industry, material, vernacular. Two-pass process: write the plan (4–6 named hex values, type roles, ASCII wireframes, alignment logic, principles), review the plan with one question — "would I arrive here for any similar page?" — then code.

**Strongest idea.** A catalog of *tells*: cream `#F4F1EA` + display serif + terracotta `#D97757`; near-black + acid green; broadsheet hairline + zero radius; the SaaS-card kit (identical cards, one radius, `rgba(0,0,0,.1)` shadow); template chrome (ALL-CAPS eyebrow, "A · B · C", "WORD — fragment", monospace labels, "→" on every link). Naming the tells makes them avoidable. Also: boldness in exactly one place (the Chanel rule), typographic scale from *Elements of Typographic Style*, <80ch measure, and copy rules (active voice, CTA says what happens, empty states invite).

**Took.** The tells catalog (→ `anti-patterns.md`), the plan-before-code shape, the substitution test, the one-bold-move rule, the copy rules.

**Rejected / left behind.** No Flutter, no native, no accessibility floor, no tokens, no durable context files. Its plan dies with the session.

## 2. AkyRayy — `Frontend-Design-SKILLS-for-AI`

`https://raw.githubusercontent.com/AkyRayy/Frontend-Design-SKILLS-for-AI/main/SKILL.md` · ~12.9 KB.

**Mechanism.** "Craft, not slop." A senior craftsman persona (references Pentagram, Linear, Stripe, Vignelli), 7 principles (restraint, typography *is* the design, one accent + neutrals, whitespace, asymmetry with intent, specificity, craft in details), a hard rejection list split into visual/structural/copy/code slop, an aesthetics table (7 directions with "use when"), and a 10-step process from brief to performance.

**Strongest idea.** The rejection list as a gate: "if it contains any of these, rejected, start over." Explicit and checkable, unlike most taste advice. And directions with a "use when" column, so the choice is contextual instead of a menu.

**Took.** The rejection-list-as-gate structure, the principle of choosing one direction and not mixing, the 10-step shape folded into `shape`/`build`.

**Rejected / left behind.** Some bans are taste dressed as rules (radius `9999px`, any gradient). Hard "rejected, start over" is wrong for a working repo with an existing design. Web-only.

## 3. `ui-ux-pro-max` — NextLevelBuilder

`https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/main/.claude/skills/ui-ux-pro-max/SKILL.md` · ~18 KB + `scripts/search.py` + CSV databases.

**Mechanism.** A searchable database behind a script: 80 styles (51 active), 192 palettes with "reasoning profiles", 74 font pairings, 120 UX rules, 105 icons, GSAP presets, chart patterns, and 22 stack guides — including Flutter, React Native, SwiftUI and Jetpack Compose. A numbered priority table (accessibility → touch → performance → style → layout → type/color → motion → forms → nav → charts), `--design-system` generation with `--tokens dtcg|css`, `--persist` writing `design-system/<project>/MASTER.md` with per-page overrides, and `--variance/--motion/--density` dials.

**Strongest idea.** The priority ordering: a hard order of concerns so that style never outranks accessibility; and the "MASTER + page override" pattern for a design system that survives across pages.

**Took.** The priority order (implicit in the workflow and the floor), the MASTER/override idea (→ `DESIGN.md` + surface brief), the query contract (one intent, 2–5 terms, verify fit, never fabricate on zero results) adapted as "pick from curated tables, never invent a palette from scratch".

**Rejected / left behind.** Taste as a database query — with 192 palettes the output becomes a menu, and a menu is how you get "generic but well-documented". Python dependency, absolute paths, and a 51-style catalog is a catalog, not a point of view. Also: no verification loop.

## 4. Vercel — `web-design-guidelines`

`https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md` (fetched live by `https://raw.githubusercontent.com/vercel-labs/web-design-guidelines/main/SKILL.md`).

**Mechanism.** A thin skill that pulls ~120 rules from a live file at run time and reports terse `file:line` findings grouped by file. Rules: aria labels, keyboard handlers, `:focus-visible`, autocomplete/inputmode, no blocked paste, inline errors focusing the first invalid field, reduced motion, no `transition: all`, curly quotes and NBSP, `text-wrap: balance`, `min-w-0`, lazy images with dimensions, virtualize >50 rows, URL reflects state, destructive confirmation, `touch-action`, safe areas, `color-scheme`, `Intl.*`, hydration, hover, and copy conventions.

**Strongest idea.** The audit is *mechanical and terse*. No prose, no taste, no "consider" — a violation list a developer can act on. Also: rules that live upstream and update without a new skill release.

**Took.** The audit format (`path:line — rule — fix`), the rule set distilled for web, and the principle that mechanical checks belong in a separate pass from aesthetic judgement.

**Rejected / left behind.** Zero aesthetics, zero structure, web only. Live-fetching rules means the eval is not reproducible (the rules can change between arms); we froze ours.

## 5. `impeccable` — pbakaus

`https://raw.githubusercontent.com/pbakaus/impeccable/main/.agents/skills/impeccable/SKILL.md` · ~12.7 KB + ~40 references + a binary + hooks.

**Mechanism.** Surface "modes" (Persuade / Operate / Read / Experience) that set the ambition of a screen. Durable context: `PRODUCT.md`, `DESIGN.md`, per-surface briefs. A `craft-floor.md` read immediately before any UI edit, a `doctor` for design drift, hooks with a design detector after edits, a routing menu when invoked with no argument, and ~20 commands (craft, shape, critique, audit, polish, bolder, quieter, distill, harden, onboard, animate, colorize, typeset, layout, delight, overdrive, clarify, adapt, optimize, live, generate, init, document, extract).

**Strongest idea.** The command surface: a skill that can be *directed* ("make it quieter", "harden this") instead of only "design something". Plus `craft-floor.md` as a last-read gate, and PRODUCT/DESIGN as the reason a third screen looks like the first.

**Took.** The durable context model (→ `documents.md`, `PRODUCT.md`/`DESIGN.md`), the craft-floor-before-delivery gate, the critique/audit split, and the command-routing menu. Our command set is deliberately smaller (6 vs ~20) — see `research/02-decisions.md`.

**Rejected / left behind.** The hook/binary/`doctor` machinery (not portable, not testable in an eval), ~40 references (the agent will not load them), and no Flutter coverage at all.

## The gap this repo fills

| | Anthropic | AkyRayy | pro-max | Vercel | impeccable | **ui-craft** |
| --- | --- | --- | --- | --- | --- | --- |
| Point of view | ✅ | ✅ | ⚠️ catalog | ❌ | ✅ | ✅ |
| Curated decision data | ⚠️ prose | ⚠️ | ✅ | ❌ | ✅ | ✅ |
| Verifiable floor | ❌ | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| Durable design context | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ |
| Web | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Flutter | ❌ | ❌ | ✅ (stack guide) | ❌ | ❌ | ✅ (first-class reference) |
| Portable (no runtime/scripts) | ✅ | ✅ | ❌ Python | ⚠️ live fetch | ❌ binary/hooks | ✅ |
| A/B eval harness | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
