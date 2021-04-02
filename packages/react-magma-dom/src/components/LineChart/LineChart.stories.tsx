import React from 'react';
import { LineChart, LineChartProps } from './index';
import { Story, Meta } from '@storybook/react/types-6-0';

const data = [
  [
    { x: 1, y: 3.9, label: 'Team 1, January, $39k' },
    { x: 2, y: 2.8, label: 'Team 1, February, $28k' },
    { x: 3, y: 3.5, label: 'Team 1, March, $35k' },
    { x: 4, y: 4.4, label: 'Team 1, April, $44k' },
    { x: 5, y: 2.1, label: 'Team 1, May, $21k' },
  ],
  [
    { x: 1, y: 2.7, label: 'Team 2, January, $39k' },
    { x: 2, y: 3.3, label: 'Team 2, February, $33k' },
    { x: 3, y: 3.9, label: 'Team 2, March, $39k' },
    { x: 4, y: 2.8, label: 'Team 2, April, $28k' },
    { x: 5, y: 1.9, label: 'Team 2, May, $19k' },
  ],
  [
    { x: 1, y: 3.2, label: 'Team 3, January, $39k' },
    { x: 2, y: 4.1, label: 'Team 3, February, $39k' },
    { x: 3, y: 4.5, label: 'Team 3, March, $39k' },
    { x: 4, y: 5.6, label: 'Team 3, April, $39k' },
    { x: 5, y: 4.8, label: 'Team 3, May, $39k' },
  ],
  [
    { x: 1, y: 4.8, label: 'Team 4, January, $48k' },
    { x: 2, y: 6.6, label: 'Team 4, February, $66k' },
    { x: 3, y: 5.2, label: 'Team 4, March, $52k' },
    { x: 4, y: 3.6, label: 'Team 4, April, $36k' },
    { x: 5, y: 1.0, label: 'Team 4, May, $10k' },
  ],
];

const Template: Story<LineChartProps> = args => <LineChart {...args} />;

export default {
  title: 'LineChart',
  component: LineChart,
} as Meta;

export const Default = Template.bind({});
Default.args = {
  data: data,
};
