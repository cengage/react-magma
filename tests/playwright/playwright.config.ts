import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 60000,
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:6006/',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'] },
    },
  ],

  webServer: [
    {
      command: 'npm run storybook',
      url: 'http://localhost:6006/',
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
    },
    // Will be used for the React Magma documentation
    // {
    //   command: 'npm run docs',
    //   url: 'http://localhost:8000/',
    //   reuseExistingServer: !process.env.CI,
    // },
  ],
});
