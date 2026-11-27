import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Keep interaction/layout checks independent of external font delivery.
  // WebKit can defer the story's styles while this imported CSS is pending.
  await page.route('https://fonts.googleapis.com/**', route =>
    route.fulfill({ contentType: 'text/css', body: '' })
  );
});

test('select: ArrowUp opens on the first enabled item', async ({ page }) => {
  await page.goto('/iframe.html?id=select--default&viewMode=story');
  const control = page.getByRole('combobox');

  await control.focus();
  await expect(control).toHaveAttribute('aria-expanded', 'false');
  await control.press('ArrowUp');
  await expect(control).toHaveAttribute('aria-expanded', 'true');
  await expect(
    page.getByRole('option', { name: 'Red', exact: true })
  ).toHaveAttribute('data-highlighted', 'true');
});

test('combobox: Backspace removes chips while the menu stays open', async ({
  page,
}) => {
  await page.goto('/iframe.html?id=combobox--multi&viewMode=story');
  const control = page.getByRole('combobox');
  const red = page.locator('button[aria-label="clear item Red"]');
  const blue = page.locator('button[aria-label="clear item Blue"]');

  await control.click();
  await page.getByRole('option', { name: 'Red', exact: true }).click();
  await expect(red).toHaveCount(1);
  await control.press('ArrowDown');
  await page.getByRole('option', { name: 'Blue', exact: true }).click();
  await expect(blue).toHaveCount(1);
  await control.press('ArrowDown');
  await expect(control).toHaveValue('');
  await expect(control).toHaveAttribute('aria-expanded', 'true');
  await control.press('Backspace');
  await expect(blue).toHaveCount(0);
  await expect(red).toHaveCount(1);
  await expect(control).toBeFocused();
  await expect(control).toHaveAttribute('aria-expanded', 'true');
  await control.press('Backspace');
  await expect(red).toHaveCount(0);
  await expect(control).toBeFocused();
});

for (const isMulti of [false, true]) {
  test(`combobox: first Escape clears the open query (isMulti=${isMulti})`, async ({
    page,
  }) => {
    await page.goto(
      `/iframe.html?id=combobox--${isMulti ? 'multi' : 'default'}&viewMode=story`
    );
    const control = page.getByRole('combobox');

    await control.click();
    await page.getByRole('option', { name: 'Red', exact: true }).click();
    if (isMulti) {
      await expect(
        page.locator('button[aria-label="clear item Red"]')
      ).toHaveCount(1);
      await control.fill('G');
    } else {
      await expect(control).toHaveValue('Red');
      await expect(control).toHaveAttribute('aria-expanded', 'false');
      await control.click();
    }
    await expect(control).toHaveAttribute('aria-expanded', 'true');
    await control.press('Escape');
    await expect(control).toHaveAttribute('aria-expanded', 'false');
    await expect(control).toHaveValue('');
    await expect(control).toBeFocused();
    if (isMulti) {
      await expect(
        page.locator('button[aria-label="clear item Red"]')
      ).toHaveCount(1);
    }
  });
}

test('combobox: unmatched Enter retains form submission', async ({ page }) => {
  await page.goto(
    '/iframe.html?id=combobox--default&viewMode=story&args=disableCreateItem:true'
  );
  await page.evaluate(() => {
    const root = document.querySelector('#storybook-root');
    const form = document.createElement('form');
    const submit = document.createElement('button');

    if (!root?.parentNode) {
      throw new Error('Story root is missing');
    }
    root.parentNode.insertBefore(form, root);
    form.appendChild(root);
    submit.type = 'submit';
    submit.textContent = 'Submit';
    form.appendChild(submit);
    document.body.dataset.qaSubmits = '0';
    form.addEventListener('submit', event => {
      event.preventDefault();
      document.body.dataset.qaSubmits = String(
        Number(document.body.dataset.qaSubmits) + 1
      );
    });
  });
  const control = page.getByRole('combobox');

  await control.fill('zzzz-no-match');
  await expect(control).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('option')).toHaveCount(0);
  await control.press('Enter');
  await expect(page.locator('body')).toHaveAttribute('data-qa-submits', '1');
});

for (const component of ['select', 'combobox']) {
  test(`${component}: controlled null can be selected again with native focus`, async ({
    page,
  }) => {
    await page.goto(
      `/iframe.html?id=${component}--controlled-selected-item&viewMode=story`
    );
    const control = page.getByRole('combobox');

    await expect(page.getByText('Selected value: red')).toBeVisible();
    await page.getByRole('button', { name: 'Clear selection' }).click();
    await expect(page.getByText('Selected value: none')).toBeVisible();
    await control.click();
    await expect(control).toBeFocused();
    await page.getByRole('option', { name: 'Blue', exact: true }).click();
    await expect(page.getByText('Selected value: blue')).toBeVisible();
    await expect(control).toBeFocused();
    await control.click();
    await control.press('Escape');
    await expect(control).toHaveAttribute('aria-expanded', 'false');
    await expect(control).toBeFocused();
  });

  test(`${component}: keyboard skips disabled options and scrolls the highlighted option into view`, async ({
    page,
  }) => {
    await page.goto(
      `/iframe.html?id=${component}--default&viewMode=story&args=itemListMaxHeight:60`
    );
    const control = page.getByRole('combobox');

    await control.click();
    await control.press('Home');
    const first = page.getByRole('option', { name: 'Red', exact: true });

    await expect(control).toHaveAttribute(
      'aria-activedescendant',
      (await first.getAttribute('id')) as string
    );
    await control.press('ArrowDown');
    const green = page.getByRole('option', { name: 'Green', exact: true });

    await expect(control).toHaveAttribute(
      'aria-activedescendant',
      (await green.getAttribute('id')) as string
    );
    await expect(control).toBeFocused();
    await expect
      .poll(async () =>
        green.evaluate(element => {
          const item = element.getBoundingClientRect();
          const menu = element
            .closest('[role="listbox"]')!
            .getBoundingClientRect();

          return item.top >= menu.top - 1 && item.bottom <= menu.bottom + 1;
        })
      )
      .toBe(true);
    await control.press('Enter');
    await expect(control).toHaveAttribute('aria-expanded', 'false');
  });
}

for (const component of ['select', 'combobox']) {
  test(`${component}: multi selection and chip removal preserve input focus`, async ({
    page,
  }) => {
    await page.goto(`/iframe.html?id=${component}--multi&viewMode=story`);
    const control = page.getByRole('combobox');

    await control.click();
    await page.getByRole('option', { name: 'Blue', exact: true }).click();
    // MultiSelect exposes chip buttons to assistive technology on focus.
    const chip = page.locator('button[aria-label="clear item Blue"]');

    await expect(chip).toBeVisible();
    await chip.click();
    await expect(chip).toHaveCount(0);
    await control.click();
    await control.press('Escape');
    await expect(control).toHaveAttribute('aria-expanded', 'false');
    await expect(control).toBeFocused();
  });

  test(`${component}: highlighted option stays visible with CSS zoom: 2`, async ({
    page,
  }) => {
    await page.goto(
      `/iframe.html?id=${component}--default&viewMode=story&args=itemListMaxHeight:60`
    );
    await page.evaluate(() => {
      document.body.style.zoom = '2';
    });
    const control = page.getByRole('combobox');

    await control.click();
    await control.press('End');
    const last = page.getByRole('option').last();

    await expect
      .poll(() =>
        last.evaluate(element => {
          const item = element.getBoundingClientRect();
          const menu = element
            .closest('[role="listbox"]')!
            .getBoundingClientRect();

          return item.top >= menu.top - 1 && item.bottom <= menu.bottom + 1;
        })
      )
      .toBe(true);
    await expect(control).toBeFocused();
  });
}

for (const component of ['select', 'combobox']) {
  test(`${component}: opening scrolls a prehighlighted item without changing its index`, async ({
    page,
  }) => {
    await page.goto(
      `/iframe.html?id=${component}--initial-highlighted-item&viewMode=story`
    );
    const control = page.getByRole('combobox');

    await control.click();
    const highlighted = page.getByRole('option', {
      name: 'Item 20',
      exact: true,
    });

    await expect(control).toHaveAttribute(
      'aria-activedescendant',
      (await highlighted.getAttribute('id')) as string
    );
    await expect
      .poll(() =>
        highlighted.evaluate(element => {
          const item = element.getBoundingClientRect();
          const menu = element
            .closest('[role="listbox"]')!
            .getBoundingClientRect();

          return item.top >= menu.top - 1 && item.bottom <= menu.bottom + 1;
        })
      )
      .toBe(true);
  });
}

for (const component of ['select', 'combobox']) {
  for (const isMulti of [false, true]) {
    test(`${component} multi=${isMulti}: Alt+ArrowUp navigates without selecting`, async ({
      page,
    }) => {
      await page.goto(
        `/iframe.html?id=${component}--default&viewMode=story&args=isMulti:${isMulti}`
      );
      const control = page.getByRole('combobox');

      await control.click();
      await control.press('Home');
      await control.press('ArrowDown');
      await expect(
        page.getByRole('option', { name: 'Green', exact: true })
      ).toHaveAttribute('data-highlighted', 'true');
      await control.press('Alt+ArrowUp');
      await expect(control).toHaveAttribute('aria-expanded', 'true');
      await expect(
        page.getByRole('option', { name: 'Red', exact: true })
      ).toHaveAttribute('data-highlighted', 'true');
      await expect(page.getByRole('option', { selected: true })).toHaveCount(0);
      await expect(
        page.locator('button[aria-label^="clear item"]')
      ).toHaveCount(0);
    });
  }
}

for (const component of ['select', 'combobox']) {
  test(`${component}: native callbacks preserve single and chip selection`, async ({
    page,
  }) => {
    await page.goto(`/iframe.html?id=${component}--native-api&viewMode=story`);
    const single = page.getByRole('combobox', {
      name: 'Native single color',
      exact: true,
    });
    await single.click();
    await page.getByRole('option', { name: 'Green', exact: true }).click();
    await expect(page.getByTestId('native-single-selection')).toHaveText(
      'Green'
    );
    await expect(page.getByTestId('native-legacy-calls')).toHaveText('0');

    const multiple = page.getByRole('combobox', {
      name: /Native multiple colors/,
    });
    await multiple.click();
    await page.getByRole('option', { name: 'Red', exact: true }).click();
    await expect(page.getByTestId('native-multiple-selection')).toHaveText(
      'Red'
    );
    await expect(multiple).toContainText(component === 'select' ? 'Red' : '');
    await expect(page.locator('[role="status"]')).toHaveText(
      'Native chips: Red'
    );
    await page.locator('button[aria-label="clear item Red"]').click();
    await expect(page.getByTestId('native-multiple-selection')).toHaveText(
      'None'
    );
    await expect(page.locator('[role="status"]')).toHaveText(
      'Native chips: None'
    );
  });
}

for (const multi of [false, true]) {
  for (const activation of ['click', 'Enter']) {
    test(`combobox: native create multi=${multi} via ${activation}`, async ({
      page,
    }) => {
      await page.goto('/iframe.html?id=combobox--native-api&viewMode=story');
      const input = page.getByRole('combobox', {
        name: multi ? /Native multiple colors/ : 'Native single color',
      });
      await input.fill('Azure');
      if (activation === 'Enter') {
        await input.press('Enter');
      } else {
        await page
          .getByRole('option', { name: 'Create "Azure"', exact: true })
          .click();
      }
      await expect(
        page.getByTestId(
          multi ? 'native-multiple-selection' : 'native-single-selection'
        )
      ).toHaveText('Azure');
      if (multi) {
        await expect(
          page.getByRole('button', { name: 'clear item Azure' })
        ).toBeVisible();
        await expect(input).toHaveValue('');
      } else {
        await expect(input).toHaveValue('Azure');
        await expect(page.getByTestId('native-legacy-calls')).toHaveText('0');
      }
      await expect(input).toHaveAttribute('aria-expanded', 'false');
      await expect(input).toBeFocused();
    });
  }
}
