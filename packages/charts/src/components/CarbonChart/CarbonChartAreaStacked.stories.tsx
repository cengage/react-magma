import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

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

export const VerticalStackedAreatimeSeriesWithToolbarOverride = Template.bind(
  {}
);
VerticalStackedAreatimeSeriesWithToolbarOverride.args = {
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
    title: 'Vertical stacked area (time series) w/toolbar override',
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
    toolbar: {
      enabled: true,
      numberOfIcons: 3,
      controls: [
        {
          type: 'Zoom in',
        },
        {
          type: 'Zoom out',
        },
        {
          type: 'Reset zoom',
        },
        {
          type: 'Custom',
          text: 'Custom button',
          iconSVG: {
            content: `<path d="M23,13H18v2h5v2H19a2,2,0,0,0-2,2v2a2,2,0,0,0,2,2h6V15A2,2,0,0,0,23,13Zm0,8H19V19h4Z"/>
          <path d="M13,9H9a2,2,0,0,0-2,2V23H9V18h4v5h2V11A2,2,0,0,0,13,9ZM9,16V11h4v5Z"/><rect data-name="&lt;Transparent Rectangle&gt;" width="32" height="32" style="fill: none"/>`,
          },
        },
      ],
    },
    zoomBar: {
      top: {
        enabled: true,
      },
    },
    height: '400px',
  },
};
