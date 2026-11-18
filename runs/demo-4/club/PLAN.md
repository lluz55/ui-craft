# PLAN — Atlético Boa Vista · Central do futebol profissional

Surface: one screen, 1440×900 target, opened before squad selection on Saturday.
Language: pt-BR. Static HTML/CSS + minimal vanilla JS (sort, filter, states, theme).

## 1. Subject signals

- **Material**: the printed team sheet and the dressing-room board — chalk dust, hairline
  rules, taped paper, biro annotations. A tool, not a poster.
- **Vocabulary**: "à disposição", "suspenso", "dúvida", "saldo", "aproveitamento", "G4", "Z4".
- **Artefact**: the crest (drawn as a real SVG shield, not a gray box) and the match strip.

## 2. Direction

**Data Dense / Ops × Swiss (hybrid).** A scanning instrument: 34px rows, tabular figures,
rule separators, no cards, no shadows, no radius. Swiss contributes the visible grid and the
disciplined left alignment; Ops contributes density, status-as-text and the keyboard-first
feel.

*Not this*: Refined Minimal — identical white cards on gray with a soft shadow is the exact
thing the brief rejects, and it would make the club look like a SaaS billing screen. *Not
this either*: Editorial — a serif body slows a scan-heavy tool.

## 3. Chromatic strategy

**White room, chalk-tinted, with one club chroma.** Not paper (no cream, no terracotta), not
dark-first: the page is a lit working surface. Surface is a cool chalk green-grey `#F1F2EC`
(hue 75°, 17% sat — read as chalk dust / whiteboard, not as cream). The single accent is the
club's **claret**, used only for: the club's standing row edge, the giant position numeral's
rule, active sort/filter, unread mail, chart bars. Semantic states (apto / dúvida / fora) are
separate roles and always carry a glyph + text, never colour alone.

Dark theme is a **re-map** (night dressing room): olive-black surfaces, chalk ink, claret
lightened to dusty rose, same hierarchy — not an inversion.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--surface` | `#F1F2EC` | `#131410` | page |
| `--surface-2` | `#E7E8E0` | `#1B1C17` | table header, wells, bars track |
| `--ink` | `#171913` | `#ECEDE5` | primary text |
| `--muted` | `#565E56` | `#A4A79B` | metadata (5.6:1 / 7.6:1) |
| `--rule` | `#C9CEC3` | `#2D2E27` | hairlines |
| `--rule-strong` | `#8E968C` | `#4A4C43` | section edges |
| `--accent` | `#7C1F2E` | `#D08A83` | club claret |
| `--accent-ink` | `#FCF7F2` | `#1B0F0D` | type on accent |
| `--ok` | `#1D6B4E` | `#6FC29A` | apto |
| `--warn` | `#8A5A00` | `#E0B25C` | dúvida |
| `--danger` | `#9E2A22` | `#E58F84` | suspenso, lesão, erro |
| `--focus` | `#0B5FC0` | `#8FB8FF` | functional ring only |

## 4. Type

One text family + one condensed display + a mono for labels (data role, the allowed third).

- Display / numerals: **Fira Sans Condensed** 600–700. Position numeral `104px/0.78`, `-0.03em`.
- Heading: **Fira Sans Condensed** 600 — club `30px/1.05`, section `18px/1.15`.
- Body: **Fira Sans** 400 `14px/1.55`; table `13px/1.35`; dense meta `12px`.
- Label: **Fira Mono** 400 `11px`, uppercase, `0.12em` tracking (eyebrows, units, timestamps).
- Data: tabular figures everywhere (`font-variant-numeric: tabular-nums`), right-aligned,
  fixed decimals (`52,9`, `7,4`).

Fonts copied locally from `demo-2/B/fonts` (Fira Sans 400/500/600, Fira Sans Condensed
600/700, Fira Mono 400); `@font-face` with `font-display: swap`, no network.

## 5. Layout (ASCII)

```
┌ topbar 48 ────────────────────────────────────────────────────────────────┐
│ ABV / FUTEBOL PROFISSIONAL    Jogo Elenco Tabela Caixa      feed ⌄  tema   │
├ band 148 ─────────────────────────────────────────────────────────────────┤
│ [crest]  SÉRIE B · RODADA 34 DE 38                      5º   52,9%   +10  │
│          Atlético Boa Vista                         54 pts   aprov.  saldo │
│          Vila Boa Vista · fundado 1928               1 atrás do G4        │
├──────────────────────────────── main (2fr) ─────────────┬─ rail (1fr) ────┤
│ PRÓXIMO JOGO · RODADA 35                    3 dias       │ CAIXA · 1 nova  │
│ [GS] Grêmio Serrano   16:00   ATLÉTICO BOA VISTA [ABV]   │ 5 mensagens     │
│ Arena do Vale · fora · sáb 21/11                         ├─────────────────┤
│ 12 de 18 à disposição │ 2 susp. │ 2 dúv. │ 2 les. │ 1 volta│ FORMA · 5 jogos │
├──────────────────────────────────────────────────────────┤ V E V D V 10/15 │
│ ELENCO · 18 atletas        [Todas][GOL][ZAG][LAT][VOL]…  ├─────────────────┤
│ # Atleta    Pos Id J Gols CA CV Nota Condição      Contr.│ GOLS POR PERÍODO│
│ 1 Rafael…   GOL 31 34  0   2  0  6,9 Disponível     2027 │ 6 7 9 8 7 7     │
│ … 18 rows, 34px, sticky header                           │ média Série B   │
├──────────────────────────────────────────────────────────┴─────────────────┤
│ CLASSIFICAÇÃO · 12 linhas — G4 (traço cheio) · clube (claret) · Z4 (hachura) │
├────────────────────────────────────────────────────────────────────────────┤
│ FINANÇAS  R$ 3,2 mi   folha R$ 1,84 mi/mês · 82% do teto · margem +R$ 240 mil│
└ footer · atualizado 14:32 · dados fictícios ───────────────────────────────┘
```

Reading path: who are we / where are we → who do we play and who is missing → the squad →
the table → the money. DOM order equals visual order.

## 6. The one bold move

The **104px position numeral `5º`** set against a 12–13px dense grid, with its points and the
"1 atrás do G4" chase set beside it at 1/6 the size. Everything else obeys the grid — no
second oversized element (finance number is 48px, clearly subordinate). It is data, not
ornament; it is the first thing a coach reads.

## 7. Numbers that reconcile

- Standings: 34 jogos each; `P = 3V + E` on every row (e.g. 15·3+9 = 54).
- Club: 44 gols pró, 34 contra, saldo +10; goals-by-period bars sum 44 (22 per half);
  squad goal column sums 44 (11+7+6+4+4+2+2+3+1+1+2+1).
- Availability: 18 = 2 suspensos + 2 dúvidas + 2 lesionados + 1 retorno + 11 disponíveis.
- Finance: verba 3,2 de 4,5 mi; folha 1,84 mi = 82% do teto 2,25 mi.
- Scenario: 54 + 3 = 57 > 55 (4º); empate 55 pts, saldo +10 × +9 decides in our favour.

## 8. States in scope

- Squad: **loading** (shaped skeleton rows), **error** (cause + retry), **empty** (filter
  with no players + "limpar filtros"), sorted + filtered, sticky header.
- Inbox: **loading**, **error**, unread/read, expanded message body, "marcar lidas".
- Feed switch (topbar, native `<details>`): ao vivo / carregando / falha — drives both blocks.
- Theme: light, dark, system default; persistent choice.
- Focus-visible everywhere, `prefers-reduced-motion`, 1024 and 390 widths, 200% zoom.

## 9. Explicitly banned

Cream/terracotta, gradient hero, glass, soft card shadows, indigo accent, green-and-yellow
club kit, gray placeholder crest, colored-dot-only status, decorative chart, centered
numbers, `border-radius` above 0 on surfaces, more than one accent hue doing brand work.
