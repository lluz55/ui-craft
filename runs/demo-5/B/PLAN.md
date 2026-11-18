# PLAN — Maré (demo-5, braço B)

## 1. O que é, fisicamente

Uma pousada de seis quartos a 80 m da areia, em Porto de Galinhas. O hóspede decide em menos de um
minuto, no celular, com o polegar. O produto não é "hospitalidade": é **seis quartos, uma diária, uma
data de entrada e uma maré**. O que se compra é verificável — m², camas, metros até a praia, reais por
noite. O sinal físico é a **tábua de marés** pendurada na parede de pousada litorânea: papel quadriculado,
números monoespaçados, linha de datum, anotação a lápis.

**Direção:** *Tábua de marés* — híbrido de editorial técnico (régua, datum, colunas de números) com
fotografia de lugar. Não é "boutique minimalista de praia" (o vizinho rejeitado): aquele caminho
esconde os números atrás de adjetivos e vira um template de hotelaria. Aqui os números *são* o caráter.

**Imagens:** as cinco fotos existem, são reais e são o assunto. Não há substituto, não há banco de
imagens, não há caixa cinza.

## 2. Estratégia cromática

**Campo saturado escuro** (não papel, não off-white). O fundo é a maré funda, quase preta-esverdeada;
as fotos entram como janelas de sol nesse campo. Motivo escrito: página de hotelaria que precisa
mostrar sol sem virar creme; contraste alto para leitura no ônibus, à luz do dia.

Paleta **Maré Alta** (6 valores + foco):

| papel | hex | uso |
| --- | --- | --- |
| `--surface` | `#0B2F2E` | fundo da página, scrim final do hero |
| `--surface-2` | `#113B38` | poços, campos, painel do total |
| `--ink` | `#F2EEE0` | texto primário (cal) |
| `--muted` | `#A8BCB4` | metadados, legendas (7.20:1 sobre surface) |
| `--accent` | `#F2674A` | bóia de salvação: ação primária, erro, foco de atenção (4.67:1 sobre surface) |
| `--accent-ink` | `#101F1D` | texto sobre o coral (5.51:1) |
| `--rule` | `#2A514C` | fios, réguas, bordas de estrutura (não é affordance sozinho) |

Contraste medido no hex real: ink/surface 12.38:1 · muted/surface 7.20:1 · muted/surface-2 6.16:1 ·
accent/surface 4.67:1 · accent-ink/accent 5.51:1. Foco = cal com anel de superfície (12.38:1 no fundo,
separação garantida pelo gap).

Tratamento único para as cinco fotos (são de fontes e luzes diferentes): `saturate(.86) contrast(1.06)
brightness(.97)`. Sobre o hero, scrim em gradiente contínuo de `#0B2F2E` (0,88 no topo, 0 no meio, sólido na base), medido sob o texto. Um grau só, do hero ao rodapé.

## 3. Tipografia

Uma superfamília, três cortes — sem terceira família:

| papel | família | tamanho / linha / tracking |
| --- | --- | --- |
| display | Fira Sans Condensed **Bold** | `clamp(72px, 12.5vw, 168px)` / 0.84 / -0.02em — "Maré" |
| heading | Fira Sans Condensed **Bold** | `clamp(30px, 3.6vw, 48px)` / 1.02 / -0.012em |
| body | Fira Sans **Regular** | 17px / 1.65 / 0 — medida ≤ 62ch |
| label | Fira Mono **Regular** | 11–12px / 1.2 / 0.14em, caixa alta |
| data | Fira Mono **Regular** | 13–14px / 1.3 / 0.02em, `tabular-nums` |
| price | Fira Sans Condensed **Bold** | `clamp(24px, 2.4vw, 29px)` / 1 / -0.01em, com "R$" em Mono 11px |

Escala: 11 / 13 / 17 / 22 / 34 / 46 / display. Unidade de espaço 4px; seções 72 no celular, 120 no
desktop; calha 24 / 64. Raio 0. Sombra: nenhuma (só o anel de foco). Régua 1px.

## 4. Layout (ASCII)

Desktop 1440:
```
┌───────────────────────────────────────────────────────────────┐
│ MARÉ  PORTO DE GALINHAS              quartos  reserva  (81)…  │ ← topo sobre foto, scrim
│                                                               │
│                                                               │
│   ─────────────── DATUM · MARÉ ALTA 1,8 m ─────────────────   │ ← fio anotado sobre a foto
│                                                               │
│   Maré                                                        │ ← display 168
│   Pousada boutique · 6 quartos · 80 m da praia                │
│   [ Ver disponibilidade ]   [ Falar no WhatsApp ]             │
└───────────────────────────────────────────────────────────────┘
   06 quartos  │  80 m até a areia  │  café incluído     ← três fatos, fios
   ███████████ faixa praia-02 21:9, full-bleed ███████████
   QUARTOS                                          ← h2
   ┌ foto 1:1 ┐   ┌ foto 4:5 ┐   ┌ foto 3:4 ┐      ← topos alinhados, alturas diferentes
   │          │   │          │   │          │
   └──────────┘   └──────────┘   └──────────┘
    01 Maré Baixa   02 Maré Cheia  03 Coqueiro    ← dados alinhados na base comum
    2 hóspedes · 21 m² …            …
    R$ 620 /noite   R$ 780         R$ 940
   RESERVA ─────────────────────────────────────
   Escolha as noites.          [ formulário ] [ total ]
   RODAPÉ: endereço · telefone · créditos · cancelamento
```

Mobile 390 (leitura de cima para baixo, CTAs full-width):
```
topo: MARÉ · Reserva
hero 86svh: foto, datum, Maré, local, [Ver disponibilidade]
fatos empilhados (número à esquerda, rótulo à direita)
faixa praia 16:9
quarto 01: nome/dados → foto 1:1 → diária
quarto 02: foto 4:5
quarto 03: foto 3:4
reserva: campos empilhados → painel do total
rodapé
```

## 5. O movimento único

**A foto de abertura se assenta uma vez ao carregar**: escala 1.055 → 1 e um véu de luz que sai de 0.55
para 0, em **380 ms**, `cubic-bezier(.2,0,0,1)`, uma iteração, só `transform` e `opacity`. Não há
entrada em seção alguma, nada em loop. `prefers-reduced-motion: reduce` remove a escala e o véu e mostra
o estado final imediatamente (a informação — a foto, o scrim, o texto — continua idêntica).

Resto é retorno de estado: hover/press 80 ms em fundo/transform; foco é anel imediato de 2px, sem transição.

## 6. O movimento ousado

**O hero é uma prancha de sondagem**: um fio de datum cruza a fotografia inteira, com anotações em mono
("MARÉ ALTA 1,8 m" / "8°30′S · 35°00′W") em plaquetas de fundo sólido. A gramática se repete uma vez
só no resto da página (índices 01–03, m², R$ em colunas), e as fotos dos quartos têm **alturas
diferentes penduradas de uma linha de base comum** — a variação de altura é a maré, não o acaso.
Tudo o mais obedece à grade: sem gradiente decorativo, sem cartão flutuante, sem ícone em círculo.

## 7. Recortes (ponto focal declarado)

| foto | onde | proporção | `object-position` | o que fica no quadro |
| --- | --- | --- | --- | --- |
| `praia-01` | hero | 100vw × 88svh (todas as larguras) | `50% 58%` desk · `58% 54%` mob | horizonte, mar, coqueiros; areia mínima |
| `quarto-01` | quarto 01 | 1:1 | `50% 42%` | cama e cabeceira, teto de madeira no topo |
| `piscina-01` | quarto 02 | 4:5 | `62% 45%` | ducha e queda d'água, pedra à direita |
| `cafe-01` | quarto 03 | 3:4 | `48% 38%` | mesa posta e varanda; chão cortado |
| `praia-02` | faixa | 21:9 | `55% 55%` | buggies e areia, movimento no centro |

`srcset` gerado a partir das originais via Chromium (sem dependência externa): 480/768/1152/1440 para
largura total, 480/768/960 para os cartões. Hero sem `lazy`, `fetchpriority="high"`; o resto `lazy`.

## 8. Estados

- Formulário vazio: total ausente com frase ("Escolha o quarto e as datas para ver o total") — não é caixa cinza.
- Válido: "3 noites × R$ 780" e total em mono tabular.
- Erro de campo vazio: mensagem sob o campo + `aria-invalid`, foco no primeiro inválido.
- Erro de data no passado: causa ("A entrada não pode ser no passado.").
- Erro de saída ≤ entrada: "A saída precisa ser depois da entrada."
- Erro de capacidade: "O Maré Baixa recebe até 2 hóspedes."
- Calculando: 320 ms, texto "calculando…" no painel, `aria-live="polite"`, sem spinner em loop.
- Envio: mensagem de confirmação no painel (sem rede; diz que o retorno é por WhatsApp).
- Hover / foco / press / desabilitado? Não há botão desabilitado: validação no envio, botão sempre vivo.

## 9. Auto-checagem

Feche o plano e pergunte: *eu chegaria neste mesmo plano para outra pousada?* Não — o datum, a tábua,
as alturas de maré e os números em mono vêm desta pousada de seis quartos a 80 m da areia. O risco é
o excesso de réguas; regra: fio só onde há estrutura (topo de seção, base de dado), nunca como moldura
de cartão.
