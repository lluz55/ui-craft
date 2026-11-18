# PLAN — Atlético Boa Vista · hub do clube

## Direção

**Data Dense / Ops (nº 12) + Technical (nº 4), híbrido.** O produto é uma ferramenta de
operação que fica aberta o dia inteiro: a referência material não é "site de futebol", é a
**súmula impressa** — papel quente, tinta preta, filetes finos, colunas numeradas, carimbo de
resultado. Por isso: densidade alta, tipografia comprimida, zero sombra, zero card flutuante,
zero verde-e-amarelo.

- Por que não Editorial: serifa atrapalha varredura de tabela em sessão longa.
- Por que não Noir: o treinador trabalha de dia e à noite; o escuro é tema, não a identidade.
- Por que não "Refined Minimal": cairia no kit SaaS de cards idênticos + indigo.

Sinais concretos do assunto: (1) **papel de súmula** (off-white quente, não cinza);
(2) **vocabulário de mesa** — rodada, mando, suspenso por acúmulo, DM, verba; (3) **artefato**:
a tira de classificação com colchetes de zona impressos na margem.

## Paleta — "Súmula"

Tema claro (papel):

| Papel | Hex | Uso |
| --- | --- | --- |
| `--paper` | `#F2EDE1` | fundo da página |
| `--sheet` | `#FAF7EC` | painel elevado (1px de borda, sem sombra) |
| `--ink` | `#17140F` | texto primário, faixa invertida do clube |
| `--muted` | `#57503F` | metadado, rótulos, texto secundário |
| `--accent` | `#6E1F2B` | grená do clube: ação, marca de zona, destaque |
| `--accent-ink` | `#FBF6EA` | texto sobre grená |
| `--rule` | `#D5CBB5` | filetes e divisórias |
| `--rule-strong` | `#B4A98F` | cabeçalho de tabela, eixo |
| `--ok` | `#1E5B3E` | acesso / disponível (semântico) |
| `--bad` | `#8A2226` | queda / indisponível (semântico) |

Tema escuro = **remapa de papéis**, não inversão: papel vira tinta noturna quente, a faixa do
clube inverte para papel (o destaque continua sendo o contraste máximo da tela).

| Papel | Hex |
| --- | --- |
| `--paper` | `#15120E` |
| `--sheet` | `#1D1913` |
| `--ink` | `#EEE7D6` |
| `--muted` | `#A79E8A` |
| `--accent` | `#C9686F` (grená clareado, não saturado) |
| `--accent-ink` | `#1A0D0F` |
| `--rule` | `#332C22` |
| `--rule-strong` | `#4A4133` |

Foco: `#0A5FA8` no claro / `#8CC7FF` no escuro — azul funcional, contrasta com papel **e** com
o grená (um anel grená sobre botão grená seria invisível).

## Tipografia — Fira (local, `fonts/`)

Uma superfamília em três cortes, sem webfont remota:

| Papel | Família | Tamanho / peso / tracking |
| --- | --- | --- |
| display (número grande, placar) | Fira Sans Condensed | 52px / 700 / −0.01em / lh 0.95 / tabular |
| h1 (clube) | Fira Sans Condensed | 26px / 700 / +0.01em |
| h2 (título de painel) | Fira Sans | 11.5px / 600 / +0.12em / caixa alta |
| corpo e tabela | Fira Sans | 14px e 13px / 400 / lh 1.45 e 1.3 |
| rótulo | Fira Sans | 10.5px / 600 / +0.1em / caixa alta |
| dado mono (horas, ids, rodapé) | Fira Mono | 11.5px / 400 / tabular |

Regra: número grande é **um só por tela** (verba). O resto dos números é tabular, alinhado à
direita. Caixa alta só em rótulo e título de painel.

## O movimento ousado

**A classificação é uma tira impressa, não uma tabela colorida.** A linha do Atlético é uma
faixa invertida em tinta cheia (papel sobre tinta), e as zonas são **marcas tipográficas na
calha esquerda** — colchete vertical + símbolo `↑`/`↓` + etiqueta `G4`/`Z4` — com hachura
diagonal nas linhas de queda. Lida sem cor, em preto e branco, à distância. Todo o resto da
tela obedece à grade de filetes.

## Grade e densidade

```
┌ faixa de identidade: escudo · nome · Série B · 4º · 42 pts · rodada 24 · tema ─┐
├─────────────────────────────────────────────┬──────────────────────────────┤
│ 01 PRÓXIMO JOGO                             │ 04 CLASSIFICAÇÃO             │
│   ABV × Náutico · sáb 21/11 20h30           │   G4 ↑ 1..8 … 17..20 ↓ Z4    │
│   suspensos / retornos / dúvidas            │   (linha do clube invertida) │
│ 02 FORMA (5)  ·  03 GOLS POR TEMPO          ├──────────────────────────────┤
│   V E V D V · 10/15 · barras 6 faixas       │ 05 FINANÇAS  R$ 4,2 mi       │
├─────────────────────────────────────────────┤ 06 CAIXA DE ENTRADA          │
│ 07 ELENCO — 18 jogadores, filtro, ordenação │ 07 RADAR (estado de erro)    │
└─────────────────────────────────────────────┴──────────────────────────────┘
```

- Unidade de espaço: 4px. Gap entre painéis: 12px; padding interno: 16px; linha de tabela: 30px.
- 1440: coluna principal ~2fr (≈ 900px), coluna lateral 1fr (≈ 400px), largura máx. 1560.
- 1024: proporção 1.85fr / 1fr, tabela do elenco com largura mínima e rolagem interna visível.
- < 900: coluna única. O primeiro a sair: colunas Idade e Contrato do elenco (viram linha
  secundária sob o nome) e as estatísticas secundárias da faixa de identidade. A classificação
  sobe para logo depois do próximo jogo — é a segunda coisa que o treinador olha.
- Zebra **proibida**. Separação por filete de 1px, agrupamento por posição com rótulo de grupo,
  e hierarquia por peso/tamanho.

## Estados (obrigatórios, dois componentes)

1. **Elenco — vazio**: filtro de posição + busca sem resultado → bloco "Nenhum jogador
   corresponde a …" com ação "Limpar filtros" (não é céu de lorem).
2. **Caixa de entrada — carregando**: rodapé da lista carregando mensagens anteriores com
   esqueleto de 2 linhas + texto "Carregando mensagens anteriores…" (aria-live polite).
3. **Radar do adversário — erro**: provedor não respondeu; causa + tempo esgotado + botão
   "Tentar de novo" (que passa por carregando e entrega o dado).
4. Extras: tema claro/escuro persistido, ordenação por coluna (`aria-sort`), foco visível,
   `prefers-reduced-motion`, hover de linha, estado não lido textual ("não lida", não só ponto).

## Números (fonte única, tudo fecha)

Série B 2026, rodada 24, 23 jogos: 12V 6E 5D = **42 pts**, 34 GP / 22 GC (+12), 4º lugar.
Aproveitamento 42/69 = **60,9%**. Últimos 5: V E V D V = 10/15, 8 gols pró, 5 contra.
Gols por tempo: 4+6+5+5+7+7 = **34** (15 no 1º, 19 no 2º). Elenco: soma dos gols dos 18
jogadores = **34**; cartões 49 CA · 2 CV. Finanças: verba R$ 4,2 mi; folha R$ 1,86 mi contra
teto de R$ 2,39 mi (78%); margem R$ 530 mil. Náutico: 40 pts, 5º, 2 pontos atrás.

## Auto-checagem

Feche o plano e pergunte: *eu chegaria nesta tela para outro produto da mesma categoria?*
Não — a faixa de classificação invertida + calha de zonas + papel de súmula são decisões deste
clube, nesta competição, com estes números. Um hub de e-commerce não usaria nada disso.
