import React from 'react';

import { StoryFn, Meta } from '@storybook/react/types-6-0';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Histogram',
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

export const HistogramLinear = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.histogram,
    dataSet: [
      {
        group: 'Dataset 1',
        age: 20,
      },
      {
        group: 'Dataset 2',
        age: 21,
      },
      {
        group: 'Dataset 2',
        age: 23,
      },
      {
        group: 'Dataset 3',
        age: 21,
      },
      {
        group: 'Dataset 3',
        age: 23,
      },
      {
        group: 'Dataset 3',
        age: 24,
      },
      {
        group: 'Dataset 1',
        age: 30,
      },
      {
        group: 'Dataset 2',
        age: 34,
      },
      {
        group: 'Dataset 1',
        age: 35,
      },
      {
        group: 'Dataset 3',
        age: 30,
      },
      {
        group: 'Dataset 1',
        age: 40,
      },
      {
        group: 'Dataset 2',
        age: 43,
      },
      {
        group: 'Dataset 1',
        age: 45,
      },
      {
        group: 'Dataset 1',
        age: 46,
      },
      {
        group: 'Dataset 3',
        age: 40,
      },
      {
        group: 'Dataset 3',
        age: 43,
      },
      {
        group: 'Dataset 3',
        age: 45,
      },
      {
        group: 'Dataset 1',
        age: 48,
      },
      {
        group: 'Dataset 1',
        age: 50,
      },
      {
        group: 'Dataset 2',
        age: 55,
      },
      {
        group: 'Dataset 2',
        age: 66,
      },
      {
        group: 'Dataset 2',
        age: 58,
      },
      {
        group: 'Dataset 1',
        age: 70,
      },
      {
        group: 'Dataset 1',
        age: 78,
      },
      {
        group: 'Dataset 3',
        age: 71,
      },
      {
        group: 'Dataset 3',
        age: 75,
      },
      {
        group: 'Dataset 2',
        age: 83,
      },
      {
        group: 'Dataset 2',
        age: 86,
      },
      {
        group: 'Dataset 1',
        age: 87,
      },
    ],
    options: {
      title: 'Histogram (linear)',
      axes: {
        bottom: {
          title: 'Age',
          mapsTo: 'age',
          bins: 10,
          limitDomainToBins: true,
        },
        left: {
          title: 'No. of participants',
          scaleType: 'linear',
          stacked: true,
          binned: true,
        },
      },
      height: '400px',
    },
  },
};
