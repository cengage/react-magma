import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';
import { Card } from 'react-magma-dom';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Area',
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

export const AreaTimeSeriesNaturalCurve = Template.bind({});
AreaTimeSeriesNaturalCurve.args = {
  isInverse: false,
  type: CarbonChartType.area,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2019-01-01T05:00:00.000Z',
      value: 0,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-06T05:00:00.000Z',
      value: -37312,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-08T05:00:00.000Z',
      value: -22392,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-15T05:00:00.000Z',
      value: -52576,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-19T05:00:00.000Z',
      value: 20135,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-01T05:00:00.000Z',
      value: 47263,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-05T05:00:00.000Z',
      value: 14178,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-08T05:00:00.000Z',
      value: 23094,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-13T05:00:00.000Z',
      value: 45281,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-19T05:00:00.000Z',
      value: -63954,
    },
  ],
  options: {
    title: 'Area (time series - natural curve)',
    axes: {
      bottom: {
        title: '2019 Annual Sales Figures',
        mapsTo: 'date',
        scaleType: 'time',
      },
      left: {
        mapsTo: 'value',
        scaleType: 'linear',
      },
    },
    curve: 'curveNatural',
    height: '400px',
  },
};

export const AreaTimeSeries = Template.bind({});
AreaTimeSeries.args = {
  isInverse: false,
  type: CarbonChartType.area,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2019-01-01T05:00:00.000Z',
      value: 0,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-06T05:00:00.000Z',
      value: 57312,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-08T05:00:00.000Z',
      value: 21432,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-15T05:00:00.000Z',
      value: 70323,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-19T05:00:00.000Z',
      value: 21300,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-01T05:00:00.000Z',
      value: 50000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-05T05:00:00.000Z',
      value: 15000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-08T05:00:00.000Z',
      value: 20000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-13T05:00:00.000Z',
      value: 39213,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-19T05:00:00.000Z',
      value: 61213,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-02T05:00:00.000Z',
      value: 10,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-06T05:00:00.000Z',
      value: 37312,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-08T05:00:00.000Z',
      value: 51432,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-13T05:00:00.000Z',
      value: 40323,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-19T05:00:00.000Z',
      value: 31300,
    },
  ],

  options: {
    title: 'Area (time series)',
    axes: {
      bottom: {
        title: '2019 Annual Sales Figures',
        mapsTo: 'date',
        scaleType: 'time',
      },
      left: {
        mapsTo: 'value',
        title: 'Conversion rate',
        scaleType: 'linear',
      },
    },
    height: '400px',
  },
};

export const BoundedAreaTimeSeriesNaturalCurve = Template.bind({});
BoundedAreaTimeSeriesNaturalCurve.args = {
  isInverse: false,
  type: CarbonChartType.area,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2019-01-01T05:00:00.000Z',
      value: 47263,
      min: 40000,
      max: 50000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-05T05:00:00.000Z',
      value: 14178,
      min: 10000,
      max: 20000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-08T05:00:00.000Z',
      value: 23094,
      min: 10000,
      max: 25000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-13T05:00:00.000Z',
      value: 45281,
      min: 42000,
      max: 50000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-19T05:00:00.000Z',
      value: -63954,
      min: -70000,
      max: -10000,
    },
  ],

  options: {
    title: 'Bounded area (time series - natural curve)',
    legend: {
      enabled: false,
    },
    bounds: {
      upperBoundMapsTo: 'max',
      lowerBoundMapsTo: 'min',
    },
    axes: {
      bottom: {
        title: '2019 Annual Sales Figures',
        mapsTo: 'date',
        scaleType: 'time',
      },
      left: {
        mapsTo: 'value',
        scaleType: 'linear',
      },
    },
    curve: 'curveNatural',
    height: '400px',
  },
};

export const AreaSkeleton = Template.bind({});
AreaSkeleton.args = {
  isInverse: false,
  type: CarbonChartType.area,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2019-01-01T05:00:00.000Z',
      value: 47263,
      min: 40000,
      max: 50000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-05T05:00:00.000Z',
      value: 14178,
      min: 10000,
      max: 20000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-08T05:00:00.000Z',
      value: 23094,
      min: 10000,
      max: 25000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-13T05:00:00.000Z',
      value: 45281,
      min: 42000,
      max: 50000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-19T05:00:00.000Z',
      value: -63954,
      min: -70000,
      max: -10000,
    },
  ],

  options: {
    title: 'Area (skeleton)',
    bounds: {
      upperBoundMapsTo: 'max',
      lowerBoundMapsTo: 'min',
    },
    axes: {
      bottom: {
        title: '2019 Annual Sales Figures',
        mapsTo: 'date',
        scaleType: 'time',
      },
      left: {
        mapsTo: 'value',
        scaleType: 'linear',
      },
    },
    curve: 'curveNatural',
    data: {
      loading: true,
    },
    height: '400px',
  },
};

export const AreaEmptyState = Template.bind({});
AreaEmptyState.args = {
  isInverse: false,
  type: CarbonChartType.area,
  dataSet: [],

  options: {
    title: 'Area (empty state)',
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
