import React from 'react';
import { TabPanel } from './TabPanel';
import { TabsContext } from './TabsContainer';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('TabPanel', () => {
  it('should correctly apply the testId', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <TabsContext.Provider value={{ activeTabIndex: 1 }}>
        <TabPanel testId={testId} index={1}>
          Tab Panel Text
        </TabPanel>
      </TabsContext.Provider>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render children', () => {
    const testId = 'test-id';

    const { getByText } = render(
      <TabsContext.Provider value={{ activeTabIndex: 1 }}>
        <TabPanel index={1} testId={testId}>
          Tab Panel Text
        </TabPanel>
      </TabsContext.Provider>
    );

    expect(getByText('Tab Panel Text'));
  });
});

it('should render active tab', () => {
  const testId = 'test-id';

  const { getByText, queryByText } = render(
    <TabsContext.Provider value={{ activeTabIndex: 1 }}>
      <TabPanel index={1} testId={testId}>
        Tab Panel 1 Text
      </TabPanel>
      <TabPanel index={2} testId={testId}>
        Tab Panel 2 Text
      </TabPanel>
    </TabsContext.Provider>
  );
  expect(getByText('Tab Panel 1 Text')).toBeInTheDocument();
  expect(queryByText('Tab Panel 2 Text')).not.toBeInTheDocument();
});

describe('Test for accessibility', () => {
  it('Does not violate accessibility standards', () => {
    const testId = 'test-id';

    const { container } = render(
      <TabsContext.Provider value={{ activeTabIndex: 1 }}>
        <TabPanel index={1} testId={testId}>
          Tab Panel Text
        </TabPanel>
      </TabsContext.Provider>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
