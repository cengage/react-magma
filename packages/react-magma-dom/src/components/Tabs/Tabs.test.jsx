import React from 'react';
import { Tab } from './Tab';
import { Tabs } from './Tabs';
import { TabsContext } from './TabsContainer';
import { magma } from '../../theme/magma';
import { render, fireEvent } from '@testing-library/react';
const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Tabs', () => {
  it('should correctly apply the testId', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1
    };
    const testId = 'test-id';

    const { getByTestId } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs testId={testId}>
          <button aria-label="test" data-testid="1" />
        </Tabs>
      </TabsContext.Provider>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a button with the passed in text', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1
    };

    const testId = 'test-id';
    const buttonText = 'Click me';
    const { getByText } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs testId={testId}>
          <button aria-label="test" data-testid="1">
            {buttonText}
          </button>
        </Tabs>
      </TabsContext.Provider>
    );

    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it('should require orientation the tabs and display tabs with the correct style', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1
    };

    const testId = 'test-id';

    const { getByTestId, rerender } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs testId={testId} orientation="horizontal">
          <Tab />
        </Tabs>
      </TabsContext.Provider>
    );
    const component = getByTestId(testId);
    expect(component).toHaveAttribute('orientation', 'horizontal');
    expect(component).toHaveStyleRule('width', '100%');
    expect(component.querySelector("[role='tab']")).toHaveStyleRule(
      'height',
      '100%'
    );

    rerender(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs testId={testId} orientation="vertical">
          <Tab />
        </Tabs>
      </TabsContext.Provider>
    );

    expect(component).toHaveAttribute('orientation', 'vertical');
    expect(component).toHaveStyleRule('width', 'auto');
    expect(component.querySelector("[role='tab']")).toHaveStyleRule(
      'height',
      'auto'
    );
  });

  it('should render children', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1
    };

    const testId = 'test-id';

    const { getByTestId } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs testId={testId}>
          <div data-testid="child" />
        </Tabs>
      </TabsContext.Provider>
    );
    expect(getByTestId(testId).children.length).toBe(1);
    expect(getByTestId('child')).toBeDefined();
  });

  it('should render scroll buttons if orientation horizontal', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1
    };

    const testId = 'test-id';

    const { getByTestId } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs
          testId={testId}
          hasScrollButtons={true}
          orientation="horizontal"
        />
      </TabsContext.Provider>
    );
    expect(getByTestId('buttonNext')).toBeDefined();
    expect(getByTestId('buttonPrev')).toBeDefined();
  });

  it('should render centered tabs', () => {
    const { container } = render(<Tabs isCentered />);

    expect(container.querySelector("[role='tablist']")).toHaveStyleRule(
      'justify-content',
      'center'
    );
  });

  it('should render tabs with specified background color', () => {
    const bgColor = '#FF0000';
    const { container } = render(<Tabs backgroundColor={bgColor} />);

    expect(container.querySelector('div')).toHaveStyleRule(
      'background-color',
      bgColor
    );
  });

  it('should render full width tabs with the correct style', () => {
    const { container } = render(
      <Tabs isFullWidth>
        <Tab />
      </Tabs>
    );

    expect(container.querySelector("[role='tab']")).toHaveStyleRule(
      'flex-shrink',
      '1'
    );
    expect(container.querySelector("[role='tab']")).toHaveStyleRule(
      'max-width',
      '100%'
    );
  });

  it('should render the active tab with the correct style', () => {
    const { container, rerender } = render(
      <Tabs>
        <Tab />
      </Tabs>
    );

    expect(container.querySelector("[role='tab']")).toHaveStyleRule(
      'bottom',
      '0',
      {
        target: ':after'
      }
    );

    rerender(
      <Tabs borderPosition="top">
        <Tab />
      </Tabs>
    );

    expect(container.querySelector("[role='tab']")).toHaveStyleRule(
      'bottom',
      'auto',
      {
        target: ':after'
      }
    );

    rerender(
      <Tabs orientation="vertical">
        <Tab />
      </Tabs>
    );

    expect(container.querySelector("[role='tab']")).toHaveStyleRule(
      'bottom',
      '0',
      {
        target: ':after'
      }
    );
  });

  it('should render the inverse tabs with the correct styles', () => {
    const { container } = render(
      <Tabs isInverse hasScrollButtons>
        <Tab />
      </Tabs>
    );

    expect(container.querySelector("[role='tab']")).toHaveStyleRule(
      'background',
      magma.colors.pop02,
      {
        target: ':after'
      }
    );
  });

  it('calls scrollIntoView on click by arrow button ', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1
    };

    const scrollIntoViewMock = jest.fn();

    Element.prototype.scrollIntoView = scrollIntoViewMock;

    const { getByTestId } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs testId={'dd'} hasScrollButtons={true} orientation="horizontal">
          <div>Test</div>
        </Tabs>
      </TabsContext.Provider>
    );

    fireEvent.click(getByTestId('buttonNext'));

    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
});

describe('Test for accessibility', () => {
  it('Does not violate accessibility standards', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1,
      numberOfTabs: 5
    };

    const testId = 'test-id';

    const { container } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs testId={testId}>
          <button aria-label="test" data-testid="1" />
        </Tabs>
      </TabsContext.Provider>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
