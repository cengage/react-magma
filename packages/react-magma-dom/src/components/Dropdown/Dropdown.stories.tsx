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
import { DropdownSplitButton } from './DropdownSplitButton';
import { ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import { SettingsIcon, MenuIcon } from 'react-magma-icons';
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

const AlignmentTemplate: Story<DropdownProps> = args => (
  <>
    <Dropdown {...args} dropDirection={DropdownDropDirection.right}>
      <DropdownButton>Right Aligned Dropdown</DropdownButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
    <Dropdown {...args} dropDirection={DropdownDropDirection.left}>
      <DropdownButton>Left Aligned Dropdown</DropdownButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
    <br />
    <Dropdown {...args} dropDirection={DropdownDropDirection.up}>
      <DropdownButton>Top Aligned Dropdown</DropdownButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
    <Dropdown {...args} dropDirection={DropdownDropDirection.down}>
      <DropdownButton>Bottom Aligned Dropdown</DropdownButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  </>
);

export const AlignmentButton = AlignmentTemplate.bind({});
AlignmentButton.args = { ...Default.args };

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

const CustomTemplate: Story<DropdownProps> = args => (
  <>
    <Dropdown {...args}>
      <DropdownButton
        aria-label="Extra icon example"
        color={ButtonColor.secondary}
        size={ButtonSize.large}
        variant={ButtonVariant.link}
        icon={<SettingsIcon />}
      ></DropdownButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
    <br />
    <Dropdown>
      <DropdownButton
        aria-label="Extra icon example"
        color={ButtonColor.success}
        size={ButtonSize.large}
        icon={<MenuIcon />}
      />
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  </>
);

export const CustomIconButton = CustomTemplate.bind({});
CustomIconButton.args = { ...Default.args };

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

const SplitTemplate: Story<DropdownProps> = args => (
  <>
    <Dropdown {...args}>
      <DropdownSplitButton aria-label="Split" size={ButtonSize.medium}>
        Split Dropdown
      </DropdownSplitButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
    <br />
    <Dropdown {...args}>
      <DropdownSplitButton
        aria-label="Split"
        size={ButtonSize.medium}
        variant={ButtonVariant.outline}
        color={ButtonColor.danger}
      >
        Split Dropdown
      </DropdownSplitButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  </>
);

export const SplitButton = SplitTemplate.bind({});
SplitButton.args = { ...Default.args };
