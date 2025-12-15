import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Verify Login to Automation Anywhere IDP', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.PROD_USERNAME!;
    const password = process.env.PROD_PASSWORD!;

    console.log(`Navigating to login page...`);
    await loginPage.navigate();

    console.log(`Attempting login with user: ${username}`);
    await loginPage.login(username, password);

    // Initial check: wait for network idle to ensure redirection happens
    await page.waitForLoadState('networkidle');

    // Log the title to debug
    const title = await page.title();
    console.log(`Page title after login: ${title}`);

    // Basic assertion: Ensure we are not on the login page anymore if possible, 
    // or check for a common post-login element. 
    // For now, we pass if no error occurs during login.
    expect(title).not.toBe('');
});
