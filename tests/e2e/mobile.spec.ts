import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("Mobile", () => {
  test("menu opens, navigates to a section and closes", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    const toggle = page.getByRole("button", { name: "Open menu" });
    const mobileNav = page.getByRole("navigation", { name: "Mobile" });

    await expect(home.mainNav).toBeHidden();
    await toggle.click();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");

    await mobileNav.getByRole("link", { name: "Services", exact: true }).click();

    await expect(mobileNav).toBeHidden();
    await home.expectSectionAtTop("services");
  });

  test("Escape closes the menu and returns focus to the toggle", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await expect(mobileNav).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(mobileNav).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });

  test("service cards stack in one column and open on tap", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("#services");
    const lefts = await home.serviceCards.evaluateAll((cards) => cards.map((card) => Math.round(card.getBoundingClientRect().left)));
    expect(new Set(lefts).size).toBe(1);

    const card = home.serviceCards.filter({ hasText: "Software Installation & IT Support" });
    await card.click();
    await expect(card).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#service-it-support")).toContainText("Troubleshooting");
  });

  test("pages do not scroll sideways", async ({ page }) => {
    for (const path of ["/", "/projects/", "/privacy/", "/terms/"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
});
