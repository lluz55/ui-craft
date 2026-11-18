# Fermento — plano de superfície (T1)

## 1. Ancoragem no assunto

Padaria de fermentação longa em Recife, duas pessoas, um forno, entrega semanal de bicicleta no sábado antes das 9h. Três sinais concretos:

- **Material**: farinha (pó, papel pardo, saco de trigo), casca escura, papel de embrulho, barbante.
- **Vocabulário**: fornada, fermentação, miolo, casca, sábado, bairro, bicicleta, "a gente".
- **Artefato da profissão**: a **pauta/recibo de entrega** — o papel que acompanha o pão e diz o que tem dentro, o peso, o dia. É o artefato que substitui a foto que não temos.

## 2. Direção

**Warm Craft + Editorial (híbrido)**, mas impresso como **lista de preços de padaria / cartaz de tipografia** — não como convite de casamento.

- Por que: o produto é comida artesanal vendida por assinatura; a página precisa cheirar a papel e forno, e o texto precisa carregar a personalidade (duas pessoas, não um time de growth).
- Por que não o vizinho: **Soft Organic** (curvas pastel, ilustração) mentiria sobre o produto — não é "bem-estar", é pão de casca escura; e **Cinematic Full-bleed** está fora porque não há fotografia neste ambiente.
- Anti-clichê declarado: nada de creme `#F4F1EA` + serifada + terracota. Cor de acento é **verde-folha** (o trigo, a bicicleta, o bairro), não terracota.

## 3. Paleta — "Farinha & Folha"

| token | hex | papel |
| --- | --- | --- |
| `--paper` | `#EFEAD9` | fundo da página (papel de farinha, quente e levemente esverdeado) |
| `--paper-2` | `#F7F3E6` | superfície elevada / recibo / campos |
| `--ink` | `#1E1B14` | texto primário, títulos, réguas fortes |
| `--muted` | `#5C5645` | texto secundário, metadados (checado ≥ 4.5:1 no paper) |
| `--accent` | `#2F5A38` | ação e atenção: CTA, preço, links, foco de marca |
| `--accent-ink` | `#F7F3E6` | texto sobre o acento |
| `--crust` | `#241E15` | faixa escura da fermentação (casca) — único bloco escuro |
| `--rule` | `#CFC7B0` | fios, divisórias, bordas de campo |

Uma única cor de acento. Semânticas (erro) só em estado de formulário: `#8E2B18`.

## 4. Tipografia (local, sem rede)

Famílias embutidas em `fonts/` (OFL), com fallback de sistema — declaradas via `@font-face`:

- **Fira Sans Compressed 900** — display e títulos (largura comprimida = cartaz de padaria, não site de SaaS).
- **Fira Sans 400/500/600** — corpo, rótulos, dados. `tabular-nums` em pesos, preços, horários.

| papel | família/peso | tamanho | linha | tracking |
| --- | --- | --- | --- | --- |
| display | Compressed 900 | `clamp(2.5rem, 6.2vw, 4.75rem)` | 0.94 | -0.005em, minúsculas |
| heading | Compressed 900 | `clamp(1.9rem, 3.4vw, 2.75rem)` | 1.0 | 0 |
| lede | Sans 400 | 1.1875rem | 1.55 | 0 |
| body | Sans 400 | 1.0625rem | 1.65 | 0 |
| label | Sans 600 | 0.75rem | 1.2 | 0.12em, caixa alta — **só** em cabeçalho de recibo e rótulos de dado, nunca como "eyebrow" acima de todo título |
| data | Sans 500 | 0.9375rem | 1.4 | 0.02em, `tabular-nums` |

Medida de texto: 62ch. Unidade de espaço: `--u: 4px`, seções em múltiplos de 8 (32/64/96/128).

## 5. O movimento ousado (um só)

**A faixa dos 48 horas.** Bloco full-bleed em `--crust`, com um `48` gigantesco (até ~30vw, cortado pela borda direita de propósito), uma linha de tempo em fios com marcas 0h/12h/24h/36h/48h, e o argumento curto ao lado. É o único lugar onde o tipo sai do grid; todo o resto obedece à coluna e às réguas.

## 6. Lógica de layout

```
DESKTOP 1440
┌───────────────────────────────────────────────────────────┐
│ FERMENTO            pães · como funciona · assinatura       │ header fino, fio inferior
├──────────────────────────────────┬────────────────────────┤
│ kicker: Recife · fornada de sexta│  RECIBO (papel-2)      │
│ H1 display 3 linhas              │  pão ............. 1 kg│ grid 12 col: 7 / 4 offset
│ lede 2 linhas                    │  centeio ......... 700 g│
│ R$ 68/mês  + CTA  + 2 pães 118   │  baguete ......... 320 g│
│                          carimbo │  sábado, antes das 9h  │
├──────────────────────────────────┴────────────────────────┤
│ ██ FAIXA CRUST: 48 + linha do tempo + texto            ██ │ full-bleed
├───────────────────────────────────────────────────────────┤
│ OS TRÊS — pauta com fios, nome grande à esquerda,          │
│ descrição 2 linhas, peso e nota à direita (não são cards)  │
├───────────────────────────────────────────────────────────┤
│ COMO CHEGA — lista ordenada sexta → sábado → porta         │
├───────────────────────────────────────────────────────────┤
│ ASSINATURA — duas linhas de plano, tabela, CTA             │
├───────────────────────────────────────────────────────────┤
│ QUEM FAZ (duas pessoas) │ PERGUNTAS HONESTAS (dl)          │
├───────────────────────────────────────────────────────────┤
│ PEDIDO (form sem JS, validação nativa) + rodapé            │
└───────────────────────────────────────────────────────────┘

MOBILE 390: uma coluna; recibo vira bloco após o CTA; 48 ocupa a largura;
pauta empilha nome/peso; CTA do herói full-width (polegar).
```

Regra de alinhamento: toda borda esquerda de texto, preço e nome de pão cai na mesma linha; pesos e preços alinhados à direita com `tabular-nums`.

## 7. Restrição das fotos — solução honesta

Sem foto e sem placeholder cinza. O pão é **descrito como numa etiqueta de saco de farinha**: nome, peso, tempo de fermentação, e uma linha dita por quem assa. Uma frase assume o buraco: "as fotos do forno ficam para a próxima fornada". Nada de retângulo vazio.

## 8. Estados no escopo

- hover / active / focus-visible (anel 3px, com correção óptica dentro do botão de acento)
- formulário: campo vazio, `:user-invalid` (erro inline com causa + remédio), `:valid` (confirmação discreta), submit desabilitado nunca (validação no envio)
- bairro fora da área: nota com "lista de espera por bairro" (estado vazio do serviço)
- página sem rede: nenhuma requisição, fontes locais — funciona offline por construção
- 320px e 200% de zoom; `prefers-reduced-motion`
- sem JS: o formulário é o único controle dependente de servidor; o texto diz o que acontece depois

## 9. Auto-checagem

Fechando o plano: esse mesmo plano serviria para uma cafeteria, uma cervejaria ou um clube de vinho? As peças que não se transferem: a pauta com os três pesos reais (1 kg / 700 g / 320 g), a baguete limitada a 40 por semana, a entrega de bicicleta antes das 9h em três bairros do Recife, e a faixa dos 48h — que é o argumento do produto, não decoração. Mantido.
