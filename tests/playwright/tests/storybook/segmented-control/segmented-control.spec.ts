import { expect, test } from '@playwright/test';

test('keeps a visible tooltip in place throughout a selection slide', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(
    '/iframe.html?id=segmentedcontrol--icon-only-with-tooltip&viewMode=story'
  );
  const group = page.getByRole('radiogroup', { name: 'Layout' });

  await expect(group).toBeVisible();
  // An offset control exposes changes to the tooltip's positioning context.
  await page.addStyleTag({
    content: '[role="radiogroup"] { margin: 200px 0 0 300px; }',
  });
  const grid = group.getByRole('radio', { name: 'Grid view', exact: true });
  const tooltip = group.getByRole('tooltip');

  await grid.hover();
  await expect(tooltip).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect
    .poll(async () => {
      const triggerBox = await grid.boundingBox();
      const tooltipBox = await tooltip.boundingBox();

      return Math.abs(
        tooltipBox.x +
          tooltipBox.width / 2 -
          (triggerBox.x + triggerBox.width / 2)
      );
    })
    .toBeLessThan(1);
  const before = await tooltip.boundingBox();

  await grid.click();
  const indicator = group.locator(':scope > span[aria-hidden="true"]');

  // Pause the real animation halfway through so the coordinate check is stable.
  await indicator.evaluate(element => {
    const animation = element.getAnimations()[0];

    animation.pause();
    animation.currentTime = 200;
  });
  await expect(grid).toHaveAttribute('aria-checked', 'true');
  const during = await tooltip.boundingBox();

  expect(Math.abs(during.x - before.x)).toBeLessThan(1);
  expect(Math.abs(during.y - before.y)).toBeLessThan(1);
  expect(Math.abs(during.width - before.width)).toBeLessThan(1);

  await indicator.evaluate(element => element.getAnimations()[0].finish());
  await expect(indicator).toHaveCount(0);
  const after = await tooltip.boundingBox();

  expect(Math.abs(after.x - before.x)).toBeLessThan(1);
  expect(Math.abs(after.y - before.y)).toBeLessThan(1);
  expect(Math.abs(after.width - before.width)).toBeLessThan(1);
});
