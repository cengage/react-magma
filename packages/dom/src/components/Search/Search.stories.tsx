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
    isClearable
  />
);

export default {
  title: 'Search',
  component: Search,
  argTypes: {
    inputSize: {
      control: {
        type: 'select',
        options: InputSize,
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {};
