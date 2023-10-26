import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';
import { Card } from 'react-magma-dom';

export default {
  component: CarbonChart,
  title: 'CarbonChart',
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
    <CarbonChart {...args}>Sample text</CarbonChart>
  </Card>
);

//Simple//
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
        ticks: {
          formatter: _ => _.toLocaleString('tr-TR'),
        },
      },
      bottom: {
        mapsTo: 'date',
        scaleType: 'time',
        ticks: {
          formatter: _ =>
            _.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' }),
        },
      },
    },
    tooltip: {
      valueFormatter: (_, e) =>
        'x-value' == e
          ? _.toLocaleDateString('tr-TR', { month: 'long', day: 'numeric' })
          : 'y-value' == e
          ? _.toLocaleString('tr-TR')
          : _,
    },
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
//Simple//

//Floating//
export const HorizontalFloatingBarTimeSeries = Template.bind({});
HorizontalFloatingBarTimeSeries.args = {
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
};
export const FloatingVerticalBarDiscrete = Template.bind({});
FloatingVerticalBarDiscrete.args = {
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
};
export const FloatingHorizontalBarDiscrete = Template.bind({});
FloatingHorizontalBarDiscrete.args = {
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
};
//Floating//

//Grouped//
export const VerticalGroupedBarDiscrete = Template.bind({});
VerticalGroupedBarDiscrete.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [
    {
      group: 'Dataset 1',
      key: 'Qty',
      value: 65000,
    },
    {
      group: 'Dataset 1',
      key: 'More',
      value: -29123,
    },
    {
      group: 'Dataset 1',
      key: 'Sold',
      value: -35213,
    },
    {
      group: 'Dataset 1',
      key: 'Restocking',
      value: 51213,
    },
    {
      group: 'Dataset 1',
      key: 'Misc',
      value: 16932,
    },
    {
      group: 'Dataset 2',
      key: 'Qty',
      value: 32432,
    },
    {
      group: 'Dataset 2',
      key: 'More',
      value: -21312,
    },
    {
      group: 'Dataset 2',
      key: 'Sold',
      value: -56456,
    },
    {
      group: 'Dataset 2',
      key: 'Restocking',
      value: -21312,
    },
    {
      group: 'Dataset 2',
      key: 'Misc',
      value: 34234,
    },
    {
      group: 'Dataset 3',
      key: 'Qty',
      value: -12312,
    },
    {
      group: 'Dataset 3',
      key: 'More',
      value: 23232,
    },
    {
      group: 'Dataset 3',
      key: 'Sold',
      value: 34232,
    },
    {
      group: 'Dataset 3',
      key: 'Restocking',
      value: -12312,
    },
    {
      group: 'Dataset 3',
      key: 'Misc',
      value: -34234,
    },
    {
      group: 'Dataset 4',
      key: 'Qty',
      value: -32423,
    },
    {
      group: 'Dataset 4',
      key: 'More',
      value: 21313,
    },
    {
      group: 'Dataset 4',
      key: 'Sold',
      value: 64353,
    },
    {
      group: 'Dataset 4',
      key: 'Restocking',
      value: 24134,
    },
    {
      group: 'Dataset 4',
      key: 'Misc',
      value: 24134,
    },
  ],
  options: {
    title: 'Vertical grouped bar (discrete)',
    axes: {
      left: {
        mapsTo: 'value',
      },
      bottom: {
        scaleType: 'labels',
        mapsTo: 'key',
      },
    },
    height: '400px',
  },
};

export const VerticalGroupedBarTimeSeries = Template.bind({});
VerticalGroupedBarTimeSeries.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 1),
      value: 10000,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 2),
      value: 65000,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 3),
      value: 30000,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 6),
      value: 49213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 7),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 1),
      value: 8000,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 2),
      value: 67000,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 3),
      value: 15000,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 6),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 7),
      value: 45213,
    },
  ],
  options: {
    title: 'Vertical grouped bar (time series)',
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

export const VerticalGroupedBarTimeSeriesDenseData = Template.bind({});
VerticalGroupedBarTimeSeriesDenseData.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 1),
      value: 10000,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 2),
      value: 65000,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 3),
      value: 30000,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 6),
      value: 49213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 7),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 8),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 9),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 10),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 11),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 12),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 13),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 14),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 15),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 16),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 17),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 18),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 19),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 20),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 21),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 22),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 23),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 24),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 25),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 26),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 27),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 28),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 29),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 30),
      value: 51213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 31),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 1),
      value: 8000,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 2),
      value: 67000,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 3),
      value: 15000,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 6),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 7),
      value: 45213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 8),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 9),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 10),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 11),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 12),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 13),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 14),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 15),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 16),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 17),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 18),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 19),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 20),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 21),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 22),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 23),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 24),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 25),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 26),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 27),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 28),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 29),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 30),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 31),
      value: 51213,
    },
  ],
  options: {
    title: 'Vertical grouped bar (time series - dense data)',
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

export const VerticalGroupedBarEmptyState = Template.bind({});
VerticalGroupedBarEmptyState.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [],
  options: {
    title: 'Vertical grouped bar (empty state)',
    axes: {
      left: {},
      bottom: {
        scaleType: 'labels',
      },
    },
    height: '400px',
  },
};

export const VerticalGroupedBarSkeleton = Template.bind({});
VerticalGroupedBarSkeleton.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [],
  options: {
    title: 'Vertical grouped bar (skeleton)',
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
export const HorizontalGroupedBarDiscrete = Template.bind({});
HorizontalGroupedBarDiscrete.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [
    {
      group: 'Dataset 1',
      key: 'Qty',
      value: 65000,
    },
    {
      group: 'Dataset 1',
      key: 'More',
      value: -29123,
    },
    {
      group: 'Dataset 1',
      key: 'Sold',
      value: -35213,
    },
    {
      group: 'Dataset 1',
      key: 'Restocking',
      value: 51213,
    },
    {
      group: 'Dataset 1',
      key: 'Misc',
      value: 16932,
    },
    {
      group: 'Dataset 2',
      key: 'Qty',
      value: 32432,
    },
    {
      group: 'Dataset 2',
      key: 'More',
      value: -21312,
    },
    {
      group: 'Dataset 2',
      key: 'Sold',
      value: -56456,
    },
    {
      group: 'Dataset 2',
      key: 'Restocking',
      value: -21312,
    },
    {
      group: 'Dataset 2',
      key: 'Misc',
      value: 34234,
    },
    {
      group: 'Dataset 3',
      key: 'Qty',
      value: -12312,
    },
    {
      group: 'Dataset 3',
      key: 'More',
      value: 23232,
    },
    {
      group: 'Dataset 3',
      key: 'Sold',
      value: 34232,
    },
    {
      group: 'Dataset 3',
      key: 'Restocking',
      value: -12312,
    },
    {
      group: 'Dataset 3',
      key: 'Misc',
      value: -34234,
    },
    {
      group: 'Dataset 4',
      key: 'Qty',
      value: -32423,
    },
    {
      group: 'Dataset 4',
      key: 'More',
      value: 21313,
    },
    {
      group: 'Dataset 4',
      key: 'Sold',
      value: 64353,
    },
    {
      group: 'Dataset 4',
      key: 'Restocking',
      value: 24134,
    },
    {
      group: 'Dataset 4',
      key: 'Misc',
      value: 24134,
    },
  ],
  options: {
    title: 'Horizontal grouped bar (discrete)',
    axes: {
      left: {
        scaleType: 'labels',
        mapsTo: 'key',
      },
      bottom: {
        mapsTo: 'value',
      },
    },
    height: '400px',
  },
};

export const HorizontalGroupedBarTimeSeries = Template.bind({});
HorizontalGroupedBarTimeSeries.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 1),
      value: 10000,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 2),
      value: 65000,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 3),
      value: 30000,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 6),
      value: 49213,
    },
    {
      group: 'Dataset 1',
      date: new Date(2019, 0, 7),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 1),
      value: 8000,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 2),
      value: 67000,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 3),
      value: 15000,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 6),
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: new Date(2019, 0, 7),
      value: 45213,
    },
  ],
  options: {
    title: 'Horizontal grouped bar (time series)',
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

export const HorizontalGroupedBarEmptyState = Template.bind({});
HorizontalGroupedBarEmptyState.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [],
  options: {
    title: 'Horizontal grouped bar (empty state)',
    axes: {
      left: {
        scaleType: 'labels',
      },
      bottom: {},
    },
    height: '400px',
  },
};

export const HorizontalGroupedBarSkeleton = Template.bind({});
HorizontalGroupedBarSkeleton.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [],
  options: {
    title: 'Horizontal grouped bar (skeleton)',
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
//Grouped//

//Lollipop//
export const LollipopDiscrete = Template.bind({});
LollipopDiscrete.args = {
  isInverse: false,
  type: CarbonChartType.lollipop,
  dataSet: [
    {
      group: 'Dataset 1',
      key: 'Qty',
      value: 34200,
    },
    {
      group: 'Dataset 2',
      key: 'More',
      value: 34200,
    },
    {
      group: 'Dataset 3',
      key: 'Sold',
      value: 41200,
    },
    {
      group: 'Dataset 4',
      key: 'Restocking',
      value: 22000,
    },
  ],
  options: {
    title: 'Lollipop (discrete)',
    axes: {
      bottom: {
        title: '2019 Annual Sales Figures',
        scaleType: 'labels',
        mapsTo: 'key',
      },
      left: {
        mapsTo: 'value',
      },
    },
    height: '400px',
  },
};
export const LollipopHorizontalPresentation = Template.bind({});
LollipopHorizontalPresentation.args = {
  isInverse: false,
  type: CarbonChartType.lollipop,
  dataSet: [
    {
      group: 'Dataset 1',
      key: 'Qty',
      value: 34200,
    },
    {
      group: 'Dataset 2',
      key: 'More',
      value: 34200,
    },
    {
      group: 'Dataset 3',
      key: 'Sold',
      value: 41200,
    },
    {
      group: 'Dataset 4',
      key: 'Restocking',
      value: 22000,
    },
  ],
  options: {
    title: 'Lollipop (horizontal) - presentation',
    axes: {
      left: {
        title: '2019 Annual Sales Figures',
        scaleType: 'labels',
        mapsTo: 'key',
      },
      bottom: {
        mapsTo: 'value',
      },
    },
    points: {
      radius: 7,
    },
    height: '400px',
  },
};
//Lollipop//
