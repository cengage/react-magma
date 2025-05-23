import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Bar Simple',
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

const Template: Story<CarbonChartProps> = args => (
  <Card isInverse={args.isInverse} style={{ padding: '12px' }}>
    <CarbonChart {...args} />
  </Card>
);

export const VerticalSimpleBarDiscrete = Template.bind({});
VerticalSimpleBarDiscrete.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [
    {
      group: 'Qty',
      value: 65000,
    },
    {
      group: 'More',
      value: 29123,
    },
    {
      group: 'Sold',
      value: 35213,
    },
    {
      group: 'Restocking',
      value: 51213,
    },
    {
      group: 'Misc',
      value: 16932,
    },
  ],
  options: {
    title: 'Vertical simple bar (discrete)',
    axes: {
      left: {
        mapsTo: 'value',
      },
      bottom: {
        mapsTo: 'group',
        scaleType: 'labels',
      },
    },
    height: '400px',
  },
};

export const VerticalSimpleBarTimeSeries = Template.bind({});
VerticalSimpleBarTimeSeries.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [
    {
      group: 'Qty',
      date: new Date(2019, 0, 1),
      value: 10000,
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
      value: 49213,
    },
    {
      group: 'Misc',
      date: new Date(2019, 0, 7),
      value: 51213,
    },
  ],
  options: {
    title: 'Vertical simple bar (time series)',
    axes: {
      left: {
        mapsTo: 'value',
      },
      bottom: {
        mapsTo: 'date',
        scaleType: 'time',
      },
    },
    height: '400px',
  },
};

export const VerticalSimpleBarTimeSeriesDenseDataTurkish = Template.bind({});
VerticalSimpleBarTimeSeriesDenseDataTurkish.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 10000,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 20001,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 10002,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 10062,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 30003,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 20004,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 10005,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 50006,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 20006,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 40007,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 30008,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 10000,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 10000,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 20000,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 10000,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 30000,
    },
    {
      group: 'data',
      date: new Date(2019, 1, 1),
      value: 10000,
    },
  ],
  options: {
    title: 'Vertical simple bar (time series - dense data, Turkish)',
    axes: {
      left: {
        mapsTo: 'value',
        ticks: {},
      },
      bottom: {
        mapsTo: 'date',
        scaleType: 'time',
        ticks: {},
      },
    },
    tooltip: {},
    bars: {
      maxWidth: 200,
    },
    height: '400px',
  },
};

export const VerticalSimpleBarEmptyState = Template.bind({});
VerticalSimpleBarEmptyState.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [],
  options: {
    title: 'Vertical simple bar (empty state)',
    axes: {
      left: {},
      bottom: {
        scaleType: 'labels',
      },
    },
    height: '400px',
  },
};

export const VerticalSimpleBarSkeleton = Template.bind({});
VerticalSimpleBarSkeleton.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [],
  options: {
    title: 'Vertical simple bar (skeleton)',
    axes: {
      left: {},
      bottom: {
        scaleType: 'labels',
      },
    },
    data: {
      loading: true,
    },
    height: '400px',
  },
};

export const HorizontalSimpleBarTimeSeries = Template.bind({});
HorizontalSimpleBarTimeSeries.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [
    {
      group: 'Qty',
      date: new Date(2019, 0, 1),
      value: 10000,
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
      value: 49213,
    },
    {
      group: 'Misc',
      date: new Date(2019, 0, 7),
      value: 51213,
    },
  ],
  options: {
    title: 'Horizontal simple bar (time series)',
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
};

export const HorizontalSimpleBarDiscrete = Template.bind({});
HorizontalSimpleBarDiscrete.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [
    {
      group: 'Qty',
      value: 65000,
    },
    {
      group: 'More',
      value: 29123,
    },
    {
      group: 'Sold',
      value: 35213,
    },
    {
      group: 'Restocking',
      value: 51213,
    },
    {
      group: 'Misc',
      value: 16932,
    },
  ],
  options: {
    title: 'Horizontal simple bar (discrete)',
    axes: {
      left: {
        mapsTo: 'group',
        scaleType: 'labels',
      },
      bottom: {
        mapsTo: 'value',
      },
    },
    height: '400px',
  },
};

export const HorizontalSimpleBarSkeleton = Template.bind({});
HorizontalSimpleBarSkeleton.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [],
  options: {
    title: 'Horizontal simple bar (skeleton)',
    axes: {
      left: {
        scaleType: 'labels',
      },
      bottom: {},
    },
    data: {
      loading: true,
    },
    height: '400px',
  },
};

export const HorizontalSimpleBarEmptyState = Template.bind({});
HorizontalSimpleBarEmptyState.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [],
  options: {
    title: 'Horizontal simple bar (empty state)',
    axes: {
      left: {
        scaleType: 'labels',
      },
      bottom: {},
    },
    height: '400px',
  },
};
