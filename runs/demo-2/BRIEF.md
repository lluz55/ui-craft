# Demo 2 — brief congelado: gestão de clube de futebol

Uma superfície única, densa, de operação. Não é landing page: é ferramenta que um treinador
deixa aberta o dia inteiro, com o time na tela e um olho na tabela.

## Produto

**Atlético Boa Vista** — clube fictício de Recife, Série B do Brasileirão. A tela é o *hub do
clube*: o que um treinador olha antes de decidir a escalação de sábado.

Usuários: treinador (principal), auxiliar técnico, analista de desempenho. Sessões longas,
muitas vezes à noite, monitor de 1440px, teclado na mão. Português do Brasil.

## A tela precisa conter

1. **Identidade do clube** — escudo, nome, competição, posição atual, rodada. Sem hero, sem
   imagem gigante: identidade em uma faixa, não em um banner.
2. **Próximo jogo** — adversário, data, local, mando de campo, e a situação do elenco para
   aquele jogo (quem está suspenso, quem volta de lesão, quem está em dúvida).
3. **Tabela da competição** — 8 a 12 linhas em volta do clube, com o clube destacado de forma
   inequívoca. Zona de acesso e zona de rebaixamento precisam ser legíveis sem cor sozinha.
4. **Elenco** — tabela de 14 a 20 jogadores com posição, idade, jogos, gols, cartões, nota
   média, condição física e situação de contrato. Ordenável; pelo menos um filtro (posição
   ou status).
5. **Duas ou três leituras de dados** — forma nos últimos 5 jogos, aproveitamento, ou
   distribuição de gols por tempo. **Proibido** gráfico decorativo sem dado real.
6. **Caixa de entrada** — 3 a 5 mensagens com remetente, assunto, tempo, e uma não lida.
7. **Finanças em uma linha** — orçamento de transferências, folha salarial, margem. Um número
   grande, o resto subordinado.

## Restrições

- HTML + CSS estáticos, sem build, sem framework, sem CDN, sem requisição de rede. Fonte
  local (`@font-face`) ou pilha de sistema — o arquivo tem que abrir offline.
- JavaScript opcional e mínimo (ordenação/filtro); sem bibliotecas.
- Tema claro e escuro, ambos completos. Não é "inverter as cores": papéis precisam ser
  reatribuídos com critério.
- Estados obrigatórios em pelo menos dois componentes: vazio, carregando, erro. Escolha onde
  faz sentido e mostre.
- 1440px é o alvo. 1024px não pode quebrar. Abaixo disso, colapso consciente (o que sai da
  tela primeiro e por quê).
- Densidade é o requisito, não o inimigo: cabe muita informação, mas o olho tem que saber
  onde pousar.

## O que reprova na hora

- Kit padrão: fundo cinza, cards brancos idênticos com sombra suave, um indigo de acento,
  gráfico de barras genérico.
- Tabela de elenco com zebra listrada e sem hierarquia tipográfica: dado virando sopa.
- Verde e amarelo óbvios de "site de futebol" sem decisão por trás (ou a decisão explicada).
- Escudo/imagem inventada como URL externa ou retângulo cinza de placeholder.
- Números inventados que não fecham entre si (gols na tabela ≠ gols na lista).

## Entregáveis

- `index.html`, `styles.css` (+ `app.js` se houver interação), `fonts/` se houver fonte local.
- `PLAN.md` — direção, paleta com hex nomeados, papéis tipográficos, o movimento ousado, os
  estados, as decisões de densidade.
- `REPORT.md` — bloco de entrega (`Decided / Verified / Not verified / Known gaps`).
- `shot-1440.png`, `shot-1024.png` — renders do Chromium headless.
