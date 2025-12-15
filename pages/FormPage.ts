import { Page, Locator, expect } from '@playwright/test';

export class FormPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly createButton: Locator;
    readonly textboxElement: Locator;
    readonly fileSelectElement: Locator;
    readonly canvas: Locator;
    readonly saveButton: Locator;

    // Form elements on canvas (after drop)
    readonly droppedTextbox: Locator;
    readonly droppedFileSelect: Locator;

    // Preview/Run mode elements
    readonly previewTextboxInput: Locator;
    readonly previewFileUploadInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('input[placeholder="Name"]');
        this.createButton = page.locator('button:has-text("Create")');

        // Palette elements
        this.textboxElement = page.locator('div[title="Text Box"], div:has-text("Text Box")').first();
        this.fileSelectElement = page.locator('div[title="File Upload"], div:has-text("File Upload")').first(); // "Select File" might be "File Upload"

        this.canvas = page.locator('.form-canvas, .canvas-container'); // Placeholder class

        this.saveButton = page.locator('button:has-text("Save")');

        // Selectors for elements once they are on the canvas (might need specific IDs or classes)
        this.droppedTextbox = page.locator('.form-control-textbox').first();
        this.droppedFileSelect = page.locator('.form-control-fileupload').first();

        // Selectors for interaction (might be in a preview mode or directly editable)
        this.previewTextboxInput = page.locator('input[type="text"]').first();
        this.previewFileUploadInput = page.locator('input[type="file"]');
    }

    async fillDetails(name: string) {
        await this.nameInput.fill(name);
        await this.createButton.click();
    }

    async dragAndDropTextbox() {
        await this.textboxElement.dragTo(this.canvas);
    }

    async dragAndDropFileSelect() {
        await this.fileSelectElement.dragTo(this.canvas);
    }

    async verifyUIInteractions() {
        // Click elements to see properties panel
        await this.droppedTextbox.click();
        await expect(this.page.locator('text=Properties')).toBeVisible();

        await this.droppedFileSelect.click();
        await expect(this.page.locator('text=Properties')).toBeVisible();
    }

    async enterText(text: string) {
        // Assuming we can interact with the form directly or need to switch to preview
        // For this exercise, assuming direct interaction or a "Preview" step is implied/handled
        await this.previewTextboxInput.fill(text);
    }

    async uploadFile(filePath: string) {
        await this.previewFileUploadInput.setInputFiles(filePath);
    }

    async save() {
        await this.saveButton.click();
        await expect(this.page.locator('text=Saved successfully')).toBeVisible();
    }
}
