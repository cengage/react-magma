import React from 'react';

import { StoryFn, Meta } from '@storybook/react';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Bar Floating',
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

export const HorizontalFloatingBarTimeSeries = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.bar,
    dataSet: [
      {
        group: 'Qty',
        date: new Date(2019, 0, 1),
        value: [10000, 41000],
      },
      {
        group: 'More',
        date: new Date(2019, 0, 2),
        value: 65000,
      },
      {
        group: 'Sold',
        date: new Date(2019, 0, 3),
        value: 30000,
      },
      {
        group: 'Restocking',
        date: new Date(2019, 0, 6),
        value: [22000, 69213],
      },
      {
        group: 'Misc',
        date: new Date(2019, 0, 7),
        value: [3500, 71213],
      },
    ],
    options: {
      title: 'Horizontal floating bar (time series)',
      axes: {
        left: {
          mapsTo: 'date',
          scaleType: 'time',
        },
        bottom: {
          mapsTo: 'value',
        },
      },
      height: '400px',
    },
  },
};

export const FloatingVerticalBarDiscrete = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.bar,
    dataSet: [
      {
        group: 'Qty',
        value: [30000, 65000],
      },
      {
        group: 'More',
        value: [15000, 29123],
      },
      {
        group: 'Sold',
        value: [22000, 35213],
      },
      {
        group: 'Restocking',
        value: [28000, 51213],
      },
      {
        group: 'Misc',
        value: [3000, 16932],
      },
    ],
    options: {
      title: 'Floating vertical bar (discrete)',
      axes: {
        left: {
          mapsTo: 'value',
          includeZero: false,
        },
        bottom: {
          mapsTo: 'group',
          scaleType: 'labels',
        },
      },
      height: '400px',
    },
  },
};

export const FloatingHorizontalBarDiscrete = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.bar,
    dataSet: [
      {
        group: 'Qty',
        value: [30000, 65000],
      },
      {
        group: 'More',
        value: [15000, 29123],
      },
      {
        group: 'Sold',
        value: [22000, 35213],
      },
      {
        group: 'Restocking',
        value: [28000, 51213],
      },
      {
        group: 'Misc',
        value: [3000, 36932],
      },
    ],
    options: {
      title: 'Floating horizontal bar (discrete)',
      axes: {
        left: {
          mapsTo: 'group',
          scaleType: 'labels',
        },
        bottom: {
          mapsTo: 'value',
          includeZero: false,
        },
      },
      height: '400px',
    },
  },
};
