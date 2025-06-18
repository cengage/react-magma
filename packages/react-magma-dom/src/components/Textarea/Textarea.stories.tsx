import React, { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react/types-6-0';

import { Button } from '../Button';
import { Container } from '../Container';
import { LabelPosition } from '../Label';
import { Spacer } from '../Spacer';

import { Textarea, TextareaProps } from '.';

const Template: StoryFn<TextareaProps> = args => (
  <Textarea {...args} labelText="Textarea label" />
);

export default {
  component: Textarea,
  title: 'Textarea',
  decorators: [
    (Story, context) => (
      <Container isInverse={context.args.isInverse} style={{ padding: '20px' }}>
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    hasCharacterCounter: {
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
    labelWidth: {
      control: {
        type: 'number',
      },
    },
    maxCount: {
      control: {
        type: 'number',
      },
    },
    maxLength: {
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

export const Default = {
  render: Template,

  args: {
    isInverse: false,
  },
};

export const OnClear = {
  render: args => {
    const [fieldValue, setValue] = useState('');

    return (
      <>
        <Textarea
          {...args}
          labelText="Textarea"
          value={fieldValue}
          onChange={e => {
            setValue(e.target.value);
          }}
        />
        <Spacer size="12" />
        <Button
          onClick={e => {
            setValue('');
          }}
        >
          Clear
        </Button>
      </>
    );
  },

  args: {
    ...Default.args,
  },
};
