/* Atlético Boa Vista — minimal vanilla behaviour.
   Sorting, filtering, the two data states, inbox read/expand, theme. */

(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var live = $("#live");

  function announce(message) {
    if (!live) return;
    live.textContent = "";
    window.setTimeout(function () { live.textContent = message; }, 30);
  }

  /* ---------------- theme ---------------- */

  var root = document.documentElement;
  var themeBtn = $("#themeBtn");
  var themeLabel = $("#themeLabel");
  var scheme = window.matchMedia("(prefers-color-scheme: dark)");

  try {
    var saved = window.localStorage.getItem("abv-theme");
    if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
  } catch (err) { /* storage blocked: follow the OS */ }

  function isDark() {
    return root.getAttribute("data-theme")
      ? root.getAttribute("data-theme") === "dark"
      : scheme.matches;
  }

  function syncTheme() {
    var dark = isDark();
    themeBtn.setAttribute("aria-pressed", String(dark));
    themeLabel.textContent = dark ? "Tema claro" : "Tema escuro";
    themeBtn.setAttribute("aria-label", dark ? "Mudar para tema claro" : "Mudar para tema escuro");
  }

  themeBtn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { window.localStorage.setItem("abv-theme", next); } catch (err) { /* no-op */ }
    syncTheme();
    announce(next === "dark" ? "Tema escuro ativo." : "Tema claro ativo.");
  });
  if (scheme.addEventListener) scheme.addEventListener("change", syncTheme);
  syncTheme();

  /* ---------------- data states ---------------- */

  var feedState = $("#feedState");
  var feed = $("#feed");
  var feedButtons = $$("[data-feed]");
  var squadTable = $(".squad");
  var squadData = $("#squadData");
  var squadSkeleton = $("#squadSkeleton");
  var squadError = $("#squadError");
  var squadEmpty = $("#squadEmpty");
  var inboxList = $("#inboxList");
  var inboxSkeleton = $("#inboxSkeleton");
  var inboxError = $("#inboxError");
  var dataState = "live";
  var retryTimer = null;

  var stateLabels = { live: "Dados ao vivo.", loading: "Carregando dados do provedor.", error: "Falha na conexão com o provedor." };

  function setFeed(next, silent) {
    dataState = next;
    document.body.setAttribute("data-feed", next);
    feedState.textContent = next === "live" ? "ao vivo" : next === "loading" ? "carregando" : "falha";
    feedButtons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-feed") === next));
    });

    squadData.hidden = next !== "live";
    squadSkeleton.hidden = next !== "loading";
    squadError.hidden = next !== "error";
    inboxList.hidden = next !== "live";
    inboxSkeleton.hidden = next !== "loading";
    inboxError.hidden = next !== "error";
    squadTable.setAttribute("aria-busy", String(next === "loading"));

    if (next === "live") {
      applyFilters();
    } else {
      squadEmpty.hidden = true;
      if (feed.open) feed.open = false;
    }
    if (!silent) announce(stateLabels[next]);
  }

  feedButtons.forEach(function (b) {
    b.addEventListener("click", function () {
      window.clearTimeout(retryTimer);
      setFeed(b.getAttribute("data-feed"));
    });
  });

  document.addEventListener("click", function (event) {
    if (feed.open && !feed.contains(event.target)) feed.open = false;
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && feed.open) {
      feed.open = false;
      var summary = $(".feed__summary", feed);
      if (summary) summary.focus();
    }
  });

  $$("[data-retry]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setFeed("loading");
      window.clearTimeout(retryTimer);
      retryTimer = window.setTimeout(function () { setFeed("live"); }, 1100);
    });
  });

  /* ---------------- squad: filter + sort ---------------- */

  var rows = $$("#squadData tr");
  var chips = $$(".chip");
  var squadCount = $("#squadCount");
  var clearBtn = $("#clearFilters");
  var currentPos = "todas";
  var sortKey = null;
  var sortDir = 1;
  var labels = { name: "nome", age: "idade", apps: "jogos", goals: "gols", ca: "cartões amarelos", rating: "nota" };

  function numeric(row, key) { return parseFloat(row.getAttribute("data-" + key)) || 0; }

  function visibleRows() {
    return rows.filter(function (row) {
      return currentPos === "todas" || row.getAttribute("data-pos") === currentPos;
    });
  }

  function sortRows() {
    if (!sortKey) return;
    rows.slice().sort(function (a, b) {
      var result;
      if (sortKey === "name") {
        result = a.getAttribute("data-name").localeCompare(b.getAttribute("data-name"), "pt-BR");
      } else {
        result = numeric(a, sortKey) - numeric(b, sortKey);
      }
      if (result === 0) result = numeric(a, "order") - numeric(b, "order");
      return result * sortDir;
    }).forEach(function (row) { squadData.appendChild(row); });
  }

  function applyFilters() {
    if (dataState !== "live") return;
    var shown = 0;
    rows.forEach(function (row) {
      var match = currentPos === "todas" || row.getAttribute("data-pos") === currentPos;
      row.hidden = !match;
      if (match) shown += 1;
    });
    squadEmpty.hidden = shown !== 0;
    squadData.hidden = shown === 0;
    clearBtn.hidden = currentPos === "todas";

    var order = sortKey
      ? "ordenado por " + labels[sortKey] + (sortDir === 1 ? ", crescente" : ", decrescente")
      : "ordenado por posição";
    squadCount.textContent = shown + (shown === 1 ? " atleta" : " atletas") + " · " + order;
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      currentPos = chip.getAttribute("data-pos");
      chips.forEach(function (other) {
        other.setAttribute("aria-pressed", String(other === chip));
      });
      applyFilters();
      var shown = visibleRows().length;
      announce((currentPos === "todas" ? "Todos os " : "Filtro " + currentPos + ": ") + shown + " atletas.");
    });
  });

  clearBtn.addEventListener("click", function () {
    currentPos = "todas";
    chips.forEach(function (chip) {
      chip.setAttribute("aria-pressed", String(chip.getAttribute("data-pos") === "todas"));
    });
    applyFilters();
    announce("Filtros limpos. 18 atletas.");
  });

  $("#emptyClear").addEventListener("click", function () {
    currentPos = "todas";
    chips.forEach(function (chip) {
      chip.setAttribute("aria-pressed", String(chip.getAttribute("data-pos") === "todas"));
    });
    applyFilters();
    announce("Filtros limpos. 18 atletas.");
  });

  $$(".sort").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-key");
      if (sortKey === key) {
        sortDir = sortDir * -1;
      } else {
        sortKey = key;
        sortDir = key === "name" ? 1 : -1;
      }
      $$(".sort").forEach(function (other) {
        var th = other.closest("th");
        var ind = $(".sort__ind", other);
        if (other === btn) {
          th.setAttribute("aria-sort", sortDir === 1 ? "ascending" : "descending");
          ind.textContent = sortDir === 1 ? "↑" : "↓";
        } else {
          th.removeAttribute("aria-sort");
          ind.textContent = "↕";
        }
      });
      sortRows();
      applyFilters();
      announce("Ordenado por " + labels[key] + (sortDir === 1 ? ", crescente." : ", decrescente."));
    });
  });

  applyFilters();

  /* ---------------- inbox ---------------- */

  var unreadCount = $("#unreadCount");
  var markAll = $("#markAll");

  function updateUnread() {
    var unread = $$(".inbox__item.is-unread").length;
    unreadCount.textContent = unread === 0 ? "tudo lido" : unread === 1 ? "1 não lida" : unread + " não lidas";
    markAll.disabled = unread === 0;
  }

  $$(".msg").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".inbox__item");
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
      if (!open) {
        item.classList.remove("is-unread");
        updateUnread();
      }
    });
  });

  markAll.addEventListener("click", function () {
    $$(".inbox__item.is-unread").forEach(function (item) { item.classList.remove("is-unread"); });
    updateUnread();
    announce("Todas as mensagens marcadas como lidas.");
  });

  updateUnread();

  /* Optional deep link for the data state; applied after both tables are wired. */
  var requested = new URLSearchParams(window.location.search).get("feed");
  if (requested === "loading" || requested === "error" || requested === "live") {
    setFeed(requested, true);
  }
}());
