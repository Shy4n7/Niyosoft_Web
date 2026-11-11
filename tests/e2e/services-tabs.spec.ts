import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("Services tabs", () => {
  test("clicking a tab shows its service", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.serviceTabs.filter({ hasText: "Payment Integration" }).click();

    await expect(home.serviceTabs.filter({ hasText: "Payment Integration" })).toHaveAttribute("aria-selected", "true");
    await expect(home.servicePanel.getByRole("heading")).toHaveText("Payment Integration");
    await expect(home.servicePanel).toContainText("UPI, cards and wallets");
  });

  test("only the selected tab is in the Tab order", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.serviceTabs).toHaveCount(6);
    await expect(home.serviceTabs.first()).toHaveAttribute("tabindex", "0");
    for (const tab of await home.serviceTabs.all().then((tabs) => tabs.slice(1))) {
      await expect(tab).toHaveAttribute("tabindex", "-1");
    }
  });

  test("arrow, Home and End keys move focus and selection", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.serviceTabs.first().focus();

    const expectSelected = async (title: string) => {
      const tab = home.serviceTabs.filter({ hasText: title });
      await expect(tab).toBeFocused();
      await expect(tab).toHaveAttribute("aria-selected", "true");
      await expect(home.servicePanel.getByRole("heading")).toHaveText(title);
    };

    await page.keyboard.press("ArrowRight");
    await expectSelected("Website Development");
    await page.keyboard.press("End");
    await expectSelected("Software Installation & IT Support");
    await page.keyboard.press("ArrowRight");
    await expectSelected("Mobile App Development");
    await page.keyboard.press("ArrowLeft");
    await expectSelected("Software Installation & IT Support");
    await page.keyboard.press("Home");
    await expectSelected("Mobile App Development");
  });
});
