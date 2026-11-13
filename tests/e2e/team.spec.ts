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
    await slider.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);

    await expect(active).toHaveText("Shyan Paul S");
    await expect(active).toHaveText("Vishal P", { timeout: 4500 });

    await page.mouse.move(0, 0);
    await slider.getByRole("button", { name: "Show Nithin Sachin R" }).click();
    await expect(active).toHaveText("Nithin Sachin R");
    await expect(slider.getByRole("button", { name: "Show Nithin Sachin R" })).toHaveAttribute("aria-current", "true");
  });

  test("slider waits until it is on screen and starts from the first person", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);
    const slider = page.getByRole("region", { name: "Our developers" });
    const active = slider.locator("article[aria-hidden='false'] h4");
    await expect(active).toHaveText("Shyan Paul S");

    await slider.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await expect(active).toHaveText("Shyan Paul S");
    await expect(active).toHaveText("Vishal P", { timeout: 4500 });
  });

  test("holding a card stops the slider and it moves one second after the finger lifts", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("#about");
    const slider = page.getByRole("region", { name: "Our developers" });
    const active = slider.locator("article[aria-hidden='false'] h4");
    const track = slider.locator("div.overflow-hidden").first();
    await slider.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await expect(active).toHaveText("Shyan Paul S");

    const touch = (type: string) =>
      track.evaluate((el, type) => {
        const box = el.getBoundingClientRect();
        const point = new Touch({ identifier: 1, target: el, clientX: box.left + 100, clientY: box.top + 100 });
        const list = type === "touchend" ? [] : [point];
        el.dispatchEvent(new TouchEvent(type, { bubbles: true, touches: list, targetTouches: list, changedTouches: [point] }));
      }, type);

    await touch("touchstart");
    await page.waitForTimeout(4000);
    await expect(active).toHaveText("Shyan Paul S");

    await touch("touchend");
    await page.waitForTimeout(500);
    await expect(active).toHaveText("Shyan Paul S");
    await expect(active).toHaveText("Vishal P", { timeout: 1500 });
  });

  test("arrow buttons move to the next and previous person", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const home = new HomePage(page);
    await home.goto("#about");
    const slider = page.getByRole("region", { name: "Our developers" });
    const active = slider.locator("article[aria-hidden='false'] h4");

    await slider.getByRole("button", { name: "Next person" }).click();
    await expect(active).toHaveText("Vishal P");
    await slider.getByRole("button", { name: "Previous person" }).click();
    await slider.getByRole("button", { name: "Previous person" }).click();
    await expect(active).toHaveText("Nithin Sachin R");
  });

  test("slider stays still when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const home = new HomePage(page);
    await home.goto("#about");
    const active = page.getByRole("region", { name: "Our developers" }).locator("article[aria-hidden='false'] h4");
    await expect(active).toHaveText("Shyan Paul S");
    await page.waitForTimeout(4000);
    await expect(active).toHaveText("Shyan Paul S");
  });
});
