import React from 'react';
import {
  Dropdown,
  DropdownProps,
  DropdownDropDirection,
  DropdownAlignment,
} from './index';
import { DropdownButton } from './DropdownButton';
import { DropdownContent } from './DropdownContent';
import { DropdownMenuItem } from './DropdownMenuItem';
import { ButtonSize } from '../Button';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<DropdownProps> = args => (
  <Dropdown {...args}>
    <DropdownButton>Basic Dropdown</DropdownButton>
    <DropdownContent>
      <DropdownMenuItem>Menu item 1</DropdownMenuItem>
      <DropdownMenuItem>Menu item number two</DropdownMenuItem>
    </DropdownContent>
  </Dropdown>
);

export default {
  title: 'Dropdown',
  component: Dropdown,
  argTypes: {
    dropDirection: {
      control: {
        type: 'select',
        options: DropdownDropDirection,
      },
    },
    alignment: {
      control: {
        type: 'select',
        options: DropdownAlignment,
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {};

const LargeTemplate: Story<DropdownProps> = args => (
  <Dropdown {...args}>
    <DropdownButton size={ButtonSize.large}>Basic Dropdown</DropdownButton>
    <DropdownContent>
      <DropdownMenuItem>Menu item 1</DropdownMenuItem>
      <DropdownMenuItem>Menu item number two</DropdownMenuItem>
    </DropdownContent>
  </Dropdown>
);

export const LargeButton = LargeTemplate.bind({});
LargeButton.args = { ...Default.args };

const SmallTemplate: Story<DropdownProps> = args => (
  <Dropdown {...args}>
    <DropdownButton size={ButtonSize.small}>Basic Dropdown</DropdownButton>
    <DropdownContent>
      <DropdownMenuItem>Menu item 1</DropdownMenuItem>
      <DropdownMenuItem>Menu item number two</DropdownMenuItem>
    </DropdownContent>
  </Dropdown>
);

export const SmallButton = SmallTemplate.bind({});
SmallButton.args = { ...Default.args };
