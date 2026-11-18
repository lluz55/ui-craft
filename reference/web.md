# Web (HTML / CSS / React / Tailwind)

Platform rules that hold regardless of framework. Load this when editing anything that renders in a browser.

## Structure and semantics

- The document is a reading order, not a layout. `header`/`nav`/`main`/`footer` first; `div` last.
- One `h1` per page; heading levels never skip. If the design needs a smaller heading, style it — do not demote the element.
- Buttons do things; links go places. An `a` with `onClick` and `href="#"` is neither.
- `main` wraps the primary content and only once. Repeated blocks that are not the main content (sidebars, ads) are `aside` or `section` with a heading.
- Landmark-complete: `nav` for navigation with a label, `form` for forms with a label.
- Lists are lists. Card grids, nav items, and settings rows are `ul`/`li` unless a table is semantically right.

## Accessibility floor

- Every control has an accessible name: visible `label`, `aria-label`, or `aria-labelledby`. Placeholder text is not a name.
- `alt` describes the image's purpose in context; decorative images get `alt=""`, never a filename.
- `aria-live="polite"` for status messages (saved, copied, results count). Errors on submit move focus to the first invalid field and announce why.
- Screen-reader-only text via a clip utility, not `display:none`.
- Skip link to `#main` as the first focusable element on long pages.
- DOM order = tab order. No `tabindex` above 0; negative only for programmatic targets.
- Custom widgets (combobox, dialog, menu, tooltip) implement the expected keyboard contract or use a primitive library. Half a combobox is worse than none.
- Contrast: 4.5:1 body text, 3:1 large text (≥24px or ≥19px bold) and UI boundaries/icons that carry meaning. Muted gray on white usually fails; check the actual hex.
- Zoom to 200% must not clip content or introduce horizontal scroll on text. `rem` for type and spacing; `px` only for hairlines and radii.

## Focus

- `:focus-visible` with a real ring: `outline: 2px solid var(--focus); outline-offset: 2px`.
- Never `outline: none` without an equal-or-better replacement that survives on every background.
- Ring color must contrast against both the control and the page. A ring the same hue as the button is invisible.
- Focus trapping only inside modal dialogs, and restored to the trigger on close.

## Forms

- Label above input, always visible. No placeholder-as-label, no floating labels on data-dense forms.
- Correct `type`, `inputmode`, `autocomplete`, and `name`. `autocomplete="email"`, `"one-time-code"`, `"current-password"`, `"new-password"`, `"street-address"`.
- Never block paste. Never disable the submit button as validation feedback — validate on submit and keep the button live.
- Errors inline, next to the field, describing cause and remedy: "Expires must be in the future (you entered 2024-01-01)".
- Validation is not a substitute for server-side checks; the UI says what the server said.
- Multi-step forms keep state when going back. A step that loses data is a defect.
- Enter submits the form; `Esc` closes transient overlays.

## Layout mechanics

- One spacing unit (`--space: 4px` or `0.25rem`); sizes are multiples.
- `min-width: 0` on flex/grid children that contain text or `pre`, or they overflow.
- Long unbroken strings (emails, URLs, ids): `overflow-wrap: anywhere` or `truncate` with a way to see the whole value (`title`, copy button, expandable row).
- Fixed headers and sticky columns need scroll margins: `scroll-margin-top`.
- Avoid `position: fixed` for anything taller than the viewport (mobile keyboards and browser chrome eat it).
- `100vh` on mobile is wrong; use `100dvh` with a `100vh` fallback.
- Content column capped by measure, not by container: `max-width: 65ch` for prose, fluid for data.
- Grid for structure, flex for one-dimensional alignment. Absolute positioning only for overlays and optical tweaks.
- Tables: right-align numbers, tabular figures (`font-variant-numeric: tabular-nums`), sticky header for long lists, and a mobile strategy (card rows or horizontal scroll with a visible affordance) — never a silently clipped table.

## Type and text

- Base 16px minimum for body; 14px only in dense UI chrome, 12px only for labels with strong contrast.
- Line-height scales inversely with size: 1.6–1.7 at 16px, 1.15–1.25 at 40px+.
- `text-wrap: balance` on headings, `text-wrap: pretty` on short paragraphs where supported.
- Real characters: curly quotes, em dash, ellipsis, non-breaking space before units and after short prepositions in headings.
- No text in images; no text baked into SVG when it is content.
- `font-display: swap` and a metric-compatible fallback to limit layout shift.

## Color and theme

- Tokens in CSS custom properties, semantic names (`--surface`, `--ink`, `--muted`, `--accent`), not (`--gray-100`).
- Dark mode by re-mapping tokens, not by inverting. Dark surfaces: elevated = lighter, not whiter. Avoid pure black; avoid pure white text.
- `color-scheme: light dark` on `:root` so form controls and scrollbars follow.
- Gradients: one place, tied to the subject's light or material — not a default purple mesh.
- Glassmorphism only if the background carries information; otherwise it is fog.

## Motion

- Animate `transform` and `opacity`. Never `transition: all`.
- Durations: 120–180ms micro (hover, toggle), 200–300ms surfaces (sheet, dialog), 300–400ms page transitions.
- Easing: `cubic-bezier(0.2, 0, 0, 1)` in, `ease-in` out.
- `@media (prefers-reduced-motion: reduce)` removes transforms and parallax but keeps opacity fades.
- No autoplaying video with sound; no motion that loops without meaning.
- Skeletons for >300ms loads; spinner only when no layout is predictable; never both.

## Images and media

- `width`/`height` (or `aspect-ratio`) on every image and embed: prevents CLS.
- `loading="lazy"` below the fold, `fetchpriority="high"` on the LCP image only.
- Modern formats (AVIF/WebP) with a fallback; responsive `srcset`/`sizes`.
- No image-as-button. No hero image that only works at 1440px.
- Video: muted, `playsinline`, poster image, pause control if over 5s.

## State and URLs

- View state that a user would want to share or refresh belongs in the URL: filters, tabs, pagination, selected item.
- Back button must not lose the user's context; scroll restoration for lists.
- Destructive actions: confirm with the object's name, or an undo window. Never a bare "Are you sure?".
- Optimistic updates need a rollback path and a visible failure.
- Disable state must be visually distinct and explain why (tooltip or helper).

## Performance

- List rendering above ~50 rows: virtualize.
- No layout reads (`offsetHeight`, `getBoundingClientRect`) inside render paths.
- Debounce search input; abort stale requests.
- Bundle: route-level code splitting; icons imported individually.
- Fonts: max two families, `preload` the one used above the fold, subset when possible.

## Tailwind notes

- Configure the scale once (`theme.extend`) and use it; arbitrary values (`w-[373px]`) are a smell outside optical fixes.
- Semantic color tokens via CSS variables mapped in `tailwind.config`, so dark mode is a token swap.
- `prose` styles for long-form content, not hand-rolled typography per element.
- Never fight specificity with `!important` in markup; fix the layer.

## React notes

- Keys are stable ids, never array indices for reorderable lists.
- Derived state is computed, not duplicated in `useEffect`.
- Every conditional render has a defined empty branch.
- Effects do not fetch on every render; abort on unmount.
- Loading and error states live next to the data hook, not in three components.

## Definition of done (web)

- [ ] Keyboard-only pass: reach and operate every control, visible focus throughout.
- [ ] 390px and 1440px: no horizontal scroll, no clipped text, no orphaned controls.
- [ ] Empty, loading, error, and success states exist and are styled.
- [ ] Contrast checked on the real hex values, light and dark.
- [ ] No console errors; no layout shift on load.
- [ ] Long-content test: 3× the expected text length, longest plausible number.
