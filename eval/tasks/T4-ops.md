# T4 — Operations surface (data-dense)

**Frozen task. Do not edit.** Identical text in both arms, every round.

## Brief

> **Atlético Boa Vista** is a fictional club in Brazil's Série B. Build the club hub — the screen a
> head coach opens before picking the squad for Saturday. Not a landing page: a tool left open all
> day, 1440px monitor, keyboard at hand, Brazilian Portuguese.
>
> The screen must contain:
> 1. **Club identity** — crest, name, competition, current position, round. In a band, not a banner.
> 2. **Next match** — opponent, date, venue, home/away, and squad availability for that match
>    (suspended, returning from injury, doubtful).
> 3. **Standings** — 8–12 rows around the club, the club unmistakable, promotion and relegation
>    zones legible without relying on color alone.
> 4. **Squad table** — 14–20 players with position, age, appearances, goals, cards, average rating,
>    fitness and contract status. Sortable, with at least one filter.
> 5. **Two or three data reads** — form over the last 5, points efficiency, or goals by period.
>    Decorative charts with no real data are rejected.
> 6. **Inbox** — 3–5 messages with sender, subject, time; one unread.
> 7. **Finances in one line** — transfer budget, wage bill, margin. One large number, the rest subordinate.
>
> Constraints: static HTML + CSS, no build, no framework, no CDN, no network requests (local
> `@font-face` or a system stack). Minimal vanilla JS for sorting/filtering only. Light and dark
> themes, both complete — roles remapped, not inverted. Empty, loading and error states in at
> least two components. 1440px is the target; 1024px must not break.
>
> Rejected on sight: gray background with identical white cards and a soft shadow, a default indigo
> accent, a generic bar chart; a striped squad table with no typographic hierarchy; obvious
> green-and-yellow "football site" color with no decision behind it; a placeholder gray box where a
> crest should be; invented numbers that do not reconcile with each other.

## What this task stresses

Density without soup. Column alignment and units. Numbers that reconcile across views. Charts that
state a question and show a reference instead of decorating. Status legible without color. Two
themes as two systems. The place where "beautiful" and "usable" conflict, and the skill has to pick
usable.

## Deliverables

`index.html`, `styles.css` (+ `app.js` if needed), `PLAN.md`, `REPORT.md` with the delivery
contract, and screenshots `shot-1440.png`, `shot-1024.png`.

## Judge notes

Score axes from `eval/JUDGE.md`, with extra weight on: table legibility at a glance (can the reader
find "who is suspended" in under three seconds), numeric consistency, and whether the charts would
survive being printed in grayscale. A beautiful dashboard whose numbers do not add up scores below
a plain one whose numbers do.
