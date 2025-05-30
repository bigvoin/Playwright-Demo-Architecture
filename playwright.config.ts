import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import * as dotenv from 'dotenv';

/**
 * Read environment variables from file.
 */
dotenv.config();

const config: PlaywrightTestConfig = {
    testDir: './tests',
    timeout: 120 * 1000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 8000,
    },
    globalSetup: './src/global-setup.ts',
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Retry on CI only */
    retries: 1,
    /* Opt out of parallel tests on CI. */
    workers: 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [['html', { open: 'never' }]],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 8000,
        /* Record video on test fail */
        video: 'retain-on-failure',
        testIdAttribute: 'data-e2e',
        viewport: { width: 1920, height: 1080 },
        trace: 'retain-on-failure'
    },
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'setup',
            testDir: './src/setup/'
        },
        {
            name: 'chromium',
            testDir: './tests',
            use: {
                ...devices['Desktop Chrome'],
                locale: "en-GB",
                viewport: { width: 1920, height: 1080 },
            },
            dependencies: ['setup'],
        }
    ]
};

export default config;
