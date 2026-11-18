# Demo 5 — brief congelado: **Maré**

> Brief de teste. Texto idêntico para todos os braços. Não editar.

**Produto:** **Maré** é uma pousada boutique de 6 quartos em Porto de Galinhas (PE), aberta em 2024.
O site é a única porta de entrada: quem chega vem de busca ou de indicação, e decide em menos de um
minuto se manda mensagem. Uma página, não um site.

Quem lê está no celular, no ônibus, com o polegar na tela. Quem olha no computador está planejando a
viagem com a família ao lado.

## Ativos (use estes, não invente outros)

`runs/demo-5/assets/` — cinco fotografias reais, 1920px de largura, com `CREDITS.md`:

| arquivo | o que mostra |
| --- | --- |
| `quarto-01.jpg` | quarto com cama, teto de madeira, luz de janela (1920×1440) |
| `cafe-01.jpg` | mesa de café da manhã posta do lado de fora (1920×1279) |
| `piscina-01.jpg` | ducha externa sobre a piscina, água e pedra (1920×1080) |
| `praia-01.jpg` | praia de Porto de Galinhas, mar e coqueiros (1920×1440) |
| `praia-02.jpg` | buggies na areia, movimento, dia claro (1920×1081) |

As fotos são de lugares diferentes e de fontes diferentes. Parte do trabalho é fazer parecerem do
mesmo lugar: escolha de recorte, ponto focal, tratamento e ordem. Copie os arquivos para o diretório
da entrega (`images/`) — **nunca** referencie o caminho de `assets/` nem uma URL externa.

## A página precisa ter

1. **Abertura** com uma fotografia grande, o nome, a localização e uma ação primária clara
   (ver disponibilidade / falar no WhatsApp). Texto sobre imagem exige scrim — e o contraste tem que
   ser medido, não estimado no olho.
2. **Os três quartos** (Maré Baixa, Maré Cheia, Suíte Coqueiro) com foto, metragem, capacidade e
   diária em reais. Cada quarto usa uma foto diferente, com recorte diferente — não três vezes o
   mesmo enquadramento.
3. **A pousada em três fatos** (café incluído, 80 m da praia, seis quartos) — curtos, verificáveis,
   sem adjetivo de folheto.
4. **Reserva**: entrada e saída (duas datas), hóspedes, e o cálculo de diárias × noites com o total.
   Saída antes da entrada é erro; data no passado é erro; o total muda ao mudar as datas.
5. **Rodapé** com endereço, telefone, créditos das fotos e uma linha sobre cancelamento.

## Movimento

A página é de divulgação, então tem **um** momento — e só um. Escolha qual:

- a fotografia de abertura se assenta uma vez ao carregar (escala/luz/recorte), **ou**
- a troca de quarto selecionado move a foto com continuidade (elemento compartilhado).

O resto é retorno de estado: hover, foco, press, envio. `prefers-reduced-motion` tem que existir e
manter a informação (nada de esconder conteúdo atrás de animação). Nada de animação de entrada em
cada seção, nada de loop, nada de `transition: all`.

## Imagens — requisitos duros

- arquivos locais em `images/`, com `width`/`height` (ou `aspect-ratio`) declarados;
- `srcset`/`sizes` para 390, 768 e 1440 quando a foto ocupa a largura toda;
- a imagem de abertura **não** é `loading="lazy"` e leva `fetchpriority="high"`; as demais são lazy;
- `alt` em português descrevendo o que importa (não "imagem", não o nome do arquivo); decorativa → `alt=""`;
- `object-fit: cover` com `object-position` definido pelo ponto focal que você escolheu;
- nenhuma imagem esticada, nenhuma caixa cinza de placeholder, nenhum link para fora.

## Restrições técnicas

- HTML + CSS + JavaScript vanilla. Sem framework, sem build, sem CDN, **nenhuma requisição de rede**.
  Fonte: locais (`@font-face`, você pode copiar os OTF de `runs/demo-2/B/fonts/`) ou pilha do sistema.
- 1440px e 390px são os alvos; 320px não pode ter rolagem horizontal.
- Estados: formulário válido, erro de data, erro de campo vazio, e um estado de "calculando" curto.
- Zoom 200% sem perda de conteúdo.

## Reprovado na hora

- Caixa cinza no lugar de foto, `placeholder.com`, foto de banco de imagens hotlinkada.
- Três quartos com a mesma foto ou o mesmo enquadramento.
- Texto branco sobre foto clara sem scrim, ou scrim "conferido" na parte bonita da imagem.
- Hero de 3 MB servido inteiro no celular.
- Animação de entrada em cada seção; `transition: all`; loop decorativo.
- Depoimento inventado com nome e foto de banco de imagens.

## Entregáveis

`index.html`, `styles.css`, `app.js` (se precisar), `images/` (as cinco fotos copiadas),
`PLAN.md` (antes do código), `REPORT.md` com o bloco de entrega, e capturas:
`shot-1440.png`, `shot-390.png`, `shot-320.png`.

## Como medir (sem depender de olhos)

```
node scripts/shot.mjs index.html shot-1440.png 1440 900 --full --deep
node scripts/shot.mjs index.html shot-390.png 390 844 --full --deep
node scripts/shot.mjs index.html shot-320.png 320 800 --full --deep
```

`overflowX` diferente de zero é bloqueante. `contrastFails`, `clipped`, `small`, `imageFlags` e
`motionIssues` precisam estar vazios (alt ausente, imagem esticada, `transition: all`, duração fora da
tabela, loop infinito). `reducedMotionDeclared` precisa ser `true`.

Se o seu modelo não aceita imagem, diga isso no relatório e verifique por medição — não afirme que
olhou as fotos.
