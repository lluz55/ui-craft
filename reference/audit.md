# Audit

Mechanical verification. No taste here — only pass/fail. Report terse findings grouped by file:

```
src/components/SignupForm.tsx:42 — input has no visible label (placeholder only) — add <label>
src/components/SignupForm.tsx:88 — submit disabled as validation feedback — keep enabled, validate on submit
```

Say what you checked when you find nothing. "Audit clean: 41 checks across 6 files" is a result.

**Start with the machine.** `node scripts/shot.mjs <page> out.png 1440 900 --full --deep`
answers a third of this list by itself (overflow, clipped text, tap targets, heading order,
focus order, font loading, computed contrast). Then audit the rest by reading code. See
`reference/verify.md` for the sighted/blind split.

## Universal (both platforms)

| Check | Fail looks like |
| --- | --- |
| Contrast, body text ≥ 4.5:1 | Muted gray on white, light gray placeholder |
| Contrast, large text & meaningful UI ≥ 3:1 | Thin icon on a mid-tone surface |
| Visible focus on every interactive element | No ring, or a ring invisible on the accent |
| Keyboard path complete and in DOM order | Custom dropdown unreachable |
| Every control has an accessible name | Icon button with no label |
| Errors announced and focused | Submit fails silently, focus stays on the button |
| States: empty, loading, error, success, disabled | Only the happy path |
| Long content: 3× text, longest number, unbroken string | Clipped text, horizontal scroll |
| Smallest viewport: 320px web / 360dp Flutter | Overflow stripes, cut-off controls |
| Zoom / text scale: 200% web / 2.0 Flutter | Overlap, hidden actions |
| Numeric columns right-aligned with tabular-nums | Numbers centered or jittering between rows |
| Every table column names its unit | The reader guesses whether 12 is goals or games |
| Numbers reconcile across views | Squad goals ≠ standings goals; points ≠ 3W + D |
| Chart has axis labels, a unit and a reference | A decorated line nobody can read |
| Chart survives grayscale | Series told apart only by hue |
| Table scrolls inside its own container | The page scrolls sideways at 1024px |
| Destructive actions confirm with context | "Are you sure?" with no object named |
| Reduced motion respected | Parallax/transform still runs |
| No `transition: all`, no off-token durations | `shot.mjs --deep` reports `transition-all` or `off-token-duration` |
| Motion within the surface's budget | A tool surface that animates itself in |
| Numbers tabular where aligned | Prices in proportional figures |
| No placeholder copy | Lorem ipsum, "Feature one" |
| Images have dimensions | Layout shift on load |
| Images: alt text, real ratio, no stretch, local files | `alt` missing, `object-fit: fill`, hotlinked URL |
| Text over an image has a measured scrim | White type on a bright photo |
| Theme coherence (if dark mode) | Inverted colors, unreadable muted text |

## Web

- [ ] Landmarks: `header`/`nav`/`main`/`footer`, one `h1`, no skipped heading levels.
- [ ] Links vs buttons used correctly; no `href="#"` with a click handler.
- [ ] Skip link on long pages.
- [ ] `alt` meaningful on content images, empty on decoration.
- [ ] Form inputs: `label`, `type`, `inputmode`, `autocomplete`, `name`.
- [ ] Paste not blocked; no disabled-submit validation.
- [ ] `min-width: 0` on flex/grid text children; `overflow-wrap` on user content.
- [ ] `:focus-visible` present, not `outline: none`.
- [ ] No `transition: all`; animations are transform/opacity.
- [ ] `prefers-reduced-motion` honored.
- [ ] `100dvh`, not `100vh`, for full-height mobile.
- [ ] Images: `width`/`height`, `loading="lazy"` below fold, `fetchpriority` on LCP only.
- [ ] View state in the URL where it matters (filters, tabs, page).
- [ ] Dialogs trap focus and restore it; `Esc` closes.
- [ ] No layout reads in render; lists > 50 virtualized.
- [ ] Console clean; no layout shift above 0.1.
- [ ] `color-scheme` set for dark mode.
- [ ] Locale formatting via `Intl`, not manual string concatenation.
- [ ] Hit targets ≥ 44×44 CSS px with adequate spacing (`touch-action: manipulation`).

## Flutter

- [ ] `SafeArea` on scaffolds, sheets, and dialogs.
- [ ] Tap targets ≥ 48×48 dp, ≥ 8 dp apart.
- [ ] `IconButton` has `tooltip`; custom controls have `Semantics(label:)`.
- [ ] Composite rows merged for screen readers.
- [ ] Dynamic changes announced (`SemanticsService.announce`).
- [ ] Text scale 2.0: no overflow, no clipped buttons.
- [ ] No overflow stripes at 360dp width.
- [ ] `ListView.builder` for lists; no `shrinkWrap: true` on long lists.
- [ ] No `MediaQuery.size` device branching; `LayoutBuilder` with breakpoints.
- [ ] Colors, radii, type from `theme.dart` / `tokens.dart` only.
- [ ] `surfaceTintColor` handled (Material 3 tinting).
- [ ] Dark theme built as its own `ColorScheme`.
- [ ] Images decoded at display size (`cacheWidth`/`cacheHeight`).
- [ ] `const` constructors where possible; no `Opacity` in hot paths.
- [ ] Animations respect `MediaQuery.disableAnimations`.
- [ ] Strings externalized (l10n) when the app is localized.
- [ ] Error/empty/loading widgets exist as components, not inline one-offs.
- [ ] Focus traversal works on desktop/web targets.

## Reporting

```
Audit: <n> checks, <m> findings
  <path:line> — <rule> — <fix>        (severity: blocking | polish)
```

Mark `blocking` only for: inaccessible control, broken state, overflow, contrast failure, data loss. Everything else is polish.
