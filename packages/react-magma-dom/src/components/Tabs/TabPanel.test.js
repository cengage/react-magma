import React from 'react';

import { render } from '@testing-library/react';

import { TabPanel } from './TabPanel';
import { TabPanelsContainer } from './TabPanelsContainer';
import { TabsContainerContext } from './TabsContainer';
import { axe } from '../../../axe-helper';

describe('TabPanel', () => {
  it('should correctly apply the testId', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 0 }}>
        <TabPanelsContainer>
          <TabPanel testId={testId}>Tab Panel Text</TabPanel>
        </TabPanelsContainer>
      </TabsContainerContext.Provider>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render children', () => {
    const testId = 'test-id';

    const { getByText } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 0 }}>
        <TabPanelsContainer>
          <TabPanel testId={testId}>Tab Panel Text</TabPanel>
        </TabPanelsContainer>
      </TabsContainerContext.Provider>
    );

    expect(getByText('Tab Panel Text')).toBeInTheDocument();
  });
});

it('should render active tab', () => {
  const { getByText, queryByText } = render(
    <TabsContainerContext.Provider value={{ activeTabIndex: 1 }}>
      <TabPanelsContainer>
        <TabPanel>Tab Panel 1 Text</TabPanel>
        <TabPanel>Tab Panel 2 Text</TabPanel>
      </TabPanelsContainer>
    </TabsContainerContext.Provider>
  );
  expect(queryByText('Tab Panel 1 Text')).not.toBeInTheDocument();
  expect(getByText('Tab Panel 2 Text')).toBeInTheDocument();
});

it('should render with inverse styles', () => {
  const testId = 'test-id';

  const { getByTestId } = render(
    <TabsContainerContext.Provider value={{ activeTabIndex: 0 }}>
      <TabPanelsContainer>
        <TabPanel testId={testId} isInverse>
          Tab Panel Text
        </TabPanel>
      </TabPanelsContainer>
    </TabsContainerContext.Provider>
  );

  expect(getByTestId(testId)).toHaveStyleRule('background', 'none');
});

describe('Test for accessibility', () => {
  it('Does not violate accessibility standards', async () => {
    const testId = 'test-id';

    const { container } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 0 }}>
        <TabPanelsContainer>
          <TabPanel testId={testId}>Tab Panel Text</TabPanel>
        </TabPanelsContainer>
      </TabsContainerContext.Provider>
    );

    return await axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('should have all necessary accessibility attributes', () => {
    const testId = 'test-id';

    const { getAllByRole } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 0 }}>
        <TabPanelsContainer>
          <TabPanel testId={testId}>Tab Panel Text</TabPanel>
        </TabPanelsContainer>
      </TabsContainerContext.Provider>
    );

    const tabPanel = getAllByRole('tabpanel')[0];
    expect(tabPanel).toHaveAttribute('role', 'tabpanel');
    expect(tabPanel).toHaveAttribute('aria-labelledby', 'tab-undefined-0');
    expect(tabPanel).toHaveAttribute('id', 'tabpanel-undefined-0');
  });
});
