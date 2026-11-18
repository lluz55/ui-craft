# PLAN — Mesa (console de cobrança, Banco Farol)

## 1. Sujeito e sinais

Mesa é uma **mesa de trabalho de negociador**, não um site. O objeto físico é a *ficha do
contrato sobre a mesa*: papel de formulário contínuo, colunas alinhadas, valores que se
conferem no papel, carimbo de data/hora. O usuário abre a tela com um telefone no ouvido e
uma segunda janela do core ao lado — logo, o produto precisa parecer **instrumento**, não
vitrine.

Três sinais extraídos do sujeito, que viram textura (não decoração):

1. **material**: papel de formulário — réguas horizontais contínuas, colunas que compartilham
   a mesma linha de base, nenhum cartão flutuante.
2. **vocabulário**: "principal", "encargo", "pro rata die", "saldo devedor", "acordo",
   "prejuízo", "core". A tela usa essas palavras, não sinônimos de marketing.
3. **artefato da profissão**: o **extrato que confere** — a coluna de valores que fecha com a
   composição e a linha de divergência quando não fecha. O carimbo de hora do registro de
   contato é o segundo artefato.

## 2. Direção

**Data Dense / Ops + Technical (híbrido)** — `reference/styles.md` §12 + §4.

*Por que esta e não a vizinha:* Refined Minimal (§3) entregaria o kit SaaS (cartões brancos,
sombra, um accent) que o próprio briefing reprova; Technical puro vestiria a tela de
terminal e o negociador não lê logs. Denso + técnico dá o que o trabalho exige: varredura
rápida, números tabulares, ids de contrato e hora expostos, densidade de planilha com
hierarquia tipográfica.

*Não esta:* Warm Craft / Editorial — a Mesa não é uma publicação; creme + serifa tornaria
lenta uma ferramenta usada ao telefone.

## 3. Estratégia cromática

**Mono ramp** (uma matiz, muitos valores) com **um único accent** de sódio (âmbar de
lâmpada de mesa / farol). A superfície é um cinza-esverdeado frio de arquivo, não creme:
o ramp carrega a informação; o âmbar marca só *ação* e *atenção agora*. Cores semânticas
de status são separadas (não são marca) e sempre acompanhadas de forma + texto.

Não é paper (`#F4F1EA`) nem white room puro: é o cinza de ficha de arquivo com tinta de
carimbo.

### Paleta (light)

| Papel | Hex | Uso |
|---|---|---|
| `surface` | `#EEF0EC` | fundo da página |
| `surface-2` | `#FAFBF8` | painel, cabeçalho de tabela, linha selecionada |
| `inset` | `#E5E8E2` | poço de campo, cabeçalho de tabela, skeleton |
| `ink` | `#141815` | texto primário (15,6:1) |
| `muted` | `#5A655C` | metadados (5,3:1) |
| `rule` | `#D2D8D0` | fios, bordas |
| `rule-strong` | `#A9B2A8` | fio de cabeçalho de tabela |
| `accent` | `#9E5406` | ação primária, borda ativa, foco, divergência (4,6:1 sobre surface) |
| `accent-fill` | `#C97A17` | preenchimento de botão primário; `accent-ink` `#1A1305` (5,5:1) |
| `ok` | `#255C3C` | acordo/quitado (com forma + texto) |
| `warn` | `#6A4E05` | promessa/parcial |
| `danger` | `#8C2620` | recusa/prejuízo |

### Dark (remapeamento por papel, não inversão)

| Papel | Hex |
|---|---|
| `surface` | `#131714` |
| `surface-2` | `#1A1F1B` |
| `inset` | `#202620` |
| `ink` | `#E9EDE6` |
| `muted` | `#9AA69B` (7,1:1) |
| `rule` | `#2D352E` |
| `accent` | `#E5A345` |
| `accent-ink` | `#1A1305` |

## 4. Tipo

Duas famílias locais (`fonts/`, `@font-face`): **Fira Sans** (texto/UI) e **Fira Mono**
(ids, horas, notas de sistema). O corte **Fira Sans Condensed SemiBold** existe só para o
número-display — mesma superfamília, papel próprio.

Escala 1,2 a partir de 11 px; papéis:

| Papel | Família | Tam / peso / altura | Uso |
|---|---|---|---|
| display | Fira Sans Condensed 600 | 64 / 1,0 / tabular | total da carteira |
| h1 | Fira Sans 600 | 28 / 1,15 | nome do cliente |
| h2 | Fira Sans 600 | 19 / 1,25 | seções |
| body | Fira Sans 400 | 14 / 1,55 | texto corrente |
| data | Fira Sans 400/500 | 13 / 1,4 / `tabular-nums` | tabela, valores |
| label | Fira Sans 600 | 11 / 1,3 / caixa alta, +0,06em | cabeçalho de coluna, rótulo de campo |
| mono | Fira Mono 400 | 12 / 1,4 | contrato, hora, id |

Medida ≤ 68ch na prosa; números à direita em todas as colunas numéricas.

## 5. Layout (ASCII)

### fila.html — a mesa, 1440

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ MESA  Banco Farol · cobrança      Fila   Contrato   Carta      tema   ⌘K      │ 56
├───────────────────────────────┬─────────────────────────┬────────────────────┤
│ CARTEIRA EM ATRASO            │ 9 contratos             │ REGRA DE ENCARGOS  │
│ R$ 81.356,67                  │ 2 em acordo · 3 sem …   │ 1% a.m. pro rata   │
│ soma dos saldos, não dos totais│ 127 d maior atraso     │ 2% multa · total…  │
│ ⚑ 1 divergência de R$ 36,00   │                         │                    │
├───────────────────────────────┴─────────────────────────┴────────────────────┤
│ Buscar [/]________   Status [todos ▾]        9 de 9 · ordem: dias ↓  limpar   │ sticky 60
├──────────────────────────────────────────────────────────────────────────────┤
│▏CLIENTE          CONTRATO   VENCEU  DIAS   SALDO DEVEDOR   STATUS   ÚLT. CONTATO│ 34
│▏Cleuza Amorim    CTR-2277   15/07    127    R$ 945,48     ○ sem contato    —    │ 40
│▏Ivonete Sá       CTR-3390   28/08     83    R$ 1.204,82   ■ em acordo   09/10   │ 40
│▏Marisa Queiroz   CTR-7712   09/09     71    R$ 10.139,75  ○ sem contato    —     │ 40
│  ⚑ divergência R$ 36,00                                                   │
└──────────────────────────────────────────────────────────────────────────────┘
```

Leitura: um número dominante (display), três blocos de apoio na mesma faixa, depois a
tabela ocupa a largura toda. A borda âmbar de 3 px marca a linha ativa (j/k), nunca o fundo
inteiro. `Venceu`/`Últ. contato` caem no 320 px; cliente, dias, saldo e status ficam.

### contrato.html — 1440

```
┌────────────────────────────────────────────────┬─────────────────────────────┐
│ Fila / CTR-4821                                │ SIMULADOR DE ACORDO         │
│ Heloísa Prado              ● sem contato        │ parcelas  1  3  6  12       │
│ CTR-4821 · venceu 12/09 · 68 dias em atraso    │ desconto de juros ────○──   │
│                                                │ R$ 5.025,65  à vista        │
│ COMPOSIÇÃO DO DÉBITO                           │ total   R$ 5.025,65         │
│ principal        4.820,00                       │ economia R$ 0,00            │
│ juros  1% a.m.     109,25                      │ regra: desconto incide só…  │
│ multa  2%           96,40                      │ [ registrar acordo ]        │
│ total do core    5.025,65                      ├─────────────────────────────┤
│ pago                 0,00                      │ ENCERRAR                    │
│ saldo devedor    5.025,65                      │ encerrar como prejuízo →    │
│                                                │ (nomeia contrato e valor)   │
│ HISTÓRICO DE PAGAMENTOS (tabela)               │                             │
│ REGISTRO DE CONTATO (notas + campo)            │                             │
└────────────────────────────────────────────────┴─────────────────────────────┘
```

Duas colunas assimétricas: o dossiê à esquerda, a decisão (simulador + ação destrutiva) à
direita, sticky. A ação destrutiva fica separada por fio e rótulo, nunca ao lado do botão
primário.

### carta.html — A4

```
┌────────────────────────────────────────────┐  branco, tinta preta, 1 página
│ BANCO FAROL · cobrança administrativa      │
│ ─────────────────────────────────────────  │
│ DESTINATÁRIO            São Paulo, 18/11    │
│ Heloísa Prado                              │
│ Contrato CTR-4821                          │
│                                            │
│ Prezada …                                  │
│ (corpo curto, medida 68ch)                 │
│ VALORES DEVIDOS (tabela que não quebra)    │
│ principal / juros / multa / pago / saldo   │
│ conferência: divergência, se houver        │
│ PRAZO · CANAIS DE PAGAMENTO                │
│ ─────────────────────────────              │
│ Central de cobrança Banco Farol            │
└────────────────────────────────────────────┘
```

## 6. O movimento ousado

**O número da carteira**: `R$ 81.356,67` em 64 px condensado, alinhado à esquerda com os
rótulos de 11 px e a nota de reconciliação na mesma linha de base. É o único lugar grande
da interface; tudo o mais obedece à grade de 40 px e à escala de 13–19 px. A consequência
de projeto: a divergência de R$ 36,00 fica *colada* nesse número, porque um total grande
que esconde a própria diferença é propaganda, não instrumento.

## 7. Estados no escopo

- **loading**: skeleton com a forma da tabela (9 linhas de 40 px) e da composição; sem salto
  de layout.
- **vazio**: filtro/busca sem resultado — frase + "Limpar filtros"; a faixa da carteira
  continua mostrando o total real (não zera com o filtro).
- **erro**: falha ao carregar o core em fila e contrato — painel nomeia o que falhou, o que
  fazer e oferece "Tentar de novo".
- **sucesso**: toast de nota registrada / acordo registrado.
- **destrutivo**: diálogo nomeia contrato e valor, exige segundo clique e oferece desfazer
  por 8 s (toast com ação).
- **divergência**: linha com borda âmbar + texto "divergência R$ 36,00"; no detalhe, bloco
  de conciliação com as duas contas e a escolha declarada (simulador parte do core).
- **parcial**: composição mostra `pago 4.000,00` e `saldo 12.166,80`; simulador parte do saldo.
- **encerrado**: linha/estado "encerrado como prejuízo", simulador desabilitado com motivo.
- **320 px**: tabela vira linha-bloco (cliente/valor na 1ª linha, dias/status na 2ª), sem
  rolagem horizontal; nav vira três links curtos.
- **tema escuro**: remapeamento de tokens; âmbar sobe de valor, superfícies ficam mais
  claras ao elevar.

## 8. Autoverificação

Fechado o plano: *eu chegaria neste mesmo plano para outro produto da categoria?* Não — o
número-display reconciliado, a régua de ficha contínua e o âmbar de farol vêm do sujeito
(cobrança bancária brasileira), não de um template de dashboard.
