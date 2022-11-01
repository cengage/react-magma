import React from 'react';
import {
  Dropdown,
  DropdownProps,
  DropdownDropDirection,
  DropdownAlignment,
} from './index';
import { DropdownButton } from './DropdownButton';
import { DropdownContent } from './DropdownContent';
import { DropdownDivider } from './DropdownDivider';
import { DropdownMenuGroup } from './DropdownMenuGroup';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuNavItem } from './DropdownMenuNavItem';
import { DropdownSplitButton } from './DropdownSplitButton';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import { Card, CardBody } from '../Card';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';
import { PasswordInput } from '../PasswordInput';
import { SettingsIcon, MenuIcon } from 'react-magma-icons';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Spacer, SpacerAxis } from '../Spacer';
import { ButtonGroup } from '../ButtonGroup';

const Template: Story<DropdownProps> = args => (
  <div style={{ textAlign: 'center' }}>
    <Dropdown {...args}>
      <DropdownButton>Basic Dropdown</DropdownButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two two two </DropdownMenuItem>
        <DropdownMenuItem disabled>Disabled item</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  </div>
);

const HeaderIconTemplate: Story<DropdownProps> = args => (
  <div style={{ margin: '150px auto', textAlign: 'center' }}>
    <Dropdown {...args}>
      <DropdownButton>Full Content Dropdown</DropdownButton>
      <DropdownContent>
        <DropdownMenuGroup header="Section title A">
          <DropdownMenuItem>Menu item 1</DropdownMenuItem>
          <DropdownMenuItem>Menu item 2</DropdownMenuItem>
          <DropdownMenuItem disabled>Menu item disabled</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownDivider />
        <DropdownMenuGroup header="Section title B">
          <DropdownMenuItem icon={<MenuIcon />}>Menu item 3</DropdownMenuItem>
          <DropdownMenuItem icon={<SettingsIcon />}>
            Menu item 4
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownDivider />
        <DropdownMenuGroup>
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownContent>
    </Dropdown>
  </div>
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
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {};

export const HeaderAndIcons = HeaderIconTemplate.bind({});
Default.args = {};

export const OnClickOutside = Template.bind({});
OnClickOutside.args = {
  ...Default.args,
};

const AlignmentTemplate: Story<DropdownProps> = args => (
  <div style={{ margin: '150px' }}>
    <ButtonGroup>
      <Dropdown
        {...args}
        dropDirection={DropdownDropDirection.right}
        activeIndex={1}
      >
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
    </ButtonGroup>
    <br />
    <ButtonGroup>
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
    </ButtonGroup>
  </div>
);

export const AlignmentButton = AlignmentTemplate.bind({});
AlignmentButton.args = { ...Default.args };

const LargeTemplate: Story<DropdownProps> = args => (
  <div style={{ margin: '150px auto', textAlign: 'center' }}>
    <Dropdown {...args}>
      <DropdownButton size={ButtonSize.large}>Basic Dropdown</DropdownButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  </div>
);

export const LargeButton = LargeTemplate.bind({});
LargeButton.args = { ...Default.args };

const CustomTemplate: Story<DropdownProps> = args => (
  <div style={{ margin: '150px auto', textAlign: 'center' }}>
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
    <Dropdown {...args}>
      <DropdownButton
        aria-label="Extra icon example"
        size={ButtonSize.large}
        icon={<MenuIcon />}
      />
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  </div>
);

export const CustomIconButton = CustomTemplate.bind({});
CustomIconButton.args = { ...Default.args };

const SmallTemplate: Story<DropdownProps> = args => (
  <div style={{ margin: '150px auto', textAlign: 'center' }}>
    <Dropdown {...args}>
      <DropdownButton size={ButtonSize.small}>Basic Dropdown</DropdownButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  </div>
);

export const SmallButton = SmallTemplate.bind({});
SmallButton.args = { ...Default.args };

const SplitTemplate: Story<DropdownProps> = args => (
  <div style={{ margin: '150px auto', textAlign: 'center' }}>
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
    <br />
    <Dropdown {...args}>
      <DropdownSplitButton
        aria-label="Split"
        size={ButtonSize.medium}
        variant={ButtonVariant.solid}
        color={ButtonColor.secondary}
      >
        Split Dropdown
      </DropdownSplitButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
    <br />
    <br />
    <Dropdown {...args}>
      <DropdownSplitButton
        aria-label="Split"
        size={ButtonSize.medium}
        variant={ButtonVariant.solid}
        color={ButtonColor.danger}
      >
        Split Dropdown
      </DropdownSplitButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
    <br />
    <br />
    <Dropdown {...args}>
      <DropdownSplitButton
        aria-label="Split"
        size={ButtonSize.medium}
        variant={ButtonVariant.solid}
        color={ButtonColor.subtle}
      >
        Split Dropdown
      </DropdownSplitButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
    <br />
    <br />
    <Dropdown isInverse>
      <DropdownSplitButton
        aria-label="Split"
        size={ButtonSize.medium}
        variant={ButtonVariant.solid}
      >
        Split Dropdown Inverse
      </DropdownSplitButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  </div>
);
export const SplitButton = SplitTemplate.bind({});
SplitButton.args = { ...Default.args };

const LinkMenuTemplate: Story<DropdownProps> = args => (
  <div style={{ margin: '150px auto', textAlign: 'center' }}>
    <Dropdown {...args}>
      <DropdownButton>Dropdown of links</DropdownButton>
      <DropdownContent>
        <DropdownMenuNavItem
          icon={<SettingsIcon />}
          to="http://www.google.com"
          target="_blank"
        >
          Google
        </DropdownMenuNavItem>
        <DropdownMenuNavItem
          icon={<MenuIcon />}
          to="http://www.cengage.com"
          target="_blank"
        >
          Cengage
        </DropdownMenuNavItem>
      </DropdownContent>
    </Dropdown>
  </div>
);

export const LinkMenu = LinkMenuTemplate.bind({});
LinkMenu.args = { ...Default.args };

const FormTemplate: Story<DropdownProps> = args => (
  <div style={{ margin: '150px auto', textAlign: 'center' }}>
    <Dropdown {...args}>
      <DropdownButton>Dropdown with form</DropdownButton>
      <DropdownContent>
        <form style={{ margin: 0, padding: '16px' }}>
          <Input labelText="Email Address" />
          <PasswordInput labelText="Password" />
          <Checkbox labelText="Remember me" />
          <div style={{ textAlign: 'center' }}>
            <p>
              By signing in, you agree to our <a href="#terms">Terms of use</a>.
            </p>
            <Button isFullWidth>Sign In</Button>
            <p>
              <a href="#password">Forgot password?</a>
            </p>
          </div>
        </form>
      </DropdownContent>
    </Dropdown>
  </div>
);

export const Form = FormTemplate.bind({});
Form.args = { ...Default.args };

export const Inverse = HeaderIconTemplate.bind({});
Inverse.args = {
  ...Default.args,
  isInverse: true,
};

Inverse.decorators = [
  Story => (
    <Card isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];

export const Popper = args => {
  const sampleDropdown = (
    <Dropdown {...args}>
      <DropdownButton>Basic Dropdown</DropdownButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two two two </DropdownMenuItem>
        <DropdownMenuItem disabled>Disabled item</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  );

  return (
    <>
    <br/><br/>
      <ButtonGroup>
        <Dropdown>
          <DropdownButton>One</DropdownButton>
          <DropdownContent>
            <DropdownMenuItem>Lorem ipsum dolor</DropdownMenuItem>
            <DropdownMenuItem>Consectetur</DropdownMenuItem>
            <DropdownMenuItem>Adipiscing elit</DropdownMenuItem>
            <DropdownMenuItem>Sed non lacus a ex pellentesque</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
         <Dropdown>
          <DropdownButton>Three</DropdownButton>
          <DropdownContent>
            <DropdownMenuItem>Integer</DropdownMenuItem>
            <DropdownMenuItem>Euismod</DropdownMenuItem>
            <DropdownMenuItem>Vivamus</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
        <Dropdown>
          <DropdownButton>Three</DropdownButton>
          <DropdownContent>
            <DropdownMenuItem>Integer</DropdownMenuItem>
            <DropdownMenuItem>Euismod</DropdownMenuItem>
            <DropdownMenuItem>Vivamus</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
        <Dropdown>
          <DropdownButton>Three</DropdownButton>
          <DropdownContent>
            <DropdownMenuItem>Integer</DropdownMenuItem>
            <DropdownMenuItem>Euismod</DropdownMenuItem>
            <DropdownMenuItem>Vivamus</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
        <Dropdown>
          <DropdownButton>Three</DropdownButton>
          <DropdownContent>
            <DropdownMenuItem>Integer</DropdownMenuItem>
            <DropdownMenuItem>Euismod</DropdownMenuItem>
            <DropdownMenuItem>Vivamus</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
        <Dropdown>
          <DropdownButton>Three</DropdownButton>
          <DropdownContent>
            <DropdownMenuItem>Integer</DropdownMenuItem>
            <DropdownMenuItem>Euismod</DropdownMenuItem>
            <DropdownMenuItem>Vivamus</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
        <Dropdown>
          <DropdownButton>Two</DropdownButton>
          <DropdownContent>
            <DropdownMenuItem>Integer vestibulum sapien in elementum bibendum</DropdownMenuItem>
            <DropdownMenuItem>Euismod</DropdownMenuItem>
            <DropdownMenuItem>Vivamus ut elit in justo</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
       
      </ButtonGroup>
      <br />
      <br />
      <br />
      Vertical overflow
      <div
        style={{
          width: '400px',
          height: '400px',
          border: '2px solid black',
          overflowY: 'scroll',
        }}
      >
        <Spacer size={300} axis={SpacerAxis.vertical} />
        {sampleDropdown}
        <Spacer size={300} axis={SpacerAxis.vertical} />
      </div>
      Horizontal overflow
      <div
        style={{
          width: '800px',
          height: '200px',
          border: '2px solid black',
          overflowX: 'scroll',
          paddingLeft: '250px',
        }}
      >
        <Spacer size={900} axis={SpacerAxis.horizontal} />
        {sampleDropdown}
      </div>
      Both directions overflow
      <div
        style={{
          width: '800px',
          height: '400px',
          border: '2px solid black',
          overflow: 'scroll',
          paddingLeft: '200px',
        }}
      >
        <Spacer size={1000} axis={SpacerAxis.horizontal} />
        <Spacer size={300} axis={SpacerAxis.vertical} />
        {sampleDropdown}
        <Spacer size={300} axis={SpacerAxis.vertical} />
      </div>
    </>
  );
};

Popper.args = {
  ...Default.args,
};
