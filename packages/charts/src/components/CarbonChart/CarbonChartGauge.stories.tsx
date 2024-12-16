import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';
import { Card } from 'react-magma-dom';

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

const Template: Story<CarbonChartProps> = args => (
  <Card isInverse={args.isInverse} style={{ padding: '12px' }}>
    <CarbonChart {...args} />
  </Card>
);

export const GaugeSemicircularDangerStatus = Template.bind({});
GaugeSemicircularDangerStatus.args = {
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
};

// Uncomment when adding new charts. Issues: #1054, #1055, #1056 

// export const GaugeCircularWarningStatus = Template.bind({});
// GaugeCircularWarningStatus.args = {
//   isInverse: false,
//   type: CarbonChartType.gauge,
//   dataSet: [
//     {
//       group: 'value',
//       value: 42,
//     },
//     {
//       group: 'delta',
//       value: -13.37,
//     },
//   ],
//   options: {
//     title: 'Gauge circular -- warning status',
//     resizable: true,
//     height: '250px',
//     gauge: {
//       status: 'warning',
//       type: 'full',
//     },
//   },
// };
