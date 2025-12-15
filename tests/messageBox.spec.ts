import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AutomationPage } from '../pages/AutomationPage';
import { TaskBotPage } from '../pages/TaskBotPage';

test.describe('Use Case 1: Message Box Task', () => {
    let loginPage: LoginPage;
    let automationPage: AutomationPage;
    let taskBotPage: TaskBotPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        automationPage = new AutomationPage(page);
        taskBotPage = new TaskBotPage(page);

        await loginPage.navigate();
        await loginPage.login(process.env.PROD_USERNAME!, process.env.PROD_PASSWORD!);
    });

    test('Create a Task Bot with Message Box', async ({ page }) => {
        await automationPage.navigateToAutomation();
        await automationPage.createTaskBot();

        const taskName = `TaskBot_${Date.now()}`;
        await taskBotPage.fillDetails(taskName, 'Automated Task Bot Description');

        await taskBotPage.searchAction('Message Box');
        await taskBotPage.addMessageBox();

        await taskBotPage.verifyRightPanelElements();
        await taskBotPage.save();
    });
});
