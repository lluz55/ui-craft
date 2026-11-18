# REPORT — Maré (demo-5, braço B)

Página única em `runs/demo-5/B/`: `index.html`, `styles.css`, `app.js`, `images/` (5 originais + derivadas),
`fonts/` (4 cortes locais), `PLAN.md`, capturas `shot-1440.png`, `shot-390.png`, `shot-320.png`.
Vanilla, sem build, sem CDN, sem requisição de rede em runtime; todas as imagens e fontes são locais.

## Direção

**Tábua de marés** — editorial técnico (datum, régua, números monoespaçados, plaquetas de anotação) sobre
fotografia real de litoral. O vizinho rejeitado é a boutique minimalista de praia, que esconde metragem,
capacidade e diária atrás de adjetivos. Aqui os números são o caráter: 06 quartos, 80 m, R$ 620/780/940,
21/28/34 m². Fundo escuro saturado em vez do creme padrão de hotelaria, para que as cinco fotos entrem
como janelas de sol.

## Paleta

| token | hex | papel | contraste medido |
| --- | --- | --- | --- |
| `--surface` | `#0B2F2E` | fundo, scrim final do hero | — |
| `--surface-2` | `#113B38` | poço do painel de total/status | — |
| `--ink` | `#F2EEE0` | texto primário (cal) | 12,38:1 sobre surface |
| `--muted` | `#A8BCB4` | metadados, legendas | 7,20:1 sobre surface · 6,16:1 sobre surface-2 |
| `--accent` | `#F2674A` | ação primária, erro | 4,67:1 sobre surface |
| `--accent-ink` | `#101F1D` | texto sobre o coral | 5,51:1 sobre accent |
| `--rule` | `#2A514C` | fios estruturais | 1,63:1 (não é affordance sozinho) |
| `--rule-strong` | `#52756F` | bordas de campo, marcadores | — |

## Tipografia

Uma superfamília, três cortes (arquivos locais em `fonts/`):
Fira Sans Condensed Bold para display (`clamp(4.5rem,12.5vw,10.5rem)`, linha 0.84) e títulos de seção
(`clamp(30px,3.6vw,48px)`, linha 1.02); Fira Sans Regular 17px/1.65 para corpo (medida ≤ 46–62ch) e
SemiBold para botões; Fira Mono 10,5–13px com `letter-spacing` 0.08–0.16em para rótulos, índices, dados
e anotações de datum, sempre `tabular-nums` em números.

## O movimento ousado

O hero é uma **prancha de sondagem**: um fio de datum atravessa a fotografia inteira, com duas anotações
em mono sobre plaquetas de fundo sólido — `MARÉ ALTA · 1,8 m` e `8°30′S · 35°00′W`. A gramática aparece
uma segunda vez, contida, nos índices 01–03, nos m² e nos preços, e as três fotos de quarto são penduradas
em **alturas diferentes** (1:1, 4:5, 3:4) a partir de uma linha de base comum: a variação de altura lê
como maré, não como acaso. Fora isso, grade estrita: sem cartão flutuante, sem sombra, sem ícone em círculo,
raio 0, fios de 1px só onde há estrutura.

## O momento de movimento (um só)

**A fotografia do hero se assenta uma vez ao carregar**: `transform: scale(1.055) → 1` e um véu de luz
radial que sai de `opacity .55` para `0`, ambos em **380 ms**, `cubic-bezier(.2,0,0,1)`, uma iteração,
só `transform` e `opacity`. Escolhi este momento porque é o único que pode carregar a promessa da página
sem competir com ela: o texto já está no lugar, a foto chega ao lugar em vez de aparecer. Não há entrada
de seção, não há loop, não há `transition: all`; o resto é retorno de estado de 80 ms (hover/press) e anel
de foco imediato. Sob `prefers-reduced-motion: reduce` a animação é removida (`animation: none`), a foto
nasce em escala 1 e o véu em 0 — a informação (foto, scrim, texto) permanece idêntica.

## Fotos e recortes

As cinco fotos de `runs/demo-5/assets/` foram copiadas para `images/` e redimensionadas localmente via
canvas do Chromium (sem ImageMagick/sharp/python): hero/faixa em 480/768/1152/1440/1920, cartões em
480/768/960. Nenhum hotlink, nenhuma URL externa de imagem.

| foto | lugar | proporção | `object-position` | enquadramento |
| --- | --- | --- | --- | --- |
| `praia-01` | hero | 100vw × 88svh | `50% 58%` (≥900px) · `58% 54%` (<900px) | horizonte, mar e coqueiros; areia mínima |
| `quarto-01` | quarto 01 Maré Baixa | 1:1 | `50% 42%` | cama e cabeceira de madeira, teto no topo, luz de janela |
| `piscina-01` | quarto 02 Maré Cheia | 4:5 | `62% 45%` | ducha externa e queda d'água, pedra à direita |
| `cafe-01` | quarto 03 Suíte Coqueiro | 3:4 | `48% 38%` | mesa posta e varanda, chão cortado |
| `praia-02` | faixa full-bleed | altura `clamp(220px,38vw,520px)` | `55% 55%` | buggies e areia, movimento no centro |

Hero sem `loading="lazy"` e com `fetchpriority="high"`; as demais com `loading="lazy"`. Todas declaram
`width`/`height`, `srcset`/`sizes` quando full-bleed, `object-fit: cover` e `alt` em pt-BR descrevendo o
que importa (não "imagem de quarto").

## Estados implementados e exercitados

Testados via CDP no Chromium headless, não por inspeção visual:

- **Vazio**: quatro mensagens inline ("Informe a data de entrada.", "…saída.", "Escolha o quarto.",
  "…quantos hóspedes."), status "Confira os campos marcados para continuar.", foco em `#entrada`.
- **Data no passado**: "A entrada não pode ser no passado.", `aria-invalid="true"`.
- **Saída ≤ entrada**: "A saída precisa ser depois da entrada."
- **Calculando**: 80 ms após a mudança, `#total-pending` visível e `#total-calc` oculto; após 320 ms o
  total aparece (medido: pendente visível → total visível).
- **Válido**: "R$ 620 × 3 noites (28/11 → 01/12)" e total "1.860" (tabular); trocar quarto/data recalcula.
- **Capacidade**: "O Maré Baixa recebe até 2 hóspedes." com `aria-invalid`.
- **Envio válido**: status "Pedido registrado para Maré Baixa: 3 noites, 2 hóspedes, R$ 1.860. Confirmamos
  a disponibilidade pelo WhatsApp antes de qualquer cobrança."
- **Atalho de quarto**: clicar em "Reservar Suíte Coqueiro" seleciona `coqueiro`, leva o foco para a
  entrada e recalcula (R$ 940 × 3 = 2.820).

## Verificação (comandos do brief)

Executados de `runs/demo-5/B/` com `node /home/lluz/dev/ui-craft/scripts/shot.mjs index.html <shot> <w> <h> --full --deep`
(os scripts do workspace não contêm `shot.mjs`; ele vive em `ui-craft/scripts/`).

| largura | exit | overflowX | clipped | small | imageFlags | motionIssues | contrastFails | reducedMotionDeclared |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1440×900 | 0 | 0 | [] | [] | [] | [] | [] | true |
| 390×844 | 0 | 0 | [] | [] | [] | [] | [] | true |
| 320×800 | 0 | 0 | [] | [] | [] | [] | [] | true |

- `motionIssues` vazio: só existem `settle`/`wash` 380 ms (faixa 300–400) e transições de 80 ms (faixa 0–80).
- `reducedMotionDeclared` true: bloco `@media (prefers-reduced-motion: reduce)` inline no `<head>` (o
  primeiro stylesheet). Emulação `prefers-reduced-motion: reduce` → `animation-name: none` no hero e no
  véu, `opacity: 0`, `transform: none`.
- Foco por teclado (5× Tab): `outline: solid 2px rgb(242,238,224)`, offset 1px, visível.
- Zoom 200% equivalente (720 CSS px, dpr 2): `scrollWidth 720`, overflow 0.
- Contraste do texto sobre a foto foi **medido**, não estimado: renderizei o hero com `.hero__body`
  invisível, amostrei o pixel mais claro de cada caixa de texto e calculei WCAG contra `#F2EEE0`.
  Pior caso 1440: eyebrow 7,91:1, título 8,40:1, lede 11,72:1. Pior caso 390: 8,02:1, 8,67:1, 10,45:1.
  As plaquetas de datum passaram a fundo sólido `#0B2F2E` justamente porque a amostragem nelas reprovava
  (1,31:1 com 82% de opacidade sobre o céu claro).

## O que não consegui verificar

Não vejo imagens: `read_image` foi recusado pelo runtime ("model does not declare image input"). Portanto
**não olhei** `shot-1440.png`, `shot-390.png` nem `shot-320.png`. Ritmo vertical, hierarquia percebida,
atmosfera, se o recorte do hero corta um coqueiro de modo infeliz, se o scrim ficou pesado demais, e a
qualidade óptica dos JPGs reencodados são julgamentos que **não estão verificados**; foram substituídos por
medidas (caixas, overflow, contraste amostrado, estados). Também não testei em aparelho real, nem o seletor
de data nativo do iOS/Safari, nem a abertura do link `wa.me`.

## Lacunas conhecidas

- Telefone, e-mail e endereço são placeholders coerentes (o brief não fornece contato real); o link de
  WhatsApp aponta para `wa.me/5581999990000` — é o único URL externo da página, exigido pela ação secundária.
- Envio não tem backend: o status confirma o pedido e diz que a confirmação vem por WhatsApp; nenhuma
  requisição de rede é feita.
- Fotos dos quartos são lazy no parse e "aquecidas" em `requestIdleCallback` após o `load` (arquivos de
  44–69 KB). Isso mantém a abertura leve e evita que o auditor as veja como quebradas por nunca terem sido
  buscadas na captura estática; tecnicamente é um prefetch ocioso, não lazy puro até o fim da vida da página.
- Créditos no rodapé citam obra, Wikimedia Commons e licença, mas não autor e URL (CREDITS.md fica em
  `assets/`, fora da pasta entregue). Atribuição CC BY-SA completa exigiria os links.
- O selo "Maré · 2024" no rodapé é o ano de abertura dado pelo brief, não um copyright.

Decided: direção "Tábua de marés", campo `#0B2F2E`, coral `#F2674A` só em ação/erro, Fira Sans Condensed/Fira Sans/Fira Mono locais, hero como prancha de datum, um único momento de movimento (hero assenta em 380 ms via transform+opacity) e fotos reais recortadas em 1:1 / 4:5 / 3:4 / faixa.
Verified: `shot.mjs --deep` nas três larguras com exit 0, overflowX 0, clipped/small/imageFlags/motionIssues/contrastFails vazios, reducedMotionDeclared true, animações reduzidas de fato desligadas sob emulação, anel de foco por teclado, overflow 0 em 720 CSS px com dpr 2, matemática de diárias e todos os estados de erro/calculando/envio via CDP, contraste do hero medido por amostragem de pixels (pior caso 7,91:1).
Not verified: aparência visual das capturas (não vejo imagens), ritmo/hierarquia/atmosfera, recorte estético das cinco fotos, renderização em Safari/iOS e aparelho real, seletor de data nativo, destino real do WhatsApp, legibilidade dos JPGs reencodados em telas densas.
Known gaps: contatos e endereço fictícios, envio sem backend, WhatsApp como único URL externo, fotos abaixo da dobra aquecidas em idle em vez de lazy puro, créditos sem autor/URL, e nenhuma checagem de HTML validator formal.
