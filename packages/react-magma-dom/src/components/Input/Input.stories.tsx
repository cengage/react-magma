import React from 'react';

import { Meta, Story } from '@storybook/react/types-6-0';
import { HelpIcon, NotificationsIcon, WorkIcon } from 'react-magma-icons';

import { Button, ButtonSize, ButtonType, ButtonVariant } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Card, CardBody } from '../Card';
import { Combobox } from '../Combobox';
import { DatePicker } from '../DatePicker';
import { IconButton } from '../IconButton';
import { InputIconPosition, InputSize, InputType } from '../InputBase';
import { LabelPosition } from '../Label';
import { PasswordInput } from '../PasswordInput';
import { Search } from '../Search';
import { Spacer, SpacerAxis } from '../Spacer';
import { TimePicker } from '../TimePicker';
import { Tooltip } from '../Tooltip';

import { Input, InputProps } from '.';

const Template: Story<InputProps> = args => (
  <>
    <Input {...args} labelText="Input label" />
    <br />
    <Input {...args} labelText="Second Input label" />
    <br />
    <Input {...args} labelText="Third Input label with a long title" />
  </>
);

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    iconPosition: {
      control: {
        type: 'select',
        options: InputIconPosition,
      },
    },
    inputSize: {
      control: {
        type: 'select',
        options: InputSize,
      },
    },
    isClearable: {
      control: {
        type: 'boolean',
      },
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    labelWidth: {
      control: {
        type: 'number',
      },
    },
    labelPosition: {
      control: {
        type: 'select',
        options: LabelPosition,
      },
    },
    type: {
      control: {
        type: 'select',
        options: InputType,
      },
    },
    labelText: {
      control: 'text',
      description: 'Label for the input',
    },
    helperMessage: {
      control: 'text',
      description: 'Helper message displayed below the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed below the input',
    },
  },
  errorMessage: '',
} as Meta;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  helperMessage: 'Helper message',
  isClearable: true,
  isInverse: false,
  labelWidth: 20,
  placeholder: 'Placeholder text...',
  type: InputType.text,
};
Default.parameters = { controls: { exclude: ['iconPosition'] } };

export const Error = Template.bind({});
Error.args = {
  errorMessage: 'Please correct this error',
};
Error.parameters = { controls: { exclude: ['iconPosition'] } };

export const Large = Template.bind({});
Large.args = {
  inputSize: InputSize.large,
  isClearable: true,
  isInverse: false,
};
Large.parameters = { controls: { exclude: ['iconPosition'] } };

export const IconPositions = args => {
  return (
    <>
      <Input
        {...args}
        labelText="Icon Left"
        icon={<NotificationsIcon />}
        iconPosition={InputIconPosition.left}
      />
      <br />
      <br />
      <Input
        {...args}
        labelText="Icon Right"
        icon={<WorkIcon />}
        iconPosition={InputIconPosition.right}
      />
      <br />
      <br />
      <Input
        {...args}
        labelText="Icon Top"
        icon={<HelpIcon />}
        iconPosition={InputIconPosition.top}
      />
    </>
  );
};
IconPositions.args = {
  ...Default.args,
  placeholder:
    'Placeholder text... This is a very long placeholder text because it is fun!',
  helperMessage: null,
};
IconPositions.parameters = { controls: { exclude: ['iconPosition'] } };

export const File = Template.bind({});
File.args = {
  type: InputType.file,
};
File.parameters = { controls: { exclude: ['iconPosition', 'isClearable'] } };

export const ClickableIcon = Template.bind({});
ClickableIcon.args = {
  ...Default.args,
  icon: <NotificationsIcon />,
  iconAriaLabel: 'Notifications',
  onIconClick: () => {},
};
ClickableIcon.parameters = { controls: { exclude: ['iconPosition'] } };

export const Inverse = Template.bind({});
Inverse.args = {
  ...Default.args,
  isInverse: true,
  errorMessage: '',
};
Inverse.parameters = { controls: { exclude: ['iconPosition'] } };

Inverse.decorators = [
  Story => (
    <Card isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];

export const HelpLink = args => {
  const helpLinkLabel = 'Learn more';
  const onHelpLinkClick = () => {
    alert('Help link clicked!');
  };
  return (
    <>
      <Input labelText="Help link - top" {...args}>
        <Tooltip content={helpLinkLabel}>
          <IconButton
            aria-label={helpLinkLabel}
            icon={<HelpIcon />}
            onClick={onHelpLinkClick}
            type={ButtonType.button}
            size={ButtonSize.small}
            variant={ButtonVariant.link}
          />
        </Tooltip>
      </Input>
      <Spacer size={16} />
      <Input
        labelText="Help link - left"
        labelPosition={LabelPosition.left}
        {...args}
      >
        <Tooltip content={helpLinkLabel}>
          <IconButton
            aria-label={helpLinkLabel}
            icon={<HelpIcon />}
            onClick={onHelpLinkClick}
            type={ButtonType.button}
            size={ButtonSize.small}
            variant={ButtonVariant.link}
          />
        </Tooltip>
      </Input>
      <Spacer size={16} />
      <Input labelText="Help link - hidden" isLabelVisuallyHidden {...args}>
        <Tooltip content={helpLinkLabel}>
          <IconButton
            aria-label={helpLinkLabel}
            icon={<HelpIcon />}
            onClick={onHelpLinkClick}
            type={ButtonType.button}
            size={ButtonSize.small}
            variant={ButtonVariant.link}
          />
        </Tooltip>
      </Input>
    </>
  );
};
HelpLink.args = {
  ...Default.args,
  errorMessage: '',
  helperMessage: 'Helper Message',
  labelText: 'Label Text',
};
HelpLink.parameters = {
  controls: {
    exclude: [
      'isInverse',
      'type',
      'iconPosition',
      'isLabelVisuallyHidden',
      'labelPosition',
    ],
  },
};

export const WithTwoIcons = args => {
  const helpLinkLabel = 'Learn more';
  const onHelpLinkClick = () => {
    alert('Help link clicked!');
  };
  return (
    <>
      <Input
        labelText="With two icons"
        icon={<NotificationsIcon />}
        iconPosition={InputIconPosition.left}
      >
        <Tooltip content={helpLinkLabel}>
          <IconButton
            aria-label={helpLinkLabel}
            icon={<HelpIcon />}
            onClick={onHelpLinkClick}
            type={ButtonType.button}
            size={ButtonSize.small}
            variant={ButtonVariant.link}
          />
        </Tooltip>
      </Input>
    </>
  );
};
WithTwoIcons.args = {
  ...Default.args,
};
WithTwoIcons.parameters = {
  controls: { exclude: ['isInverse', 'type', 'iconPosition'] },
};

export const NumberInput = args => {
  const [inputVal, setInputVal] = React.useState(1);
  const [hasError, setHasError] = React.useState(false);

  function handleChange(event) {
    setInputVal(event.target.value);
  }

  React.useEffect(() => {
    if (inputVal > 40 || inputVal < 1) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [inputVal]);

  return (
    <Card
      style={{ width: '250px', padding: '12px' }}
      isInverse={args.isInverse}
    >
      <Input
        labelText="Number 1-40 with long long long long label"
        inputWrapperStyle={{ width: '64px' }}
        type={InputType.number}
        errorMessage={hasError ? 'Please enter a number between 1 - 40' : null}
        min={1}
        max={40}
        value={inputVal}
        onChange={handleChange}
        {...args}
      />
    </Card>
  );
};

NumberInput.args = {
  disabled: false,
  helperMessage: 'Enter a number 1 - 40',
  isClearable: false,
};

NumberInput.parameters = {
  controls: { exclude: ['type', 'iconPosition', 'labelWidth'] },
};

export const PhoneInput = () => {
  const [inputVal, setInputVal] = React.useState('');
  const [hasError, setHasError] = React.useState(false);
  const phonePattern = '^[0-9]{3}-[0-9]{3}-[0-9]{4}$';

  function handleChange(event) {
    setInputVal(event.target.value);
  }

  React.useEffect(() => {
    if (inputVal === '' || inputVal.match(phonePattern)) {
      setHasError(false);
    } else {
      setHasError(true);
    }
  }, [inputVal]);

  return (
    <Input
      pattern={phonePattern}
      labelText={
        <>
          Phone <br /> Format: 123-456-7890
        </>
      }
      type={InputType.tel}
      errorMessage={hasError ? 'Please enter a phone number' : null}
      value={inputVal}
      onChange={handleChange}
    />
  );
};

export const URLInput = () => {
  const [inputVal, setInputVal] = React.useState('');
  const [hasError, setHasError] = React.useState(false);
  const urlPattern =
    '^(https?:\\/\\/)?([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,})(:[0-9]+)?(\\/.*)?$';

  function handleChange(event) {
    setInputVal(event.target.value);
  }

  React.useEffect(() => {
    if (inputVal === '' || inputVal.match(urlPattern)) {
      setHasError(false);
    } else {
      setHasError(true);
    }
  }, [hasError, inputVal]);

  return (
    <Input
      pattern={urlPattern}
      labelText="URL"
      type={InputType.url}
      errorMessage={hasError ? 'Please enter a url' : null}
      value={inputVal}
      onChange={handleChange}
    />
  );
};

export const SeveralErrors = () => {
  const [inputValues, setInputValues] = React.useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
  });
  const [hasErrors, setHasErrors] = React.useState({
    firstName: false,
    lastName: false,
    emailAddress: false,
  });

  const firstNameInputRef = React.useRef();
  const lastNameInputRef = React.useRef();
  const emailAddressInputRef = React.useRef();

  const submit = () => {
    setHasErrors({
      firstName: false,
      lastName: false,
      emailAddress: false,
    });

    if (!inputValues.emailAddress) {
      setHasErrors(prev => ({ ...prev, emailAddress: true }));
      emailAddressInputRef.current.focus();
    }

    if (!inputValues.lastName) {
      setHasErrors(prev => ({ ...prev, lastName: true }));
      lastNameInputRef.current.focus();
    }

    if (!inputValues.firstName) {
      setHasErrors(prev => ({ ...prev, firstName: true }));
      firstNameInputRef.current.focus();
    }
  };

  const reset = () => {
    setHasErrors({
      firstName: false,
      lastName: false,
      emailAddress: false,
    });
    setInputValues({
      firstName: '',
      lastName: '',
      emailAddress: '',
    });

    firstNameInputRef.current.focus();
  };

  return (
    <>
      <Input
        errorMessage={hasErrors.firstName ? 'Please enter your first name' : ''}
        helperMessage=""
        labelText="First name *"
        onChange={event =>
          setInputValues(prev => ({ ...prev, firstName: event.target.value }))
        }
        required
        value={inputValues.firstName}
        ref={firstNameInputRef}
      />
      <br />
      <Input
        errorMessage={hasErrors.lastName ? 'Please enter your last name' : ''}
        helperMessage=""
        labelText="Last name *"
        onChange={event =>
          setInputValues(prev => ({ ...prev, lastName: event.target.value }))
        }
        required
        value={inputValues.lastName}
        ref={lastNameInputRef}
      />
      <br />
      <Input
        errorMessage={
          hasErrors.emailAddress ? 'Please enter your email address' : ''
        }
        helperMessage=""
        labelText="Email address *"
        onChange={event =>
          setInputValues(prev => ({
            ...prev,
            emailAddress: event.target.value,
          }))
        }
        required
        value={inputValues.emailAddress}
        ref={emailAddressInputRef}
      />
      <br />
      <ButtonGroup>
        <Button onClick={submit}>Submit</Button>
        <Button onClick={reset} color="secondary">
          Reset
        </Button>
      </ButtonGroup>
    </>
  );
};

export const AllInputs = () => {
  const helpLinkLabel = 'Learn more';
  const onHelpLinkClick = () => {
    alert('Help link clicked!');
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 auto' }}>
          <PasswordInput labelText="Password" />
        </div>
        <div style={{ flex: '0 0 auto' }}>
          <Input labelText="Label" />
        </div>
        <div style={{ flex: '0 0 auto' }}>
          <TimePicker labelText="Time" />
        </div>
        <div style={{ flex: '0 0 auto' }}>
          <DatePicker labelText="Date" />
        </div>
        <div style={{ flex: '0 0 auto' }}>
          <Input
            labelText="With two icons"
            icon={<NotificationsIcon />}
            iconPosition={InputIconPosition.left}
          >
            <Tooltip content={helpLinkLabel}>
              <IconButton
                aria-label={helpLinkLabel}
                icon={<HelpIcon />}
                onClick={onHelpLinkClick}
                type={ButtonType.button}
                size={ButtonSize.small}
                variant={ButtonVariant.link}
              />
            </Tooltip>
          </Input>
        </div>
      </div>
      <Spacer axis={SpacerAxis.vertical} size={120} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: '0 0 auto', marginTop: 'auto' }}>
          <Search onSearch={() => {}} isClearable />
        </div>
        <div style={{ flex: '0 0 auto', marginTop: 'auto' }}>
          <Input
            labelText="Number 1-40 "
            inputWrapperStyle={{ width: '100px' }}
            type={InputType.number}
          />
        </div>
        <div style={{ flex: '0 0 auto', marginTop: 'auto' }}>
          <Input
            labelText="Email"
            inputWrapperStyle={{ width: '100px' }}
            type={InputType.email}
          />
        </div>
        <div style={{ flex: '0 0 auto', marginTop: 'auto' }}>
          <Input
            labelText="Phone"
            inputWrapperStyle={{ width: '100px' }}
            type={InputType.tel}
          />
        </div>
        <div style={{ flex: '0 0 auto', marginTop: 'auto' }}>
          <Input
            labelText="URL"
            inputWrapperStyle={{ width: '100px' }}
            type={InputType.url}
          />
        </div>
        <div style={{ flex: '0 0 auto', marginTop: 'auto' }}>
          <Combobox
            id="comboboxId"
            labelText="Combobox"
            defaultItems={[
              { label: 'Red', value: 'red' },
              { label: 'Blue', value: 'blue' },
              { label: 'Green', value: 'green' },
            ]}
            placeholder="Hello"
          />
        </div>
        <div style={{ flex: '0 0 auto', marginTop: 'auto', maxWidth: '400px' }}>
          <Combobox
            id="comboboxId-multi"
            isMulti
            labelText={'Combobox Multi Example'}
            defaultItems={[
              { label: 'Red', value: 'red' },
              { label: 'Blue', value: 'blue' },
              { label: 'Green', value: 'green' },
              { label: 'Orange', value: 'orange' },
              { label: 'Aqua', value: 'aqua' },
              { label: 'Gold', value: 'gold' },
              { label: 'Periwinkle', value: 'periwinkle' },
              { label: 'Lavender', value: 'lavender' },
              { label: 'Marigold', value: 'marigold' },
            ]}
          />
        </div>
      </div>
    </>
  );
};
