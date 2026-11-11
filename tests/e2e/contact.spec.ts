import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("Contact", () => {
  test("contact cards link to phone, WhatsApp and email", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("#contact");
    const contact = home.section("contact");

    await expect(contact.getByRole("link", { name: /Call us/ })).toHaveAttribute("href", "tel:+917904153087");
    await expect(contact.getByRole("link", { name: /Email/ })).toHaveAttribute("href", "mailto:niyosofttechnologies@gmail.com");

    const whatsapp = contact.getByRole("link", { name: /WhatsApp/ });
    await expect(whatsapp).toHaveAttribute("href", "https://wa.me/917904153087");
    await expect(whatsapp).toHaveAttribute("target", "_blank");
    await expect(whatsapp).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("copy buttons put the value on the clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const home = new HomePage(page);
    await home.goto("#contact");

    for (const [label, value] of [["Copy phone number", "+91 79041 53087"], ["Copy email address", "niyosofttechnologies@gmail.com"]] as const) {
      const button = page.getByRole("button", { name: label });
      await button.click();
      await expect(button).toContainText("Copied");
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(value);
      await expect(button).toContainText("Copy", { timeout: 4000 });
    }
  });

  test("office address and map are shown", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("#contact");
    const contact = home.section("contact");

    await expect(contact.locator("address")).toContainText("Pollachi");
    await expect(contact.locator("iframe[title*='Google Maps']")).toHaveAttribute("src", /google\.com\/maps.*output=embed/);
  });

  test("floating WhatsApp button is always available and back-to-top appears after scrolling", async ({ page }) => {
    await page.goto("/");
    const backToTop = page.getByRole("button", { name: "Back to top" });

    await expect(page.getByRole("link", { name: "Chat with us on WhatsApp" })).toBeVisible();
    await expect(backToTop).toHaveCSS("opacity", "0");

    await page.evaluate(() => window.scrollTo(0, 1500));
    await expect(backToTop).toHaveCSS("opacity", "1");
    await backToTop.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });
});
