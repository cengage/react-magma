import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CengageLogo, Header, HeaderProps } from './';
import { PersonIcon, SettingsIcon, NotificationsIcon } from 'react-magma-icons';
import {
  AppBarPosition,
  Badge,
  ButtonVariant,
  IconButton,
  magma,
} from 'react-magma-dom';

const meta: Meta = {
  title: 'Patterns/Header',
  component: Header,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    position: {
      control: {
        type: 'select',
        options: AppBarPosition,
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HeaderProps> = args => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  isCompact: false,
  isInverse: false,
  logo: <strong>LOGO GOES HERE</strong>,
};

export const Logo = Template.bind({});

Logo.args = {
  ...Default.args,
  logo: <CengageLogo />,
};

export const CallToAction = Template.bind({});

CallToAction.args = {
  ...Default.args,
  callToActionProps: {
    children: 'Enter an Access Code',
    styledAs: 'Button',
    target: '_blank',
    to: '#',
  },
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

export const IconButtonsAsChildren = Template.bind({});

IconButtonsAsChildren.args = {
  ...Default.args,
  isInverse: true,
  children: (
    <>
      <IconButton
        aria-label="Settings"
        icon={<SettingsIcon />}
        isInverse
        onClick={() => {}}
        variant={ButtonVariant.link}
      />
      <IconButton
        aria-label="Notifications"
        icon={<NotificationsIcon />}
        isInverse
        onClick={() => {}}
        variant={ButtonVariant.link}
      />
      <IconButton
        aria-label="Person"
        icon={<PersonIcon />}
        isInverse
        onClick={() => {}}
        variant={ButtonVariant.link}
      />
    </>
  ),
};

export const Everything = Template.bind({});

Everything.args = {
  ...Default.args,
  breakpoint: magma.breakpoints.large,
  callToActionProps: {
    children: 'Enter an Access Code',
    to: '#',
  },
  children: (
    <>
      <nav>
        <IconButton
          aria-label="Settings"
          icon={<SettingsIcon />}
          onClick={() => {}}
          variant={ButtonVariant.link}
        />
        <IconButton
          aria-label="Notifications"
          icon={<NotificationsIcon />}
          onClick={() => {}}
          variant={ButtonVariant.link}
        />
        <IconButton
          aria-label="Person"
          icon={<PersonIcon />}
          onClick={() => {}}
          variant={ButtonVariant.link}
        />
      </nav>
    </>
  ),
  isCompact: true,
  onMenuButtonClick: () => {},
  searchProps: { onSearch: () => {}, placeholder: 'Search our catalog' },
};

export const EverythingInverse = Template.bind({});

EverythingInverse.args = {
  ...Default.args,
  breakpoint: magma.breakpoints.large,
  callToActionProps: {
    children: 'Enter an Access Code',
    to: '#',
  },
  children: (
    <>
      <nav>
        <IconButton
          aria-label="Settings"
          icon={<SettingsIcon />}
          onClick={() => {}}
          variant={ButtonVariant.link}
        />
        <IconButton
          aria-label="Notifications"
          icon={<NotificationsIcon />}
          onClick={() => {}}
          variant={ButtonVariant.link}
        />
        <IconButton
          aria-label="Person"
          icon={<PersonIcon />}
          onClick={() => {}}
          variant={ButtonVariant.link}
        />
      </nav>
    </>
  ),
  isCompact: true,
  isInverse: true,
  onMenuButtonClick: () => {},
  searchProps: { onSearch: () => {}, placeholder: 'Search our catalog' },
};
