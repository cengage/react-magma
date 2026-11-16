import { expect, FrameLocator, test } from '@playwright/test';

test.describe('Announce', () => {
  let storyBookIframe: FrameLocator;

  test.beforeEach(({ page }) => {
    storyBookIframe = page.frameLocator(
      'iframe[title="storybook-preview-iframe"]'
    );
  });

  test('Default', async ({ page }) => {
    await page.goto('/?path=/story/announce--default');

    await expect(page).toHaveTitle('Announce - Default ⋅ Storybook');

    await expect(
      storyBookIframe.getByText('This content will be read by')
    ).toBeVisible();
    await expect(
      storyBookIframe.getByRole('button', { name: 'Update content' })
    ).toBeVisible();
    await expect(storyBookIframe.getByText('Initial content')).toBeVisible();
    await storyBookIframe
      .getByRole('button', { name: 'Update content' })
      .click();
    await expect(
      storyBookIframe.getByText('New content replacing the initial content')
    ).toBeVisible();
  });
});
