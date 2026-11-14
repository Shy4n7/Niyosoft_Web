import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("Services", () => {
  test("shows every service as a card, closed by default", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("#services");

    await expect(home.serviceCards).toHaveCount(9);
    for (const card of await home.serviceCards.all()) {
      await expect(card).toHaveAttribute("aria-expanded", "false");
    }
    await expect(page.locator("#service-payments")).toBeHidden();
  });

  test("tapping a card shows what is included and tapping again hides it", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("#services");
    const card = home.serviceCards.filter({ hasText: "Payment Integration" });

    await card.click();
    await expect(card).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#service-payments")).toContainText("UPI, cards and wallets");

    await card.click();
    await expect(card).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#service-payments")).toBeHidden();
  });

  test("an opened card stays visible", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("#services");
    const card = home.serviceCards.filter({ hasText: "Payment Integration" });
    await card.scrollIntoViewIfNeeded();
    const wrapper = card.locator("xpath=..");
    await expect(wrapper).toHaveCSS("opacity", "1");

    await card.click();
    await page.waitForTimeout(1000);
    await expect(wrapper).toHaveCSS("opacity", "1");
    await expect(page.locator("#service-payments")).toBeVisible();
  });

  test("cards open with the keyboard", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("#services");
    const card = home.serviceCards.filter({ hasText: "AI Chatbots & Assistants" });

    await card.focus();
    await page.keyboard.press("Enter");
    await expect(card).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#service-ai-chatbots")).toContainText("Website and WhatsApp chatbots");
  });
});
