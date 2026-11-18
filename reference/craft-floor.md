# Craft floor

The minimum a surface must clear before you call it done. Read this immediately before delivering — not while planning. Every item is pass/fail; there is no "mostly".

If you could not check an item (no browser, no device), the delivery report says so. The floor is not negotiable, but it is honest about what was seen.

## 1. A decision was made

- [ ] The palette has 4–6 named values with roles, and none of them is `#6366F1` by default.
- [ ] Type roles are named (display/heading/body/label/data) with sizes, weights, line-heights.
- [ ] One direction from `styles.md` is written down with a reason and a "not this" neighbor.
- [ ] The one bold move is identified, and it is the only un-restrained thing on the surface.
- [ ] Substitution test passed: this could not be any other product in the category.

## 2. The surface holds together

- [ ] Spacing comes from one unit; within-group gaps < between-group gaps.
- [ ] Text, icons, and numbers share alignment lines.
- [ ] Exactly one accent color is doing accent work; semantic colors are separate.
- [ ] Borders where there is structure; shadows only where there is real elevation.
- [ ] Radius family is consistent (0, 1, or 2 values — not four).
- [ ] Nothing from `anti-patterns.md` shipped without a written exception.

## 3. Content is designed

- [ ] Real copy, not placeholders; buttons say what happens.
- [ ] Errors state cause and remedy.
- [ ] Empty states have a sentence and an action.
- [ ] Numbers are formatted for the locale; dates are unambiguous.
- [ ] Every number has an alignment, a unit, and something to compare it to.
- [ ] Numbers reconcile wherever they repeat on the surface.
- [ ] Each chart states its question, shows a reference, and is legible in grayscale.
- [ ] The longest realistic string does not break the layout.

## 4. Every state exists

- [ ] Empty / loading / error / success / disabled are visually designed.
- [ ] Loading has a shape (skeleton or spinner, not both) and no layout jump when content lands.
- [ ] Offline or slow network has a defined behavior.
- [ ] Destructive actions name the object and confirm or undo.

## 5. Accessible and operable

- [ ] Contrast passes on real hex values: body 4.5:1, large/UI 3:1.
- [ ] Focus is visible, in order, on every interactive element.
- [ ] Keyboard alone can complete the surface's primary task.
- [ ] Every control has an accessible name; icon-only controls have labels.
- [ ] Hit targets: 44px web / 48dp Flutter, with spacing.
- [ ] Reduced motion honored.
- [ ] Text scales to 200% (web) / 2.0 (Flutter) without loss.

## 6. Responsive / adaptive

- [ ] Web: 320, 390, 768, 1440 widths — no horizontal scroll, no clipped content.
- [ ] Flutter: 360dp phone, tablet width, and landscape without overflow.
- [ ] Touch targets and hover-only affordances make sense on touch.
- [ ] Navigation collapses sensibly; nothing essential is hidden behind hover.

## 7. Platform honesty

- [ ] Web: semantic elements, `:focus-visible`, `dvh`, `color-scheme`, no `transition: all`.
- [ ] Flutter: theme-driven colors/type, `SafeArea`, `LayoutBuilder`, `ListView.builder`, no Material 3 tint surprises.
- [ ] No console errors (web) / no overflow stripes (Flutter).
- [ ] No hydration mismatch on SSR surfaces.

## 8. The report

- [ ] `Decided` / `Verified` / `Not verified` / `Known gaps` block written.
- [ ] "Not verified" is truthful; if no render was seen, it says so.

## Fail conditions that override everything

- Placeholder or lorem copy in a delivered surface.
- An inaccessible primary action.
- Horizontal scroll or clipped controls at the smallest supported width.
- A happy-path-only surface shipped as complete.
- A claim of visual verification that did not happen.
