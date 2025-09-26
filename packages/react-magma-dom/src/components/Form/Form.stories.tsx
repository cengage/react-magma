import React from 'react';

import { StoryFn, Meta } from '@storybook/react/types-6-0';
import { SettingsIcon } from 'react-magma-icons';

import { Button, ButtonColor, ButtonType } from '../Button';
import { ButtonGroup, ButtonGroupAlignment } from '../ButtonGroup';
import { Checkbox } from '../Checkbox';
import { Combobox } from '../Combobox';
import { DatePicker } from '../DatePicker';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownMenuItem,
} from '../Dropdown';
import { FormGroup } from '../FormGroup';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import { Paragraph } from '../Paragraph';
import { PasswordInput } from '../PasswordInput';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';
import { Search } from '../Search';
import { Select } from '../Select';
import { Textarea } from '../Textarea';
import { TimePicker } from '../TimePicker';
import { Toggle } from '../Toggle';
import { Tooltip } from '../Tooltip';

import { Form, FormProps } from '.';

export default {
  component: Form,
  title: 'Form',
} as Meta;

const Template: StoryFn<FormProps> = args => (
  <Form {...args}>{args.children}</Form>
);

const Actions = () => (
  <ButtonGroup
    alignment={ButtonGroupAlignment.right}
    color={ButtonColor.secondary}
  >
    <Button>Cancel</Button>
    <Button type={ButtonType.submit} color={ButtonColor.primary}>
      Submit
    </Button>
  </ButtonGroup>
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
  </>
);

export const Default = {
  render: Template,

  args: {
    actions: <Actions />,
    children: <p>Form sections come here</p>,
    header: 'Form Header',
    isInverse: false,
  },
};

export const Expanded = {
  render: Template,

  args: {
    ...Default.args,
    children: <Fields />,
    description: 'Some description',
    errorMessage: 'Some error message',
    isInverse: true,
    style: { padding: '4px 16px 16px' },
  },
};
