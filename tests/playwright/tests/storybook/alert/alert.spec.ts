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
      'rgb(232, 245, 252)'
    );
    await expect(defaultAlert).toHaveCSS(
      'border',
      '1px solid rgb(0, 116, 183)'
    );
    await expect(defaultAlert).toHaveCSS('border-radius', '8px');
    await expect(defaultAlert).toHaveCSS('color', 'rgb(0, 116, 183)');

    // Success alert
    const successAlert = getAlertByName('Success hyperlink');

    await expect(successAlert).toBeVisible();
    await expect(successAlert).toHaveCSS(
      'background-color',
      'rgb(227, 250, 234)'
    );
    await expect(successAlert).toHaveCSS(
      'border',
      '1px solid rgb(23, 128, 55)'
    );
    await expect(successAlert).toHaveCSS('border-radius', '8px');
    await expect(successAlert).toHaveCSS('color', 'rgb(23, 128, 55)');
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
      'rgb(252, 238, 229)'
    );
    await expect(warningAlert).toHaveCSS(
      'border',
      '1px solid rgb(173, 81, 21)'
    );
    await expect(warningAlert).toHaveCSS('border-radius', '8px');
    await expect(warningAlert).toHaveCSS('color', 'rgb(173, 81, 21)');

    // Danger alert
    const dangerAlert = getAlertByName('Danger hyperlink');

    await expect(dangerAlert).toBeVisible();
    await expect(dangerAlert).toHaveCSS(
      'background-color',
      'rgb(253, 239, 238)'
    );
    await expect(dangerAlert).toHaveCSS('border', '1px solid rgb(211, 40, 33)');
    await expect(dangerAlert).toHaveCSS('border-radius', '8px');
    await expect(dangerAlert).toHaveCSS('color', 'rgb(211, 40, 33)');

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
      'rgb(41, 47, 124)'
    );
    await expect(inverseWrapper).toHaveCSS('color', 'rgb(255, 255, 255)');

    // Default alert
    const defaultAlert = getAlertByNameInversePage('Default');

    await expect(defaultAlert).toBeVisible();
    await expect(defaultAlert).toHaveCSS('background-color', 'rgb(0, 74, 117)');
    await expect(defaultAlert).toHaveCSS(
      'border',
      '1px solid rgb(47, 179, 255)'
    );
    await expect(defaultAlert).toHaveCSS('border-radius', '8px');
    await expect(defaultAlert).toHaveCSS('color', 'rgb(255, 255, 255)');

    // Success alert
    const successAlert = getAlertByNameInversePage('Success');

    await expect(successAlert).toBeVisible();
    await expect(successAlert).toHaveCSS('background-color', 'rgb(15, 83, 35)');
    await expect(successAlert).toHaveCSS(
      'border',
      '1px solid rgb(62, 221, 110)'
    );
    await expect(successAlert).toHaveCSS('border-radius', '8px');
    await expect(successAlert).toHaveCSS('color', 'rgb(255, 255, 255)');

    // Warning alert
    const warningAlert = getAlertByNameInversePage('Warning');

    await expect(warningAlert).toBeVisible();
    await expect(warningAlert).toHaveCSS(
      'background-color',
      'rgb(110, 52, 14)'
    );
    await expect(warningAlert).toHaveCSS(
      'border',
      '1px solid rgb(233, 139, 76)'
    );
    await expect(warningAlert).toHaveCSS('border-radius', '8px');
    await expect(warningAlert).toHaveCSS('color', 'rgb(255, 255, 255)');

    // Danger alert
    const dangerAlert = getAlertByNameInversePage('Danger');

    await expect(dangerAlert).toBeVisible();
    await expect(dangerAlert).toHaveCSS('background-color', 'rgb(127, 23, 20)');
    await expect(dangerAlert).toHaveCSS(
      'border',
      '1px solid rgb(250, 174, 176)'
    );
    await expect(dangerAlert).toHaveCSS('border-radius', '8px');
    await expect(dangerAlert).toHaveCSS('color', 'rgb(255, 255, 255)');

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
