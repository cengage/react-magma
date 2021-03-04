import React from 'react';
import { AppBar, AppBarProps } from './index';
import { NavTabs, NavTab } from '../NavTabs';
import { Search } from '../Search';
import { TabsIconPosition } from '../Tabs';
import { magma } from '../../theme/magma';
import { ImageIcon, FavoriteIcon, WorkIcon } from 'react-magma-icons';
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
    <strong
      style={{
        alignItems: 'center',
        display: 'flex',
        paddingRight: magma.spaceScale.spacing12,
        whiteSpace: 'nowrap',
      }}
    >
      <ImageIcon
        size={args.isCompact ? 24 : 40}
        style={{ marginRight: magma.spaceScale.spacing03 }}
      />
      LOGO
    </strong>
    <Search
      containerStyle={{
        flexShrink: 0,
        marginRight: magma.spaceScale.spacing06,
      }}
      isInverse={args.isInverse}
      onSearch={() => {}}
      placeholder="Search for content..."
    />
    <NavTabs
      aria-label="Navigation"
      backgroundColor="transparent"
      iconPosition={TabsIconPosition.left}
      isInverse={args.isInverse}
    >
      <NavTab icon={<FavoriteIcon />} isActive to="#">
        Favorites
      </NavTab>
      <NavTab icon={<WorkIcon />} to="#">
        Workspace
      </NavTab>
    </NavTabs>
  </AppBar>
);

export const Tabs = TabsTemplate.bind({});
Tabs.args = {
  ...Default.args,
  children: null,
};
