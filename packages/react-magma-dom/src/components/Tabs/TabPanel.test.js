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
  it('Does not violate accessibility standards', () => {
    const testId = 'test-id';

    const { container } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 0 }}>
        <TabPanelsContainer>
          <TabPanel testId={testId}>Tab Panel Text</TabPanel>
        </TabPanelsContainer>
      </TabsContainerContext.Provider>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('should have all necessary accessibility attributes', () => {
    const testId = 'test-id';

    const { getAllByTestId } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 0 }}>
        <TabPanelsContainer>
          <TabPanel testId={testId}>Tab Panel Text</TabPanel>
        </TabPanelsContainer>
      </TabsContainerContext.Provider>
    );

    expect(getAllByTestId(testId)[0]).toHaveAttribute('role', 'tabpanel');
    expect(getAllByTestId(testId)[0]).toHaveAttribute(
      'aria-labelledby',
      'tab-0'
    );
    expect(getAllByTestId(testId)[0]).toHaveAttribute('id', 'tabpanel-0');
  });
});
