# PLAN — Mesa (demo-3, braço B)

Plano escrito antes de qualquer HTML/CSS/JS. Segue o passo `shape` do `ui-craft`.
Este arquivo também funciona como **DESIGN.md** do projeto (sistema, paleta, tipos, proibições).

## 0. Quem verifica

Agente **cego** (não aceita imagem). Verificação pela trilha B do `reference/verify.md`:
números do `scripts/shot.mjs --deep` (overflow, clipped, alvos, contraste computado, fontes,
ordem de foco, headings) + leitura do DOM como wireframe. Nenhuma frase do tipo "ficou bonito"
entra no relatório.

## 1. Assunto — sinais concretos

Mesa é uma **mesa de negociação de dívida**: extrato impresso, carimbo, protocolo, cálculo à mão
e uma carta que sai pelo correio. Três sinais que viram matéria (não decoração):

- **material:** papel de protocolo (pardo-frio), tinta verde-preta, carimbo (verde-tinta);
- **vocabulário:** contrato, composição, encargos, saldo devedor, parcela, protocolo, baixa;
- **artefato da profissão:** o **pé de balanço** — a soma escrita embaixo de um filete duplo, e a
  carta A4 timbrada.

Fatos do dataset que a interface usa: todos os 9 vencimentos convergem para **19/11/2026**
(12/09+68, 28/08+83, …), então o "agora" do produto é congelado em `19/11/2026 09:42` — os
números relativos ("há 2 h") não envelhecem e não há `Date.now()` no render.

## 2. Direção

**Data Dense / Ops + Swiss (híbrido).** Grade visível, alinhamento à esquerda, uma única cor de
acento, densidade de ferramenta (linha de 36 px, 13 px de dado), hierarquia por escala e espaço.

- **Por que esta e não a vizinha:** a vizinha é Refined Minimal ("SaaS dashboard"), que produz o
  kit de cartões brancos + sombra + indigo que o brief reprova. Aqui a superfície é um *documento
  operado*: filetes, ordinais, carimbo — nada de cartão.
- **Não esta:** Technical/Terminal. Monoespaçada em tudo e log falso seriam fantasia; aqui a mono
  é **papel de dado** (ids, valores, horários), não o corpo do texto.

## 3. O movimento ousado (um só)

**O pé de balanço da carteira.** `R$ 81.356,67` em Fira Sans Condensed Bold **68 px**, sobre um
filete duplo de contador, com a segunda soma logo abaixo: *"pela composição R$ 81.392,67 (+36,00)"*.
É o único número grande da fila; todo o resto é 13 px. O número grande admite, no mesmo bloco, que
a carteira **não fecha** — a tese da tela em uma peça tipográfica.
Nada mais é grande: h1 22 px, saldo do detalhe 30 px, display só aqui.

## 4. Paleta — "Papel & Carimbo" (4–6 valores nomeados)

| Papel | Claro | Escuro (remapeado por papel) | Uso |
|---|---|---|---|
| `surface` | `#F2F1E9` papel de protocolo | `#11140F` verde-preto | fundo da página |
| `surface-2` | `#FBFAF4` folha levantada | `#171B14` | cabeçalho de tabela, painéis |
| `surface-3` | `#E7E5D8` poço | `#20251C` | skeleton, poços, chips |
| `ink` | `#171A12` tinta verde-preta | `#EAE7DC` | texto primário |
| `ink-2` | `#3D4237` | `#C6C9BB` | texto secundário |
| `muted` | `#5A6152` | `#9AA18E` | rótulos, metadados (≥4,5:1) |
| `rule` | `#D3D1C2` | `#2B3227` | filetes |
| `rule-strong` | `#ABA896` | `#46503F` | filete duplo, bordas de controle |
| `accent` | `#0C5749` tinta de carimbo | `#6FB4A3` | **atenção**, não ação: linha prioritária, ordenação ativa, foco |
| `accent-ink` | `#F5F3E9` | `#0B1512` | texto sobre acento |
| `flag-bg` / `flag-ink` | `#F3E3BD` / `#5F4708` | `#322814` / `#EBC77E` | divergência de valores |
| `danger` | `#96271E` | `#E39387` | só a ação destrutiva |

Contraste medido (hex reais): ink 15,54 · muted 5,67 · accent 7,49 · accent-ink/accent 7,63 ·
danger 7,11 · flag 6,91. Escuro: 15,00 / 6,95 / 7,72 / 7,73 / 7,77 / 8,97.

Decisão escrita: **ação veste tinta** (botão primário `ink` sobre papel), **acento é atenção**
(barra da linha prioritária, coluna ordenada, anel de foco). Assim o carimbo verde não vira "botão
de sucesso" e o vermelho fica reservado para encerrar contrato. Nada de verde/vermelho como único
portador: status tem glifo + palavra + espessura de borda.

Nome da paleta: **Papel & Carimbo**. Proibido: `#6366F1`, cartão branco com sombra, indigo,
gradiente, vidro, cinza-200 zebrado, gráfico decorativo, medidor em arco.

## 5. Tipo — uma superfamília, dois papéis

Fira Sans (texto) + Fira Mono (dado) — mesma superfamília, contraste de função, não de humor.
Arquivos locais em `fonts/` (`@font-face`, `font-display: swap`), zero requisição.

| Papel | Família / peso | Tamanho / altura | Uso |
|---|---|---|---|
| display | Fira Sans Condensed **Bold** | 68 px / 0,92 / −0,02em (56 @1024, 40 @320) | pé de balanço |
| h1 | Fira Sans SemiBold | 22 px / 1,25 / −0,01em | título da página |
| h2 | Fira Mono Regular | 11 px / 1,2 / 0,1em, caixa alta | título de seção (com filete) |
| body | Fira Sans Regular | 14 px / 1,55 | texto, notas |
| small | Fira Sans Regular | 13 px / 1,5 | metadados |
| label | Fira Mono Regular | 10,5 px / 1,2 / 0,09em, caixa alta | rótulos, unidades, eixos |
| data | Fira Mono Regular | 13 px / 1,35, `tabular-nums` | dinheiro, ids, horas, dias |
| nota do contato | Fira Sans Regular | 13,5 px / 1,5, medida ≤ 46ch | registro de ligação |

Pesos usados: 400, 500, 600 + Condensed Bold. Medida de prosa ≤ 68ch; tabela fluida.

## 6. Espaço, forma, movimento

- Unidade `--u: 4px`; tudo é 4×n (4, 8, 12, 16, 24, 32, 48, 64). Ritmo de seção 32 px.
- Raio: **0** na estrutura, **2 px** em controles/chips (duas formas, não quatro).
- Borda 1 px sempre; **filete duplo** (1 px + 3 px de respiro + 1 px) só em totais.
- Sombra só onde há elevação real: diálogo, paleta, toast. Cartão nenhum.
- Movimento: 140 ms micro, 200 ms superfície, `ease-out`; `prefers-reduced-motion` remove
  transform e mantém opacidade. Nada em loop (exceto o pulso do skeleton, que sinaliza carga).
- Linha de tabela 36 px (1440), 44 px abaixo de 700 px. Alvos de controle ≥ 32 px; botões de
  linha e ações ≥ 40 px.

## 7. Layout (ASCII, leitura de cima para baixo)

### fila.html
```
┌ MASTHEAD  Mesa · Banco Farol · cobrança      Fila  Contrato  Carta     qui 19 nov · 09:42  [tema] ┐
│ ──────────────────────────────────────────────────────────────────────────────────────────────── │
│ fila de cobrança                                    ═══════════ (filete duplo)                    │
│ ordem de risco: dias ↓, empate pelo saldo            R$ 81.356,67      ← 68px, o movimento ousado │
│ 9 contratos · 3 sem contato · 2 em acordo            pela composição R$ 81.392,67 (+36,00)         │
│ 1 divergência                                                                                     │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Busca [ nome ou contrato            / ]   (todos 9)(sem contato 3)(promessa 2)(em acordo 2)…      │
│ 9 de 9 · ordem: dias ↓ · filtro: todos                                            (fita de estado)│
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│  #   cliente            contrato  venceu  dias      saldo         status        última tentativa   │
│ 01 │ Cleuza Amorim      CTR-2277  15/07   127 ▁▁▁▁  945,48        ○ sem contato  há 6 d · carta    │
│ 02 │ Ivonete Sá         CTR-3390  28/08    83 ▁▁    1.204,82      ◆ em acordo    há 1 h · ligação  │
│ …  ordem de risco; linha prioritária com barra de acento à esquerda; 7712 com célula de saldo     │
│    marcada "≠ −36,00" (fundo flag + glifo + texto, nunca só cor)                                  │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘
```
Leitura: quem ligo agora (ordinal + dias) → quanto (saldo) → em que pé está (status) → quando foi a
última tentativa. O olho desce a coluna de dias e para na linha 01.

### contrato.html
```
┌ MASTHEAD ─────────────────────────────────────────────────────────────────────────────────────────┐
│ ← Fila   CTR-1188                                                                                 │
│ Osvaldo Reis        venceu 01/10/2026 · há 49 dias      (11) 98734-5510 [copiar]                  │
│ ┌ saldo devedor ─────────────┬ total no core ─────────┬ pago ──────────────────────────────┐      │
│ │ R$ 12.166,80 (30px)        │ R$ 16.166,80           │ R$ 4.000,00 em 20/10/2026          │      │
│ └────────────────────────────┴────────────────────────┴────────────────────────────────────┘      │
├──────────────────────────────────────────┬────────────────────────────────────────────────────────┤
│ COMPOSIÇÃO (tabela: componente · conta · valor) │ REGISTRO DE CONTATO                    │
│  juros 1% a.m. × 49/30, multa 2%          │  [canal] [nota…]  [Registrar contato]          │
│  filete duplo antes do saldo              │  18/11 15:45 · telefone · "Pediu 4× …"         │
│ HISTÓRICO DE PAGAMENTOS (ou vazio)        │  05/11 10:20 · telefone · "…"                  │
│ SIMULADOR                                 │ ─────────────────────────────────────────────  │
│  parcelas (1)(3)(6)(12) · desconto ─────● │ ENCERRAR COMO PREJUÍZO                         │
│  parcela · última · total · economia      │  explica o efeito + botão danger               │
│  equação em mono, regra de arredondamento │                                                │
└──────────────────────────────────────────┴────────────────────────────────────────────────────────┘
```
8/4 em 1440; abaixo de 1100 vira uma coluna (principal → trilha). O simulador fica no fluxo da
negociação: composição → o que já foi pago → o que oferecer.

### carta.html
```
[barra de tela: ← Contrato · prévia · Imprimir]        (display:none em @media print)
┌ folha A4 210×297mm, papel branco, tinta preta, sem sombra ────────────────────────────┐
│ BANCO FAROL                                    Central de Cobrança · CNPJ …           │
│ ═══════════════════════════════════════════════════════════════════════════════════   │
│ Cobrança de dívida vencida                                  protocolo · São Paulo, …  │
│ À Heloísa Prado / endereço                                                            │
│ Prezada …  (3 parágrafos curtos)                                                      │
│ ┌ quadro de valores: contrato · vencimento · dias                                      │
│ │ principal / juros / multa / TOTAL (filete duplo)                                     │
│ └ prazo de 10 dias · canais: PIX, boleto 0800, app                                     │
│ assinatura · rodapé do banco                                                          │
└───────────────────────────────────────────────────────────────────────────────────────┘
```
Blocos de valores com `break-inside: avoid`; a folha inteira cabe em 1123 px de altura.

## 8. Dados, fórmulas e reconciliação

- `juros = principal × 1% × dias/30`, `multa = principal × 2%`, `total = principal + juros + multa`
  — a regra fica **escrita na tela** (fila, detalhe e carta), com a conta ao lado de cada linha.
- **Saldo devedor = total − pagamentos.** CTR-1188 pagou R$ 4.000,00 em 20/10 → saldo 12.166,80
  (não 16.166,80). O simulador parte do saldo.
- **CTR-7712 não fecha:** composição 10.175,75 × core 10.139,75 → −36,00. A divergência aparece
  na fila (célula do saldo), no total da carteira (segunda soma) e no detalhe (linha própria,
  "registrada, não corrigida"). O simulador do 7712 parte da composição e diz isso.
- **Totais da carteira:** soma dos saldos no core **R$ 81.356,67**; pela composição **R$ 81.392,67**
  (diferença R$ 36,00). As duas somas ficam impressas; nenhuma é escolhida em silêncio.
- Simulador: acordo = principal líquido + multa + juros×(1−desconto), arredondado ao centavo;
  parcela = total÷n arredondada ao centavo; a **última parcela absorve a diferença** (exibida
  quando difere). Economia = saldo − total. Regra escrita ao lado do resultado.
- Moeda `Intl.NumberFormat('pt-BR', {currency:'BRL'})`; datas dd/mm/aaaa; "agora" congelado.

## 9. Estados em escopo

| Superfície | estados |
|---|---|
| Fila | carregando (skeleton com a forma das linhas) · vazio (filtro/busca sem resultado + limpar) · cheio · linha prioritária · linha divergente · seleção por teclado |
| Contrato | carregando · erro (contrato inexistente, causa + remédio) · cheio · histórico vazio · registro vazio · diálogo de confirmação (foco preso) · encerrado (desabilitado + desfazer 8 s) · sucesso (toast) |
| Carta | prévia em tela · impressão (A4, sem navegação) |

Tema claro/escuro completos; escuro é remapa de papéis, não inversão.

## 10. Teclado, URL, foco

`/` busca · `j`/`k`/setas movem foco entre linhas · `Enter` abre · `Esc` volta (ou limpa busca) ·
`Ctrl/Cmd+K` paleta de comandos · diálogos com foco preso e retorno ao gatilho · paleta com
setas e Enter. Fila reflete `q`, `status`, `ordem`, `dir`; contrato reflete `contrato`, `parcelas`,
`desconto`. `replaceState` para não poluir o histórico a cada tecla; links reais entre páginas.

## 11. Proibições deste projeto

Cartão branco + sombra + indigo; tabela zebrada cinza; número centralizado; cor como único
significado; gráfico sem referência; medidor em arco; número que não fecha entre telas; logo/foto
placeholder; escuro que é inversão; carta com navegação ou segunda página; texto em imagem.

## 12. Cortes declarados

Sem backend/persistência: nota e encerramento vivem na sessão da página (recarregar restaura).
A fila não reage a um encerramento feito no detalhe (não há store compartilhado) — registrado no
relatório. Sem i18n além de pt-BR.
