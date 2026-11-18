# Atlético Boa Vista — hub do clube · RELATÓRIO

## O que foi entregue

Superfície única de operação do clube (não landing page), em pt-BR, HTML/CSS estáticos + JS
vanilla sem dependências: identidade em faixa, próximo jogo com disponibilidade do elenco,
elenco de 18 atletas ordenável e filtrável, tabela de 12 linhas da Série B com zonas e corte
explícito, duas leituras de dados, caixa de entrada em faixa (1 não lida) e finanças em uma
linha. Tema claro e escuro completos, sem nenhum request externo (só pilhas de fonte locais).

## Direção

Caderno de campo. Papel quente (#F2EEE4), tinta (#191C1A), fios de 1px, nenhum card, nenhuma
sombra. Hierarquia por fio, margem anotada (rótulos 01–06 em mono caixa alta na coluna de 96px)
e escala tipográfica: serifada editorial para nome do clube e times, sans de sistema com
`tabular-nums` para dados, mono para rótulos e unidades.

O movimento ousado é **a fita de ocre**: ocre saturado (#E3A84A) só existe em dois lugares — a
linha do clube na tabela, que sangra até a borda direita da viewport e corta o fio da coluna, e o
número da margem de transferências. O escuro (#171613) reatribui papéis em vez de inverter: o ocre
sobe de luminância e passa a ser fonte de luz; o verde-água clareia para continuar distinguível na
série dupla do gráfico de gols.

## O que foi medido

`shot.mjs` (1440×900 e 1024×768, `--full --deep`):

| largura | overflowX | clipped | small | contrastFails | scrollHeight | fontes |
| --- | --- | --- | --- | --- | --- | --- |
| 1440 | 0 | [] | [] | [] | 1303 | loaded |
| 1024 | 0 | [] | [] | [] | 1381 | loaded |
| 1440 `--dark` | 0 | [] | [] | [] | 1303 | loaded |

Geometria medida por CDP (script descartável, removido do diretório):

- 1440: masthead 75px; colunas 976,7 / 400 separadas por fio; `table.ladder` termina em x=1440
  (a sangria funciona) e o número de pontos continua alinhado na margem de 1408.
- 1024: colunas 659 / 320, rótulos colapsam acima das seções, alturas finais 1.011 / 1.003px
  (10px de diferença entre as colunas). Uma segunda tentativa de remedir a altura das colunas em
  1440 falhou (o chromium não subiu fora do shot.mjs e o script foi descartado), então a única
  medida de altura em 1440 que sustento é o scrollHeight de 1.303px do shot.
- Nenhum texto transbordando (`scrollWidth > clientWidth` com `overflow: visible`) em 1440 ou 1024
  — foi assim que a fita de forma foi pega vazando e reescrita como bobina de 5 linhas.
- Estados exercitados no browser trocando `data-state` nas duas regiões: elenco
  carregando/vazio/erro = 169/126/143px; leituras = 137/143/143px; `.region-body` esconde nos três
  e volta em `ready`. Nenhum estado com altura zero.
- 25 elementos focáveis, `aria-sort` nos cabeçalhos ordenáveis, `aria-busy` durante carregamento.
- Consistência aritmética conferida por script: 24 J · 11V 8E 5D = 41 pts; 34 gols pró, 26 contra,
  +8; soma dos gols dos 18 atletas = 34; gols por tempo 4+6+5+7+8+4 = 34 e 5+3+4+4+5+5 = 26;
  casa 27 + fora 14 = 41; 13,8 comprometido de 18,0 → margem 4,2 e 76,7%.

## Arquivos

`index.html`, `styles.css`, `app.js`, `PLAN.md`, `shot-1440.png`, `shot-1024.png`,
`shot-1440-dark.png` (evidência extra do tema escuro).

## Bloco final

**Decided:** caderno de campo em vez de dashboard — papel, fio, margem anotada e serifada
editorial; ocre saturado como único preenchimento e só em duas ocorrências (linha do clube
sangrando até a borda + número de transferências); caixa de entrada promovida a faixa de largura
inteira para equilibrar as colunas (955px × 945px) em vez de deixar um vazio na base; forma dos
últimos 5 jogos como bobina vertical de 5 linhas, porque em 5 colunas o nome "Petrolina" vazava a
célula em 1024.

**Verified:** medidas de `shot.mjs` em 1440 e 1024 (overflowX 0, clipped/small/contrastFails
vazios, fontes carregadas, sem overflow horizontal); geometria de colunas, sangria da tabela e
alinhamento de margem por CDP; ausência de texto transbordando nos dois breakpoints; os três
estados das duas regiões exercitados no browser com alturas não-zero; contraste do tema escuro
auditado a 1440.

**Not verified:** não vi os renders — este modelo não aceita entrada de imagem, então nada aqui é
julgamento visual. Não exercitei por clique a ordenação, os filtros, a busca, os menus de estado
nem a troca de tema (verificados só por leitura do código e pela marcação `aria`/`data-`);
não testei leitor de tela, teclado real, impressão nem larguras abaixo de 1024.

**Known gaps:** os dados são fixos (não há backend; erro e carregamento são simulados); acima de
1620px de viewport a página para de crescer, então a fita de ocre termina na margem e não na
borda; o tema escuro foi auditado apenas em 1440 e apenas por contraste automatizado.
