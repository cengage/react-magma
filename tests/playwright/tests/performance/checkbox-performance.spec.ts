/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-done-callback */
/* eslint-disable no-console */

import { test, expect, Page } from '@playwright/test';

// Performance budgets (in milliseconds)
const PERFORMANCE_BUDGETS = {
  singleCheckbox: {
    initialRender: 100,
    interaction: 50,
  },
  scale500: {
    initialRender: 2000,
  },
  scale2000: {
    initialRender: 10000,
  },
};

/**
 * Measure the time it takes for checkboxes to render at scale
 * Measures component render time by checking when all checkboxes are in the DOM
 */
async function measureCheckboxRenderTime(
  page: Page,
  numberOfCheckboxes: number
): Promise<number> {
  const storyUrl = `http://localhost:6006/?path=/story/checkbox--lots&args=numberRows:${numberOfCheckboxes}`;

  await page.goto(storyUrl, { waitUntil: 'load' });

  // Get the iframe frame context
  const iframeHandle = await page.waitForSelector(
    'iframe[title="storybook-preview-iframe"]'
  );
  const frame = await iframeHandle.contentFrame();

  if (!frame) throw new Error('Could not access iframe');

  // Measure render time from within the iframe context
  const renderTime = await frame.evaluate(async count => {
    const startTime = performance.now();

    // Wait for all checkboxes to be in the DOM
    await new Promise<void>(resolve => {
      const checkForCheckboxes = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        if (checkboxes.length >= count) {
          resolve();
        } else {
          requestAnimationFrame(checkForCheckboxes);
        }
      };
      checkForCheckboxes();
    });

    const endTime = performance.now();
    return endTime - startTime;
  }, numberOfCheckboxes);

  return renderTime;
}

/**
 * Measure interaction latency for checkbox toggle
 */
async function measureCheckboxInteraction(
  page: Page,
  numberOfCheckboxes: number
): Promise<number> {
  const storyUrl = `http://localhost:6006/?path=/story/checkbox--lots&args=numberRows:${numberOfCheckboxes}`;
  await page.goto(storyUrl, { waitUntil: 'domcontentloaded' });

  const iframe = page.frameLocator('iframe[title="storybook-preview-iframe"]');

  await iframe.locator('input[type="checkbox"]').first().waitFor({
    state: 'visible',
    timeout: 60000,
  });

  const checkbox = iframe.locator('input[type="checkbox"]').first();

  const wasChecked = await checkbox.isChecked();
  const expectedState = !wasChecked;

  const startTime = await page.evaluate(() => performance.now());

  await checkbox.click({ force: true });

  await checkbox.evaluate((el: HTMLInputElement, expected: boolean) => {
    if (el.checked !== expected) {
      return new Promise(resolve => {
        const checkState = () => {
          if (el.checked === expected) {
            resolve(true);
          } else {
            requestAnimationFrame(checkState);
          }
        };
        checkState();
      });
    }
  }, expectedState);

  const endTime = await page.evaluate(() => performance.now());

  return endTime - startTime;
}

/**
 * Count actual rendered checkboxes
 */
async function countRenderedCheckboxes(page: Page): Promise<number> {
  const iframe = page.frameLocator('iframe[title="storybook-preview-iframe"]');
  return await iframe.locator('input[type="checkbox"]').count();
}

test.describe('Checkbox Performance Tests', () => {
  test.beforeEach(async ({ browserName }) => {
    test.skip(
      browserName !== 'chromium',
      'Performance tests only run on Chrome'
    );
    test.setTimeout(120000);
  });

  test('Single Checkbox - Initial Render Performance', async ({ page }) => {
    const renderTime = await measureCheckboxRenderTime(page, 1);

    console.log(`📊 Single checkbox render time: ${renderTime}ms`);

    expect(renderTime).toBeLessThan(
      PERFORMANCE_BUDGETS.singleCheckbox.initialRender
    );
  });

  test('Single Checkbox - Interaction Latency', async ({ page }) => {
    const interactionTime = await measureCheckboxInteraction(page, 1);

    console.log(`📊 Single checkbox interaction time: ${interactionTime}ms`);

    expect(interactionTime).toBeLessThan(
      PERFORMANCE_BUDGETS.singleCheckbox.interaction
    );
  });

  test('500 Checkboxes - Render Performance', async ({ page }) => {
    const renderTime = await measureCheckboxRenderTime(page, 500);

    console.log(`📊 500 checkboxes render time: ${renderTime}ms`);

    expect(renderTime).toBeLessThan(PERFORMANCE_BUDGETS.scale500.initialRender);

    const count = await countRenderedCheckboxes(page);
    expect(count).toBe(500);
  });

  test('2000 Checkboxes - Render Performance', async ({ page }) => {
    const renderTime = await measureCheckboxRenderTime(page, 2000);

    console.log(`📊 2000 checkboxes render time: ${renderTime}ms`);

    expect(renderTime).toBeLessThan(
      PERFORMANCE_BUDGETS.scale2000.initialRender
    );

    const count = await countRenderedCheckboxes(page);
    expect(count).toBe(2000);
  });

  test('2000 Checkboxes - Interaction Performance', async ({ page }) => {
    const interactionTime = await measureCheckboxInteraction(page, 2000);

    console.log(
      `📊 2000 checkboxes - first checkbox interaction time: ${interactionTime}ms`
    );

    expect(interactionTime).toBeLessThan(1000);
  });
});
