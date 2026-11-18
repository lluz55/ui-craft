/* Atlético Boa Vista — interações mínimas: tema, ordenação, filtro, estados.
   Sem bibliotecas, sem build, sem rede. */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ── tema ───────────────────────────────────────────────────────────── */

  const rootEl = document.documentElement;
  const themeBtn = $('#themeToggle');
  const themeLabel = $('#themeLabel');
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  let chosen = null; // null = segue o sistema

  const isDark = () => (chosen ? chosen === 'dark' : mq.matches);

  function paintTheme() {
    if (chosen) rootEl.dataset.theme = chosen;
    else rootEl.removeAttribute('data-theme');
    const dark = isDark();
    themeLabel.textContent = dark ? 'Tema: escuro' : 'Tema: claro';
    themeBtn.setAttribute('aria-label', dark ? 'Mudar para o tema claro' : 'Mudar para o tema escuro');
  }

  themeBtn.addEventListener('click', () => {
    chosen = isDark() ? 'light' : 'dark';
    paintTheme();
  });
  mq.addEventListener('change', () => { if (!chosen) paintTheme(); });
  paintTheme();

  /* ── estados de região ──────────────────────────────────────────────── */

  function setState(region, state) {
    region.dataset.state = state;
    region.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
    if (state !== 'loading') region.removeAttribute('aria-busy');
  }

  /* ── elenco: filtro, ordenação, estados ─────────────────────────────── */

  const region = $('#squadRegion');
  const rows = $$('#squadRegion tbody tr');
  const countEl = $('#squadCount');
  const noteEl = $('#squadNote');
  const searchEl = $('#search');
  const statusEl = $('#statusFilter');
  const chips = $$('.chip[data-pos]');
  const filters = { pos: 'todas', status: 'todos', q: '' };

  const GROUP = { GOL: 'GOL', ZAG: 'DEF', LD: 'DEF', LE: 'DEF', VOL: 'MEI', MEI: 'MEI', ATA: 'ATA', PD: 'ATA', PE: 'ATA' };
  const SORT_FIELD = {
    num: 'num', nome: 'name', pos: 'pos', idade: 'age', j: 'j', g: 'g',
    cards: 'cards', rate: 'rate', cond: 'cond', contrato: 'contract',
  };

  function apply() {
    const q = filters.q.trim().toLowerCase();
    let visible = 0;
    for (const tr of rows) {
      const okPos = filters.pos === 'todas' || GROUP[tr.dataset.pos] === filters.pos;
      const okStatus = filters.status === 'todos' || tr.dataset.status === filters.status;
      const okQ = !q || tr.dataset.name.toLowerCase().includes(q);
      const show = okPos && okStatus && okQ;
      tr.hidden = !show;
      if (show) visible += 1;
    }
    countEl.textContent = visible + ' de ' + rows.length;
    noteEl.hidden = visible === 0;
    const st = region.dataset.state;
    if (st === 'ready' || st === 'empty') setState(region, visible === 0 ? 'empty' : 'ready');
    return visible;
  }

  function resetFilters() {
    filters.pos = 'todas';
    filters.status = 'todos';
    filters.q = '';
    chips.forEach((c) => c.setAttribute('aria-pressed', c.dataset.pos === 'todas' ? 'true' : 'false'));
    statusEl.value = 'todos';
    searchEl.value = '';
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      filters.pos = chip.dataset.pos;
      chips.forEach((c) => c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'));
      apply();
    });
  });

  statusEl.addEventListener('change', () => { filters.status = statusEl.value; apply(); });
  searchEl.addEventListener('input', () => { filters.q = searchEl.value; apply(); });

  /* ordenação */
  let sortKey = null;
  let sortDir = 'asc';

  $$('table.squad thead button[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      sortDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc';
      sortKey = key;
      const field = SORT_FIELD[key] || key;

      rows.sort((a, b) => {
        const av = a.dataset[field];
        const bv = b.dataset[field];
        let cmp;
        if (field === 'name' || field === 'pos') cmp = av.localeCompare(bv, 'pt-BR');
        else cmp = Number(av) - Number(bv);
        if (cmp === 0) cmp = Number(a.dataset.num) - Number(b.dataset.num);
        return sortDir === 'asc' ? cmp : -cmp;
      });
      const body = rows[0].parentNode;
      rows.forEach((r) => body.appendChild(r));

      $$('table.squad thead th').forEach((th) => th.removeAttribute('aria-sort'));
      const th = btn.closest('th');
      th.setAttribute('aria-sort', sortDir === 'asc' ? 'ascending' : 'descending');
      apply();
    });
  });

  let squadTimer;
  function squadLoad() {
    clearTimeout(squadTimer);
    setState(region, 'loading');
    squadTimer = setTimeout(() => {
      const visible = apply();
      setState(region, visible === 0 ? 'empty' : 'ready');
    }, 900);
  }

  $('#squadMenu').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-squad-state]');
    if (!btn) return;
    const next = btn.dataset.squadState;
    $('#squadMenu').open = false;
    if (next === 'loading') squadLoad();
    else if (next === 'error') setState(region, 'error');
    else { apply(); setState(region, 'ready'); }
  });

  $('#refreshSquad').addEventListener('click', squadLoad);
  $('#retrySquad').addEventListener('click', squadLoad);
  $('#clearFilters').addEventListener('click', () => { resetFilters(); apply(); searchEl.focus(); });

  /* ── leituras: estados ──────────────────────────────────────────────── */

  const rRegion = $('#readingsRegion');
  const rSync = $('#readingSync');
  let rTimer;

  function stampSync() {
    const t = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    rSync.textContent = 'sincronizado ' + t;
  }

  function readingsLoad() {
    clearTimeout(rTimer);
    setState(rRegion, 'loading');
    rTimer = setTimeout(() => { setState(rRegion, 'ready'); stampSync(); }, 900);
  }

  document.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-reading-state]');
    if (btn) {
      const next = btn.dataset.readingState;
      const menu = $('#readingMenu');
      if (menu) menu.open = false;
      if (next === 'loading') readingsLoad();
      else setState(rRegion, next);
    }
    /* fecha menus abertos ao clicar fora */
    $$('details.menu[open]').forEach((d) => { if (!d.contains(event.target)) d.open = false; });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') $$('details.menu[open]').forEach((d) => { d.open = false; });
  });

  $('#refreshReadings').addEventListener('click', readingsLoad);

  /* estado inicial calculado a partir dos dados reais */
  apply();
})();
