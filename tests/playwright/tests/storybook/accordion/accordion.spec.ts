import { expect, FrameLocator, Locator, test } from '@playwright/test';

const section1Text = 'Content for section one lorem ipsum';
const section2Text = 'Content for section two lorem ipsum';
const section3Text = 'Content for section three lorem ipsum';

async function verifySectionVisibilityAndState(
  storyBookIframe: FrameLocator,
  section1Button: Locator,
  section2Button: Locator,
  section3Button: Locator,
  section4Button: Locator
) {
  await expect(section1Button).toBeVisible();
  await expect(storyBookIframe.getByText(section1Text)).toBeVisible();

  await expect(section2Button).toBeVisible();
  await expect(storyBookIframe.getByText(section2Text)).toBeHidden();

  await expect(section3Button).toBeVisible();
  await expect(storyBookIframe.getByText(section3Text)).toBeHidden();

  await expect(section4Button).toBeVisible();
  await expect(section4Button).toBeDisabled();
}

async function verifyDefaultBehaviour(
  storyBookIframe: FrameLocator,
  section1Button: Locator,
  section2Button: Locator,
  section3Button: Locator
) {
  await section1Button.click();
  await expect(storyBookIframe.getByText(section1Text)).toBeHidden();

  await section2Button.click();
  await expect(storyBookIframe.getByText(section2Text)).toBeVisible();

  await section2Button.click();
  await expect(storyBookIframe.getByText(section2Text)).toBeHidden();

  await section3Button.click();
  await expect(storyBookIframe.getByText(section3Text)).toBeVisible();

  await section3Button.click();
  await expect(storyBookIframe.getByText(section3Text)).toBeHidden();
}

test.describe('Accordion', () => {
  let storyBookIframe: FrameLocator;
  let section1Button: Locator;
  let section2Button: Locator;
  let section3Button: Locator;
  let section4Button: Locator;

  test.beforeEach(async ({ page }) => {
    // Uses the baseURL
    await page.goto('/');

    storyBookIframe = page.frameLocator(
      'iframe[title="storybook-preview-iframe"]'
    );

    section1Button = storyBookIframe.getByRole('button', {
      name: 'Section 1',
    });
    section2Button = storyBookIframe.getByRole('button', {
      name: 'Section 2',
    });
    section3Button = storyBookIframe.getByRole('button', {
      name: 'Section 3',
    });
    section4Button = storyBookIframe.getByRole('button', {
      name: 'Section 4',
    });
  });

  test('Default', async ({ page }) => {
    await page.getByRole('button', { name: 'Accordion' }).click();
    await page.locator('#accordion--default').click();

    await expect(page).toHaveTitle('Accordion - Default ⋅ Storybook');

    await verifySectionVisibilityAndState(
      storyBookIframe,
      section1Button,
      section2Button,
      section3Button,
      section4Button
    );

    await verifyDefaultBehaviour(
      storyBookIframe,
      section1Button,
      section2Button,
      section3Button
    );

    await section1Button.click();

    await expect(storyBookIframe.getByText(section1Text)).toBeVisible();
    await expect(section1Button).toHaveCSS('color', 'rgb(69, 69, 69)');
    await expect(storyBookIframe.getByText(section1Text)).toHaveCSS(
      'color',
      'rgb(69, 69, 69)'
    );
  });

  test('No Multi', async ({ page }) => {
    await page.getByRole('button', { name: 'Accordion' }).click();
    await page.getByRole('link', { name: 'No Multi', exact: true }).click();

    await expect(page).toHaveTitle('Accordion - No Multi ⋅ Storybook');

    await verifySectionVisibilityAndState(
      storyBookIframe,
      section1Button,
      section2Button,
      section3Button,
      section4Button
    );

    await section2Button.click();

    await expect(storyBookIframe.getByText(section1Text)).toBeHidden();
    await expect(storyBookIframe.getByText(section2Text)).toBeVisible();
    await expect(storyBookIframe.getByText(section3Text)).toBeHidden();

    await section3Button.click();

    await expect(storyBookIframe.getByText(section1Text)).toBeHidden();
    await expect(storyBookIframe.getByText(section2Text)).toBeHidden();
    await expect(storyBookIframe.getByText(section3Text)).toBeVisible();
  });

  test('Controlled', async ({ page }) => {
    await page.getByRole('button', { name: 'Accordion' }).click();
    await page.getByRole('link', { name: 'Controlled', exact: true }).click();

    await expect(page).toHaveTitle('Accordion - Controlled ⋅ Storybook');

    await section1Button.click();
    await section2Button.click();
    await section3Button.click();

    await expect(storyBookIframe.getByText(section1Text)).toBeVisible();
    await expect(storyBookIframe.getByText(section2Text)).toBeVisible();
    await expect(storyBookIframe.getByText(section3Text)).toBeVisible();

    // Interaction with the storybook controls
    await page.getByRole('tab', { name: 'Controls' }).click();

    await page.getByText('0', { exact: true }).click();
    await page.getByRole('textbox').fill('1');
    await page.getByRole('textbox').press('Enter');

    await section1Button.click();
    await section2Button.click();
    await section3Button.click();

    await expect(storyBookIframe.getByText(section1Text)).toBeHidden();
    await expect(storyBookIframe.getByText(section2Text)).toBeHidden();
    await expect(storyBookIframe.getByText(section3Text)).toBeHidden();
  });

  test('Controlled No Multi', async ({ page }) => {
    await page.getByRole('button', { name: 'Accordion' }).click();
    await page.getByRole('link', { name: 'Controlled No Multi' }).click();

    await expect(page).toHaveTitle(
      'Accordion - Controlled No Multi ⋅ Storybook'
    );

    await section1Button.click();

    await expect(storyBookIframe.getByText(section1Text)).toBeVisible();
    await expect(storyBookIframe.getByText(section2Text)).toBeHidden();
    await expect(storyBookIframe.getByText(section3Text)).toBeHidden();

    await section2Button.click();

    await expect(storyBookIframe.getByText(section1Text)).toBeHidden();
    await expect(storyBookIframe.getByText(section2Text)).toBeVisible();
    await expect(storyBookIframe.getByText(section3Text)).toBeHidden();

    // Interaction with the storybook controls
    await page.getByRole('tab', { name: 'Controls' }).click();

    const indexValue = page.getByPlaceholder('Edit number...');

    await indexValue.click();
    await indexValue.fill('1');
    await indexValue.press('Enter');

    await expect(storyBookIframe.getByText(section1Text)).toBeHidden();
    await expect(storyBookIframe.getByText(section2Text)).toBeVisible();
    await expect(storyBookIframe.getByText(section3Text)).toBeHidden();
  });

  test('Expand Collapse all', async ({ page }) => {
    await page.getByRole('button', { name: 'Accordion' }).click();
    await page.getByRole('link', { name: 'Expand Collapse All' }).click();

    await expect(page).toHaveTitle(
      'Accordion - Expand Collapse All ⋅ Storybook'
    );
    await expect(
      storyBookIframe.getByRole('button', { name: 'Expand All' })
    ).toBeVisible();

    await expect(section1Button).toBeVisible();
    await expect(section2Button).toBeVisible();
    await expect(section3Button).toBeVisible();

    await section1Button.click();
    await section2Button.click();
    await section3Button.click();

    await expect(storyBookIframe.getByText(section1Text)).toBeVisible();
    await expect(storyBookIframe.getByText(section2Text)).toBeVisible();
    await expect(storyBookIframe.getByText(section3Text)).toBeVisible();

    await expect(
      storyBookIframe.getByRole('button', { name: 'Collapse All' })
    ).toBeVisible();
    await storyBookIframe.getByRole('button', { name: 'Collapse All' }).click();

    await expect(
      storyBookIframe.getByRole('button', { name: 'Expand All' })
    ).toBeVisible();
    await expect(storyBookIframe.getByText(section1Text)).toBeHidden();
    await expect(storyBookIframe.getByText(section2Text)).toBeHidden();
    await expect(storyBookIframe.getByText(section3Text)).toBeHidden();

    await storyBookIframe.getByRole('button', { name: 'Expand All' }).click();

    await expect(section1Button).toBeVisible();
    await expect(section2Button).toBeVisible();
    await expect(section3Button).toBeVisible();
  });

  test('Inverse', async ({ page }) => {
    await page.getByRole('button', { name: 'Accordion' }).click();
    await page.locator('#accordion--inverse').click();

    await expect(page).toHaveTitle('Accordion - Inverse ⋅ Storybook');

    await verifySectionVisibilityAndState(
      storyBookIframe,
      section1Button,
      section2Button,
      section3Button,
      section4Button
    );

    await verifyDefaultBehaviour(
      storyBookIframe,
      section1Button,
      section2Button,
      section3Button
    );

    await section3Button.click();
    const inverseContainer = storyBookIframe.locator(
      '#storybook-root > div > div'
    );

    await expect(inverseContainer).toHaveCSS(
      'background-color',
      'rgb(41, 47, 124)'
    );
    await expect(section1Button).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(storyBookIframe.getByText(section3Text)).toHaveCSS(
      'color',
      'rgb(255, 255, 255)'
    );
  });

  test('With Dropdown', async ({ page }) => {
    await page.getByRole('button', { name: 'Accordion' }).click();
    await page.getByRole('link', { name: 'With Dropdown' }).click();

    const personalInfoButton = storyBookIframe.getByRole('button', {
      name: 'Personal Information',
    });

    const shippingAddressButton = storyBookIframe.getByRole('button', {
      name: 'Shipping Address',
    });

    const randomButton = storyBookIframe.getByRole('button', {
      name: 'Random',
    });

    async function verifyPersonalInformationContentHidden() {
      await expect(storyBookIframe.getByText('Email')).toBeHidden();
      await expect(storyBookIframe.getByText('Full Name')).toBeHidden();
      await expect(storyBookIframe.getByText('Message')).toBeHidden();
      await expect(storyBookIframe.getByText('Comments')).toBeHidden();
      await expect(storyBookIframe.getByText('Questions')).toBeHidden();
      await expect(storyBookIframe.getByText('Jokes')).toBeHidden();
    }

    async function verifyShippingAddressContentHidden() {
      await expect(storyBookIframe.getByText('City')).toBeHidden();
      await expect(storyBookIframe.getByText('State')).toBeHidden();
      await expect(
        storyBookIframe.getByText('Additional Information')
      ).toBeHidden();
    }

    await expect(page).toHaveTitle('Accordion - With Dropdown ⋅ Storybook');
    await expect(personalInfoButton).toBeVisible();
    await expect(shippingAddressButton).toBeVisible();
    await expect(randomButton).toBeVisible();

    async function verifyRandomContentHidden() {
      await expect(storyBookIframe.getByText('ComboBox Example')).toBeHidden();
      await expect(
        storyBookIframe.getByRole('button', { name: 'Basic Dropdown' })
      ).toBeHidden();
      await expect(
        storyBookIframe.getByRole('button', { name: 'Show Modal' })
      ).toBeHidden();
    }

    await personalInfoButton.click();

    await expect(storyBookIframe.getByText('Email')).toBeVisible();
    await expect(storyBookIframe.getByText('Full Name')).toBeVisible();
    await expect(storyBookIframe.getByText('Message')).toBeVisible();
    await expect(storyBookIframe.getByText('Comments')).toBeVisible();
    await expect(storyBookIframe.getByText('Questions')).toBeVisible();
    await expect(storyBookIframe.getByText('Jokes')).toBeVisible();

    await verifyShippingAddressContentHidden();
    await verifyRandomContentHidden();

    await shippingAddressButton.click();

    await verifyPersonalInformationContentHidden();
    await verifyRandomContentHidden();

    await expect(storyBookIframe.getByText('City')).toBeVisible();
    await expect(storyBookIframe.getByText('State')).toBeVisible();
    await expect(
      storyBookIframe.getByText('Additional Information')
    ).toBeVisible();

    await randomButton.click();

    await verifyPersonalInformationContentHidden();
    await verifyShippingAddressContentHidden();

    await expect(storyBookIframe.getByText('ComboBox Example')).toBeVisible();
    await expect(
      storyBookIframe.getByRole('button', { name: 'Basic Dropdown' })
    ).toBeVisible();
    await expect(
      storyBookIframe.getByRole('button', { name: 'Show Modal' })
    ).toBeVisible();
  });
});
