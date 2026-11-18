/* =============================================================================
   Mesa — app.js
   Vanilla, sem rede, sem dependências. Fonte de dados: foto do core (brief demo 3).
   Ordem: dados → util → regras → tema → chrome → paleta → avisos → fila →
          contrato → carta → boot.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ dados */
  /* Data de corte da sessão. Toda a régua de dias é relativa a ela. */
  var HOJE_ISO = '2026-11-19';
  var HOJE_TXT = '19/11/2026';
  var HORA_TXT = '09:42';

  var TAXA_JUROS = 0.01;  /* ao mês, pro rata die sobre o principal */
  var MULTA = 0.02;       /* sobre o principal */

  var STATUS = {
    sem:      { rotulo: 'sem contato', glifo: '\u25CB', classe: 'st--sem', ordem: 1 },
    promessa: { rotulo: 'promessa',    glifo: '\u25D4', classe: 'st--promessa', ordem: 2 },
    acordo:   { rotulo: 'em acordo',   glifo: '\u25A0', classe: 'st--acordo', ordem: 3 },
    parcial:  { rotulo: 'parcial',     glifo: '\u25E7', classe: 'st--parcial', ordem: 4 },
    recusa:   { rotulo: 'recusa',      glifo: '\u00D7', classe: 'st--recusa', ordem: 5 }
  };

  /* total = principal + juros + multa, como informado pelo core */
  var CONTRATOS = [
    {
      id: 'CTR-4821', cliente: 'Heloísa Prado', venceu: '2026-09-12', dias: 68,
      principal: 4820.00, juros: 109.25, multa: 96.40, total: 5025.65,
      status: 'sem', pago: 0,
      tel: '(11) 98814-2270', email: 'heloisa.prado@exemplo.br',
      ultima: { em: '2026-10-28T14:20', canal: 'telefone', tentativas: 2 },
      notas: [{ em: '2026-10-28T14:20', canal: 'telefone', texto: 'Número não atende. Duas tentativas seguidas, sem caixa postal.' }]
    },
    {
      id: 'CTR-5017', cliente: 'Wagner Bittencourt', venceu: '2026-10-03', dias: 47,
      principal: 12400.00, juros: 194.27, multa: 248.00, total: 12842.27,
      status: 'promessa', pago: 0,
      tel: '(21) 99602-1188', email: 'wagner.bittencourt@exemplo.br',
      ultima: { em: '2026-11-14T10:05', canal: 'WhatsApp', tentativas: 3 },
      notas: [{ em: '2026-11-14T10:05', canal: 'WhatsApp', texto: 'Prometeu pagar até 20/11. Pediu boleto por WhatsApp; enviado.' }]
    },
    {
      id: 'CTR-3390', cliente: 'Ivonete Sá', venceu: '2026-08-28', dias: 83,
      principal: 1150.00, juros: 31.82, multa: 23.00, total: 1204.82,
      status: 'acordo', pago: 0,
      tel: '(31) 98470-3311', email: 'ivonete.sa@exemplo.br',
      ultima: { em: '2026-11-05T15:40', canal: 'telefone', tentativas: 1 },
      notas: [{ em: '2026-11-05T15:40', canal: 'telefone', texto: 'Acordo de 3 parcelas fechado por telefone. Primeira vence em 05/12.' }]
    },
    {
      id: 'CTR-6104', cliente: 'Ademir Fontes', venceu: '2026-10-05', dias: 45,
      principal: 27900.00, juros: 418.50, multa: 558.00, total: 28876.50,
      status: 'recusa', pago: 0,
      tel: '(41) 99155-8042', email: 'ademir.fontes@exemplo.br',
      ultima: { em: '2026-11-16T09:30', canal: 'e-mail', tentativas: 2 },
      notas: [{ em: '2026-11-16T09:30', canal: 'e-mail', texto: 'Recusou o acordo e disse que procura advogado. Não autoriza contato telefônico.' }]
    },
    {
      id: 'CTR-2277', cliente: 'Cleuza Amorim', venceu: '2026-07-15', dias: 127,
      principal: 890.00, juros: 37.68, multa: 17.80, total: 945.48,
      status: 'sem', pago: 0,
      tel: '(85) 98720-6619', email: 'cleuza.amorim@exemplo.br',
      ultima: { em: '2026-11-12T11:10', canal: 'WhatsApp', tentativas: 1 },
      notas: []
    },
    {
      id: 'CTR-5533', cliente: 'Rafael Tavares', venceu: '2026-09-22', dias: 58,
      principal: 6300.00, juros: 121.80, multa: 126.00, total: 6547.80,
      status: 'promessa', pago: 0,
      tel: '(51) 99543-2207', email: 'rafael.tavares@exemplo.br',
      ultima: { em: '2026-11-10T16:45', canal: 'telefone', tentativas: 2 },
      notas: [{ em: '2026-11-10T16:45', canal: 'telefone', texto: 'Prometeu R$ 2.000,00 até 25/11. Restante em 3 vezes depois disso.' }]
    },
    {
      id: 'CTR-7712', cliente: 'Marisa Queiroz', venceu: '2026-09-09', dias: 71,
      principal: 9750.00, juros: 230.75, multa: 195.00, total: 10139.75,
      divergencia: 36.00,
      status: 'sem', pago: 0,
      tel: '(62) 98861-7744', email: 'marisa.queiroz@exemplo.br',
      ultima: { em: '2026-10-29T13:25', canal: 'telefone', tentativas: 3 },
      notas: [{ em: '2026-10-29T13:25', canal: 'telefone', texto: 'Cliente contesta o valor. Disse que o débito no app dela é menor. Encaminhar à controladoria.' }]
    },
    {
      id: 'CTR-8045', cliente: 'Josué Nascimento', venceu: '2026-09-30', dias: 50,
      principal: 3480.00, juros: 58.00, multa: 69.60, total: 3607.60,
      status: 'acordo', pago: 0,
      tel: '(71) 98330-5518', email: 'josue.nascimento@exemplo.br',
      ultima: { em: '2026-11-16T08:50', canal: 'WhatsApp', tentativas: 2 },
      notas: [{ em: '2026-11-16T08:50', canal: 'WhatsApp', texto: 'Acordo de 6 parcelas de R$ 601,27. Contrato assinado digitalmente.' }]
    },
    {
      id: 'CTR-1188', cliente: 'Osvaldo Reis', venceu: '2026-10-01', dias: 49,
      principal: 15600.00, juros: 254.80, multa: 312.00, total: 16166.80,
      status: 'parcial', pago: 4000.00,
      tel: '(51) 99812-4477', email: 'osvaldo.reis@exemplo.br',
      endereco: ['Rua Doutor Flores, 512, apto 72', 'Centro Histórico', 'Porto Alegre/RS', '90020-140'],
      ultima: { em: '2026-11-15T16:40', canal: 'telefone', tentativas: 2 },
      pagamentos: [
        { em: '2026-10-20', valor: 4000.00, canal: 'TED', registro: 'comprovante 4471-B', obs: 'pagamento parcial' }
      ],
      notas: [
        { em: '2026-10-20T14:32', canal: 'telefone', texto: 'Cliente pagou R$ 4.000,00 por TED e pediu prazo para o restante. Confirmou telefone e e-mail.' },
        { em: '2026-11-05T10:05', canal: 'WhatsApp', texto: 'Enviado boleto com saldo atualizado. Cliente não respondeu.' },
        { em: '2026-11-15T16:40', canal: 'telefone', texto: 'Ligação não atendida. Recado deixado na caixa postal.' }
      ]
    }
  ];

  /* ------------------------------------------------------------------- util */
  var fmt2 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function cent(n) { return Math.round((n + Number.EPSILON) * 100) / 100; }
  function num(n) { return fmt2.format(cent(n)); }
  function brl(n) { return 'R$ ' + num(n); }
  function pct(n) { return String(n).replace('.', ',') + '%'; }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function ddmm(iso) { var p = iso.split('-'); return p[2] + '/' + p[1]; }
  function ddmmaaaa(iso) { var p = iso.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }
  function dataHora(iso) {
    var p = iso.split('T');
    return ddmmaaaa(p[0]) + ' \u00B7 ' + (p[1] || '00:00');
  }
  function isoParaUTC(iso) {
    var p = iso.split('-');
    return Date.UTC(+p[0], +p[1] - 1, +p[2]);
  }
  function diasEntre(aISO, bISO) {
    return Math.round((isoParaUTC(bISO) - isoParaUTC(aISO)) / 86400000);
  }
  function relDias(iso) {
    var d = diasEntre(iso, HOJE_ISO);
    return d === 0 ? 'hoje' : 'h\u00E1 ' + d + ' d';
  }
  function norm(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  function agoraISO() {
    var d = new Date(); var p = function (n) { return String(n).padStart(2, '0'); };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + 'T' + p(d.getHours()) + ':' + p(d.getMinutes());
  }

  function storageGet(k) {
    try { return window.sessionStorage.getItem(k); } catch (e) { return null; }
  }
  function storageSet(k, v) {
    try { window.sessionStorage.setItem(k, v); return true; } catch (e) { return false; }
  }
  function storageJson(k, fallback) {
    try { var raw = storageGet(k); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; }
  }

  /* ---------------------------------------------------------------- regras */
  function saldoDe(c) { return cent(c.total - (c.pago || 0)); }
  function encargosDe(c) { return cent(c.juros + c.multa); }
  function somaComposta(c) { return cent(c.principal + c.juros + c.multa); }
  function carteira() {
    return CONTRATOS.reduce(function (s, c) { return s + saldoDe(c); }, 0);
  }
  function saldoCompostoDe(c) { return cent(somaComposta(c) - (c.pago || 0)); }
  function carteiraComposta() {
    return CONTRATOS.reduce(function (s, c) { return s + saldoCompostoDe(c); }, 0);
  }
  function emAcordo() { return CONTRATOS.filter(function (c) { return c.status === 'acordo'; }).length; }
  function comDivergencia() { return CONTRATOS.filter(function (c) { return c.divergencia; }).length; }

  /* Simulador: o desconto incide só sobre os juros; base parte do saldo devedor. */
  function simular(c, parcelas, descontoPct) {
    var saldo = saldoDe(c);
    var jurosBase = c.juros;
    var desconto = cent(jurosBase * (descontoPct / 100));
    var jurosAcordo = cent(jurosBase - desconto);
    var base = cent(saldo - desconto);
    var parcela = cent(base / parcelas);
    var total = cent(parcela * parcelas);
    var economia = cent(saldo - total);
    return {
      saldo: saldo, base: base, jurosBase: jurosBase, desconto: desconto,
      jurosAcordo: jurosAcordo, parcela: parcela, total: total, economia: economia
    };
  }

  function addMeses(iso, n) {
    var p = iso.split('-');
    var y = +p[0], m = +p[1] - 1, d = +p[2];
    var dt = new Date(Date.UTC(y, m + n, d));
    var mm = String(dt.getUTCMonth() + 1).padStart(2, '0');
    var dd = String(dt.getUTCDate()).padStart(2, '0');
    return dt.getUTCFullYear() + '-' + mm + '-' + dd;
  }

  /* ----------------------------------------------------------------- tema */
  var TEMA_KEY = 'mesa.tema';
  function temaEfetivo() {
    var t = document.documentElement.getAttribute('data-theme');
    if (t === 'dark' || t === 'light') return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function aplicaTema(t) {
    if (t === 'dark' || t === 'light') document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
    var btn = document.getElementById('btn-tema');
    if (btn) {
      btn.setAttribute('aria-label', 'Ativar tema ' + (temaEfetivo() === 'dark' ? 'claro' : 'escuro'));
      btn.setAttribute('title', 'Tema ' + (temaEfetivo() === 'dark' ? 'claro' : 'escuro') + ' \u2014 ativar');
    }
  }
  function alternaTema() {
    var prox = temaEfetivo() === 'dark' ? 'light' : 'dark';
    aplicaTema(prox);
    storageSet(TEMA_KEY, prox);
  }
  function iniciaTema() {
    var salvo = storageGet(TEMA_KEY);
    if (salvo === 'dark' || salvo === 'light') aplicaTema(salvo);
    else aplicaTema(null);
    var btn = document.getElementById('btn-tema');
    if (btn) btn.addEventListener('click', alternaTema);
  }

  /* ----------------------------------------------------------------- chrome */
  function iniciaChrome() {
    var page = document.body.getAttribute('data-page');
    var nav = document.querySelectorAll('.nav a');
    Array.prototype.forEach.call(nav, function (a) {
      if (a.getAttribute('data-page') === page) a.setAttribute('aria-current', 'page');
    });
    var clock = document.getElementById('relogio');
    if (clock) clock.textContent = HOJE_TXT + ' \u00B7 ' + HORA_TXT;
  }

  /* ------------------------------------------------------------------ aviso */
  var toastState = { timer: null, onExpire: null };
  function escondeToast() {
    var t = document.getElementById('toast');
    if (!t) return;
    t.hidden = true;
    if (toastState.timer) { clearTimeout(toastState.timer); toastState.timer = null; }
    toastState.onExpire = null;
  }
  function mostraToast(msg, opts) {
    var t = document.getElementById('toast');
    if (!t) return;
    opts = opts || {};
    escondeToast();
    document.getElementById('toast-msg').textContent = msg;
    var act = document.getElementById('toast-action');
    if (opts.acao) {
      act.hidden = false;
      act.textContent = opts.acao;
      act.onclick = function () {
        if (toastState.timer) { clearTimeout(toastState.timer); toastState.timer = null; }
        var fn = opts.onAcao;
        toastState.onExpire = null;
        escondeToast();
        if (fn) fn();
      };
    } else {
      act.hidden = true;
      act.onclick = null;
    }
    t.hidden = false;
    if (opts.duracao) {
      toastState.onExpire = opts.onExpira || null;
      toastState.timer = setTimeout(function () {
        toastState.timer = null;
        var fn = toastState.onExpire;
        toastState.onExpire = null;
        escondeToast();
        if (fn) fn();
      }, opts.duracao);
    }
    if (opts.acao) { try { act.focus({ preventScroll: true }); } catch (e) { act.focus(); } }
  }

  function copiar(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(texto).then(function () { return true; }).catch(function () { return copiaLegado(texto); });
    }
    return Promise.resolve(copiaLegado(texto));
  }
  function copiaLegado(texto) {
    var ta = document.createElement('textarea');
    ta.value = texto;
    ta.setAttribute('readonly', 'readonly');
    ta.className = 'sr-only';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.parentNode.removeChild(ta);
    return ok;
  }

  /* ------------------------------------------------------------ paleta de cmds */
  var palette = { dlg: null, input: null, list: null, cmds: [], idx: -1, anterior: null };

  function comandosDaPagina() {
    var page = document.body.getAttribute('data-page');
    var cmds = [];
    var ir = function (href) { return function () { window.location.href = href; }; };

    if (page === 'fila') {
      cmds.push({ rotulo: 'Buscar na fila', dica: '/', run: function () { focaBusca(); } });
      ['todos', 'sem', 'promessa', 'acordo', 'recusa', 'parcial'].forEach(function (st) {
        var nome = st === 'todos' ? 'todos os status' : STATUS[st].rotulo;
        cmds.push({
          rotulo: 'Filtrar: ' + nome, dica: 'status',
          run: function () {
            var el = document.getElementById('f-' + st);
            if (el) { el.checked = true; el.dispatchEvent(new Event('change', { bubbles: true })); }
          }
        });
      });
      cmds.push({
        rotulo: 'Copiar resumo da carteira', dica: 'carteira',
        run: function () {
          var txt = 'Mesa \u2014 carteira em atraso em ' + HOJE_TXT + '\n' +
            'Contratos: ' + CONTRATOS.length + '\nEm acordo: ' + emAcordo() + '\n' +
            'Total em atraso (soma dos saldos): ' + brl(carteira());
          copiar(txt).then(function (ok) {
            mostraToast(ok ? 'Resumo da carteira copiado.' : 'Não foi possível copiar neste navegador.', { duracao: 5000 });
          });
        }
      });
    }

    if (page === 'contrato') {
      cmds.push({ rotulo: 'Voltar para a fila', dica: 'Esc', run: ir('fila.html') });
      cmds.push({ rotulo: 'Ir para o registro de contato', dica: 'seção', run: function () {
        var el = document.getElementById('nota-texto');
        if (el) { el.scrollIntoView({ block: 'center' }); el.focus(); }
      } });
      cmds.push({ rotulo: 'Ir para o simulador de acordo', dica: 'seção', run: function () {
        var el = document.getElementById('simulador');
        if (el) el.scrollIntoView({ block: 'start' });
      } });
      cmds.push({ rotulo: 'Encerrar contrato como prejuízo', dica: 'destrutivo', run: function () {
        var b = document.getElementById('abre-encerrar');
        if (b && !b.disabled) b.click();
      } });
    }

    if (page === 'carta') {
      cmds.push({ rotulo: 'Imprimir carta', dica: 'Ctrl/Cmd+P', run: function () { window.print(); } });
      cmds.push({ rotulo: 'Voltar para a fila', dica: 'Esc', run: ir('fila.html') });
    }

    CONTRATOS.forEach(function (c) {
      if (document.body.getAttribute('data-page') === 'contrato') return;
      cmds.push({
        rotulo: 'Abrir ' + c.id + ' \u2014 ' + c.cliente,
        dica: 'contrato',
        run: ir('contrato.html?c=' + encodeURIComponent(c.id))
      });
    });

    cmds.push({ rotulo: 'Alternar tema claro/escuro', dica: 'tema', run: alternaTema });
    return cmds;
  }

  function abrePaleta() {
    if (!palette.dlg) return;
    if (document.querySelector('dialog[open]')) return;
    palette.anterior = document.activeElement;
    palette.cmds = comandosDaPagina();
    palette.input.value = '';
    palette.idx = -1;
    filtraPaleta('');
    palette.dlg.showModal();
    palette.input.focus();
  }
  function fechaPaleta() {
    if (palette.dlg && palette.dlg.open) palette.dlg.close();
  }
  function filtraPaleta(q) {
    var needle = norm(q.trim());
    var visiveis = palette.cmds.filter(function (c) {
      return !needle || norm(c.rotulo + ' ' + c.dica).indexOf(needle) !== -1;
    });
    palette.visiveis = visiveis;
    palette.idx = visiveis.length ? 0 : -1;
    var html = '';
    if (!visiveis.length) {
      html = '<li class="palette__empty">Nenhum comando para \u201C' + esc(q) + '\u201D.</li>';
    } else {
      visiveis.forEach(function (c, i) {
        html += '<li role="none"><button type="button" role="option" data-i="' + i + '" tabindex="-1" aria-selected="' + (i === 0) + '">' +
          '<span>' + esc(c.rotulo) + '</span><span class="hint">' + esc(c.dica) + '</span></button></li>';
      });
    }
    palette.list.innerHTML = html;
    palette.input.setAttribute('aria-expanded', visiveis.length ? 'true' : 'false');
    var items = palette.list.querySelectorAll('button');
    Array.prototype.forEach.call(items, function (b, i) { if (i === 0) b.classList.add('is-first'); });
  }
  function ativaItem(n) {
    var items = palette.list.querySelectorAll('button');
    if (!items.length) return;
    if (n < 0) n = items.length - 1;
    if (n >= items.length) n = 0;
    palette.idx = n;
    Array.prototype.forEach.call(items, function (b, i) { b.setAttribute('aria-selected', i === n ? 'true' : 'false'); });
    items[n].focus();
  }
  function executaComando(i) {
    var c = palette.visiveis && palette.visiveis[i];
    if (!c) return;
    fechaPaleta();
    c.run();
  }
  function iniciaPaleta() {
    var dlg = document.createElement('dialog');
    dlg.className = 'palette';
    dlg.setAttribute('aria-label', 'Paleta de comandos');
    dlg.innerHTML =
      '<input class="palette__input" id="pal-input" type="text" role="combobox" aria-expanded="false" ' +
      'aria-controls="pal-list" aria-autocomplete="list" aria-label="Comando" placeholder="digite um comando" autocomplete="off" spellcheck="false">' +
      '<ul class="palette__list" id="pal-list" role="listbox" aria-label="Comandos"></ul>';
    document.body.appendChild(dlg);
    palette.dlg = dlg;
    palette.input = dlg.querySelector('#pal-input');
    palette.list = dlg.querySelector('#pal-list');

    palette.input.addEventListener('input', function () { filtraPaleta(palette.input.value); });
    palette.input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); ativaItem(0); }
      else if (e.key === 'Enter') { e.preventDefault(); executaComando(palette.idx < 0 ? 0 : palette.idx); }
    });
    palette.list.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-i]');
      if (b) executaComando(+b.getAttribute('data-i'));
    });
    palette.list.addEventListener('keydown', function (e) {
      var items = Array.prototype.slice.call(palette.list.querySelectorAll('button'));
      var i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); ativaItem(i + 1); }
      else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (i <= 0) palette.input.focus(); else ativaItem(i - 1);
      } else if (e.key === 'Enter') { e.preventDefault(); executaComando(i); }
      else if (e.key === 'Escape') { e.preventDefault(); fechaPaleta(); }
    });
    dlg.addEventListener('close', function () {
      var alvo = palette.anterior;
      palette.anterior = null;
      if (alvo && document.contains(alvo)) { try { alvo.focus({ preventScroll: true }); } catch (err) { alvo.focus(); } }
    });
  }

  /* ------------------------------------------------------------------- fila */
  var fila = {
    sortKey: 'risco',
    sortDir: 'asc',
    filtro: 'todos',
    busca: '',
    priorityId: null
  };

  var ORDEM_STATUS = { sem: 1, promessa: 2, acordo: 3, parcial: 4, recusa: 5 };

  function rotuloOrdem() {
    var mapa = {
      risco: 'risco', cliente: 'cliente', contrato: 'contrato', venceu: 'vencimento',
      dias: 'dias em atraso', saldo: 'saldo', status: 'status', ultima: 'última tentativa'
    };
    return mapa[fila.sortKey] || fila.sortKey;
  }

  function listaFiltrada() {
    var q = norm(fila.busca.trim());
    var arr = CONTRATOS.filter(function (c) {
      if (fila.filtro !== 'todos' && c.status !== fila.filtro) return false;
      if (!q) return true;
      return norm(c.cliente).indexOf(q) !== -1 || norm(c.id).indexOf(q) !== -1;
    });

    var dir = fila.sortDir === 'asc' ? 1 : -1;
    arr.sort(function (a, b) {
      var r = 0;
      switch (fila.sortKey) {
        case 'risco': r = a.dias - b.dias; break;
        case 'cliente': r = a.cliente.localeCompare(b.cliente, 'pt-BR'); break;
        case 'contrato': r = a.id.localeCompare(b.id); break;
        case 'venceu': r = isoParaUTC(a.venceu) - isoParaUTC(b.venceu); break;
        case 'dias': r = a.dias - b.dias; break;
        case 'saldo': r = saldoDe(a) - saldoDe(b); break;
        case 'status': r = ORDEM_STATUS[a.status] - ORDEM_STATUS[b.status]; break;
        case 'ultima': r = a.ultima.em.localeCompare(b.ultima.em); break;
      }
      if (r === 0) r = a.dias - b.dias;
      return r * dir;
    });
    return arr;
  }

  function linhaHTML(c, rank) {
    var st = STATUS[c.status];
    var saldo = saldoDe(c);
    var prioridade = c.id === fila.priorityId;
    var pctBar = Math.max(4, Math.min(100, Math.round(c.dias / 127 * 100)));
    var meta = c.id + ' \u00B7 venceu ' + ddmm(c.venceu) + ' \u00B7 últ. ' + ddmm(c.ultima.em.slice(0, 10));
    var flag = '';
    if (c.divergencia) {
      flag = '<span class="flagline" title="O total do core não fecha com a soma dos componentes">divergência ' + brl(c.divergencia) + '</span>';
    }
    return '<tr' + (prioridade ? ' class="is-priority"' : '') + ' data-id="' + c.id + '">' +
      '<td class="c-rank"><span class="rank">' + String(rank).padStart(2, '0') + '</span></td>' +
      '<td class="c-cliente">' +
        '<a class="rowlink" href="contrato.html?c=' + encodeURIComponent(c.id) + '">' + esc(c.cliente) + '</a>' +
        '<span class="row-meta">' + esc(meta) + '</span>' +
      '</td>' +
      '<td class="c-contrato"><span class="cid">' + c.id + '</span></td>' +
      '<td class="c-venceu"><time datetime="' + c.venceu + '">' + ddmmaaaa(c.venceu) + '</time></td>' +
      '<td class="c-dias"><span class="num">' + c.dias + '</span>' +
        '<span class="bar" aria-hidden="true"><i style="--p:' + pctBar + '%"></i></span></td>' +
      '<td class="c-saldo"><span class="num">' + num(saldo) + '</span>' + flag + '</td>' +
      '<td class="c-status"><span class="st ' + st.classe + '"><span class="st__g" aria-hidden="true">' + st.glifo + '</span>' + st.rotulo + '</span></td>' +
      '<td class="c-ultima"><span class="rel">' + ddmm(c.ultima.em.slice(0, 10)) + ' \u00B7 ' + relDias(c.ultima.em.slice(0, 10)) + '</span>' +
        '<span class="chan">' + esc(c.ultima.canal) + ' \u00B7 ' + c.ultima.tentativas + (c.ultima.tentativas === 1 ? ' tentativa' : ' tentativas') + '</span></td>' +
      '</tr>';
  }

  function renderFila() {
    var corpo = document.getElementById('fila-corpo');
    if (!corpo) return;
    var lista = listaFiltrada();
    var html = '';
    lista.forEach(function (c) {
      html += linhaHTML(c, CONTRATOS.indexOf(c) + 1);
    });
    corpo.innerHTML = html;

    /* contagens e fita */
    var total = CONTRATOS.length;
    var qtdTxt = lista.length + ' de ' + total;
    var cnt = document.getElementById('contagem');
    if (cnt) cnt.textContent = qtdTxt + ' contratos';
    var strip = document.getElementById('fita');
    if (strip) {
      strip.innerHTML = '<span><strong>' + qtdTxt + '</strong> contratos</span>' +
        '<span>ordem: <strong>' + esc(rotuloOrdem()) + '</strong> ' + (fila.sortDir === 'asc' ? '\u2191 crescente' : '\u2193 decrescente') + '</span>' +
        '<span>status: <strong>' + (fila.filtro === 'todos' ? 'todos' : esc(STATUS[fila.filtro].rotulo)) + '</strong></span>' +
        '<span>busca: <strong>' + (fila.busca ? esc(fila.busca) : '\u2014') + '</strong></span>';
    }

    /* aria-sort */
    var ths = document.querySelectorAll('#fila thead th');
    Array.prototype.forEach.call(ths, function (th) {
      var key = th.getAttribute('data-key');
      var i = th.querySelector('.sort__i');
      if (!key) return;
      if (key === fila.sortKey) {
        th.setAttribute('aria-sort', fila.sortDir === 'asc' ? 'ascending' : 'descending');
        if (i) i.textContent = fila.sortDir === 'asc' ? '\u2191' : '\u2193';
      } else {
        th.setAttribute('aria-sort', 'none');
        if (i) i.textContent = '';
      }
    });

    /* vazio */
    var vazia = document.getElementById('vazia');
    var wrap = document.getElementById('tabela-wrap');
    if (vazia) vazia.hidden = lista.length !== 0;
    if (wrap) wrap.hidden = lista.length === 0;
    sincronizaURL();
  }

  /* a URL carrega o estado da fila: ?q=&status=&ordem=&dir= */
  function sincronizaURL() {
    if (document.body.getAttribute('data-page') !== 'fila') return;
    try {
      var p = new URLSearchParams();
      if (fila.busca) p.set('q', fila.busca);
      if (fila.filtro && fila.filtro !== 'todos') p.set('status', fila.filtro);
      if (fila.sortKey !== 'risco' || fila.sortDir !== 'asc') {
        p.set('ordem', fila.sortKey);
        p.set('dir', fila.sortDir);
      }
      var qs = p.toString();
      if (window.location.search.replace(/^\?/, '') !== qs) {
        history.replaceState(null, '', 'fila.html' + (qs ? '?' + qs : ''));
      }
    } catch (e) { /* file:// sem permissão de history: o estado segue na tela */ }
  }

  function ajustaFiltro(valor) {
    fila.filtro = valor;
    Array.prototype.forEach.call(document.querySelectorAll('.chip[data-filtro]'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-filtro') === valor));
    });
    renderFila();
  }

  function focaBusca() {
    var s = document.getElementById('busca');
    if (!s) return;
    s.focus();
    try { s.select(); } catch (e) {}
  }

  function moveSelecao(paraBaixo) {
    var links = Array.prototype.slice.call(document.querySelectorAll('#fila-corpo a.rowlink'));
    if (!links.length) return false;
    var ativo = document.activeElement;
    var i = links.indexOf(ativo);
    if (i === -1) i = paraBaixo ? 0 : links.length - 1;
    else i += paraBaixo ? 1 : -1;
    if (i < 0) i = 0;
    if (i > links.length - 1) i = links.length - 1;
    links[i].focus();
    return true;
  }

  function iniciaFila() {
    var page = document.body.getAttribute('data-page');
    if (page !== 'fila') return;

    /* maior saldo = a ligação de agora */
    fila.priorityId = CONTRATOS.slice().sort(function (a, b) { return saldoDe(b) - saldoDe(a); })[0].id;

    document.getElementById('total-carteira').textContent = num(carteira());
    document.getElementById('k-acordo').textContent = emAcordo();
    document.getElementById('k-div').textContent = comDivergencia();
    var nota = document.getElementById('total-nota');
    if (nota) {
      var composta = carteiraComposta();
      var dif = cent(composta - carteira());
      nota.innerHTML = 'pela composição seria <strong>' + brl(composta) + '</strong>' +
        (dif > 0 ? ' <span class="flag">+' + num(dif) + '</span>' : '') +
        ' \u00B7 a maior ligação de hoje é <strong>' +
        esc(CONTRATOS.filter(function (c) { return c.id === fila.priorityId; })[0].cliente) + '</strong>';
    }

    var busca = document.getElementById('busca');
    if (busca) {
      busca.addEventListener('input', function () {
        fila.busca = busca.value;
        renderFila();
      });
    }

    var chips = document.querySelectorAll('.chip[data-filtro]');
    Array.prototype.forEach.call(chips, function (b) {
      b.addEventListener('click', function () { ajustaFiltro(b.getAttribute('data-filtro')); });
    });

    document.querySelectorAll('#fila thead .sort').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-sort');
        if (fila.sortKey === key) {
          fila.sortDir = fila.sortDir === 'asc' ? 'desc' : 'asc';
        } else {
          fila.sortKey = key;
          fila.sortDir = (key === 'saldo' || key === 'dias' || key === 'ultima' || key === 'venceu') ? 'desc' : 'asc';
        }
        renderFila();
      });
    });

    var limpa = document.getElementById('limpa-filtros');
    if (limpa) {
      limpa.addEventListener('click', function () {
        fila.busca = '';
        fila.filtro = 'todos';
        if (busca) busca.value = '';
        ajustaFiltro('todos');
        focaBusca();
      });
    }

    var params = new URLSearchParams(window.location.search);
    if (params.get('q')) fila.busca = params.get('q');
    if (params.get('status') && STATUS[params.get('status')]) fila.filtro = params.get('status');
    if (params.get('ordem') && document.querySelector('#fila thead .sort[data-sort="' + params.get('ordem') + '"]')) {
      fila.sortKey = params.get('ordem');
    }
    if (params.get('dir') === 'asc' || params.get('dir') === 'desc') fila.sortDir = params.get('dir');
    if (busca) busca.value = fila.busca;

    if (params.get('estado') === 'carregando') {
      document.getElementById('fila-sk').hidden = false;
      document.getElementById('tabela-wrap').hidden = true;
      document.getElementById('contagem').textContent = 'carregando contratos';
      return;
    }
    if (params.get('estado') === 'erro') {
      document.getElementById('fila-sk').hidden = true;
      document.getElementById('tabela-wrap').hidden = true;
      document.getElementById('fila-erro').hidden = false;
      document.getElementById('fila-corpo').innerHTML = '';
      return;
    }

    /* tela inicial: um quadro de esqueleto, depois os dados */
    document.getElementById('fila-sk').hidden = false;
    window.requestAnimationFrame(function () {
      document.getElementById('fila-sk').hidden = true;
      ajustaFiltro(fila.filtro);
      document.getElementById('resultado').setAttribute('aria-busy', 'false');
    });
  }

  /* --------------------------------------------------------------- contrato */
  function composicaoHTML(c) {
    var composta = somaComposta(c);
    var linhas = '';
    linhas += '<tr><td>Principal</td><td class="calc">valor informado pelo core</td><td class="v">' + num(c.principal) + '</td></tr>';
    linhas += '<tr><td>Juros de 1% a.m. <span class="help">pro rata die</span></td>' +
      '<td class="calc">' + c.dias + '/30 \u00D7 1% \u00D7 ' + num(c.principal) + '</td>' +
      '<td class="v">' + num(c.juros) + '</td></tr>';
    linhas += '<tr><td>Multa de 2%</td><td class="calc">2% \u00D7 ' + num(c.principal) + '</td>' +
      '<td class="v">' + num(c.multa) + '</td></tr>';
    linhas += '<tr class="rule"><td colspan="3"><div class="hr-double"></div></td></tr>';
    linhas += '<tr class="sum"><td>Total informado pelo core</td>' +
      '<td class="calc">' + num(c.principal) + ' + ' + num(c.juros) + ' + ' + num(c.multa) + '</td>' +
      '<td class="v">' + num(c.total) + '</td></tr>';

    if (c.divergencia) {
      linhas += '<tr class="flag"><td colspan="3">' +
        '<strong>Esta soma não fecha.</strong> Principal + juros + multa = ' + num(composta) +
        '; o core informa ' + num(c.total) + '. Diferen\u00E7a de ' + brl(c.divergencia) + '.' +
        '<span class="div-note">Saldo abaixo usa o total do core. Diverg\u00EAncia reportada \u00E0 controladoria \u2014 n\u00E3o corrigida em sil\u00EAncio.</span>' +
        '</td></tr>';
    }

    if (c.pago) {
      linhas += '<tr><td>Pagamento recebido</td><td class="calc">' + ddmmaaaa(c.pagamentos[0].em) + ' \u00B7 ' + esc(c.pagamentos[0].canal) + '</td>' +
        '<td class="v">\u2212 ' + num(c.pago) + '</td></tr>';
    }
    linhas += '<tr class="rule"><td colspan="3"><div class="hr-double"></div></td></tr>';
    linhas += '<tr class="final"><td><strong>Saldo devedor</strong></td>' +
      '<td class="calc">total \u2212 pago</td>' +
      '<td class="v"><strong>' + num(saldoDe(c)) + '</strong></td></tr>';

    return '<table class="comp">' +
      '<caption class="sr-only">Composição do débito do contrato ' + c.id + ', em reais</caption>' +
      '<thead><tr><th scope="col">componente</th><th scope="col">conta</th><th scope="col" class="v">valor (R$)</th></tr></thead>' +
      '<tbody>' + linhas + '</tbody></table>';
  }

  function pagamentosHTML(c) {
    if (!c.pagamentos || !c.pagamentos.length) {
      return '<div class="empty-inline"><strong>Nenhum pagamento registrado.</strong> ' +
        'O saldo devedor é igual ao total do core. Use “registrar contato” para anotar promessas e acordos.</div>';
    }
    var html = '<table class="lista"><caption class="sr-only">Histórico de pagamentos do contrato ' + c.id + '</caption>' +
      '<thead><tr><th scope="col">data</th><th scope="col">canal</th><th scope="col">registro</th><th scope="col" class="v">valor (R$)</th></tr></thead><tbody>';
    c.pagamentos.forEach(function (p) {
      html += '<tr><td class="d">' + ddmmaaaa(p.em) + '</td><td>' + esc(p.canal) + '</td>' +
        '<td>' + esc(p.registro) + (p.obs ? '<span class="meta">' + esc(p.obs) + '</span>' : '') + '</td>' +
        '<td class="v">' + num(p.valor) + '</td></tr>';
    });
    return html + '</tbody></table>';
  }

  function notasDe(c) {
    var extras = storageJson('mesa.notas.' + c.id, []);
    var todas = (c.notas || []).concat(extras);
    return todas.sort(function (a, b) { return b.em.localeCompare(a.em); });
  }

  function notasHTML(c) {
    var lista = notasDe(c);
    if (!lista.length) {
      return '<div class="empty-inline" id="notas-vazias"><strong>Sem contato registrado.</strong> ' +
        'A primeira ligação deste contrato ainda não tem registro.</div>';
    }
    var html = '<ol class="note-list" id="notas-lista" reversed>';
    lista.forEach(function (n) {
      html += '<li class="note"><div class="note__meta"><span>' + dataHora(n.em) + '</span>' +
        '<span class="canal">' + esc(n.canal) + '</span></div>' +
        '<p class="note__text">' + esc(n.texto) + '</p></li>';
    });
    return html + '</ol>';
  }

  function resumoTexto(c) {
    var linhas = [
      'Mesa \u2014 ' + c.id + ' \u00B7 ' + c.cliente,
      'Vencimento: ' + ddmmaaaa(c.venceu) + ' (' + c.dias + ' dias em atraso)',
      'Principal: ' + brl(c.principal),
      'Juros: ' + brl(c.juros),
      'Multa: ' + brl(c.multa),
      'Total no core: ' + brl(c.total),
      c.pago ? 'Pago: ' + brl(c.pago) : null,
      'Saldo devedor: ' + brl(saldoDe(c)),
      c.divergencia ? 'Atenção: total do core diverge da soma em ' + brl(c.divergencia) : null
    ].filter(Boolean);
    return linhas.join('\n');
  }

  var contratoAtual = null;
  var simEstado = { parcelas: 1, desconto: 0 };

  function iniciaContrato() {
    var page = document.body.getAttribute('data-page');
    if (page !== 'contrato') return;

    var params = new URLSearchParams(window.location.search);
    var iframe = false;
    var id = params.get('c');
    if (params.get('vazio') === '1') id = 'VAZIO';
    if (!id) id = 'CTR-1188';
    var main = document.getElementById('pagina');
    var sk = document.getElementById('contrato-sk');
    var erro = document.getElementById('contrato-erro');
    var vazio = document.getElementById('contrato-vazio');

    if (params.get('estado') === 'carregando') {
      sk.hidden = false; erro.hidden = true; vazio.hidden = true;
      main.hidden = true;
      return;
    }

    if (id === 'VAZIO') {
      vazio.hidden = false;
      erro.hidden = true;
      main.hidden = true;
      return;
    }

    var c = CONTRATOS.filter(function (x) { return x.id.toLowerCase() === String(id).toLowerCase(); })[0];

    if (!c || params.get('estado') === 'erro') {
      erro.hidden = false;
      document.getElementById('erro-id').textContent = id;
      vazio.hidden = true;
      return;
    }

    contratoAtual = c;
    var st = STATUS[c.status];
    var encerrado = encerradoDe(c.id);

    main.hidden = false;
    main.innerHTML = templateContrato(c, st);

    /* resumo / copiar / carta */
    var btnCopiar = document.getElementById('copiar-resumo');
    if (btnCopiar) {
      btnCopiar.addEventListener('click', function () {
        copiar(resumoTexto(c)).then(function (ok) {
          mostraToast(ok ? 'Resumo do débito copiado para a área de transferência.' : 'Não foi possível copiar neste navegador.', { duracao: 4000 });
        });
      });
    }

    iniciaSimulador(c);
    iniciaNotas(c);
    iniciaEncerramento(c, encerrado);

    if (encerrado) aplicaEncerrado(true, c);
  }

  function templateContrato(c, st) {
    var saldo = saldoDe(c);
    var composta = somaComposta(c);
    return '' +
      '<nav class="backbar" aria-label="Navegação do contrato">' +
        '<a class="back" href="fila.html">\u2190 fila</a>' +
        '<span class="crumb">contrato ' + c.id + '</span>' +
      '</nav>' +
      '<header class="ident">' +
        '<div class="ident__top">' +
          '<div>' +
            '<h1>' + esc(c.cliente) + '</h1>' +
            '<p class="ident__meta">' +
              '<span class="mono">' + c.id + '</span>' +
              '<span>venceu <time datetime="' + c.venceu + '">' + ddmmaaaa(c.venceu) + '</time></span>' +
              '<span><span class="mono">' + c.dias + '</span> dias em atraso</span>' +
              '<span class="st ' + st.classe + '"><span class="st__g" aria-hidden="true">' + st.glifo + '</span>' + st.rotulo + '</span>' +
            '</p>' +
          '</div>' +
          '<div class="ident__actions">' +
            '<a class="phone" href="tel:+55' + c.tel.replace(/\D/g, '') + '">' + esc(c.tel) + ' <small>ligar</small></a>' +
            '<a class="btn" href="carta.html?c=' + c.id + '">carta</a>' +
            '<button class="btn" type="button" id="copiar-resumo">copiar resumo</button>' +
          '</div>' +
        '</div>' +
      '</header>' +

      '<section class="summary" aria-label="Resumo do débito">' +
        '<div class="summary__cell">' +
          '<p class="summary__label">saldo devedor</p>' +
          '<p class="summary__num"><span class="cur">R$</span>' + num(saldo) + '</p>' +
          '<p class="summary__note">total ' + num(c.total) + ' \u2212 pago ' + num(c.pago || 0) + '</p>' +
        '</div>' +
        '<div class="summary__cell">' +
          '<p class="summary__label">encargos</p>' +
          '<p class="summary__num"><span class="cur">R$</span>' + num(encargosDe(c)) + '</p>' +
          '<p class="summary__note">juros ' + num(c.juros) + ' + multa ' + num(c.multa) + '</p>' +
        '</div>' +
        '<div class="summary__cell">' +
          '<p class="summary__label">atraso</p>' +
          '<p class="summary__num">' + c.dias + ' <span class="cur">dias</span></p>' +
          '<p class="summary__note">desde ' + ddmmaaaa(c.venceu) + ' \u00B7 corte ' + HOJE_TXT + '</p>' +
        '</div>' +
      '</section>' +

      '<div class="detail-grid">' +
        '<div class="detail-main">' +
          '<section class="panel" id="composicao">' +
            '<h2>composição do débito</h2>' +
            '<p class="panel__rule">Regra do core, declarada: juros de <span class="mono">1% a.m. pro rata die</span> sobre o principal, ' +
              'multa de <span class="mono">2%</span> sobre o principal. Cada linha é arredondada ao centavo; o total é a soma das linhas arredondadas.</p>' +
            composicaoHTML(c) +
            (c.pago ? '<p class="panel__rule" style="margin-top:10px">O simulador parte do <strong>saldo devedor</strong> (' + brl(saldo) + '), nunca do total do core.</p>' : '') +
          '</section>' +

          '<section class="panel" id="pagamentos">' +
            '<h2>histórico de pagamentos</h2>' +
            pagamentosHTML(c) +
          '</section>' +

          '<section class="panel" id="simulador">' +
            '<h2>simulador de acordo</h2>' +
            '<p class="panel__rule">Desconto incide <strong>somente sobre os juros</strong> (' + brl(c.juros) + '), nunca sobre principal ou multa. ' +
              'Parcela = base ÷ n arredondada ao centavo; total = parcela × n; economia = saldo − total.</p>' +
            '<div class="sim">' +
              '<div class="sim__controls">' +
                '<div class="sim__group">' +
                  '<span class="label" id="lbl-parcelas">número de parcelas</span>' +
                  '<div class="seg" role="group" aria-labelledby="lbl-parcelas">' +
                    [1, 3, 6, 12].map(function (n) {
                      return '<button class="seg__b" type="button" data-n="' + n + '" aria-pressed="' + (n === 1) + '">' + n + 'x</button>';
                    }).join('') +
                  '</div>' +
                '</div>' +
                '<div class="sim__group">' +
                  '<label class="label" for="desconto">desconto sobre os juros</label>' +
                  '<div class="range-row">' +
                    '<input class="range" type="range" id="desconto" min="0" max="60" step="1" value="0" aria-describedby="sim-nota">' +
                    '<output class="range-out" id="desconto-out" for="desconto">0%</output>' +
                  '</div>' +
                '</div>' +
                '<p class="help" id="sim-nota">Base do acordo: saldo devedor ' + brl(saldo) + '. O desconto máximo de 60% sobre os juros ' +
                  'reduz o saldo em até ' + brl(cent(c.juros * 0.6)) + '.</p>' +
              '</div>' +
              '<div class="sim__out" aria-live="polite">' +
                '<div class="res res--big"><span class="res__k">parcela</span><span class="res__v" id="out-parcela">' + brl(saldo) + '</span></div>' +
                '<div class="res"><span class="res__k">total do acordo</span><span class="res__v" id="out-total">' + brl(saldo) + '</span></div>' +
                '<div class="res res--saving"><span class="res__k">economia</span><span class="res__v" id="out-economia">R$ 0,00</span></div>' +
                '<div class="res"><span class="res__k">juros no acordo</span><span class="res__v" id="out-juros">' + brl(c.juros) + '</span></div>' +
                '<div class="res"><span class="res__k">primeira parcela</span><span class="res__v" id="out-primeira">' + ddmmaaaa(addMeses(HOJE_ISO, 1)) + '</span></div>' +
                '<p class="eq" id="eq"></p>' +
                '<div class="sim__actions">' +
                  '<button class="btn btn--primary" type="button" id="registra-proposta">registrar proposta</button>' +
                  '<button class="btn" type="button" id="copia-proposta">copiar</button>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</section>' +
        '</div>' +

        '<aside class="detail-rail">' +
          '<section class="panel" id="contato">' +
            '<h2>registro de contato</h2>' +
            '<form class="note-form" id="nota-form" novalidate>' +
              '<label class="label" for="nota-texto">o que foi dito</label>' +
              '<textarea class="textarea" id="nota-texto" rows="3" aria-describedby="nota-help nota-erro"></textarea>' +
              '<p class="help" id="nota-help">Registro com data e hora de agora: <span class="mono">' + HOJE_TXT + ' \u00B7 ' + HORA_TXT + '</span>.</p>' +
              '<div class="note-form__row">' +
                '<select class="select" id="nota-canal" aria-label="canal do contato">' +
                  '<option value="telefone">telefone</option>' +
                  '<option value="WhatsApp">WhatsApp</option>' +
                  '<option value="e-mail">e-mail</option>' +
                  '<option value="presencial">presencial</option>' +
                '</select>' +
                '<button class="btn btn--primary" type="submit">registrar</button>' +
              '</div>' +
              '<p class="form-error" id="nota-erro" hidden></p>' +
            '</form>' +
            '<div id="notas">' + notasHTML(c) + '</div>' +
          '</section>' +

          '<section class="panel panel--danger" id="encerrar">' +
            '<h2>encerrar contrato</h2>' +
            '<p>Encerrar como prejuízo tira o contrato da cobrança ativa e lança o saldo devedor como perda. ' +
              'A ação fica disponível para desfazer por 8 segundos.</p>' +
            '<div id="encerrado"></div>' +
            '<button class="btn btn--danger" type="button" id="abre-encerrar">encerrar como prejuízo</button>' +
          '</section>' +
        '</aside>' +
      '</div>';
  }

  function iniciaSimulador(c) {
    var outParcela = document.getElementById('out-parcela');
    if (!outParcela) return;
    var botoes = document.querySelectorAll('.seg__b');
    var range = document.getElementById('desconto');

    var sp = new URLSearchParams(window.location.search);
    var pn = parseInt(sp.get('parcelas'), 10);
    if ([1, 3, 6, 12].indexOf(pn) >= 0) simEstado.parcelas = pn;
    var pd = parseInt(sp.get('desconto'), 10);
    if (!isNaN(pd)) simEstado.desconto = Math.max(0, Math.min(60, pd));
    if (range) range.value = simEstado.desconto;
    Array.prototype.forEach.call(botoes, function (b) {
      b.setAttribute('aria-pressed', String(+b.getAttribute('data-n') === simEstado.parcelas));
    });

    function atualiza() {
      try {
        var u = new URLSearchParams(window.location.search);
        u.set('c', c.id);
        u.set('parcelas', simEstado.parcelas);
        u.set('desconto', simEstado.desconto);
        history.replaceState(null, '', 'contrato.html?' + u.toString());
      } catch (e) { /* file:// sem permissão de history */ }
      var s = simular(c, simEstado.parcelas, simEstado.desconto);
      outParcela.textContent = brl(s.parcela);
      document.getElementById('out-total').textContent = brl(s.total);
      document.getElementById('out-economia').textContent = brl(s.economia);
      document.getElementById('out-juros').textContent = brl(s.jurosAcordo);
      document.getElementById('out-primeira').textContent = ddmmaaaa(addMeses(HOJE_ISO, 1));
      document.getElementById('desconto-out').textContent = pct(simEstado.desconto);
      document.getElementById('eq').innerHTML =
        '<b>conta:</b> saldo ' + num(s.saldo) + ' \u2212 desconto ' + num(s.desconto) + ' = base ' + num(s.base) +
        ' \u00F7 ' + simEstado.parcelas + 'x = ' + num(s.parcela) +
        ' \u00B7 total ' + num(s.total) + ' \u00B7 economia ' + num(s.economia);
      var ultima = addMeses(HOJE_ISO, simEstado.parcelas);
      document.getElementById('out-primeira').textContent = ddmmaaaa(addMeses(HOJE_ISO, 1));
      var resumo = document.getElementById('sim-nota');
      if (resumo) {
        resumo.innerHTML = 'Base do acordo: saldo devedor ' + brl(s.saldo) + '. Primeira parcela em ' +
          '<span class="mono">' + ddmmaaaa(addMeses(HOJE_ISO, 1)) + '</span>, última em <span class="mono">' + ddmmaaaa(ultima) + '</span>.';
      }
      return s;
    }

    Array.prototype.forEach.call(botoes, function (b) {
      b.addEventListener('click', function () {
        simEstado.parcelas = +b.getAttribute('data-n');
        Array.prototype.forEach.call(botoes, function (o) {
          o.setAttribute('aria-pressed', String(o === b));
        });
        atualiza();
      });
    });
    if (range) {
      range.addEventListener('input', function () {
        simEstado.desconto = +range.value;
        atualiza();
      });
    }

    var btnProp = document.getElementById('registra-proposta');
    if (btnProp) {
      btnProp.addEventListener('click', function () {
        var s = atualiza();
        var texto = 'Proposta registrada por telefone: ' + simEstado.parcelas + 'x de ' + brl(s.parcela) +
          ', total ' + brl(s.total) + ', desconto de ' + pct(simEstado.desconto) + ' sobre juros (economia ' + brl(s.economia) + ').';
        registraNota(c, 'telefone', texto, true);
      });
    }
    var btnCopia = document.getElementById('copia-proposta');
    if (btnCopia) {
      btnCopia.addEventListener('click', function () {
        var s = atualiza();
        var texto = 'Mesa \u2014 proposta ' + c.id + ' (' + c.cliente + ')\n' +
          simEstado.parcelas + 'x de ' + brl(s.parcela) + '\nTotal do acordo: ' + brl(s.total) +
          '\nEconomia: ' + brl(s.economia) + '\nDesconto: ' + pct(simEstado.desconto) + ' sobre os juros';
        copiar(texto).then(function (ok) {
          mostraToast(ok ? 'Proposta copiada.' : 'Não foi possível copiar neste navegador.', { duracao: 3500 });
        });
      });
    }

    atualiza();
  }

  function iniciaNotas(c) {
    var form = document.getElementById('nota-form');
    if (!form) return;
    var texto = document.getElementById('nota-texto');
    var canal = document.getElementById('nota-canal');
    var erro = document.getElementById('nota-erro');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var t = texto.value.trim();
      if (!t) {
        erro.textContent = 'Escreva o que foi dito antes de registrar. O registro fica vazio sem isso.';
        erro.hidden = false;
        texto.setAttribute('aria-invalid', 'true');
        texto.focus();
        return;
      }
      registraNota(c, canal.value, t, false);
      texto.value = '';
      texto.removeAttribute('aria-invalid');
      erro.hidden = true;
    });
    texto.addEventListener('input', function () {
      if (texto.value.trim()) { texto.removeAttribute('aria-invalid'); erro.hidden = true; }
    });
  }

  function registraNota(c, canal, texto, semForm) {
    var extras = storageJson('mesa.notas.' + c.id, []);
    extras.push({ em: agoraISO(), canal: canal, texto: texto });
    storageSet('mesa.notas.' + c.id, JSON.stringify(extras));
    var alvo = document.getElementById('notas');
    if (alvo) {
      alvo.innerHTML = notasHTML(c);
      var primeiro = alvo.querySelector('.note');
      if (primeiro) primeiro.classList.add('note__new');
    }
    if (semForm) {
      var el = document.getElementById('nota-texto');
      if (el) el.value = '';
    }
    mostraToast('Contato registrado em ' + dataHora(extras[extras.length - 1].em) + '.', { duracao: 5000 });
  }

  /* --------------------------------------------------------------- encerrar */
  function encerradoDe(id) {
    var mapa = storageJson('mesa.encerrados', {});
    return mapa[id] || null;
  }
  function gravaEncerrado(id, quando) {
    var mapa = storageJson('mesa.encerrados', {});
    if (quando) mapa[id] = quando; else delete mapa[id];
    storageSet('mesa.encerrados', JSON.stringify(mapa));
  }

  var refsEncerrar = null;

  function iniciaEncerramento(c, encerrado) {
    var abre = document.getElementById('abre-encerrar');
    var dlg = document.getElementById('dlg-encerrar');
    if (!abre || !dlg) return;

    var chk = document.getElementById('confirma-check');
    var confirma = document.getElementById('confirma-encerrar');
    var cancelar = document.getElementById('cancela-encerrar');

    document.getElementById('dlg-contrato').textContent = c.id;
    document.getElementById('dlg-cliente').textContent = c.cliente;
    document.getElementById('dlg-valor').textContent = brl(saldoDe(c));

    abre.addEventListener('click', function () {
      chk.checked = false;
      confirma.disabled = true;
      dlg.showModal();
    });

    chk.addEventListener('change', function () { confirma.disabled = !chk.checked; });

    cancelar.addEventListener('click', function () { dlg.close(); });

    confirma.addEventListener('click', function () {
      dlg.close();
      var quando = agoraISO();
      gravaEncerrado(c.id, quando);
      aplicaEncerrado(true, c, quando);
      mostraToast('Contrato ' + c.id + ' encerrado como prejuízo. Saldo de ' + brl(saldoDe(c)) + ' lançado como perda.', {
        acao: 'desfazer',
        duracao: 8000,
        onAcao: function () {
          gravaEncerrado(c.id, null);
          aplicaEncerrado(false, c);
          mostraToast('Encerramento desfeito. O contrato voltou para a cobrança ativa.', { duracao: 4000 });
        },
        onExpira: function () {
          mostraToast('Encerramento confirmado. O contrato saiu da carteira ativa.', { duracao: 4000 });
        }
      });
    });

    dlg.addEventListener('cancel', function () { /* Esc: o diálogo fecha e o foco volta */ });
  }

  function aplicaEncerrado(encerrado, c) {
    var banner = document.getElementById('encerrado');
    var btn = document.getElementById('abre-encerrar');
    var painel = document.getElementById('encerrar');
    var marca = encerradoDe(c.id);

    if (!banner) return;
    if (encerrado) {
      if (!banner.querySelector('.closed-banner')) {
        banner.innerHTML = '<div class="closed-banner" role="status">' +
          '<span><strong>Encerrado como prejuízo</strong> em ' + dataHora(marca || agoraISO()) + '. Valor lançado: ' + brl(saldoDe(c)) + '.</span>' +
          '<button class="linkbtn" type="button" id="reabre">reabrir contrato</button>' +
          '</div>';
        var reabre = document.getElementById('reabre');
        if (reabre) {
          reabre.addEventListener('click', function () {
            gravaEncerrado(c.id, null);
            aplicaEncerrado(false, c);
            mostraToast('Contrato reaberto na cobrança ativa.', { duracao: 4000 });
          });
        }
      }
      if (btn) { btn.disabled = true; btn.textContent = 'contrato encerrado'; }
      var form = document.getElementById('nota-form');
      if (form) {
        Array.prototype.forEach.call(form.querySelectorAll('input, textarea, select, button'), function (el) { el.disabled = true; });
      }
      Array.prototype.forEach.call(document.querySelectorAll('#simulador input, #simulador button'), function (el) { el.disabled = true; });
      if (painel) painel.classList.add('panel--encerrado');
    } else {
      banner.innerHTML = '';
      if (btn) { btn.disabled = false; btn.textContent = 'encerrar como prejuízo'; }
      var form2 = document.getElementById('nota-form');
      if (form2) {
        Array.prototype.forEach.call(form2.querySelectorAll('input, textarea, select, button'), function (el) { el.disabled = false; });
      }
      Array.prototype.forEach.call(document.querySelectorAll('#simulador input, #simulador button'), function (el) { el.disabled = false; });
      if (painel) painel.classList.remove('panel--encerrado');
    }
  }

  /* ------------------------------------------------------------------ carta */
  function iniciaCarta() {
    var page = document.body.getAttribute('data-page');
    if (page !== 'carta') return;

    var params = new URLSearchParams(window.location.search);
    var id = params.get('c') || 'CTR-1188';
    var c = CONTRATOS.filter(function (x) { return x.id.toLowerCase() === String(id).toLowerCase(); })[0] || CONTRATOS[CONTRATOS.length - 1];

    var set = function (sel, txt) {
      var el = document.getElementById(sel);
      if (el) el.textContent = (txt == null ? '' : txt);
    };

    set('l-cliente', c.cliente);
    set('l-contrato', c.id);
    set('l-endereco', (c.endereco ? c.endereco.join(', ') : 'endereço não cadastrado'));
    set('l-cidade', c.endereco ? '' : 'Endereço não cadastrado no core.');
    set('l-emissao', ddmmaaaa(HOJE_ISO));
    set('l-principal', num(c.principal));
    set('l-juros', num(c.juros));
    set('l-multa', num(c.multa));
    set('l-total', num(c.total));
    set('l-pago', c.pago ? '\u2212 ' + num(c.pago) : null);
    set('l-pago-data', c.pago ? ddmmaaaa(c.pagamentos[0].em) : '');
    set('l-saldo', num(saldoDe(c)));
    set('l-vencimento', ddmmaaaa(c.venceu));
    set('l-dias', String(c.dias));
    set('l-prazo', ddmmaaaa(addMeses(HOJE_ISO, 1)));
    set('l-rodape', 'documento gerado por Mesa em ' + HOJE_TXT + ' ' + HORA_TXT + ' \u00B7 página 1 de 1');

    var linhaPago = document.getElementById('linha-pago');
    if (linhaPago) linhaPago.hidden = !c.pago;

    var tr = document.getElementById('linha-divergencia');
    if (tr) {
      if (c.divergencia) {
        tr.hidden = false;
        var el = document.getElementById('l-divergencia');
        if (el) el.textContent = brl(c.divergencia);
      } else {
        tr.hidden = true;
      }
    }

    var imprimir = document.getElementById('btn-imprimir');
    if (imprimir) imprimir.addEventListener('click', function () { window.print(); });

    var linkContrato = document.getElementById('l-voltar');
    if (linkContrato) linkContrato.setAttribute('href', 'contrato.html?c=' + encodeURIComponent(c.id));
  }

  /* ------------------------------------------------------------------- boot */
  function iniciaTeclado() {
    document.addEventListener('keydown', function (e) {
      var alvo = e.target;
      var digitando = alvo && (alvo.tagName === 'INPUT' || alvo.tagName === 'TEXTAREA' || alvo.tagName === 'SELECT' || alvo.isContentEditable);
      var dialogoAberto = !!document.querySelector('dialog[open]');

      if ((e.ctrlKey || e.metaKey) && !e.altKey && String(e.key).toLowerCase() === 'k') {
        e.preventDefault();
        abrePaleta();
        return;
      }
      if (dialogoAberto) return;

      var page = document.body.getAttribute('data-page');

      if (e.key === '/' && !digitando && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (page === 'fila') { e.preventDefault(); focaBusca(); }
        return;
      }
      if (page === 'fila' && !digitando && !e.ctrlKey && !e.metaKey && !e.altKey &&
          (e.key === 'j' || e.key === 'k' || e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        var ativo = document.activeElement;
        var dentroDaTabela = ativo && (ativo.classList.contains('rowlink') || ativo === document.body);
        if (!dentroDaTabela) return;
        if (moveSelecao(e.key === 'j' || e.key === 'ArrowDown')) e.preventDefault();
        return;
      }
      if (e.key === 'Escape') {
        if (page === 'contrato' || page === 'carta') {
          window.location.href = page === 'carta' ? 'contrato.html?c=' + encodeURIComponent((new URLSearchParams(window.location.search).get('c') || 'CTR-1188')) : 'fila.html';
        } else if (page === 'fila' && digitando) {
          alvo.blur();
        }
      }
    });
  }

  function boot() {
    iniciaTema();
    iniciaChrome();
    iniciaPaleta();
    iniciaTeclado();
    iniciaFila();
    iniciaContrato();
    iniciaCarta();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
