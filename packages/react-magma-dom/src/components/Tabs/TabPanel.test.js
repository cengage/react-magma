import React from 'react';
import { TabPanel } from './TabPanel';
import { TabsContainerContext } from './TabsContainer';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { magma } from '../../theme/magma';

describe('TabPanel', () => {
  it('should correctly apply the testId', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 1 }}>
        <TabPanel testId={testId} index={1}>
          Tab Panel Text
        </TabPanel>
      </TabsContainerContext.Provider>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render children', () => {
    const testId = 'test-id';

    const { getByText } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 1 }}>
        <TabPanel index={1} testId={testId}>
          Tab Panel Text
        </TabPanel>
      </TabsContainerContext.Provider>
    );

    expect(getByText('Tab Panel Text'));
  });
});

it('should render active tab', () => {
  const testId = 'test-id';

  const { getByText, queryByText } = render(
    <TabsContainerContext.Provider value={{ activeTabIndex: 1 }}>
      <TabPanel index={1} testId={testId}>
        Tab Panel 1 Text
      </TabPanel>
      <TabPanel index={2} testId={testId}>
        Tab Panel 2 Text
      </TabPanel>
    </TabsContainerContext.Provider>
  );
  expect(getByText('Tab Panel 1 Text')).toBeInTheDocument();
  expect(queryByText('Tab Panel 2 Text')).not.toBeInTheDocument();
});

it('should render with inverse styles', () => {
  const testId = 'test-id';

  const { getByTestId } = render(
    <TabsContainerContext.Provider value={{ activeTabIndex: 1 }}>
      <TabPanel testId={testId} isInverse index={1}>
        Tab Panel Text
      </TabPanel>
    </TabsContainerContext.Provider>
  );

  expect(getByTestId(testId)).toHaveStyleRule(
    'background',
    magma.colors.foundation02
  );
});

describe('Test for accessibility', () => {
  it('Does not violate accessibility standards', () => {
    const testId = 'test-id';

    const { container } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 1 }}>
        <TabPanel index={1} testId={testId}>
          Tab Panel Text
        </TabPanel>
      </TabsContainerContext.Provider>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
