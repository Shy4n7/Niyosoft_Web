import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", title: /^Niyosoft Technologies \| Software, Apps & IT Services in Pollachi$/ },
  { path: "/projects/", title: /^Projects \| Niyosoft Technologies$/ },
  { path: "/privacy/", title: /^Privacy Policy \| Niyosoft Technologies$/ },
  { path: "/terms/", title: /^Terms of Service \| Niyosoft Technologies$/ },
];

test.describe("SEO", () => {
  for (const { path, title } of pages) {
    test(`${path} has title, canonical, description, OG image and one h1`, async ({ page }) => {
      await page.goto(path);

      await expect(page).toHaveTitle(title);
      await expect(page.locator("link[rel=canonical]")).toHaveAttribute("href", `https://niyosoft.in${path}`);
      await expect(page.locator("meta[name=description]")).toHaveAttribute("content", /.{50,}/);
      await expect(page.locator("meta[property='og:image']").first()).toHaveAttribute("content", /opengraph-image\.png/);
      await expect(page.locator("h1")).toHaveCount(1);
    });
  }

  test("JSON-LD describes the local business", async ({ page }) => {
    await page.goto("/");
    const raw = await page.locator("script[type='application/ld+json']").textContent();
    const data = JSON.parse(raw ?? "{}");

    expect(data["@type"]).toBe("LocalBusiness");
    expect(data.name).toBe("Niyosoft Technologies");
    expect(data.address.addressLocality).toBe("Pollachi");
  });

  test("sitemap lists every page and robots points to it", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const { path } of pages) {
      expect(sitemap).toContain(`<loc>https://niyosoft.in${path}</loc>`);
    }

    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Sitemap: https://niyosoft.in/sitemap.xml");
  });

  test("all images load", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const images = page.locator("img");

    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
  });
});
