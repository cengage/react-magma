import React from 'react';

import { StoryFn, Meta } from '@storybook/react/types-6-0';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Bubble',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    type: {
      control: {
        type: 'select',
        options: CarbonChartType,
      },
    },
  },
} as Meta;

const Template: StoryFn<CarbonChartProps> = args => (
  <Card isInverse={args.isInverse} style={{ padding: '12px' }}>
    <CarbonChart {...args} />
  </Card>
);

export const BubbleLinear = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.bubble,
    dataSet: [
      {
        group: 'Dataset 1',
        sales: 10000,
        profit: 32100,
        surplus: 50000,
      },
      {
        group: 'Dataset 1',
        sales: 12000,
        profit: 23500,
        surplus: 34000,
      },
      {
        group: 'Dataset 1',
        sales: 14000,
        profit: 53100,
        surplus: 63000,
      },
      {
        group: 'Dataset 1',
        sales: 15000,
        profit: 42300,
        surplus: 43000,
      },
      {
        group: 'Dataset 1',
        sales: 16000,
        profit: 12300,
        surplus: 55000,
      },
      {
        group: 'Dataset 2',
        sales: 11000,
        profit: 12400,
        surplus: 25000,
      },
      {
        group: 'Dataset 2',
        sales: 13000,
        profit: 34500,
        surplus: 35000,
      },
      {
        group: 'Dataset 2',
        sales: 13500,
        profit: 23100,
        surplus: 55000,
      },
      {
        group: 'Dataset 2',
        sales: 15500,
        profit: 63200,
        surplus: 35000,
      },
      {
        group: 'Dataset 2',
        sales: 15750,
        profit: 24300,
        surplus: 64000,
      },
    ],
    options: {
      title: 'Bubble (linear)',
      axes: {
        bottom: {
          title: 'No. of employees',
          mapsTo: 'sales',
          includeZero: false,
        },
        left: {
          title: 'Annual sales',
          mapsTo: 'profit',
          includeZero: false,
        },
      },
      bubble: {
        radiusMapsTo: 'surplus',
        radiusLabel: 'Surplus',
      },
      legend: {
        additionalItems: [
          {
            type: 'radius',
            name: 'Surplus',
          },
        ],
      },
      height: '400px',
    },
  },
};
