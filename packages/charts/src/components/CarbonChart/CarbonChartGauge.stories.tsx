import React from 'react';

import { StoryFn, Meta } from '@storybook/react/types-6-0';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Gauge',
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

export const GaugeSemicircularDangerStatus = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.gauge,
    dataSet: [
      {
        group: 'value',
        value: 42,
      },
      {
        group: 'delta',
        value: -13.37,
      },
    ],
    options: {
      title: 'Gauge semicircular -- danger status',
      resizable: true,
      height: '250px',
      gauge: {
        type: 'semi',
        status: 'danger',
      },
    },
  },
};

export const GaugeCircularWarningStatus = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.gauge,
    dataSet: [
      {
        group: 'value',
        value: 42,
      },
      {
        group: 'delta',
        value: -13.37,
      },
    ],
    options: {
      title: 'Gauge circular -- warning status',
      resizable: true,
      height: '250px',
      gauge: {
        status: 'warning',
        type: 'full',
      },
    },
  },
};
