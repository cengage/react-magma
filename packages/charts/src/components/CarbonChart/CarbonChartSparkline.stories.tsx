import React from 'react';

import { StoryFn, Meta } from '@storybook/react';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Sparkline',
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

export const AreaSparkline = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.area,
    dataSet: [
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:21:00.000Z',
        value: 2,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:22:00.000Z',
        value: 3,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:23:00.000Z',
        value: 5,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:24:00.000Z',
        value: 1,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:25:00.000Z',
        value: 4,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:26:00.000Z',
        value: 4,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:27:00.000Z',
        value: 3,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:28:00.000Z',
        value: 4,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:29:00.000Z',
        value: 2,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:30:00.000Z',
        value: 0,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:31:00.000Z',
        value: 5,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:32:00.000Z',
        value: 5,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:33:00.000Z',
        value: 6,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:34:00.000Z',
        value: 2,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:35:00.000Z',
        value: 3,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:36:00.000Z',
        value: 6,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:38:00.000Z',
        value: 2,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:39:00.000Z',
        value: 6,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:40:00.000Z',
        value: 0,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:41:00.000Z',
        value: 3,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:42:00.000Z',
        value: 2,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:43:00.000Z',
        value: 4,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:44:00.000Z',
        value: 3,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:45:00.000Z',
        value: 4,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:46:00.000Z',
        value: 2,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:47:00.000Z',
        value: 4,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:48:00.000Z',
        value: 1,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:49:00.000Z',
        value: 1,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:50:00.000Z',
        value: 3,
      },
      {
        group: 'Dataset 1',
        date: '2019-05-21T19:51:00.000Z',
        value: 2,
      },
    ],
    options: {
      title: 'Sparkline',
      height: '400px',
      grid: {
        x: {
          enabled: false,
        },
        y: {
          enabled: false,
        },
      },
      axes: {
        bottom: {
          visible: false,
          title: '2019 Annual Sales Figures',
          mapsTo: 'date',
          scaleType: 'time',
        },
        left: {
          visible: false,
          mapsTo: 'value',
          scaleType: 'linear',
        },
      },
      color: {
        gradient: {
          enabled: true,
        },
      },
      points: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
    },
  },
};
