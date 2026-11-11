import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("Navigation", () => {
  test("header links scroll to each home section and mark it active", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    for (const [label, id] of [["Services", "services"], ["About Us", "about"], ["Contact", "contact"]] as const) {
      await home.navLink(label).click();
      await home.expectSectionAtTop(id);
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(home.navLink(label)).toHaveClass(/border-brand/);
    }
  });

  test("Projects link opens the case study page", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.navLink("Projects").click();

    await expect(page).toHaveURL(/\/projects\/$/);
    await expect(page.getByRole("heading", { level: 1, name: "Our work" })).toBeVisible();
    await expect(home.navLink("Projects")).toHaveClass(/border-brand/);
  });

  test("section link from another page lands on that home section", async ({ page }) => {
    await page.goto("/projects/");
    const home = new HomePage(page);

    await home.navLink("Contact").click();

    await expect(page).toHaveURL(/\/#contact$/);
    await home.expectSectionAtTop("contact");
  });

  test("deep link to a section scrolls to it on load", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("#about");

    await home.expectSectionAtTop("about");
  });

  test("footer legal links open their pages", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");

    await footer.getByRole("link", { name: "Privacy Policy" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Privacy Policy" })).toBeVisible();

    await footer.getByRole("link", { name: "Terms of Service" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Terms of Service" })).toBeVisible();
  });

  test("unknown URL shows the 404 page with a way home", async ({ page }) => {
    const response = await page.goto("/does-not-exist/");

    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await page.getByRole("link", { name: "Back to home" }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
