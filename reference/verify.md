# Verify — two paths, one honesty rule

The last step of every build is checking the result. **How** you check depends on what you
are, not on what you would like to be. Find that out first.

## Step 0 — Probe your own eyes

Try to read one image file (your own screenshot, once you have one). Then classify yourself:

| Result | You are | Path |
| --- | --- | --- |
| The image comes back and you can describe it | **Sighted** | A — Look |
| The tool refuses: *"model does not declare image input"* | **Blind** | B — Measure |
| No image tool at all, but you can run a browser | **Blind** | B — Measure |
| No browser, no image tool | **Blind, unrendered** | B, degraded |

Write the result down. It goes in the delivery contract either way, and it never changes
mid-task: an agent that discovers it is blind after writing "the layout feels balanced" has
already lied.

The honesty rule overrides everything below: **a claim of visual judgement you cannot make
is a defect worse than the defect you skipped.** Skipping the look is fine. Inventing it is not.

## Path A — Sighted: look at the render

1. Render at two widths: **1440** and **390** (Flutter: one device size plus text scale 1.3).
2. Look at the **full page**, not the hero. The hero is the part everyone gets right.
3. Run the three lenses from `reference/critique.md`: squint test, three-second test,
   substitution test.
4. Name what is wrong in one sentence each. If you cannot, it is taste, not a defect —
   leave it alone.
5. Fix **once**. Re-look once at the two widths to confirm the fixes did not break anything.

The measurement pass is still worth running on Path A — eyes forgive 18 px tap targets,
4.1:1 contrast and 40 px of clipped text. Numbers catch what eyes rationalize.

## Path B — Blind: measure instead of guessing

You may not write "looks good", "feels balanced", "clean and modern". You may write numbers.
The substitute for the eye is geometry, computed color, and structure.

```bash
# full page + deep audit, once per width
node scripts/shot.mjs page.html shot-1440.png 1440 900 --full --deep
node scripts/shot.mjs page.html shot-390.png   390 844 --full --deep
```

Zero dependencies: headless Chromium over the DevTools protocol, using Node's built-in
WebSocket (Node ≥ 22). Exit code `2` means horizontal overflow.

Read the JSON as a checklist, not as a score:

| Field | What it proves | Fail |
| --- | --- | --- |
| `overflowX` | nothing wider than the screen | `> 0` — blocking |
| `offenders` | which element is guilty | any entry |
| `clipped` | text cut by its own box | any entry |
| `small` | tap targets a thumb can hit | anything under 24×24 (aim 44×44) |
| `headings` | outline order, one `h1`, no skips | skips, two `h1` |
| `focusables` | keyboard order starts sensibly, every control reachable | control missing |
| `fonts` / `fontStatus` | declared faces actually loaded | `:error`, `fontStatus !== "loaded"` |
| `contrastFails` | computed ratio over the real hex, inheritance resolved | any entry |
| `scrollHeight` | page length vs the plan | wildly off = broken spacing |
| `images` / `imageFlags` | alt text, aspect ratio, dimensions, broken sources | `alt: "MISSING"`, `stretched: true`, `broken: true`, `attrs: "none"` |
| `motion` / `motionIssues` | what animates, for how long, whether it loops | `transition-all`, `infinite`, `off-token-duration` |
| `reducedMotionDeclared` | a `prefers-reduced-motion` block exists | `false` with motion present |

**A finding is a hypothesis, not a verdict.** The tool does not know your design. Two
false-positive classes we hit on the first real run: radio and checkbox inputs, whose real target
is the wrapping `<label>` (the circle is 18 px, the label is 44), and `.sr-only` text, which is
clipped to 1 px on purpose. Confirm the effective target — or the intent — before changing
anything. A measuring path that cries wolf gets ignored, and then you have no measuring path.

Then reason about what the numbers **cannot** cover, and say so:

- hierarchy and rhythm (is the eye led in the right order?),
- atmosphere (does it feel like the subject?),
- whether the direction reads at all.

Substitutes for the eye, in descending usefulness:

1. **Read the DOM as a wireframe.** Print the element tree with sizes (`--deep` gives you
   headings and focus order). A page whose reading path is wrong is visible in the order.
2. **Read it aloud.** Copy that sounds like a growth team survives every measurement.
3. **Count the decisions.** How many distinct type sizes, colors, spacings, and border radii
   are actually in the CSS? More than the plan declared means drift, with or without eyes.
4. **The substitution test on paper.** Would this exact structure serve another business in
   the same category? If yes, it is a template.

## What each path may claim in the report

```
Decided:  ...                                    # both paths
Verified: look 1440 + 390: fixed X, Y            # Path A only
Verified: overflow 0 at 1440/390/320; contrast  # Path B
          6.1–15.5:1 over real hex; fonts loaded;
          no clipped text; no tap target < 44px
Not verified: rhythm, hierarchy, atmosphere —   # Path B always
          no visual confirmation was possible
```

Path B never writes "the design looks correct". It writes what it measured, and it names the
gap in the same breath. That gap is not a failure of the work; it is the truthful boundary of
the evidence.

## Limits of the measuring path

- It measures the **initial** render: hover, focus-visible, `:user-invalid`, open menus and
  loading states are not captured unless you drive them explicitly.
- Animations are captured at t≈0.
- Fonts need ~1 s; the script waits 900 ms, so a slow local font can still read `:loading`.
- It says nothing about whether the thing is *beautiful*. It only says whether it is
  *broken*. Never trade one for the other.
- Screenshots are for humans and for judges: still produce them, even blind. Someone else
  can see what you cannot.
