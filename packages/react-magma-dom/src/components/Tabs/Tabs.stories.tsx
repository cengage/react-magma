import React from 'react';
import {
  Tabs,
  TabsIconPosition,
  TabsAlignment,
  TabsBorderPosition,
  TabsOrientation,
  TabsProps,
} from '.';
import { Tab } from './Tab';
import { TabsContainer } from './TabsContainer';
import { TabPanelsContainer } from './TabPanelsContainer';
import { TabPanel } from './TabPanel';
import { Card } from '../Card';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownMenuItem,
} from '../Dropdown';
import { Combobox } from '../Combobox';
import { Select } from '../Select';
import { EmailIcon, AndroidIcon, NotificationsIcon } from 'react-magma-icons';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'Tabs',
  component: Tabs,
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
  },
} as Meta;

const Template: Story<TabsProps> = args => (
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

export const Default = Template.bind({});
Default.args = {};

const IconTemplate: Story<TabsProps> = args => (
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

export const Icon = IconTemplate.bind({});
Icon.args = { ...Default.args };

const IconOnlyTemplate: Story<TabsProps> = args => (
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

export const IconOnly = IconOnlyTemplate.bind({});
IconOnly.args = { ...Default.args };

const ScrollingTemplate: Story<TabsProps> = args => (
  <div>
    <TabsContainer
      style={{
        maxWidth: '600px',
        height:
          args.orientation === TabsOrientation.vertical ? '300px' : 'auto',
      }}
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

export const Scrolling = ScrollingTemplate.bind({});
Scrolling.args = { ...Default.args, orientation: TabsOrientation.vertical };

const InverseTemplate: Story<TabsProps> = args => (
  <Card isInverse>
    <TabsContainer>
      <Tabs aria-label="Sample Tabs" {...args}>
        <Tab>First item</Tab>
        <Tab>Second item</Tab>
        <Tab>Third item</Tab>
        <Tab disabled>Disabled</Tab>
      </Tabs>
      <TabPanelsContainer>
        <TabPanel isInverse>
          <div>Email</div>
        </TabPanel>
        <TabPanel isInverse>
          <div>Android</div>
        </TabPanel>
        <TabPanel isInverse>
          <div>Notifications</div>
        </TabPanel>
      </TabPanelsContainer>
    </TabsContainer>
  </Card>
);

export const Inverse = InverseTemplate.bind({});
Inverse.args = {
  ...Default.args,
  isInverse: true,
};

const WithDropdownTemplate: Story<TabsProps> = args => (
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

export const WithDropdown = WithDropdownTemplate.bind({});
WithDropdown.args = {
  ...Default.args,
};
