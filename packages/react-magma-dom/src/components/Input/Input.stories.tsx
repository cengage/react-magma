import React from 'react';
import { Input, InputProps } from '.';
import { InputIconPosition, InputSize, InputType } from '../InputBase';
import { LabelPosition } from '../Label';
import { Story, Meta } from '@storybook/react/types-6-0';
import { HelpIcon, NotificationsIcon, WorkIcon } from 'react-magma-icons';
import { Card, CardBody } from '../Card';
import { Tooltip } from '../Tooltip';
import { IconButton } from '../IconButton';
import { ButtonSize, ButtonType, ButtonVariant } from '../Button';

const Template: Story<InputProps> = args => (
  <>
    <Input {...args} labelText="Input label" width="100%"/>
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
      <br/>
      <br/>
      <Input
        {...args}
        labelText="Icon Right"
        icon={<WorkIcon />}
        iconPosition={InputIconPosition.right}
      />
        <br/>
        <br/>
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

export const WithChildren = args => {
  const helpLinkLabel = 'Learn more';
  const onHelpLinkClick = () => {
    alert('Help link clicked!');
  };
  return (
    <>
      <Input
        labelText="Help link - top"
        iconPosition={InputIconPosition.top}
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
      <Input
        labelText="Help link - right"
        iconPosition={InputIconPosition.right}
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
      <br />
      <hr />
      <Input labelText="With two icons" icon={<NotificationsIcon />} {...args}>
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
WithChildren.parameters = {
  controls: { exclude: ['iconPosition', 'isInverse', 'type'] },
};
