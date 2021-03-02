import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CengageLogo, Header, HeaderProps } from './';
import { PersonIcon, SettingsIcon, NotificationsIcon } from 'react-magma-icons';
import { Badge } from 'react-magma-dom';

const meta: Meta = {
  title: 'Patterns/Header',
  component: Header,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HeaderProps> = args => <Header {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  callToAction: '',
  isCompact: false,
  isInverse: false,
  searchProps: {},
};

export const Logo = Template.bind({});

Logo.args = {
  ...Default.args,
  logo: <CengageLogo />,
};

export const IconButtons = Template.bind({});

IconButtons.args = {
  ...Default.args,
  iconButtons: [
    { icon: <SettingsIcon />, ariaLabel: 'Settings', onClick: () => {} },
    {
      icon: <NotificationsIcon />,
      ariaLabel: 'Notifications',
      onClick: () => {},
    },
    { icon: <PersonIcon />, ariaLabel: 'UserMenu', onClick: () => {} },
  ],
};

export const CallToAction = Template.bind({});

CallToAction.args = {
  ...Default.args,
  callToAction: 'Enter an Access Code',
};

export const Search = Template.bind({});

Search.args = {
  ...Default.args,
  searchProps: { onSearch: () => {} },
};

export const CustomChildren = Template.bind({});

CustomChildren.args = {
  ...Default.args,
  children: <Badge>Custom children</Badge>,
};

export const Everything = Template.bind({});

Everything.args = {
  ...Default.args,
  callToAction: 'Enter an Access Code',
  searchProps: { onSearch: () => {} },
  iconButtons: [
    { icon: <SettingsIcon />, ariaLabel: 'Settings', onClick: () => {} },
    {
      icon: <NotificationsIcon />,
      ariaLabel: 'Notifications',
      onClick: () => {},
    },
    { icon: <PersonIcon />, ariaLabel: 'UserMenu', onClick: () => {} },
  ],
  isCompact: true,
  isInverse: true,
};
