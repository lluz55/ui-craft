# T3 — Flutter surface

**Frozen task. Do not edit.** Identical text in both arms, every round.

## Brief

> **Cofre** is a personal savings app for people saving toward a specific goal (a trip, a move, a course). The main screen shows one goal: the amount saved, the target, the deadline, and the pace needed to get there.
>
> Build the goal screen in Flutter.
>
> Real content you may use:
> - Goal: "Mudança para o Recife", target R$ 12.000,00, saved R$ 4.850,00, deadline 14/03/2026, monthly deposit R$ 900,00.
> - Pace states: `no ritmo`, `atrasado`, `adiantado` — with the delta in reais and in days.
> - History: last 5 deposits (date, amount, source: `transferência`, `depósito`, `rendimento`).
> - Actions: depositar, editar meta, ver histórico.
>
> Constraints: Flutter 3.x, Material 3 as the base, Portuguese (pt-BR), single screen plus a detail sheet. Must handle: empty state (no goal yet), loading, error (could not load the goal), and a goal that is behind pace. Text scale 2.0 must not break it. Provide `lib/` + `pubspec.yaml`; use only Flutter SDK packages plus `intl` if needed.

## Deliverable

The Flutter project in the arm directory. If a Flutter toolchain is available: one rendered screenshot at 390×844. If not: a widget test that renders the three states (`test/goal_screen_test.dart`) plus `NOTE.md` stating the toolchain was unavailable.

## What the judge looks for

1. Is the theme a system (`ThemeData`, `ColorScheme`, `TextTheme`, tokens) or hardcoded values scattered in widgets?
2. Does the screen show progress against pace at a glance — not just a progress bar?
3. Are the four states real widgets with their own layout, not a `Text('Erro')`?
4. Do semantics exist (labels, merged rows, announced changes) and do tap targets meet 48dp?
5. Does it survive text scale 2.0 and a 360dp width without overflow?
6. Does it look like a product rather than a Material demo (`fromSeed` default, `Card` + `ElevatedButton` everywhere)?

## Out of scope

Persistence, networking, auth, localization files beyond pt-BR strings, onboarding.
