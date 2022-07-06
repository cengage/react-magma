import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import {
  ButtonGroup,
  ButtonGroupOrientation,
  ButtonGroupAlignment,
  ButtonGroupProps,
} from '.';
import {
  Button,
  ButtonColor,
  ButtonVariant,
  ButtonSize,
  ButtonTextTransform,
} from '../Button';
import { IconButton } from '../IconButton';
import {
  FavoriteIcon,
  SettingsIcon,
  NotificationsIcon,
  ExpandMoreIcon,
  AsteriskIcon,
} from 'react-magma-icons';
import {
  BreakpointsContainer,
  Breakpoint,
  BreakpointScreenSize,
} from '../BreakpointsContainer';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownMenuItem,
  DropdownSplitButton,
} from '../Dropdown';

const Template: Story<ButtonGroupProps> = args => (
  <>
    <ButtonGroup {...args}>
      <Button>Cancel</Button>
      <Button color={ButtonColor.primary}>Save</Button>
    </ButtonGroup>
    <br />
    <br />
    <ButtonGroup {...args}>
      <Button>Rate Now</Button>
      <Button>No, Thanks</Button>
      <Button>Remind Me Later</Button>
    </ButtonGroup>
    <br />
    <br />
    <ButtonGroup {...args}>
      <IconButton icon={<FavoriteIcon />}>Favorites</IconButton>
      <IconButton icon={<AsteriskIcon />}> Star</IconButton>
      <IconButton icon={<SettingsIcon />}>Settings</IconButton>
      <IconButton icon={<NotificationsIcon />}>Notifications</IconButton>
      <IconButton icon={<ExpandMoreIcon />}>More</IconButton>
    </ButtonGroup>
    <br />
    <br />
    <ButtonGroup {...args}>
      <IconButton icon={<SettingsIcon />} aria-label="Button" />
      <IconButton icon={<NotificationsIcon />} aria-label="Button" />
      <IconButton icon={<ExpandMoreIcon />} aria-label="Button" />
    </ButtonGroup>
  </>
);

export default {
  component: ButtonGroup,
  title: 'ButtonGroup',
  argTypes: {
    noSpace: {
      control: {
        type: 'boolean',
      },
    },
    alignment: {
      control: {
        type: 'select',
        options: ButtonGroupAlignment,
      },
    },
    orientation: {
      control: {
        type: 'select',
        options: ButtonGroupOrientation,
      },
    },
    color: {
      control: {
        type: 'select',
        options: ButtonColor,
      },
    },
    size: {
      control: {
        type: 'select',
        options: ButtonSize,
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ButtonVariant,
      },
    },
    textTransform: {
      control: {
        type: 'select',
        options: ButtonTextTransform,
      },
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  orientation: ButtonGroupOrientation.horizontal,
  noSpace: false,
};

export const SmallBreakpoint = args => {
  return (
    <BreakpointsContainer>
      <Breakpoint screenSize={BreakpointScreenSize.xs}>
        <ButtonGroup {...args} orientation={ButtonGroupOrientation.vertical}>
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>4</Button>
          <Button>5</Button>
        </ButtonGroup>
      </Breakpoint>

      <Breakpoint screenSize={BreakpointScreenSize.small}>
        <ButtonGroup {...args}>
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>4</Button>
          <Button>5</Button>
        </ButtonGroup>
      </Breakpoint>
    </BreakpointsContainer>
  );
};
SmallBreakpoint.args = {
  ...Default.args,
  orientation: ButtonGroupOrientation.horizontal,
  alignment: ButtonGroupAlignment.fill,
};

export const WithDropdowns = args => {
  return (
    <ButtonGroup {...args}>
      <Button>Button</Button>
      <Dropdown>
        <DropdownButton>Foo</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item 1</DropdownMenuItem>
          <DropdownMenuItem>Menu item 2</DropdownMenuItem>
          <DropdownMenuItem>Menu item 3</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
      <Dropdown>
        <DropdownButton>Bar</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item 1</DropdownMenuItem>
          <DropdownMenuItem>Menu item 2</DropdownMenuItem>
          <DropdownMenuItem>Menu item 3</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    </ButtonGroup>
  );
};

export const WithSplitButton = args => {
  return (
    <>
      <ButtonGroup {...args}>
        <Button>Start</Button>
        <Dropdown>
          <DropdownSplitButton onClick={() => {}} aria-label={''}>
            Split Button
          </DropdownSplitButton>
          <DropdownContent>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
        <Button>End</Button>
      </ButtonGroup>
      <br />
      <ButtonGroup {...args}>
        <Button>Start</Button>
        <Dropdown>
          <DropdownSplitButton onClick={() => {}} aria-label={''}>
            Split Button
          </DropdownSplitButton>
          <DropdownContent>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
        <Dropdown>
          <DropdownSplitButton onClick={() => {}} aria-label={''}>
            Split Button
          </DropdownSplitButton>
          <DropdownContent>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
      </ButtonGroup>
      <br />
      <ButtonGroup {...args}>
        <Dropdown>
          <DropdownSplitButton onClick={() => {}} aria-label={''}>
            Split Button 1
          </DropdownSplitButton>
          <DropdownContent>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
        <Dropdown>
          <DropdownSplitButton onClick={() => {}} aria-label={''}>
            Split Button 2
          </DropdownSplitButton>
          <DropdownContent>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
        <Dropdown>
          <DropdownSplitButton onClick={() => {}} aria-label={''}>
            Split Button 3
          </DropdownSplitButton>
          <DropdownContent>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
      </ButtonGroup>
    </>
  );
};
