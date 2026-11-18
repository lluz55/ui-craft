# Atlético Boa Vista — hub do clube · PLANO

## Direção

**Caderno de campo, não dashboard.** A tela é uma folha de operação: papel quente, tinta, fios de
1px. Nada de card branco com sombra — a hierarquia vem de **fios, margem anotada e escala
tipográfica**, não de caixas. Cada seção tem um rótulo numerado na margem esquerda (01–06), como
itens de um dossiê de jogo; a coluna de conteúdo nunca se move. A tabela da competição fica na
coluna direita, sempre visível: o olho do treinador pousa nela sem procurar.

Identidade do clube em **faixa**, não em banner: escudo desenhado em SVG inline (sol sobre o
Capibaribe), nome em serifada, quatro métricas em linha e a fita de forma dos últimos 5 jogos.

## Paleta (papéis, não cores)

Tema claro — *papel*: `#F2EEE4` papel · `#FAF7EF` papel-alto (cabeçalho fixo) · `#191C1A` tinta ·
`#565B54` tinta-fraca · `#C9C2B0` fio · `#B3AB96` fio-forte · `#7C4A05` ocre-tinta (acento textual) ·
`#E3A84A` ocre-fita (único preenchimento saturado) · `#1F5C55` verde-água (2ª série de dados) ·
`#A33A2C` alerta.

Tema escuro — *vestiário*: `#171613` papel · `#1F1E19` papel-alto · `#EFE9DC` tinta · `#B6AE9E`
tinta-fraca · `#332F27` fio · `#4A4539` fio-forte · `#E8B86B` ocre-tinta · `#D9A857` ocre-fita ·
`#7FBFB4` verde-água · `#E0796A` alerta.

Reatribuição no escuro: o ocre sobe de luminância e vira **fonte de luz** (números e barras), o
verde-água clareia para continuar distinguível do ocre na série dupla, e as superfícies não são
"branco invertido" — são papel-alto com 4 pontos de calor a mais que o fundo. A fita de ocre
mantém tinta escura por cima nos dois temas: é um bloco sólido, não um realce.

## Tipografia

- **Serifada editorial** (Iowan/Palatino/Georgia, pilha local): nome do clube, títulos de seção e
  nomes dos times na tabela. Autoridade de jornal esportivo, sem CDN.
- **Sans de sistema** (`system-ui`): corpo, tabelas, controles. Números com `tabular-nums`.
- **Mono de sistema**: rótulos em caixa alta 10–11px, `letter-spacing .09em` — a "caneta" do
  caderno: rótulos de coluna, unidades, tempos, posições.

Escala: 32/22/18/15/13/12/11/10. Dados em 12.5px com `line-height 1.3`; só as legendas mono
(rodapés de tabela, "R20", unidades) descem a 8.5px, sempre em caixa alta e com `letter-spacing`.

## Layout

Grade de duas colunas: conteúdo `minmax(0,1fr)` + coluna de 400px (tabela da competição +
leituras), separadas por fio vertical. A **caixa de entrada** sai da coluna e vira faixa de
largura inteira acima das finanças — quatro mensagens lado a lado; as finanças fecham como linha
de balanço. Seções separadas por fio horizontal, `padding-block 17px`, rótulo na margem de 96px.

- **1440** alvo: página de 1.303px, duas colunas (976,7 / 400) que fecham quase na mesma altura.
- **1024**: coluna direita 320px, margem de rótulo colapsa para cima das seções, leituras e
  faixa de mensagens empilham em 2 colunas.
- **<940**: coluna única; ordem próximo jogo → elenco → tabela → leituras → caixa de entrada.
  **Sai primeiro a prévia das mensagens** (só assunto e remetente): é o menos urgente na véspera.
  Finanças nunca sai — é uma linha.

## O movimento ousado — *a fita de ocre*

O ocre saturado aparece **exatamente duas vezes** na página: na linha do Atlético Boa Vista na
tabela, que **sangra até a borda direita da viewport** e corta o fio da coluna; e no número da
margem de transferências. Todo o resto é papel, fio e tipo. A linha do clube não é "destacada com
cor de fundo": ela **rompe a grade**, como uma fita marcada no jornal. Posição, pontos e barra de
pontos ficam dentro da fita, então o destaque é legível e informativo, não decorativo.

## Densidade e dados

Tabela do elenco com 18 atletas, 10 colunas, ordenável, filtro por posição e situação, busca.
A tabela da competição mostra 12 linhas: 1º–6º, um corte explícito "7º a 16º" com faixa de pontos,
e 17º–20º — as duas zonas entram na tela sem inventar posições. Zonas marcadas por **letra (A/R) e
rótulo de grupo**, não só por cor. Barras de pontos são o dado (pts/48), não ornamento.

Consistência numérica (verificada por script): 24 jogos, 11V 8E 5D = 41 pts; 34 gols pró, 26
contra, saldo +8; soma dos gols dos 18 atletas = 34; gols por tempo 4+6+5+7+8+4 = 34 e 5+3+4+4+5+5
= 26; casa 27 pts + fora 14 pts = 41; folha 2,7 mi × 12 → comprometido 13,8 de 18,0 = margem 4,2.

## Estados

Dois componentes com os três estados, acionáveis de verdade:

1. **Elenco** — `carregando`: esqueleto de 6 linhas ao "Atualizar" (900ms); `vazio`: filtro real
   sem resultado, com "limpar filtros"; `erro`: falha de sincronização simulada pelo menu `⋯`,
   com "tentar de novo".
2. **Leituras de dados** — mesmo trio via "Recarregar" / menu `⋯`, com o feed do analista e a
   hora da última sincronização.

Acessibilidade: `aria-sort` nos cabeçalhos, `aria-busy` nas regiões, foco visível de 2px, alvos
≥24px nos controles, contraste ≥4.5:1 em texto (medido), tabela com `<caption>` e `<th scope>`.
