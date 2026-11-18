# Motion

Load when adding transitions, page changes, or any animation. Motion is a quality signal only when it explains something; otherwise it is delay.

## What motion is allowed to do

1. **Explain a change** — element moves from where it was to where it went.
2. **Preserve context** — a shared element between two screens; a sheet that slides from its trigger.
3. **Confirm an action** — 150ms of feedback that the click registered.
4. **Signal state** — loading, recording, syncing.
5. **Direct attention** — one thing, once, when something irreversible is about to happen.

Anything else is decoration. Decoration is allowed, but it costs: attention, battery, accessibility, and perceived speed.

## Tokens

| Token | Duration | Use |
| --- | --- | --- |
| `instant` | 0–80ms | Hover, press, checkbox, toggle |
| `micro` | 120–180ms | Tooltips, dropdowns, color/opacity transitions |
| `surface` | 200–300ms | Sheets, dialogs, expanding panels, tab content |
| `page` | 300–400ms | Route transitions, large layout changes |
| `ambient` | 1s+ | Breathing/loading, never blocking |

Easing:

- Enter: `cubic-bezier(0.2, 0, 0, 1)` (fast out, settle).
- Exit: `cubic-bezier(0.4, 0, 1, 1)` (accelerate away) and **shorter** than the enter.
- Movement on screen: `ease-in-out`. Movement off-screen: `ease-in`.
- Never `linear` for UI (only for continuous rotations/progress).
- Never `bounce`/`elastic` on anything the user must act on.

## Choreography

- Stagger only for lists that appear together, 20–40ms per item, and cap at 5 items (the rest appear at once).
- One thing moves at a time on the primary action path. Two simultaneous movements compete.
- Enter + exit of a modal: backdrop fades faster than the panel moves.
- Shared-element transitions: only for elements the user clicked.
- Page transitions under 400ms; anything longer feels broken on the second visit.

## Reduced motion

Both platforms:

- Web: `@media (prefers-reduced-motion: reduce)` — remove transforms, parallax, and stagger; keep opacity fades under 150ms.
- Flutter: check `MediaQuery.of(context).disableAnimations`; provide a duration of `Duration.zero` path that still shows the end state.
- Never remove the *information* the motion carried: if a sheet slides from the trigger, in reduced motion it still appears adjacent.

## Web specifics

```css
.backdrop { transition: opacity 120ms ease-out; }
.panel { transition: transform 240ms cubic-bezier(.2,0,0,1), opacity 160ms; }
@media (prefers-reduced-motion: reduce) {
  .panel { transition: opacity 120ms linear; transform: none !important; }
}
```

- `will-change` only during the animation, then removed.
- Animate `transform`/`opacity`; `grid-template-rows`/`height: auto` need `interpolate-size` or a FLIP fallback.
- `transition: all` is a bug — it animates layout properties you did not intend.
- Interruptions must be graceful: rapid hover in/out should not queue.
- View Transitions API: nice for route changes, but always ship a non-animated fallback.

## Flutter specifics

- Implicit first: `AnimatedContainer`, `AnimatedOpacity`, `AnimatedSwitcher`, `AnimatedAlign`.
- Explicit controllers: dispose them; one `AnimationController` per coordinated group.
- `PageRouteBuilder` with `transitionDuration` ≤ 300ms; match platform expectations (iOS horizontal push, Android fade-through).
- `Hero` tags: unique per item, one hero per transition, never on a widget that rebuilds size wildly.
- `TickerProviderStateMixin` on the state that owns the controller; no tickers in stateless widgets.
- Test with `tester.pumpAndSettle()` — a test that never settles means a loop you did not intend.

## Anti-patterns

- Entrance animations on every section (the page performs itself).
- Fade-in-on-scroll used on content the user is already looking at.
- Hover scale on cards in a dense grid (jitter, and meaningless on touch).
- Spinners where a skeleton fits; skeletons where content is instant.
- Infinite looping animations that signify nothing.
- Motion that blocks input (unskippable intro, animation-gated navigation).
- Parallax on mobile without reduced-motion handling.
- Anything over 400ms that the user triggers and waits for.
