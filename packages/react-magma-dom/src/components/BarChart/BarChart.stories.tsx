import React from 'react';
import { BarChart, BarChartProps } from './index';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<BarChartProps> = args => <BarChart {...args} />;

export default {
  title: 'BarChart',
  component: BarChart,
} as Meta;

export const Default = Template.bind({});
Default.args = {};
