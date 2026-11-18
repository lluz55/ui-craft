/* Mesa — Banco Farol. Vanilla, sem rede. Dados: a foto do core do briefing. */
(() => {
  'use strict';

  /* ---------------------------------------------------------------- dados */
  const DATA = [
    { cliente: 'Heloísa Prado', contrato: 'CTR-4821', venceu: '12/09', dias: 68,
      principal: 4820.00, juros: 109.25, multa: 96.40, totalCore: 5025.65, pago: 0,
      status: 'sem-contato', notas: [] },
    { cliente: 'Wagner Bittencourt', contrato: 'CTR-5017', venceu: '03/10', dias: 47,
      principal: 12400.00, juros: 194.27, multa: 248.00, totalCore: 12842.27, pago: 0,
      status: 'promessa', notas: [
        { quando: '14/10 09:47', canal: 'telefone', texto: 'Prometeu PIX até 20/10. Pediu boleto atualizado por e-mail.' },
        { quando: '30/09 16:20', canal: 'telefone', texto: 'Não reconheceu o valor da multa; expliquei 2% sobre o principal.' }
      ] },
    { cliente: 'Ivonete Sá', contrato: 'CTR-3390', venceu: '28/08', dias: 83,
      principal: 1150.00, juros: 31.82, multa: 23.00, totalCore: 1204.82, pago: 0,
      status: 'acordo', notas: [
        { quando: '09/10 11:03', canal: 'telefone', texto: 'Aceitou acordo em 3×; aguardando assinatura do termo.' },
        { quando: '02/10 15:41', canal: 'sms', texto: 'Aviso de atraso enviado.' }
      ] },
    { cliente: 'Ademir Fontes', contrato: 'CTR-6104', venceu: '05/10', dias: 45,
      principal: 27900.00, juros: 418.50, multa: 558.00, totalCore: 28876.50, pago: 0,
      status: 'recusa', notas: [
        { quando: '15/10 14:12', canal: 'telefone', texto: 'Recusou acordo. Diz que vai contestar os juros judicialmente.' },
        { quando: '08/10 10:05', canal: 'telefone', texto: 'Sem resposta após 3 tentativas.' }
      ] },
    { cliente: 'Cleuza Amorim', contrato: 'CTR-2277', venceu: '15/07', dias: 127,
      principal: 890.00, juros: 37.68, multa: 17.80, totalCore: 945.48, pago: 0,
      status: 'sem-contato', notas: [] },
    { cliente: 'Rafael Tavares', contrato: 'CTR-5533', venceu: '22/09', dias: 58,
      principal: 6300.00, juros: 121.80, multa: 126.00, totalCore: 6547.80, pago: 0,
      status: 'promessa', notas: [
        { quando: '16/10 08:30', canal: 'whatsapp', texto: 'Prometeu pagar a 1ª parcela na sexta.' },
        { quando: '06/10 17:22', canal: 'telefone', texto: 'Pediu desconto de 40% à vista; encaminhei para análise.' }
      ] },
    { cliente: 'Marisa Queiroz', contrato: 'CTR-7712', venceu: '09/09', dias: 71,
      principal: 9750.00, juros: 230.75, multa: 195.00, totalCore: 10139.75, pago: 0,
      status: 'sem-contato', notas: [] },
    { cliente: 'Josué Nascimento', contrato: 'CTR-8045', venceu: '30/09', dias: 50,
      principal: 3480.00, juros: 58.00, multa: 69.60, totalCore: 3607.60, pago: 0,
      status: 'acordo', notas: [
        { quando: '13/10 10:40', canal: 'telefone', texto: 'Assinou acordo em 6×; primeira parcela em 20/11.' },
        { quando: '01/10 09:15', canal: 'email', texto: 'Enviei termo de acordo.' }
      ] },
    { cliente: 'Osvaldo Reis', contrato: 'CTR-1188', venceu: '01/10', dias: 49,
      principal: 15600.00, juros: 254.80, multa: 312.00, totalCore: 16166.80, pago: 4000.00,
      status: 'parcial', notas: [
        { quando: '20/10 13:58', canal: 'sistema', texto: 'Pagamento parcial de R$ 4.000,00 recebido via PIX.' }
      ] }
  ];

  // pagamentos registrados (só o parcial do CTR-1188 existe no extrato do core)
  const PAGAMENTOS = {
    'CTR-1188': [{ data: '20/10', valor: 4000.00, canal: 'PIX', obs: 'Parcial — abatido do principal' }]
  };

  const STATUS = {
    'sem-contato': { label: 'sem contato', shape: 'circle' },
    'promessa': { label: 'promessa', shape: 'half' },
    'acordo': { label: 'em acordo', shape: 'square' },
    'recusa': { label: 'recusa', shape: 'x' },
    'parcial': { label: 'parcial', shape: 'tri' },
    'encerrado': { label: 'encerrado (prejuízo)', shape: 'bar' }
  };

  const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
  const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const brl = (n) => money.format(n);
  const num = (n) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const comp = (c) => round2(c.principal + c.juros + c.multa);
  const saldo = (c) => round2(c.totalCore - c.pago);
  const div = (c) => round2(c.totalCore - comp(c));
  const ultimo = (c) => (c.notas.length ? c.notas[0].quando.slice(0, 5) : '—');
  const byCtr = (id) => DATA.find((c) => c.contrato === id);

  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.page;

  /* -------------------------------------------------------------- estados */
  const store = {
    read(key, fallback) {
      try { const v = sessionStorage.getItem('mesa:' + key); return v ? JSON.parse(v) : fallback; }
      catch (_) { return fallback; }
    },
    write(key, value) {
      try { sessionStorage.setItem('mesa:' + key, JSON.stringify(value)); } catch (_) {}
    }
  };
  const encerrados = new Set(store.read('encerrados', []));
  const statusOf = (c) => (encerrados.has(c.contrato) ? 'encerrado' : c.status);

  /* ---------------------------------------------------------------- tema */
  function applyTheme(mode) {
    document.documentElement.dataset.theme = mode;
    const btn = $('#themeBtn');
    if (btn) {
      btn.setAttribute('aria-label', mode === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro');
      btn.textContent = mode === 'dark' ? 'claro' : 'escuro';
      btn.title = btn.getAttribute('aria-label');
    }
  }
  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem('mesa:tema'); } catch (_) {}
    const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));
    const btn = $('#themeBtn');
    if (btn) btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('mesa:tema', next); } catch (_) {}
      applyTheme(next);
    });
  }

  /* --------------------------------------------------------------- toast */
  let toastTimer = null;
  let undoFn = null;
  function toast(message, undoLabel, undo, ms = 8000) {
    const el = $('#toast');
    if (!el) return;
    clearTimeout(toastTimer);
    el.innerHTML = '<p class="toast-msg"></p>';
    el.querySelector('.toast-msg').textContent = message;
    undoFn = undo || null;
    if (undo) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'toast-undo';
      b.textContent = undoLabel || 'Desfazer';
      b.addEventListener('click', () => {
        if (undoFn) undoFn();
        undoFn = null;
        hideToast();
      });
      el.appendChild(b);
    }
    el.hidden = false;
    el.classList.add('is-on');
    toastTimer = setTimeout(hideToast, ms);
  }
  function hideToast() {
    const el = $('#toast');
    if (!el) return;
    el.classList.remove('is-on');
    el.hidden = true;
    undoFn = null;
  }

  /* ------------------------------------------------------- paleta de comandos */
  function initPalette() {
    const dlg = $('#cmd');
    if (!dlg) return;
    const input = $('#cmdInput');
    const list = $('#cmdList');
    let items = [];
    let active = 0;

    const commands = () => {
      const base = [
        { label: 'Ir para a fila de cobrança', hint: 'fila.html', run: () => (location.href = 'fila.html') },
        { label: 'Abrir carta do contrato em foco', hint: 'carta.html', run: () => (location.href = 'carta.html?ctr=' + (currentCtr() || 'CTR-4821')) },
        { label: 'Alternar tema claro e escuro', hint: 'tema', run: () => $('#themeBtn').click() },
        { label: 'Ver estado de erro do core', hint: 'demonstração', run: () => addParam('estado', 'erro') },
        { label: 'Ver estado de carregamento', hint: 'demonstração', run: () => addParam('estado', 'carregando') }
      ];
      if (page === 'fila') {
        base.unshift(
          { label: 'Limpar busca e filtros', hint: 'fila', run: () => { if (window.mesaFila) window.mesaFila.limpar(); } },
          { label: 'Ordenar por dias em atraso', hint: 'fila', run: () => { if (window.mesaFila) window.mesaFila.ordenar('dias'); } },
          { label: 'Ordenar por saldo devedor', hint: 'fila', run: () => { if (window.mesaFila) window.mesaFila.ordenar('saldo'); } },
          { label: 'Ver estado vazio', hint: 'demonstração', run: () => { location.href = 'fila.html?vazio=1'; } }
        );
      }
      if (page === 'contrato') {
        base.unshift(
          { label: 'Voltar para a fila', hint: 'Esc', run: () => volta() },
          { label: 'Registrar contato', hint: 'contrato', run: () => { const t = $('#nota'); if (t) t.focus(); } },
          { label: 'Encerrar contrato como prejuízo', hint: 'ação destrutiva', run: () => $('#btnEncerrar') && $('#btnEncerrar').click() }
        );
      }
      return base;
    };

    function addParam(k, v) {
      const u = new URL(location.href);
      u.searchParams.set(k, v);
      location.href = u.href;
    }
    function currentCtr() {
      return params.get('ctr') || (page === 'contrato' ? ($('#cliNome') && $('#cliNome').dataset.ctr) : null);
    }
    function volta() {
      if (document.referrer && document.referrer.startsWith(location.origin + '/') && history.length > 1) history.back();
      else location.href = 'fila.html';
    }
    window.mesaVolta = volta;

    function render() {
      const q = input.value.trim().toLowerCase();
      items = commands().filter((c) => (c.label + ' ' + c.hint).toLowerCase().includes(q));
      active = Math.min(active, Math.max(0, items.length - 1));
      list.innerHTML = '';
      if (!items.length) {
        const li = document.createElement('li');
        li.className = 'cmd-empty';
        li.textContent = 'Nenhum comando com esse texto.';
        list.appendChild(li);
        input.removeAttribute('aria-activedescendant');
        return;
      }
      items.forEach((cmd, i) => {
        const li = document.createElement('li');
        li.id = 'cmd-' + i;
        li.role = 'option';
        li.className = 'cmd-item' + (i === active ? ' is-active' : '');
        li.setAttribute('aria-selected', i === active ? 'true' : 'false');
        const l = document.createElement('span');
        l.textContent = cmd.label;
        const h = document.createElement('span');
        h.className = 'cmd-hint';
        h.textContent = cmd.hint;
        li.append(l, h);
        li.addEventListener('mousedown', (e) => { e.preventDefault(); run(i); });
        list.appendChild(li);
      });
      input.setAttribute('aria-activedescendant', 'cmd-' + active);
    }
    function run(i) {
      const cmd = items[i];
      dlg.close();
      if (cmd) cmd.run();
    }
    function open() {
      active = 0;
      input.value = '';
      render();
      if (!dlg.open) dlg.showModal();
      input.focus();
    }
    window.mesaPalette = open;
    const trigger = $('#cmdBtn');
    if (trigger) trigger.addEventListener('click', open);
    input.addEventListener('input', render);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); active = (active + 1) % Math.max(1, items.length); render(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); active = (active - 1 + items.length) % Math.max(1, items.length); render(); }
      if (e.key === 'Enter') { e.preventDefault(); run(active); }
    });
  }

  /* ---------------------------------------------------- pedaços compartilhados */
  function statusChip(key) {
    const s = STATUS[key];
    const shape = {
      circle: '<svg viewBox="0 0 10 10" aria-hidden="true"><circle cx="5" cy="5" r="3.4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
      half: '<svg viewBox="0 0 10 10" aria-hidden="true"><circle cx="5" cy="5" r="3.6" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M5 1.4a3.6 3.6 0 0 0 0 7.2z" fill="currentColor"/></svg>',
      square: '<svg viewBox="0 0 10 10" aria-hidden="true"><rect x="2" y="2" width="6" height="6" fill="currentColor"/></svg>',
      x: '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>',
      tri: '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M5 1.6l4 6.8H1z" fill="currentColor"/></svg>',
      bar: '<svg viewBox="0 0 10 10" aria-hidden="true"><rect x="1.6" y="4" width="6.8" height="2" fill="currentColor"/></svg>'
    }[s.shape];
    return '<span class="chip chip--' + key + '">' + shape + '<span>' + s.label + '</span></span>';
  }

  function setText(sel, text) {
    const el = $(sel);
    if (el) el.textContent = text;
  }

  function footerClock() {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    $$('.js-clock').forEach((el) => { el.textContent = dd + '/' + mm + ' · ' + hh + ':' + mi; });
    $$('.js-date').forEach((el) => { el.textContent = dd + '/' + mm; });
  }

  /* -------------------------------------------------------------- fila.html */
  function initFila() {
    const tableBox = $('#tabela');
    if (!tableBox) return;

    const state = {
      q: params.get('q') || '',
      status: params.get('status') || 'todos',
      sort: params.get('sort') || 'dias',
      dir: params.get('dir') === 'asc' ? 'asc' : 'desc',
      active: 0
    };
    if (params.get('vazio') === '1') { state.q = 'Bittencourt'; state.status = 'acordo'; }

    const form = $('#filtros');
    const busca = $('#busca');
    const statusSel = $('#status');
    const sortSel = $('#sortMobile');
    const countEl = $('#contagem');
    const clearBtn = $('#limpar');
    const tabela = $('#tabela');

    busca.value = state.q;
    statusSel.value = state.status;
    if (sortSel) sortSel.value = state.sort + ':' + state.dir;

    const comparators = {
      cliente: (a, b) => a.cliente.localeCompare(b.cliente, 'pt-BR'),
      contrato: (a, b) => a.contrato.localeCompare(b.contrato),
      venceu: (a, b) => {
        const k = (x) => { const [d, m] = x.venceu.split('/'); return Number(m) * 100 + Number(d); };
        return k(a) - k(b);
      },
      dias: (a, b) => a.dias - b.dias,
      saldo: (a, b) => saldo(a) - saldo(b),
      status: (a, b) => STATUS[statusOf(a)].label.localeCompare(STATUS[statusOf(b)].label, 'pt-BR'),
      contato: (a, b) => (a.notas[0] ? a.notas[0].quando : '') .localeCompare(b.notas[0] ? b.notas[0].quando : '')
    };

    function visible() {
      const q = state.q.trim().toLowerCase();
      let rows = DATA.filter((c) => {
        const okStatus = state.status === 'todos' || statusOf(c) === state.status;
        const okQ = !q || c.cliente.toLowerCase().includes(q) || c.contrato.toLowerCase().includes(q);
        return okStatus && okQ;
      });
      const cmp = comparators[state.sort] || comparators.dias;
      rows.sort((a, b) => (state.dir === 'asc' ? cmp(a, b) : cmp(b, a)));
      return rows;
    }

    function syncUrl() {
      const u = new URL(location.href);
      const set = (k, v, keep) => { if (keep) u.searchParams.set(k, v); else u.searchParams.delete(k); };
      set('q', state.q, !!state.q);
      set('status', state.status, state.status !== 'todos');
      set('sort', state.sort, state.sort !== 'dias');
      set('dir', state.dir, state.dir !== 'desc');
      u.searchParams.delete('vazio');
      history.replaceState(null, '', u);
    }

    function renderStats() {
      const total = round2(DATA.reduce((s, c) => s + saldo(c), 0));
      const emAcordo = DATA.filter((c) => statusOf(c) === 'acordo').length;
      const semContato = DATA.filter((c) => statusOf(c) === 'sem-contato').length;
      const maior = Math.max(...DATA.map((c) => c.dias));
      setText('#totalNum', num(total));
      setText('#statContratos', String(DATA.length));
      setText('#statAcordo', String(emAcordo));
      setText('#statSem', String(semContato));
      setText('#statMaior', maior + ' d');
      setText('#statParcial', DATA.filter((c) => c.pago > 0).length + ' com pagamento parcial');

      const divergentes = DATA.filter((c) => Math.abs(div(c)) >= 0.005);
      const somaDiv = round2(divergentes.reduce((s, c) => s + Math.abs(div(c)), 0));
      const box = $('#divergencia');
      if (divergentes.length) {
        box.hidden = false;
        box.innerHTML = '';
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'flag-btn';
        b.innerHTML = '<span class="flag-mark" aria-hidden="true">⚑</span> ' + divergentes.length +
          ' divergência no core: ' + brl(somaDiv) + ' — ver contrato';
        b.addEventListener('click', () => {
          state.q = divergentes[0].contrato;
          busca.value = state.q;
          render();
          const link = $('.row-open');
          if (link) link.focus();
          syncUrl();
        });
        box.appendChild(b);
      } else {
        box.hidden = true;
      }
    }

    function rowHTML(c, idx) {
      const d = div(c);
      const st = statusOf(c);
      const flag = Math.abs(d) >= 0.005;
      const notas = c.notas.length ? c.notas[0].texto : '';
      const tr = document.createElement('tr');
      tr.className = 'fila-row' + (flag ? ' is-flag' : '') + (st === 'encerrado' ? ' is-closed' : '');
      tr.dataset.ctr = c.contrato;
      tr.dataset.idx = String(idx);
      tr.innerHTML =
        '<td data-col="cliente"><a class="row-open" href="contrato.html?ctr=' + c.contrato + '">' +
          '<span class="row-name">' + c.cliente + '</span>' +
          (c.pago > 0 ? '<span class="row-sub">pagou ' + brl(c.pago) + '</span>' : '') +
        '</a></td>' +
        '<td data-col="contrato" class="mono">' + c.contrato + '</td>' +
        '<td data-col="venceu" class="mono num">' + c.venceu + '</td>' +
        '<td data-col="dias" class="num"><span class="dias">' + c.dias + '</span><span class="unit"> d</span></td>' +
        '<td data-col="valor" class="num"><span class="valor">' + brl(saldo(c)) + '</span>' +
          (flag ? '<button type="button" class="cell-flag js-flag" title="Composição soma ' + brl(comp(c)) +
            '; o core registra ' + brl(c.totalCore) + '. Diferença de ' + brl(Math.abs(d)) + ' em conciliação.">' +
            '⚑ divergência ' + brl(Math.abs(d)) + '</button>' : '') +
        '</td>' +
        '<td data-col="status">' + statusChip(st) + '</td>' +
        '<td data-col="contato" class="num mono">' + ultimo(c) +
          (notas ? '<span class="sr-only"> — ' + notas + '</span>' : '') + '</td>';
      return tr;
    }

    function render() {
      const rows = visible();
      renderStats();
      tabela.innerHTML = '';
      if (!rows.length) {
        const empty = document.createElement('div');
        empty.className = 'empty';
        empty.innerHTML = '<p class="empty-title">Nenhum contrato com esse filtro</p>' +
          '<p class="empty-text">A busca' + (state.q ? ' por “' + state.q.replace(/[<>&]/g, '') + '”' : '') +
          ' e o status “' + (state.status === 'todos' ? 'todos' : STATUS[state.status].label) +
          '” não cruzaram nenhum dos 9 contratos da carteira.</p>';
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'btn';
        b.textContent = 'Limpar filtros';
        b.addEventListener('click', limpar);
        empty.appendChild(b);
        tabela.appendChild(empty);
        tabela.setAttribute('aria-busy', 'false');
        countEl.textContent = '0 de ' + DATA.length;
        clearBtn.hidden = true;
        return;
      }

      const table = document.createElement('table');
      table.className = 'fila';
      table.innerHTML = '<caption class="sr-only">Contratos em atraso da carteira, com dias em atraso, saldo devedor, status e último contato.</caption>';
      const thead = document.createElement('thead');
      const cols = [
        ['cliente', 'Cliente', 'left'], ['contrato', 'Contrato', 'left'], ['venceu', 'Venceu', 'right'],
        ['dias', 'Dias', 'right'], ['saldo', 'Saldo devedor', 'right'],
        ['status', 'Status', 'left'], ['contato', 'Últ. contato', 'right']
      ];
      const trh = document.createElement('tr');
      cols.forEach(([key, label, align]) => {
        const th = document.createElement('th');
        th.scope = 'col';
        th.dataset.col = key;
        if (align === 'right') th.className = 'ta-r';
        if (state.sort === key) th.setAttribute('aria-sort', state.dir === 'asc' ? 'ascending' : 'descending');
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'sort';
        b.innerHTML = '<span>' + label + '</span><span class="arrow" aria-hidden="true">' +
          (state.sort === key ? (state.dir === 'asc' ? '↑' : '↓') : '·') + '</span>';
        b.setAttribute('aria-label', 'Ordenar por ' + label.toLowerCase() +
          (state.sort === key ? ', ' + (state.dir === 'asc' ? 'crescente' : 'decrescente') : ''));
        th.appendChild(b);
        trh.appendChild(th);
      });
      thead.appendChild(trh);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      rows.forEach((c, i) => tbody.appendChild(rowHTML(c, i)));
      table.appendChild(tbody);
      tabela.appendChild(table);
      tabela.setAttribute('aria-busy', 'false');

      countEl.textContent = rows.length + ' de ' + DATA.length;
      clearBtn.hidden = !(state.q || state.status !== 'todos');

      $$('.sort', table).forEach((b, i) => b.addEventListener('click', () => {
        const key = cols[i][0];
        if (state.sort === key) state.dir = state.dir === 'asc' ? 'desc' : 'asc';
        else { state.sort = key; state.dir = key === 'cliente' || key === 'contrato' || key === 'status' ? 'asc' : 'desc'; }
        if (sortSel) sortSel.value = state.sort + ':' + state.dir;
        render();
        syncUrl();
        const nb = $$('.sort', tabela)[i];
        if (nb) nb.focus();
      }));

      $$('.fila-row', table).forEach((tr) => {
        tr.addEventListener('click', (e) => {
          if (e.target.closest('.cell-flag')) return;
          if (e.target.closest('a')) return;
          location.href = 'contrato.html?ctr=' + tr.dataset.ctr;
        });
        const link = tr.querySelector('.row-open');
        link.addEventListener('focus', () => setActive(Number(tr.dataset.idx), false));
        link.addEventListener('keydown', (e) => {
          if (e.key === 'j' || e.key === 'k' || e.key === 'ArrowDown' || e.key === 'ArrowUp') e.preventDefault();
        });
        const flag = tr.querySelector('.js-flag');
        if (flag) flag.addEventListener('click', (e) => {
          e.preventDefault();
          toast('CTR-7712: principal + juros + multa = ' + brl(comp(byCtr('CTR-7712'))) +
            '; o core registra ' + brl(10139.75) + '. Diferença de R$ 36,00 em conciliação.');
        });
      });

      if (document.activeElement && document.activeElement.classList.contains('row-open')) {
        const idx = Number(document.activeElement.closest('.fila-row').dataset.idx);
        setActive(idx, false);
      }
    }

    function setActive(idx, focus) {
      const rows = $$('.fila-row', tabela);
      if (!rows.length) return;
      const clamped = Math.max(0, Math.min(idx, rows.length - 1));
      state.active = clamped;
      rows.forEach((tr, i) => tr.classList.toggle('is-active', i === clamped));
      if (focus) {
        const link = rows[clamped].querySelector('.row-open');
        if (link) {
          link.focus();
          link.scrollIntoView({ block: 'nearest' });
        }
      }
    }

    function limpar() {
      state.q = ''; state.status = 'todos';
      busca.value = ''; statusSel.value = 'todos';
      render(); syncUrl();
      busca.focus();
      toast('Filtros limpos. A carteira mostra os 9 contratos.');
    }

    window.mesaFila = {
      limpar,
      ordenar(key) { state.sort = key; state.dir = 'desc'; render(); syncUrl(); toast('Fila ordenada por ' + (key === 'dias' ? 'dias em atraso' : 'saldo devedor') + '.'); }
    };

    busca.addEventListener('input', () => {
      state.q = busca.value;
      render(); syncUrl();
    });
    statusSel.addEventListener('change', () => {
      state.status = statusSel.value;
      render(); syncUrl();
    });
    if (sortSel) sortSel.addEventListener('change', () => {
      const [s, d] = sortSel.value.split(':');
      state.sort = s; state.dir = d;
      render(); syncUrl();
    });
    form.addEventListener('submit', (e) => e.preventDefault());
    clearBtn.addEventListener('click', limpar);

    // carregamento: skeleton com a forma da tabela, sem salto
    const estado = params.get('estado');
    const lazy = estado === 'carregando' ? 2600 : 420;
    setTimeout(() => {
      if (estado === 'erro') {
        tabela.innerHTML = '';
        tabela.appendChild(errorPanel('Não foi possível carregar a fila do core.',
          'A conexão com o core do Banco Farol caiu durante a leitura dos contratos. Nenhum dado foi alterado.',
          'Tentar de novo', () => { const u = new URL(location.href); u.searchParams.delete('estado'); location.href = u.href; }));
        renderStats();
        countEl.textContent = '—';
        return;
      }
      render();
      if (state.q || state.status !== 'todos') {
        const link = $('.row-open');
        if (link) link.focus();
      }
    }, lazy);

    // teclado: j/k e setas movem a seleção; / foca a busca
    document.addEventListener('keydown', (e) => {
      const t = e.target;
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable;
      if (document.querySelector('dialog[open]')) return;
      if (typing) {
        if (e.key === 'Escape') {
          if (busca.value) { busca.value = ''; state.q = ''; render(); syncUrl(); }
          else busca.blur();
        }
        return;
      }
      if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault(); busca.focus(); busca.select(); return;
      }
      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault(); setActive(state.active + 1, true); return;
      }
      if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault(); setActive(state.active - 1, true); return;
      }
      if (e.key === 'Escape') {
        const row = document.activeElement.closest && document.activeElement.closest('.fila-row');
        if (row) { document.activeElement.blur(); setActive(Number(row.dataset.idx), false); }
      }
    });

    // devolve o foco à linha de origem ao voltar do detalhe
    document.addEventListener('mesa:focus-row', () => {
      const tr = $('.fila-row');
      if (tr) tr.querySelector('.row-open').focus();
    });
  }

  function errorPanel(title, text, actionLabel, action) {
    const box = document.createElement('div');
    box.className = 'error-panel';
    box.setAttribute('role', 'alert');
    box.innerHTML = '<p class="error-kicker">Falha de leitura</p><h2 class="error-title"></h2><p class="error-text"></p>';
    box.querySelector('.error-title').textContent = title;
    box.querySelector('.error-text').textContent = text;
    if (action) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn';
      b.textContent = actionLabel;
      b.addEventListener('click', action);
      box.appendChild(b);
    }
    return box;
  }

  /* ---------------------------------------------------------- contrato.html */
  function initContrato() {
    const dossier = $('#dossier');
    if (!dossier) return;

    function notasCount(c) {
      setText('#notaCount', c.notas.length + (c.notas.length === 1 ? ' registro' : ' registros'));
    }
    function renderNotasList(c) {
      const nl = $('#notas');
      if (!nl) return;
      notasCount(c);
      if (!c.notas.length) {
        nl.innerHTML = '<p class="panel-empty">Sem registro de contato. A primeira ligação ainda não foi feita — comece pelo telefone do cadastro.</p>';
        return;
      }
      const ul = document.createElement('ul');
      ul.className = 'notes';
      c.notas.forEach((n) => {
        const li = document.createElement('li');
        li.className = 'note';
        li.innerHTML = '<p class="note-head"><span class="note-time"></span><span class="note-canal"></span></p><p class="note-text"></p>';
        li.querySelector('.note-time').textContent = n.quando;
        li.querySelector('.note-canal').textContent = n.canal;
        li.querySelector('.note-text').textContent = n.texto;
        ul.appendChild(li);
      });
      nl.innerHTML = '';
      nl.appendChild(ul);
    }

    const ctr = params.get('ctr') || 'CTR-4821';
    const c = byCtr(ctr);
    const estado = params.get('estado');

    setTimeout(() => {
      if (estado === 'erro' || !c) {
        dossier.innerHTML = '';
        dossier.appendChild(errorPanel(
          'Não foi possível carregar ' + (c ? c.contrato : ctr) + '.',
          'O core não devolveu a composição do débito. Você pode voltar à fila e tentar de novo; nada foi registrado.',
          'Tentar de novo', () => { const u = new URL(location.href); u.searchParams.delete('estado'); location.href = u.href; }));
        const sim = $('#simWrap');
        if (sim) {
          sim.innerHTML = '<p class="panel-empty">O simulador fica indisponível enquanto a composição do débito não carregar.</p>';
        }
        setText('#cliNome', c ? c.cliente : 'Contrato indisponível');
        return;
      }
      renderContrato(c);
    }, estado === 'carregando' ? 2600 : 380);

    function renderContrato(c) {
      const d = div(c);
      const s = saldo(c);
      document.title = c.cliente + ' · ' + c.contrato + ' — Mesa';

      $('#cliNome').textContent = c.cliente;
      $('#cliNome').dataset.ctr = c.contrato;
      $('#cliMeta').textContent = c.contrato + ' · venceu ' + c.venceu + ' · ' + c.dias + ' dias em atraso · ' + STATUS[statusOf(c)].label;
      $('#cliChip').innerHTML = statusChip(statusOf(c));

      const lc = $('#linkCarta');
      if (lc) lc.href = 'carta.html?ctr=' + c.contrato;
      $$('a[href^="carta.html"]').forEach((x) => { x.href = 'carta.html?ctr=' + c.contrato; });
      const crumb = $('#crumbCtr');
      if (crumb) crumb.textContent = c.contrato;

      // composição
      const compRows = [
        ['Principal', brl(c.principal), 'saldo de origem do contrato'],
        ['Juros · 1% a.m. pro rata die', brl(c.juros), c.dias + ' dias corridos sobre o principal'],
        ['Multa · 2% sobre o principal', brl(c.multa), 'encargo único'],
        ['Total no core', brl(c.totalCore), 'valor registrado no core'],
        ['Pago', brl(c.pago), c.pago > 0 ? 'recebido em 20/10, via PIX' : 'nenhum pagamento'],
        ['Saldo devedor', brl(s), 'total no core − pago']
      ];
      const ct = $('#composicao');
      ct.innerHTML = '<caption class="sr-only">Composição do débito de ' + c.cliente + '</caption>';
      const tb = document.createElement('tbody');
      compRows.forEach(([label, value, note], i) => {
        const tr = document.createElement('tr');
        if (i === 3) tr.className = 'is-total';
        if (i === 5) tr.className = 'is-saldo';
        tr.innerHTML = '<th scope="row">' + label + '<span class="comp-note">' + note + '</span></th>' +
          '<td class="num">' + value + '</td>';
        tb.appendChild(tr);
      });
      ct.appendChild(tb);
      ct.setAttribute('aria-busy', 'false');

      const divBox = $('#divBox');
      if (Math.abs(d) >= 0.005) {
        divBox.hidden = false;
        divBox.innerHTML =
          '<p class="div-title"><span aria-hidden="true">⚑</span> Divergência de ' + brl(Math.abs(d)) + ' no core</p>' +
          '<p class="div-body">Principal + juros + multa = <strong>' + brl(comp(c)) + '</strong>. O core registra <strong>' +
          brl(c.totalCore) + '</strong>. A diferença de ' + brl(Math.abs(d)) +
          ' está em conciliação; o valor cobrado e a base do simulador continuam sendo o total do core. Nada foi arredondado aqui.</p>';
      } else {
        divBox.hidden = true;
      }

      // histórico
      const pay = PAGAMENTOS[c.contrato] || [];
      const hp = $('#historico');
      if (!pay.length) {
        hp.innerHTML = '<p class="panel-empty">Nenhum pagamento registrado neste contrato. O saldo devedor é o total do core.</p>';
      } else {
        hp.innerHTML = '<table class="pay"><caption class="sr-only">Pagamentos recebidos</caption>' +
          '<thead><tr><th scope="col">Data</th><th scope="col">Canal</th><th scope="col" class="ta-r">Valor</th></tr></thead><tbody>' +
          pay.map((p) => '<tr><td class="mono">' + p.data + '</td><td>' + p.canal +
            '<span class="row-sub">' + p.obs + '</span></td><td class="num ta-r">' + brl(p.valor) + '</td></tr>').join('') +
          '</tbody></table>';
      }

      // notas
      renderNotasList(c);

      // simulador
      initSim(c, s);
      initEncerrar(c, s);

      const target = $('#cliNome');
      target.setAttribute('tabindex', '-1');
      if (params.get('via') === 'fila' || document.referrer.includes('fila.html')) target.focus({ preventScroll: true });

      // nota
      const form = $('#notaForm');
      const nota = $('#nota');
      const erro = $('#notaErro');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = nota.value.trim();
        if (texto.length < 4) {
          erro.hidden = false;
          erro.textContent = 'Escreva ao menos uma frase sobre o contato (mínimo 4 caracteres). O registro vai para o histórico deste contrato.';
          nota.focus();
          return;
        }
        erro.hidden = true;
        const d2 = new Date();
        const quando = String(d2.getDate()).padStart(2, '0') + '/' + String(d2.getMonth() + 1).padStart(2, '0') +
          ' ' + String(d2.getHours()).padStart(2, '0') + ':' + String(d2.getMinutes()).padStart(2, '0');
        c.notas.unshift({ quando, canal: 'manual', texto });
        nota.value = '';
        renderNotasList(c);
        toast('Contato registrado em ' + quando + '. O histórico deste contrato foi atualizado nesta sessão.');
      });
    }

    function initSim(c, s) {
      const fieldset = $('#simFieldset');
      const range = $('#desconto');
      const outPct = $('#descOut');
      const outParcela = $('#parcela');
      const outSub = $('#parcelaSub');
      const outTotal = $('#totalAcordo');
      const outEco = $('#economia');
      const outRule = $('#simRule');
      const btn = $('#btnAcordo');
      if (!fieldset) return;

      function calc() {
        const parcelas = Number(($('input[name="parcelas"]:checked') || {}).value || 1);
        const pct = Number(range.value);
        const desconto = round2(c.juros * pct / 100);
        const total = round2(s - desconto);
        const base = Math.floor((total / parcelas) * 100) / 100;
        const ultima = round2(total - base * (parcelas - 1));
        return { parcelas, pct, desconto, total, base, ultima };
      }

      function render() {
        const r = calc();
        outPct.textContent = r.pct + '%';
        outTotal.textContent = brl(r.total);
        outEco.textContent = brl(r.desconto);
        if (r.parcelas === 1) {
          outParcela.textContent = brl(r.total);
          outSub.textContent = 'à vista, desconto de ' + brl(r.desconto) + ' sobre os juros';
        } else {
          outParcela.textContent = brl(r.base);
          outSub.textContent = r.ultima === r.base
            ? r.parcelas + ' parcelas iguais · última ' + brl(r.ultima)
            : r.parcelas + ' parcelas · última de ' + brl(r.ultima) + ' (ajuste de arredondamento)';
        }
        const divergente = Math.abs(div(c)) >= 0.005;
        outRule.textContent = 'Base: saldo devedor ' + brl(s) + ' (total do core' +
          (divergente ? ' ' + brl(c.totalCore) + ', composição diverge ' + brl(Math.abs(div(c))) + ' em conciliação' : '') +
          '). Desconto incide só sobre os juros em aberto (' + brl(c.juros) + ') a ' + r.pct + '% = ' + brl(r.desconto) +
          '. Total = saldo − desconto; parcela = total ÷ ' + r.parcelas + ', arredondada ao centavo, com a última absorvendo a diferença.';
      }
      fieldset.addEventListener('change', render);
      range.addEventListener('input', render);
      render();

      btn.addEventListener('click', () => {
        const r = calc();
        const d2 = new Date();
        const quando = String(d2.getDate()).padStart(2, '0') + '/' + String(d2.getMonth() + 1).padStart(2, '0') +
          ' ' + String(d2.getHours()).padStart(2, '0') + ':' + String(d2.getMinutes()).padStart(2, '0');
        c.notas.unshift({
          quando, canal: 'manual',
          texto: 'Acordo registrado: ' + r.parcelas + '× de ' + brl(r.base) + (r.ultima !== r.base ? ' com última de ' + brl(r.ultima) : '') +
            ', total ' + brl(r.total) + ' (' + r.pct + '% de desconto sobre juros).'
        });
        renderNotasList(c);
        toast('Acordo de ' + brl(r.total) + ' em ' + r.parcelas + '× registrado no histórico deste contrato.');
      });
    }

    function initEncerrar(c, s) {
      const btn = $('#btnEncerrar');
      const dlg = $('#endDialog');
      const form = $('#endForm');
      const integ = $('#simIntegridade');
      if (!btn || !dlg) return;

      function setClosed(closed, opts = {}) {
        if (closed) encerrados.add(c.contrato); else encerrados.delete(c.contrato);
        store.write('encerrados', [...encerrados]);
        const chip = $('#cliChip');
        if (chip) chip.innerHTML = statusChip(statusOf(c));
        const banner = $('#endBanner');
        if (banner) {
          banner.hidden = !closed;
          if (closed) {
            banner.innerHTML = '<p class="end-title">Contrato encerrado como prejuízo</p>' +
              '<p class="end-text">' + c.contrato + ' · ' + brl(s) + ' baixado como prejuízo nesta sessão. O simulador fica bloqueado.</p>';
          }
        }
        $$('#simFieldset input, #desconto, #btnAcordo').forEach((el) => { el.disabled = closed; });
        if (integ) integ.hidden = !closed;
        btn.disabled = closed;
        if (closed && !opts.silent) {
          toast(c.contrato + ' encerrado como prejuízo de ' + brl(s) + '.', 'Desfazer', () => {
            setClosed(false, { silent: true });
            toast('Encerramento desfeito. O contrato voltou à carteira.');
          }, 8000);
        }
      }

      btn.addEventListener('click', () => {
        $('#endNome').textContent = c.cliente + ' — ' + c.contrato;
        $('#endValor').textContent = brl(s);
        $('#endDetalhe').textContent = 'Saldo devedor de ' + brl(s) + ' (' + STATUS[statusOf(c)].label + ') será baixado como prejuízo. A ação fica registrada no histórico e pode ser desfeita por 8 segundos.';
        dlg.showModal();
      });
      $('#endCancel').addEventListener('click', () => dlg.close());
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        dlg.close();
        setClosed(true);
        const log = $('#notas');
        if (log) {
          c.notas.unshift({ quando: 'agora', canal: 'sistema', texto: 'Contrato encerrado como prejuízo: ' + brl(s) + ' baixado.' });
          renderNotasList(c);
        }
      });
      setClosed(encerrados.has(c.contrato), { silent: true });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' || document.querySelector('dialog[open]')) return;
      const t = e.target;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (window.mesaVolta) window.mesaVolta();
    });
  }

  /* ------------------------------------------------------------- carta.html */
  function initCarta() {
    const sheet = $('#carta');
    if (!sheet) return;
    const ctr = params.get('ctr') || 'CTR-4821';
    const c = byCtr(ctr);
    if (!c) return;
    document.title = 'Carta de cobrança · ' + c.contrato + ' — Mesa';
    $$('.js-cliente').forEach((el) => { el.textContent = c.cliente; });
    $$('.js-contrato').forEach((el) => { el.textContent = c.contrato; });
    $$('.js-venceu').forEach((el) => { el.textContent = c.venceu; });
    $$('.js-dias').forEach((el) => { el.textContent = String(c.dias); });

    const rows = [
      ['Principal', brl(c.principal)],
      ['Juros de 1% a.m. pro rata die (' + c.dias + ' dias)', brl(c.juros)],
      ['Multa de 2% sobre o principal', brl(c.multa)],
      ['Total registrado no contrato', brl(c.totalCore)]
    ];
    if (c.pago > 0) {
      rows.push(['Pagamento recebido em 20/10', '− ' + brl(c.pago)]);
    }
    rows.push(['Valor devido', brl(saldo(c))]);

    const tb = $('#cartaValores');
    tb.innerHTML = '';
    rows.forEach(([label, value], i) => {
      const tr = document.createElement('tr');
      if (i === rows.length - 1) tr.className = 'is-total';
      tr.innerHTML = '<th scope="row">' + label + '</th><td>' + value + '</td>';
      tb.appendChild(tr);
    });

    const divBox = $('#cartaDiv');
    const d = div(c);
    if (Math.abs(d) >= 0.005) {
      divBox.hidden = false;
      divBox.textContent = 'Conferência: a soma dos encargos listados acima diverge em ' + brl(Math.abs(d)) +
        ' do total registrado no contrato (' + brl(c.totalCore) + '). O valor cobrado é o total registrado; a diferença está em conciliação interna do Banco Farol.';
    }

    $$('.js-hoje').forEach((el) => {
      const d2 = new Date();
      el.textContent = 'Recife, ' + d2.getDate() + ' de ' + d2.toLocaleString('pt-BR', { month: 'long' }) + ' de ' + d2.getFullYear();
    });
    const back = $('#voltar');
    if (back && params.get('ctr')) back.href = 'contrato.html?ctr=' + c.contrato;
    $('#imprimir').addEventListener('click', () => window.print());
  }

  /* ------------------------------------------------------------------ boot */
  initTheme();
  initPalette();
  footerClock();
  if (page === 'fila') initFila();
  if (page === 'contrato') initContrato();
  if (page === 'carta') initCarta();

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && String(e.key).toLowerCase() === 'k') {
      e.preventDefault();
      if (window.mesaPalette) window.mesaPalette();
    }
  });
})();
