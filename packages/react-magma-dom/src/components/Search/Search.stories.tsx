import React from 'react';
import { Search, SearchProps } from '.';
import { InputSize } from '../InputBase';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Card, CardBody } from '../Card';

const Template: Story<SearchProps> = args => (
  <Card isInverse={args.isInverse}>
    <CardBody>
      <Search
        {...args}
        onSearch={term => {
          alert(term);
        }}
      />
    </CardBody>
  </Card>
);

export default {
  title: 'Search',
  component: Search,
  argTypes: {
    disabled: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    inputSize: {
      control: {
        type: 'select',
        options: InputSize,
      },
    },
    isPredictive: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    isInverse: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {};
