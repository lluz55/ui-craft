# Fixes — measured, not guessed

The blind arm shipped this page without ever seeing it. What follows is the loop the skill
now prescribes (`verify` → `fix once`): measure, find, fix, measure again.

Tool: `node scripts/shot.mjs <page> <out.png> <w> <h> --full --deep`

## Before → after

| Measure | 1440 before | 1440 after | 390 before | 390 after |
| --- | --- | --- | --- | --- |
| `overflowX` | 0 | 0 | 0 | 0 |
| `clipped` (text cut by its box) | 0 | 0 | 0 | 0 |
| `small` (hit target < 24 px) | 7 | **0** | 7 | **0** |
| `contrastFails` | 0 | 0 | 0 | 0 |
| fonts loaded | 3/3 | 3/3 | 3/3 | 3/3 |

## The seven findings, sorted into what they actually were

**Two were the tool's fault, not the page's.** The radio inputs measure 18×18 px, which looks
like a thumb-sized failure until you notice `.radio { min-height: 44px }` — the label is the
target, the circle is decoration inside it. `shot.mjs` now resolves radios and checkboxes to
their `<label>` before measuring (`hitTarget`). A measuring path that cries wolf gets ignored,
which is worse than having no measuring path.

**Five were real**, all of them invisible to a human eye reading a screenshot:

```
section#pedido > div.wrap.pedido__grid > div.pedido__intro > p.pedido__direct:nth-of-type(2) > a
  "oi@fermento.com.br"                     141 × 18 px
body > footer.footer > div.wrap.footer__in > nav.footer__nav > a:nth-of-type(1..4)
  "os pães" / "como chega" / "assinatura" / "oi@fermento.com.br"   45–122 × 21 px
```

## The fix

```css
.footer__nav a {
  display: inline-block;
  padding-block: 0.45rem;   /* 21px → 35px tall */
}

.pedido__direct a {
  display: inline-block;
  padding-block: 0.25em;    /* 18px → 26px tall */
}
```

No re-layout, no new color, no new type. The page looks the same at a glance and stops
punishing thumbs — which is exactly the class of defect the visual path misses and the
measuring path exists for.

## What the numbers still do not say

The measurement proves the page is not broken. It says nothing about whether it is any good:
the hierarchy, the rhythm, the "pauta de padaria" conceit reading as intended — none of that
was confirmed by anyone. `REPORT.md` says so, and it should keep saying so.
