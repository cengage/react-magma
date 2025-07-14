import React from 'react';

import { render, fireEvent, getByAltText } from '@testing-library/react';
import { AndroidIcon } from 'react-magma-icons';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { TabScrollSpyPanel, TabsScrollSpyContainer } from '.';
import userEvent from '@testing-library/user-event';

const TEXT = 'Test Text';
const testIdContainer = 'container';
const testIdPanel = 'panel';
const tabLabel = 'tab-label';

describe('TabsScrollSpyContainer', () => {
  it('Should find element by testId', () => {
    const { getByTestId } = render(
      <TabsScrollSpyContainer testId={testIdContainer} />
    );

    expect(getByTestId(testIdContainer)).toBeInTheDocument();
  });

  it('Should change the active Tab on click', async () => {
    const { getByTestId } = render(
      <TabsScrollSpyContainer>
        <TabScrollSpyPanel tabLabel="first" />
        <TabScrollSpyPanel tabLabel="second" />
        <TabScrollSpyPanel tabLabel="third" />
      </TabsScrollSpyContainer>
    );

    await userEvent.click(getByTestId('tab0'));

    expect(getByTestId('tab0')).toHaveStyleRule(
      'color',
      magma.colors.primary500
    );
    expect(getByTestId('tab1')).toHaveStyleRule(
      'color',
      magma.colors.neutral500
    );
    expect(getByTestId('tab2')).toHaveStyleRule(
      'color',
      magma.colors.neutral500
    );

    await userEvent.click(getByTestId('tab1'));

    expect(getByTestId('tab0')).toHaveStyleRule(
      'color',
      magma.colors.neutral500
    );
    expect(getByTestId('tab1')).toHaveStyleRule(
      'color',
      magma.colors.primary500
    );
    expect(getByTestId('tab2')).toHaveStyleRule(
      'color',
      magma.colors.neutral500
    );

    await userEvent.click(getByTestId('tab2'));

    expect(getByTestId('tab0')).toHaveStyleRule(
      'color',
      magma.colors.neutral500
    );
    expect(getByTestId('tab1')).toHaveStyleRule(
      'color',
      magma.colors.neutral500
    );
    expect(getByTestId('tab2')).toHaveStyleRule(
      'color',
      magma.colors.primary500
    );
  });

  it('Should set the tabLabel', () => {
    const { getByTestId } = render(
      <TabsScrollSpyContainer>
        <TabScrollSpyPanel tabLabel="first">{TEXT}</TabScrollSpyPanel>
      </TabsScrollSpyContainer>
    );

    expect(getByTestId('tab0')).toHaveTextContent('first');
  });

  it('Should set the window.location.href on click', async () => {
    const { container } = render(
      <TabsScrollSpyContainer>
        <TabScrollSpyPanel tabLabel="first">{TEXT}</TabScrollSpyPanel>
      </TabsScrollSpyContainer>
    );

    const tab0 = container.querySelector('button[data-scrollspy-id="first"]');

    await userEvent.click(tab0);

    expect(window.location.hash).toBe('#first');
  });
});

it('Tab Panels are compliant with accessibility', () => {
  const { container } = render(
    <TabsScrollSpyContainer aria-label="TabsScrollSpyContainer" />
  );

  return axe(container.innerHTML).then(result => {
    return expect(result).toHaveNoViolations();
  });
});

describe('TabScrollSpyPanel', () => {
  it('Should find element by testId', () => {
    const { getByTestId } = render(
      <TabScrollSpyPanel tabLabel={tabLabel} testId={testIdPanel} />
    );

    expect(getByTestId(testIdPanel)).toBeInTheDocument();
  });

  it(`Should set the navigation title with 'tabLabel'`, () => {
    const { getByTestId } = render(
      <TabsScrollSpyContainer testId="Tabs">
        <TabScrollSpyPanel tabLabel="First Link">{TEXT}</TabScrollSpyPanel>
        <TabScrollSpyPanel tabLabel="Second Link">{TEXT}</TabScrollSpyPanel>
      </TabsScrollSpyContainer>
    );

    expect(getByTestId('tab0')).toHaveTextContent('First Link');
    expect(getByTestId('tab1')).toHaveTextContent('Second Link');
  });

  it(`Should set an icon in each navigation item with 'icon'`, () => {
    const { getByTestId } = render(
      <TabsScrollSpyContainer>
        <TabScrollSpyPanel tabLabel={tabLabel} icon={<AndroidIcon />}>
          {TEXT}
        </TabScrollSpyPanel>
      </TabsScrollSpyContainer>
    );

    expect(getByTestId('tab0').querySelector('svg')).toBeInTheDocument();
  });

  it('Tab Panels are compliant with accessibility', () => {
    const { container } = render(
      <TabScrollSpyPanel tabLabel={tabLabel}>{TEXT}</TabScrollSpyPanel>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
