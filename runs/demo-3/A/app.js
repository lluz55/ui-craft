/* Mesa — console de cobrança (Banco Farol). Vanilla, sem rede, sem build. */
(function () {
  'use strict';

  /* ---------- base ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const fmt = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const brl = (c) => 'R$ ' + fmt.format(c / 100);
  const num = (c) => fmt.format(c / 100);
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  /* data de referência do conjunto (bate com "dias em atraso" do core) */
  const HOJE = new Date(2026, 10, 19, 10, 20);
  const HOJE_TXT = '19/11/2026';
  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

  const STATUS = {
    sem_contato: { label: 'sem contato', glifo: '○' },
    promessa: { label: 'promessa', glifo: '◔' },
    acordo: { label: 'em acordo', glifo: '◆' },
    recusa: { label: 'recusa', glifo: '✕' },
    parcial: { label: 'parcial', glifo: '◑' }
  };

  /* ---------- dados: a foto do core, sem invenções ---------- */
  const CONTRATOS = [
    { id: 'CTR-4821', cliente: 'Heloísa Prado', venc: '2026-09-12', vencCurto: '12/09', dias: 68, principal: 482000, juros: 10925, multa: 9640, total: 502565, status: 'sem_contato', pago: 0, pagamentos: [], notas: [], tent: { quando: '2026-11-18T14:02', res: 'Caixa postal' } },
    { id: 'CTR-5017', cliente: 'Wagner Bittencourt', venc: '2026-10-03', vencCurto: '03/10', dias: 47, principal: 1240000, juros: 19427, multa: 24800, total: 1284227, status: 'promessa', pago: 0, pagamentos: [], notas: [], tent: { quando: '2026-11-17T10:20', res: 'Prometeu 2 parcelas' } },
    { id: 'CTR-3390', cliente: 'Ivonete Sá', venc: '2026-08-28', vencCurto: '28/08', dias: 83, principal: 115000, juros: 3182, multa: 2300, total: 120482, status: 'acordo', pago: 0, pagamentos: [], notas: [], tent: { quando: '2026-11-18T09:15', res: 'Acordo em 3×' } },
    { id: 'CTR-6104', cliente: 'Ademir Fontes', venc: '2026-10-05', vencCurto: '05/10', dias: 45, principal: 2790000, juros: 41850, multa: 55800, total: 2887650, status: 'recusa', pago: 0, pagamentos: [], notas: [], tent: { quando: '2026-11-16T11:47', res: 'Recusou acordo' } },
    { id: 'CTR-2277', cliente: 'Cleuza Amorim', venc: '2026-07-15', vencCurto: '15/07', dias: 127, principal: 89000, juros: 3768, multa: 1780, total: 94548, status: 'sem_contato', pago: 0, pagamentos: [], notas: [], tent: { quando: '2026-11-12T15:08', res: 'Sem resposta' } },
    { id: 'CTR-5533', cliente: 'Rafael Tavares', venc: '2026-09-22', vencCurto: '22/09', dias: 58, principal: 630000, juros: 12180, multa: 12600, total: 654780, status: 'promessa', pago: 0, pagamentos: [], notas: [], tent: { quando: '2026-11-18T08:40', res: 'Prometeu pagar dia 25' } },
    { id: 'CTR-7712', cliente: 'Marisa Queiroz', venc: '2026-09-09', vencCurto: '09/09', dias: 71, principal: 975000, juros: 23075, multa: 19500, total: 1013975, status: 'sem_contato', pago: 0, pagamentos: [], notas: [], tent: null },
    { id: 'CTR-8045', cliente: 'Josué Nascimento', venc: '2026-09-30', vencCurto: '30/09', dias: 50, principal: 348000, juros: 5800, multa: 6960, total: 360760, status: 'acordo', pago: 0, pagamentos: [], notas: [], tent: { quando: '2026-11-17T14:22', res: 'Acordo em 6×' } },
    { id: 'CTR-1188', cliente: 'Osvaldo Reis', venc: '2026-10-01', vencCurto: '01/10', dias: 49, principal: 1560000, juros: 25480, multa: 31200, total: 1616680, status: 'parcial', pago: 400000, pagamentos: [{ data: '20/10/2026', valor: 400000, canal: 'Pix' }], notas: [
      { quando: '17/11/2026 10:12', texto: 'Ligação: cliente confirma o pagamento parcial de outubro e pede prazo até 05/12 para o restante.' },
      { quando: '10/11/2026 15:40', texto: 'Aviso de atraso enviado no app. Sem resposta até a data desta nota.' },
      { quando: '21/10/2026 09:05', texto: 'Pagamento parcial de R$ 4.000,00 identificado no core (20/10). Saldo reaberto, contrato segue na fila.' }
    ], tent: { quando: '2026-11-17T10:12', res: 'Contato telefônico' } }
  ];

  const byId = (id) => CONTRATOS.find((c) => c.id === id);

  const composicao = (c) => c.principal + c.juros + c.multa;
  const divergencia = (c) => composicao(c) - c.total; /* > 0: core cobra menos */
  const saldo = (c) => c.total - c.pago;
  const risco = (c) => c.dias + 10 * Math.log2(Math.max(saldo(c), 1) / 100000);

  const dtCurto = (iso) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');
  };
  const horaCurto = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  };
  const tentativaTxt = (t) => (t ? dtCurto(t.quando) + ' ' + horaCurto(t.quando) : '—');

  /* ---------- estado ---------- */
  const sessionKey = 'mesa.encerrados';
  const lidos = () => {
    try { return new Set(JSON.parse(sessionStorage.getItem(sessionKey) || '[]')); } catch (e) { return new Set(); }
  };
  const state = {
    q: '',
    status: 'todos',
    sort: 'risco',
    dir: 'desc',
    sel: null,
    encerrados: lidos(),
    parcelas: 3,
    desconto: 0
  };

  const ativos = () => CONTRATOS.filter((c) => !state.encerrados.has(c.id));

  function salvarEncerrados() {
    try { sessionStorage.setItem(sessionKey, JSON.stringify([...state.encerrados])); } catch (e) { /* sem storage */ }
  }

  /* ---------- tema ---------- */
  function temaAtual() {
    const set = document.documentElement.dataset.theme;
    if (set === 'dark' || set === 'light') return set;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function montarTema() {
    const btns = $$('[data-acao="tema"]');
    const rotular = () => {
      const escuro = temaAtual() === 'dark';
      btns.forEach((b) => {
        b.setAttribute('aria-pressed', String(escuro));
        b.setAttribute('aria-label', escuro ? 'Tema escuro ativo. Mudar para claro' : 'Tema claro ativo. Mudar para escuro');
        const alvo = b.querySelector('.tema-txt');
        if (alvo) alvo.textContent = escuro ? 'escuro' : 'claro';
      });
    };
    btns.forEach((b) => b.addEventListener('click', () => {
      const novo = temaAtual() === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = novo;
      try { localStorage.setItem('mesa.tema', novo); } catch (e) { /* ok */ }
      rotular();
    }));
    try {
      const salvo = localStorage.getItem('mesa.tema');
      if (salvo === 'dark' || salvo === 'light') document.documentElement.dataset.theme = salvo;
    } catch (e) { /* ok */ }
    rotular();
  }

  /* ---------- toast ---------- */
  let toastTimer = null;
  function toast(html, opts) {
    const alvo = $('#toast');
    if (!alvo) return;
    alvo.innerHTML = '<div class="toast-caixa">' + html + (opts && opts.undo ? '<button type="button" class="toast-acao" data-undo>Desfazer</button>' : '') + '<span class="toast-barra" aria-hidden="true"></span></div>';
    alvo.classList.add('toast--visivel');
    const caixa = $('.toast-caixa', alvo);
    const barra = $('.toast-barra', alvo);
    const ms = (opts && opts.ms) || 8000;
    if (barra) {
      barra.style.animation = 'none';
      void barra.offsetWidth;
      barra.style.animation = 'toast-barra ' + ms + 'ms linear forwards';
    }
    if (opts && opts.undo) {
      $('[data-undo]', alvo).addEventListener('click', () => {
        opts.undo();
        fecharToast();
      });
    }
    clearTimeout(toastTimer);
    toastTimer = setTimeout(fecharToast, ms);
  }
  function fecharToast() {
    const alvo = $('#toast');
    if (alvo) alvo.classList.remove('toast--visivel');
  }

  /* =======================================================================
     FILA
     ======================================================================= */
  const COLUNAS = [
    { k: 'risco', rotulo: '#', ordemInicial: 'desc' },
    { k: 'cliente', rotulo: 'Cliente', ordemInicial: 'asc' },
    { k: 'contrato', rotulo: 'Contrato', ordemInicial: 'asc' },
    { k: 'venc', rotulo: 'Venceu', ordemInicial: 'asc' },
    { k: 'dias', rotulo: 'Dias em atraso', ordemInicial: 'desc' },
    { k: 'saldo', rotulo: 'Saldo devedor', ordemInicial: 'desc' },
    { k: 'status', rotulo: 'Status', ordemInicial: 'asc' },
    { k: 'ultima', rotulo: 'Última tentativa', ordemInicial: 'desc' }
  ];

  function comparar(a, b, k) {
    switch (k) {
      case 'risco': return risco(a) - risco(b);
      case 'cliente': return a.cliente.localeCompare(b.cliente, 'pt-BR');
      case 'contrato': return a.id.localeCompare(b.id);
      case 'venc': return a.venc.localeCompare(b.venc);
      case 'dias': return a.dias - b.dias;
      case 'saldo': return saldo(a) - saldo(b);
      case 'status': return STATUS[a.status].label.localeCompare(STATUS[b.status].label, 'pt-BR');
      case 'ultima': {
        const ta = a.tent ? a.tent.quando : '';
        const tb = b.tent ? b.tent.quando : '';
        return ta.localeCompare(tb);
      }
      default: return 0;
    }
  }

  function linhasVisiveis() {
    const q = norm(state.q.trim());
    let lista = ativos().filter((c) => {
      if (state.status !== 'todos' && c.status !== state.status) return false;
      if (!q) return true;
      return norm(c.cliente).includes(q) || norm(c.id).includes(q) || norm(c.id.replace('ctr-', '')).includes(q);
    });
    const dir = state.dir === 'asc' ? 1 : -1;
    lista = lista.slice().sort((a, b) => {
      const base = comparar(a, b, state.sort) * dir;
      if (base !== 0) return base;
      return saldo(b) - saldo(a);
    });
    return lista;
  }

  function regua(dias) {
    const pct = Math.min(100, (dias / 130) * 100).toFixed(1);
    return '<span class="regua" aria-hidden="true"><span class="regua-fill' + (dias >= 90 ? ' regua-fill--alto' : '') + '" style="width:' + pct + '%"></span></span>';
  }

  function statusHtml(c) {
    const s = STATUS[c.status];
    return '<span class="status status--' + c.status + '"><span class="glifo" aria-hidden="true">' + s.glifo + '</span>' + s.label + '</span>';
  }

  function renderCarteira() {
    const lista = ativos();
    const total = lista.reduce((s, c) => s + saldo(c), 0);
    const acordos = lista.filter((c) => c.status === 'acordo').length;
    const divs = lista.filter((c) => divergencia(c) !== 0).length;
    const parciais = lista.filter((c) => c.pago > 0).length;
    const alvo = $('#carteira');
    if (!alvo) return;
    alvo.innerHTML =
      '<div class="carteira-total">' +
        '<p class="rotulo">Carteira em atraso <span class="rotulo-nota">soma dos saldos</span></p>' +
        '<p class="total"><span class="moeda">R$</span><span class="total-num">' + num(total) + '</span></p>' +
        '<p class="carteira-pe">' + lista.length + ' contratos · saldo = total − pago; onde o core diverge, vale o core.</p>' +
      '</div>' +
      '<dl class="carteira-stats">' +
        stat(lista.length, 'contratos na fila') +
        stat(acordos, 'em acordo') +
        stat(divs, 'com divergência', divs ? 'var(--alerta)' : '') +
        stat(parciais, 'com pagamento parcial') +
      '</dl>' +
      '<div class="carteira-baixados" hidden>' +
        '<span class="rotulo">Baixados nesta sessão</span> <span class="mono" id="baixados-n">0</span>' +
      '</div>';
    atualizarBaixados();
    const h = $('#status-filtro');
    if (h) {
      $$('[data-status]', h).forEach((b) => {
        const k = b.dataset.status;
        const n = k === 'todos' ? ativos().length : ativos().filter((c) => c.status === k).length;
        const alvoN = b.querySelector('.chip-n');
        if (alvoN) alvoN.textContent = n;
        b.setAttribute('aria-pressed', String(state.status === k));
      });
    }
  }
  function stat(n, label, cor) {
    return '<div class="stat"><dt class="stat-num"' + (cor ? ' style="color:' + cor + '"' : '') + '>' + String(n).padStart(2, '0') + '</dt><dd class="stat-lab">' + label + '</dd></div>';
  }
  function atualizarBaixados() {
    const n = state.encerrados.size;
    const alvo = $('.carteira-baixados');
    if (!alvo) return;
    alvo.hidden = n === 0;
    const el = $('#baixados-n');
    if (el) el.textContent = n;
  }

  function renderFila() {
    const corpo = $('#corpo-fila');
    if (!corpo) return;
    const lista = linhasVisiveis();
    const vazio = $('#vazio-fila');
    const tabela = $('#tabela-fila');

    if (lista.length === 0) {
      corpo.innerHTML = '';
      if (tabela) tabela.hidden = true;
      if (vazio) {
        vazio.hidden = false;
        const filtro = state.status === 'todos' ? 'nenhum status' : 'status “' + STATUS[state.status].label + '”';
        vazio.innerHTML =
          '<p class="rotulo">Filtro sem resultado</p>' +
          '<p class="vazio-titulo">Nenhum contrato com ' + filtro + (state.q ? ' e busca “' + esc(state.q) + '”' : '') + '.</p>' +
          '<p class="vazio-sub">A carteira tem ' + ativos().length + ' contratos ativos. Limpe os filtros para ver todos.</p>' +
          '<button type="button" class="btn" data-limpar>Limpar filtros</button>';
        const b = $('[data-limpar]', vazio);
        if (b) b.addEventListener('click', limparFiltros);
      }
    } else {
      if (vazio) vazio.hidden = true;
      if (tabela) tabela.hidden = false;
      corpo.innerHTML = lista.map((c, i) => {
        const d = divergencia(c);
        const rank = String(i + 1).padStart(2, '0');
        return '<tr class="linha' + (d !== 0 ? ' linha--divergente' : '') + '" data-id="' + c.id + '" tabindex="-1" aria-selected="' + (state.sel === c.id) + '">' +
          '<td class="col-rank"><span class="mono rank">' + rank + '</span></td>' +
          '<td class="col-cliente"><a class="cliente-nome" href="contrato.html?contrato=' + c.id + '">' + esc(c.cliente) + '</a>' +
            (d !== 0 ? '<span class="marca-div" title="Divergência entre core e composição">divergência</span>' : '') + '</td>' +
          '<td class="col-contrato"><span class="mono">' + c.id + '</span></td>' +
          '<td class="col-venc"><span class="mono">' + c.vencCurto + '</span></td>' +
          '<td class="col-dias">' + regua(c.dias) + '<span class="mono dias-num">' + c.dias + ' d</span></td>' +
          '<td class="col-saldo"><span class="num">' + num(saldo(c)) + '</span>' +
            (d !== 0 ? '<span class="delta">Δ ' + num(d) + '</span><span class="composicao">soma ' + num(composicao(c)) + '</span>' : '') +
            (c.pago > 0 ? '<span class="composicao">pago ' + num(c.pago) + '</span>' : '') + '</td>' +
          '<td class="col-status">' + statusHtml(c) + '</td>' +
          '<td class="col-ultima"><span class="mono quando">' + tentativaTxt(c.tent) + '</span><span class="res">' + (c.tent ? esc(c.tent.res) : 'nenhuma tentativa') + '</span></td>' +
          '</tr>';
      }).join('');
    }

    const cont = $('#contagem');
    if (cont) cont.textContent = lista.length + ' de ' + ativos().length;
    const seloRisco = $('#selo-risco');
    if (seloRisco) seloRisco.textContent = 'risco';
    atualizarSetas();
    destacarSelecao();
    renderCarteira();
  }

  function atualizarSetas() {
    $$('[data-sort]').forEach((b) => {
      const th = b.closest('th');
      const ativo = b.dataset.sort === state.sort;
      th.setAttribute('aria-sort', ativo ? (state.dir === 'asc' ? 'ascending' : 'descending') : 'none');
      const seta = b.querySelector('.seta');
      if (seta) seta.textContent = ativo ? (state.dir === 'asc' ? '↑' : '↓') : '';
    });
    const sel = $('#ordenar');
    if (sel) sel.value = state.sort + ':' + state.dir;
  }

  function destacarSelecao() {
    $$('.linha').forEach((tr) => tr.setAttribute('aria-selected', String(tr.dataset.id === state.sel)));
  }

  function limparFiltros() {
    state.q = '';
    state.status = 'todos';
    state.sel = null;
    const busca = $('#busca');
    if (busca) busca.value = '';
    renderFila();
    sincronizarUrl();
    if (busca) busca.focus();
  }

  function sincronizarUrl() {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.status !== 'todos') p.set('status', state.status);
    if (state.sort !== 'risco' || state.dir !== 'desc') { p.set('sort', state.sort); p.set('dir', state.dir); }
    if (state.sel) p.set('sel', state.sel);
    const qs = p.toString();
    history.replaceState(null, '', location.pathname + (qs ? '?' + qs : ''));
  }

  function moverSelecao(delta) {
    const lista = linhasVisiveis();
    if (!lista.length) return;
    let i = lista.findIndex((c) => c.id === state.sel);
    if (i === -1) i = delta > 0 ? -1 : lista.length;
    i = Math.max(0, Math.min(lista.length - 1, i + delta));
    state.sel = lista[i].id;
    destacarSelecao();
    sincronizarUrl();
    const tr = $('.linha[data-id="' + state.sel + '"]');
    if (tr) {
      tr.focus({ preventScroll: true });
      tr.scrollIntoView({ block: 'nearest' });
    }
  }

  function abrirSelecionado() {
    if (!state.sel) return;
    const c = byId(state.sel);
    if (c) location.href = 'contrato.html?contrato=' + c.id;
  }

  function montarFila() {
    const p = new URLSearchParams(location.search);
    state.q = p.get('q') || '';
    state.status = p.get('status') || 'todos';
    state.sort = p.get('sort') || 'risco';
    state.dir = p.get('dir') || (state.sort === 'risco' || state.sort === 'dias' || state.sort === 'saldo' || state.sort === 'ultima' ? 'desc' : 'asc');
    state.sel = p.get('sel');
    const busca = $('#busca');
    if (busca) busca.value = state.q;

    $$('[data-status]').forEach((b) => b.addEventListener('click', () => {
      state.status = b.dataset.status;
      state.sel = null;
      renderFila();
      sincronizarUrl();
    }));

    $$('[data-sort]').forEach((b) => b.addEventListener('click', () => {
      const k = b.dataset.sort;
      if (state.sort === k) state.dir = state.dir === 'asc' ? 'desc' : 'asc';
      else {
        const col = COLUNAS.find((c) => c.k === k);
        state.sort = k;
        state.dir = col ? col.ordemInicial : 'asc';
      }
      renderFila();
      sincronizarUrl();
    }));

    const selOrdenar = $('#ordenar');
    if (selOrdenar) selOrdenar.addEventListener('change', () => {
      const [k, d] = selOrdenar.value.split(':');
      state.sort = k;
      state.dir = d;
      renderFila();
      sincronizarUrl();
    });

    if (busca) busca.addEventListener('input', () => {
      state.q = busca.value;
      state.sel = null;
      renderFila();
      sincronizarUrl();
    });

    /* clique na linha: seleciona; clique fora de link abre o contrato */
    const corpo = $('#corpo-fila');
    if (corpo) {
      corpo.addEventListener('click', (ev) => {
        const tr = ev.target.closest('.linha');
        if (!tr) return;
        if (ev.target.closest('a')) return;
        state.sel = tr.dataset.id;
        destacarSelecao();
        sincronizarUrl();
        location.href = 'contrato.html?contrato=' + tr.dataset.id;
      });
      corpo.addEventListener('focusin', (ev) => {
        const tr = ev.target.closest('.linha');
        if (tr && tr.dataset.id !== state.sel) {
          state.sel = tr.dataset.id;
          destacarSelecao();
          sincronizarUrl();
        }
      });
    }

    renderFila();
    if (state.sel) {
      const tr = $('.linha[data-id="' + state.sel + '"]');
      if (tr) {
        tr.focus({ preventScroll: true });
        tr.scrollIntoView({ block: 'nearest' });
      }
    }
  }

  /* =======================================================================
     CONTRATO
     ======================================================================= */
  function idDaUrl() {
    const p = new URLSearchParams(location.search);
    return p.get('contrato') || 'CTR-1188';
  }

  function esqueleto() {
    return '<div class="esqueleto" aria-busy="true" aria-live="polite">' +
      '<p class="rotulo">Carregando contrato…</p>' +
      '<div class="sk sk-titulo"></div>' +
      '<div class="sk-linha"><div class="sk sk-bloco"></div><div class="sk sk-bloco"></div></div>' +
      '<div class="sk-linha"><div class="sk sk-bloco"></div><div class="sk sk-bloco"></div></div>' +
    '</div>';
  }

  function erroContrato(id) {
    return '<div class="erro" role="alert">' +
      '<p class="rotulo">Falha ao carregar</p>' +
      '<h1>Não foi possível abrir o contrato <span class="mono">' + esc(id) + '</span>.</h1>' +
      '<p>O contrato não está no recorte desta carteira, ou a consulta ao core falhou. Nada foi alterado.</p>' +
      '<p class="erro-acoes"><a class="btn" href="fila.html">Voltar à fila</a> <button type="button" class="btn btn-fantasma" data-recarregar>Tentar de novo</button></p>' +
      '<p class="dica">Contratos desta carteira: ' + CONTRATOS.map((c) => c.id).join(' · ') + '</p>' +
      '</div>';
  }

  function montarContrato() {
    const raiz = $('#contrato-raiz');
    if (!raiz) return;
    raiz.innerHTML = esqueleto();
    const id = idDaUrl();
    setTimeout(() => {
      const c = byId(id);
      if (!c) {
        raiz.innerHTML = erroContrato(id);
        const b = $('[data-recarregar]', raiz);
        if (b) b.addEventListener('click', montarContrato);
        return;
      }
      raiz.innerHTML = fichaHtml(c);
      ligarFicha(c);
      const h1 = $('h1', raiz);
      if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
      document.title = c.cliente + ' · ' + c.id + ' — Mesa';
    }, 240);
  }

  function fichaHtml(c) {
    const d = divergencia(c);
    const s = saldo(c);
    const pagoTxt = c.pago > 0 ? '− ' + brl(c.pago) : '—';
    const encerrado = state.encerrados.has(c.id);
    return '' +
    '<header class="ficha">' +
      '<p class="migra"><a href="fila.html">Fila</a><span aria-hidden="true"> / </span><span aria-current="page">' + c.id + '</span></p>' +
      '<div class="ficha-topo">' +
        '<div class="ficha-id">' +
          '<p class="rotulo">Contrato <span class="mono">' + c.id + '</span> · venceu em ' + c.vencCurto + '/2026</p>' +
          '<h1>' + esc(c.cliente) + '</h1>' +
          '<p class="ficha-meta"><span class="mono">' + c.dias + ' dias</span> em atraso · última tentativa <span class="mono">' + tentativaTxt(c.tent) + '</span> ' + statusHtml(c) + '</p>' +
        '</div>' +
        '<div class="ficha-acoes">' +
          '<a class="btn" href="carta.html">Emitir carta</a>' +
          '<button type="button" class="btn btn-fantasma" data-acao="contato">Registrar contato</button>' +
        '</div>' +
      '</div>' +
    '</header>' +
    (encerrado ? '<p class="aviso aviso--baixa" role="status">Este contrato foi encerrado como prejuízo nesta sessão. O saldo de ' + brl(s) + ' foi baixado.</p>' : '') +
    '<div class="duas-colunas">' +
      '<div class="coluna">' +
        '<section class="secao" aria-labelledby="t-composicao">' +
          '<div class="secao-topo"><h2 id="t-composicao">Composição do débito</h2><span class="rotulo">core · ' + HOJE_TXT + '</span></div>' +
          '<dl class="composicao">' +
            linhaComp('Principal', brl(c.principal), 'vencido em ' + c.vencCurto + '/2026') +
            linhaComp('Juros', brl(c.juros), '1% ao mês, pro rata die · ' + c.dias + ' dias') +
            linhaComp('Multa', brl(c.multa), '2% sobre o principal') +
            '<div class="comp-sub"><dt>Soma da composição</dt><dd class="num">' + num(composicao(c)) + '</dd></div>' +
            '<div class="comp-sub"><dt>Total no core</dt><dd class="num">' + num(c.total) + '</dd></div>' +
            (d !== 0 ? '<div class="comp-delta"><dt>Diferença (core − composição)</dt><dd class="num">' + (d > 0 ? '−' : '+') + num(Math.abs(d)) + '</dd></div>' : '') +
            (c.pago > 0 ? '<div class="comp-pago"><dt>Pagamento parcial · ' + c.pagamentos[0].data + '</dt><dd class="num">' + pagoTxt + '</dd></div>' : '') +
            '<div class="comp-saldo"><dt>Saldo devedor</dt><dd class="num">' + brl(s) + '</dd></div>' +
          '</dl>' +
          (d !== 0 ? '<div class="aviso aviso--divergencia">' +
            '<p class="aviso-titulo">O total não fecha com a composição</p>' +
            '<p>A soma de principal, juros e multa dá <strong>' + brl(composicao(c)) + '</strong>; o core cobra <strong>' + brl(c.total) + '</strong> — ' + brl(Math.abs(d)) + ' ' + (d > 0 ? 'a menos' : 'a mais') + '. Não corrigimos o número em silêncio: o valor cobrado é o do core, e a diferença fica registrada aqui e na fila. O simulador parte do saldo do core.</p>' +
          '</div>' : '<p class="confere"><span class="glifo" aria-hidden="true">✓</span> Composição confere com o total do core.</p>') +
        '</section>' +
        '<section class="secao" aria-labelledby="t-simulador">' +
          '<div class="secao-topo"><h2 id="t-simulador">Simulador de acordo</h2><span class="rotulo">parte do saldo, não do total</span></div>' +
          '<form class="simulador" id="simulador" novalidate>' +
            '<div class="campo-sim">' +
              '<span class="rotulo" id="lab-parcelas">Parcelas</span>' +
              '<div class="segmentado" role="radiogroup" aria-labelledby="lab-parcelas">' +
                [1, 3, 6, 12].map((n) => '<label class="seg' + (n === state.parcelas ? ' seg--on' : '') + '"><input type="radio" name="parcelas" value="' + n + '"' + (n === state.parcelas ? ' checked' : '') + '><span class="mono">' + n + '×</span></label>').join('') +
              '</div>' +
            '</div>' +
            '<div class="campo-sim campo-sim--desconto">' +
              '<label class="rotulo" for="desconto">Desconto de juros <output id="desconto-out" class="mono">' + state.desconto + '%</output></label>' +
              '<input type="range" id="desconto" name="desconto" min="0" max="60" step="5" value="' + state.desconto + '">' +
              '<p class="dica">0 a 60%, só sobre os juros (' + brl(c.juros) + '). Não mexe em principal nem em multa.</p>' +
            '</div>' +
            '<div class="resultado" aria-live="polite">' +
              '<div class="res-item res-item--principal"><span class="rotulo">Parcela</span><strong class="mono res-grande" id="res-parcela">—</strong><span class="dica" id="res-parcela-nota"></span></div>' +
              '<div class="res-item"><span class="rotulo">Total do acordo</span><span class="mono res-medio" id="res-total">—</span></div>' +
              '<div class="res-item"><span class="rotulo">Economia</span><span class="mono res-medio" id="res-economia">—</span></div>' +
            '</div>' +
            '<p class="regra" id="regra-sim"></p>' +
          '</form>' +
        '</section>' +
      '</div>' +
      '<div class="coluna coluna--lado">' +
        '<section class="secao" aria-labelledby="t-historico">' +
          '<div class="secao-topo"><h2 id="t-historico">Pagamentos</h2><span class="rotulo">' + (c.pagamentos.length ? c.pagamentos.length + ' registro' : 'nenhum') + '</span></div>' +
          historicoHtml(c) +
        '</section>' +
        '<section class="secao" aria-labelledby="t-contato">' +
          '<div class="secao-topo"><h2 id="t-contato">Registro de contato</h2><span class="rotulo">' + c.notas.length + ' notas</span></div>' +
          '<form class="nota-form" id="nota-form">' +
            '<label class="rotulo" for="nota">Nova nota · ' + HOJE_TXT + '</label>' +
            '<textarea id="nota" name="nota" rows="3" placeholder="O que foi dito, com quem, e o que ficou combinado."></textarea>' +
            '<div class="nota-acoes"><span class="dica">A nota é gravada com data e hora.</span><button type="submit" class="btn">Registrar</button></div>' +
          '</form>' +
          '<ol class="notas" id="notas">' + notasHtml(c) + '</ol>' +
        '</section>' +
      '</div>' +
    '</div>' +
    '<section class="zona-perigo" aria-labelledby="t-perigo">' +
      '<div><h2 id="t-perigo">Encerrar como prejuízo</h2>' +
      '<p class="dica">Baixa o saldo de <strong class="mono">' + brl(s) + '</strong> do contrato <span class="mono">' + c.id + '</span> e retira a linha da fila. Exige confirmação e pode ser desfeito por 8 segundos.</p></div>' +
      '<button type="button" class="btn btn-perigo" data-acao="encerrar"' + (encerrado ? ' disabled' : '') + '>Encerrar ' + c.id + '</button>' +
    '</section>';
  }

  function linhaComp(rot, val, sub) {
    return '<div class="comp-linha"><dt>' + rot + '<span class="comp-sub-lab">' + sub + '</span></dt><dd class="num">' + val + '</dd></div>';
  }

  function historicoHtml(c) {
    if (!c.pagamentos.length) {
      return '<div class="vazio-mini"><p class="vazio-titulo">Nenhum pagamento registrado.</p>' +
        '<p class="dica">Este contrato nunca foi pago desde o vencimento em ' + c.vencCurto + '/2026. O saldo devedor é o total.</p></div>';
    }
    return '<table class="tabela-mini"><caption class="sr-only">Pagamentos do contrato ' + c.id + '</caption>' +
      '<thead><tr><th scope="col">Data</th><th scope="col">Canal</th><th scope="col" class="ta-r">Valor</th></tr></thead><tbody>' +
      c.pagamentos.map((p) => '<tr><td class="mono">' + p.data + '</td><td>' + p.canal + '</td><td class="num">' + brl(p.valor) + '</td></tr>').join('') +
      '</tbody><tfoot><tr><td colspan="2">Total pago</td><td class="num">' + brl(c.pago) + '</td></tr></tfoot></table>' +
      (c.pago > 0 && c.pago < c.total ? '<p class="dica">Pagamento parcial: o saldo devedor é ' + brl(saldo(c)) + ', não o total.</p>' : '');
  }

  function notasHtml(c) {
    if (!c.notas.length) return '<li class="nota-vazia">Sem contato registrado ainda.</li>';
    return c.notas.map((n) => '<li class="nota"><span class="nota-quando mono">' + n.quando + '</span><p class="nota-texto">' + esc(n.texto) + '</p></li>').join('');
  }

  function simular(c) {
    const n = state.parcelas;
    const d = state.desconto;
    const jurosAbatidos = Math.round((c.juros * d) / 100);
    const total = saldo(c) - jurosAbatidos;
    const base = Math.round(total / n);
    const ultima = total - base * (n - 1);
    return { n, d, jurosAbatidos, total, base, ultima };
  }

  function pintarSimulador(c) {
    const r = simular(c);
    const parcela = $('#res-parcela');
    if (!parcela) return;
    parcela.textContent = brl(r.base) + ' × ' + r.n;
    const nota = $('#res-parcela-nota');
    if (nota) nota.textContent = r.ultima !== r.base ? 'última de ' + brl(r.ultima) : 'parcelas iguais';
    const t = $('#res-total');
    if (t) t.textContent = brl(r.total);
    const e = $('#res-economia');
    if (e) e.textContent = brl(r.jurosAbatidos);
    const out = $('#desconto-out');
    if (out) out.textContent = r.d + '%';
    const regra = $('#regra-sim');
    if (regra) {
      regra.innerHTML = 'Regra: saldo <span class="mono">' + brl(saldo(c)) + '</span> − juros abatidos <span class="mono">' + brl(r.jurosAbatidos) + '</span> = total do acordo. ' +
        'Cada parcela = total ÷ ' + r.n + ', arredondada ao centavo (meio para cima); a última absorve a diferença de centavos, então o total sempre fecha. ' +
        'O desconto incide só sobre os juros: principal e multa não são negociáveis.';
    }
    $$('.seg').forEach((l) => {
      const on = Number(l.querySelector('input').value) === r.n;
      l.classList.toggle('seg--on', on);
    });
  }

  function ligarFicha(c) {
    const sim = $('#simulador');
    if (sim) {
      sim.addEventListener('change', (ev) => {
        if (ev.target.name === 'parcelas') state.parcelas = Number(ev.target.value);
        if (ev.target.name === 'desconto') state.desconto = Number(ev.target.value);
        pintarSimulador(c);
      });
      sim.addEventListener('input', (ev) => {
        if (ev.target.name === 'desconto') {
          state.desconto = Number(ev.target.value);
          pintarSimulador(c);
        }
      });
      pintarSimulador(c);
    }

    const form = $('#nota-form');
    if (form) {
      form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const ta = $('#nota');
        const txt = ta.value.trim();
        if (!txt) { ta.focus(); return; }
        const agora = new Date();
        const quando = String(agora.getDate()).padStart(2, '0') + '/' + String(agora.getMonth() + 1).padStart(2, '0') + '/' + agora.getFullYear() + ' ' +
          String(agora.getHours()).padStart(2, '0') + ':' + String(agora.getMinutes()).padStart(2, '0');
        c.notas.unshift({ quando, texto: txt });
        ta.value = '';
        const lista = $('#notas');
        if (lista) lista.innerHTML = notasHtml(c);
        const rot = $('#t-contato');
        if (rot) {
          const meta = rot.parentElement.querySelector('.rotulo');
          if (meta) meta.textContent = c.notas.length + ' notas';
        }
        toast('Contato registrado em <span class="mono">' + quando + '</span>.');
      });
    }

    const btnContato = $('[data-acao="contato"]');
    if (btnContato) btnContato.addEventListener('click', () => {
      const ta = $('#nota');
      if (ta) { ta.focus(); ta.scrollIntoView({ block: 'center' }); }
    });

    const btnEncerrar = $('[data-acao="encerrar"]');
    if (btnEncerrar) btnEncerrar.addEventListener('click', () => abrirEncerrar(c));
  }

  /* ---------- confirmação destrutiva ---------- */
  function abrirEncerrar(c) {
    const dlg = $('#dlg-encerrar');
    if (!dlg) return;
    const s = saldo(c);
    $('#dlg-corpo').innerHTML =
      '<p class="rotulo">Ação destrutiva</p>' +
      '<h2 class="dlg-titulo">Encerrar <span class="mono">' + c.id + '</span> como prejuízo?</h2>' +
      '<p class="dlg-texto">Cliente <strong>' + esc(c.cliente) + '</strong>. O saldo de <strong class="mono">' + brl(s) + '</strong> será baixado e o contrato sai da fila. O registro do contato é preservado; o valor não é perdoado, só saiu da carteira ativa.</p>' +
      '<label class="check"><input type="checkbox" id="dlg-ciente"><span>Entendo que a baixa é definitiva e que o contrato deixa a fila.</span></label>' +
      '<div class="dlg-acoes"><button type="button" class="btn btn-fantasma" data-fechar>Cancelar</button>' +
      '<button type="button" class="btn btn-perigo" id="dlg-confirmar" disabled>Encerrar e baixar ' + num(s) + '</button></div>';
    dlg.showModal();
    const ciente = $('#dlg-ciente', dlg);
    const confirmar = $('#dlg-confirmar', dlg);
    ciente.addEventListener('change', () => { confirmar.disabled = !ciente.checked; });
    $('[data-fechar]', dlg).addEventListener('click', () => dlg.close());
    confirmar.addEventListener('click', () => {
      state.encerrados.add(c.id);
      salvarEncerrados();
      try {
        sessionStorage.setItem('mesa.flash', JSON.stringify({ id: c.id, cliente: c.cliente, valor: s }));
      } catch (e) { /* ok */ }
      dlg.close();
      location.href = 'fila.html';
    });
    dlg.addEventListener('close', () => {
      if (location.pathname.endsWith('contrato.html') && !state.encerrados.has(c.id)) {
        const b = $('[data-acao="encerrar"]');
        if (b) b.focus();
      }
    }, { once: true });
  }

  function montarFlash() {
    let f = null;
    try { f = JSON.parse(sessionStorage.getItem('mesa.flash') || 'null'); } catch (e) { f = null; }
    if (!f) return;
    try { sessionStorage.removeItem('mesa.flash'); } catch (e) { /* ok */ }
    if (!state.encerrados.has(f.id)) return;
    toast('<strong>' + esc(f.cliente) + '</strong> · <span class="mono">' + f.id + '</span> encerrado como prejuízo. Saldo de <span class="mono">' + brl(f.valor) + '</span> baixado.', {
      undo: () => {
        state.encerrados.delete(f.id);
        salvarEncerrados();
        renderFila();
        toast('Baixa desfeita. <span class="mono">' + f.id + '</span> voltou para a fila.');
      }
    });
  }

  /* =======================================================================
     CARTA
     ======================================================================= */
  function renderCarta() {
    const raiz = $('#folha');
    if (!raiz) return;
    const id = idDaUrl();
    const c = byId(id);
    if (!c) {
      raiz.innerHTML = '<div class="erro erro--carta"><p class="rotulo">Falha ao gerar a carta</p><h1>Contrato <span class="mono">' + esc(id) + '</span> não encontrado.</h1><p>Nada foi impresso. Volte à fila e abra a carta a partir de um contrato.</p></div>';
      document.title = 'Carta não gerada — Mesa';
      return;
    }
    const d = divergencia(c);
    const s = saldo(c);
    const dataLonga = HOJE.getDate() + ' de ' + MESES[HOJE.getMonth()] + ' de ' + HOJE.getFullYear();
    const prazo = new Date(2026, 11, 4);
    const prazoTxt = prazo.getDate() + ' de ' + MESES[prazo.getMonth()] + ' de ' + prazo.getFullYear();
    document.title = 'Carta de cobrança · ' + c.id + ' — Mesa';
    raiz.innerHTML =
      '<header class="carta-topo">' +
        '<div><p class="carta-marca">Banco Farol</p><p class="carta-sub">Central de cobrança</p></div>' +
        '<div class="carta-topo-dir"><p class="mono">' + dataLonga + '</p><p class="carta-ref mono">Contrato ' + c.id + '</p></div>' +
      '</header>' +
      '<hr class="carta-fio">' +
      '<h1 class="carta-rotulo">Aviso de débito em atraso</h1>' +
      '<div class="carta-dest">' +
        '<p class="carta-dest-nome">' + esc(c.cliente) + '</p>' +
        '<p>Contrato <span class="mono">' + c.id + '</span> · vencimento em ' + c.vencCurto + '/2026</p>' +
      '</div>' +
      '<p class="carta-p">Prezado(a) cliente,</p>' +
      '<p class="carta-p">Nosso registro mostra o contrato <span class="mono">' + c.id + '</span> vencido em ' + c.vencCurto + '/2026, com <strong>' + c.dias + ' dias</strong> de atraso. ' +
        (c.pago > 0
          ? 'Identificamos o pagamento parcial de <strong>' + brl(c.pago) + '</strong> em ' + c.pagamentos[0].data + ', já abatido do valor abaixo. '
          : 'Não há pagamento registrado para este contrato. ') +
        'O saldo devedor na data deste aviso é de <strong>' + brl(s) + '</strong>.</p>' +
      '<div class="carta-valores">' +
        '<p class="carta-valores-tit">Como o valor é composto</p>' +
        '<table class="carta-tab"><tbody>' +
          '<tr><th scope="row">Principal</th><td class="mono">' + brl(c.principal) + '</td></tr>' +
          '<tr><th scope="row">Juros (1% ao mês, pro rata die)</th><td class="mono">' + brl(c.juros) + '</td></tr>' +
          '<tr><th scope="row">Multa (2% sobre o principal)</th><td class="mono">' + brl(c.multa) + '</td></tr>' +
          '<tr class="carta-sub"><th scope="row">Total no core</th><td class="mono">' + brl(c.total) + '</td></tr>' +
          (c.pago > 0 ? '<tr><th scope="row">Pagamento em ' + c.pagamentos[0].data + '</th><td class="mono">− ' + brl(c.pago) + '</td></tr>' : '') +
        '</tbody>' +
        '<tfoot><tr><th scope="row">Saldo devedor</th><td class="mono">' + brl(s) + '</td></tr></tfoot></table>' +
        '<p class="carta-nota">Encargos calculados até ' + HOJE_TXT + '; o saldo cresce R$ ' + num(Math.round((c.principal * 0.01) / 30)) + ' por dia de juros. ' +
          (d !== 0 ? 'O valor cobrado é o do core; a soma da composição diverge em ' + brl(Math.abs(d)) + ' e está registrada no sistema.' : 'Composição confere com o total do core.') + '</p>' +
      '</div>' +
      '<p class="carta-p">Para regularizar, efetue o pagamento de <strong>' + brl(s) + '</strong> até <strong>' + prazoTxt + '</strong>. ' +
        'Se o valor já foi pago, desconsidere este aviso e guarde o comprovante.</p>' +
      '<div class="carta-canais">' +
        '<p class="carta-canais-tit">Onde pagar</p>' +
        '<ul>' +
          '<li><strong>App Farol</strong> — Pagamentos › Boletos › contrato ' + c.id + '.</li>' +
          '<li><strong>Internet banking</strong> — mesma aba de boletos, com o boleto deste aviso.</li>' +
          '<li><strong>Pix</strong> — chave do contrato exibida no app; confira o nome do beneficiário antes de confirmar.</li>' +
        '</ul>' +
        '<p class="carta-nota">Não solicitamos senha, cartão ou transferência para conta de pessoa física. Em caso de dúvida, use o canal de atendimento dentro do app.</p>' +
      '</div>' +
      '<footer class="carta-rodape">' +
        '<p>Banco Farol S.A. · Central de cobrança · documento emitido em ' + HOJE_TXT + ' para o contrato <span class="mono">' + c.id + '</span>.</p>' +
        '<p>Este aviso é administrativo e não substitui os termos do contrato. ' + (d !== 0 ? 'Divergência de composição registrada: ' + brl(Math.abs(d)) + '.' : '') + '</p>' +
      '</footer>';
  }

  /* =======================================================================
     PALETA DE COMANDOS
     ======================================================================= */
  const paleta = { aberta: false, itens: [], idx: 0, anterior: null };

  function comandos() {
    const base = [
      { rot: 'Ir para a fila', dica: 'fila.html', run: () => { location.href = 'fila.html'; } },
      { rot: 'Ver a carta do contrato', dica: 'carta.html', run: () => { location.href = 'carta.html'; } },
      { rot: 'Alternar tema claro / escuro', dica: 'tema', run: () => { const b = $('[data-acao="tema"]'); if (b) b.click(); } }
    ];
    if (document.body.dataset.page === 'fila') {
      base.push(
        { rot: 'Ordenar por risco', dica: 'fila', run: () => { state.sort = 'risco'; state.dir = 'desc'; renderFila(); sincronizarUrl(); } },
        { rot: 'Ordenar por dias em atraso', dica: 'fila', run: () => { state.sort = 'dias'; state.dir = 'desc'; renderFila(); sincronizarUrl(); } },
        { rot: 'Ordenar por saldo devedor', dica: 'fila', run: () => { state.sort = 'saldo'; state.dir = 'desc'; renderFila(); sincronizarUrl(); } },
        { rot: 'Limpar busca e filtros', dica: 'fila', run: limparFiltros }
      );
    }
    ativos().forEach((c) => {
      base.push({ rot: c.cliente + ' · ' + c.id, dica: STATUS[c.status].label + ' · ' + brl(saldo(c)), run: () => { location.href = 'contrato.html?contrato=' + c.id; } });
    });
    return base;
  }

  function abrirPaleta() {
    const dlg = $('#paleta');
    if (!dlg || paleta.aberta) return;
    paleta.anterior = document.activeElement;
    paleta.aberta = true;
    paleta.idx = 0;
    const inp = $('#paleta-busca');
    inp.value = '';
    pintarPaleta('');
    dlg.showModal();
    inp.focus();
  }
  function fecharPaleta() {
    const dlg = $('#paleta');
    paleta.aberta = false;
    if (dlg && dlg.open) dlg.close();
    if (paleta.anterior && paleta.anterior.focus) paleta.anterior.focus();
  }
  function pintarPaleta(q) {
    const alvo = $('#paleta-lista');
    const nq = norm(q);
    paleta.itens = comandos().filter((c) => !nq || norm(c.rot).includes(nq) || norm(c.dica).includes(nq));
    paleta.idx = Math.min(paleta.idx, Math.max(0, paleta.itens.length - 1));
    alvo.innerHTML = paleta.itens.length
      ? paleta.itens.map((c, i) => '<li role="option" aria-selected="' + (i === paleta.idx) + '" data-i="' + i + '"><span class="pal-rot">' + esc(c.rot) + '</span><span class="pal-dica">' + esc(c.dica) + '</span></li>').join('')
      : '<li class="pal-vazio">Nada com esse nome. Tente o número do contrato.</li>';
  }
  function montarPaleta() {
    const dlg = $('#paleta');
    if (!dlg) return;
    const inp = $('#paleta-busca');
    const lista = $('#paleta-lista');
    inp.addEventListener('input', () => { paleta.idx = 0; pintarPaleta(inp.value); });
    inp.addEventListener('keydown', (ev) => {
      if (ev.key === 'ArrowDown' || (ev.key === 'n' && ev.ctrlKey)) {
        ev.preventDefault();
        paleta.idx = Math.min(paleta.itens.length - 1, paleta.idx + 1);
        pintarPaleta(inp.value);
        const ativo = $('[aria-selected="true"]', lista);
        if (ativo) ativo.scrollIntoView({ block: 'nearest' });
      } else if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        paleta.idx = Math.max(0, paleta.idx - 1);
        pintarPaleta(inp.value);
        const ativo = $('[aria-selected="true"]', lista);
        if (ativo) ativo.scrollIntoView({ block: 'nearest' });
      } else if (ev.key === 'Enter') {
        ev.preventDefault();
        const item = paleta.itens[paleta.idx];
        if (item) { fecharPaleta(); item.run(); }
      }
    });
    lista.addEventListener('click', (ev) => {
      const li = ev.target.closest('[data-i]');
      if (!li) return;
      const item = paleta.itens[Number(li.dataset.i)];
      if (item) { fecharPaleta(); item.run(); }
    });
    dlg.addEventListener('cancel', (ev) => { ev.preventDefault(); fecharPaleta(); });
    $$('[data-acao="paleta"]').forEach((b) => b.addEventListener('click', abrirPaleta));
  }

  /* =======================================================================
     TECLADO
     ======================================================================= */
  function montarTeclado() {
    const pagina = document.body.dataset.page;
    document.addEventListener('keydown', (ev) => {
      const alvo = ev.target;
      const digitando = alvo && (alvo.tagName === 'INPUT' || alvo.tagName === 'TEXTAREA' || alvo.tagName === 'SELECT' || alvo.isContentEditable);
      const meta = ev.ctrlKey || ev.metaKey;

      if (meta && ev.key.toLowerCase() === 'k') {
        ev.preventDefault();
        abrirPaleta();
        return;
      }
      if (ev.key === 'Escape') {
        if (paleta.aberta) { ev.preventDefault(); fecharPaleta(); return; }
        if (digitando && alvo.id === 'busca' && alvo.value) {
          alvo.value = '';
          state.q = '';
          renderFila();
          sincronizarUrl();
          return;
        }
        if (digitando) { alvo.blur(); return; }
        if (pagina === 'contrato') { location.href = 'fila.html'; return; }
        if (state.sel) { state.sel = null; destacarSelecao(); sincronizarUrl(); return; }
      }
      if (digitando) return;

      if (pagina === 'fila') {
        if (ev.key === '/') {
          ev.preventDefault();
          const b = $('#busca');
          if (b) b.focus();
          return;
        }
        if (ev.key === 'j' || ev.key === 'ArrowDown') { ev.preventDefault(); moverSelecao(1); return; }
        if (ev.key === 'k' || ev.key === 'ArrowUp') { ev.preventDefault(); moverSelecao(-1); return; }
        if (ev.key === 'Enter' && state.sel) { ev.preventDefault(); abrirSelecionado(); return; }
      }
    });
  }

  /* busca fora da fila: leva a busca para a fila */
  function montarBuscaGlobal() {
    const b = $('#busca');
    if (!b || document.body.dataset.page === 'fila') return;
    b.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' && b.value.trim()) {
        location.href = 'fila.html?q=' + encodeURIComponent(b.value.trim());
      }
    });
    document.addEventListener('keydown', (ev) => {
      const t = ev.target;
      const digitando = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT');
      if (ev.key === '/' && !digitando) { ev.preventDefault(); b.focus(); }
      if (ev.key === 'Escape' && document.activeElement === b) { b.value = ''; b.blur(); }
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    montarTema();
    montarPaleta();
    montarTeclado();
    const pagina = document.body.dataset.page;
    montarBuscaGlobal();
    if (pagina === 'fila') {
      montarFila();
      montarFlash();
    } else if (pagina === 'contrato') {
      montarContrato();
    } else if (pagina === 'carta') {
      renderCarta();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
