import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
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

const Template: Story<CarbonChartProps> = args => (
  <Card isInverse={args.isInverse} style={{ padding: '12px' }}>
    <CarbonChart {...args} />
  </Card>
);

export const MeterChartWithStatuses = Template.bind({});
MeterChartWithStatuses.args = {
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
};

// Uncomment when adding new charts. Issues: #1054, #1055, #1056

// export const MeterChartNoStatus = Template.bind({});
// MeterChartNoStatus.args = {
//   isInverse: false,
//   type: CarbonChartType.meter,
//   dataSet: [
//     {
//       group: 'Dataset 1',
//       value: 56,
//     },
//   ],
//   options: {
//     title: 'Meter Chart - no status',
//     meter: {
//       peak: 70,
//     },
//     height: '100px',
//   },
// };

// export const ProportionalMeterChart = Template.bind({});
// ProportionalMeterChart.args = {
//   isInverse: false,
//   type: CarbonChartType.meter,
//   dataSet: [
//     {
//       group: 'emails',
//       value: 202,
//     },
//     {
//       group: 'photos',
//       value: 654,
//     },
//     {
//       group: 'text messages',
//       value: 723,
//     },
//     {
//       group: 'other',
//       value: 120,
//     },
//   ],
//   options: {
//     title: 'Proportional Meter Chart',
//     height: '130px',
//     meter: {
//       proportional: {
//         total: 2000,
//         unit: 'GB',
//       },
//     },
//     color: {
//       pairing: {
//         option: 2,
//       },
//     },
//   },
// };

// export const ProportionalMeterChartPeakAndStatuses = Template.bind({});
// ProportionalMeterChartPeakAndStatuses.args = {
//   isInverse: false,
//   type: CarbonChartType.meter,
//   dataSet: [
//     {
//       group: 'emails',
//       value: 202,
//     },
//     {
//       group: 'photos',
//       value: 654,
//     },
//     {
//       group: 'text messages',
//       value: 723,
//     },
//     {
//       group: 'other',
//       value: 120,
//     },
//   ],
//   options: {
//     title: 'Proportional Meter Chart - peak and statuses',
//     height: '130px',
//     meter: {
//       peak: 1800,
//       proportional: {
//         total: 2000,
//         unit: 'GB',
//       },
//       status: {
//         ranges: [
//           {
//             range: [0, 800],
//             status: 'success',
//           },
//           {
//             range: [800, 1800],
//             status: 'warning',
//           },
//           {
//             range: [1800, 2000],
//             status: 'danger',
//           },
//         ],
//       },
//     },
//     color: {
//       pairing: {
//         option: 2,
//       },
//     },
//   },
// };

// export const ProportionalMeterChartTruncated = Template.bind({});
// ProportionalMeterChartTruncated.args = {
//   isInverse: false,
//   type: CarbonChartType.meter,
//   dataSet: [
//     {
//       group: 'emails',
//       value: 202,
//     },
//     {
//       group: 'photos',
//       value: 654,
//     },
//     {
//       group: 'text messages',
//       value: 723,
//     },
//     {
//       group: 'other',
//       value: 120,
//     },
//   ],
//   options: {
//     title: 'Proportional Meter Chart (truncated)',
//     height: '130px',
//     meter: {
//       proportional: {
//         total: 2000,
//         unit: 'MB',
//         totalFormatter: e => `custom total string for: ${e}`,
//         breakdownFormatter: e =>
//           `You are using ${e.datasetsTotal} GB of the space this label is really long will need to be truncated with a tooltip Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
//       },
//     },
//   },
// };
