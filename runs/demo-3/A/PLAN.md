# Mesa — plano de direção

**Direção: caderno de operação, não dashboard.** A tela se comporta como uma folha de livro-caixa
de mesa de cobrança: papel quente, tinta, fios de 1px, números em monoespaçada alinhados à direita,
rótulos em versalete. Nada de cartão branco flutuando em cinza, nada de sombra. A hierarquia vem de
escala tipográfica e de réguas, não de caixas. O movimento central é **a régua do atraso**: os dias
em atraso de cada contrato são desenhados numa única escala de 0–130 dias, com marcas a cada 30,
impressa no cabeçalho da coluna — a pergunta "quem eu ligo agora" vira leitura de posição, não de
número solto.

## Paleta (claro / escuro por papel, nunca inversão)

| papel | claro | escuro |
|---|---|---|
| papel (fundo) | `#EFEBE0` | `#0E1413` |
| superfície (tabela/painel) | `#F8F5ED` | `#141E1B` |
| superfície 2 (hover/seleção) | `#E5DFD0` | `#1C2824` |
| tinta | `#131A1C` | `#EAE6D8` |
| tinta 2 | `#3B4448` | `#C4CCC5` |
| tinta 3 (rótulos) | `#5B6468` | `#98A49E` |
| fio | `#D3CCBC` | `#2B3A34` |
| fio forte | `#ADA492` | `#465A52` |
| sinal (atraso/ação) | `#9C3A18` | `#F19A72` |
| promessa | `#1F4B73` | `#93BDE4` |
| acordo | `#0F544A` | `#6FD2BE` |
| recusa | `#68284D` | `#DCA3CD` |
| parcial | `#6E4308` | `#E7C07A` |
| divergência (fundo) | `#F5EBD6` | `#2B2413` |

Contraste medido: tinta 14,8:1; tinta 3 5,1:1 no papel e 5,6:1 na superfície; acentos 5,8–9,6:1.

## Tipografia

- **Fira Sans Condensed 600/700** — manchete, total da carteira (62px), nome do cliente (44px),
  título da carta. Tracking levemente negativo.
- **Fira Sans 400/500/600** — texto, tabela, controles. Base 15px, tabela 14px.
- **Fira Mono 400** — dinheiro, códigos de contrato, datas da tabela, dias, parcelas. Tabular.
- Rótulos: 11px, versalete, `letter-spacing .09em`, tinta 3.

## Layout por página

**fila.html** — barra fixa (marca, nav Fila/Contrato/Carta, busca com `/`, tema, `⌘K`).
Faixa da carteira: total em atraso (soma dos **saldos**) em 62px à esquerda; à direita quatro
números (contratos, em acordo, divergência, parcial). Abaixo, filtros por status e contagem.
Tabela: `#` (ordem de risco), cliente, contrato, vencimento, dias + régua, saldo, status, última
tentativa. Cabeçalhos ordenáveis, indicador de risco na legenda da régua. Rodapé declara a regra
de encargos e a fórmula de risco.

**contrato.html** — cabeçalho com nome, contrato, status, vencimento, dias e ações (carta,
registrar contato, encerrar). Duas colunas: composição do débito e simulador à esquerda; histórico
de pagamentos e registro de contato à direita. Composição fecha em **saldo** = total − pago;
CTR-1188 mostra o parcial de 4.000,00. Simulador parte do saldo, desconto incidindo só sobre juros,
parcela = total ÷ n arredondada ao centavo, última parcela absorve a diferença.

**carta.html** — folha A4 794×1123, papel branco, tinta preta, sem chrome de aplicativo, sem sombra
(na tela, fio de 1px sobre a mesa). Cabeçalho do banco, data, destinatário, aviso, bloco de valores
com `break-inside: avoid`, prazo, canais, rodapé. Nenhum link, nenhum botão.

## Estados

- **fila:** filtro/busca sem resultado → bloco vazio com os filtros ativos e "limpar"; seleção por
  teclado; linha divergente marcada por fundo âmbar + selo `Δ 36,00` com a soma da composição ao lado.
- **contrato:** skeleton de carregamento (240ms); erro nomeado quando o contrato não existe, com
  link de volta; vazio no histórico (sem pagamentos); confirmação destrutiva com nome e valor,
  caixa de ciência e desfazer em 8s.
- **carta:** erro de contrato inexistente; impressão em uma página.
- **320px:** tabela vira blocos (cliente/valor na primeira linha; contrato, dias e status na
  segunda); régua encolhe, vencimento e última tentativa saem. 1024px mantém a tabela.
- Teclado: `/`, `j`/`k`/setas, `Enter`, `Esc`, `⌘/Ctrl+K`; foco devolvido à linha ao voltar.
