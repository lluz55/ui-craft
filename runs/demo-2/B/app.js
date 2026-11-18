/* Atlético Boa Vista — interações mínimas: tema, filtro, ordenação, radar. */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- tema ---------- */
  var themeBtn = document.getElementById("theme-btn");
  var stored = null;
  try { stored = localStorage.getItem("abv-theme"); } catch (e) { stored = null; }

  function applyTheme(mode) {
    if (mode === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    if (themeBtn) {
      var dark = mode === "dark";
      themeBtn.setAttribute("aria-pressed", String(dark));
      themeBtn.querySelector(".theme-lbl").textContent = dark ? "Tema claro" : "Tema escuro";
    }
  }

  var initial = stored || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(initial);

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("abv-theme", next); } catch (e) {}
    });
  }

  /* ---------- elenco: filtro + busca ---------- */
  var body = document.getElementById("squad-body");
  var rows = body ? Array.prototype.slice.call(body.rows) : [];
  var count = document.getElementById("squad-count");
  var empty = document.getElementById("squad-empty");
  var emptyQ = document.getElementById("empty-q");
  var query = document.getElementById("q");
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip"));
  var activeGroup = "all";
  var term = "";

  function rowMatches(tr) {
    var groupOk = activeGroup === "all" || tr.getAttribute("data-group") === activeGroup;
    if (!groupOk) return false;
    if (!term) return true;
    var hay = (tr.getAttribute("data-name") || "") + " " +
      tr.cells[0].textContent + " " +
      tr.getAttribute("data-age") + " " +
      tr.querySelector(".c-pos").textContent;
    return hay.toLowerCase().indexOf(term) !== -1;
  }

  function render() {
    var shown = 0;
    rows.forEach(function (tr) {
      var ok = rowMatches(tr);
      tr.hidden = !ok;
      if (ok) shown++;
    });
    if (count) count.textContent = shown + (shown === 1 ? " jogador" : " jogadores");
    if (empty) {
      empty.hidden = shown !== 0;
      if (shown === 0 && emptyQ) emptyQ.textContent = term || "filtro de posição";
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      activeGroup = chip.getAttribute("data-group");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      render();
    });
  });

  if (query) {
    query.addEventListener("input", function () {
      term = query.value.trim().toLowerCase();
      render();
    });
  }

  var clear = document.getElementById("clear-filters");
  if (clear) {
    clear.addEventListener("click", function () {
      term = "";
      if (query) query.value = "";
      activeGroup = "all";
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", String(c.getAttribute("data-group") === "all"));
      });
      render();
      if (query) query.focus();
    });
  }

  /* ---------- elenco: ordenação ---------- */
  var sortKeys = { name: "string", age: "num", j: "num", g: "num", note: "num", cond: "num" };
  var sorts = Array.prototype.slice.call(document.querySelectorAll(".sort"));

  sorts.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-key");
      var th = btn.closest("th");
      var current = th.getAttribute("aria-sort");
      var dir = current === "ascending" ? -1 : 1;
      sorts.forEach(function (b) {
        b.closest("th").setAttribute("aria-sort", b === btn ? (dir === 1 ? "ascending" : "descending") : "none");
      });

      var sorted = rows.slice().sort(function (a, b) {
        var av = a.getAttribute("data-" + key) || "";
        var bv = b.getAttribute("data-" + key) || "";
        if (sortKeys[key] === "num") return (parseFloat(av) - parseFloat(bv)) * dir;
        return av.localeCompare(bv, "pt-BR") * dir;
      });
      sorted.forEach(function (tr) { body.appendChild(tr); });
      render();
    });
  });

  /* ---------- radar: erro → carregando → dado ---------- */
  var radar = document.getElementById("radar");
  var retry = document.getElementById("radar-retry");
  if (radar && retry) {
    var errBox = radar.querySelector(".radar-error");
    var loadBox = radar.querySelector(".radar-loading");
    var dataBox = radar.querySelector(".radar-data");
    retry.addEventListener("click", function () {
      errBox.hidden = true;
      loadBox.hidden = false;
      radar.setAttribute("data-state", "loading");
      window.setTimeout(function () {
        loadBox.hidden = true;
        dataBox.hidden = false;
        radar.setAttribute("data-state", "ready");
      }, 900);
    });
  }

  /* ---------- atalhos ---------- */
  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    var typing = tag === "input" || tag === "textarea" || e.target.isContentEditable;
    if (typing) return;
    if (e.key === "/" && query) {
      e.preventDefault();
      query.focus();
    } else if ((e.key === "t" || e.key === "T") && themeBtn && !e.metaKey && !e.ctrlKey && !e.altKey) {
      themeBtn.click();
    }
  });
})();
