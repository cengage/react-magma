import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Bar Stacked',
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

export const VerticalStackedBarDiscrete = Template.bind({});
VerticalStackedBarDiscrete.args = {
  isInverse: false,
  type: CarbonChartType.barStacked,
  dataSet: [
    {
      group: 'Dataset 1',
      key: 'Qty',
      value: 65000,
    },
    {
      group: 'Dataset 1',
      key: 'More',
      value: 29123,
    },
    {
      group: 'Dataset 1',
      key: 'Sold',
      value: 35213,
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
      value: 21312,
    },
    {
      group: 'Dataset 2',
      key: 'Sold',
      value: 56456,
    },
    {
      group: 'Dataset 2',
      key: 'Restocking',
      value: 21312,
    },
    {
      group: 'Dataset 2',
      key: 'Misc',
      value: 34234,
    },
    {
      group: 'Dataset 3',
      key: 'Qty',
      value: 12312,
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
      value: 12312,
    },
    {
      group: 'Dataset 3',
      key: 'Misc',
      value: 34234,
    },
    {
      group: 'Dataset 4',
      key: 'Qty',
      value: 32423,
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
      value: 32423,
    },
  ],
  options: {
    title: 'Vertical stacked bar (discrete)',
    axes: {
      left: {
        mapsTo: 'value',
        stacked: true,
      },
      bottom: {
        mapsTo: 'key',
        scaleType: 'labels',
      },
    },
    height: '400px',
  },
};

export const VerticalStackedBarDivergent = Template.bind({});
VerticalStackedBarDivergent.args = {
  isInverse: false,
  type: CarbonChartType.barStacked,
  dataSet: [
    {
      group: 'Dataset 1',
      key: 'Qty',
      value: 65000,
    },
    {
      group: 'Dataset 1',
      key: 'More',
      value: 29123,
    },
    {
      group: 'Dataset 1',
      key: 'Sold',
      value: 35213,
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
      value: 21312,
    },
    {
      group: 'Dataset 2',
      key: 'Sold',
      value: 56456,
    },
    {
      group: 'Dataset 2',
      key: 'Restocking',
      value: 21312,
    },
    {
      group: 'Dataset 2',
      key: 'Misc',
      value: 34234,
    },
    {
      group: 'Dataset 3',
      key: 'Qty',
      value: 12312,
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
      value: 12312,
    },
    {
      group: 'Dataset 3',
      key: 'Misc',
      value: 34234,
    },
    {
      group: 'Dataset 4',
      key: 'Qty',
      value: -32423,
    },
    {
      group: 'Dataset 4',
      key: 'More',
      value: -21313,
    },
    {
      group: 'Dataset 4',
      key: 'Sold',
      value: -64353,
    },
    {
      group: 'Dataset 4',
      key: 'Restocking',
      value: -24134,
    },
    {
      group: 'Dataset 4',
      key: 'Misc',
      value: -32423,
    },
  ],
  options: {
    title: 'Vertical stacked bar (divergent)',
    axes: {
      left: {
        mapsTo: 'value',
        stacked: true,
      },
      bottom: {
        mapsTo: 'key',
        scaleType: 'labels',
      },
    },
    height: '400px',
  },
};

export const VerticalStackedBarTimeSeries = Template.bind({});
VerticalStackedBarTimeSeries.args = {
  isInverse: false,
  type: CarbonChartType.barStacked,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2019-01-01T05:00:00.000Z',
      value: 10000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-05T05:00:00.000Z',
      value: 65000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-08T05:00:00.000Z',
      value: 10000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-13T05:00:00.000Z',
      value: 49213,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-17T05:00:00.000Z',
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-03T05:00:00.000Z',
      value: 75000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-06T05:00:00.000Z',
      value: 57312,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-08T05:00:00.000Z',
      value: 21432,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-15T05:00:00.000Z',
      value: 70323,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-19T05:00:00.000Z',
      value: 21300,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-01T05:00:00.000Z',
      value: 50000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-05T05:00:00.000Z',
      value: 15000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-08T05:00:00.000Z',
      value: 20000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-13T05:00:00.000Z',
      value: 39213,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-17T05:00:00.000Z',
      value: 61213,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-02T05:00:00.000Z',
      value: 10,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-06T05:00:00.000Z',
      value: 37312,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-08T05:00:00.000Z',
      value: 51432,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-15T05:00:00.000Z',
      value: 40323,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-19T05:00:00.000Z',
      value: 31300,
    },
  ],
  options: {
    title: 'Vertical stacked bar (time series)',
    axes: {
      left: {
        mapsTo: 'value',
        stacked: true,
      },
      bottom: {
        mapsTo: 'date',
        scaleType: 'time',
      },
    },
    height: '400px',
  },
};

export const VerticalStackedBarShortIntervalTimeSeries = Template.bind({});
VerticalStackedBarShortIntervalTimeSeries.args = {
  isInverse: false,
  type: CarbonChartType.barStacked,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2019-01-01T13:05:06.111Z',
      value: 0,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-01T13:05:06.222Z',
      value: 65000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-01T13:05:06.333Z',
      value: 10000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-01T13:05:06.444Z',
      value: 49213,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-01T13:05:06.555Z',
      value: 0,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-01T13:05:06.111Z',
      value: 0,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-01T13:05:06.222Z',
      value: 57312,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-01T13:05:06.333Z',
      value: 21432,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-01T13:05:06.444Z',
      value: 70323,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-01T13:05:06.555Z',
      value: 0,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-01T13:05:06.111Z',
      value: 0,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-01T13:05:06.222Z',
      value: 15000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-01T13:05:06.333Z',
      value: 20000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-01T13:05:06.444Z',
      value: 39213,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-01T13:05:06.555Z',
      value: 0,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-01T13:05:06.111Z',
      value: 0,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-01T13:05:06.222Z',
      value: 37312,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-01T13:05:06.333Z',
      value: 51432,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-01T13:05:06.444Z',
      value: 40323,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-01T13:05:06.555Z',
      value: 0,
    },
  ],
  options: {
    title: 'Vertical stacked bar (short interval time series)',
    axes: {
      left: {
        mapsTo: 'value',
        stacked: true,
      },
      bottom: {
        mapsTo: 'date',
        scaleType: 'time',
      },
    },
    height: '400px',
  },
};

export const VerticalStackedBarEmptyState = Template.bind({});
VerticalStackedBarEmptyState.args = {
  isInverse: false,
  type: CarbonChartType.barStacked,
  dataSet: [],
  options: {
    title: 'Vertical stacked bar (empty state)',
    axes: {
      left: {},
      bottom: {
        scaleType: 'labels',
      },
    },
    height: '400px',
  },
};
export const VerticalStackedBarSkeleton = Template.bind({});
VerticalStackedBarSkeleton.args = {
  isInverse: false,
  type: CarbonChartType.barStacked,
  dataSet: [],
  options: {
    title: 'Vertical stacked bar (skeleton)',
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

export const HorizontalStackedBarDiscrete = Template.bind({});
HorizontalStackedBarDiscrete.args = {
  isInverse: false,
  type: CarbonChartType.barStacked,
  dataSet: [
    {
      group: 'Dataset 1',
      key: 'Qty',
      value: 65000,
    },
    {
      group: 'Dataset 1',
      key: 'More',
      value: 29123,
    },
    {
      group: 'Dataset 1',
      key: 'Sold',
      value: 35213,
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
      value: 21312,
    },
    {
      group: 'Dataset 2',
      key: 'Sold',
      value: 56456,
    },
    {
      group: 'Dataset 2',
      key: 'Restocking',
      value: 21312,
    },
    {
      group: 'Dataset 2',
      key: 'Misc',
      value: 34234,
    },
    {
      group: 'Dataset 3',
      key: 'Qty',
      value: 12312,
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
      value: 12312,
    },
    {
      group: 'Dataset 3',
      key: 'Misc',
      value: 34234,
    },
    {
      group: 'Dataset 4',
      key: 'Qty',
      value: 32423,
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
      value: 32423,
    },
  ],
  options: {
    title: 'Horizontal stacked bar (discrete)',
    axes: {
      left: {
        scaleType: 'labels',
        mapsTo: 'key',
      },
      bottom: {
        stacked: true,
        mapsTo: 'value',
      },
    },
    height: '400px',
  },
};

export const HorizontalStackedBarTimeSeries = Template.bind({});
HorizontalStackedBarTimeSeries.args = {
  isInverse: false,
  type: CarbonChartType.barStacked,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2019-01-01T05:00:00.000Z',
      value: 10000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-05T05:00:00.000Z',
      value: 65000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-08T05:00:00.000Z',
      value: 10000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-13T05:00:00.000Z',
      value: 49213,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-17T05:00:00.000Z',
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-03T05:00:00.000Z',
      value: 75000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-06T05:00:00.000Z',
      value: 57312,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-08T05:00:00.000Z',
      value: 21432,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-15T05:00:00.000Z',
      value: 70323,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-19T05:00:00.000Z',
      value: 21300,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-01T05:00:00.000Z',
      value: 50000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-05T05:00:00.000Z',
      value: 15000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-08T05:00:00.000Z',
      value: 20000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-13T05:00:00.000Z',
      value: 39213,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-17T05:00:00.000Z',
      value: 61213,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-02T05:00:00.000Z',
      value: 10,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-06T05:00:00.000Z',
      value: 37312,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-08T05:00:00.000Z',
      value: 51432,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-15T05:00:00.000Z',
      value: 40323,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-19T05:00:00.000Z',
      value: 31300,
    },
  ],
  options: {
    title: 'Horizontal stacked bar (time series)',
    axes: {
      left: {
        scaleType: 'time',
        mapsTo: 'date',
      },
      bottom: {
        stacked: true,
        mapsTo: 'value',
      },
    },
    height: '400px',
  },
};

export const HorizontalStackedBarEmptyState = Template.bind({});
HorizontalStackedBarEmptyState.args = {
  isInverse: false,
  type: CarbonChartType.barStacked,
  dataSet: [],
  options: {
    title: 'Horizontal stacked bar (empty state)',
    axes: {
      left: {
        scaleType: 'labels',
      },
      bottom: {},
    },
    height: '400px',
  },
};

export const HorizontalStackedBarSkeleton = Template.bind({});
HorizontalStackedBarSkeleton.args = {
  isInverse: false,
  type: CarbonChartType.barStacked,
  dataSet: [],
  options: {
    title: 'Horizontal stacked bar (skeleton)',
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

export const CustomTicksStackedBar = Template.bind({});
CustomTicksStackedBar.args = {
  isInverse: false,
  type: CarbonChartType.barStacked,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2023-01-01',
      value: 10000,
    },
    {
      group: 'Dataset 1',
      date: '2023-01-05',
      value: 65000,
    },
    {
      group: 'Dataset 1',
      date: '2023-01-08',
      value: 10000,
    },
    {
      group: 'Dataset 1',
      date: '2023-01-13',
      value: 49213,
    },
    {
      group: 'Dataset 1',
      date: '2023-01-17',
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: '2023-01-03',
      value: 75000,
    },
    {
      group: 'Dataset 2',
      date: '2023-01-06',
      value: 57312,
    },
    {
      group: 'Dataset 2',
      date: '2023-01-08',
      value: 21432,
    },
    {
      group: 'Dataset 2',
      date: '2023-01-15',
      value: 70323,
    },
    {
      group: 'Dataset 2',
      date: '2023-01-19',
      value: 21300,
    },
    {
      group: 'Dataset 3',
      date: '2023-01-01',
      value: 50000,
    },
    {
      group: 'Dataset 3',
      date: '2023-01-05',
      value: 15000,
    },
    {
      group: 'Dataset 3',
      date: '2023-01-08',
      value: 20000,
    },
    {
      group: 'Dataset 3',
      date: '2023-01-13',
      value: 39213,
    },
    {
      group: 'Dataset 3',
      date: '2023-01-17',
      value: 61213,
    },
    {
      group: 'Dataset 4',
      date: '2023-01-02',
      value: 10,
    },
    {
      group: 'Dataset 4',
      date: '2023-01-06',
      value: 37312,
    },
    {
      group: 'Dataset 4',
      date: '2023-01-08',
      value: 51432,
    },
    {
      group: 'Dataset 4',
      date: '2023-01-15',
      value: 40323,
    },
    {
      group: 'Dataset 4',
      date: '2023-01-19',
      value: 31300,
    },
  ],
  options: {
    title: 'Custom ticks (stacked bar)',
    axes: {
      left: {
        mapsTo: 'value',
        stacked: true,
      },
      bottom: {
        mapsTo: 'date',
        scaleType: 'time',
        ticks: {
          values: [new Date(2023, 0, 17, 0, 0, 0)],
        },
      },
    },
    height: '400px',
  },
};
