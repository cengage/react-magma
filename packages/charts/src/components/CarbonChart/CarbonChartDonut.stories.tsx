import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Donut',
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

export const Donut = Template.bind({});
Donut.args = {
  isInverse: false,
  type: CarbonChartType.donut,
  dataSet: [
    {
      group: '2V2N 9KYPM version 1',
      value: 20000,
    },
    {
      group: 'L22I P66EP L22I P66EP L22I P66EP',
      value: 65000,
    },
    {
      group: 'JQAI 2M4L1',
      value: 75000,
    },
    {
      group: 'J9DZ F37AP',
      value: 1200,
    },
    {
      group: 'YEL48 Q6XK YEL48',
      value: 10000,
    },
    {
      group: 'Misc',
      value: 25000,
    },
  ],
  options: {
    title: 'Donut',
    resizable: true,
    donut: {
      center: {
        label: 'Browsers',
      },
    },
    height: '400px',
    legend: {
      truncation: {
        type: 'none',
      },
    },
  },
};

export const DonutCentered = Template.bind({});
DonutCentered.args = {
  isInverse: false,
  type: CarbonChartType.donut,
  dataSet: [
    {
      group: '2V2N 9KYPM version 1',
      value: 20000,
    },
    {
      group: 'L22I P66EP L22I P66EP L22I P66EP',
      value: 65000,
    },
    {
      group: 'JQAI 2M4L1',
      value: 75000,
    },
    {
      group: 'J9DZ F37AP',
      value: 1200,
    },
    {
      group: 'YEL48 Q6XK YEL48',
      value: 10000,
    },
    {
      group: 'Misc',
      value: 25000,
    },
  ],
  options: {
    title: 'Donut (centered)',
    resizable: true,
    legend: {
      alignment: 'center',
      truncation: {
        type: 'none',
      },
    },
    donut: {
      center: {
        label: 'Browsers',
      },
      alignment: 'center',
    },
    height: '400px',
  },
};

export const DonutValueMapsToCount = Template.bind({});
DonutValueMapsToCount.args = {
  isInverse: false,
  type: CarbonChartType.donut,
  dataSet: [
    {
      group: '2V2N 9KYPM version 1',
      count: 28000,
    },
    {
      group: 'L22I P66EP L22I P66EP L22I P66EP',
      count: 65000,
    },
    {
      group: 'JQAI 2M4L1',
      count: 75000,
    },
    {
      group: 'J9DZ F37AP',
      count: 3200,
    },
    {
      group: 'YEL48 Q6XK YEL48',
      count: 15000,
    },
    {
      group: 'Misc',
      count: 25000,
    },
  ],
  options: {
    title: 'Donut (value maps to count)',
    resizable: true,
    pie: {
      valueMapsTo: 'count',
    },
    height: '400px',
    legend: {
      truncation: {
        type: 'none',
      },
    },
  },
};
export const DonutEmptyState = Template.bind({});
DonutEmptyState.args = {
  isInverse: false,
  type: CarbonChartType.donut,
  dataSet: [],
  options: {
    title: 'Donut (empty state)',
    resizable: true,
    donut: {
      center: {
        label: 'Browsers',
      },
    },
    height: '400px',
  },
};
export const DonutSkeleton = Template.bind({});
DonutSkeleton.args = {
  isInverse: false,
  type: CarbonChartType.donut,
  dataSet: [],
  options: {
    title: 'Donut (skeleton)',
    resizable: true,
    donut: {
      center: {
        label: 'Browsers',
      },
    },
    data: {
      loading: true,
    },
    height: '400px',
  },
};
