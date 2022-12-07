import { render, fireEvent } from '@testing-library/react';
import { Tab } from './Tab';
import { Tabs } from '.';
import { TabsContainer } from './TabsContainer';
import { TabPanel } from './TabPanel';
import { magma } from '../../theme/magma';
import { TabPanelsContainer } from './TabPanelsContainer';

describe('Tab Panels Container', () => {
  it('should correctly apply the testId', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <TabPanelsContainer testId={testId}>
        <TabPanel>Tab 1 Info</TabPanel>
        <TabPanel>Tab 2 Info</TabPanel>
        <TabPanel>Tab 3 Info</TabPanel>
      </TabPanelsContainer>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render children and only display the active panel', () => {
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

    expect(getByText('Tab 1 Info')).toBeInTheDocument();
    expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();
    expect(queryByText('Tab 3 Info')).not.toBeInTheDocument();
  });

  it('should render with inverse styles', () => {
    const { getByText } = render(
      <TabsContainer>
        <Tabs>
          <Tab>This is tab 1</Tab>
          <Tab>This is tab 2</Tab>
          <Tab>This is tab 3</Tab>
        </Tabs>

        <TabPanelsContainer isInverse>
          <TabPanel>Tab 1 Info</TabPanel>
          <TabPanel>Tab 2 Info</TabPanel>
          <TabPanel>Tab 3 Info</TabPanel>
        </TabPanelsContainer>
      </TabsContainer>
    );

    expect(getByText('Tab 1 Info')).toHaveStyleRule(
      'background',
      'none'
    );
  });

  it('should use children isInverse props to render with inverse styles', () => {
    const { getByText } = render(
      <TabsContainer>
        <Tabs>
          <Tab>This is tab 1</Tab>
          <Tab>This is tab 2</Tab>
          <Tab>This is tab 3</Tab>
        </Tabs>

        <TabPanelsContainer>
          <TabPanel>Tab 1 Info</TabPanel>
          <TabPanel isInverse>Tab 2 Info</TabPanel>
          <TabPanel>Tab 3 Info</TabPanel>
        </TabPanelsContainer>
      </TabsContainer>
    );

    expect(getByText('Tab 1 Info')).toHaveStyleRule(
      'background',
      'none'
    );

    fireEvent.click(getByText('This is tab 2'), {
      target: { scrollIntoView: jest.fn() },
    });

    expect(getByText('Tab 2 Info')).toHaveStyleRule(
      'background',
      'none'
    );
  });
});
