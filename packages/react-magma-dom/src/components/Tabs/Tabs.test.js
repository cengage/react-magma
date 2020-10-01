import React from 'react';
import { Tab } from './Tab';
import { Tabs } from '.';
import { TabsContainer, TabsContainerContext } from './TabsContainer';
import { TabPanelsContainer } from './TabPanelsContainer';
import { TabPanel } from './TabPanel';
import { magma } from '../../theme/magma';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

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

    const { getByTestId } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 1 }}>
        <Tabs testId={testId} orientation="horizontal">
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </Tabs>
      </TabsContainerContext.Provider>
    );
    const tabsContainer = getByTestId(testId);
    expect(tabsContainer).toHaveAttribute('orientation', 'horizontal');
    expect(tabsContainer).toHaveStyleRule('width', '100%');
    expect(tabsContainer.querySelector("[role='tab']")).toHaveStyleRule(
      'height',
      '100%'
    );
  });

  it('should render the tabs vertically', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <TabsContainerContext.Provider value={{ activeTabIndex: 1 }}>
        <Tabs testId={testId} orientation="vertical">
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </Tabs>
      </TabsContainerContext.Provider>
    );

    const tabsContainer = getByTestId(testId);

    expect(tabsContainer).toHaveAttribute('orientation', 'vertical');
    expect(tabsContainer).toHaveStyleRule('width', 'auto');
    expect(tabsContainer.querySelector("[role='tab']")).toHaveStyleRule(
      'height',
      'auto'
    );
  });

  it('should render scroll buttons if orientation horizontal and hasScrollButtons is true', () => {
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
      <Tabs isInverse hasScrollButtons>
        <Tab>Tab 1</Tab>
      </Tabs>
    );

    expect(getByText('Tab 1').parentElement).toHaveStyleRule(
      'background',
      magma.colors.pop02,
      {
        target: ':after',
      }
    );
    expect(getByTestId('buttonPrev')).toHaveStyleRule(
      'color',
      magma.colors.neutral08
    );
    expect(getByTestId('buttonNext')).toHaveStyleRule(
      'color',
      magma.colors.neutral08
    );
  });

  it('should change panels on tab button click', () => {
    const { getByText, queryByText } = render(
      <TabsContainer activeIndex={0}>
        <Tabs testId={'dd'} hasScrollButtons={true} orientation="horizontal">
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
        <Tabs testId={'dd'} hasScrollButtons={true} orientation="horizontal">
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
        <Tabs
          testId={'dd'}
          hasScrollButtons
          orientation="horizontal"
          onChange={onChange}
        >
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
});

describe('Test for accessibility', () => {
  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <TabsContainer activeIndex={0}>
        <Tabs testId={'dd'} hasScrollButtons={true} orientation="horizontal">
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

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
