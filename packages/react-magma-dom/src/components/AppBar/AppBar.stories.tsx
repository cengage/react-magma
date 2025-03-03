import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import { ImageIcon, FavoriteIcon, WorkIcon } from 'react-magma-icons';

import { magma } from '../../theme/magma';
import { NavTabs, NavTab } from '../NavTabs';
import { Paragraph } from '../Paragraph';
import { Search } from '../Search';
import { SkipLink } from '../SkipLink';
import { SkipLinkContent } from '../SkipLinkContent';
import { Spacer } from '../Spacer';
import { TabsIconPosition } from '../Tabs';

import { AppBar, AppBarProps, AppBarPosition } from './index';

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

export const WithSkipLink = () => {
  return (
    <div style={{ height: '200px', overflow: 'auto', position: 'relative' }}>
      <AppBar isInverse position={AppBarPosition.sticky}>
        AppBar content
      </AppBar>
      <SkipLink to="#last-one" buttonText="Skip to the end!" />

      <Paragraph>
        Peel the onion peel the onion, so the horse is out of the barn per my
        previous email, nor draw a line in the sand. I just wanted to give you a
        heads-up drink from the firehose, game plan back-end of third quarter
        viral engagement. Eat our own dog food driving the initiative forward
        tribal knowledge increase the pipelines, but run it up the flag pole.
      </Paragraph>
      <SkipLinkContent>
        <Paragraph id="last-one">
          Turn the crank regroup can we align on lunch orders, so regroup, yet
          the last person we talked to said this would be ready, for this vendor
          is incompetent , or pipeline. We&apos;ve bootstrapped the model
          zeitgeist, so let&apos;s schedule a standup during the sprint to
          review our kpis, so not the long pole in my tent we&apos;re ahead of
          the curve on that one, and we&apos;re ahead of the curve on that one.
        </Paragraph>
      </SkipLinkContent>
    </div>
  );
};
