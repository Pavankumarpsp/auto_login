import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: {
    timeout: 10000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    // IMPORTANT: Update this to your actual Community Edition Control Room URL
    // Example: 'https://community.cloud.automationanywhere.digital/'
    baseURL: process.env.BASE_URL || 'https://community.cloud.automationanywhere.digital/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // video: 'retain-on-failure', // Commented out to avoid ffmpeg dependency error
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'msedge', // Use Microsoft Edge (guaranteed on Windows)
      },
    },
  ],
});
