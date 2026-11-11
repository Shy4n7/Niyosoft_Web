import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly mainNav: Locator;
  readonly serviceTabs: Locator;
  readonly servicePanel: Locator;

  constructor(private readonly page: Page) {
    this.mainNav = page.getByRole("navigation", { name: "Main" });
    this.serviceTabs = page.getByRole("tab");
    this.servicePanel = page.getByRole("tabpanel");
  }

  async goto(hash = ""): Promise<void> {
    await this.page.goto(`/${hash}`);
  }

  navLink(label: string): Locator {
    return this.mainNav.getByRole("link", { name: label, exact: true });
  }

  section(id: string): Locator {
    return this.page.locator(`section#${id}`);
  }

  async expectSectionAtTop(id: string): Promise<void> {
    await expect
      .poll(async () => this.section(id).evaluate((element) => Math.round(element.getBoundingClientRect().top)), { timeout: 5000 })
      .toBeLessThanOrEqual(100);
  }
}
