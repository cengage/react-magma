import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';
import { Card } from 'react-magma-dom';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Pie',
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

export const Pie = Template.bind({});
Pie.args = {
  isInverse: false,
  type: CarbonChartType.pie,
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
    title: 'Pie',
    resizable: true,
    height: '400px',
    theme: 'g100',
    legend: {
      truncation: {
        type: 'none',
      },
    },
  },
};

export const PieCentered = Template.bind({});
PieCentered.args = {
  isInverse: false,
  type: CarbonChartType.pie,
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
    title: 'Pie (centered)',
    resizable: true,
    legend: {
      alignment: 'center',
    },
    pie: {
      alignment: 'center',
    },
    height: '400px',
    theme: 'g100',
    legend: {
      truncation: {
        type: 'none',
      },
    },
  },
};

export const PieValueMapsToCount = Template.bind({});
PieValueMapsToCount.args = {
  isInverse: false,
  type: CarbonChartType.pie,
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
    title: 'Pie (value maps to count)',
    resizable: true,
    pie: {
      valueMapsTo: 'count',
    },
    height: '400px',
    theme: 'g100',
    legend: {
      truncation: {
        type: 'none',
      },
    },
  },
};

export const PieEmptyState = Template.bind({});
PieEmptyState.args = {
  isInverse: false,
  type: CarbonChartType.pie,
  dataSet: [],
  options: {
    title: 'Pie (empty state)',
    resizable: true,
    height: '400px',
    theme: 'g100',
  },
};

export const PieSkeleton = Template.bind({});
PieSkeleton.args = {
  isInverse: false,
  type: CarbonChartType.pie,
  dataSet: [],
  options: {
    title: 'Pie (skeleton)',
    resizable: true,
    data: {
      loading: true,
    },
    height: '400px',
    theme: 'g100',
  },
};
