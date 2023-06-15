import React from 'react';
import { Container } from '../Container';
import { CharacterCounter, CharacterCounterProps } from '.';
import { HelpIcon } from 'react-magma-icons';
import { ButtonType, ButtonSize, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Tooltip } from '../Tooltip';
import { Story, Meta } from '@storybook/react/types-6-0';
import { LabelPosition } from '../Label';

const labelText = 'Character Counter';

const Template: Story<CharacterCounterProps> = args => (
  <>
    <Input {...args} testId="test-this-id" labelText={labelText} />
  </>
);

export default {
  component: CharacterCounter,
  title: 'CharacterCounter',
  decorators: [
    (Story, context) => (
      <Container isInverse={context.args.isInverse} style={{ padding: '20px' }}>
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    errorMessage: {
      control: {
        type: 'text',
      },
    },
    hasCharacterCounter: {
      control: {
        type: 'boolean',
      },
    },
    helperMessage: {
      control: {
        type: 'text',
      },
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    isClearable: {
      control: {
        type: 'boolean',
      },
    },
    labelPosition: {
      control: {
        type: 'select',
        options: LabelPosition,
      },
    },
    maxLength: {
      control: {
        type: 'number',
      },
    },
    maxCount: {
      control: {
        type: 'number',
      },
    },
    value: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  isInverse: false,
};

export const WithChildren = args => {
  const helpLinkLabel = 'Learn more';
  const onHelpLinkClick = () => {
    alert('Help link clicked!');
  };
  return (
    <Input labelText={labelText} {...args}>
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
  );
};
WithChildren.args = {
  ...Default.args,
};

export const TextArea = args => {
  return <Textarea labelText={labelText} {...args} />;
};
TextArea.args = {
  ...Default.args,
};
TextArea.parameters = { controls: { exclude: ['isClearable'] } };
