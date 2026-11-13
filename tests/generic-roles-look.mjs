// Task 1.6: repeatable local-only gallery and layout checks. Requires an existing
// production build, Xvfb and ImageMagick (native select popups are separate windows).
// Run: xvfb-run -a -s '-screen 0 1600x1400x24' node tests/generic-roles-look.mjs
import assert from "node:assert/strict";
import { spawn, execFileSync } from "node:child_process";
import { existsSync, mkdirSync, openSync, readFileSync, writeFileSync } from "node:fs";
import { once } from "node:events";
import { chromium } from "@playwright/test";

const output = "docs/screenshots/generic-roles";
const origin = "http://127.0.0.1:3201";
// Narrow reruns keep screenshots whose app content has not changed.
const only = process.env.GENERIC_ROLES_ONLY;
const selected = new Set((only ?? "board,menus,reports,pdf").split(","));
const previous = only && existsSync(`${output}/audit.json`)
  ? JSON.parse(readFileSync(`${output}/audit.json`, "utf8")).cases : [];
const roles = [
  ["Customer Service Officer", "09615", "Hendra Gunawan", /customer|enquir|complaint|case|service/i],
  ["Sales Executive", "09612", "Rina Marlina", /buyer|sales|prospect|pipeline|account|client|target/i],
  ["Finance Officer", "09614", "Intan Permatasari", /ledger|invoice|reconcil|close|report|journal|financial|payment/i],
  ["Software Engineer", "09613", "Dimas Saputra", /code|bug|test|software|technical|implementation|release|system/i],
  ["Project Manager", "09619", "Eko Prasetyo", /project|deliver|stakeholder|schedule|milestone|task|team/i],
  ["Management Trainee", "09618", "Citra Ayuningtyas", /rotation|learn|assignment|function|supervisor|business|team/i],
];
const cases = [];
const issues = [];
mkdirSync(output, { recursive: true });

async function record(name, run) {
  try {
    await run();
    cases.push({ name, passed: true });
  } catch (error) {
    cases.push({ name, passed: false });
    issues.push(`${name}: ${error.message}`);
    console.error(`${name}: ${error.message.split("\n")[0]}`);
  }
}

async function settled(page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
}

async function audit(page, name) {
  const failures = await page.evaluate(() => {
    const errors = [];
    const availableWidth = document.documentElement.clientWidth;
    if (document.documentElement.scrollWidth > availableWidth + 1) errors.push("horizontal page overflow");
    for (const img of document.images) {
      const box = img.getBoundingClientRect();
      if (box.width && box.right > 0 && !img.naturalWidth) errors.push(`unloaded image: ${img.src}`);
    }
    for (const el of document.querySelectorAll("h1,h2,h3,p,dd,dt,button,a,td,span,bdi")) {
      const box = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      if (!box.width || box.right < 0 || style.visibility === "hidden" || style.opacity === "0") continue;
      if (el.closest(".sr,.sr-only,[aria-hidden='true'],.doc-offscreen")) continue;
      // The filter rail scrolls by design; queue/file-name ellipses are deliberate.
      const rail = el.closest(".overflow-x-auto");
      if (!rail && box.right > availableWidth + 1) errors.push(`outside right edge: ${el.textContent.trim().slice(0, 65)}`);
      if (style.display !== "inline" && el.clientWidth > 8 && el.scrollWidth > el.clientWidth + 1 &&
          !el.classList.contains("truncate") && !rail) {
        errors.push(`text overflow: ${el.textContent.trim().slice(0, 65)}`);
      }
    }
    for (const el of document.querySelectorAll("button,a,select,input")) {
      const box = el.getBoundingClientRect();
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      if (!box.width || !box.height || x < 0 || x > innerWidth || y < 0 || y > innerHeight) continue;
      if (el.closest(".sr,.sr-only,[aria-hidden='true'],.doc-offscreen")) continue;
      const hit = document.elementFromPoint(x, y);
      if (hit && !el.contains(hit) && !hit.contains(el) && !el.closest("label")?.contains(hit)) {
        errors.push(`covered control: ${el.getAttribute("aria-label") || el.textContent.trim()}`);
      }
    }
    return [...new Set(errors)];
  });
  assert.deepEqual(failures, [], `${name} layout`);
}

async function screenshot(page, name, fullPage = true) {
  await page.screenshot({ path: `${output}/${name}.png`, fullPage, animations: "disabled" });
  await audit(page, name);
}

async function nativeSelectScreenshot(page, name) {
  await page.getByRole("combobox", { name: "Role", exact: true }).click();
  await page.waitForTimeout(250); // Let the OS popup paint before grabbing the X display.
  const bounds = await page.evaluate(() => ({
    // Chromium's minimum outer width exceeds the emulated phone viewport, but
    // its content is left aligned. Its client origin is 2px below outer chrome.
    x: screenX,
    y: screenY + outerHeight - innerHeight + 2,
    width: innerWidth,
    height: innerHeight,
  }));
  execFileSync("import", ["-window", "root", "-crop",
    `${bounds.width}x${bounds.height}+${Math.round(bounds.x)}+${Math.round(bounds.y)}`,
    "+repage", `${output}/${name}.png`], { timeout: 10_000 });
  await page.keyboard.press("Escape");
}

const serverLog = openSync("/tmp/profile-generic-look-server.log", "w");
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", "3201"], {
  stdio: ["ignore", serverLog, serverLog],
  detached: true,
});
let browser;
try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(`preview server exited: ${server.exitCode}`);
    try {
      ready = (await fetch(origin)).ok;
    } catch { /* Wait for this process's local port. */ }
    if (ready) break;
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  assert(ready, "local production server became ready");
  browser = await chromium.launch({ headless: false, args: ["--window-position=0,0", "--hide-scrollbars"] });
  for (const width of [1440, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: width === 1440 ? 1000 : 844 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
      serviceWorkers: "block",
    });
    // These demo checks can only contact the server we started, never a live app.
    await context.route("**/*", (route) => new URL(route.request().url()).origin === origin
      ? route.continue() : route.abort());
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("pageerror", (error) => consoleErrors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });

    if (selected.has("board")) await record(`board-${width}`, async () => {
      await page.goto(origin);
      await settled(page);
      assert.equal(await page.locator("main [data-ref]").count(), 15);
      const lanes = page.locator("section[aria-labelledby^='lane-']");
      assert.equal(await lanes.count(), 4);
      assert.deepEqual(await lanes.evaluateAll((sections) => sections.map((section) =>
        section.querySelectorAll("[data-ref]").length)), [3, 6, 4, 2]);
      for (const lane of await lanes.all()) {
        const count = Number((await lane.locator("h2 em").innerText()).match(/\d+/)[0]);
        assert.equal(await lane.locator("[data-more]").count(), count > 6 ? 1 : 0);
      }
      await screenshot(page, `board-by-level-${width}`);
      for (const [edge, lane] of [["first", lanes.first()], ["last", lanes.last()]]) {
        await lane.screenshot({ path: `${output}/board-lane-${edge}-${width}.png` });
      }
      await page.getByRole("button", { name: "List", exact: true }).click();
      await page.waitForURL(/view=list/);
      assert.equal(await page.locator("tbody tr").count(), 15);
      await screenshot(page, `board-list-${width}`);
      await page.getByRole("button", { name: "By level", exact: true }).click();
      await page.evaluate(() => scrollTo(0, 0));
      const options = await page.getByRole("combobox", { name: "Role", exact: true }).locator("option").allTextContents();
      assert.equal(options[0], "All");
      assert.deepEqual(options.slice(1).sort(), roles.map(([role]) => role).sort());
    });
    if (selected.has("menus")) await record(`role-menu-${width}`, async () => {
      await page.goto(origin);
      await settled(page);
      const options = await page.getByRole("combobox", { name: "Role", exact: true }).locator("option").allTextContents();
      assert.deepEqual(options.slice(1).sort(), roles.map(([role]) => role).sort());
      await nativeSelectScreenshot(page, `role-filter-open-${width}`);
    });

    const reports = [...roles, ["Sales Executive", "09622", "Nadia Kusuma", roles[1][3]]];
    for (const [role, ref, name, domain] of selected.has("reports") ? reports : []) {
      const slug = role.toLowerCase().replaceAll(" ", "-");
      const stem = `${ref === "09622" ? "nadia" : slug}-${width}`;
      await record(`report-${stem}`, async () => {
        // Direct links and a reload exercise state reconstruction as well as board navigation.
        await page.goto(`${origin}/report/DEUS-2026-${ref}?role=${slug}`);
        if (ref === "09615") await page.reload();
        await settled(page);
        assert.equal(await page.locator("h1").innerText(), name);
        assert((await page.locator("section[aria-labelledby='verdict-name']").innerText()).includes(role));
        const chart = page.locator("section[aria-labelledby='competencies-heading']");
        assert((await chart.innerText()).includes(`what a ${role} needs`));
        assert.equal(await chart.locator("button[aria-controls^='detail-']").count(), 6);
        if (ref === "09612") assert((await chart.innerText()).includes("No gaps."));
        if (ref === "09622") assert((await chart.innerText()).includes("No strengths."));
        const queue = page.getByRole("navigation", { name: "Candidates", exact: true });
        assert((await queue.textContent()).includes(role));
        if (!only || !existsSync(`${output}/report-${stem}.png`)) await screenshot(page, `report-${stem}`, false);
        await chart.locator("button[aria-controls^='detail-']").first().click();
        const detail = chart.locator("[id^='detail-']:not([hidden])");
        await detail.waitFor({ state: "visible" });
        const onJob = await detail.locator("p").filter({ hasText: "On the job." }).innerText();
        assert.match(onJob, domain, `role-specific work for ${role}`);
        await chart.screenshot({ path: `${output}/report-${stem}-detail.png`, animations: "disabled" });
        await audit(page, `report-${stem}-detail`);
      });
    }

    if (selected.has("pdf")) await record(`hendra-pdf-${width}`, async () => {
      await page.goto(`${origin}/report/DEUS-2026-09615/preview`);
      await settled(page);
      await page.locator(".doc-onscreen[data-a4='ready']").waitFor();
      await screenshot(page, `hendra-pdf-${width}`, false);
      const heads = page.locator(".doc-onscreen .doc-head");
      assert(await heads.count() > 0, "multi-page running heads exist");
      for (const head of await heads.all()) {
        assert((await head.innerText()).includes("Customer Service Officer"));
        assert(await head.evaluate((el) => {
          const [left, right] = el.children;
          return left.getBoundingClientRect().right + 1 <= right.getBoundingClientRect().left &&
            left.scrollWidth <= left.clientWidth + 1 && el.scrollHeight <= el.clientHeight + 1;
        }), "running head stays on one line and clear of the brand");
      }
      await heads.first().evaluate((el) => scrollTo(0, el.getBoundingClientRect().top + scrollY - 85));
      await screenshot(page, `hendra-pdf-running-head-${width}`, false);
    });
    await record(`console-${width}`, async () => assert.deepEqual(consoleErrors, []));
    await context.close();
    console.log(`${width}px: ${[...selected].join(", ")} captured; ${issues.length} issue(s) so far`);
  }
} finally {
  await browser?.close();
  if (server.exitCode === null) {
    const stopped = once(server, "exit");
    server.kill("SIGTERM"); // The exact PID we started; no process-name matching.
    await stopped;
  }
  const merged = new Map(previous.map((entry) => [entry.name, entry]));
  for (const entry of cases) merged.set(entry.name, entry);
  writeFileSync(`${output}/audit.json`, `${JSON.stringify({ serverPid: server.pid, serverStopped: true, cases: [...merged.values()], issues }, null, 2)}\n`);
}
assert.deepEqual(issues, [], "gallery checks");
console.log(`${cases.length} gallery checks passed; server PID ${server.pid} stopped`);
