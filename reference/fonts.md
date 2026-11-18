# Fonts

Rules before the table:

- **Two families maximum.** One is better. A third is only allowed for a monospace data role.
- **Roles, not sizes.** Display, heading, body, label, data. Each role gets a family, weight, size, line-height, letter-spacing.
- **Pair by contrast of structure, not of mood.** Serif + sans works because stroke construction differs. Two geometric sans are one family with extra steps.
- **Line-height shrinks as size grows**: body 1.6–1.7, headings 1.15–1.25, display 0.95–1.05.
- **Measure**: 45–75 characters for body (≈ 65ch). Long-form narrower (55–65ch); tables fluid.
- **Weights**: 2–3 chosen ones (e.g. 400/600), not every weight in the family.
- **Fallbacks must be metric-adjacent** to limit layout shift (`font-display: swap` + similar x-height).
- Never set a display font below 20px, or body font above 24px without a reason.

## System stacks (fast, zero requests)

| Stack | Character | Use |
| --- | --- | --- |
| `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | Neutral, native | Tools where the OS is the brand |
| `ui-serif, Georgia, "Times New Roman", serif` | Quiet editorial | Long reading without a webfont |
| `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace` | Data/code | Terminal, ids, metrics |
| Flutter: `ThemeData().textTheme` default (Roboto on Android, SF on iOS) | Native | Apps that should not fight the platform |

## Pairings

| Display | Text | Character | Use for | Avoid if | CSS fallback |
| --- | --- | --- | --- | --- | --- |
| **Fraunces** (soft serif) | **Inter** | Warmth with a modern spine | Craft food, publishing, hospitality | The brief needs clinical authority | `Fraunces, Georgia, serif` / `Inter, system-ui, sans-serif` |
| **Newsreader** | **Instrument Sans** | Editorial, high legibility | Long-form products, studios, docs | You also want a display serif elsewhere | `Newsreader, Georgia, serif` / `"Instrument Sans", system-ui` |
| **Libre Bodoni** | **Public Sans** | Classical, institutional | Legal, civic, cultural institutions | The product is playful | `"Libre Bodoni", Didot, serif` / `"Public Sans", system-ui` |
| **Playfair Display** | **Source Sans 3** | Fashion-forward | Retail, beauty, fashion | You want to look different — it is the most-copied pairing of the decade | `"Playfair Display", Georgia, serif` / `"Source Sans 3", system-ui` |
| **Bricolage Grotesque** | **Inter Tight** | Contemporary, slightly odd | Startups with personality, dev tools marketing | The brand is conservative | `"Bricolage Grotesque", system-ui` / `"Inter Tight", system-ui` |
| **Space Grotesk** | **IBM Plex Sans** | Technical optimism | Developer tools, hardware, observability | Body text is long — Grotesk is display-only | `"Space Grotesk", system-ui` / `"IBM Plex Sans", system-ui` |
| **IBM Plex Sans** | **IBM Plex Mono** | Engineer's notebook | Infrastructure, docs, dashboards | You need editorial warmth | `"IBM Plex Sans", system-ui` / `"IBM Plex Mono", ui-monospace` |
| **Archivo** (Black / Expanded) | **Archivo** (Regular) | One family, huge range | Sports, logistics, bold brands | You want serif contrast | `Archivo, system-ui` |
| **DM Serif Display** | **DM Sans** | Friendly authority | Consumer finance, education, health | The subject is severe | `"DM Serif Display", Georgia, serif` / `"DM Sans", system-ui` |
| **Sora** | **Manrope** | Geometric calm, product-y | Web3, SaaS, AI products | You want to stand out from other SaaS | `Sora, system-ui` / `Manrope, system-ui` |
| **Lora** | **Work Sans** | Literary, comfortable | Journals, courses, long reads | The product is a dashboard | `Lora, Georgia, serif` / `"Work Sans", system-ui` |
| **Instrument Serif** | **Geist Sans** | Sharp editorial minimalism | Design studios, portfolios, premium apps | Body text will be technical | `"Instrument Serif", Georgia, serif` / `Geist, system-ui` |
| **JetBrains Mono** (labels only) | **Inter** | Terminal accent without costume | Dev tooling, changelogs, metrics | Monospace appears in body copy | `"JetBrains Mono", ui-monospace` / `Inter, system-ui` |
| **Gelasio / Georgia** | same family, 400/700 | Zero-request editorial | Offline-first, performance budgets | You need a distinct brand voice | `Georgia, serif` |

## Direction → family shortcut

| Direction (`styles.md`) | Safe family |
| --- | --- |
| Editorial Broadsheet | Newsreader, Libre Bodoni, Georgia |
| Swiss | Inter, Public Sans, Helvetica Now (if licensed) |
| Refined Minimal | Inter Tight, Geist, Instrument Sans |
| Technical | IBM Plex, JetBrains Mono |
| Brutalist | Archivo, Space Grotesk, system grotesque at heavy weights |
| Warm Craft | Fraunces, Lora, Gelasio |
| Soft Organic | DM Sans, Manrope, Nunito (careful — very common) |
| Retro Analog | Bricolage, DM Serif Display, condensed grotesque |
| Noir | Instrument Serif, Inter Tight at 300 |
| Playful Geometric | Space Grotesk, Archivo Expanded, geometric sans |
| Cinematic | system serif or wide sans — photography carries it |
| Data Dense | Inter/Public Sans at 13–14px + tabular figures |

## Flutter usage

```dart
// one place only: lib/app/theme.dart
TextTheme buildTextTheme(TextTheme base) => base.copyWith(
  displaySmall: base.displaySmall!.copyWith(
    fontFamily: 'Fraunces', fontSize: 56, height: 1.0, letterSpacing: -1.2,
  ),
  bodyMedium: base.bodyMedium!.copyWith(
    fontFamily: 'Inter', fontSize: 16, height: 1.6,
  ),
  labelSmall: base.labelSmall!.copyWith(
    fontFamily: 'Inter', fontSize: 12, letterSpacing: 0.6,
  ),
);
```

- `google_fonts` is convenient but does a network fetch on first run; in release builds bundle the `.ttf` under `assets/fonts` and declare it in `pubspec.yaml` with explicit weights.
- For numbers: `fontFeatures: const [FontFeature.tabularFigures()]`.
- Line height in Flutter is a multiplier (`height: 1.6`), same as CSS `line-height` unitless — do not pass pixels.

## Anti-patterns

- Display serif for every heading and body — the page reads as a wedding invitation.
- Inter/Roboto everywhere with no display role — reads as "default".
- A webfont for text at 12px — hinting is bad and contrast suffers.
- Three families "for variety".
- Bleeding-edge variable fonts without a static fallback.
- Fake "premium" by using a script font for headings.
