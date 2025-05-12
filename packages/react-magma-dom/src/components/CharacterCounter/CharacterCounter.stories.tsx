import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import { HelpIcon } from 'react-magma-icons';

import { ButtonType, ButtonSize, ButtonVariant } from '../Button';
import { Container } from '../Container';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import { LabelPosition } from '../Label';
import { Textarea } from '../Textarea';
import { Tooltip } from '../Tooltip';

import { CharacterCounter, CharacterCounterProps } from '.';

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

export const MaxCountAndMaxLength = args => {
  return (
    <>
      <h1>Input</h1>
      MAXCOUNT
      <br />
      <Input maxCount={args.maxCount} labelText="Default Character Counter" />
      <br />
      <Input
        maxCount={args.maxCount}
        hasCharacterCounter
        labelText="Default Character Counter, hasCharacterCounter true"
      />
      <br />
      <Input
        maxCount={args.maxCount}
        hasCharacterCounter={false}
        labelText="Default Character Counter, hasCharacterCounter false"
      />
      <br />
      <br />
      <br />
      MAXLENGTH
      <br />
      <Input
        maxLength={args.maxLength}
        labelText="Default maxLength Character Counter"
      />
      <br />
      <Input
        maxLength={args.maxLength}
        hasCharacterCounter
        labelText="Default maxLength Character Counter, hasCharacterCounter true"
      />
      <br />
      <Input
        maxLength={args.maxLength}
        hasCharacterCounter={false}
        labelText="Default maxLength Character Counter, hasCharacterCounter false"
      />
      <br />
      <br />
      <br />
      MAXLENGTH + MAXCOUNT
      <br />
      <Input
        maxLength={args.maxLength}
        maxCount={args.maxCount}
        labelText="MAXLENGTH + MAXCOUNT Character Counter"
      />
      <br />
      <Input
        maxLength={args.maxLength}
        maxCount={args.maxCount}
        hasCharacterCounter
        labelText="MAXLENGTH + MAXCOUNT Character Counter, hasCharacterCounter true"
      />
      <br />
      <Input
        maxLength={args.maxLength}
        maxCount={args.maxCount}
        hasCharacterCounter={false}
        labelText="MAXLENGTH + MAXCOUNT Character Counter, hasCharacterCounter false"
      />
      <br />
      <br />
      <br />
      <h1>Textarea</h1>
      MAXCOUNT
      <br />
      <Textarea
        maxCount={args.maxCount}
        labelText="Default Character Counter"
      />
      <br />
      <Textarea
        maxCount={args.maxCount}
        hasCharacterCounter
        labelText="Default Character Counter, hasCharacterCounter true"
      />
      <br />
      <Textarea
        maxCount={args.maxCount}
        hasCharacterCounter={false}
        labelText="Default Character Counter, hasCharacterCounter false"
      />
      <br />
      <br />
      <br />
      MAXLENGTH
      <br />
      <Textarea
        maxLength={args.maxLength}
        labelText="Default maxLength Character Counter"
      />
      <br />
      <Textarea
        maxLength={args.maxLength}
        hasCharacterCounter
        labelText="Default maxLength Character Counter, hasCharacterCounter true"
      />
      <br />
      <Textarea
        maxLength={args.maxLength}
        hasCharacterCounter={false}
        labelText="Default maxLength Character Counter, hasCharacterCounter false"
      />
      <br />
      <br />
      <br />
      MAXLENGTH + MAXCOUNT
      <br />
      <Textarea
        maxLength={args.maxLength}
        maxCount={args.maxCount}
        labelText="MAXLENGTH + MAXCOUNT Character Counter"
      />
      <br />
      <Textarea
        maxLength={args.maxLength}
        maxCount={args.maxCount}
        hasCharacterCounter
        labelText="MAXLENGTH + MAXCOUNT Character Counter, hasCharacterCounter true"
      />
      <br />
      <Textarea
        maxLength={args.maxLength}
        maxCount={args.maxCount}
        hasCharacterCounter={false}
        labelText="MAXLENGTH + MAXCOUNT Character Counter, hasCharacterCounter false"
      />
      <br />
      <br />
    </>
  );
};

MaxCountAndMaxLength.args = {
  maxCount: 10,
  maxLength: 5,
};
MaxCountAndMaxLength.parameters = {
  controls: {
    exclude: [
      'isClearable',
      'helperMessage',
      'errorMessage',
      'isInverse',
      'labelPosition',
      'hasCharacterCounter',
      'value',
    ],
  },
};
