// Teste de fumaça do site (Playwright, sem runner: `npm run test:e2e`).
// Sobe contra `astro preview` (dist/ já construído). Falha em:
// - erro JS não tratado (script morto) em qualquer página visitada;
// - FAB de capítulos invisível, sem itens ou sem navegar à âncora;
// - conteúdo de leitura fora do centro;
// - toggle lista/miniaturas e tema inoperantes.
import { chromium } from "@playwright/test";

const BASE = process.env.E2E_BASE ?? "http://localhost:4321";
const failures = [];
const jsErrors = [];

function check(name, cond, extra = "") {
  console.log(`${cond ? "ok  " : "FAIL"} ${name}${extra && cond ? "" : ` — ${extra}`}`);
  if (!cond) failures.push(name);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("pageerror", (err) => jsErrors.push(`pageerror: ${err.message}`));
page.on("console", (msg) => {
  if (msg.type() === "error") jsErrors.push(`console.error: ${msg.text()}`);
});

// ---- Detalhe: FAB + centralização ----
await page.goto(`${BASE}/projetos/ori-lang/`, { waitUntil: "networkidle" });

const fab = page.locator(".toc-fab");
check("FAB existe", (await fab.count()) === 1);
check("FAB visível (tem capítulos)", await fab.isVisible());

const toggle = fab.locator(".toc-button");
await toggle.click();
const menu = fab.locator(".toc-menu");
check("menu abre ao clicar", await menu.isVisible());
const items = menu.locator("ol > li");
const itemCount = await items.count();
check("menu tem capítulos", itemCount > 5, `${itemCount} itens`);

const firstHref = await items.first().locator("a").getAttribute("href");
await items.first().locator("a").click();
await page.waitForFunction((href) => window.location.hash === href, firstHref);
check("clique navega à âncora", page.url().endsWith(firstHref ?? ""), page.url());
check("menu fecha após navegar", await menu.isHidden());

// Centralização do bloco de leitura.
const prose = await page.locator(".ot-prose").first().boundingBox();
const viewport = page.viewportSize();
const left = prose?.x ?? 0;
const right = (viewport?.width ?? 0) - left - (prose?.width ?? 0);
check("prosa centralizada", Math.abs(left - right) < 4, `esq=${left.toFixed(0)} dir=${right.toFixed(0)}`);

// ---- Vitrine: toggle persiste ----
await page.goto(`${BASE}/projetos/`, { waitUntil: "networkidle" });
await page.locator('[data-set-view="list"]').click();
check("toggle vira lista", (await page.locator(".projects").getAttribute("data-view")) === "list");
await page.reload({ waitUntil: "networkidle" });
check(
  "toggle persiste após reload",
  (await page.locator(".projects").getAttribute("data-view")) === "list",
);
await page.locator('[data-set-view="grid"]').click();

// ---- Tema persiste ----
await page.locator(".theme-toggle").click();
const theme = await page.evaluate(() => document.documentElement.dataset.theme);
check("tema alterna", theme === "dark" || theme === "light", String(theme));
await page.reload({ waitUntil: "networkidle" });
check(
  "tema persiste após reload",
  (await page.evaluate(() => document.documentElement.dataset.theme)) === theme,
);

// ---- JS limpo em todas ----
check("nenhum erro JS", jsErrors.length === 0, jsErrors.join(" | ").slice(0, 400));

await browser.close();

if (failures.length > 0) {
  console.error(`\n${failures.length} falha(s): ${failures.join(", ")}`);
  process.exit(1);
}
console.log("\ne2e ok");
