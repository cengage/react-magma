import React from 'react';

import { Meta, Story } from '@storybook/react/types-6-0';
import { AndroidIcon, EmailIcon, NotificationsIcon } from 'react-magma-icons';

import { NavTab } from './NavTab';
import { magma } from '../../theme/magma';
import { Card } from '../Card';
import {
  TabsAlignment,
  TabsBorderPosition,
  TabsContainer,
  TabsIconPosition,
} from '../Tabs';
import { TabsOrientation, TabsTextTransform } from '../Tabs/shared';

import { NavTabs, NavTabsProps } from '.';

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

const ScrollingTemplate: Story<
  NavTabsProps & { activeIndex: number }
> = args => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      <TabsContainer
        style={{
          maxWidth: '600px',
          height:
            args.orientation === TabsOrientation.vertical ? '300px' : 'auto',
        }}
        activeIndex={args.activeIndex}
      >
        <NavTabs aria-label="Sample Tabs" {...args}>
          {arr.map((item, index) => (
            <NavTab
              to={`#${item}`}
              key={item}
              isActive={index === args.activeIndex}
            >
              {`Link ${item}`}
            </NavTab>
          ))}
        </NavTabs>
      </TabsContainer>
    </div>
  );
};

export const Scrolling = ScrollingTemplate.bind({});
Scrolling.args = {
  ...Default.args,
  orientation: TabsOrientation.vertical,
  activeIndex: 0,
};
