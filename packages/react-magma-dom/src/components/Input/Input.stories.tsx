import React, { ChangeEvent } from 'react';

import { Meta, StoryFn } from '@storybook/react/types-6-0';
import { HelpIcon, NotificationsIcon, WorkIcon } from 'react-magma-icons';

import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Card, CardBody } from '../Card';
import { Combobox } from '../Combobox';
import { DatePicker } from '../DatePicker';
import { IconButton } from '../IconButton';
import { InputIconPosition, InputSize, InputType } from '../InputBase';
import { LabelPosition } from '../Label';
import { NativeSelect } from '../NativeSelect';
import { Paragraph } from '../Paragraph';
import { PasswordInput } from '../PasswordInput';
import { Search } from '../Search';
import { Spacer, SpacerAxis } from '../Spacer';
import { TimePicker } from '../TimePicker';
import { Tooltip } from '../Tooltip';
import { CustomTopicsRow } from './testUtils';

import { Input, InputProps } from '.';

const Template: StoryFn<InputProps> = args => (
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

export const Default = {
  render: Template,

  args: {
    disabled: false,
    helperMessage: 'Helper message',
    isClearable: true,
    isInverse: false,
    labelWidth: 20,
    placeholder: 'Placeholder text...',
    type: InputType.text,
  },

  parameters: { controls: { exclude: ['iconPosition'] } },
};

export const Error = {
  render: Template,

  args: {
    errorMessage: 'Please correct this error',
  },

  parameters: { controls: { exclude: ['iconPosition'] } },
};

export const Large = {
  render: Template,

  args: {
    inputSize: InputSize.large,
    isClearable: true,
    isInverse: false,
  },

  parameters: { controls: { exclude: ['iconPosition'] } },
};

export const IconPositions = {
  render: (args: any) => {
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
  },

  args: {
    ...Default.args,
    placeholder:
      'Placeholder text... This is a very long placeholder text because it is fun!',
    helperMessage: null,
  },

  parameters: { controls: { exclude: ['iconPosition'] } },
};

export const File = {
  render: Template,

  args: {
    type: InputType.file,
  },

  parameters: { controls: { exclude: ['iconPosition', 'isClearable'] } },
};

export const ClickableIcon = {
  render: Template,

  args: {
    ...Default.args,
    icon: <NotificationsIcon />,
    iconAriaLabel: 'Notifications',
    onIconClick: () => {},
  },

  parameters: { controls: { exclude: ['iconPosition'] } },
};

export const Inverse = {
  render: Template,

  args: {
    ...Default.args,
    isInverse: true,
    errorMessage: '',
  },

  parameters: { controls: { exclude: ['iconPosition'] } },

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

export const HelpLink = {
  render: (args: any) => {
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
  },

  args: {
    ...Default.args,
    errorMessage: '',
    helperMessage: 'Helper Message',
    labelText: 'Label Text',
  },

  parameters: {
    controls: {
      exclude: [
        'isInverse',
        'type',
        'iconPosition',
        'isLabelVisuallyHidden',
        'labelPosition',
      ],
    },
  },
};

export const WithTwoIcons = {
  render: () => {
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
  },

  args: {
    ...Default.args,
  },

  parameters: {
    controls: { exclude: ['isInverse', 'type', 'iconPosition'] },
  },
};

export const NumberInput = {
  render: (args: any) => {
    const [inputVal, setInputVal] = React.useState(1);
    const [hasError, setHasError] = React.useState(false);

    function handleChange(event: any) {
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
          errorMessage={
            hasError ? 'Please enter a number between 1 - 40' : null
          }
          min={1}
          max={40}
          value={inputVal}
          onChange={handleChange}
          {...args}
        />
      </Card>
    );
  },

  args: {
    disabled: false,
    helperMessage: 'Enter a number 1 - 40',
    isClearable: false,
  },

  parameters: {
    controls: { exclude: ['type', 'iconPosition', 'labelWidth'] },
  },
};

export const PhoneInput = () => {
  const [inputVal, setInputVal] = React.useState('');
  const [hasError, setHasError] = React.useState(false);
  const phonePattern = '^[0-9]{3}-[0-9]{3}-[0-9]{4}$';

  function handleChange(event: any) {
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

  function handleChange(event: any) {
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
      errorMessage={hasError ? 'Enter a valid URL.' : null}
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

  const firstNameInputRef = React.useRef<any>();
  const lastNameInputRef = React.useRef<any>();
  const emailAddressInputRef = React.useRef<any>();

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
        <Button onClick={reset} color={ButtonColor.secondary}>
          Reset
        </Button>
      </ButtonGroup>
    </>
  );
};

export const ErrorMessageAndHelperMessage = () => {
  const [hasError, setHasError] = React.useState(false);
  const [hasError2, setHasError2] = React.useState(false);
  const [nameValue, setNameValue] = React.useState('');
  const [nameValue2, setNameValue2] = React.useState('');
  const inputRef = React.useRef<any>();
  const inputRef2 = React.useRef<any>();

  function submit() {
    if (nameValue === '') {
      setHasError(true);
      inputRef.current.focus();
    } else {
      setHasError(false);
    }
  }

  function submit2() {
    if (nameValue2 === '') {
      setHasError2(true);
      inputRef2.current.focus();
    } else {
      setHasError2(false);
    }
  }

  function reset() {
    setHasError(false);
    setNameValue('');
    inputRef.current.focus();
  }

  function reset2() {
    setHasError2(false);
    setNameValue2('');
    inputRef2.current.focus();
  }

  return (
    <>
      <Input
        errorMessage={hasError ? 'Please provide name' : null}
        labelText="Name *"
        onChange={event => setNameValue(event.target.value)}
        required
        value={nameValue}
        ref={inputRef}
      />
      <Spacer size="12" />
      <ButtonGroup>
        <Button onClick={submit}>Submit</Button>
        <Button onClick={reset} color={ButtonColor.secondary}>
          Reset
        </Button>
      </ButtonGroup>
      <br />
      <br />
      <br />
      <br />
      <Input
        errorMessage={hasError2 ? 'Please provide name' : null}
        helperMessage="Helper text"
        labelText="Name *"
        onChange={event => setNameValue2(event.target.value)}
        required
        value={nameValue2}
        ref={inputRef2}
      />
      <Spacer size="12" />
      <ButtonGroup>
        <Button onClick={submit2}>Submit</Button>
        <Button onClick={reset2} color={ButtonColor.secondary}>
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
        <div style={{ flex: '0 0 auto', marginTop: 'auto' }}>
          <NativeSelect
            labelText={'Native Select'}
            fieldId={'native-select-example'}
          >
            <option>Red</option>
            <option>Green</option>
            <option>Blue</option>
            <option>Purple mountain majesty</option>
          </NativeSelect>
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

export function TimeInput() {
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [totalDurationMilliseconds, setTotalDurationMilliseconds] =
    React.useState(0);

  const makeHoursAndMinutesFromMilliseconds = (
    milliseconds = 0
  ): { hours: number; minutes: number } => {
    const hours = Math.floor(milliseconds / (60 * 60 * 1000));
    const remainingMilliseconds = milliseconds % (60 * 60 * 1000);
    const minutes = Math.floor(remainingMilliseconds / (60 * 1000));

    return {
      hours,
      minutes,
    };
  };

  const onChangeTimedDuration = (
    event: ChangeEvent<HTMLInputElement>,
    unit: 'hours' | 'minutes',
    oppositeUnitValue: number
  ) => {
    const inputValue = event.target.value.replace(/\D/g, '');
    const numericValue = inputValue ? Number(inputValue) : NaN;
    const currentUnitValue =
      numericValue && numericValue >= 0 ? numericValue : 0;
    const isHours = unit === 'hours';

    // Immediate sync for Magma Input
    isHours ? setHours(currentUnitValue) : setMinutes(currentUnitValue);

    const totalDurationMilliseconds = isHours
      ? (currentUnitValue * 60 + oppositeUnitValue) * 60 * 1000
      : (oppositeUnitValue * 60 + currentUnitValue) * 60 * 1000;

    setTotalDurationMilliseconds(totalDurationMilliseconds);
  };

  React.useEffect(() => {
    const { hours, minutes } = makeHoursAndMinutesFromMilliseconds(
      totalDurationMilliseconds
    );
    setHours(hours);
    setMinutes(minutes);
  }, [totalDurationMilliseconds]);

  return (
    <>
      <Paragraph>React Magma inputs:</Paragraph>
      <Input
        type={InputType.number}
        labelText="Hours"
        inputWrapperStyle={{ width: '264px' }}
        min={1}
        max={60}
        value={hours}
        onChange={event => onChangeTimedDuration(event, 'hours', minutes)}
      />
      <Input
        type={InputType.number}
        labelText="Minutes"
        inputWrapperStyle={{ width: '264px' }}
        min={1}
        max={60}
        value={minutes}
        onChange={event => onChangeTimedDuration(event, 'minutes', hours)}
      />
      <Spacer size={32} />
      <Paragraph>Native inputs:</Paragraph>
      <Paragraph style={{ marginBottom: '8px' }}>Hours</Paragraph>
      <div style={{ display: 'flex', flexDirection: 'column', width: '264px' }}>
        <input
          type={InputType.number}
          min={1}
          max={60}
          value={hours}
          onChange={event => onChangeTimedDuration(event, 'hours', minutes)}
        />
        <Paragraph style={{ marginBottom: '8px' }}>Minutes</Paragraph>
        <input
          type={InputType.number}
          min={1}
          max={60}
          value={minutes}
          onChange={event => onChangeTimedDuration(event, 'minutes', hours)}
        />
      </div>
    </>
  );
}

export const CustomTopicsRowStory = () => {
  const topicList = [
    { reference: 'topic1', title: 'Topic 1' },
    { reference: 'topic2', title: 'Topic 2' },
    { reference: 'topic3', title: 'Topic 3' },
  ];

  const [topicTitle, setTopicTitle] = React.useState('');
  const [testTopic, setTestTopic] = React.useState<string | undefined>();
  const [studyMaterialsTopic, setStudyMaterialsTopic] = React.useState<
    string | undefined
  >();

  const removeTopicRow = () => {
    alert('Row removed');
  };

  return (
    <CustomTopicsRow
      topicList={topicList}
      isRemoveButtonDisabled={false}
      shouldValidate
      topicTitle={topicTitle}
      testTopic={testTopic}
      studyMaterialsTopic={studyMaterialsTopic}
      order={1}
      setTopicTitle={setTopicTitle}
      setTestTopic={setTestTopic}
      setStudyMaterialsTopic={setStudyMaterialsTopic}
      removeTopicRow={removeTopicRow}
    />
  );
};
