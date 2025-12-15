import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AutomationPage } from '../pages/AutomationPage';
import { FormPage } from '../pages/FormPage';
import * as path from 'path';

test.describe('Use Case 2: Form with Upload Flow', () => {
    let loginPage: LoginPage;
    let automationPage: AutomationPage;
    let formPage: FormPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        automationPage = new AutomationPage(page);
        formPage = new FormPage(page);

        await loginPage.navigate();
        await loginPage.login(process.env.PROD_USERNAME!, process.env.PROD_PASSWORD!);
    });

    test('Create a Form with File Upload', async ({ page }) => {
        await automationPage.navigateToAutomation();
        await automationPage.createForm();

        const formName = `Form_${Date.now()}`;
        await formPage.fillDetails(formName);

        await formPage.dragAndDropTextbox();
        await formPage.dragAndDropFileSelect();

        await formPage.verifyUIInteractions();

        await formPage.enterText('Test Input');

        const filePath = path.join(__dirname, '../test-data/sample.txt');
        await formPage.uploadFile(filePath);

        await formPage.save();
    });
});
