# REPORT — Atlético Boa Vista, hub do clube

## Decided

**Data Dense / Ops + Technical**, direção material "súmula impressa": papel quente `#F2EDE1`,
tinta `#17140F`, grená `#6E1F2B` como única cor de marca, filetes de 1px, zero sombra, raio 0–2px.
Tipografia **Fira** local (`fonts/`, seis cortes): Fira Sans Condensed 700 para display/placar,
Fira Sans 400/500/600 para texto e tabela densa (13–14px), Fira Mono para horas, ids e rodapé.
Movimento ousado: **a classificação como tira impressa** — linha do clube invertida em tinta
cheia, zonas marcadas por colchetes e símbolos `↑ G4` / `↓ Z4` + hachura, legíveis sem cor.
Estados: vazio (elenco sem resultado), carregando (rodapé da caixa de entrada + radar), erro
(radar do adversário com causa e "Tentar de novo").

## Verified

Path **B — blind** (probe: `read_image` recusou com *"model does not declare image input"*;
não houve olhar visual em nenhum momento).

`shot.mjs --full --deep`, 1440×900 e 1024×768, ambos exit 0:

| Medida | 1440 | 1024 |
| --- | --- | --- |
| `overflowX` | 0 | 0 |
| `offenders` | 0 | 0 |
| `clipped` (texto real, fora da classe `.sr-only`) | 0 | 0 |
| alvos < 24px | 0 (eram 6 botões de ordenação a 14px; corrigido com `min-height/min-width: 24px`) | 0 |
| `contrastFails` | 0 (eram 2: separador `·` e traço de situação a 2,17:1; agora `--muted`, ≈ 6,8:1) | 0 |
| `fontStatus` | `loaded` (Fira Sans/Condensed/Mono via `@font-face` local) | `loaded` |
| `headings` | h1 único, sem saltos (h1 → h2 → h3) | idem |
| `scrollHeight` | 1565px | 1807px |
| `focusables` | 16, ordem de DOM (skip link → tema → busca → chips → ordenação → retry) | 16 |

Dados conferidos por script sobre o próprio HTML: 18 jogadores, soma de gols = **34** = gols pró
da tabela (34–22); cartões 49 CA / 2 CV; 12 linhas de classificação, pontos = 3V+E em todas
(47, 45, 43, 42, 40, 38, 36, 34, 22, 20, 18, 16); gols por tempo 4+6+5+5+7+7 = 34; forma
V E V D V = 10/15 com 8–5; verba 4,2 mi / folha 1,86 de teto 2,39 = 78% / margem 530 mil.
Contraste do tema escuro calculado nos hex (ink 14,2:1; muted 6,6:1; accent 4,7:1; accent-ink
sobre accent 5,1:1) — **não** foi renderizado nem auditado pelo shot.

## Not verified

- Aparência, ritmo, hierarquia e atmosfera: nenhuma confirmação visual foi possível (agente cego).
- Tema escuro renderizado: só os pares de contraste foram calculados; layout, hachuras e a faixa
  invertida do clube no escuro não passaram pelo Chromium.
- Estados interativos em execução: hover, `:focus-visible`, ordenação por coluna, filtro vazio,
  "Tentar de novo" do radar, persistência do tema — o script mede só o render inicial.
- 390px e zoom 200%: não capturados nesta rodada (o CSS tem colapso em 860/560px, sem prova).
- 1024: a tabela do elenco rola dentro de `.table-wrap` (min-width 700px); a rolagem existe, mas
  a affordance visual dela não foi conferida a olho.

## Known gaps

- Classificação mostra 12 linhas (1–8, 17–20) com divisor explícito "9º a 16º"; as 8 linhas
  intermediárias ficam de fora por decisão de densidade, não por falta de dado.
- Sem página de detalhe de jogador, de mensagem ou de proposta: os itens são leitura, não links.
- Escudo é SVG inline desenhado (não é placeholder, não é URL externa); o adversário usa um
  monograma "N" em moldura — não é o escudo oficial do Náutico.
- O radar entrega 4 números fictícios após o retry; não há fonte real por trás.
