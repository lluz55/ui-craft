# demo-4 — neutral rebuild

Three briefs (T1 bakery, T4 club, T5 collections console) rebuilt by context-free agents that were
told to read **only** `SKILL.md` and their frozen brief, and explicitly forbidden from reading
`runs/` — previous outputs would have leaked the palette the skill was just fixed to stop repeating.

Run to test one thing: after `reference/palettes.md` gained a strategy-first table (7 strategies,
25 palettes), do unrelated briefs still land on the same colour family?

Measured on the surfaces (hue / saturation / lightness):

| arm | surface | hue | sat | light |
| --- | --- | --- | --- | --- |
| bakery | `#F5E9C8` butter field | 44° | 69% | 87% |
| club | `#F1F2EC` chalk | 70° | 19% | 94% |
| mesa | `#EEF0EC` grey-green | 90° | 12% | 93% |

Before the rewrite, six surfaces sat at 40–53° / 26–48% / 89–93%. Hue and chroma spread out; **value
did not** — all three are still pale planes. That finding is now repetition rule 4 in
`reference/palettes.md`.

Font files are excluded from the archive (≈8 MB of OFL Fira Sans/Fira Condensed/Fira Mono pulled from
the local Nix store). The HTML declares them via `@font-face`; without the files it falls back to the
system stack. Screenshots here were rendered with the fonts in place.
