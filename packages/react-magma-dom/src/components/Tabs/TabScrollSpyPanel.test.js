import React from 'react';
import { axe } from '../../../axe-helper';
import { render } from '@testing-library/react';
import { TabScrollSpyPanel, TabsScrollSpyContainer } from '.';
import { AndroidIcon } from 'react-magma-icons';

const TEXT = 'Test Text';
const testId = 'test-id';
const tabLabel = 'tab-label';

describe('TabScrollSpyPanel', () => {
  it('Should find element by testId', () => {
    const { getByTestId } = render(
      <TabScrollSpyPanel tabLabel={tabLabel} testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it(`Should set the navigation title with 'tabLabel'`, () => {
    const { getByTestId } = render(
      <TabsScrollSpyContainer testId={`${testId}-Tab`}>
        <TabScrollSpyPanel tabLabel={`${tabLabel}-1`} />
        <TabScrollSpyPanel tabLabel={`${tabLabel}-2`} />
      </TabsScrollSpyContainer>
    );

    expect(getByTestId(`${testId}-Tab`)).toHaveTextContent(
      `${tabLabel}-1` && `${tabLabel}-2`
    );
  });

  it(`Should set an icon in each navigation item with 'icon'`, () => {
    const { getByTestId } = render(
      <TabsScrollSpyContainer testId={`${testId}-Tab`}>
        <TabScrollSpyPanel tabLabel={tabLabel} icon={<AndroidIcon />} />
      </TabsScrollSpyContainer>
    );

    expect(
      getByTestId(`${testId}-Tab`).querySelector('svg')
    ).toBeInTheDocument();
  });

  it(`Should set a custom ID with 'customId'`, () => {
    const { container } = render(
      <TabScrollSpyPanel
        customId="potato"
        tabLabel={tabLabel}
        testId={testId}
      />
    );

    const customId = container.querySelector('section[id="potato"]');

    expect(customId).toBeInTheDocument();
  });

  it('Tab Panels are compliant with accessibility', () => {
    const { container } = render(
      <TabScrollSpyPanel aria-label="TabScrollSpyPanel" tabLabel={tabLabel}>
        {TEXT}
      </TabScrollSpyPanel>
    );
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
