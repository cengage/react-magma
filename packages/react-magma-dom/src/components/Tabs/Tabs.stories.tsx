import React from 'react';

import { StoryFn, Meta } from '@storybook/react/types-6-0';
import { EmailIcon, AndroidIcon, NotificationsIcon } from 'react-magma-icons';

import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { TabPanelsContainer } from './TabPanelsContainer';
import { TabsContainer } from './TabsContainer';
import { Card } from '../Card';
import { Combobox } from '../Combobox';
import { Container } from '../Container';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownMenuItem,
} from '../Dropdown';
import { Heading } from '../Heading';
import { Select } from '../Select';
import { TabsOrientation, TabsTextTransform } from './shared';

import {
  Tabs,
  TabsIconPosition,
  TabsAlignment,
  TabsBorderPosition,
  TabsProps,
  TabsScrollSpyContainer,
  TabScrollSpyPanel,
} from '.';

export default {
  title: 'Tabs',
  component: Tabs,
  decorators: [
    (Story, context) => (
      <Container isInverse={context.args.isInverse} style={{ padding: '20px' }}>
        <Story />
      </Container>
    ),
  ],
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

const Template: StoryFn<TabsProps> = args => (
  <TabsContainer>
    <Tabs aria-label="Sample Tabs" {...args}>
      <Tab>Main Page</Tab>
      <Tab>FAQ</Tab>
      <Tab>About Us</Tab>
      <Tab disabled>Disabled</Tab>
    </Tabs>
    <TabPanelsContainer>
      <TabPanel>
        <div>Main page</div>
      </TabPanel>
      <TabPanel>
        <div>FAQ</div>
      </TabPanel>
      <TabPanel>
        <div>About us</div>
      </TabPanel>
    </TabPanelsContainer>
  </TabsContainer>
);

export const Default = {
  render: Template,
  args: {},
  parameters: { controls: { exclude: ['iconPosition'] } },
};

const IconTemplate: StoryFn<TabsProps> = args => (
  <TabsContainer>
    <Tabs aria-label="Sample Tabs" {...args}>
      <Tab icon={<EmailIcon />}>First item</Tab>
      <Tab icon={<AndroidIcon />}>Second item</Tab>
      <Tab icon={<NotificationsIcon />}>Third item</Tab>
    </Tabs>
    <TabPanelsContainer>
      <TabPanel>
        <div>Email</div>
      </TabPanel>
      <TabPanel>
        <div>Android</div>
      </TabPanel>
      <TabPanel>
        <div>Notifications</div>
      </TabPanel>
    </TabPanelsContainer>
  </TabsContainer>
);

export const Icon = {
  render: IconTemplate,

  args: {
    ...Default.args,
    iconPosition: TabsIconPosition.left,
  },
};

const IconOnlyTemplate: StoryFn<TabsProps> = args => (
  <TabsContainer>
    <Tabs aria-label="Sample Tabs" {...args}>
      <Tab icon={<EmailIcon />} aria-label="email" />
      <Tab icon={<AndroidIcon />} aria-label="android" />
      <Tab icon={<NotificationsIcon />} aria-label="notifications" />
    </Tabs>
    <TabPanelsContainer>
      <TabPanel>
        <div>Email</div>
      </TabPanel>
      <TabPanel>
        <div>Android</div>
      </TabPanel>
      <TabPanel>
        <div>Notifications</div>
      </TabPanel>
    </TabPanelsContainer>
  </TabsContainer>
);

export const IconOnly = {
  render: IconOnlyTemplate,
  args: { ...Default.args },
  parameters: { ...Default.parameters },
};

const ScrollingTemplate: StoryFn<
  TabsProps & { activeIndex: number }
> = args => (
  <div>
    <TabsContainer
      style={{
        maxWidth: '600px',
        height:
          args.orientation === TabsOrientation.vertical ? '300px' : 'auto',
      }}
      activeIndex={args.activeIndex}
    >
      <Tabs aria-label="Sample Tabs" {...args}>
        <Tab>First item</Tab>
        <Tab>Second item</Tab>
        <Tab>Third item</Tab>
        <Tab>Fourth item</Tab>
        <Tab>Fifth item</Tab>
        <Tab>Sixth item</Tab>
        <Tab>Seventh item</Tab>
        <Tab>Eight item</Tab>
        <Tab>Ninth item</Tab>
        <Tab>Tenth item</Tab>
        <Tab>Eleventh item</Tab>
        <Tab>Last item</Tab>
      </Tabs>
      <TabPanelsContainer>
        <TabPanel>
          <div>Email</div>
        </TabPanel>
        <TabPanel>
          <div>Android</div>
        </TabPanel>
        <TabPanel>
          <div>Notifications</div>
        </TabPanel>
        <TabPanel>
          <div>Tab content</div>
        </TabPanel>
        <TabPanel>
          <div>Tab content</div>
        </TabPanel>
        <TabPanel>
          <div>Tab content</div>
        </TabPanel>
        <TabPanel>
          <div>Tab content</div>
        </TabPanel>
        <TabPanel>
          <div>Tab content</div>
        </TabPanel>
        <TabPanel>
          <div>Tab content</div>
        </TabPanel>
        <TabPanel>
          <div>Tab content</div>
        </TabPanel>
        <TabPanel>
          <div>Tab content</div>
        </TabPanel>
        <TabPanel>
          <div>Tab content</div>
        </TabPanel>
      </TabPanelsContainer>
    </TabsContainer>
  </div>
);

export const Scrolling = {
  render: ScrollingTemplate,

  args: {
    ...Default.args,
    orientation: TabsOrientation.vertical,
    activeIndex: 0,
  },

  parameters: { ...Default.parameters },
};

const scrollContent = (
  <>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <p>
      Amet aliquam id diam maecenas ultricies mi. Venenatis tellus in metus
      vulputate eu scelerisque felis imperdiet. Tristique sollicitudin nibh sit
      amet commodo nulla facilisi nullam. Facilisis sed odio morbi quis commodo
      odio aenean. Odio tempor orci dapibus ultrices in iaculis nunc sed augue.
      In arcu cursus euismod quis viverra nibh cras. Tincidunt ornare massa eget
      egestas purus viverra accumsan in nisl. Porta nibh venenatis cras sed
      felis. Felis donec et odio pellentesque diam. Aliquam ut porttitor leo a
      diam sollicitudin. Sed sed risus pretium quam vulputate dignissim
      suspendisse in. Fringilla ut morbi tincidunt augue interdum. Vel elit
      scelerisque mauris pellentesque pulvinar.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <p>
      Amet aliquam id diam maecenas ultricies mi. Venenatis tellus in metus
      vulputate eu scelerisque felis imperdiet. Tristique sollicitudin nibh sit
      amet commodo nulla facilisi nullam. Facilisis sed odio morbi quis commodo
      odio aenean. Odio tempor orci dapibus ultrices in iaculis nunc sed augue.
      In arcu cursus euismod quis viverra nibh cras. Tincidunt ornare massa eget
      egestas purus viverra accumsan in nisl. Porta nibh venenatis cras sed
      felis. Felis donec et odio pellentesque diam. Aliquam ut porttitor leo a
      diam sollicitudin. Sed sed risus pretium quam vulputate dignissim
      suspendisse in. Fringilla ut morbi tincidunt augue interdum. Vel elit
      scelerisque mauris pellentesque pulvinar.
    </p>
  </>
);

const ScrollSpyTemplate: StoryFn<TabsProps> = args => (
  <TabsScrollSpyContainer isInverse={args.isInverse}>
    <TabScrollSpyPanel tabLabel="Card 1">
      <Heading level={4}>Area 1</Heading>
      {scrollContent}
    </TabScrollSpyPanel>
    <TabScrollSpyPanel tabLabel="Card 2">
      <Heading level={4}>Area 2</Heading>
      {scrollContent}
    </TabScrollSpyPanel>
    <TabScrollSpyPanel tabLabel="Card 3">
      <Heading level={4}>Area 3</Heading>
      {scrollContent}
    </TabScrollSpyPanel>
    <TabScrollSpyPanel tabLabel="Card 4">
      <Heading level={4}>Area 4</Heading>
      {scrollContent}
    </TabScrollSpyPanel>
    <TabScrollSpyPanel tabLabel="Card 5">
      <Heading level={4}>Area 5</Heading>
      {scrollContent}
    </TabScrollSpyPanel>
  </TabsScrollSpyContainer>
);

export const ScrollSpy = {
  render: ScrollSpyTemplate,

  args: {
    ...Default.args,
  },

  parameters: {
    controls: {
      exclude: ['iconPosition', 'alignment', 'borderPosition', 'orientation'],
    },
  },
};

const ScrollSpyTemplateIcons: StoryFn<TabsProps> = args => (
  <TabsScrollSpyContainer isInverse={args.isInverse}>
    <TabScrollSpyPanel icon={<AndroidIcon />} tabLabel="Card 1">
      <Heading level={4}>Area 1</Heading>
      {scrollContent}
    </TabScrollSpyPanel>
    <TabScrollSpyPanel icon={<AndroidIcon />} tabLabel="Card 2">
      <Heading level={4}>Area 2</Heading>
      {scrollContent}
    </TabScrollSpyPanel>
    <TabScrollSpyPanel icon={<AndroidIcon />} tabLabel="Card 3">
      <Heading level={4}>Area 3</Heading>
      {scrollContent}
    </TabScrollSpyPanel>
    <TabScrollSpyPanel icon={<AndroidIcon />} tabLabel="Card 4">
      <Heading level={4}>Area 4</Heading>
      {scrollContent}
    </TabScrollSpyPanel>
    <TabScrollSpyPanel icon={<AndroidIcon />} tabLabel="Card 5">
      <Heading level={4}>Area 5</Heading>
      {scrollContent}
    </TabScrollSpyPanel>
  </TabsScrollSpyContainer>
);

export const ScrollSpyIcons = {
  render: ScrollSpyTemplateIcons,

  args: {
    ...Default.args,
  },

  parameters: {
    controls: {
      exclude: ['iconPosition', 'alignment', 'borderPosition', 'orientation'],
    },
  },
};

const InverseTemplate: StoryFn<TabsProps> = args => (
  <Card isInverse={args.isInverse}>
    <TabsContainer>
      <Tabs aria-label="Sample Tabs" {...args}>
        <Tab>First item</Tab>
        <Tab>Second item</Tab>
        <Tab>Third item</Tab>
        <Tab disabled>Disabled</Tab>
      </Tabs>
      <TabPanelsContainer>
        <TabPanel isInverse={args.isInverse}>
          <div>Email</div>
        </TabPanel>
        <TabPanel isInverse={args.isInverse}>
          <div>Android</div>
        </TabPanel>
        <TabPanel isInverse={args.isInverse}>
          <div>Notifications</div>
        </TabPanel>
      </TabPanelsContainer>
    </TabsContainer>
  </Card>
);

export const Inverse = {
  render: InverseTemplate,

  args: {
    ...Default.args,
    isInverse: true,
  },

  parameters: { ...Default.parameters },
};

const WithDropdownTemplate: StoryFn<TabsProps> = args => (
  <Card>
    <TabsContainer>
      <Tabs aria-label="Sample Tabs" {...args}>
        <Tab>Dropdown</Tab>
        <Tab>Select</Tab>
        <Tab>ComboBox</Tab>
      </Tabs>
      <TabPanelsContainer>
        <TabPanel>
          <Dropdown>
            <DropdownButton>Basic Dropdown</DropdownButton>
            <DropdownContent>
              <DropdownMenuItem>Menu item 1</DropdownMenuItem>
              <DropdownMenuItem>Menu item number two</DropdownMenuItem>
              <DropdownMenuItem>Menu item number two</DropdownMenuItem>
              <DropdownMenuItem>Menu item number two</DropdownMenuItem>
              <DropdownMenuItem>Menu item number two</DropdownMenuItem>
              <DropdownMenuItem>Menu item number two</DropdownMenuItem>
              <DropdownMenuItem>Menu item number two</DropdownMenuItem>
            </DropdownContent>
          </Dropdown>
        </TabPanel>
        <TabPanel>
          <Select
            labelText="Select Example"
            items={[
              { label: 'Red', value: 'red' },
              { label: 'Blue', value: 'blue' },
              { label: 'Green', value: 'green' },
              { label: 'Yellow', value: 'yellow' },
            ]}
          />
        </TabPanel>
        <TabPanel>
          <Combobox
            isMulti
            labelText="ComboBox Example"
            defaultItems={[
              { label: 'Pink', value: 'pink' },
              { label: 'Orange', value: 'orange' },
              { label: 'Purple', value: 'purple' },
            ]}
          />
        </TabPanel>
      </TabPanelsContainer>
    </TabsContainer>
  </Card>
);

export const WithDropdown = {
  render: WithDropdownTemplate,

  args: {
    ...Default.args,
  },

  parameters: { ...Default.parameters },
};
