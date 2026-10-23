import { expect, test as base, type Page } from "@playwright/test";

// Behaviour smoke test. B0 wrote it against the old UI; B5 rewrote its steps for the new one.
// The behaviours are the same as in B0: the list loads; search, filter and order work; a report opens;
// insights show; the PDF downloads; an unknown candidate gets a 404.

const KNOWN_ID = "DEUS-2026-09611";
const KNOWN_NAME = "Agus Wibowo";

// Every test also fails on a console error or an uncaught error in the page (a React key clash, a failed hydration).
const test = base.extend<{ consoleGuard: void; ignoredErrors: RegExp[] }>({
  ignoredErrors: [[], { option: true }],
  consoleGuard: [
    async ({ page, ignoredErrors }, use) => {
      const problems: string[] = [];
      page.on("pageerror", (e) => problems.push(`uncaught: ${e.message}`));
      page.on("console", (m) => {
        // The browser logs a 404 response as an error; the 404 test checks the status itself.
        if (m.type() !== "error" || m.text().startsWith("Failed to load resource")) return;
        if (!ignoredErrors.some((re) => re.test(m.text()))) problems.push(m.text());
      });
      await use();
      // React logs some problems on a later render (the dev server's first-compile refresh), after a quick test has
      // finished, so let the page settle before looking.
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(750);
      expect(problems, "console errors").toEqual([]);
    },
    { auto: true },
  ],
});

// One link per candidate, in both the By level and List views.
const candidates = (page: Page) => page.locator("main [data-ref]");

// The List view's cells in the column with this heading, found by name so a reordered column doesn't break the test.
async function column(page: Page, heading: string) {
  const heads = await page.locator("thead th").allInnerTexts();
  const at = heads.findIndex((t) => t.trim() === heading);
  expect(at, `a "${heading}" column`).toBeGreaterThanOrEqual(0);
  return page.locator(`tbody tr td:nth-child(${at + 1})`);
}
const scores = async (page: Page) => (await (await column(page, "Score")).allInnerTexts()).map((t) => Number(t.replace(/\D/g, "")));
const names = async (page: Page) => (await (await column(page, "Candidate")).locator("a").allInnerTexts()).map((t) => t.trim());

test.describe("report list", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(candidates(page).first()).toBeVisible();
    await page.waitForLoadState("networkidle");
  });

  test("list loads with every candidate", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(candidates(page)).toHaveCount(10);
    await expect(page.locator("#content").getByText("Showing all 10 candidates")).toBeVisible();
    await expect(candidates(page).filter({ hasText: KNOWN_NAME })).toHaveCount(1);
    // Grouped by level, best fit first.
    const lanes = await page.getByRole("heading", { level: 2 }).allInnerTexts();
    expect(lanes.map((t) => t.split("\n")[0].trim())).toEqual(["Highly Recommended", "Recommended", "Considered", "Not Recommended"]);
  });

  test("search narrows by name and by reference number, and stays in the URL", async ({ page }) => {
    const box = page.getByRole("searchbox", { name: "Search by name or reference" });
    await box.fill("agus");
    await expect(candidates(page)).toHaveCount(1);
    await expect(candidates(page).first()).toContainText(KNOWN_NAME);
    await expect(page).toHaveURL(/[?&]q=agus/);

    await box.fill("09612");
    await expect(candidates(page)).toHaveCount(1);
    await expect(candidates(page).first()).toContainText("Rina Marlina");
    await expect(page.locator("#content").getByText("Showing 1 of 10 candidates")).toBeVisible();

    await box.fill("zzzz-nobody");
    await expect(page.getByRole("heading", { name: "No candidates match “zzzz-nobody”" })).toBeVisible();
    await page.getByRole("button", { name: "Clear search" }).click();
    await expect(candidates(page)).toHaveCount(10);
    await expect(page).not.toHaveURL(/[?&]q=/);
  });

  test("role and level narrow the list and each chip clears its own", async ({ page }) => {
    const role = page.locator("select[aria-label='Role']");
    const roles = (await role.locator("option").allInnerTexts()).slice(1);
    expect(roles.length).toBeGreaterThan(1);

    await role.selectOption({ label: roles[0] });
    const narrowed = await candidates(page).count();
    expect(narrowed).toBeGreaterThan(0);
    expect(narrowed).toBeLessThan(10);
    await expect(page).toHaveURL(/[?&]role=/);
    await page.getByRole("button", { name: `Remove filter ${roles[0]}` }).click();
    await expect(candidates(page)).toHaveCount(10);

    // The band's level counts narrow to one level and toggle back.
    const level = page.getByRole("group", { name: "Show one level" }).getByRole("button", { name: /Highly Recommended/ });
    const expected = Number((await level.innerText()).split("\n")[0]);
    await level.click();
    await expect(level).toHaveAttribute("aria-pressed", "true");
    await expect(candidates(page)).toHaveCount(expected);
    await expect(page).toHaveURL(/[?&]level=4/);
    await level.click();
    await expect(candidates(page)).toHaveCount(10);

    // Filters combine; "Clear all" undoes them together.
    await role.selectOption({ label: roles[0] });
    await page.locator("select[aria-label='Level']").selectOption({ label: "Recommended" });
    await page.getByRole("button", { name: "Clear all" }).click();
    await expect(candidates(page)).toHaveCount(10);
  });

  test("order sorts by score both ways and by name", async ({ page }) => {
    await page.getByRole("button", { name: "List", exact: true }).click();
    await expect(page.locator("tbody tr")).toHaveCount(10);
    const order = page.locator("select[aria-label='Order']");
    const sortedBy = (xs: number[], dir: 1 | -1) => xs.every((x, i) => i === 0 || (xs[i - 1] - x) * dir <= 0);

    await order.selectOption({ label: "Highest score first" });
    expect(sortedBy(await scores(page), -1)).toBe(true);
    await expect(page).toHaveURL(/[?&]order=high/);
    await order.selectOption({ label: "Lowest score first" });
    expect(sortedBy(await scores(page), 1)).toBe(true);

    await order.selectOption({ label: "Name A to Z" });
    const az = await names(page);
    expect(az).toEqual([...az].sort((a, b) => a.localeCompare(b, "id")));
    await order.selectOption({ label: "Name Z to A" });
    const za = await names(page);
    expect(za).toEqual([...za].sort((a, b) => b.localeCompare(a, "id")));
  });

  test("the narrowing travels to the report and back", async ({ page }) => {
    const role = page.locator("select[aria-label='Role']");
    const roles = (await role.locator("option").allInnerTexts()).slice(1);
    await role.selectOption({ label: roles[0] });
    const shown = await candidates(page).count();

    await candidates(page).first().click();
    await expect(page).toHaveURL(/\/report\/.*[?&]role=/, { timeout: 20_000 });
    await expect(page.getByRole("navigation", { name: "Candidates" })).toContainText(`1 of ${shown}`);

    await page.getByRole("link", { name: "All candidates", exact: true }).click();
    await expect(page).toHaveURL(/\/\?.*role=/);
    await expect(candidates(page)).toHaveCount(shown);
  });
});

test.describe("report", () => {
  test("a report opens from the list", async ({ page }) => {
    await page.goto("/");
    await expect(candidates(page).first()).toBeVisible();
    await page.waitForLoadState("networkidle");
    await candidates(page).filter({ hasText: KNOWN_NAME }).click();
    // The dev server compiles the report route on first visit.
    await expect(page).toHaveURL(new RegExp(`/report/${KNOWN_ID}$`), { timeout: 20_000 });
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(KNOWN_NAME);
    await expect(page.getByText(KNOWN_ID).first()).toBeVisible();
    await expect(page.getByRole("img", { name: /Suitability \d+ out of 100/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Competencies" })).toBeVisible();

    await page.getByRole("link", { name: "All candidates", exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("a competency opens its detail", async ({ page }) => {
    await page.goto(`/report/${KNOWN_ID}`);
    const first = page.locator("button[aria-controls^='detail-']").first();
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await first.click();
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("[id^='detail-']").getByText("What it measures.")).toBeVisible();
    await expect(page.getByText(/^This score, \d+$/)).toBeVisible();
  });

  test("insights show", async ({ page }) => {
    await page.goto(`/report/${KNOWN_ID}`);
    await expect(page.getByRole("heading", { name: "Strengths and shortfalls" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Does well" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Where they fall short" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^Risks in this role/ })).toBeVisible();
    const summary = page.locator("p", { has: page.getByText("In short.", { exact: true }) });
    expect((await summary.innerText()).trim().length).toBeGreaterThan(40);
  });

  test("PDF downloads", async ({ page }) => {
    await page.goto(`/report/${KNOWN_ID}`);
    const [download] = await Promise.all([
      page.waitForEvent("download", { timeout: 60_000 }),
      page.getByRole("button", { name: "Save PDF" }).click(),
    ]);
    expect(download.suggestedFilename()).toBe(`${KNOWN_NAME} - Shift Manager - 12 Oct 2026.pdf`);
    const path = await download.path();
    const { statSync, readFileSync } = await import("node:fs");
    expect(statSync(path).size).toBeGreaterThan(5_000);
    expect(readFileSync(path).subarray(0, 5).toString()).toBe("%PDF-");
    await expect(page.getByText(/^Saved “/)).toBeVisible();
  });

  // Known, dev-only: the proxy rewrites an unknown reference to /report-not-found/<ref> (B4) so the page has a real
  // 404 status, and React then warns about the root layout's inline script. A plain unknown path doesn't.
  // Drop this once the rewrite no longer causes it.
  test.describe("unknown candidate", () => {
    test.use({ ignoredErrors: [/Encountered a script tag while rendering React component/] });

    test("an unknown candidate gets a 404", async ({ page }) => {
      const response = await page.goto("/report/DEUS-0000-00000");
      expect(response?.status()).toBe(404);
    });
  });
});
