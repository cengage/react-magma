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
import {
  LocalPizzaIcon,
  LunchDiningIcon,
  MenuIcon,
  RestaurantMenuIcon,
  SettingsIcon,
} from 'react-magma-icons';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Paragraph, Spacer } from '../..';
import { ButtonGroup } from '../ButtonGroup';
import { DropdownExpandableMenuButton } from './DropdownExpandableMenuButton';
import { DropdownExpandableMenuItem } from './DropdownExpandableMenuItem';
import { DropdownExpandableMenuListItem } from './DropdownExpandableMenuListItem';
import { DropdownExpandableMenuGroup } from './DropdownExpandableMenuGroup';
import { DropdownExpandableMenuPanel } from './DropdownExpandableMenuPanel';

const Template: Story<DropdownProps> = args => (
  <div style={{ margin: '150px auto', textAlign: 'center' }}>
    <Dropdown {...args}>
      <DropdownButton>Basic Dropdown</DropdownButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
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
    onClose: {
      action: 'onClose',
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
  <div style={{ margin: '150px auto', textAlign: 'center' }}>
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

export const NoItems = args => {
  return (
    <ButtonGroup>
      <Dropdown width="500px" {...args} testId="dropdown">
        <DropdownButton>Dropdown without items</DropdownButton>
        <DropdownContent style={{ padding: '12px' }}>
          <>
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ flex: '1 1 auto' }}>
                <Paragraph noMargins isInverse={args.isInverse}>
                  Current take: 1 of 3
                </Paragraph>
              </span>
              <span style={{ flex: '0 0 auto' }}>
                <Paragraph noMargins isInverse={args.isInverse}>
                  Points possible: 10
                </Paragraph>
              </span>
            </span>
            <Paragraph noMargins isInverse={args.isInverse}>
              Grade uses: Best attempt
            </Paragraph>
            <Spacer size={12} />
            <DropdownDivider />
            <Spacer size={12} />
            <Paragraph noMargins isInverse={args.isInverse}>
              Credit/No Credit Activity
            </Paragraph>
            In this activity you must achieve 80% or higher to receive credit
            <Spacer size={12} />
          </>
        </DropdownContent>
      </Dropdown>
      <Dropdown width="500px" {...args}>
        <DropdownButton>Dropdown without items, with button</DropdownButton>
        <DropdownContent style={{ padding: '12px' }}>
          <>
            <Paragraph noMargins isInverse={args.isInverse}>
              Bacon ipsum dolor amet capicola turkey chicken cupim pastrami pork
              spare ribs shankle ball tip. Shank doner burgdoggen tri-tip corned
              beef meatloaf pig ground round. Ball tip t-bone cow chicken.{' '}
            </Paragraph>
            <Button isInverse={args.isInverse}>Foo</Button>
          </>
        </DropdownContent>
      </Dropdown>
    </ButtonGroup>
  );
};

export const ExpandableItems = args => {
  return (
    <Dropdown {...args}>
      <DropdownButton>Expandable Items Dropdown</DropdownButton>
      <DropdownContent>
        <DropdownExpandableMenuGroup>
          <DropdownExpandableMenuItem>
            <DropdownExpandableMenuButton>Pasta</DropdownExpandableMenuButton>
            <DropdownExpandableMenuPanel>
              <DropdownExpandableMenuListItem>
                Fresh
              </DropdownExpandableMenuListItem>
              <DropdownExpandableMenuListItem>
                Processed
              </DropdownExpandableMenuListItem>
            </DropdownExpandableMenuPanel>
          </DropdownExpandableMenuItem>
          <DropdownExpandableMenuItem>
            <DropdownExpandableMenuButton>
              Prosciutto
            </DropdownExpandableMenuButton>
            <DropdownExpandableMenuPanel>
              <DropdownExpandableMenuListItem>
                Domestic
              </DropdownExpandableMenuListItem>
              <DropdownExpandableMenuListItem>
                Speck
              </DropdownExpandableMenuListItem>
            </DropdownExpandableMenuPanel>
          </DropdownExpandableMenuItem>
        </DropdownExpandableMenuGroup>
      </DropdownContent>
    </Dropdown>
  );
};

export const ExpandableItemsWithIcons = args => {
  return (
    <Dropdown {...args} width={220}>
      <DropdownButton>Expandable Items Dropdown</DropdownButton>
      <DropdownContent>
        <DropdownExpandableMenuGroup isMulti={false} defaultIndex={0}>
          <DropdownExpandableMenuItem>
            <DropdownExpandableMenuButton icon={<RestaurantMenuIcon />}>
              Longer title area breaking lines within the
              DropdownExpandableMenuButton component
            </DropdownExpandableMenuButton>
            <DropdownExpandableMenuPanel>
              <DropdownExpandableMenuListItem disabled>
                Fresh
              </DropdownExpandableMenuListItem>
              <DropdownExpandableMenuListItem>
                Processed
              </DropdownExpandableMenuListItem>
            </DropdownExpandableMenuPanel>
          </DropdownExpandableMenuItem>
          <DropdownExpandableMenuItem disabled>
            <DropdownExpandableMenuButton icon={<LunchDiningIcon />}>
              Prosciutto
            </DropdownExpandableMenuButton>
            <DropdownExpandableMenuPanel>
              <DropdownExpandableMenuListItem>
                Domestic
              </DropdownExpandableMenuListItem>
              <DropdownExpandableMenuListItem>
                Speck
              </DropdownExpandableMenuListItem>
            </DropdownExpandableMenuPanel>
          </DropdownExpandableMenuItem>
        </DropdownExpandableMenuGroup>
        <DropdownDivider />
        <DropdownMenuItem icon={<LocalPizzaIcon />}>Pizza</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  );
};

export const ExpandableItemsWithIconsAndConsoleWarning = args => {
  return (
    <Dropdown {...args} width={220}>
      <DropdownButton>Expandable Items Dropdown</DropdownButton>
      <DropdownContent>
        <DropdownExpandableMenuGroup isMulti={false} defaultIndex={1}>
          <DropdownExpandableMenuItem>
            <DropdownExpandableMenuButton>Pasta</DropdownExpandableMenuButton>
            <DropdownExpandableMenuPanel>
              <DropdownExpandableMenuListItem>
                Fresh
              </DropdownExpandableMenuListItem>
              <DropdownExpandableMenuListItem>
                Processed
              </DropdownExpandableMenuListItem>
            </DropdownExpandableMenuPanel>
          </DropdownExpandableMenuItem>
          <DropdownExpandableMenuItem>
            <DropdownExpandableMenuButton icon={<LunchDiningIcon />}>
              Prosciutto
            </DropdownExpandableMenuButton>
            <DropdownExpandableMenuPanel>
              <DropdownExpandableMenuListItem>
                Domestic
              </DropdownExpandableMenuListItem>
              <DropdownExpandableMenuListItem>
                Speck
              </DropdownExpandableMenuListItem>
              <DropdownExpandableMenuGroup>
                <DropdownExpandableMenuItem>
                  <DropdownExpandableMenuButton icon={<RestaurantMenuIcon />}>
                    Pasta
                  </DropdownExpandableMenuButton>
                  <DropdownExpandableMenuPanel>
                    <DropdownExpandableMenuListItem>
                      Fresh
                    </DropdownExpandableMenuListItem>
                    <DropdownExpandableMenuListItem>
                      Processed
                    </DropdownExpandableMenuListItem>
                  </DropdownExpandableMenuPanel>
                </DropdownExpandableMenuItem>
                <DropdownExpandableMenuItem>
                  <DropdownExpandableMenuButton icon={<LunchDiningIcon />}>
                    Prosciutto
                  </DropdownExpandableMenuButton>
                  <DropdownExpandableMenuPanel>
                    <DropdownExpandableMenuListItem>
                      Domestic
                    </DropdownExpandableMenuListItem>
                    <DropdownExpandableMenuListItem>
                      Speck
                    </DropdownExpandableMenuListItem>
                  </DropdownExpandableMenuPanel>
                </DropdownExpandableMenuItem>
              </DropdownExpandableMenuGroup>
            </DropdownExpandableMenuPanel>
          </DropdownExpandableMenuItem>
        </DropdownExpandableMenuGroup>
        <DropdownDivider />
        <DropdownMenuItem icon={<LocalPizzaIcon />}>Pizza</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  );
};
