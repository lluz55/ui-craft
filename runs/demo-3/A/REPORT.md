# Mesa — relatório de construção e verificação

Direção: **caderno de operação, não dashboard.** Papel quente, tinta, fios de 1px, nada de cartões
flutuantes ou sombra. Hierarquia por escala tipográfica e réguas. Paleta de papéis (papel, superfície,
tinta, fio, sinal, promessa, acordo, recusa, parcial, divergência) com hex fixos em `styles.css`;
tema escuro é **remapeamento por papel** (`:root[data-theme="dark"]` e `prefers-color-scheme`), nunca
inversão. Tipografia: Fira Sans Condensed 600/700 (manchete, total da carteira, nome do cliente),
Fira Sans 400/500/600 (UI, tabela), Fira Mono (dinheiro, contratos, datas, parcelas, teclas).
Arquivos de fonte locais em `fonts/` (6 TTF), sem requisição de rede.

Movimento central: **a régua do atraso** — uma escala única de 0–130 dias no cabeçalho da coluna
"dias", cada contrato desenhado como barra na mesma escala (marcas a cada 30 dias, barra em tinta
até 89 dias e em sinal a partir de 90). A pergunta "quem eu ligo agora" vira leitura de posição.

## Dados

Números conferidos por recomputação a partir do array `CONTRATOS` (centavos):

- juros = principal × dias ÷ 3000 (1% ao mês pro rata die) — fecha nos 9 contratos;
- multa = 2% do principal — fecha nos 9;
- total = principal + juros + multa — fecha em 8; **CTR-7712 é deliberadamente divergente**:
  composição 10.175,75 contra total 10.139,75, Δ 36,00. Exibido como selo `divergência` + `Δ 36,00`
  + `soma 10.175,75` na fila, e no detalhe como linha `comp-delta` + aviso; o valor cobrado é o total
  do contrato, nunca corrigido em silêncio.
- **CTR-1188 tem pagamento parcial de 4.000,00 (20/10)**: saldo = total − pago = 12.166,80; a fila
  mostra o saldo, o simulador parte do saldo (nunca do total) e o detalhe diz explicitamente
  "o saldo devedor é R$ 12.166,80, não o total".
- Carteira: soma dos **saldos** = R$ 81.356,67 (9 contratos, 2 em acordo, 1 divergência, 1 parcial).
- Carta de CTR-1188: data 19/11/2026, prazo 4/12/2026 (15 dias), valor 12.166,80.

## Medições (shot.mjs, Chromium headless, CDP)

| página | viewport | modo | overflowX | scrollW | altura | clipped | small | contrastFails |
|---|---|---|---|---|---|---|---|---|
| fila | 1440×900 | light `--full --deep` | 0 | 1440 | 1147 | 0 | 0 | 0 |
| fila | 1440×900 | dark `--full --deep --dark` | 0 | 1440 | 1147 | 0 | 0 | 0 |
| fila | 1024×768 | light `--full` | 0 | 1024 | 1197 | — | — | — |
| fila | 320×800 | light `--full --deep` | 0 | 320 | 1947 | 0 | 0 | 0 |
| fila | 720×900 (proxy de zoom 200%) | light `--full --deep` | 0 | 720 | 1442 | 0 | 0 | 0 |
| contrato | 1440×1400 | light `--full --deep` | 0 | 1440 | 1400 | 0 | 0 | 0 |
| contrato | 1440×1400 | dark `--full --deep --dark` | 0 | 1440 | 1400 | 0 | 0 | 0 |
| carta | 794×1123 | `--full --print` | 0 | 794 | **1123** | — | — | — |
| carta | 320×800 | light `--full --deep` | 0 | 320 | 1080 | 0 | 0 | 0 |

`fontStatus: loaded` (6 faces) na fila. Cabeçalhos na fila: `h1 Fila de cobrança — contratos em
atraso por risco`; no contrato: `h1 Detalhe do contrato`, `h1 Osvaldo Reis`, e um `h2` por seção
(composição, simulador, pagamentos, registro, encerrar). Alvos de toque: nenhum `<a>/<button>/
<input>/<select>` abaixo de 24px depois de corrigir a nav e a migalha da ficha.

Contraste: todos os pares de texto medidos passam. Amostra da rodada: tinta sobre papel 14,79:1;
rótulo 5,08–5,56:1; sinal 5,81:1 sobre papel e 6,36:1 sobre superfície; status 7,14–8,82:1; selo
`divergência` 7,23:1 sobre o fundo âmbar; total 14,79:1. Nenhum par reprovado em claro ou escuro.

Estados exercitados por medição (arquivos temporários de redirecionamento, apagados depois):
fila sem resultado (`fila.html?q=zzz`) → painel vazio, `overflowX 0`, sem alvos pequenos, sem falha
de contraste; contrato inexistente (`contrato.html?contrato=CTR-0000`) → `h1 "Não foi possível abrir
o contrato CTR-0000."` com `overflowX 0`. Skeleton de carregamento existe (240 ms) e é substituído
antes da captura de 900 ms do script; o erro de contrato não mostra dado inventado.

## Conferência de comportamento por leitura de código (não por automação)

- Ordenação: todas as colunas, asc/desc, `aria-sort` no `th`, URL `?sort=&dir=` via
  `history.replaceState`; o select `#ordenar` aparece só ≤760px.
- Filtro por status (`aria-pressed`) + busca por nome/contrato; `q`/`status` restaurados da URL.
- Teclado: `/` foca busca, `j`/`k`/setas movem seleção (`?sel=`, `scrollIntoView`), `Enter` abre o
  contrato, `Esc` limpa busca → desfoca → volta à fila, `Ctrl/Cmd+K` abre a paleta (listbox com
  setas/Enter/Esc, foco devolvido ao fechar).
- Encerrar como prejuízo: diálogo nomeia contrato e saldo, caixa de ciência libera o botão, o
  contrato sai da fila e o total recalcula; desfazer por 8 s no toast (barra de progresso), estado
  em `sessionStorage`.
- Tema: alterna `data-theme`, persiste `localStorage["mesa.tema"]`, `aria-pressed` acompanha.

Decided: direção "caderno de operação" com a régua do atraso como movimento central; paleta de
papéis com tema escuro remapeado (não invertido); Fira Sans Condensed + Fira Sans + Fira Mono locais;
divergência de CTR-7712 exibida onde o número aparece, sem correção silenciosa; saldo (total − pago)
como base de fila, carteira, simulador e carta; contrato padrão do detalhe/carta = CTR-1188 por ser
o caso com pagamento parcial; carta A4 sem chrome de aplicativo.
Verificado: matemática dos 9 contratos por recomputação; soma da carteira 81.356,67; as 9 medições
acima com `overflowX 0`, `clipped` vazio, `small` vazio e `contrastFails` vazio (exceto os dois
`--full` sem `--deep`, em que só o overflow foi medido); `fontStatus: loaded`; carta em exatamente
1123 px de altura (uma página, sem quebra do bloco de valores); estados vazio e erro por medição.
Não verificado: **aparência visual** — o modelo desta sessão não aceita imagem (a leitura de
`shot-1440.png` falhou com "does not declare image input"), então nada aqui foi julgado a olho; a
composição foi conduzida por medição (geometria, overflow, truncamento, alvos, contraste) e não por
inspeção da captura. Também não foram automatizados: pressionamento real de teclas, a sequência
encerrar/desfazer, a impressão em PDF (a prévia foi medida em viewport 794×1123) e o comportamento
em navegador além do Chromium do script.
Lacunas conhecidas: a régua não é auditada quanto à fidelidade da barra (só existe por CSS, sem
medição de pixel); o tema escuro da carta é intencionalmente ausente (a folha continua branca sobre
mesa escura); a paleta de comandos e o toast dependem de `dialog`/`position: fixed` e não foram
medidos em 320px; os textos de ajuda assumem a data fixa 19/11/2026 embutida no app (os "dias em
atraso" são os do enunciado, não calculados do relógio).
