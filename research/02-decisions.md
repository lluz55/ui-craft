# Decisions

Recorded from the shaping session that created this repo. Each decision has the alternative that was rejected, so a future change knows what it is reopening.

## D1 — Scope: a command suite, not a one-shot guide

**Chosen**: a suite in the Impeccable style (`shape`, `build`, `critique`, `audit`, `polish`, `harden`), routable by command.
**Rejected**: "only build" (no self-correction), "only audit" (does not create), "20 commands" (maintenance without evidence).
**Why**: the value of a UI skill is in the *second* pass. A guide that ends at the first render cannot fix what the first render always gets wrong.

## D2 — Six commands, four refs

**Chosen**: 6 core commands + 4 refinement references loaded on demand (`typeset`, `color`, `layout`, `motion`).
**Rejected**: 20 commands (more surface than any model will exercise; every command is a file that drifts).
**Why**: commands are verbs the user can say; refinements are adjectives the build/polish steps load. The cut follows the verbs people actually say.

## D3 — One skill, two platform references

**Chosen**: one `SKILL.md` spine + `reference/web.md` + `reference/flutter.md`, stack detected from `pubspec.yaml` / `package.json`.
**Rejected**: two separate skills (doubles the taste layer and the eval), Flutter as an appendix (SKILL.md bloats, Flutter stays second-class).
**Why**: the design judgement is platform-independent; only the implementation vocabulary differs. Splitting at the taste layer would produce two different products from the same brief.

## D4 — Curated markdown tables, no database

**Chosen**: `styles.md`, `fonts.md`, `palettes.md` as curated tables with "use when / not when".
**Rejected**: a searchable database + script (ui-ux-pro-max), pure prose (Anthropic).
**Why**: a menu of 80 styles produces generic output; a table of 12 with reasons forces a decision. No Python, no paths, works in any harness, and a human can audit it.

## D5 — Durable context: PRODUCT.md + DESIGN.md

**Chosen**: both files, plus a surface brief, written on first run or when a surface exceeds one screen.
**Rejected**: "plan lives in the turn" (nothing survives the session), "DESIGN.md only" (no product truth to test the design against).
**Why**: coherence across screens and sessions is the most common real-world failure. The eval would otherwise measure single pages forever.

## D6 — One mandatory look, then one fix round

**Chosen**: look at the render (two widths, or one device + text scale), fix what one look reveals, deliver; if no render is possible, say so.
**Rejected**: static-only audit (misses what only the render shows), multi-pass loop until perfect (cost, and models rarely converge), blind-subagent gate as the only check.
**Why**: the failure mode is "confident without looking", not "looked too little". One real look plus a truthful report is the highest-value cut. The eval adds a blind judge on top, which is where multi-pass rigour belongs.

## D7 — Eval inherited from skill_factore

**Chosen**: frozen tasks, A/B in clean contexts, blind judge on screenshots, `quality_gap` applied via `KEY.txt`, threshold `improvement_magnitude >= 7.0`, rounds in `runs/`.
**Rejected**: no eval, leaderboard-style scoring, judge that knows the arms.
**Why**: the score must reflect pixels a user sees. A judge that knows which arm used the skill will reward the skill, not the result.

## D8 — Name and packaging

**Chosen**: `ui-craft`; MIT license, no attribution file; public from day one; repo at `github.com/lluz55/ui-craft`.
**Rejected**: `frontend-design` (search collides with the Anthropic skill), CC BY (awkward for code examples), private-until-validated.
**Why**: "craft" carries the thesis (skill over defaults) and does not claim a stack.

## Open questions

- The Flutter arm has no toolchain in the current environment: the eval measures Flutter code, not rendered Flutter. A golden-test-based arm would close this.
- The baseline (no skill) is competent at plain HTML+CSS; the headroom is mostly in states, accessibility, and subject fit. `10 − score_A` therefore bounds the obtainable gap, as documented in `eval/PROTOCOL.md`.
- A second judge with a different model family would reduce single-opinion risk. Not implemented.
