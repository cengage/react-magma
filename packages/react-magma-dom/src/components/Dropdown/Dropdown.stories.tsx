import React from 'react';

import { Meta, StoryFn } from '@storybook/react/types-6-0';
import {
  LocalPizzaIcon,
  LunchDiningIcon,
  MenuIcon,
  ReorderIcon,
  RestaurantMenuIcon,
  SettingsIcon,
  GooglePlusIcon,
} from 'react-magma-icons';

import { DropdownButton } from './DropdownButton';
import { DropdownContent } from './DropdownContent';
import { DropdownDivider } from './DropdownDivider';
import { DropdownExpandableMenuButton } from './DropdownExpandableMenuButton';
import { DropdownExpandableMenuGroup } from './DropdownExpandableMenuGroup';
import { DropdownExpandableMenuItem } from './DropdownExpandableMenuItem';
import { DropdownExpandableMenuListItem } from './DropdownExpandableMenuListItem';
import { DropdownExpandableMenuPanel } from './DropdownExpandableMenuPanel';
import { DropdownMenuGroup } from './DropdownMenuGroup';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuNavItem } from './DropdownMenuNavItem';
import { DropdownSplitButton } from './DropdownSplitButton';
import { ButtonIconPosition, Paragraph, Spacer, SpacerAxis } from '../..';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import {
  ButtonGroup,
  ButtonGroupAlignment,
  ButtonGroupOrientation,
} from '../ButtonGroup';
import { Card, CardBody } from '../Card';

import {
  Dropdown,
  DropdownAlignment,
  DropdownDropDirection,
  DropdownProps,
} from './index';

const Template: StoryFn<DropdownProps> = args => (
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

const HeaderIconTemplate: StoryFn<DropdownProps> = args => (
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

export const Default = {
  render: Template,
  args: {},
};

export const HeaderAndIcons = {
  render: HeaderIconTemplate,
};

export const OnClickOutside = {
  render: Template,

  args: {
    ...Default.args,
  },
};

const AlignmentTemplate: StoryFn<DropdownProps> = args => (
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

export const AlignmentButton = {
  render: AlignmentTemplate,
  args: { ...Default.args },
};

const LargeTemplate: StoryFn<DropdownProps> = args => (
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

export const LargeButton = {
  render: LargeTemplate,
  args: { ...Default.args },
};

const CustomTemplate: StoryFn<DropdownProps> = args => (
  <div style={{ margin: '150px auto', textAlign: 'center' }}>
    <Dropdown {...args}>
      <DropdownButton
        aria-label="Extra icon example"
        color={ButtonColor.secondary}
        size={ButtonSize.large}
        variant={ButtonVariant.link}
        icon={<SettingsIcon />}
      />
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

export const CustomIconButton = {
  render: CustomTemplate,
  args: { ...Default.args },
};

const SmallTemplate: StoryFn<DropdownProps> = args => (
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

export const SmallButton = {
  render: SmallTemplate,
  args: { ...Default.args },
};

const SplitTemplate: StoryFn<DropdownProps> = args => (
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

export const SplitButton = {
  render: SplitTemplate,
  args: { ...Default.args },
};

const LinkMenuTemplate: StoryFn<DropdownProps> = args => (
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
        <DropdownMenuNavItem
          icon={<GooglePlusIcon />}
          to="http://www.google.com"
          target="_blank"
        >
          <div>
            <p style={{ margin: 0 }}>Google</p>
            <p style={{ margin: 0 }}>With</p>
            <p style={{ margin: 0 }}>Some</p>
            <p style={{ margin: 0 }}>Text</p>
          </div>
        </DropdownMenuNavItem>
      </DropdownContent>
    </Dropdown>
  </div>
);

export const LinkMenu = {
  render: LinkMenuTemplate,
  args: { ...Default.args },
};

export const Inverse = {
  render: HeaderIconTemplate,

  args: {
    ...Default.args,
    isInverse: true,
  },

  decorators: [
    Story => (
      <Card isInverse>
        <CardBody>
          <Story />
        </CardBody>
      </Card>
    ),
  ],
};

export const NoItems = {
  render: args => {
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
                Bacon ipsum dolor amet capicola turkey chicken cupim pastrami
                pork spare ribs shankle ball tip. Shank doner burgdoggen tri-tip
                corned beef meatloaf pig ground round. Ball tip t-bone cow
                chicken.{' '}
              </Paragraph>
              <Button isInverse={args.isInverse}>Foo</Button>
            </>
          </DropdownContent>
        </Dropdown>
      </ButtonGroup>
    );
  },
};

export const ExpandableItems = {
  render: args => {
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
  },
};

export const ExpandableItemsWithIcons = {
  render: args => {
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
  },
};

export const ExpandableItemsWithIconsAndConsoleWarning = {
  render: args => {
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
  },
};

export const FlippedItems = {
  render: args => {
    const sampleDropdown = (
      dropDirection: DropdownDropDirection,
      buttonName: string
    ) => (
      <Dropdown {...args} dropDirection={dropDirection}>
        <DropdownButton>{buttonName}</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item 1</DropdownMenuItem>
          <DropdownMenuItem>Menu item number two </DropdownMenuItem>
          <DropdownMenuItem disabled>Disabled item</DropdownMenuItem>
          <DropdownMenuItem>Menu item number three </DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    return (
      <>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Paragraph>Vertical Overflow Down to Up</Paragraph>
            <div
              style={{
                width: '400px',
                height: '400px',
                border: '2px solid black',
                overflowY: 'scroll',
              }}
            >
              <Spacer size={300} axis={SpacerAxis.vertical} />
              <div style={{ textAlign: 'center' }}>
                {sampleDropdown(DropdownDropDirection.down, 'down to up')}
              </div>
              <Spacer size={300} axis={SpacerAxis.vertical} />
            </div>
          </div>

          <div style={{ flex: 2 }}>
            <Paragraph>Horizontal Overflow Right to Left</Paragraph>
            <div
              style={{
                width: '600px',
                height: '200px',
                border: '2px solid black',
                overflowX: 'scroll',
                paddingLeft: '250px',
              }}
            >
              <Spacer size={900} axis={SpacerAxis.horizontal} />
              {sampleDropdown(DropdownDropDirection.right, 'right to left')}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Paragraph>Vertical Overflow Up to Down</Paragraph>
            <div
              style={{
                width: '400px',
                height: '400px',
                border: '2px solid black',
                overflowY: 'scroll',
              }}
            >
              <Spacer size={300} axis={SpacerAxis.vertical} />
              <div style={{ textAlign: 'center' }}>
                {sampleDropdown(DropdownDropDirection.up, 'up to down')}
              </div>
              <Spacer size={300} axis={SpacerAxis.vertical} />
            </div>
          </div>

          <div style={{ flex: 2 }}>
            <Paragraph>Horizontal Overflow Left to Right</Paragraph>
            <div
              style={{
                width: '600px',
                height: '200px',
                border: '2px solid black',
                overflowX: 'scroll',
                paddingLeft: '250px',
              }}
            >
              <Spacer size={900} axis={SpacerAxis.horizontal} />
              {sampleDropdown(DropdownDropDirection.left, 'left to right')}
            </div>
          </div>
        </div>
      </>
    );
  },
};

const CustomRefTemplate: StoryFn<DropdownProps> = args => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const splitButtonRef = React.useRef<HTMLButtonElement>(null);

  function handleClose(event: React.SyntheticEvent) {
    buttonRef.current?.focus();
  }

  function handleSplitClose(event: React.SyntheticEvent) {
    splitButtonRef.current?.focus();
  }

  return (
    <div
      style={{
        margin: '150px auto',
        textAlign: 'center',
        gap: '20px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Dropdown {...args} onClose={handleClose}>
        <DropdownButton ref={buttonRef}>Basic Dropdown</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item 1</DropdownMenuItem>
          <DropdownMenuItem>Menu item number two</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
      <Dropdown {...args} onClose={handleSplitClose}>
        <DropdownSplitButton aria-label="Split" ref={splitButtonRef}>
          Split Dropdown
        </DropdownSplitButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item 1</DropdownMenuItem>
          <DropdownMenuItem>Menu item number two</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    </div>
  );
};

export const CustomRef = {
  render: CustomRefTemplate,

  args: {
    ...Default.args,
  },
};

export const DropdownExpandableMenuListItemWithIcons = {
  render: args => {
    return (
      <Dropdown {...args} width={300}>
        <DropdownButton>Dropdown Expandable Menu List Item</DropdownButton>
        <DropdownContent>
          <DropdownExpandableMenuGroup isMulti={false} defaultIndex={0}>
            <DropdownExpandableMenuItem>
              <DropdownExpandableMenuButton icon={<LocalPizzaIcon />}>
                Specialty Pizza
              </DropdownExpandableMenuButton>
              <DropdownExpandableMenuPanel>
                <DropdownExpandableMenuListItem>
                  Margherita
                </DropdownExpandableMenuListItem>
                <DropdownExpandableMenuListItem icon={<LocalPizzaIcon />}>
                  Capricciosa
                </DropdownExpandableMenuListItem>
              </DropdownExpandableMenuPanel>
            </DropdownExpandableMenuItem>
          </DropdownExpandableMenuGroup>
          <DropdownDivider />
          <DropdownExpandableMenuListItem icon={<LocalPizzaIcon />}>
            Cheese Pizza
          </DropdownExpandableMenuListItem>
        </DropdownContent>
      </Dropdown>
    );
  },
};

const LeadingIconTemplate: StoryFn<DropdownProps> = args => (
  <div
    style={{
      margin: '150px auto',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'space-evenly',
    }}
  >
    <ButtonGroup
      orientation={ButtonGroupOrientation.vertical}
      alignment={ButtonGroupAlignment.left}
    >
      <Dropdown {...args}>
        <DropdownButton
          size={ButtonSize.small}
          leadingIcon={<SettingsIcon />}
          iconPosition={ButtonIconPosition.right}
        >
          Small leading icon
        </DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item 1</DropdownMenuItem>
          <DropdownMenuItem>Menu item number two</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
      <Dropdown {...args}>
        <DropdownButton
          size={ButtonSize.medium}
          leadingIcon={<SettingsIcon />}
          iconPosition={ButtonIconPosition.right}
        >
          Medium leading icon
        </DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item 1</DropdownMenuItem>
          <DropdownMenuItem>Menu item number two</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
      <Dropdown {...args}>
        <DropdownButton
          size={ButtonSize.large}
          leadingIcon={<SettingsIcon />}
          iconPosition={ButtonIconPosition.right}
        >
          Large leading icon
        </DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item 1</DropdownMenuItem>
          <DropdownMenuItem>Menu item number two</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    </ButtonGroup>
    <Dropdown {...args} style={{ marginLeft: '20px' }}>
      <DropdownButton
        icon={<ReorderIcon />}
        leadingIcon={<SettingsIcon />}
        iconPosition={ButtonIconPosition.left}
      >
        Icon left suppresses leading icon
      </DropdownButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  </div>
);

export const LeadingIcon = {
  render: LeadingIconTemplate,
  args: { ...Default.args },
};

export const Performance = {
  render: args => {
    const threeItems = (
      <>
        <Dropdown {...args}>
          <DropdownButton>Dropdown</DropdownButton>
          <DropdownContent>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
            <DropdownMenuItem disabled>Disabled item</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
        <Dropdown {...args}>
          <DropdownButton>Dropdown Two</DropdownButton>
          <DropdownContent>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
            <DropdownMenuItem disabled>Disabled item</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
        <Dropdown {...args}>
          <DropdownButton>Dropdown more content</DropdownButton>
          <DropdownContent>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
            <DropdownMenuItem disabled>Disabled item</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
      </>
    );

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Array.from({ length: 150 }).map((_, index) => (
          <div key={index} style={{ margin: '8px' }}>
            {threeItems}
          </div>
        ))}
      </div>
    );
  },

  args: { ...Default.args },
};
