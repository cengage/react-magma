import React from 'react';
import { render } from '@testing-library/react';
import { Tab } from './Tab';
import { Tabs } from '.';
import { TabsContainer } from './TabsContainer';
import { TabPanel } from './TabPanel';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { TabPanelsContainer } from './TabPanelsContainer';

describe('Tabs Container', () => {
  it('should correctly apply the testId', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <TabsContainer activeIndex={0} testId={testId}>
        <Tabs>
          <Tab>This is tab 1</Tab>
          <Tab>This is tab 2</Tab>
          <Tab>This is tab 3</Tab>
        </Tabs>

        <TabPanelsContainer>
          <TabPanel>Tab 1 Info</TabPanel>
          <TabPanel>Tab 2 Info</TabPanel>
          <TabPanel>Tab 3 Info</TabPanel>
        </TabPanelsContainer>
      </TabsContainer>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });
});

it('should render children', () => {
  const { getByText, queryByText } = render(
    <TabsContainer activeIndex={0}>
      <Tabs>
        <Tab>This is tab 1</Tab>
        <Tab>This is tab 2</Tab>
        <Tab>This is tab 3</Tab>
      </Tabs>

      <TabPanelsContainer>
        <TabPanel>Tab 1 Info</TabPanel>
        <TabPanel>Tab 2 Info</TabPanel>
        <TabPanel>Tab 3 Info</TabPanel>
      </TabPanelsContainer>
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
        <Tab>This is tab 1</Tab>
        <Tab>This is tab 2</Tab>
        <Tab>This is tab 3</Tab>
      </Tabs>

      <TabPanelsContainer>
        <TabPanel>Tab 1 Info</TabPanel>
        <TabPanel>Tab 2 Info</TabPanel>
        <TabPanel>Tab 3 Info</TabPanel>
      </TabPanelsContainer>
    </TabsContainer>
  );

  expect(getByTestId(testId)).toHaveStyleRule(
    'background',
    'none'
  );
  expect(getByTestId(testId)).toHaveStyleRule('color', magma.colors.neutral100);
});

describe('Test for accessibility', () => {
  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <TabsContainer activeIndex={0}>
        <Tabs>
          <Tab>This is tab 1</Tab>
          <Tab>This is tab 2</Tab>
          <Tab>This is tab 3</Tab>
        </Tabs>

        <TabPanelsContainer>
          <TabPanel>Tab 1 Info</TabPanel>
          <TabPanel>Tab 2 Info</TabPanel>
          <TabPanel>Tab 3 Info</TabPanel>
        </TabPanelsContainer>
      </TabsContainer>
    );

    return axe(container.innerHTML, {
      rules: { listitem: { enabled: false } },
    }).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
