# Flutter

Flutter fails differently from the web: not with slop frameworks, but with "Material demo" — `ColorScheme.fromSeed(Colors.blue)`, `ElevatedButton`, `Card` with elevation 1, 16px everywhere. The same rules apply: a point of view, one bold move, and every state.

Load this when editing a project with `pubspec.yaml`.

## Theme is the design system

Everything visual comes from `ThemeData`, not from hardcoded values in widgets. If a color, radius, or text style appears inline, it belongs in the theme.

```dart
ThemeData(
  useMaterial3: true,
  colorScheme: ColorScheme(
    brightness: Brightness.light,
    primary: ink, onPrimary: paper,
    secondary: accent, onSecondary: ink,
    surface: paper, onSurface: ink,
    surfaceContainerHighest: paperTint,
    error: brick, onError: paper,
    outline: rule, outlineVariant: ruleSoft,
  ),
  // textTheme, cardTheme, inputDecorationTheme, filledButtonTheme, ...
)
```

- **Do not stop at `fromSeed`.** It is a starting palette, not a decision. Override the roles the product actually uses; a seed-only theme reads as default Flutter.
- `ThemeExtension` for the third axis (rules, tints, brand marks) so `Theme.of(context).extension<BrandTokens>()` replaces magic values.
- Dark theme: separate `ColorScheme`, not a filter. Elevation in dark = lighter surface, and `surfaceTintColor` must be set deliberately or Material 3 tints every white surface with your seed color.
- Define radii in the theme (`cardTheme.shape`, `filledButtonTheme.style`) — mixed radii across a screen is the same defect as on the web.
- Type: one text theme built from roles (`displaySmall`, `titleLarge`, `bodyMedium`, `labelSmall`). Adjust `height` explicitly; Flutter's default line heights are tuned for Material, not for display type.
- `MediaQuery.textScaler` / `textScaleFactor` must not break layouts: test at 1.3 and 2.0. Use `FittedBox` sparingly; prefer flexible layouts with `maxLines` + `overflow: TextOverflow.ellipsis`.

## Typography in Flutter

- Bundle or `google_fonts` with `GoogleFonts.<family>(textStyle: ...)`, plus `GoogleFonts.<family>TextTheme(theme.textTheme)` to swap the whole scale.
- Set `fontFeatures: [FontFeature.tabularFigures()]` for numbers in tables, counters, prices.
- Letter spacing is expressed as `letterSpacing` in logical pixels — negative for display sizes, positive for small caps/labels.
- Strings: use `\u00A0` for non-breaking spaces where needed; curly quotes are typed directly (UTF-8 source).

## Layout

- Spacing constants from one unit (`const s = 4.0`), used as `s * 2`, `s * 4`. No `16` sprinkles.
- `Padding` vs `SizedBox` vs gaps: one convention, repeated. Prefer `Column(spacing: ...)`/`Row(spacing: ...)` in current Flutter for even rhythm.
- Breakpoints via `LayoutBuilder` (`< 600` compact, `600–1024` medium, `> 1024` expanded). Do not branch on device model.
- `SafeArea` on every full-screen scaffold; bottom sheets and dialogs need it too, not just the main body.
- `ConstrainedBox(maxWidth: 680)` for reading columns on tablets/web; content stretching to 1400px on a tablet is a defect.
- Lists: `ListView.builder`/`SliverList` — never a `Column` inside `SingleChildScrollView` with more than ~10 children. Avoid `shrinkWrap: true` on long lists.
- `Expanded`/`Flexible` with `minWidth: 0` equivalents — Flutter clips with the yellow-black overflow stripes, which is the same class of bug as web overflow.
- Long strings: `maxLines` + overflow, plus a way to see the value (tooltip, detail sheet, copy).

## Touch and platform idioms

- Tap targets ≥ 48×48 dp, with visual size allowed to be smaller but the hit area padded.
- Spacing between adjacent tap targets ≥ 8 dp.
- `Material` ripples on Material widgets; `InkWell` for custom tap surfaces so feedback is consistent.
- iOS conventions when the app ships to iOS: back gesture, `CupertinoPageRoute` feel, no globally-scoped Material dialog if the platform is iOS (or at least theme it). Do not mix Cupertino and Material components in the same surface without intent.
- Haptics for confirmations of destructive/primary actions (`HapticFeedback.mediumImpact`), not for every tap.
- Keyboard (desktop/web Flutter): focus order, `FocusTraversalGroup`, visible focus (`Focus` + `AnimatedContainer` border), Enter/Esc semantics.

## Accessibility

- `Semantics` labels for icon-only buttons: `IconButton(tooltip: 'Fechar', ...)` is the cheap path; `Semantics(label: ...)` when the widget is custom.
- Group composite rows: `MergeSemantics` or `Semantics(container: true, ...)` so a reader announces a row, not five fragments.
- Announce dynamic changes: `SemanticsService.announce(...)` for results, errors, and toasts.
- Contrast: same thresholds as web (4.5:1 body, 3:1 large/UI). Check the actual `Color` values, especially `onSurfaceVariant`-style muted colors.
- Respect `MediaQuery.disableAnimations` (accessibility "reduce motion") and `WidgetsBinding.instance.platformDispatcher.accessibilityFeatures`.
- Every image: `Image.asset(..., semanticLabel: ...)` or `excludeFromSemantics: true` for decoration.
- Test with `SemanticsHandle` (`final handle = tester.ensureSemantics()`) and `tester.getSemantics`.

## Motion

- Durations from `theme.pageTransitionsTheme` and explicit `Duration(milliseconds: 200)` for micro, `300` for surfaces.
- Curves: `Curves.easeOutCubic` for entrances, `Curves.easeIn` for exits; avoid `Curves.elasticOut` on anything the user must not wait for.
- One hero transition per navigation, at most.
- Animate with `AnimatedContainer`/`AnimatedOpacity`/`AnimatedSwitcher` before reaching for animation controllers.
- No infinite animations that are not signalling activity.

## States

Material gives you `CircularProgressIndicator` and nothing else useful. Build:

- **Empty** — icon or illustration from the product's vocabulary, one sentence, one action.
- **Loading** — skeleton shaped like the content when the layout is predictable; spinner only otherwise.
- **Error** — what failed, whether data is safe, and a retry. Retry must actually retry.
- **Success** — confirm inline, not only with a snackbar that disappears.
- **Offline** — cached content labelled as such; actions queued or disabled with a reason.
- **Disabled** — explain in helper text or tooltip.

## Forms

- `TextFormField` with `validator`, error text inline, `autovalidateMode: onUserInteraction` for long forms.
- Correct `keyboardType`, `textInputAction`, `autofillHints`, `inputFormatters`.
- Labels above fields (Material's floating label collapses to a caption — do not rely on it for data-dense forms).
- Never clear user input on error. Never block paste.
- Focus the first invalid field on submit.

## Performance

- `const` constructors everywhere possible; `RepaintBoundary` around animated/independently repainting subtrees.
- `ListView.builder` with `itemExtent`/`prototypeItem` when rows are uniform.
- Avoid rebuilding whole pages from a `setState` on a leaf; split widgets.
- Images: `cacheWidth`/`cacheHeight` for decoded size, `filterQuality`, and correct asset scales.
- Avoid `Opacity` widgets in hot paths; use `AnimatedOpacity`/`FadeTransition` or color alpha.

## Structure

```
lib/
  app/theme.dart          # ColorScheme, textTheme, extensions
  design/tokens.dart      # spacing, radii, durations
  design/components/      # AppButton, AppCard, AppEmptyState
  features/<feature>/
```

Components wrap Material widgets so the design system can change without touching features: `AppButton` not `ElevatedButton` at call sites.

## Definition of done (Flutter)

- [ ] Runs at 360px width and on a tablet width without overflow stripes.
- [ ] Text scale 2.0: no clipping, no overlapping, no dead controls.
- [ ] Every screen has empty, loading, error, and success paths.
- [ ] Semantics: icon buttons labelled, dynamic changes announced, one voice per row.
- [ ] Contrast verified for the actual `ColorScheme` values, both brightnesses.
- [ ] Tap targets ≥ 48dp with 8dp separation.
- [ ] No hardcoded colors, radii, or font sizes outside `theme.dart`/`tokens.dart`.
