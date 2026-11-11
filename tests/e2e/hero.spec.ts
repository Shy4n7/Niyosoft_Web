import { expect, test, type Page } from "@playwright/test";

const orbitLayer = (page: Page) => page.locator('[class*="spin_70s_linear_infinite]"]');

test.describe("Hero service orbit", () => {
  test("shows four services and is hidden from screen readers", async ({ page }) => {
    await page.goto("/");

    await expect(orbitLayer(page).locator("svg")).toHaveCount(4);
    await expect(orbitLayer(page).getByText("Mobile Apps", { exact: true })).toBeVisible();
    await expect(orbitLayer(page).getByText("Payments", { exact: true })).toHaveCount(0);
    await expect(orbitLayer(page).getByText("Online Ordering", { exact: true })).toHaveCount(0);
    await expect(page.locator('[aria-hidden="true"]', { has: orbitLayer(page) })).toHaveCount(1);
    await expect(page.locator('img[src="/images/n-mark.webp"]')).toBeVisible();
  });

  test("spins, and stays still when reduced motion is requested", async ({ browser }) => {
    for (const [reducedMotion, shouldMove] of [["no-preference", true], ["reduce", false]] as const) {
      const context = await browser.newContext({ reducedMotion, viewport: { width: 1280, height: 800 } });
      const page = await context.newPage();
      await page.goto("/");
      const transform = () => orbitLayer(page).evaluate((element) => getComputedStyle(element).transform);

      const before = await transform();
      await page.waitForTimeout(1200);
      expect(await transform() !== before, reducedMotion).toBe(shouldMove);
      await context.close();
    }
  });
});
