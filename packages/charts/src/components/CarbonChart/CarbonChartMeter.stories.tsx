import React from 'react';

import { StoryFn, Meta } from '@storybook/react/types-6-0';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Meter',
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

export const MeterChartWithStatuses = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.meter,
    dataSet: [
      {
        group: 'Dataset 1',
        value: 56,
      },
    ],
    options: {
      title: 'Meter Chart - with statuses',
      meter: {
        peak: 80,
        status: {
          ranges: [
            {
              range: [0, 50],
              status: 'success',
            },
            {
              range: [50, 60],
              status: 'warning',
            },
            {
              range: [60, 100],
              status: 'danger',
            },
          ],
        },
      },
      height: '100px',
    },
  },
};
