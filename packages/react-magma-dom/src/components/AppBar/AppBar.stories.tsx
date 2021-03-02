import React from 'react';
import { AppBar, AppBarProps } from './index';
import { NavTabs, NavTab } from '../NavTabs';
import { Search } from '../Search';
import { ImageIcon } from 'react-magma-icons';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<AppBarProps> = args => (
  <AppBar {...args}>{args.children}</AppBar>
);

export default {
  title: 'AppBar',
  component: AppBar,
} as Meta;

export const Default = Template.bind({});
Default.args = {
  children: 'Simple AppBar',
  isCompact: false,
  isInverse: false,
};

const TabsTemplate: Story<AppBarProps> = args => (
  <AppBar {...args}>
    <>
      <strong
        style={{
          alignItems: 'center',
          display: 'flex',
          paddingRight: '64px',
          whiteSpace: 'nowrap',
        }}
      >
        <ImageIcon
          size={args.isCompact ? 24 : 40}
          style={{ marginRight: '8px' }}
        />
        LOGO
      </strong>
      <Search
        containerStyle={{ flexShrink: 0, marginRight: '24px' }}
        isInverse={args.isInverse}
        onSearch={() => {}}
        placeholder="Search for content..."
      />
      <NavTabs
        aria-label="Navigation"
        backgroundColor="transparent"
        isInverse={args.isInverse}
      >
        <NavTab isActive to="#">
          Lorem
        </NavTab>
        <NavTab to="#">Ipsum</NavTab>
        <NavTab to="#">Dolar</NavTab>
      </NavTabs>
    </>
  </AppBar>
);

export const Tabs = TabsTemplate.bind({});
Tabs.args = {
  ...Default.args,
  children: null,
};
