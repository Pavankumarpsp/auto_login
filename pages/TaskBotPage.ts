import { Page, Locator, expect } from '@playwright/test';

export class TaskBotPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly descriptionInput: Locator;
    readonly createButton: Locator;
    readonly actionSearchInput: Locator;
    readonly messageBoxAction: Locator;
    readonly messageBoxTitleInput: Locator;
    readonly messageBoxMessageInput: Locator;
    readonly saveButton: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Creation modal selectors
        this.nameInput = page.locator('input[data-aid="name-input"], input[placeholder="Name"]');
        this.descriptionInput = page.locator('textarea[data-aid="description-input"], textarea[placeholder="Description"]');
        this.createButton = page.locator('button[data-aid="create-btn"], button:has-text("Create")');

        // Editor selectors
        this.actionSearchInput = page.locator('input[data-aid="action-search"], input[placeholder="Search actions"]');
        this.messageBoxAction = page.locator('div[data-aid="action-Message Box"], div:has-text("Message Box")').first();

        // Right panel selectors for Message Box
        this.messageBoxTitleInput = page.locator('input[name="title"], input[label="Window Title"]');
        this.messageBoxMessageInput = page.locator('input[name="message"], textarea[label="Message"]');

        this.saveButton = page.locator('button[data-aid="save-btn"], button:has-text("Save")');
        this.closeButton = page.locator('button[data-aid="close-btn"], button:has-text("Close")');
    }

    async fillDetails(name: string, description: string = '') {
        await this.nameInput.fill(name);
        if (description) {
            await this.descriptionInput.fill(description);
        }
        await this.createButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async searchAction(actionName: string) {
        await this.actionSearchInput.fill(actionName);
        await this.page.waitForTimeout(500); // Debounce
    }

    async addMessageBox() {
        await this.messageBoxAction.dblclick();
    }

    async verifyRightPanelElements() {
        await expect(this.messageBoxTitleInput).toBeVisible();
        await expect(this.messageBoxMessageInput).toBeVisible();

        // Interact with elements
        await this.messageBoxTitleInput.fill('Test Title');
        await this.messageBoxMessageInput.fill('Test Message');
    }

    async save() {
        await this.saveButton.click();
        // Verify save success toast or indicator
        await expect(this.page.locator('div:has-text("Saved successfully")').first()).toBeVisible();
    }
}
