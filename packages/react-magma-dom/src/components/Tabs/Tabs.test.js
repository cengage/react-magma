import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { TabPanelsContainer } from './TabPanelsContainer';
import { TabsContainer, TabsContainerContext } from './TabsContainer';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { Tabs } from '.';

describe('Tabs', () => {
  it('should correctly apply the testId', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 1 }}>
        <Tabs testId={testId}>
          <Tab>Tab Text</Tab>
        </Tabs>
      </TabsContainerContext.Provider>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the children tabs', () => {
    const { getByText } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 1 }}>
        <Tabs>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </Tabs>
      </TabsContainerContext.Provider>
    );

    expect(getByText('Tab 1')).toBeInTheDocument();
    expect(getByText('Tab 2')).toBeInTheDocument();
  });

  it('should render a custom wrapped tab', () => {
    // eslint-disable-next-line react/prop-types
    const OptionalTab = ({ toggle, tabProps }) => {
      return toggle ? <Tab {...tabProps}>Hello There</Tab> : null;
    };

    const { getByText } = render(
      <TabsContainer activeIndex={0}>
        <Tabs>
          <Tab>Main page</Tab>
          <OptionalTab toggle />
          <div>
            <Tab>FAQ</Tab>
          </div>
        </Tabs>

        <TabPanelsContainer>
          <TabPanel>
            <div>Main page</div>
          </TabPanel>
          <TabPanel>
            <div>Optional</div>
          </TabPanel>
          <TabPanel>
            <div>FAQ</div>
          </TabPanel>
        </TabPanelsContainer>
      </TabsContainer>
    );

    const renderedOptionalTab = getByText('Hello There');

    expect(renderedOptionalTab).toBeInTheDocument();

    fireEvent.click(renderedOptionalTab);

    expect(getByText('Optional')).toBeInTheDocument();
  });

  it('should render the tabs horizontally', () => {
    const testId = 'test-id';

    const { getByTestId, getAllByTestId, container } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 1 }}>
        <Tabs testId={testId} orientation="horizontal" aria-label="Tabs">
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </Tabs>
      </TabsContainerContext.Provider>
    );

    const tabsContainer = getByTestId(testId);
    expect(tabsContainer).toHaveAttribute('orientation', 'horizontal');
    expect(tabsContainer).toHaveStyleRule('width', '100%');
    expect(container.querySelector("[role='tablist']")).toHaveAttribute(
      'aria-label',
      'Tabs, use the right and left arrow keys to activate other tabs'
    );
    expect(getAllByTestId('tabContainer')[0]).toHaveStyleRule('height', '100%');
  });

  it('should render the tabs vertically', () => {
    const testId = 'test-id';

    const { getByTestId, getAllByTestId, container } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 1 }}>
        <Tabs testId={testId} orientation="vertical" aria-label="Tabs">
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </Tabs>
      </TabsContainerContext.Provider>
    );

    const tabsContainer = getByTestId(testId);

    expect(tabsContainer).toHaveAttribute('orientation', 'vertical');
    expect(tabsContainer).toHaveStyleRule('width', 'auto');
    expect(container.querySelector("[role='tablist']")).toHaveAttribute(
      'aria-label',
      'Tabs, use the down and up arrow keys to activate other tabs'
    );
    expect(getAllByTestId('tabContainer')[0]).toHaveStyleRule('height', 'auto');
  });

  it('should render scroll buttons if orientation horizontal', () => {
    const { getByTestId } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 1 }}>
        <Tabs orientation="horizontal">
          <Tab>Tab 1</Tab>
        </Tabs>
      </TabsContainerContext.Provider>
    );
    expect(getByTestId('buttonNext')).toBeDefined();
    expect(getByTestId('buttonPrev')).toBeDefined();
  });

  it('should render tabs with textTransform prop', () => {
    const { getByText, rerender } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 1 }}>
        <Tabs>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </Tabs>
      </TabsContainerContext.Provider>
    );

    expect(getByText('Tab 1')).toBeInTheDocument();
    expect(getByText('Tab 2')).toBeInTheDocument();
    expect(getByText('Tab 1')).toHaveStyleRule('text-transform', 'uppercase');

    rerender(
      <Tabs textTransform="none">
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </Tabs>
    );

    expect(getByText('Tab 1')).toHaveStyleRule('text-transform', 'none');
  });

  it('should render centered tabs', () => {
    const { container } = render(
      <Tabs alignment="center">
        <Tab>Tab 1</Tab>
      </Tabs>
    );

    expect(container.querySelector("[role='tablist']")).toHaveStyleRule(
      'justify-content',
      'center'
    );
  });

  it('should render right-aligned tabs', () => {
    const { container } = render(
      <Tabs alignment="right">
        <Tab>Tab 1</Tab>
      </Tabs>
    );

    expect(container.querySelector("[role='tablist']")).toHaveStyleRule(
      'justify-content',
      'flex-end'
    );
  });

  it('should render tabs with passed in background color', () => {
    const testId = 'test-id';
    const bgColor = '#FF0000';
    const { getByTestId } = render(
      <Tabs testId={testId} backgroundColor={bgColor}>
        <Tab>Tab 1</Tab>
      </Tabs>
    );

    expect(getByTestId(testId)).toHaveStyleRule('background-color', bgColor);
  });

  it('should render full width tabs with the correct style', () => {
    const { getByText } = render(
      <Tabs isFullWidth>
        <Tab>Tab 1</Tab>
      </Tabs>
    );

    expect(getByText('Tab 1').parentElement).toHaveStyleRule(
      'flex-shrink',
      '1'
    );
    expect(getByText('Tab 1').parentElement).toHaveStyleRule(
      'max-width',
      '100%'
    );
  });

  it('should render default active tab styles', () => {
    const { getByText } = render(
      <TabsContainer activeIndex={0}>
        <Tabs>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </Tabs>
      </TabsContainer>
    );

    expect(getByText('Tab 1').parentElement).toHaveStyleRule('bottom', '0', {
      target: ':after',
    });
  });

  it('should render active tab styles for top border position', () => {
    const { getByText } = render(
      <TabsContainer activeIndex={0}>
        <Tabs borderPosition="top">
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </Tabs>
      </TabsContainer>
    );

    expect(getByText('Tab 1').parentElement).toHaveStyleRule('bottom', 'auto', {
      target: ':after',
    });
  });

  it('should render active tab styles for right border position', () => {
    const { getByText } = render(
      <TabsContainer activeIndex={0}>
        <Tabs borderPosition="right" orientation="vertical">
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </Tabs>
      </TabsContainer>
    );

    expect(getByText('Tab 1').parentElement).toHaveStyleRule('left', 'auto', {
      target: ':after',
    });
  });

  it('should render active tab styles for vertical tabs', () => {
    const { getByText } = render(
      <TabsContainer activeIndex={0}>
        <Tabs orientation="vertical">
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </Tabs>
      </TabsContainer>
    );

    expect(getByText('Tab 1').parentElement).toHaveStyleRule('bottom', '0', {
      target: ':after',
    });
  });

  it('should render the inverse tabs with the correct styles', () => {
    const { getByText, getByTestId } = render(
      <Tabs isInverse>
        <Tab>Tab 1</Tab>
      </Tabs>
    );

    expect(getByText('Tab 1').parentElement).toHaveStyleRule(
      'background',
      magma.colors.tertiary,
      {
        target: ':after',
      }
    );
    expect(getByTestId('buttonPrev')).toHaveStyleRule(
      'color',
      magma.colors.neutral100
    );
    expect(getByTestId('buttonNext')).toHaveStyleRule(
      'color',
      magma.colors.neutral100
    );
  });

  it('should change panels on tab button click', () => {
    const { getByText, queryByText } = render(
      <TabsContainer activeIndex={0}>
        <Tabs testId={'dd'} orientation="horizontal">
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

    expect(getByText('Tab 1 Info')).toBeVisible();
    expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();

    fireEvent.click(getByText('This is tab 2'), {
      target: { scrollIntoView: jest.fn() },
    });

    expect(queryByText('Tab 1 Info')).not.toBeInTheDocument();
    expect(getByText('Tab 2 Info')).toBeVisible();
  });

  it('should not change the panel on clicking a disabled tab', () => {
    const { getByText, queryByText } = render(
      <TabsContainer activeIndex={0}>
        <Tabs testId={'dd'} orientation="horizontal">
          <Tab>This is tab 1</Tab>
          <Tab disabled>This is tab 2</Tab>
          <Tab>This is tab 3</Tab>
        </Tabs>

        <TabPanelsContainer>
          <TabPanel>Tab 1 Info</TabPanel>
          <TabPanel>Tab 2 Info</TabPanel>
          <TabPanel>Tab 3 Info</TabPanel>
        </TabPanelsContainer>
      </TabsContainer>
    );

    expect(getByText('Tab 1 Info')).toBeVisible();
    expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();

    fireEvent.click(getByText('This is tab 2').parentElement, {
      target: {
        scrollIntoView: jest.fn(),
      },
    });

    expect(queryByText('Tab 1 Info')).toBeInTheDocument();
    expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();
  });

  it('should call passed in onChange function when tab panel is changed', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <TabsContainer activeIndex={0}>
        <Tabs testId={'dd'} orientation="horizontal" onChange={onChange}>
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

    fireEvent.click(getByText('This is tab 2'), {
      target: { scrollIntoView: jest.fn() },
    });

    expect(onChange).toHaveBeenCalled();
  });

  it('should render a tab with a wrapper around it', () => {
    const { getByTestId } = render(
      <Tabs>
        <div>
          <Tab testId="testTab">Test Tab</Tab>
        </div>
      </Tabs>
    );

    expect(getByTestId('testTab')).toBeInTheDocument();
  });

  describe('Keyboard Navigation', () => {
    it('ArrowRight', () => {
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

      expect(getByText('Tab 1 Info')).toBeVisible();
      expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();

      fireEvent.keyDown(getByText('This is tab 1'), {
        key: 'ArrowRight',
      });

      expect(queryByText('Tab 1 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 2 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 2'));

      fireEvent.keyDown(getByText('This is tab 2'), {
        key: 'ArrowRight',
      });

      expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 3 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 3'));

      fireEvent.keyDown(getByText('This is tab 3'), {
        key: 'ArrowRight',
      });

      expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 3 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 3'));
    });

    it('ArrowLeft', () => {
      const { getByText, queryByText } = render(
        <TabsContainer activeIndex={2}>
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

      expect(getByText('Tab 3 Info')).toBeVisible();
      expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();

      fireEvent.keyDown(getByText('This is tab 3'), {
        key: 'ArrowLeft',
      });

      expect(queryByText('Tab 3 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 2 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 2'));

      fireEvent.keyDown(getByText('This is tab 2'), {
        key: 'ArrowLeft',
      });

      expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 1 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 1'));

      fireEvent.keyDown(getByText('This is tab 1'), {
        key: 'ArrowLeft',
      });

      expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 1 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 1'));
    });

    it('ArrowDown', () => {
      const { getByText, queryByText } = render(
        <TabsContainer activeIndex={0}>
          <Tabs orientation="vertical">
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

      expect(getByText('Tab 1 Info')).toBeVisible();
      expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();

      fireEvent.keyDown(getByText('This is tab 1'), {
        key: 'ArrowDown',
      });

      expect(queryByText('Tab 1 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 2 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 2'));

      fireEvent.keyDown(getByText('This is tab 2'), {
        key: 'ArrowDown',
      });

      expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 3 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 3'));

      fireEvent.keyDown(getByText('This is tab 3'), {
        key: 'ArrowDown',
      });

      expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 3 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 3'));
    });

    it('ArrowUp', () => {
      const { getByText, queryByText } = render(
        <TabsContainer activeIndex={2}>
          <Tabs orientation="vertical">
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

      expect(getByText('Tab 3 Info')).toBeVisible();
      expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();

      fireEvent.keyDown(getByText('This is tab 3'), {
        key: 'ArrowUp',
      });

      expect(queryByText('Tab 3 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 2 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 2'));

      fireEvent.keyDown(getByText('This is tab 2'), {
        key: 'ArrowUp',
      });

      expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 1 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 1'));

      fireEvent.keyDown(getByText('This is tab 1'), {
        key: 'ArrowUp',
      });

      expect(queryByText('Tab 2 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 1 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 1'));
    });

    it('Home', () => {
      const { getByText, queryByText } = render(
        <TabsContainer activeIndex={2}>
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

      expect(getByText('Tab 3 Info')).toBeVisible();
      expect(queryByText('Tab 1 Info')).not.toBeInTheDocument();

      fireEvent.keyDown(getByText('This is tab 3'), {
        key: 'Home',
      });

      expect(queryByText('Tab 3 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 1 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 1'));
    });

    it('End', () => {
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

      expect(getByText('Tab 1 Info')).toBeVisible();
      expect(queryByText('Tab 3 Info')).not.toBeInTheDocument();

      fireEvent.keyDown(getByText('This is tab 1'), {
        key: 'End',
      });

      expect(queryByText('Tab 1 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 3 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 3'));
    });

    it('ArrowRight with disabled', () => {
      const { getByText, queryByText } = render(
        <TabsContainer activeIndex={0}>
          <Tabs>
            <Tab>This is tab 1</Tab>
            <Tab disabled>This is tab 2</Tab>
            <Tab>This is tab 3</Tab>
          </Tabs>

          <TabPanelsContainer>
            <TabPanel>Tab 1 Info</TabPanel>
            <TabPanel>Tab 2 Info</TabPanel>
            <TabPanel>Tab 3 Info</TabPanel>
          </TabPanelsContainer>
        </TabsContainer>
      );

      expect(getByText('Tab 1 Info')).toBeVisible();
      expect(queryByText('Tab 3 Info')).not.toBeInTheDocument();

      fireEvent.keyDown(getByText('This is tab 1'), {
        key: 'ArrowRight',
      });

      expect(queryByText('Tab 1 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 3 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 3'));
    });

    it('ArrowLeft with disabled', () => {
      const { getByText, queryByText } = render(
        <TabsContainer activeIndex={2}>
          <Tabs>
            <Tab>This is tab 1</Tab>
            <Tab disabled>This is tab 2</Tab>
            <Tab>This is tab 3</Tab>
          </Tabs>

          <TabPanelsContainer>
            <TabPanel>Tab 1 Info</TabPanel>
            <TabPanel>Tab 2 Info</TabPanel>
            <TabPanel>Tab 3 Info</TabPanel>
          </TabPanelsContainer>
        </TabsContainer>
      );

      expect(getByText('Tab 3 Info')).toBeVisible();
      expect(queryByText('Tab 1 Info')).not.toBeInTheDocument();

      fireEvent.keyDown(getByText('This is tab 3'), {
        key: 'ArrowLeft',
      });

      expect(queryByText('Tab 3 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 1 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 1'));
    });

    it('ArrowDown with disabled', () => {
      const { getByText, queryByText } = render(
        <TabsContainer activeIndex={0}>
          <Tabs orientation="vertical">
            <Tab>This is tab 1</Tab>
            <Tab disabled>This is tab 2</Tab>
            <Tab>This is tab 3</Tab>
          </Tabs>

          <TabPanelsContainer>
            <TabPanel>Tab 1 Info</TabPanel>
            <TabPanel>Tab 2 Info</TabPanel>
            <TabPanel>Tab 3 Info</TabPanel>
          </TabPanelsContainer>
        </TabsContainer>
      );

      expect(getByText('Tab 1 Info')).toBeVisible();
      expect(queryByText('Tab 3 Info')).not.toBeInTheDocument();

      fireEvent.keyDown(getByText('This is tab 1'), {
        key: 'ArrowDown',
      });

      expect(queryByText('Tab 1 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 3 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 3'));
    });

    it('ArrowUp with disabled', () => {
      const { getByText, queryByText } = render(
        <TabsContainer activeIndex={2}>
          <Tabs orientation="vertical">
            <Tab>This is tab 1</Tab>
            <Tab disabled>This is tab 2</Tab>
            <Tab>This is tab 3</Tab>
          </Tabs>

          <TabPanelsContainer>
            <TabPanel>Tab 1 Info</TabPanel>
            <TabPanel>Tab 2 Info</TabPanel>
            <TabPanel>Tab 3 Info</TabPanel>
          </TabPanelsContainer>
        </TabsContainer>
      );

      expect(getByText('Tab 3 Info')).toBeVisible();
      expect(queryByText('Tab 1 Info')).not.toBeInTheDocument();

      fireEvent.keyDown(getByText('This is tab 3'), {
        key: 'ArrowUp',
      });

      expect(queryByText('Tab 3 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 1 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 1'));
    });

    it('Home with first element disabled', () => {
      const { getByText, queryByText } = render(
        <TabsContainer activeIndex={2}>
          <Tabs>
            <Tab disabled>This is tab 1</Tab>
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

      expect(getByText('Tab 3 Info')).toBeVisible();
      expect(queryByText('Tab 1 Info')).not.toBeInTheDocument();

      fireEvent.keyDown(getByText('This is tab 3'), {
        key: 'Home',
      });

      expect(queryByText('Tab 1 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 2 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 2'));
    });

    it('End with last element disabled', () => {
      const { getByText, queryByText } = render(
        <TabsContainer activeIndex={0}>
          <Tabs>
            <Tab>This is tab 1</Tab>
            <Tab>This is tab 2</Tab>
            <Tab disabled>This is tab 3</Tab>
          </Tabs>

          <TabPanelsContainer>
            <TabPanel>Tab 1 Info</TabPanel>
            <TabPanel>Tab 2 Info</TabPanel>
            <TabPanel>Tab 3 Info</TabPanel>
          </TabPanelsContainer>
        </TabsContainer>
      );

      expect(getByText('Tab 1 Info')).toBeVisible();
      expect(queryByText('Tab 3 Info')).not.toBeInTheDocument();

      fireEvent.keyDown(getByText('This is tab 1'), {
        key: 'End',
      });

      expect(queryByText('Tab 1 Info')).not.toBeInTheDocument();
      expect(getByText('Tab 2 Info')).toBeVisible();
      expect(document.activeElement).toEqual(getByText('This is tab 2'));
    });

    it('should call passed in onChange function when tab panel is changed by keyboard navigation', () => {
      const onChange = jest.fn();
      const { getByText } = render(
        <Tabs onChange={onChange}>
          <Tab>This is tab 1</Tab>
          <Tab>This is tab 2</Tab>
          <Tab>This is tab 3</Tab>
        </Tabs>
      );

      fireEvent.keyDown(getByText('This is tab 1'), {
        key: 'ArrowRight',
      });

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith(1);
    });
  });
});

describe('Test for accessibility', () => {
  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <TabsContainer activeIndex={0}>
        <Tabs testId={'dd'} orientation="horizontal">
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
