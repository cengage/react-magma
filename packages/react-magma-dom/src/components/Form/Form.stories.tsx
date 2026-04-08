import React from 'react';

import { StoryFn, Meta } from '@storybook/react-webpack5';
import { SettingsIcon } from 'react-magma-icons';

import {
  Checkbox,
  Combobox,
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownMenuItem,
  FormGroup,
  IconButton,
  Input,
  Modal,
  Paragraph,
  Radio,
  RadioGroup,
  Search,
  Select,
  Spacer,
  Textarea,
  TimePicker,
  Toggle,
  Tooltip,
} from '../..';
import { Button, ButtonColor, ButtonType } from '../Button';
import { ButtonGroup, ButtonGroupAlignment } from '../ButtonGroup';
import { DatePicker } from '../DatePicker';
import { PasswordInput } from '../PasswordInput';

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

export function PasswordInputForm() {
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const validate = () => {
    if (!password) {
      setError('Please enter a password!');

      return true;
    }
    setError('');

    return false;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const hasError = validate();

    if (hasError && passwordRef.current) {
      passwordRef.current.focus();
    }
  };

  const cancel = () => {
    setPassword('');
    setError('');
  };

  return (
    <Form
      onSubmit={onSubmit}
      header="Password Input Form"
      description="Enter your password below."
      actions={
        <ButtonGroup>
          <Button color={ButtonColor.secondary} onClick={cancel}>
            Cancel
          </Button>
          <Button type={ButtonType.submit}>Submit</Button>
        </ButtonGroup>
      }
    >
      <PasswordInput
        labelText="Password *"
        value={password}
        onChange={e => {
          setPassword(e.target.value);
          setError('');
        }}
        errorMessage={error}
        autoComplete="current-password"
        ref={passwordRef}
      />
      <Spacer size="12" />
    </Form>
  );
}

export function DatePickerForm() {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [birthday, setBirthday] = React.useState<Date | undefined>(undefined);
  const [error, setError] = React.useState('');

  const focusDateInput = () => {
    const input = wrapperRef.current?.querySelector('input');

    input?.focus();
  };

  const validate = () => {
    if (!birthday) {
      setError('Please select a date!');

      return true;
    }
    setError('');

    return false;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const hasError = validate();

    if (hasError) {
      setTimeout(() => {
        focusDateInput();
      }, 0);
    }
  };

  const cancel = () => {
    setBirthday(undefined);
    setError('');
  };

  return (
    <Modal isOpen>
      <Form
        onSubmit={onSubmit}
        header="DatePicker Form"
        description="Select your birthday below."
        actions={
          <ButtonGroup>
            <Button color={ButtonColor.secondary} onClick={cancel}>
              Cancel
            </Button>
            <Button type={ButtonType.submit}>Submit</Button>
          </ButtonGroup>
        }
      >
        <div ref={wrapperRef}>
          <DatePicker
            isDateFieldInput
            labelText="Birthday *"
            value={birthday}
            onDateChange={date => {
              setBirthday(date);
              setError('');
            }}
            errorMessage={error}
          />
        </div>
        <Spacer size="12" />
      </Form>
    </Modal>
  );
}
