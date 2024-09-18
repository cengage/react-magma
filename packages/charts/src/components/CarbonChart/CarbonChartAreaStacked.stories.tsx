import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';
import { Card } from 'react-magma-dom';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Area Stacked',
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

export const StackedAreaTimeSeries = Template.bind({});
StackedAreaTimeSeries.args = {
  isInverse: false,
  type: CarbonChartType.areaStacked,
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
      date: '2019-01-01T05:00:00.000Z',
      value: 20000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-05T05:00:00.000Z',
      value: 25000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-08T05:00:00.000Z',
      value: 60000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-13T05:00:00.000Z',
      value: 30213,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-17T05:00:00.000Z',
      value: 55213,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-01T05:00:00.000Z',
      value: 30000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-05T05:00:00.000Z',
      value: 20000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-08T05:00:00.000Z',
      value: 40000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-13T05:00:00.000Z',
      value: 60213,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-17T05:00:00.000Z',
      value: 25213,
    },
  ],
  options: {
    title: 'Stacked area (time series)',
    axes: {
      left: {
        stacked: true,
        scaleType: 'linear',
        mapsTo: 'value',
      },
      bottom: {
        scaleType: 'time',
        mapsTo: 'date',
      },
    },
    color: {
      scale: 10,
    },
    curve: 'curveMonotoneX',
    height: '400px',
  },
};

export const StackedAreaTimeSeriesWithUnevenData = Template.bind({});
StackedAreaTimeSeriesWithUnevenData.args = {
  isInverse: false,
  type: CarbonChartType.areaStacked,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2019-01-01T05:00:00.000Z',
      value: 10000,
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
      date: '2019-01-05T05:00:00.000Z',
      value: 25000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-08T05:00:00.000Z',
      value: 60000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-17T05:00:00.000Z',
      value: 55213,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-01T05:00:00.000Z',
      value: 30000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-05T05:00:00.000Z',
      value: 20000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-08T05:00:00.000Z',
      value: 40000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-13T05:00:00.000Z',
      value: 60213,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-17T05:00:00.000Z',
      value: 25213,
    },
  ],
  options: {
    title: 'Stacked area (time series with uneven data)',
    axes: {
      left: {
        stacked: true,
        mapsTo: 'value',
      },
      bottom: {
        scaleType: 'time',
        mapsTo: 'date',
      },
    },
    curve: 'curveMonotoneX',
    height: '400px',
  },
};

export const StackedAreaPercentage = Template.bind({});
StackedAreaPercentage.args = {
  isInverse: false,
  type: CarbonChartType.areaStacked,
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
      date: '2019-01-01T05:00:00.000Z',
      value: 20000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-05T05:00:00.000Z',
      value: 25000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-08T05:00:00.000Z',
      value: 60000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-13T05:00:00.000Z',
      value: 30213,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-17T05:00:00.000Z',
      value: 55213,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-01T05:00:00.000Z',
      value: 30000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-05T05:00:00.000Z',
      value: 20000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-08T05:00:00.000Z',
      value: 40000,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-13T05:00:00.000Z',
      value: 60213,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-17T05:00:00.000Z',
      value: 25213,
    },
  ],
  options: {
    title: 'Stacked area (percentage)',
    axes: {
      left: {
        stacked: true,
        percentage: true,
        ticks: {},
        mapsTo: 'value',
      },
      bottom: {
        scaleType: 'time',
        mapsTo: 'date',
      },
    },
    curve: 'curveMonotoneX',
    height: '400px',
  },
};
