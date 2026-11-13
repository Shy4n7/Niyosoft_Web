import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("Meet the team", () => {
  test("shows the founder and Head HR", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("#about");
    const about = home.section("about");
    await expect(about.getByRole("heading", { name: "Ashok Thomas" })).toBeVisible();
    await expect(about.getByRole("heading", { name: "William Christopher" })).toBeVisible();
  });

  test("developer slider advances on its own and the dots jump between people", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("#about");
    const slider = page.getByRole("region", { name: "Our developers" });
    const active = slider.locator("article[aria-hidden='false'] h4");

    await expect(active).toHaveText("Shyan Paul S");
    await expect(active).toHaveText("Vishal P", { timeout: 7000 });

    await page.mouse.move(0, 0);
    await slider.getByRole("button", { name: "Show Nithin Sachin R" }).click();
    await expect(active).toHaveText("Nithin Sachin R");
    await expect(slider.getByRole("button", { name: "Show Nithin Sachin R" })).toHaveAttribute("aria-current", "true");
  });

  test("slider stays still when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const home = new HomePage(page);
    await home.goto("#about");
    const active = page.getByRole("region", { name: "Our developers" }).locator("article[aria-hidden='false'] h4");
    await expect(active).toHaveText("Shyan Paul S");
    await page.waitForTimeout(5500);
    await expect(active).toHaveText("Shyan Paul S");
  });
});
