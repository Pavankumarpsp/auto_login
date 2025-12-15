import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly nextButton: Locator;
    readonly loginButton: Locator;
    readonly acceptCookiesButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Updated selectors based on site inspection
        this.usernameInput = page.locator('input[placeholder="*Email"]');
        // Specific SLDS selector based on user feedback to be precise
        this.nextButton = page.locator('button.slds-button_brand:has-text("Next")');

        // Assuming standard password input for the second step
        this.passwordInput = page.locator('input[type="password"]');
        // Button likely says "Log in" or is the same "Next" button on the second screen
        this.loginButton = page.locator('button:has-text("Log in"), button:has-text("Sign in")');

        // Cookie banner
        this.acceptCookiesButton = page.locator('button:has-text("Accept All Cookies"), #onetrust-accept-btn-handler');
    }

    async navigate() {
        await this.page.goto('/');
    }

    async handleCookies() {
        if (await this.acceptCookiesButton.isVisible()) {
            await this.acceptCookiesButton.click();
            // Wait for the specific OneTrust overlay to disappear
            try {
                await this.page.locator('.onetrust-pc-dark-filter').waitFor({ state: 'hidden', timeout: 5000 });
                await expect(this.acceptCookiesButton).not.toBeVisible({ timeout: 5000 });
            } catch (e) {
                console.log('Cookie overlay might still be visual, proceeding with force actions.');
            }
        }
    }

    async login(username: string, password: string) {
        await this.handleCookies();

        // Use fill for robustness, pressSequentially was truncating
        await this.usernameInput.click();
        await this.usernameInput.fill(username);

        // Dispatch events to ensure framework detects changes
        await this.usernameInput.dispatchEvent('input');
        await this.usernameInput.dispatchEvent('change');

        // Trigger blur to ensure validation fires
        await this.usernameInput.blur();

        // Verify input is filled
        await expect(this.usernameInput).toHaveValue(username);

        // Wait for Next button to be enabled explicitly
        await this.nextButton.waitFor({ state: 'visible' });
        await expect(this.nextButton).toBeEnabled({ timeout: 10000 });

        // Small pause -> Ensure app is calm (hydration complete)
        await this.page.waitForTimeout(2000);

        // JS Click to bypass Aura/OneTrust interception issues
        // This executes the click directly in the browser context
        await this.nextButton.evaluate((b) => (b as HTMLElement).click());

        // Wait for password field to appear after clicking Next
        try {
            // Updated password selector based on user image ("Password" placeholder)
            const passwordSelector = this.page.locator('input[placeholder="Password"], input[type="password"]');
            await passwordSelector.waitFor({ state: 'visible', timeout: 20000 });
            await passwordSelector.fill(password);

            // Similar logic for Login button
            // Use JS Click here too, as OneTrust overlay might still be lingering
            await this.loginButton.evaluate((b) => (b as HTMLElement).click());
        } catch (e) {
            console.error("Failed to find password field or login button. The flow might have changed.");
            throw e;
        }

        // Wait for navigation
        await this.page.waitForLoadState('networkidle');
    }
}
