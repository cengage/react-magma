import React from 'react';
import { Button, ButtonColor, ButtonType } from '../Button';
import { Alert } from '../Alert';
import { AlertVariant } from '../AlertBase';
import { Checkbox } from '../Checkbox';
import { Combobox } from '../Combobox';
import { DatePicker } from '../DatePicker';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownMenuItem,
} from '../Dropdown';
import { Form, FormProps } from '.';
import { FormGroup } from '../FormGroup';
import { Hyperlink } from '../Hyperlink';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import { Paragraph } from '../Paragraph';
import { PasswordInput } from '../PasswordInput';
import { RadioGroup } from '../RadioGroup';
import { Radio } from '../Radio';
import { Search } from '../Search';
import { Select } from '../Select';
import { NavTabs, NavTab } from '../NavTabs';
import {
  TabsContainer,
  Tabs,
  Tab,
  TabPanelsContainer,
  TabPanel,
} from '../Tabs';
import { Textarea } from '../Textarea';
import { TimePicker } from '../TimePicker';
import { Toggle } from '../Toggle';
import { Tooltip } from '../Tooltip';
import { SettingsIcon } from 'react-magma-icons';
import { Story } from '@storybook/react/types-6-0';

export default {
  component: Form,
  title: 'Form',
};

const Template: Story<FormProps> = args => (
  <Form {...args}>{args.children}</Form>
);

const Actions = () => (
  <>
    <Button color={ButtonColor.secondary}>Cancel</Button>
    <Button type={ButtonType.submit} color={ButtonColor.primary}>
      Submit
    </Button>
  </>
);

const Fields = () => (
  <>
    <Input labelText="Username" />
    <PasswordInput labelText="Password" />
    <FormGroup labelText="Favorite colors">
      <Checkbox labelText="Red" />
      <Checkbox labelText="Blue" />
      <Checkbox labelText="Green" />
    </FormGroup>
    <Combobox
      defaultItems={[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
      ]}
      labelText="Combobox"
    />
    <DatePicker labelText="Birthday" />

    <RadioGroup labelText="Most favorite color" name="favColor">
      <Radio labelText="Red" />
      <Radio labelText="Blue" />
      <Radio labelText="Green" />
    </RadioGroup>

    <Search onSearch={() => {}} />
    <Select
      labelText="Select"
      items={[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
      ]}
    />
    <Textarea labelText="Text area" />
    <TimePicker labelText="Timepicker" />
    <Toggle labelText="Toggle switch" />

    <Paragraph>Paragraph content</Paragraph>
    <Paragraph>
      <Tooltip content="Settings">
        <IconButton aria-label="Settings" icon={<SettingsIcon />} />
      </Tooltip>
      <Dropdown>
        <DropdownButton>Basic Dropdown</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item 1</DropdownMenuItem>
          <DropdownMenuItem>Menu item number two</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    </Paragraph>

    <NavTabs aria-label="Sample Nav Tabs" style={{ marginBottom: '16px' }}>
      <NavTab to="#">Link 1</NavTab>
      <NavTab to="#">Link 1</NavTab>
    </NavTabs>

    <TabsContainer
      activeIndex={1}
      isInverse={false}
      style={{ marginBottom: '16px' }}
    >
      <Tabs aria-label="Sample Tabs">
        <Tab>First item</Tab>
        <Tab>Second item</Tab>
      </Tabs>

      <TabPanelsContainer>
        <TabPanel>
          <div>Main page</div>
        </TabPanel>
        <TabPanel>
          <div>FAQ</div>
        </TabPanel>
      </TabPanelsContainer>
    </TabsContainer>

    <Alert variant={AlertVariant.warning} isDismissible>
      This is a warning alert. <Hyperlink to="#">Follow this link</Hyperlink>
    </Alert>
    <Alert variant={AlertVariant.success} isDismissible>
      This is a success alert. <Hyperlink to="#">Follow this link</Hyperlink>
    </Alert>
  </>
);

export const Default = Template.bind({});
Default.args = {
  actions: <Actions />,
  children: <p>Form sections come here</p>,
  header: 'Form Header',
  isInverse: false,
};

export const Expanded = Template.bind({});
Expanded.args = {
  ...Default.args,
  children: <Fields />,
  description: 'Some description',
  errorMessage: 'Some error message',
  isInverse: true,
};
