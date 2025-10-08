import React from 'react';

import { StoryFn, Meta } from '@storybook/react';

import { Card, CardBody } from '../Card';
import { InputSize } from '../InputBase';

import { Search, SearchProps } from '.';

const Template: StoryFn<SearchProps> = args => (
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

export const Default = {
  render: Template,

  args: {
    placeholder: 'Search',
  },
};
