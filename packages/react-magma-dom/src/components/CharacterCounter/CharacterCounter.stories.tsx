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

const Template: Story<CharacterCounterProps> = args => (
  <>
    <Input
      {...args}
      testId="test-this-id"
      labelText="Character Counter"
      maxLength={4}
    />
  </>
);

export default {
  component: CharacterCounter,
  title: 'CharacterCounter',
  argTypes: {
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
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  isInverse: false,
};

export const Inverse = Template.bind({});
Inverse.args = {
  ...Default.args,
  isInverse: true,
};

export const WithHelperText = args => {
  return (
    <Input
      labelText="Character Counter"
      helperMessage={'Life in a northern town'}
      maxLength={22}
    />
  );
};

export const WithError = args => {
  return (
    <Input
      labelText="Character Counter"
      errorMessage={'Life in a northern town'}
      maxLength={22}
    />
  );
};

export const WithChildren = args => {
  const helpLinkLabel = 'Learn more';
  const onHelpLinkClick = () => {
    alert('Help link clicked!');
  };
  return (
    <Input
      labelText="Character Counter"
      errorMessage={'Life in a northern town'}
      maxLength={22}
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
  );
};

export const TextArea = args => {
  return <Textarea labelText="Character Counter" maxLength={45} />;
};

Inverse.decorators = [
  Story => (
    <Container isInverse style={{ padding: '20px' }}>
      <Story />
    </Container>
  ),
];
