import React, { useState } from 'react';
import { Button } from '../Button';
import { Container } from '../Container';
import { LabelPosition } from '../Label';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Spacer } from '../Spacer';
import { Textarea, TextareaProps } from '.';

const Template: Story<TextareaProps> = args => (
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
    labelPosition: {
      control: {
        type: 'select',
        options: LabelPosition,
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  isInverse: false,
};

export const OnClear = args => {
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
};
OnClear.args = {
  ...Default.args,
};
