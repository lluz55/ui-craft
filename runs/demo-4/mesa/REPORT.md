# Mesa de cobrança — relatório

Três páginas: `fila.html` (fila de contratos em atraso), `contrato.html` (dossiê + simulador + encerramento), `carta.html` (notificação A4). Vanilla, sem build, sem CDN, sem requisições de rede; fontes locais em `fonts/` (Fira Sans 400/500/600, Fira Sans Condensed 600/700, Fira Mono 400).

Arquivos: `PLAN.md` (plano entregue antes do código), `fila.html`, `contrato.html`, `carta.html`, `styles.css`, `app.js`, `fonts/`, capturas `shot-1440.png`, `shot-1440-dark.png`, `shot-1024.png`, `shot-320.png`, `shot-carta.png`, além de `contrato-1440.png`, `contrato-1440-dark.png`, `contrato-320.png`, `zoom-720.png`.

## Direção

Mesa de operação de cobrança: densa, plana, tipográfica. A tela é uma ferramenta de trabalho de quem liga para devedores o dia inteiro, então o desenho privilegia varredura em coluna, números comparáveis e estado do contrato lido sem cor. Painéis com borda de 1px em vez de sombra (sombra só no toast e nos diálogos, que flutuam de verdade). Raio 0 em painéis, 2px em controles. Ritmo de 4px.

Estratégia cromática: rampa monocromática verde-acinzentada + um único acento sódio (âmbar) reservado para ação primária e para o número-âncora. Status nunca depende só da cor: cada chip tem forma própria em SVG (traço, círculo cheio, meio círculo, X, losango) e o texto sempre nomeia o estado.

Movimento ousado: o total da carteira em Fira Sans Condensed 64px (`R$ 81.356,67`), com a nota de divergência de `R$ 36,00` encostada nele — o número que a tela existe para mostrar e a ressalva que ele carrega no mesmo bloco.

## Dados

Os nove contratos são exatamente os do briefing; nenhum valor foi inventado ou corrigido. Dois fatos deliberados:

- **Divergência de R$ 36,00 (CTR-7712, Marisa Queiroz):** principal + juros + multa somam 10.175,75, mas o total registrado no core é 10.139,75. A composição mostra a soma real, uma linha de divergência nomeia a diferença e a linha da fila recebe a marca `⚑ divergência`. Nada é ajustado em silêncio.
- **Pagamento parcial (CTR-1188, Osvaldo Reis):** R$ 4.000,00 em 20/10 via PIX. O total do core é 16.166,80; o saldo devedor é 12.166,80, e o simulador parte do saldo, não do total. A fila informa R$ 4.000,00 recebidos e o total da carteira (81.356,67) é a soma dos saldos, não dos totais.

Regra de encargos exibida: juros de 1% a.m. pro rata die sobre o principal, multa de 2% sobre o principal, total arredondado ao centavo.

## Verificação (sem ver imagens)

`/home/lluz/dev/ui-craft/scripts/shot.mjs` (Chromium headless, 1440×900 e demais), auditoria `--deep`, JSON em `/tmp/mesa-audit/`. Todas as execuções saíram com código 0.

| página / condição | viewport | scrollWidth | overflowX | offenders | clipped | small | contrastFails | altura |
|---|---|---|---|---|---|---|---|---|
| fila clara | 1440×900 | 1440 | 0 | 0 | 0 | 0 | 0 | 1016 |
| fila escura | 1440×900 | 1440 | 0 | 0 | 0 | 0 | 0 | 1016 |
| fila | 1024×768 | 1024 | 0 | 0 | 0 | 0 | 0 | 1203 |
| fila | 320×800 | 320 | 0 | 0 | 0 | 0 | 0 | 1897 |
| fila (proxy 200%) | 720×900 | 720 | 0 | 0 | 0 | 0 | 0 | 1207 |
| contrato claro | 1440×900 | 1440 | 0 | 0 | 0 | 0 | 0 | 1142 |
| contrato escuro | 1440×900 | 1440 | 0 | 0 | 0 | 0 | 0 | 1142 |
| contrato | 320×800 | 320 | 0 | 0 | 0 | 0 | 0 | 1997 |
| carta `--print` | 794×1123 | 794 | 0 | 0 | 0 | 0 | 0 | 1123 |

- Fontes: `fontStatus: loaded`; Fira Sans (400/500/600), Fira Sans Condensed e Fira Mono carregadas e usadas; famílias não usadas na carta aparecem como "unloaded" por não terem glifo renderizado, o que é esperado.
- Títulos: um `h1` por página, sem saltos (fila: `h1 Contratos em atraso`; contrato: `h1 Heloísa Prado` + `h2` de seções; carta: `h1 Notificação de débito em atraso` + `h2 Prazo` + `h2 Canais de pagamento`).
- Contraste: pares medidos contra o fundo opaco ancestral; nenhuma falha em nenhuma execução. O texto de apoio da faixa mais clara fica em 15,63:1 e o rodapé em ≥4,5:1 após a correção do ponto separador.
- Alvos de toque: `small` vazio; `a.row-open` com 26px de altura mínima, `⚑` com 24px, links de foco com 24px.
- Estouro horizontal: 0 em 320, 1024, 1440, 720 e na impressão. `exit code 2` nunca ocorreu.
- Estados vazios e de erro medidos em páginas de sonda temporárias (removidas): erro mostra `h2 Não foi possível carregar a fila do core.` com `overflowX 0`, `small 0`, `contrastFails 0`; vazio mostra `Nenhum contrato com esse filtro`, 0 linhas, "0 de 9", sem falhas de contraste.
- Carta em `--print`: 794×1123, uma página, `focusables 0` (nenhum controle de navegação no papel), sem falha de contraste, sem estouro.
- Composição e simulador verificados no DOM renderizado (sonda com timers em 0): `compRows=6`, `totalAcordo=R$ 4.992,87` para CTR-4821 com desconto padrão de 30% (5.025,65 − round2(109,25 × 30%)). Fila renderizada: total 81.356,67, "9 de 9", 9 linhas, marca de divergência presente.

## Interação implementada

Busca por nome/contrato, filtro por status, ordenação em todas as colunas (cabeçalho com `aria-sort` e seta textual), seleção por `j`/`k`/setas, `Enter` abre, `Esc` limpa/volta, `/` foca a busca, `Ctrl/Cmd+K` abre a paleta de comandos, foco visível em tudo que recebe foco. Tema claro/escuro com `localStorage`; o escuro é remapeado, não invertido. Simulador 1/3/6/12 × 0–60% recalcula ao vivo e declara a regra de arredondamento; "encerrar como prejuízo" nomeia contrato e valor, exige confirmação digitada e oferece desfazer por 8s no toast, com estado de encerrado persistido em `sessionStorage`.

---

**Decided:**
- Rampa verde-acinzentada + acento sódio único; status por forma + texto; raio 0/2px; borda em vez de sombra em painéis estáticos.
- Número-âncora em 64px condensado com a nota de divergência no mesmo bloco; não centralizar números.
- Divergência de 36,00 exposta e nunca corrigida; simulador parte do saldo (12.166,80) no contrato parcial.
- Fontes locais Fira Sans / Condensed / Mono, sem rede.

**Verified:**
- Medido: `overflowX 0`, `offenders 0`, `clipped 0`, `small 0`, `contrastFails 0` em 1440 clara, 1440 escura, 1024, 320, 720 (proxy de 200%) e carta em `--print` 794×1123.
- Um `h1` por página sem saltos, fontes carregadas, estados vazio e erro renderizando com as mesmas métricas limpas, composição de 6 linhas, total da fila 81.356,67 e simulador 4.992,87 conferidos no DOM.

**Not verified:**
- Ritmo, hierarquia e atmosfera: não vi as imagens; nenhuma confirmação visual foi possível, só números de auditoria.
- Percurso completo de teclado e leitura em leitor de tela: não executados ponta a ponta.
- Zoom real de 200% do navegador: usei largura 720 como proxy.
- Estado `?estado=carregando` (skeleton) não foi medido isoladamente; a carta foi conferida só com o contrato padrão.
- Impressão em impressora física: medida apenas em emulação `--print`.

**Known gaps:**
- Canais de pagamento da carta (PIX `cobranca@bancofarol.com.br`, 0800 591 2020) são texto de demonstração, não dados do briefing.
- A divergência é sinalizada, por decisão, não reconciliada; quem operar precisa decidir o valor correto.
- Encerramentos e tema vivem em `sessionStorage`/`localStorage`, sem backend.
- `.panel:has()` exige navegador moderno; em versões antigas o esqueleto da composição não é ocultado.
