import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { HelpIcon, NotificationsIcon, WorkIcon } from 'react-magma-icons';
import { Input, InputProps } from '.';
import { Button, ButtonSize, ButtonType, ButtonVariant } from '../Button';
import { Card, CardBody } from '../Card';
import { IconButton } from '../IconButton';
import { InputIconPosition, InputSize, InputType } from '../InputBase';
import { LabelPosition } from '../Label';
import { Tooltip } from '../Tooltip';
import { ButtonGroup } from '../ButtonGroup';

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
      <br />
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

export const SeveralErrors = () => {
  const [inputValues, setInputValues] = React.useState({
    first: '',
    second: '',
    third: '',
  });
  const [hasErrors, setHasErrors] = React.useState({
    first: true,
    second: true,
    third: true,
  });

  const firstInputRef = React.useRef();
  const secondInputRef = React.useRef();
  const thirdInputRef = React.useRef();

  const submit = () => {
    setHasErrors({
      first: false,
      second: false,
      third: false,
    });

    if (!inputValues.third) {
      setHasErrors(prev => ({ ...prev, third: true }));
      thirdInputRef.current.focus();
    }

    if (!inputValues.second) {
      setHasErrors(prev => ({ ...prev, second: true }));
      secondInputRef.current.focus();
    }

    if (!inputValues.first) {
      setHasErrors(prev => ({ ...prev, first: true }));
      firstInputRef.current.focus();
    }
  };

  const reset = () => {
    setHasErrors({
      first: false,
      second: false,
      third: false,
    });
    setInputValues({
      first: '',
      second: '',
      third: '',
    });

    firstInputRef.current.focus();
  };

  return (
    <>
      <Input
        errorMessage={hasErrors.first ? 'First error' : ''}
        helperMessage=""
        labelText="Error 1 *"
        onChange={event =>
          setInputValues(prev => ({ ...prev, first: event.target.value }))
        }
        required
        value={inputValues.first}
        ref={firstInputRef}
      />
      <br />
      <Input
        errorMessage={hasErrors.second ? 'Second error' : ''}
        helperMessage=""
        labelText="Error 2 *"
        onChange={event =>
          setInputValues(prev => ({ ...prev, second: event.target.value }))
        }
        required
        value={inputValues.second}
        ref={secondInputRef}
      />
      <br />
      <Input
        errorMessage={hasErrors.third ? 'Third error' : ''}
        helperMessage=""
        labelText="Error 3 *"
        onChange={event =>
          setInputValues(prev => ({ ...prev, third: event.target.value }))
        }
        required
        value={inputValues.third}
        ref={thirdInputRef}
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
