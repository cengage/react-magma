import React from 'react';
import { render } from '@testing-library/react';
import { Tab } from './Tab';
import { Tabs } from '.';
import { TabsContainer } from './TabsContainer';
import { TabPanel } from './TabPanel';
import { axe } from 'jest-axe';
import { magma } from '../../theme/magma';

describe('Tabs Container', () => {
  it('should correctly apply the testId', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <TabsContainer activeIndex={0} testId={testId}>
        <Tabs>
          <Tab index={0}>This is tab 1</Tab>
          <Tab index={1}>This is tab 2</Tab>
          <Tab index={2}>This is tab 3</Tab>
        </Tabs>

        <TabPanel index={0}>Tab 1 Info</TabPanel>
        <TabPanel index={1}>Tab 2 Info</TabPanel>
        <TabPanel index={2}>Tab 3 Info</TabPanel>
      </TabsContainer>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });
});

it('should render children', () => {
  const { getByText, queryByText } = render(
    <TabsContainer activeIndex={0}>
      <Tabs>
        <Tab index={0}>This is tab 1</Tab>
        <Tab index={1}>This is tab 2</Tab>
        <Tab index={2}>This is tab 3</Tab>
      </Tabs>

      <TabPanel index={0}>Tab 1 Info</TabPanel>
      <TabPanel index={1}>Tab 2 Info</TabPanel>
      <TabPanel index={2}>Tab 3 Info</TabPanel>
    </TabsContainer>
  );

  expect(getByText('This is tab 1')).toBeInTheDocument();
  expect(getByText('This is tab 2')).toBeInTheDocument();
  expect(getByText('Tab 1 Info')).toBeInTheDocument();
  expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();
});

it('should render with inverse styles', () => {
  const testId = 'test-id';

  const { getByTestId } = render(
    <TabsContainer isInverse testId={testId}>
      <Tabs>
        <Tab index={0}>This is tab 1</Tab>
        <Tab index={1}>This is tab 2</Tab>
        <Tab index={2}>This is tab 3</Tab>
      </Tabs>

      <TabPanel index={0}>Tab 1 Info</TabPanel>
      <TabPanel index={1}>Tab 2 Info</TabPanel>
      <TabPanel index={2}>Tab 3 Info</TabPanel>
    </TabsContainer>
  );

  expect(getByTestId(testId)).toHaveStyleRule(
    'background',
    magma.colors.foundation02
  );
  expect(getByTestId(testId)).toHaveStyleRule('color', magma.colors.neutral08);
});

describe('Test for accessibility', () => {
  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <TabsContainer activeIndex={0}>
        <Tabs>
          <Tab index={0}>This is tab 1</Tab>
          <Tab index={1}>This is tab 2</Tab>
          <Tab index={2}>This is tab 3</Tab>
        </Tabs>

        <TabPanel index={0}>Tab 1 Info</TabPanel>
        <TabPanel index={1}>Tab 2 Info</TabPanel>
        <TabPanel index={2}>Tab 3 Info</TabPanel>
      </TabsContainer>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
