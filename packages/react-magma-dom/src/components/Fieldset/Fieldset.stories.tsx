import React from 'react';

import { StoryFn, Meta } from '@storybook/react-webpack5';

import { Card, CardBody } from '../Card';
import { Checkbox } from '../Checkbox';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';

import { Fieldset, FieldsetProps } from '.';

const Template: StoryFn<FieldsetProps> = args => (
  <Fieldset {...args}>{args.children || 'Fieldset content'}</Fieldset>
);

export default {
  component: Fieldset,
  title: 'Fieldset',
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['fieldset', 'div'],
    },
    visuallyHiddenLegend: {
      control: { type: 'boolean' },
    },
    isInverse: {
      control: { type: 'boolean' },
    },
  },
} as Meta;

export const Default = {
  render: Template,
  args: {
    legend: 'Group label',
    children: 'Content inside the fieldset',
  },
};

export const VisuallyHiddenLegend = {
  render: Template,
  args: {
    ...Default.args,
    legend: 'Hidden legend',
    visuallyHiddenLegend: true,
    children:
      'The legend above is visually hidden but accessible to screen readers.',
  },
};

export const AsDiv = {
  render: Template,
  args: {
    ...Default.args,
    as: 'div',
    legend: 'Div group label',
    children: 'This renders as a div with role="group" and aria-labelledby.',
  },
};

export const WithCheckboxes = {
  render: (args: FieldsetProps) => (
    <Fieldset {...args}>
      <Checkbox labelText="Option A" />
      <Checkbox labelText="Option B" />
      <Checkbox labelText="Option C" />
    </Fieldset>
  ),
  args: {
    legend: 'Select your options',
  },
};

export const WithRadios = {
  render: (args: FieldsetProps) => (
    <Fieldset {...args}>
      <RadioGroup labelText="Choose one" name="radio-example">
        <Radio labelText="Radio A" value="a" />
        <Radio labelText="Radio B" value="b" />
        <Radio labelText="Radio C" value="c" />
      </RadioGroup>
    </Fieldset>
  ),
  args: {
    legend: 'Radio group',
  },
};

export const Inverse = {
  render: (args: FieldsetProps) => (
    <Card isInverse>
      <CardBody>
        <Fieldset {...args} isInverse>
          <Checkbox labelText="Option A" />
          <Checkbox labelText="Option B" />
        </Fieldset>
      </CardBody>
    </Card>
  ),
  args: {
    legend: 'Inverse fieldset',
  },
};
