import { Page, Locator, expect } from '@playwright/test';

export class AutomationPage {
    readonly page: Page;
    readonly automationMenuLink: Locator;
    readonly createDropdown: Locator;
    readonly taskBotOption: Locator;
    readonly formOption: Locator;

    constructor(page: Page) {
        this.page = page;
        // Avoid footer "Automation Anywhere" text by targeting link with specific text or location
        // Using strict matching for "Automation" to avoid "Automation Anywhere"
        this.automationMenuLink = page.locator('a').filter({ hasText: /^Automation$/ }).first();
        this.createDropdown = page.locator('button:has-text("Create")'); // Adjust selector
        this.taskBotOption = page.locator('li:has-text("Task Bot"), div:has-text("Task Bot")'); // Adjust selector
        this.formOption = page.locator('li:has-text("Form"), div:has-text("Form")'); // Adjust selector
    }

    async navigateToAutomation() {
        // Use JS Click to bypass OneTrust overlay
        await this.automationMenuLink.waitFor({ state: 'visible' });
        await this.automationMenuLink.evaluate((b) => (b as HTMLElement).click());
        await this.page.waitForLoadState('domcontentloaded');
    }

    async createTaskBot() {
        // Use JS Click
        await this.createDropdown.waitFor({ state: 'visible' });
        await this.createDropdown.evaluate((b) => (b as HTMLElement).click());

        await this.taskBotOption.waitFor({ state: 'visible' });
        await this.taskBotOption.evaluate((b) => (b as HTMLElement).click());
    }

    async createForm() {
        // Use JS Click
        await this.createDropdown.waitFor({ state: 'visible' });
        await this.createDropdown.evaluate((b) => (b as HTMLElement).click());

        await this.formOption.waitFor({ state: 'visible' });
        await this.formOption.evaluate((b) => (b as HTMLElement).click());
    }
}
