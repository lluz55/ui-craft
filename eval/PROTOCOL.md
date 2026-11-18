# Eval protocol — ui-craft

Frozen across rounds. **Only the skill changes between rounds**; this file, the tasks, and the judge rubric do not.

The instrument is inherited from the `skill_factore` eval (A/B in clean contexts + blind judge + direction applied by the orchestrator). What changed is what it measures: interfaces instead of reports.

## Why this shape

A UI skill can be "improved" by making the baseline worse (more words, more rules that inflate effort) or by luck with one task. Five frozen tasks — a marketing page, a data-dense operating tool, a dashboard, a three-surface back-office console and a Flutter screen — and a blind judge on rendered screenshots force the gain to show up in the pixels.

## The six frozen tasks

| ID | Task | What it stresses |
| --- | --- | --- |
| `T1-brand` | Marketing page for a small sourdough bakery subscription (PT-BR copy) | Subject anchoring, art direction, copy, one bold move, responsive |
| `T2-product` | Fleet telemetry dashboard, light + dark | Dense data, states, tables, hierarchy, platform craft |
| `T3-flutter` | Goal-saving app screen in Flutter with empty/loading/error | Platform idioms, theme discipline, text scale, semantics |
| `T4-ops` | Club-management hub (Football Manager-like) with squad and standings tables plus data reads | Dense tables, chart discipline, numbers that reconcile, light+dark roles |
| `T5-mesa` | Three-surface collections console (queue, contract with agreement simulator, printable A4 letter) | Cross-screen arithmetic, dirty source data surfaced not fixed, print stylesheet, keyboard-first, 320px with no horizontal scroll |
| `T6-mare` | Boutique inn landing page with five supplied photographs and a booking form | Using real imagery (art direction, crops, srcset, scrim), exactly one motion moment, reduced motion, mobile-first |

Full briefs: `eval/tasks/`. Identical text in both arms, every round.

## Arm A — baseline (no skill)

Clean-context agent. Given ONLY the task brief plus:

> Build it. Write the deliverable to `<run-dir>/A/`. Include screenshots where the brief asks for them.

No mention of method, structure, palette, or quality bar.

## Arm B — treatment (with skill)

Clean-context agent, fresh context. Given ONLY:

> Read and follow the skill at `<repo>/SKILL.md` (load it fully first, then the references it tells you to load). Then build the task below. Write the deliverable to `<run-dir>/B/`.

Plus the same brief, verbatim.

Both arms get the same tools, the same time budget (stated per round), and the same working directory shape. Neither arm sees the other's output. Neither arm knows it is in an eval.

## Deliverables per arm

- Web tasks: `index.html` + `styles.css` (+ `app.js` if needed), no build step, no external network except the fonts declared in the file; screenshots `shot-1440.png`, `shot-390.png` produced by headless Chromium.
- `T4-ops` additionally: `PLAN.md`, and screenshots at `shot-1440.png` and `shot-1024.png`.
- `T6-mare` additionally: its five source photographs copied into `images/`, and `PLAN.md`.
- Flutter task: the screen as `lib/` + `pubspec.yaml`, plus a rendered screenshot if the toolchain exists; if not, a widget test asserting the three states plus a hand-built spec note. Missing toolchain is recorded, not faked.

## Judge — blind, screenshots first

The judge is a clean-context agent. It receives:

- the task brief;
- `A/` and `B/` (anonymous letter assignment, randomized per round, recorded in `KEY.txt` by the orchestrator);
- the screenshots, in random order;
- the rubric (`JUDGE.md`).

It must NOT be told which arm used the skill, and it must not read `KEY.txt`, `PROTOCOL.md`, or the repo.

Output, exactly:

```
better_file: a | b | tie
quality_gap: <0-10, anchored>
scores: A: <axis table>  B: <axis table>
why: <3-6 bullets tying the gap to visible evidence>
defects_in_treatment: <top 5 specific defects in B's approach, not in B's execution luck>
```

Anchors for `quality_gap`:

| Score | Meaning |
| --- | --- |
| 0–2 | indistinguishable, or B is worse |
| 3–4 | cosmetic differences, same substance |
| 5–6 | one clear axis better (e.g. type, states), the heavy axes unchanged |
| 7–8 | a user would perceive B as a different class of product; the gain is in structure, hierarchy, and completeness, not only polish |
| 9–10 | B solves what A could not (real states, real accessibility, coherent system) while A fails the floor |

## Direction (orchestrator only)

1. Judge reports `better_file` and `quality_gap`.
2. Orchestrator reads `runs/round-N/KEY.txt`:
   - `better_file` == treatment → `improvement_magnitude = +quality_gap`
   - `better_file` == baseline → `improvement_magnitude = −quality_gap`
   - tie → 0.
3. **Pass: `improvement_magnitude >= 7.0`.**

## On failure

The judge's `defects_in_treatment` becomes the change list for the next round. Only the skill is edited. If a defect is unfixable by wording (e.g. "the model cannot render Flutter"), record it as an instrument limitation instead of tuning the rubric.

## Instrument limitations, stated not hidden

- With a competent baseline, `10 − score_A` bounds the absolute headroom; 7.0+ requires either a weak baseline or a treatment that answers questions the baseline could not pose. Reported with every verdict.
- Screenshot judging measures the first screen well and deeper states poorly; the code is provided for the judge to check what the screenshot cannot show.
- Font loading differences between arms are a confounder; both arms may use the same declared font files when available offline.
- One judge is one opinion. A round that passes at 7.2 is "no regression", not proof.
- **Capability asymmetry is a confounder, not a skill bug.** An arm whose model cannot accept image input cannot perform the visual look; it verifies by measurement (`reference/verify.md`, path B) and must say so in its delivery contract. Record each arm's capability in `KEY.txt` before judging, so a weaker verification path is not later read as a weaker design. The judge still receives the PNGs — someone has to see them, even when the builder could not.
- If the *judge* model is itself blind, the round is invalid for visual scoring: use a sighted judge, or score only the code-level and measured axes and say so in `verdict.md`.

## Rounds

`runs/round-N/{A,B,judge,KEY.txt,verdict.md}`. The repo keeps every round. `verdict.md` copies the judge output plus the orchestrator's arithmetic and the resulting pass/fail.
