import * as React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import {
  historyOfTexas as historyOfTexasData,
  spendingRevenue as spendingRevenueData,
  votingParticipation as votingParticipationData,
} from './test/exampleChartData';

import { Chart, ChartProps } from './index';

const data = [
  {
    name: 'Team 1',
    data: [
      { x: 1, y: 39, label: 'Team 1, January, $39k' },
      { x: 2, y: 28, label: 'Team 1, February, $28k' },
      { x: 3, y: 35, label: 'Team 1, March, $35k' },
      { x: 4, y: 44, label: 'Team 1, April, $44k' },
      { x: 5, y: 21, label: 'Team 1, May, $21k' },
    ],
  },
  {
    name: 'Team 2',
    data: [
      { x: 1, y: 27, label: 'Team 2, January, $27k' },
      { x: 2, y: 33, label: 'Team 2, February, $33k' },
      { x: 3, y: 39, label: 'Team 2, March, $39k' },
      { x: 4, y: 28, label: 'Team 2, April, $28k' },
      { x: 5, y: 19, label: 'Team 2, May, $19k' },
    ],
  },
  {
    name: 'Team 3',
    data: [
      { x: 1, y: 32, label: 'Team 3, January, $32k' },
      { x: 2, y: 41, label: 'Team 3, February, $41k' },
      { x: 3, y: 45, label: 'Team 3, March, $45k' },
      { x: 4, y: 56, label: 'Team 3, April, $56k' },
      { x: 5, y: 48, label: 'Team 3, May, $48k' },
    ],
  },
  {
    name: 'Team 4',
    data: [
      { x: 1, y: 48, label: 'Team 4, January, $48k' },
      { x: 2, y: 66, label: 'Team 4, February, $66k' },
      { x: 3, y: 52, label: 'Team 4, March, $52k' },
      { x: 4, y: 36, label: 'Team 4, April, $36k' },
      { x: 5, y: 10, label: 'Team 4, May, $10k' },
    ],
  },
];

const Template: Story<ChartProps<any>> = args => <Chart {...args} />;

export default {
  title: 'Chart',
  component: Chart,
} as Meta;

const title = 'Annual sales figures for 2019';

const description =
  'description - Lorem ipsum dolor sitamet, consectetur adipiscing elit.';

export const Default = Template.bind({});
Default.args = {
  data: data,
  description,
  title,
  type: 'line',
  componentProps: {
    xAxis: {
      label: '2019 Annual Sales Figures',
      tickFormat: ['Jan', 'Feb', 'March', 'April', 'May'],
    },
    yAxis: {
      domain: [10, 80],
      label: 'Conversion Rate',
      tickFormat: t => `$${t}k`,
      tickValues: [10, 20, 30, 40, 50, 60, 70, 80],
    },
  },
};

interface ExplicitDataInterface {
  month: string | number;
  sales: string | number;
  [key: string]: any;
}

const explicitData = [
  {
    name: 'Team 1',
    data: [
      { month: 1, sales: 39, label: 'Team 1, January, $39k' },
      { month: 2, sales: 28, label: 'Team 1, February, $28k' },
      { month: 3, sales: 35, label: 'Team 1, March, $35k' },
      { month: 4, sales: 44, label: 'Team 1, April, $44k' },
      { month: 5, sales: 21, label: 'Team 1, May, $21k' },
      { month: 6, sales: 22, label: 'Team 1, June, $22k' },
      { month: 7, sales: 67, label: 'Team 1, July, $67k' },
      { month: 8, sales: 110, label: 'Team 1, August, $110k' },
      { month: 9, sales: 90, label: 'Team 1, September, $90k' },
      { month: 10, sales: 47, label: 'Team 1, October, $47k' },
      { month: 11, sales: 17, label: 'Team 1, November, $17k' },
      { month: 12, sales: 24, label: 'Team 1, December, $24k' },
    ],
  },
  {
    name: 'Team 2',
    data: [
      { month: 1, sales: 27, label: 'Team 2, January, $27k' },
      { month: 2, sales: 33, label: 'Team 2, February, $33k' },
      { month: 3, sales: 39, label: 'Team 2, March, $39k' },
      { month: 4, sales: 28, label: 'Team 2, April, $28k' },
      { month: 5, sales: 19, label: 'Team 2, May, $19k' },
      { month: 6, sales: 22, label: 'Team 2, June, $22k' },
      { month: 7, sales: 27, label: 'Team 2, July, $27k' },
      { month: 8, sales: 21, label: 'Team 2, August, $21k' },
      { month: 9, sales: 30, label: 'Team 2, September, $30k' },
      { month: 10, sales: 29, label: 'Team 2, October, $29k' },
      { month: 11, sales: 34, label: 'Team 2, November, $34k' },
      { month: 12, sales: 36, label: 'Team 2, December, $36k' },
    ],
  },
  {
    name: 'Team 3',
    data: [
      { month: 1, sales: 39, label: 'Team 3, January, $39k' },
      { month: 2, sales: 39, label: 'Team 3, February, $39k' },
      { month: 3, sales: 39, label: 'Team 3, March, $39k' },
      { month: 4, sales: 39, label: 'Team 3, April, $39k' },
      { month: 5, sales: 39, label: 'Team 3, May, $39k' },
      { month: 6, sales: 39, label: 'Team 3, June, $39k' },
      { month: 7, sales: 39, label: 'Team 3, July, $39k' },
      { month: 8, sales: 39, label: 'Team 3, August, $39k' },
      { month: 9, sales: 39, label: 'Team 3, September, $39k' },
      { month: 10, sales: 39, label: 'Team 3, October, $39k' },
      { month: 11, sales: 39, label: 'Team 3, November, $39k' },
      { month: 12, sales: 39, label: 'Team 3, December, $39k' },
    ],
  },
  {
    name: 'Team 4',
    data: [
      { month: 1, sales: 48, label: 'Team 4, January, $48k' },
      { month: 2, sales: 66, label: 'Team 4, February, $66k' },
      { month: 3, sales: 52, label: 'Team 4, March, $52k' },
      { month: 4, sales: 36, label: 'Team 4, April, $36k' },
      { month: 5, sales: 10, label: 'Team 4, May, $10k' },
      { month: 6, sales: 15, label: 'Team 4, June, $15k' },
      { month: 7, sales: 100, label: 'Team 4, July, $100k' },
      { month: 8, sales: 12, label: 'Team 4, August, $12k' },
      { month: 9, sales: 54, label: 'Team 4, September, $54k' },
      { month: 10, sales: 48, label: 'Team 4, October, $48k' },
      { month: 11, sales: 76, label: 'Team 4, November, $76k' },
      { month: 12, sales: 32, label: 'Team 4, December, $32k' },
    ],
  },
  {
    name: 'Team 5',
    data: [
      { month: 1, sales: 24, label: 'Team 5, January, $24k' },
      { month: 2, sales: 9, label: 'Team 5, February, $9k' },
      { month: 3, sales: 17, label: 'Team 5, March, $17k' },
      { month: 4, sales: 28, label: 'Team 5, April, $28k' },
      { month: 5, sales: 31, label: 'Team 5, May, $31k' },
      { month: 6, sales: 68, label: 'Team 5, June, $68k' },
      { month: 7, sales: 70, label: 'Team 5, July, $70k' },
      { month: 8, sales: 81, label: 'Team 5, August, $81k' },
      { month: 9, sales: 81, label: 'Team 5, September, $81k' },
      { month: 10, sales: 81, label: 'Team 5, October, $81k' },
      { month: 11, sales: 84, label: 'Team 5, November, $84k' },
      { month: 12, sales: 76, label: 'Team 5, December, $76k' },
    ],
  },
  {
    name: 'Team 6',
    data: [
      { month: 1, sales: 75, label: 'Team 6, January, $75k' },
      { month: 2, sales: 43, label: 'Team 6, February, $43k' },
      { month: 3, sales: 72, label: 'Team 6, March, $72k' },
      { month: 4, sales: 38, label: 'Team 6, April, $38k' },
      { month: 5, sales: 81, label: 'Team 6, May, $81k' },
      { month: 6, sales: 21, label: 'Team 6, June, $21k' },
      { month: 7, sales: 74, label: 'Team 6, July, $74k' },
      { month: 8, sales: 64, label: 'Team 6, August, $64k' },
      { month: 9, sales: 42, label: 'Team 6, September, $42k' },
      { month: 10, sales: 72, label: 'Team 6, October, $72k' },
      { month: 11, sales: 34, label: 'Team 6, November, $34k' },
      { month: 12, sales: 90, label: 'Team 6, December, $90k' },
    ],
  },
  {
    name: 'Team 7',
    data: [
      { month: 1, sales: 53, label: 'Team 7, January, $53k' },
      { month: 2, sales: 43, label: 'Team 7, February, $43k' },
      { month: 3, sales: 43, label: 'Team 7, March, $43k' },
      { month: 4, sales: 43, label: 'Team 7, April, $43k' },
      { month: 5, sales: 49, label: 'Team 7, May, $49k' },
      { month: 6, sales: 51, label: 'Team 7, June, $51k' },
      { month: 7, sales: 32, label: 'Team 7, July, $32k' },
      { month: 8, sales: 32, label: 'Team 7, August, $32k' },
      { month: 9, sales: 32, label: 'Team 7, September, $32k' },
      { month: 10, sales: 57, label: 'Team 7, October, $57k' },
      { month: 11, sales: 50, label: 'Team 7, November, $50k' },
      { month: 12, sales: 64, label: 'Team 7, December, $64k' },
    ],
  },
  {
    name: 'Team 8',
    data: [
      { month: 1, sales: 60, label: 'Team 8, January, $60k' },
      { month: 2, sales: 24, label: 'Team 8, February, $24k' },
      { month: 3, sales: 55, label: 'Team 8, March, $55k' },
      { month: 4, sales: 61, label: 'Team 8, April, $61k' },
      { month: 5, sales: 78, label: 'Team 8, May, $78k' },
      { month: 6, sales: 26, label: 'Team 8, June, $26k' },
      { month: 7, sales: 38, label: 'Team 8, July, $38k' },
      { month: 8, sales: 39, label: 'Team 8, August, $39k' },
      { month: 9, sales: 59, label: 'Team 8, September, $59k' },
      { month: 10, sales: 51, label: 'Team 8, October, $51k' },
      { month: 11, sales: 17, label: 'Team 8, November, $17k' },
      { month: 12, sales: 22, label: 'Team 8, December, $22k' },
    ],
  },
  {
    name: 'Team 9',
    data: [
      { month: 1, sales: 103, label: 'Team 9, January, $103k' },
      { month: 2, sales: 99, label: 'Team 9, February, $99k' },
      { month: 3, sales: 78, label: 'Team 9, March, $78k' },
      { month: 4, sales: 63, label: 'Team 9, April, $63k' },
      { month: 5, sales: 68, label: 'Team 9, May, $68k' },
      { month: 6, sales: 112, label: 'Team 9, June, $112k' },
      { month: 7, sales: 97, label: 'Team 9, July, $97k' },
      { month: 8, sales: 37, label: 'Team 9, August, $37k' },
      { month: 9, sales: 49, label: 'Team 9, September, $49k' },
      { month: 10, sales: 58, label: 'Team 9, October, $58k' },
      { month: 11, sales: 78, label: 'Team 9, November, $78k' },
      { month: 12, sales: 92, label: 'Team 9, December, $92k' },
    ],
  },
  {
    name: 'Team 10',
    data: [
      { month: 1, sales: 36, label: 'Team 10, January, $36k' },
      { month: 2, sales: 22, label: 'Team 10, February, $22k' },
      { month: 3, sales: 3, label: 'Team 10, March, $3k' },
      { month: 4, sales: 7, label: 'Team 10, April, $7k' },
      { month: 5, sales: 14, label: 'Team 10, May, $14k' },
      { month: 6, sales: 30, label: 'Team 10, June, $30k' },
      { month: 7, sales: 33, label: 'Team 10, July, $33k' },
      { month: 8, sales: 54, label: 'Team 10, August, $54k' },
      { month: 9, sales: 61, label: 'Team 10, September, $61k' },
      { month: 10, sales: 77, label: 'Team 10, October, $77k' },
      { month: 11, sales: 75, label: 'Team 10, November, $75k' },
      { month: 12, sales: 88, label: 'Team 10, December, $88k' },
    ],
  },
  {
    name: 'Team 11',
    data: [
      { month: 1, sales: 12, label: 'Team 11, January, $12k' },
      { month: 2, sales: 19, label: 'Team 11, February, $19k' },
      { month: 3, sales: 57, label: 'Team 11, March, $57k' },
      { month: 4, sales: 96, label: 'Team 11, April, $96k' },
      { month: 5, sales: 82, label: 'Team 11, May, $82k' },
      { month: 6, sales: 82, label: 'Team 11, June, $82k' },
      { month: 7, sales: 82, label: 'Team 11, July, $82k' },
      { month: 8, sales: 99, label: 'Team 11, August, $99k' },
      { month: 9, sales: 52, label: 'Team 11, September, $52k' },
      { month: 10, sales: 81, label: 'Team 11, October, $81k' },
      { month: 11, sales: 73, label: 'Team 11, November, $73k' },
      { month: 12, sales: 8, label: 'Team 11, December, $8k' },
    ],
  },
  {
    name: 'Team 12',
    data: [
      { month: 1, sales: 0, label: 'Team 12, January, $0k' },
      { month: 2, sales: 0, label: 'Team 12, February, $0k' },
      { month: 3, sales: 0, label: 'Team 12, March, $0k' },
      { month: 4, sales: 0, label: 'Team 12, April, $0k' },
      { month: 5, sales: 0, label: 'Team 12, May, $0k' },
      { month: 6, sales: 3, label: 'Team 12, June, $3k' },
      { month: 7, sales: 7, label: 'Team 12, July, $7k' },
      { month: 8, sales: 5, label: 'Team 12, August, $5k' },
      { month: 9, sales: 1, label: 'Team 12, September, $1k' },
      { month: 10, sales: 0, label: 'Team 12, October, $0k' },
      { month: 11, sales: 0, label: 'Team 12, November, $0k' },
      { month: 12, sales: 0, label: 'Team 12, December, $0k' },
    ],
  },
];

const ExplicitDataTemplate: Story<ChartProps<ExplicitDataInterface>> = args => (
  <Chart {...args} />
);

export const ExplicitData = ExplicitDataTemplate.bind({});
ExplicitData.args = {
  ...Default.args,
  componentProps: {
    ...Default.args.componentProps,
    xAxis: {
      ...Default.args.componentProps.xAxis,
      tickFormat: [
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
  },
  data: explicitData,
  x: 'month',
  y: 'sales',
};

interface HistoryOfTexasInterface {
  year: number;
  number: number;
  label: string;
}

const HistoryOfTexasTemplate: Story<
  ChartProps<HistoryOfTexasInterface>
> = args => <Chart {...args} />;

export const HistoryOfTexas = HistoryOfTexasTemplate.bind({});
HistoryOfTexas.args = {
  ...Default.args,
  description: 'Number of enslaved people in Texas',
  title: 'History of Texas',
  componentProps: {
    xAxis: {
      label: 'Number of enslaved people',
      tickValues: [1830, 1835, 1840, 1845, 1850, 1855, 1860, 1865],
    },
    yAxis: {
      label: 'Year',
      tickFormat: t => t.toLocaleString(),
      tickValues: [
        0, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000,
      ],
    },
  },
  data: historyOfTexasData,
  x: 'year',
  y: 'number',
};

const SpendingRevenueTemplate: Story<ChartProps<any>> = args => (
  <Chart {...args} />
);

export const SpendingRevenue = SpendingRevenueTemplate.bind({});
SpendingRevenue.args = {
  data: spendingRevenueData,
  title: 'Spending Revenue',
  type: 'line',
  componentProps: {
    xAxis: {
      label: '',
    },
    yAxis: {
      label: 'Average %',
      tickValues: [0, 2, 4, 6, 8, 10, 12, 14],
    },
  },
};

interface VotingParticipationInterface {
  year: number;
  percent: number;
  label: string;
}

const VotingParticipationTemplate: Story<
  ChartProps<VotingParticipationInterface>
> = args => <Chart {...args} />;

export const VotingParticipation = VotingParticipationTemplate.bind({});
VotingParticipation.args = {
  data: votingParticipationData,
  title: 'Turnout in elections since 2000: US and Texas',
  type: 'line',
  componentProps: {
    xAxis: {
      label: 'Year',
    },
    yAxis: {
      domain: [10, 80],
      label: 'Percent',
    },
  },
  x: 'year',
  y: 'percent',
};
