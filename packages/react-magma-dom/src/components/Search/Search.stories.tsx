import React from 'react';
import { Search, SearchProps } from '.';
import { InputSize } from '../InputBase';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<SearchProps> = args => (
  <Search
    {...args}
    onSearch={term => {
      alert(term);
    }}
  />
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
    }
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {};
