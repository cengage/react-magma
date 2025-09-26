import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { CustomTab } from './CustomTab';
import { Button } from '../Button';

import { Tab, Tabs, TabsContainer, TabPanel, TabPanelsContainer } from '.';

describe('CustomTab', () => {
  it('should render custom content inside a tab', () => {
    const { getByText } = render(
      <TabsContainer>
        <Tabs aria-label="Sample Tabs">
          <CustomTab>
            <button>My Custom Tab</button>
          </CustomTab>
        </Tabs>
        <TabPanelsContainer>
          <TabPanel>
            <div>My Custom Panel</div>
          </TabPanel>
        </TabPanelsContainer>
      </TabsContainer>
    );

    expect(getByText('My Custom Tab')).toBeInTheDocument();
  });

  it('should be clickable and change tab panel content', () => {
    const { getByText } = render(
      <TabsContainer>
        <Tabs aria-label="Sample Tabs">
          <CustomTab>
            <button>First Tab</button>
          </CustomTab>
          <CustomTab>
            <button>Second Tab</button>
          </CustomTab>
        </Tabs>
        <TabPanelsContainer>
          <TabPanel>
            <div>First Panel</div>
          </TabPanel>
          <TabPanel>
            <div>Second Panel</div>
          </TabPanel>
        </TabPanelsContainer>
      </TabsContainer>
    );

    expect(getByText('First Panel')).toBeInTheDocument();
    expect(getByText('First Tab').closest('button')).toHaveAttribute(
      'aria-selected',
      'true'
    );

    fireEvent.click(getByText('Second Tab'));

    expect(getByText('Second Panel')).toBeInTheDocument();
    expect(getByText('Second Tab').closest('button')).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(getByText('First Tab').closest('button')).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('should pass accessibility props to the custom child', () => {
    const { getByText } = render(
      <TabsContainer>
        <Tabs aria-label="Sample Tabs">
          <CustomTab>
            <button>My Custom Tab</button>
          </CustomTab>
        </Tabs>
        <TabPanelsContainer>
          <TabPanel>
            <div>My Custom Panel</div>
          </TabPanel>
        </TabPanelsContainer>
      </TabsContainer>
    );

    const customButton = getByText('My Custom Tab').closest('button');
    expect(customButton).toHaveAttribute('role', 'tab');
    expect(customButton).toHaveAttribute('aria-selected', 'true');
    expect(customButton).toHaveAttribute('tabindex', '0');
  });

  it('should work with magma components as children', () => {
    const { getByText } = render(
      <TabsContainer>
        <Tabs aria-label="Sample Tabs">
          <CustomTab>
            <Button>Magma Button Tab</Button>
          </CustomTab>
        </Tabs>
        <TabPanelsContainer>
          <TabPanel>
            <div>Magma Button Panel</div>
          </TabPanel>
        </TabPanelsContainer>
      </TabsContainer>
    );

    expect(getByText('Magma Button Tab')).toBeInTheDocument();
    const magmaButton = getByText('Magma Button Tab').closest('button');
    expect(magmaButton).toHaveAttribute('role', 'tab');
  });

  it('should not have default tab styles', () => {
    const { getByTestId } = render(
      <TabsContainer>
        <Tabs>
          <CustomTab>
            <button>Custom</button>
          </CustomTab>
        </Tabs>
      </TabsContainer>
    );

    const tabContainer = getByTestId('tabContainer');
    expect(tabContainer).not.toHaveStyleRule('cursor', 'pointer');
  });

  it('works correctly alongside default Tab components', () => {
    const { getByText } = render(
      <TabsContainer>
        <Tabs aria-label="Mixed Tabs">
          <Tab>Default Tab</Tab>
          <CustomTab>
            <button>Custom Tab</button>
          </CustomTab>
        </Tabs>
        <TabPanelsContainer>
          <TabPanel>
            <div>Default Panel</div>
          </TabPanel>
          <TabPanel>
            <div>Custom Panel</div>
          </TabPanel>
        </TabPanelsContainer>
      </TabsContainer>
    );

    // Initially, the default tab should be active
    expect(getByText('Default Panel')).toBeInTheDocument();
    expect(getByText('Default Tab').closest('button')).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(getByText('Custom Tab').closest('button')).toHaveAttribute(
      'aria-selected',
      'false'
    );

    // Click the custom tab
    fireEvent.click(getByText('Custom Tab'));

    // Now, the custom tab should be active
    expect(getByText('Custom Panel')).toBeInTheDocument();
    expect(getByText('Custom Tab').closest('button')).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(getByText('Default Tab').closest('button')).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });
});
