import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Boxplot',
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

export const HorizontalBoxplot = Template.bind({});
HorizontalBoxplot.args = {
  isInverse: false,
  type: CarbonChartType.boxplot,
  dataSet: [
    {
      group: 'Q1',
      key: 'Monday',
      value: 65000,
    },
    {
      group: 'Q1',
      key: 'Tuesday',
      value: 29123,
    },
    {
      group: 'Q1',
      key: 'Wednesday',
      value: 35213,
    },
    {
      group: 'Q1',
      key: 'Thursday',
      value: 51213,
    },
    {
      group: 'Q1',
      key: 'Friday',
      value: 16932,
    },
    {
      group: 'Q2',
      key: 'Monday',
      value: 32432,
    },
    {
      group: 'Q2',
      key: 'Tuesday',
      value: 14312,
    },
    {
      group: 'Q2',
      key: 'Wednesday',
      value: 66456,
    },
    {
      group: 'Q2',
      key: 'Thursday',
      value: 21312,
    },
    {
      group: 'Q2',
      key: 'Friday',
      value: 37234,
    },
    {
      group: 'Q3',
      key: 'Monday',
      value: 5312,
    },
    {
      group: 'Q3',
      key: 'Tuesday',
      value: 23232,
    },
    {
      group: 'Q3',
      key: 'Wednesday',
      value: 34232,
    },
    {
      group: 'Q3',
      key: 'Thursday',
      value: 12312,
    },
    {
      group: 'Q3',
      key: 'Friday',
      value: 44234,
    },
    {
      group: 'Q4',
      key: 'Monday',
      value: 32423,
    },
    {
      group: 'Q4',
      key: 'Tuesday',
      value: 21313,
    },
    {
      group: 'Q4',
      key: 'Wednesday',
      value: 64353,
    },
    {
      group: 'Q4',
      key: 'Thursday',
      value: 24134,
    },
    {
      group: 'Q4',
      key: 'Friday',
      value: 45134,
    },
  ],
  options: {
    title: 'Horizontal box plot',
    axes: {
      bottom: {
        mapsTo: 'value',
      },
      left: {
        scaleType: 'labels',
        mapsTo: 'group',
      },
    },
    height: '400px',
  },
};

// Uncomment when adding new charts. Issues: #1054, #1055, #1056

// export const VerticalBoxplot = Template.bind({});
// VerticalBoxplot.args = {
//   isInverse: false,
//   type: CarbonChartType.boxplot,
//   dataSet: [
//     {
//       group: 'Q1',
//       key: 'Monday',
//       value: 65000,
//     },
//     {
//       group: 'Q1',
//       key: 'Tuesday',
//       value: 29123,
//     },
//     {
//       group: 'Q1',
//       key: 'Wednesday',
//       value: 35213,
//     },
//     {
//       group: 'Q1',
//       key: 'Thursday',
//       value: 51213,
//     },
//     {
//       group: 'Q1',
//       key: 'Friday',
//       value: 16932,
//     },
//     {
//       group: 'Q2',
//       key: 'Monday',
//       value: 32432,
//     },
//     {
//       group: 'Q2',
//       key: 'Tuesday',
//       value: 14312,
//     },
//     {
//       group: 'Q2',
//       key: 'Wednesday',
//       value: 66456,
//     },
//     {
//       group: 'Q2',
//       key: 'Thursday',
//       value: 21312,
//     },
//     {
//       group: 'Q2',
//       key: 'Friday',
//       value: 37234,
//     },
//     {
//       group: 'Q3',
//       key: 'Monday',
//       value: 5312,
//     },
//     {
//       group: 'Q3',
//       key: 'Tuesday',
//       value: 23232,
//     },
//     {
//       group: 'Q3',
//       key: 'Wednesday',
//       value: 34232,
//     },
//     {
//       group: 'Q3',
//       key: 'Thursday',
//       value: 12312,
//     },
//     {
//       group: 'Q3',
//       key: 'Friday',
//       value: 44234,
//     },
//     {
//       group: 'Q4',
//       key: 'Monday',
//       value: 32423,
//     },
//     {
//       group: 'Q4',
//       key: 'Tuesday',
//       value: 21313,
//     },
//     {
//       group: 'Q4',
//       key: 'Wednesday',
//       value: 64353,
//     },
//     {
//       group: 'Q4',
//       key: 'Thursday',
//       value: 24134,
//     },
//     {
//       group: 'Q4',
//       key: 'Friday',
//       value: 45134,
//     },
//   ],
//   options: {
//     title: 'Vertical box plot',
//     axes: {
//       left: {
//         mapsTo: 'value',
//       },
//       bottom: {
//         scaleType: 'labels',
//         mapsTo: 'group',
//       },
//     },
//     height: '400px',
//   },
// };
