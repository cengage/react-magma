import React from 'react';

import { StoryFn, Meta } from '@storybook/react/types-6-0';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Scatter',
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

export const ScatterLinearXAndY = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.scatter,
    dataSet: [
      {
        group: 'Dataset 1',
        employees: 5000,
        sales: 32100,
      },
      {
        group: 'Dataset 1',
        employees: 3000,
        sales: 25100,
      },
      {
        group: 'Dataset 1',
        employees: 8000,
        sales: 12100,
      },
      {
        group: 'Dataset 1',
        employees: 4000,
        sales: 53100,
      },
      {
        group: 'Dataset 2',
        employees: 5000,
        sales: 32100,
      },
      {
        group: 'Dataset 2',
        employees: 2000,
        sales: 34100,
      },
      {
        group: 'Dataset 2',
        employees: 4000,
        sales: 23100,
      },
      {
        group: 'Dataset 2',
        employees: 7000,
        sales: 14100,
      },
      {
        group: 'Dataset 2',
        employees: 6000,
        sales: 53100,
      },
    ],
    options: {
      title: 'Scatter (linear x & y)',
      axes: {
        bottom: {
          title: 'No. of employees',
          mapsTo: 'employees',
          scaleType: 'linear',
        },
        left: {
          title: 'Annual sales',
          mapsTo: 'sales',
          scaleType: 'linear',
        },
      },
      height: '400px',
    },
  },
};
