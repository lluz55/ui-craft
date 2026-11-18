# Critique rubric

Score each axis 0–10. A 7 is "professional and unremarkable" — it passes the floor and fails the point. Reserve 9–10 for work you would show as an example.

Do not average away a failure: one axis at 3 sinks the surface regardless of the total.

## The three lenses

1. **Squint test.** Blur your eyes (or the screenshot). Is there a readable hierarchy of three levels? Is there one focal point? If everything has the same weight, hierarchy fails.
2. **3-second test.** Looking for three seconds: what is this, who is it for, what do I do next? If any answer is missing, copy or layout fails.
3. **Substitution test.** *Would I arrive at this same design for any other product in this category?* If yes, the design is a template. This is the question that separates craft from competence.

## Axes

| # | Axis | 0–4 | 7 | 10 |
| --- | --- | --- | --- | --- |
| 1 | **Subject fit** | Generic; could be any product in the category | Recognizable category, hints of the specific product | The design could only belong to this product |
| 2 | **Hierarchy** | Everything competes; no idea what to read first | Clear primary/secondary | A deliberate path; the eye is led |
| 3 | **Typography** | One size, weak measure, awkward line breaks | Correct scale and measure | Type carries the personality; details are right (quotes, numerals, hanging punctuation) |
| 4 | **Color** | Default kit or too many accents | Coherent palette, contrast OK | Color means something; accent used with restraint and precision |
| 5 | **Layout & alignment** | Floating blocks, uneven gaps, orphan elements | Grid holds; edge alignment consistent | Asymmetry with intent; negative space does work |
| 6 | **Completeness of states** | Happy path only | Empty/loading/error exist | Edge cases are designed, not patched (long text, no data, offline) |
| 7 | **Platform craft** | Broken focus, missing labels, overflow, no reduced motion | Floor passed (see `audit.md`) | Platform idioms used well; feels native on both web and Flutter |
| 8 | **Copy** | Placeholder or marketing filler | Clear, active, specific | The words are part of the design; errors and empties do work |

## Verdict bands

| Total (avg) | Verdict |
| --- | --- |
| ≥ 8.5 and no axis < 7 | Ship it — this is the reference |
| 7.0–8.4 | Ship after the named fixes |
| 5.0–6.9 | Rework: direction is not established yet |
| < 5.0 | Not designed — restart from `shape` |

## Output format

```
VERDICT: <band> — <one sentence>

Scores
  1 Subject fit      8  <one line of evidence>
  2 Hierarchy        6  <...>
  ...

Killer question: <answer to the substitution test, honestly>

Highest-leverage fix: <the single change that raises the most axes>
Second:               <...>

Keep: <2 things that work and must survive a fix round>

Findings
  - <element/file:line> — <what is wrong> — <what to do>
  ...
```

## Rules of evidence

- A finding names an element, a file:line, or a visible region. "The spacing feels off" is not a finding; "card grid uses 24px gutter while section gap is 20px — unify to 24" is.
- Say what would have to be true for the current choice to be right. Sometimes it is: a dark hero for a nightlife brand is not a slop gradient.
- Never list more than 5 findings. More than that is a rework, not a critique — say so.
- Do not soften with "consider" or "you might want to". Either it is a defect or it is a preference; label preferences as such.

## Common misreads

| Looks like | Actually |
| --- | --- |
| Bold but chaotic | Missing hierarchy, not excessive boldness |
| Minimal but empty | Missing content design, not too much whitespace |
| Colorful but amateur | More than one accent, or accents at the wrong value |
| Conventional but good | A template — check the substitution test |
| Inconsistent but charming | Two directions fighting; pick one |

## Self-critique with a screenshot

When you can see the render:

1. Look at it at 100% for 5 seconds, then describe in one sentence what you see (not what you intended).
2. Cover the copy: does the layout still communicate structure?
3. Find the two most "default-looking" elements. Justify each or replace one.
4. Check the three worst-case zones: the longest string, the emptiest area, the smallest viewport.
5. Note the first thing that made you wince. That is finding #1.
