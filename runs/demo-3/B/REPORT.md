# Mesa — relatório de entrega

Brief: `runs/demo-3/BRIEF.md`. Plano e sistema: `PLAN.md` (escrito antes do código, também funciona como DESIGN.md).
Entrega em `runs/demo-3/B/`, HTML + CSS + JS vanilla, fontes locais em `fonts/`, nenhuma requisição de rede.

## O que foi construído

| Arquivo | Papel |
|---|---|
| `fila.html` | fila de cobrança, 9 contratos, ordenação por 8 colunas, filtro por status, busca, total da carteira |
| `contrato.html` | detalhe + composição do débito + histórico + simulador + registro de contato + encerrar como prejuízo |
| `carta.html` | carta de cobrança A4, uma página, sem navegação nem botões no papel |
| `styles.css` | tokens, dois temas, grade, tabela, estados, carta e `@media print` |
| `app.js` | dados da foto do core, cálculo, ordenação/filtro, simulador, notas, diálogo, teclado, URL |
| `scripts/shot.mjs` | medidor do brief (cópia do `ui-craft/scripts/shot.mjs`) |
| `scripts/probe.mjs` | sonda CDP própria: navega nas três páginas e lê o DOM (usada para tudo que não é pixel) |

## Decisões que o brief cobrava

**Divergência do CTR-7712.** A linha da fila ganha fundo de papel de carimbo, borda tracejada e o selo `divergência +36,00`; o detalhe repete a diferença em uma linha da própria composição (`10.175,75` pela regra × `10.139,75` no core, com a diferença nomeada). Nada é corrigido em silêncio: os dois números aparecem lado a lado.

**Saldo, não total.** `saldo = total − pago`. CTR-1188 mostra `16.166,80 − 4.000,00 = 12.166,80`. O simulador parte do saldo; a fila também — por isso o rodapé tem **dois** totais: `R$ 81.356,67` (soma dos saldos, o número operacional) e `R$ 81.392,67` (soma das composições, +36,00), com a frase que explica a diferença. Foi o único jeito de o resumo não mentir.

**Regra do simulador, declarada na tela.** Desconto incide **só sobre os juros**; base = saldo − desconto; parcela = base ÷ n arredondada ao centavo; total = parcela × n; economia = saldo − total. A conta aparece escrita (`#eq`) a cada mudança, com os valores usados. 12x/60% em CTR-1188 → 1.001,16 por parcela, 12.013,92 de total, 152,88 de economia.

**Status sem cor.** Cada status tem glifo (○ ◔ ■ ◧ ×), palavra e estilo de borda próprios. Cor é reforço, nunca o único portador.

**Prioridade.** A linha de maior saldo (Ademir Fontes) recebe a barra de atenção na borda esquerda e o texto do cabeçalho diz por quê: *a ligação de agora*.

**Fila ordenada na largura.** Em 1440px a tabela tem 8 colunas; em ≤1024 contrato/venceu/última viram uma segunda linha meta dentro da célula de cliente; em ≤560 saem dias e a largura de saldo/status encolhe. Nunca há rolagem horizontal.

**Encerrar como prejuízo.** Diálogo nomeia contrato, cliente e saldo, exige marcar "confirmo" (botão fica `disabled` até marcar) e, depois de confirmar, mostra faixa permanente no painel + toast com **desfazer por 8 s**.

**Teclado.** `/` foca a busca; `j`/`k` e setas movem a seleção com foco real no link da linha; `Enter` abre (é um `<a href>`); `Esc` volta de contrato para fila e de carta para o contrato; `Ctrl/Cmd+K` abre a paleta de comandos (contratos + ações).

**URL reflete o estado.** Fila: `?q=&status=&ordem=&dir=` via `history.replaceState` a cada mudança, e a URL é lida na carga. Contrato: `?c=&parcelas=&desconto=` atualizado ao vivo. Carta: `?c=`.

**Carta.** Folha de 794×1123 px (210×297 mm no print), tinta sobre papel, `@page A4 margin 0`, sem barra de navegação na impressão, `break-inside: avoid` nos blocos de valores/pagamento/assinatura.

## Medições (agente cego — não vi nenhum pixel)

Sem visão: não afirmo julgamento estético. Verifiquei geometria, contraste calculado e comportamento por medição, com as cinco ordens exatas do brief e com `scripts/probe.mjs`.

| Arquivo | viewport | `overflowX` | `clipped` | alvos < 24px | `contrastFails` | altura |
|---|---|---|---|---|---|---|
| shot-1440.png | 1440×900 | 0 | 0 | 0 | 0 | 940 |
| shot-1440-dark.png | 1440×900 (escuro) | 0 | 0 | 0 | 0 | 940 |
| shot-1024.png | 1024×768 | 0 | — | — | — | 1014 |
| shot-320.png | 320×800 | 0 | 0 | 0 | 0 | 1886 |
| shot-carta.png | 794×1123 (print) | 0 | — | — | — | 1123 = uma página |

Estados medidos por DOM (`scripts/probe.mjs`):

- 9 linhas, contagem "9 de 9 contratos", total `81.356,67`, nota com as duas somas, 1 linha marcada, 1 linha prioritária;
- ordenação por saldo: 28.876,50 → 945,48, `aria-sort` correto em todas as colunas; ordenar por dias → Cleuza (127), Marisa (71), Heloísa (68);
- filtro "acordo" → "2 de 9"; busca sem resultado → estado vazio com "limpar filtros" e foco de volta na busca;
- `j`/`k` movem o foco entre as linhas com `href` real (`contrato.html?c=CTR-6104`); `/` foca a busca;
- composição do CTR-1188: 15.600,00 + 254,80 + 312,00 = 16.166,80, pago −4.000,00, saldo 12.166,80, cada linha com a conta ao lado;
- simulador: 1x/0% → 12.166,80 / 12.166,80 / 0,00; 12x/60% → 1.001,16 / 12.013,92 / 152,88, coerente com a URL `?parcelas=12&desconto=60`;
- encerrar: diálogo abre com foco no "confirmo", confirmar desabilitado até marcar, depois faixa + toast + desfazer;
- estados: `fila.html?estado=erro`, `contrato.html?estado=carregando` (`aria-busy="true"`), `contrato.html?vazio=1`, `contrato.html?estado=erro` acendem os blocos certos.

`clipped`/alvos/contraste em 1024 e na carta não foram medidos: essas duas ordens do brief rodam sem `--deep`, então só o overflow é medido ali; para a carta o contraste foi conferido à mão sobre os hex (tinta #141610 sobre #FFFFFF = 18,23; secundária #2A2C24 = 14,15).

Todos os contrastes foram calculados sobre os hex reais do arquivo (texto normal ≥ 4,5:1; texto grande/UI ≥ 3:1): claro — tinta 15,54 / tinta-2 9,12 / apagado 5,67 / atenção 7,49 / perigo 7,11 / carimbo 6,91; escuro (sobre o painel #171B14) — 14,10 / 10,37 / 6,53 / 7,26 / 7,30 / carimbo 8,97.

## Arquivos

`fila.html` `contrato.html` `carta.html` `styles.css` (1.510 linhas) `app.js` (1.331 linhas) `PLAN.md` `REPORT.md`
`shot-1440.png` `shot-1440-dark.png` `shot-1024.png` `shot-320.png` `shot-carta.png`
extras: `shot-contrato-1440.png`, `shot-carta-1440.png`, `shot-carta-320.png`
`fonts/` (Fira Sans 400/500/600, Fira Sans Condensed 600/700, Fira Mono 400), `scripts/`.

```
Decided:        direção "Data Dense / Ops + Swiss"; paleta Papel & Carimbo (papel #F2F1E9, tinta #171A12, atenção verde-farol #0C5749, carimbo #F3E3BD/#5F4708, perigo #96271E); Fira Sans para texto, Fira Sans Condensed nos títulos e totais, Fira Mono nos números de referência
Verified:       as cinco ordens do brief (1440 claro/escuro, 1024, 320, carta 794×1123 print) — overflowX 0, clipped 0, alvos <24px 0, contrastFails 0, fontes carregadas; comportamento por sonda DOM: ordenação+aria-sort, filtro, vazio, j/k/Enter, simulador 1x/0% e 12x/60%, encerrar+desfazer, quatro estados de carga/erro/vazio, URL refletindo q/status/ordem/dir e c/parcelas/desconto
Not verified:   julgamento visual (agente cego, não recebo imagens) — não afirmo que "ficou bonito"; tema escuro medido só na fila 1440; leitor de tela real; paginação do PDF além da altura medida (1123px = uma página a 96dpi); preenchimento do diálogo em 200% de zoom
Known gaps:     sem backend/estado persistente (notas e encerramentos em sessionStorage); paleta de comandos cobre contratos e ações da página atual, não histórico global; histórico de pagamentos só renderiza as entradas da foto do core (CTR-1188 tem uma); sem exportação/impressão em lote
```
