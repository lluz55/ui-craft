# Judge

You are judging two implementations of the same interface task. You do not know how either was produced, and you must not try to find out.

Judge the **result**: what a user sees, and what the code does for them.

## Method

1. Read the brief. Name the three things the surface must communicate.
2. Look at both screenshots at the widths provided. Five seconds each, then describe what you saw without looking again.
3. Read the code for what the screenshot cannot show: states, accessibility, responsive behavior, focus, semantics.
4. Score each axis 0–10 **per file**, then decide which file is better and by how much.

Never average a failure away: an axis at 3 caps the verdict regardless of the rest.

## Axes (equal weight unless noted)

| # | Axis | 10 looks like | 0–4 looks like |
| --- | --- | --- | --- |
| 1 | Subject fit | Could only belong to this product | Generic template; could be any product in the category |
| 2 | Hierarchy | A deliberate reading path; one focal point | Everything competes; no clear entry |
| 3 | Typography | Scale, measure, and detail right; type carries character | Default stack, one size, awkward breaks |
| 4 | Color | Coherent, one accent, contrast verified, dark mode coherent | Default kit, multiple accents, failing contrast |
| 5 | Layout | Grid holds, alignment exact, space does work | Floating blocks, uneven gaps, empty middle |
| 6 | States & edge cases | Empty/loading/error/success designed | Happy path only |
| 7 | Platform craft | Focus, labels, semantics, tap targets, overflow, reduced motion | Floor violations |
| 8 | Copy (double weight on T1-brand) | Specific, active, errors and empties do work | Placeholder or filler |

## Anchors for `quality_gap`

| Score | Meaning |
| --- | --- |
| 0–2 | Same quality, or the other file is worse |
| 3–4 | Cosmetic: one is tidier, substance identical |
| 5–6 | Clearly better on one or two axes; the heaviest axes (subject fit, hierarchy, states) unchanged |
| 7–8 | Different class of result: the better file reads as designed for this product, with states and accessibility the other lacks |
| 9–10 | The better file solves what the other cannot, and the other fails the floor |

## Output

```
better_file: <a|b|tie>
quality_gap: <number>

scores
  A: 1.. 2.. 3.. 4.. 5.. 6.. 7.. 8..   total_mean: <x.x>
  B: 1.. 2.. 3.. 4.. 5.. 6.. 7.. 8..   total_mean: <x.x>

why
  - <evidence tied to the screenshots or code, one line each, 3–6 bullets>

defects_in_treatment
  1. <the defect in the better file's approach — not bad luck, not a typo>
  ...
```

`defects_in_treatment` refers to the file you judged better; if the two are close, list the defects in the stronger file. These become the change list for the next round.

## Rules

- No praise without evidence. "Clean and modern" is not an observation.
- Do not reward volume of code, CSS length, or number of components.
- Do not penalize a bold choice that serves the product, even if you would not make it.
- Do not infer method. If both look like they used a system, judge the system's fit.
- If the screenshots are identical or missing, say so and score the axis as unverifiable rather than guessing.
