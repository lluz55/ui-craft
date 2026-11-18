# REPORT — Atlético Boa Vista, central do futebol profissional

Brief: T4-ops (`/home/lluz/dev/ui-craft/eval/tasks/T4-ops.md`). Deliverable:
`runs/demo-4/club/`. Page language pt-BR. Static HTML + CSS, one small vanilla
script, fonts local (6 TTFs in `fonts/`, copied from the permitted source).

## What was built

| File | Role |
| --- | --- |
| `PLAN.md` | Direction, palette, type roles, ASCII layout, bold move, states — written before code |
| `index.html` | The page; all content, no framework, no CDN, no network calls (grep for `http` returns nothing) |
| `styles.css` | Tokens, layout, components, dark remap, responsive |
| `app.js` | Sorting, filtering, data states, inbox read/expand, theme, announcements; `node --check` passes |
| `shot-1440.png`, `shot-1440-dark.png`, `shot-1024.png` | Blind-path renders |
| `shot-state-error.png`, `shot-state-loading.png` | Renders of the two data states (cloned markup with the state block visible) |

Content: identity band (crest SVG, name, Série B, rodada 34 de 38, 5º, 54 pts),
next match with availability (2 suspensos, 2 dúvidas, 2 lesionados, 1 volta com
limite de 60 min = 12 de 18), squad table of 18 players / 11 columns, inbox of 5
with one unread, form last 5, goals by period, aproveitamento meter, 12-row
standings cut around the club, finances in one line.

## Numbers that reconcile (checked by parsing the file, not eyeballed)

- Squad goals `data-goals` sum = **44**, the club's league GF; GA 34, saldo +10.
- 15V 9E 10D → **54 pts**; 54/102 = **52,9 %** aproveitamento (matches the band).
- Every standings row satisfies P = 3V + E: 68, 65, 61, 55, **54**, 52, 50, 48,
  then 35, 33, 30, 26 (17º–20º). Club row sits between 4º (55) and 6º (52).
- Goals by period 6+7+9+8+7+7 = **44**; 22 per half.
- Form last 5: 3V 1E 1D = **10 of 15** points, 8 scored / 5 conceded.
- Finances: folha 1,84 / teto 2,25 = **81,8 % ≈ 82 %** (stated as 82 %); margin
  +240 mil; window 30/11.

## Fixes made after verification

1. Contrast (3 items, all reported by the audit): topbar `/` separator and the
   sort `↕` glyph used `--rule-strong` as text → switched to `--muted`; chip
   counts likewise. The meter's visually-hidden reference text sat inside a
   1px ink mark and measured ink-on-ink → the mark now carries `--surface` ink.
2. JS init order: the `?feed=` deep-link block ran before the table rows were
   collected (would throw on a served URL with the param). Moved after wiring;
   `node --check` clean.
3. Loading/error state layouts were rendered as static variants to prove they do
   not overflow or clip (the runtime toggle itself is not exercised by shot.mjs).

## Blind-path measurements

Command per shot (node shot.mjs, headless Chromium):

```
node /home/lluz/dev/ui-craft/scripts/shot.mjs index.html shot-1440.png 1440 900 --full --deep
node /home/lluz/dev/ui-craft/scripts/shot.mjs index.html shot-1440-dark.png 1440 900 --full --deep --dark
node /home/lluz/dev/ui-craft/scripts/shot.mjs index.html shot-1024.png 1024 768 --full --deep
```

| Render | overflowX | scrollHeight | clipped | small | offenders | contrastFails | fontStatus | headings | focusables |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1440 light | **0** (exit 0) | 2235 | 0 | 0 | 0 | 0 | loaded (6 faces) | 7 visible h2 + h1 | 25 |
| 1440 dark | **0** (exit 0) | 2235 | 0 | 0 | 0 | 0 | loaded | 7 + h1 | 25 |
| 1024 light | **0** (exit 0) | 3562 | 0 | 0 | 0 | 0 | loaded | 7 + h1 | 25 |
| 1440 state “falha” | 0 | — | 0 | 0 | 0 | 0 | loaded | all sections | — |
| 1440 state “carregando” | 0 | — | 0 | 0 | 0 | 0 | loaded | all sections | — |

The 1024 jump in scrollHeight is the deliberate single-column break at 1080 px:
the rail (inbox, form, charts) stacks under the squad instead of shrinking the
table below legibility. No horizontal scroll at any width down to 900 px; below
900 px both wide tables scroll inside their own box.

## Note on the bold move

One only: the 104 px `5º` numeral in the identity band (Fira Sans Condensed 700,
line-height 0.74), set against 10–13 px labels and table text. The finance figure
is 46 px and subordinate, as the brief demands. Everything else is rules,
tabular figures and 34 px rows — no cards, no shadows, no rounded containers.

Decided: Direction “Data Dense / Ops × Swiss” — a scanning instrument with 34 px rows, hairline rules, zero radius and no shadows; palette “Chalk & Claret” (chalk #F1F2EC surface, ink #171913, claret #7C1F2E as the single accent, plus ok/warn/danger/focus roles, remapped in dark to #131410 / #ECEDE5 / #D08A83); type roles Fira Sans Condensed 600–700 for display and numerals, Fira Sans 400/500 for body and tables, Fira Mono for 10–11 px uppercase labels, all figures tabular.
Verified: shot.mjs at 1440 light, 1440 dark and 1024 reports overflowX 0, clipped 0, small 0, offenders 0, contrastFails 0, fontStatus loaded; one h1 and 7 visible h2 in document order, 25 focusables reported; goals sum 44, points 54 = 3V+E on every standings row, aproveitamento 52,9 %, periods sum 44, form 10/15, payroll 1,84/2,25 = 82 % — all parsed from the file; error and loading layouts render without overflow from static state variants.
Not verified: interactive behaviour (sort, filter, theme toggle, inbox expand, retry) was not exercised in a browser — shot.mjs only renders and audits, so those paths rest on source review plus `node --check`; keyboard tab order and screen-reader output were not run; hover/focus visuals were not captured; the page was never seen by a human or an image-capable model.
Known gaps: sticky table header at 48 px is implemented but unverified under scroll; the 390 px layout exists in CSS but is outside the brief and unrendered; the `?feed=` deep link needs a served URL (file:// drops the query) and is unverified end to end; data is fictional and the “ao vivo” / “falha” states are simulated, not wired to a real provider; no print stylesheet.
