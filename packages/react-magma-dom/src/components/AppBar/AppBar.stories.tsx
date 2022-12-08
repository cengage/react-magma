import React from 'react';
import { AppBar, AppBarProps, AppBarPosition } from './index';
import { NavTabs, NavTab } from '../NavTabs';
import { Search } from '../Search';
import { Spacer } from '../Spacer';
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
  argTypes: {
    position: {
      control: {
        type: 'select',
        options: AppBarPosition,
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  children: 'Simple AppBar',
  isCompact: false,
  isInverse: false,
};

const TabsTemplate: Story<AppBarProps> = args => (
  <AppBar
    style={{ display: 'flex', justifyContent: 'space-between', gap: '48px' }}
    {...args}
  >
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        whiteSpace: 'nowrap',
      }}
    >
      <ImageIcon size={args.isCompact ? 24 : 40} />
      <Spacer size={magma.spaceScale.spacing03} />
      <strong>LOGO</strong>
    </div>
    <div style={{ flex: '0 0 auto' }}>
      <Search onSearch={() => {}} placeholder="Search for content..." />
    </div>
    <div style={{ flex: '1 1 auto' }}>
      <NavTabs
        aria-label="Navigation"
        backgroundColor="transparent"
        iconPosition={TabsIconPosition.left}
      >
        <NavTab icon={<FavoriteIcon />} isActive to="#">
          Favorites
        </NavTab>
        <NavTab icon={<WorkIcon />} to="#">
          Workspace
        </NavTab>
      </NavTabs>
    </div>
  </AppBar>
);

export const Tabs = TabsTemplate.bind({});
Tabs.args = {
  ...Default.args,
  children: null,
};
