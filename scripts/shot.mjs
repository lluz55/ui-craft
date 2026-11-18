#!/usr/bin/env node
/**
 * shot.mjs — render, screenshot and *measure* a page with zero dependencies.
 *
 * Two jobs, because not every agent can see:
 *   - with eyes  : give it a faithful full-page PNG to look at
 *   - without    : give it numbers it can reason about instead of guessing
 *
 * Uses headless Chromium over the DevTools protocol with Node's built-in WebSocket
 * (Node >= 22). No Playwright, no Puppeteer, no network access.
 *
 *   node scripts/shot.mjs <page.html> <out.png> [width] [height] [--full] [--deep]
 *
 *   --full   capture the whole page, not just the viewport
 *   --deep   add the blind-path audit: clipped text, tap targets, heading
 *            outline, focus order, font loading, computed contrast pairs
 *
 * stdout is JSON. Exit codes: 0 ok · 1 tool failure · 2 horizontal overflow
 * (the screenshot is still written — the point is to surface it, not hide it).
 */

import { spawn } from "node:child_process";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const argv = process.argv.slice(2);
const full = argv.includes("--full");
const deep = argv.includes("--deep");
const [page, out, wArg, hArg] = argv.filter((a) => !a.startsWith("--"));

if (!page || !out) {
  console.error("usage: node scripts/shot.mjs <page.html> <out.png> [width] [height] [--full] [--deep]");
  process.exit(1);
}

const width = Number(wArg || 1440);
const height = Number(hArg || 900);
const port = 9200 + Math.floor(Math.random() * 600);
const profile = await mkdtemp(join(tmpdir(), "shot-"));
const home = await mkdtemp(join(tmpdir(), "shot-home-"));

const browsers = ["chromium", "chromium-browser", "chrome", "google-chrome", "google-chrome-stable"];

function launch(bin) {
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    // /dev/shm is small or unwritable in containers and sandboxes; without this chromium
    // dies with no output and no PNG, which is a confusing failure to debug.
    "--disable-dev-shm-usage",
    "--disable-crash-reporter",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--disable-background-networking",
    "--force-device-scale-factor=1",
    `--user-data-dir=${profile}`,
    `--remote-debugging-port=${port}`,
  ];
  // An unwritable $HOME makes chromium refuse to start, and sandboxes love
  // handing out read-only homes. Point it at a temp dir instead.
  const env = { ...process.env, HOME: process.env.HOME || home };
  return spawn(bin, args, { stdio: ["ignore", "pipe", "pipe"], env });
}

async function waitForDevtools(timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return await res.json();
    } catch {
      /* not listening yet */
    }
    await new Promise((r) => setTimeout(r, 120));
  }
  throw new Error("devtools endpoint never came up");
}

function connect(url) {
  const ws = new WebSocket(url);
  const pending = new Map();
  let id = 0;
  const ready = new Promise((res, rej) => {
    ws.addEventListener("open", () => res(), { once: true });
    ws.addEventListener("error", (e) => rej(new Error(`ws error: ${e.message ?? e}`)), { once: true });
  });
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    const slot = pending.get(msg.id);
    if (!slot) return;
    pending.delete(msg.id);
    if (msg.error) slot.reject(new Error(`${slot.method}: ${msg.error.message}`));
    else slot.resolve(msg.result);
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const n = ++id;
      pending.set(n, { resolve, reject, method });
      ws.send(JSON.stringify({ id: n, method, params }));
    });
  return { ready, send, close: () => ws.close() };
}

const BASIC = `(() => {
  const de = document.documentElement;
  const vw = de.clientWidth;
  const wide = [...document.querySelectorAll('body *')]
    .filter((el) => el.getBoundingClientRect().right > vw + 1)
    .slice(0, 8)
    .map((el) => el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).trim().split(/\\s+/).join('.') : ''));
  return {
    viewport: vw,
    scrollWidth: de.scrollWidth,
    scrollHeight: Math.max(de.scrollHeight, document.body.scrollHeight),
    offenders: wide,
  };
})()`;

const DEEP = `(() => {
  const vw = document.documentElement.clientWidth;

  const label = (el) => el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).trim().split(/\\s+/)[0] : '');

  // A finding without a location is not a finding. Build a usable selector.
  const path = (el) => {
    const bits = [];
    let n = el;
    while (n && n.nodeType === 1 && bits.length < 5) {
      let bit = n.tagName.toLowerCase();
      if (n.id) { bits.unshift(bit + '#' + n.id); break; }
      if (n.className) bit += '.' + String(n.className).trim().split(/\\s+/).slice(0, 2).join('.');
      const sib = n.parentElement ? [...n.parentElement.children].filter((c) => c.tagName === n.tagName) : [];
      if (sib.length > 1) bit += ':nth-of-type(' + (sib.indexOf(n) + 1) + ')';
      bits.unshift(bit);
      n = n.parentElement;
    }
    return bits.join(' > ');
  };
  const textOf = (el) => (el.getAttribute('aria-label') || el.textContent || el.value || '').trim().replace(/\\s+/g, ' ').slice(0, 44);

  // text clipped by its own box
  const clipped = [...document.querySelectorAll('p, h1, h2, h3, h4, li, a, button, label, td, th, summary')]
    .filter((el) => el.textContent.trim().length > 0)
    .filter((el) => el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow !== 'visible')
    .slice(0, 10)
    .map((el) => ({ el: label(el), sel: path(el), text: textOf(el), w: el.clientWidth, content: el.scrollWidth }));

  // anything a finger has to hit
  // A radio's real target is its label, not the 18px circle inside it.
  const hitTarget = (el) =>
    el.matches('input[type="radio"], input[type="checkbox"]') ? el.closest("label") || el : el;
  const small = [...document.querySelectorAll('a[href], button, input, select, textarea, [role="button"]')]
    .map((el) => ({ el, t: hitTarget(el) }))
    .filter(({ t }) => { const r = t.getBoundingClientRect(); return r.width > 0 && r.height > 0; })
    .filter(({ t }) => { const r = t.getBoundingClientRect(); return r.height < 24 || r.width < 24; })
    .slice(0, 10)
    .map(({ el, t }) => { const r = t.getBoundingClientRect(); return { el: label(t), sel: path(el), text: textOf(el), w: Math.round(r.width), h: Math.round(r.height) }; });

  const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')]
    .map((el) => el.tagName.toLowerCase() + ' ' + el.textContent.trim().slice(0, 60));

  const focusables = [...document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')]
    .filter((el) => el.tabIndex >= 0 && el.getBoundingClientRect().width > 0)
    .slice(0, 25)
    .map((el) => el.tagName.toLowerCase() + (el.textContent.trim() ? ' "' + el.textContent.trim().slice(0, 32) + '"' : ''));

  const fonts = document.fonts ? [...document.fonts].map((f) => f.family.replace(/["']/g, '') + ':' + f.status) : [];
  const fontStatus = document.fonts ? document.fonts.status : 'unknown';

  // effective contrast: walk up until an opaque background
  const parse = (c) => {
    const m = c.match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(',').map((n) => parseFloat(n));
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const bgOf = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0.95) return c;
      n = n.parentElement;
    }
    const bodyBg = parse(getComputedStyle(document.body).backgroundColor);
    return bodyBg && bodyBg.a > 0.95 ? bodyBg : { r: 255, g: 255, b: 255, a: 1 };
  };
  const seen = new Set();
  const contrasts = [];
  for (const el of [...document.querySelectorAll('p, h1, h2, h3, h4, a, button, li, small, strong, span')]) {
    const text = el.textContent.trim();
    if (!text || el.children.length > 0) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < 0.9) continue;
    const fg = parse(cs.color);
    if (!fg) continue;
    const bg = bgOf(el);
    const L1 = lum(fg), L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const key = cs.color + '|' + [bg.r, bg.g, bg.b].join(',');
    if (seen.has(key)) continue;
    seen.add(key);
    const size = parseFloat(cs.fontSize);
    const large = size >= 24 || (size >= 18.66 && parseInt(cs.fontWeight, 10) >= 700);
    contrasts.push({
      sample: text.slice(0, 34),
      fg: cs.color,
      bg: 'rgb(' + bg.r + ',' + bg.g + ',' + bg.b + ')',
      size: Math.round(size),
      ratio: Math.round(ratio * 100) / 100,
      need: large ? 3 : 4.5,
      pass: ratio >= (large ? 3 : 4.5),
    });
  }

  return {
    viewport: vw,
    clipped,
    small,
    headings,
    focusables,
    fontStatus,
    fonts,
    contrasts,
    contrastFails: contrasts.filter((c) => !c.pass),
  };
})()`;

let child;
try {
  let launched = false;
  let lastErr;
  for (const bin of browsers) {
    try {
      child = launch(bin);
      await waitForDevtools();
      launched = true;
      break;
    } catch (err) {
      lastErr = err;
      child?.kill("SIGKILL");
    }
  }
  if (!launched) throw lastErr ?? new Error("no chromium binary found");

  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const target = targets.find((t) => t.type === "page");
  if (!target?.webSocketDebuggerUrl) throw new Error("no page target exposed by chromium");

  const s = connect(target.webSocketDebuggerUrl);
  await s.ready;
  const call = (method, params = {}) => s.send(method, params);

  await call("Page.enable");
  await call("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  await call("Page.navigate", { url: pathToFileURL(resolve(page)).href });
  await new Promise((r) => setTimeout(r, 900));

  const basic = (await call("Runtime.evaluate", { expression: BASIC, returnByValue: true })).result.value;
  const extra = deep
    ? (await call("Runtime.evaluate", { expression: DEEP, returnByValue: true })).result.value
    : {};

  const shot = await call("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: full,
    ...(full
      ? {
          clip: {
            x: 0,
            y: 0,
            width: basic.viewport,
            height: Math.min(basic.scrollHeight, 20000),
            scale: 1,
          },
        }
      : {}),
  });
  await writeFile(out, Buffer.from(shot.data, "base64"));

  const overflow = basic.scrollWidth - basic.viewport;
  console.log(
    JSON.stringify(
      {
        page,
        out,
        width,
        viewport: basic.viewport,
        scrollWidth: basic.scrollWidth,
        overflowX: overflow,
        scrollHeight: basic.scrollHeight,
        offenders: basic.offenders,
        full,
        ...extra,
      },
      null,
      2,
    ),
  );

  s.close();
  child.kill("SIGKILL");
  process.exit(overflow > 1 ? 2 : 0);
} catch (err) {
  console.error(`shot.mjs failed: ${err.message}`);
  child?.kill("SIGKILL");
  process.exit(1);
} finally {
  await rm(profile, { recursive: true, force: true }).catch(() => {});
  await rm(home, { recursive: true, force: true }).catch(() => {});
}
