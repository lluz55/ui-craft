/* Maré — cálculo de diárias. Sem dependências, sem rede. */
(function () {
  "use strict";

  var form = document.getElementById("book");
  if (!form) return;

  var entrada = document.getElementById("entrada");
  var saida = document.getElementById("saida");
  var quarto = document.getElementById("quarto");
  var hospedes = document.getElementById("hospedes");
  var totalEmpty = document.getElementById("total-empty");
  var totalCalc = document.getElementById("total-calc");
  var totalLine = document.getElementById("total-line");
  var totalValue = document.getElementById("total-value");
  var totalPending = document.getElementById("total-pending");
  var status = document.getElementById("book-status");

  var CAPACITY = { baixa: 2, cheia: 3, coqueiro: 4 };
  var ROOM_LABEL = { baixa: "Maré Baixa", cheia: "Maré Cheia", coqueiro: "Suíte Coqueiro" };

  var numberFmt = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
  var timer = null;
  var lastTotal = null;

  function todayISO() {
    var d = new Date();
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
  }

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function parseISO(value) {
    if (!value) return null;
    var p = value.split("-");
    if (p.length !== 3) return null;
    var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    return isNaN(d.getTime()) ? null : d;
  }

  function nights(inDate, outDate) {
    var a = parseISO(inDate);
    var b = parseISO(outDate);
    if (!a || !b) return 0;
    return Math.round((b - a) / 86400000);
  }

  function shortDate(value) {
    var d = parseISO(value);
    if (!d) return "";
    return pad(d.getDate()) + "/" + pad(d.getMonth() + 1);
  }

  function rate() {
    if (!quarto.value) return 0;
    var opt = quarto.options[quarto.selectedIndex];
    return Number(opt.getAttribute("data-rate")) || 0;
  }

  function fieldOf(el) { return el.closest(".field"); }

  function setError(el, message) {
    var field = fieldOf(el);
    var box = document.getElementById("err-" + el.id);
    if (!field || !box) return;
    if (message) {
      field.setAttribute("data-invalid", "true");
      el.setAttribute("aria-invalid", "true");
      box.textContent = message;
      box.hidden = false;
    } else {
      field.removeAttribute("data-invalid");
      el.removeAttribute("aria-invalid");
      box.textContent = "";
      box.hidden = true;
    }
  }

  function checkEntrada() {
    if (!entrada.value) return "Informe a data de entrada.";
    if (entrada.value < todayISO()) return "A entrada não pode ser no passado.";
    return "";
  }

  function checkSaida() {
    if (!saida.value) return "Informe a data de saída.";
    if (checkEntrada() === "") {
      if (saida.value <= entrada.value) return "A saída precisa ser depois da entrada.";
    } else if (saida.value < todayISO()) {
      return "A saída não pode ser no passado.";
    }
    return "";
  }

  function checkQuarto() {
    if (!quarto.value) return "Escolha o quarto.";
    return "";
  }

  function checkHospedes() {
    if (!hospedes.value) return "Informe quantos hóspedes.";
    var n = Number(hospedes.value);
    if (quarto.value && n > CAPACITY[quarto.value]) {
      return "O " + ROOM_LABEL[quarto.value] + " recebe até " + CAPACITY[quarto.value] + " hóspedes.";
    }
    return "";
  }

  function syncDateLimits() {
    var today = todayISO();
    entrada.min = today;
    if (entrada.value) {
      var d = parseISO(entrada.value);
      if (d) {
        d.setDate(d.getDate() + 1);
        saida.min = [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
        return;
      }
    }
    saida.min = today;
  }

  function showEmpty() {
    totalEmpty.hidden = false;
    totalCalc.hidden = true;
    totalPending.hidden = true;
    lastTotal = null;
  }

  function showPending() {
    totalEmpty.hidden = true;
    totalCalc.hidden = true;
    totalPending.hidden = false;
  }

  function showTotal(n, value) {
    totalEmpty.hidden = true;
    totalPending.hidden = true;
    totalCalc.hidden = false;
    var nightsLabel = n === 1 ? "1 noite" : n + " noites";
    totalLine.textContent =
      "R$ " + numberFmt.format(rate()) + " × " + nightsLabel +
      " (" + shortDate(entrada.value) + " → " + shortDate(saida.value) + ")";
    totalValue.textContent = numberFmt.format(value);
    lastTotal = value;
  }

  function compute() {
    if (!entrada.value || !saida.value || !quarto.value) {
      showEmpty();
      return;
    }
    if (checkEntrada() || checkSaida()) {
      showEmpty();
      return;
    }
    var n = nights(entrada.value, saida.value);
    if (n < 1) { showEmpty(); return; }
    showTotal(n, n * rate());
  }

  function refreshTotal() {
    if (timer) { window.clearTimeout(timer); timer = null; }
    if (!entrada.value || !saida.value || !quarto.value || checkEntrada() || checkSaida()) {
      showEmpty();
      return;
    }
    showPending();
    timer = window.setTimeout(function () {
      timer = null;
      compute();
    }, 320);
  }

  function clearStatus() {
    status.hidden = true;
    status.textContent = "";
  }

  entrada.addEventListener("change", function () {
    syncDateLimits();
    setError(entrada, checkEntrada());
    if (saida.value) setError(saida, checkSaida());
    refreshTotal();
    clearStatus();
  });

  saida.addEventListener("change", function () {
    setError(saida, checkSaida());
    refreshTotal();
    clearStatus();
  });

  quarto.addEventListener("change", function () {
    setError(quarto, checkQuarto());
    setError(hospedes, checkHospedes());
    refreshTotal();
    clearStatus();
  });

  hospedes.addEventListener("change", function () {
    setError(hospedes, checkHospedes());
    clearStatus();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var e1 = checkEntrada();
    var e2 = checkSaida();
    var e3 = checkQuarto();
    var e4 = checkHospedes();
    setError(entrada, e1);
    setError(saida, e2);
    setError(quarto, e3);
    setError(hospedes, e4);

    var first = e1 ? entrada : e2 ? saida : e3 ? quarto : e4 ? hospedes : null;
    if (first) {
      status.hidden = false;
      status.textContent = "Confira os campos marcados para continuar.";
      first.focus();
      return;
    }

    if (timer) { window.clearTimeout(timer); timer = null; }
    var n = nights(entrada.value, saida.value);
    var value = n * rate();
    showTotal(n, value);
    status.hidden = false;
    status.textContent =
      "Pedido registrado para " + ROOM_LABEL[quarto.value] + ": " + n +
      (n === 1 ? " noite" : " noites") + ", " + hospedes.value +
      (Number(hospedes.value) === 1 ? " hóspede" : " hóspedes") +
      ", R$ " + numberFmt.format(value) + ". Confirmamos a disponibilidade pelo WhatsApp antes de qualquer cobrança.";
  });

  // Atalhos dos quartos: levam o quarto escolhido para o formulário.
  var shortcuts = document.querySelectorAll("[data-room]");
  Array.prototype.forEach.call(shortcuts, function (link) {
    link.addEventListener("click", function () {
      var value = link.getAttribute("data-room");
      if (!value) return;
      quarto.value = value;
      setError(quarto, "");
      setError(hospedes, checkHospedes());
      refreshTotal();
      clearStatus();
      window.setTimeout(function () { entrada.focus({ preventScroll: true }); }, 60);
    });
  });

  // As fotos dos quartos são leves e são o conteúdo principal:
  // continuam lazy no parse e são aquecidas depois do load, sem bloquear a abertura.
  function warmImages() {
    var imgs = document.querySelectorAll('img[loading="lazy"]');
    Array.prototype.forEach.call(imgs, function (img) {
      if (img.naturalWidth > 0) return;
      img.loading = "eager";
      if (!img.currentSrc) img.src = img.getAttribute("src");
    });
  }
  window.addEventListener("load", function () {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(warmImages, { timeout: 600 });
    } else {
      window.setTimeout(warmImages, 200);
    }
  });

  // Estado inicial: datas mínimas e total vazio.
  syncDateLimits();
  showEmpty();
})();
