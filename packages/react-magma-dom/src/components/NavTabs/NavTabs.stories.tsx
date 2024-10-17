import React from 'react';
import { NavTabs, NavTabsProps } from '.';
import { NavTab } from './NavTab';
import { Card } from '../Card';
import { magma } from '../../theme/magma';
import { Meta, Story } from '@storybook/react/types-6-0';
import { AndroidIcon, EmailIcon, NotificationsIcon } from 'react-magma-icons';
import { TabsAlignment, TabsBorderPosition, TabsIconPosition } from '../Tabs';
import { TabsOrientation, TabsTextTransform } from '../Tabs/shared';

export default {
  component: NavTabs,
  title: 'NavTabs',
  argTypes: {
    alignment: {
      control: {
        type: 'select',
        options: TabsAlignment,
      },
    },
    borderPosition: {
      control: {
        type: 'select',
        options: TabsBorderPosition,
      },
    },
    iconPosition: {
      control: {
        type: 'select',
        options: TabsIconPosition,
      },
    },
    orientation: {
      control: {
        type: 'select',
        options: TabsOrientation,
      },
    },
    textTransform: {
      control: {
        type: 'select',
        options: TabsTextTransform,
      },
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

const Template: Story<NavTabsProps> = args => {
  return (
    <Card isInverse={args.isInverse}>
      <NavTabs aria-label="Nav Tabs" {...args}>
        <NavTab isActive to="#">
          Current Page
        </NavTab>
        <NavTab to="http://google.com">Link to Google</NavTab>
      </NavTabs>
    </Card>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const IconOnly: Story<NavTabsProps> = args => {
  return (
    <Card isInverse={args.isInverse}>
      <NavTabs aria-label="Icon Only Nav Tabs" {...args}>
        <NavTab aria-label="Email" icon={<EmailIcon />} to="#" isActive />
        <NavTab aria-label="Android" icon={<AndroidIcon />} to="#" />
        <NavTab
          aria-label="Notifications"
          icon={<NotificationsIcon />}
          to="#"
        />
      </NavTabs>
    </Card>
  );
};

export const BackgroundColor: Story<NavTabsProps> = args => {
  return (
    <Card isInverse={args.isInverse}>
      <NavTabs
        aria-label="Nav Tabs"
        backgroundColor={args.isInverse ? '' : magma.colors.neutral200}
        {...args}
      >
        <NavTab isActive to="#">
          Current Page
        </NavTab>
        <NavTab to="http://yahoo.com">Link to Yahoo</NavTab>
      </NavTabs>
    </Card>
  );
};

const InverseTemplate: Story<NavTabsProps> = args => {
  return (
    <Card isInverse={args.isInverse}>
      <NavTabs aria-label="Nav Tabs" {...args}>
        <NavTab isActive to="#">
          Current Page
        </NavTab>
        <NavTab to="http://apple.com">Link to Apple</NavTab>
      </NavTabs>
    </Card>
  );
};
export const Inverse = InverseTemplate.bind({});
Inverse.args = { isInverse: true };

export const CustomTab: Story<NavTabsProps> = args => {
  const Link = ({ to, children, ...rest }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  );
  return (
    <Card isInverse={args.isInverse}>
      <NavTabs aria-label="Sample Custom Component Navigation Tabs" {...args}>
        <NavTab component={<Link to="./">Main page</Link>} />
        <NavTab isActive component={<Link to="./">FAQ</Link>} />
        <NavTab component={<Link to="./">About us</Link>} />
      </NavTabs>
    </Card>
  );
};
