import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import { Card, CardBody } from '../Card';
import { InputSize } from '../InputBase';

import { Search, SearchProps } from '.';

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
    isClearable: {
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
Default.args = {
  placeholder: 'Search',
};
