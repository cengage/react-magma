import React from 'react';
import { TabPanel } from './TabPanel';
import { TabsContext } from './TabsContainer';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const dispatch = jest.fn();

const state = {
  activeTabIndex: 1,
  numberOfTabs: 5
};

const theme = 'dark';
const testId = 'test-id';

describe('TabPanel', () => {
  it('should correctly apply the testId', () => {
    const { getByTestId } = render(
      <TabsContext.Provider value={{ theme, state, dispatch }}>
        <TabPanel testId={testId} index={1}></TabPanel>
      </TabsContext.Provider>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should require text in the tabpanel', () => {
    const text = 'test';
    const { getByTestId } = render(
      <TabsContext.Provider value={{ theme, state, dispatch }}>
        <TabPanel index={1} testId={testId}>
          {text}
        </TabPanel>
      </TabsContext.Provider>
    );
    const component = getByTestId(testId);

    expect(component).toHaveTextContent(text);
  });

  it('TabsContextProvider/TabsContextConsumer shows activeTabIndex', () => {
    const { getByTestId } = render(
      <TabsContext.Provider value={{ theme, state, dispatch }}>
        <TabsContext.Consumer>
          {value => (
            <div data-testid={testId}>{value.state.activeTabIndex}</div>
          )}
        </TabsContext.Consumer>
      </TabsContext.Provider>
    );
    expect(getByTestId(testId).textContent).toBe('1');
  });

  it('should render children', () => {
    const { getByTestId } = render(
      <TabsContext.Provider value={{ theme, state, dispatch }}>
        <TabPanel index={1} testId={testId}>
          <div data-testid="child" />
        </TabPanel>
      </TabsContext.Provider>
    );
    expect(getByTestId(testId).children.length).toBe(1);
    expect(getByTestId('child')).toBeDefined();
  });
});

describe('Test for accessibility', () => {
  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <TabsContext.Provider value={{ theme, state, dispatch }}>
        <TabPanel index={1} testId={testId} />
      </TabsContext.Provider>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
