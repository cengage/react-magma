import React from 'react';
import { Chart, ChartProps } from './index';
import { Story, Meta } from '@storybook/react/types-6-0';

const data = [
  {
    name: 'Team 1',
    data: [
      { x: 1, y: 3.9, label: 'Team 1, January, $39k' },
      { x: 2, y: 2.8, label: 'Team 1, February, $28k' },
      { x: 3, y: 3.5, label: 'Team 1, March, $35k' },
      { x: 4, y: 4.4, label: 'Team 1, April, $44k' },
      { x: 5, y: 2.1, label: 'Team 1, May, $21k' },
    ],
  },
  {
    name: 'Team 2',
    data: [
      { x: 1, y: 2.7, label: 'Team 2, January, $39k' },
      { x: 2, y: 3.3, label: 'Team 2, February, $33k' },
      { x: 3, y: 3.9, label: 'Team 2, March, $39k' },
      { x: 4, y: 2.8, label: 'Team 2, April, $28k' },
      { x: 5, y: 1.9, label: 'Team 2, May, $19k' },
    ],
  },
  {
    name: 'Team 2',
    data: [
      { x: 1, y: 3.2, label: 'Team 3, January, $39k' },
      { x: 2, y: 4.1, label: 'Team 3, February, $39k' },
      { x: 3, y: 4.5, label: 'Team 3, March, $39k' },
      { x: 4, y: 5.6, label: 'Team 3, April, $39k' },
      { x: 5, y: 4.8, label: 'Team 3, May, $39k' },
    ],
  },
  {
    name: 'Team 2',
    data: [
      { x: 1, y: 4.8, label: 'Team 4, January, $48k' },
      { x: 2, y: 6.6, label: 'Team 4, February, $66k' },
      { x: 3, y: 5.2, label: 'Team 4, March, $52k' },
      { x: 4, y: 3.6, label: 'Team 4, April, $36k' },
      { x: 5, y: 1.0, label: 'Team 4, May, $10k' },
    ],
  },
];

const Template: Story<ChartProps<any>> = args => <Chart {...args} />;

export default {
  title: 'Chart',
  component: Chart,
} as Meta;

const title =
  'Annual sales figures for 2019 description - Lorem ipsum dolor sitamet, consectetur adipiscing elit.';

export const Default = Template.bind({});
Default.args = {
  data: data,
  title,
  type: 'line',
  componentProps: {
    xAxis: {
      label: '2019 Annual Sales Figures',
      tickFormat: ['Jan', 'Feb', 'March', 'April', 'May'],
    },
    yAxis: {
      domain: [0, 8],
      label: 'Conversion Rate',
      tickFormat: t => `$${t}0k`,
      tickValues: [1, 2, 3, 4, 5, 6, 7, 8],
    },
  },
};

interface ExplicitDataInterface {
  month: string | number;
  sales: string | number;
  [key: string]: any;
}

const explicitData = [
  {
    name: 'Team 1',
    data: [
      { month: 1, sales: 3.9, label: 'Team 1, January, $39k' },
      { month: 2, sales: 2.8, label: 'Team 1, February, $28k' },
      { month: 3, sales: 3.5, label: 'Team 1, March, $35k' },
      { month: 4, sales: 4.4, label: 'Team 1, April, $44k' },
      { month: 5, sales: 2.1, label: 'Team 1, May, $21k' },
    ],
  },
  {
    name: 'Team 2',
    data: [
      { month: 1, sales: 2.7, label: 'Team 2, January, $39k' },
      { month: 2, sales: 3.3, label: 'Team 2, February, $33k' },
      { month: 3, sales: 3.9, label: 'Team 2, March, $39k' },
      { month: 4, sales: 2.8, label: 'Team 2, April, $28k' },
      { month: 5, sales: 1.9, label: 'Team 2, May, $19k' },
    ],
  },
  {
    name: 'Team 2',
    data: [
      { month: 1, sales: 3.2, label: 'Team 3, January, $39k' },
      { month: 2, sales: 4.1, label: 'Team 3, February, $39k' },
      { month: 3, sales: 4.5, label: 'Team 3, March, $39k' },
      { month: 4, sales: 5.6, label: 'Team 3, April, $39k' },
      { month: 5, sales: 4.8, label: 'Team 3, May, $39k' },
    ],
  },
  {
    name: 'Team 2',
    data: [
      { month: 1, sales: 4.8, label: 'Team 4, January, $48k' },
      { month: 2, sales: 6.6, label: 'Team 4, February, $66k' },
      { month: 3, sales: 5.2, label: 'Team 4, March, $52k' },
      { month: 4, sales: 3.6, label: 'Team 4, April, $36k' },
      { month: 5, sales: 1.0, label: 'Team 4, May, $10k' },
    ],
  },
];

const ExplicitDataTemplate: Story<ChartProps<ExplicitDataInterface>> = args => (
  <Chart {...args} />
);

export const ExplicitData = ExplicitDataTemplate.bind({});
ExplicitData.args = {
  ...Default.args,
  data: explicitData,
  x: 'month',
  y: 'sales',
};
