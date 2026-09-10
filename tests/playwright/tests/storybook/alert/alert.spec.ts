import { expect, FrameLocator, Locator, test } from '@playwright/test';

test.describe('Alert', () => {
  let storyBookIframe: FrameLocator;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    storyBookIframe = page.frameLocator(
      'iframe[title="storybook-preview-iframe"]'
    );
  });

  function getAlertByName(name: string): Locator {
    return storyBookIframe
      .locator('#storybook-root > div > div > div')
      .filter({ hasText: name })
      .first();
  }

  function getAlertByNameInversePage(name: string): Locator {
    return storyBookIframe
      .locator('#storybook-root > div > div > div > div > div')
      .filter({ hasText: name })
      .first();
  }

  async function verifyCloseButtons(storyBookIframe: FrameLocator) {
    for (let i = 0; i < 4; i++) {
      await expect(
        storyBookIframe
          .getByRole('button', { name: 'Close this message' })
          .nth(i)
      ).toBeVisible();
    }
  }

  test('Default', async ({ page }) => {
    await page.getByRole('button', { name: 'Alert' }).click();

    await expect(page).toHaveTitle('Alert - Default ⋅ Storybook');

    // Default alert
    const defaultAlert = getAlertByName('Default');

    await expect(defaultAlert).toBeVisible();
    await expect(defaultAlert).toHaveCSS(
      'background-color',
      'rgb(10, 86, 164)'
    );
    await expect(defaultAlert).toHaveCSS('border-style', 'none');
    await expect(defaultAlert).toHaveCSS('border-radius', '8px');
    await expect(defaultAlert).toHaveCSS('color', 'rgb(255, 255, 255)');

    // Success alert
    const successAlert = getAlertByName('Success hyperlink');

    await expect(successAlert).toBeVisible();
    await expect(successAlert).toHaveCSS(
      'background-color',
      'rgb(0, 132, 75)'
    );
    await expect(successAlert).toHaveCSS('border-style', 'none');
    await expect(successAlert).toHaveCSS('border-radius', '8px');
    await expect(successAlert).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(storyBookIframe.getByText('Badgery').first()).toBeVisible();
    await expect(
      storyBookIframe.getByText('More Badgery').first()
    ).toBeVisible();

    // Warning alert
    const warningAlert = getAlertByName('Warning hyperlink');

    await expect(warningAlert).toBeVisible();
    await expect(
      storyBookIframe.getByRole('button', { name: 'Button it up' }).first()
    ).toBeVisible();
    await expect(warningAlert).toHaveCSS(
      'background-color',
      'rgb(255, 194, 0)'
    );
    await expect(warningAlert).toHaveCSS('border-style', 'none');
    await expect(warningAlert).toHaveCSS('border-radius', '8px');
    await expect(warningAlert).toHaveCSS('color', 'rgb(11, 31, 58)');

    // Danger alert
    const dangerAlert = getAlertByName('Danger hyperlink');

    await expect(dangerAlert).toBeVisible();
    await expect(dangerAlert).toHaveCSS(
      'background-color',
      'rgb(198, 0, 52)'
    );
    await expect(dangerAlert).toHaveCSS('border-style', 'none');
    await expect(dangerAlert).toHaveCSS('border-radius', '8px');
    await expect(dangerAlert).toHaveCSS('color', 'rgb(255, 255, 255)');

    // Default dismissible alert
    const defaultDismissibleAlert = getAlertByName('Default dismissible with');

    await expect(defaultDismissibleAlert).toBeVisible();

    // Success dismissible alert
    const successDismissibleAlert = getAlertByName('Success dismissible with');

    await expect(successDismissibleAlert).toBeVisible();
    await expect(storyBookIframe.getByText('Badgery').nth(2)).toBeVisible();
    await expect(
      storyBookIframe.getByText('More Badgery').nth(1)
    ).toBeVisible();

    // Warning dismissible alert
    const warningDismissibleAlert = getAlertByName('Warning dismissible with');

    await expect(warningDismissibleAlert).toBeVisible();
    await expect(
      storyBookIframe.getByRole('button', { name: 'Button it up' }).nth(1)
    ).toBeVisible();

    // Danger dismissible alert
    const dangerDismissibleAlert = getAlertByName('Danger dismissible with');

    await expect(dangerDismissibleAlert).toBeVisible();

    // Verify close buttons
    await verifyCloseButtons(storyBookIframe);
  });

  test('Inverse', async ({ page }) => {
    const inverseWrapper = storyBookIframe.locator(
      '#storybook-root > div > div'
    );

    await page.getByRole('button', { name: 'Alert' }).click();
    await page.locator('#alert--inverse').click();

    await expect(page).toHaveTitle('Alert - Inverse ⋅ Storybook');
    await expect(inverseWrapper).toHaveCSS(
      'background-color',
      'rgb(16, 24, 32)'
    );
    await expect(inverseWrapper).toHaveCSS('color', 'rgb(255, 255, 255)');

    // Default alert
    const defaultAlert = getAlertByNameInversePage('Default');

    await expect(defaultAlert).toBeVisible();
    await expect(defaultAlert).toHaveCSS('background-color', 'rgb(48, 130, 202)');
    await expect(defaultAlert).toHaveCSS('border-style', 'none');
    await expect(defaultAlert).toHaveCSS('border-radius', '8px');
    await expect(defaultAlert).toHaveCSS('color', 'rgb(2, 21, 45)');

    // Success alert
    const successAlert = getAlertByNameInversePage('Success');

    await expect(successAlert).toBeVisible();
    await expect(successAlert).toHaveCSS('background-color', 'rgb(23, 169, 98)');
    await expect(successAlert).toHaveCSS('border-style', 'none');
    await expect(successAlert).toHaveCSS('border-radius', '8px');
    await expect(successAlert).toHaveCSS('color', 'rgb(0, 35, 17)');

    // Warning alert
    const warningAlert = getAlertByNameInversePage('Warning');

    await expect(warningAlert).toBeVisible();
    await expect(warningAlert).toHaveCSS(
      'background-color',
      'rgb(255, 194, 0)'
    );
    await expect(warningAlert).toHaveCSS('border-style', 'none');
    await expect(warningAlert).toHaveCSS('border-radius', '8px');
    await expect(warningAlert).toHaveCSS('color', 'rgb(11, 31, 58)');

    // Danger alert
    const dangerAlert = getAlertByNameInversePage('Danger');

    await expect(dangerAlert).toBeVisible();
    await expect(dangerAlert).toHaveCSS('background-color', 'rgb(235, 58, 89)');
    await expect(dangerAlert).toHaveCSS('border-style', 'none');
    await expect(dangerAlert).toHaveCSS('border-radius', '8px');
    await expect(dangerAlert).toHaveCSS('color', 'rgb(51, 0, 8)');

    // Default dismissible alert
    const defaultDismissibleAlert = getAlertByNameInversePage(
      'Default dismissible with'
    );

    await expect(defaultDismissibleAlert).toBeVisible();

    // Success dismissible alert
    const successDismissibleAlert = getAlertByNameInversePage(
      'Success dismissible with'
    );

    await expect(successDismissibleAlert).toBeVisible();

    // Warning dismissible alert
    const warningDismissibleAlert = getAlertByNameInversePage(
      'Warning dismissible with'
    );

    await expect(warningDismissibleAlert).toBeVisible();

    // Danger dismissible alert
    const dangerDismissibleAlert = getAlertByNameInversePage(
      'Danger dismissible with'
    );

    await expect(dangerDismissibleAlert).toBeVisible();

    // Verify close buttons
    await verifyCloseButtons(storyBookIframe);
  });
});
