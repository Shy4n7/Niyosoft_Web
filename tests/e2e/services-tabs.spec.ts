import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("Services tabs", () => {
  test("clicking a tab shows its service", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.serviceTabs.filter({ hasText: "Payments" }).click();

    await expect(home.serviceTabs.filter({ hasText: "Payments" })).toHaveAttribute("aria-selected", "true");
    await expect(home.servicePanel.getByRole("heading")).toHaveText("Payment Integration");
    await expect(home.servicePanel).toContainText("UPI, cards and wallets");
  });

  test("all tabs fit on one row", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    const tops = await home.serviceTabs.evaluateAll((tabs) => tabs.map((tab) => Math.round(tab.getBoundingClientRect().top)));

    expect(new Set(tops).size).toBe(1);
  });

  test("only the selected tab is in the Tab order", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.serviceTabs).toHaveCount(9);
    await expect(home.serviceTabs.first()).toHaveAttribute("tabindex", "0");
    for (const tab of await home.serviceTabs.all().then((tabs) => tabs.slice(1))) {
      await expect(tab).toHaveAttribute("tabindex", "-1");
    }
  });

  test("arrow, Home and End keys move focus and selection", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.serviceTabs.first().focus();

    const expectSelected = async (label: string, title: string) => {
      const tab = home.serviceTabs.filter({ hasText: label });
      await expect(tab).toBeFocused();
      await expect(tab).toHaveAttribute("aria-selected", "true");
      await expect(home.servicePanel.getByRole("heading")).toHaveText(title);
    };

    await page.keyboard.press("ArrowRight");
    await expectSelected("Websites", "Website Development");
    await page.keyboard.press("End");
    await expectSelected("IT Support", "Software Installation & IT Support");
    await page.keyboard.press("ArrowRight");
    await expectSelected("Mobile Apps", "Mobile App Development");
    await page.keyboard.press("ArrowLeft");
    await expectSelected("IT Support", "Software Installation & IT Support");
    await page.keyboard.press("Home");
    await expectSelected("Mobile Apps", "Mobile App Development");
  });
});
