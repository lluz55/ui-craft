# T5-mesa — collections console (**Mesa**)

> Frozen task. Identical text in both arms, every round. Do not edit.

**Produto:** **Mesa** é o console de cobrança de um banco digital brasileiro (Banco Farol, fictício).
Quem usa é um negociador: passa o dia ligando para clientes em atraso, fechando acordos e
registrando o que foi dito. Ele abre *Mesa* com um contrato na mão e um cliente no telefone.

Não é um site de vendas. É uma ferramenta de trabalho, aberta o dia inteiro num monitor de 1440px,
com teclado à mão e uma segunda janela com o sistema do banco ao lado.

## Superfícies (três páginas)

1. **`fila.html`** — a fila de cobrança: todos os contratos em atraso, ordenados por risco.
   Precisa responder em três segundos: *quem eu ligo agora e por quê.*
2. **`contrato.html`** — o detalhe de um contrato: identidade do cliente, histórico de pagamentos,
   composição do débito, simulador de acordo, registro de contato e a ação de encerrar o contrato.
3. **`carta.html`** — a carta de cobrança que sai impressa e vai pelo correio. Papel A4, uma página.

Navegação real entre as três (links de verdade, URL que reflete o estado, voltar funciona).

## Dados — a foto do core (não invente outros)

Regra de encargos, declarada na tela em algum lugar visível:

- juros de 1% ao mês, *pro rata die* sobre o principal;
- multa de 2% sobre o principal;
- total = principal + juros + multa, arredondado ao centavo.

| Cliente | Contrato | Venceu | Dias | Principal | Juros | Multa | Total no core | Status |
|---|---|---|---|---|---|---|---|---|
| Heloísa Prado | CTR-4821 | 12/09 | 68 | 4.820,00 | 109,25 | 96,40 | 5.025,65 | sem contato |
| Wagner Bittencourt | CTR-5017 | 03/10 | 47 | 12.400,00 | 194,27 | 248,00 | 12.842,27 | promessa |
| Ivonete Sá | CTR-3390 | 28/08 | 83 | 1.150,00 | 31,82 | 23,00 | 1.204,82 | em acordo |
| Ademir Fontes | CTR-6104 | 05/10 | 45 | 27.900,00 | 418,50 | 558,00 | 28.876,50 | recusa |
| Cleuza Amorim | CTR-2277 | 15/07 | 127 | 890,00 | 37,68 | 17,80 | 945,48 | sem contato |
| Rafael Tavares | CTR-5533 | 22/09 | 58 | 6.300,00 | 121,80 | 126,00 | 6.547,80 | promessa |
| Marisa Queiroz | CTR-7712 | 09/09 | 71 | 9.750,00 | 230,75 | 195,00 | 10.139,75 | sem contato |
| Josué Nascimento | CTR-8045 | 30/09 | 50 | 3.480,00 | 58,00 | 69,60 | 3.607,60 | em acordo |
| Osvaldo Reis | CTR-1188 | 01/10 | 49 | 15.600,00 | 254,80 | 312,00 | 16.166,80 | parcial |

Dois fatos que a interface tem que tratar:

- **CTR-7712 tem um total que não fecha.** 9.750,00 + 230,75 + 195,00 = 10.175,75, e o core diz
  10.139,75. A diferença é de R$ 36,00. Mostre a divergência onde o número aparece — na fila e no
  detalhe — e não corrija em silêncio. Um sistema de cobrança que arredonda a própria dívida é pior
  que um que mostra o erro.
- **CTR-1188 teve pagamento parcial de R$ 4.000,00 em 20/10.** O saldo devedor não é o total; é o
  total menos o que já foi pago. O simulador parte do saldo, nunca do total.

## O que cada tela precisa ter

**Fila**
- Tabela com cliente, contrato, dias em atraso, valor, status e última tentativa de contato.
- Ordenável por qualquer coluna; filtro por status; busca por nome ou contrato.
- O status precisa ser legível sem depender de cor (texto e/ou forma).
- Linha com divergência de valores marcada de forma visível.
- Cabeçalho com o total em atraso da carteira (soma dos saldos, não dos totais) e quantos estão
  em acordo.

**Detalhe do contrato**
- Identidade do cliente e resumo do débito com a composição (principal, juros, multa, pago, saldo).
- Histórico de pagamentos (data, valor, canal) — inclusive o parcial do CTR-1188.
- **Simulador de acordo:** escolher número de parcelas (1, 3, 6, 12) e desconto de juros (0 a 60%);
  mostra valor da parcela, total do acordo e economia, recalculando ao vivo. O número tem que fechar
  com a composição acima — arredonde ao centavo de forma consistente e diga qual regra usou.
- Registro de contato: um campo de nota com data/hora, alguns registros já existentes.
- **Ação destrutiva:** "encerrar como prejuízo". Precisa nomear o contrato e o valor, exigir
  confirmação e oferecer desfazer por alguns segundos.

**Carta**
- Dados do cliente, do contrato, o valor devido, o prazo e os canais de pagamento.
- Papel branco, tinta preta, sem navegação, sem botões, sem sombra.
- Uma página A4. Nada pode quebrar no meio de um bloco de valores.

## Restrições técnicas

- HTML + CSS + JavaScript vanilla. Sem framework, sem build, sem CDN, **nenhuma requisição de rede**:
  as fontes são locais (`@font-face` com arquivo em `fonts/`) ou uma pilha do sistema.
- Tema claro e escuro completos. O escuro é remapeado por papel, não é uma inversão.
- Estados: vazio (filtro sem resultado), carregando (skeleton), erro (falha ao carregar o contrato)
  em pelo menos duas superfícies.
- 1440px é o alvo; 1024px não quebra; **320px não tem rolagem horizontal** — você decide o que
  sacrificar, mas cliente, valor e status continuam legíveis.
- Teclado: `/` foca a busca, `j`/`k` (ou setas) movem a seleção na fila, `Enter` abre, `Esc` volta,
  `Ctrl/Cmd+K` abre uma paleta de comandos. Foco gerenciado ao abrir e ao fechar o detalhe.
- Zoom de 200% sem perda de conteúdo.

## Reprovado na hora

- Cartões brancos idênticos com sombra suave sobre fundo cinza, e um indigo de destaque.
- Tabela zebrada cinza-200 sem hierarquia tipográfica, números centralizados.
- Verde de "positivo" e vermelho de "negativo" como único portador de significado.
- Gráfico decorativo sem referência; medidor em arco; rosca de oito fatias.
- Números que não fecham entre a fila, o detalhe e a carta.
- Escudo, foto ou logo placeholder cinza.
- Tema escuro que é só a mesma tela com `filter: invert()` ou `#111` de fundo com texto `#fff`.
- Carta que imprime a barra de navegação, ou que vaza para a segunda página.

## Entregáveis

`fila.html`, `contrato.html`, `carta.html`, `styles.css`, `app.js`, `PLAN.md` (antes do código),
`REPORT.md` com o bloco de entrega, e capturas: `shot-1440.png`, `shot-1440-dark.png`,
`shot-1024.png`, `shot-320.png`, `shot-carta.png` (794×1123, mídia de impressão).

## Como medir (sem depender de olhos)

```
node scripts/shot.mjs fila.html shot-1440.png 1440 900 --full --deep
node scripts/shot.mjs fila.html shot-1440-dark.png 1440 900 --full --deep --dark
node scripts/shot.mjs fila.html shot-1024.png 1024 768 --full
node scripts/shot.mjs fila.html shot-320.png 320 800 --full --deep
node scripts/shot.mjs carta.html shot-carta.png 794 1123 --full --print
```

`overflowX` diferente de zero é bloqueante. `contrastFails`, `clipped` e alvos menores que 24px
precisam estar vazios. Se o seu modelo não aceita imagem, diga isso no relatório e verifique por
medição — não afirme que olhou.
