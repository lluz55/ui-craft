# T2 — Product surface

**Frozen task. Do not edit.** Identical text in both arms, every round.

## Brief

> **Rotas** is a fleet telemetry console used by logistics coordinators in Brazil. A coordinator watches 40–120 trucks and needs to know, in one screen: which vehicles need attention right now, and why.
>
> Build the dashboard main screen.
>
> Real content you may use:
> - Vehicle rows: placa (e.g. `QXP-4F21`), motorista, status (`em rota`, `parado`, `atrasado`, `manutenção`), última posição (cidade), tempo parado, temperatura do baú (°C, only for refrigerated), próximo destino, ETA.
> - Alert examples: "temperatura fora da faixa há 12 min", "parado há 47 min em rodovia", "ETA +38 min", "documento vencido".
> - Volume: 87 vehicles in the list; 6 currently need attention.
> - Filters: status, region, only-with-alerts. Search by placa or motorista.
> - The coordinator works on a laptop (1440) and sometimes on a phone in the yard (390).
>
> Constraints: Portuguese (pt-BR), light and dark themes, no build step (`index.html` + `styles.css` + optionally `app.js` with inline sample data). Must show real loading, empty, and error behavior (a URL flag or a JS toggle is enough) rather than describing it.

## Deliverable

`index.html` + `styles.css` (+ `app.js`) in the arm directory, plus `shot-1440.png`, `shot-390.png`, and `shot-dark-1440.png`.

## What the judge looks for

1. Can a coordinator identify the six vehicles needing attention in under five seconds?
2. Is the dense table readable: alignment, tabular numerals, status colors that do not fight the accent?
3. Do empty/loading/error states exist and fit the layout?
4. Is dark mode a coherent system or an inversion?
5. 390px: is there a mobile strategy that is not a clipped table?
6. Accessibility: labels on filters, keyboard reachable rows, focus visible, contrast in both themes.

## Out of scope

Real API, auth, map rendering, charts beyond simple inline bars/sparklines, routing between screens.
