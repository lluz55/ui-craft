# Fermento — relatório de entrega

Página de marketing de assinatura para a padaria Fermento (Recife). Estática: `index.html` + `styles.css` + `fonts/` (3 arquivos OTF, Fira Sans, OFL). Sem build, sem JavaScript, sem requisição de rede — abrir o arquivo no navegador basta.

## O que foi decidido

- **Direção:** Warm Craft + Editorial (híbrido), impresso como pauta/lista de preços de padaria.
- **Paleta:** Farinha & Folha — papel `#EFEAD9`, papel-2 `#F7F3E6`, tinta `#1E1B14`, secundário `#5C5645`, acento (verde-folha) `#2F5A38`, casca `#241E15`, fio `#CFC7B0`.
- **Tipografia:** Fira Sans Compressed 900 (display/títulos, minúsculas), Fira Sans 400 (corpo), 600 (rótulos/dados com `tabular-nums`).
- **Movimento ousado:** a faixa em `--crust` com o `48` gigante e a linha do tempo 0→48 h. É o único lugar onde o tipo sai do grid.
- **Lógica de layout:** herói em 2 colunas (texto + "recibo de assinatura" — o artefato que substitui a foto); depois faixa escura, pauta dos três pães com fios, passos da entrega, dois planos, quem faz + perguntas, formulário, rodapé.
- **Fotos ausentes:** resolvidas por descrição de etiqueta de saco de farinha + uma frase que assume o buraco. Nenhum retângulo cinza, nenhuma URL de imagem.

## Bloco de entrega

```
Decided:        Warm Craft + Editorial (pauta de padaria) — paleta "Farinha & Folha" (paper #EFEAD9, ink #1E1B14, accent #2F5A38, crust #241E15); tipos: Fira Sans Compressed 900 display, Fira Sans 400/600 corpo e rótulos.
Verified:       renderizado em Chromium headless (1440x900, 390x844, 320x800): scrollWidth 1425/375/305 contra viewports 1440/390/320, nenhum elemento passando da borda, nenhum texto cortado; 3 @font-face com status "loaded"; contraste calculado nos hex reais (corpo 14.27:1, secundário 6.07:1, acento 6.61:1, texto sobre acento 7.16:1, papel sobre casca 13.72:1); HTML sem JavaScript e sem dependência externa.
Not verified:   não olhei os PNGs — o modelo desta sessão não aceita entrada de imagem (read_image recusa) e não há outro modelo disponível; o layout foi verificado por medição de DOM via CDP, não por inspeção visual. Teclado/ordem de foco e zoom 200% não foram exercitados numa sessão real (só a largura de 320px como proxy). O envio do formulário por mailto não foi testado em cliente de e-mail real.
Known gaps:     sem backend — o formulário abre o cliente de e-mail; estado de sucesso da página não existe (o sucesso é a mensagem sair); sem modo escuro (color-scheme: light apenas); sem estado de carregamento (não há dado assíncrono); páginas de checkout/conta/obrigado fora do escopo.
```

## Evidências

- Contraste medido sobre os hex reais (Node): `#1E1B14`/`#EFEAD9` = 14.27, `#5C5645`/`#EFEAD9` = 6.07, `#5C5645`/`#F7F3E6` = 6.59, `#2F5A38`/`#EFEAD9` = 6.61, `#F7F3E6`/`#2F5A38` = 7.16, `#EFEAD9`/`#241E15` = 13.72, `#B7AD95`/`#241E15` = 7.41, `#8E2B18`/`#EFEAD9` = 6.95.
- Larguras medidas por CDP (DevTools Protocol, Chromium 152): 1440 → `scrollWidth` 1425; 390 → 375; 320 → 305. Listas de elementos fora da viewport e de texto cortado: vazias nas três larguras.
- Fontes locais declaradas em `@font-face` com `font-display: swap`; fallback `"Fira Sans", "Arial Narrow", system-ui, sans-serif` e `system-ui, -apple-system, "Segoe UI", Roboto, Arial`. Nenhum `url()` remoto no CSS.
- Estado de erro do formulário usável sem JS: `:user-invalid` revela a mensagem inline (`index.html` — campos `nome`, `email`, `bairro`).
- Bairro fora da área é o estado vazio do serviço, com texto e ação (lista de espera por rua).

## Observações

- O recibo do herói termina cerca de 270 px acima do fim da coluna esquerda em 1440. Foi mantido: o papel alinhado ao topo (e não ao rodapé) deixa a lista dos três pães visível no primeiro ecrã, que é o que o teste de 3 segundos exige.
- Arquivos de captura: `shot-1440.png` (1440×900) e `shot-390.png` (390×844), gerados com `chromium --headless`.
