import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';
import { Card } from 'react-magma-dom';

export default {
  component: CarbonChart,
  title: 'CarbonChart',
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
      }
    }
  },
} as Meta;

const Template: Story<CarbonChartProps> = args => (
  <Card isInverse={args.isInverse} style={{ padding: '12px' }}>
    <CarbonChart {...args}>Sample text</CarbonChart>
  </Card>
);

export const AreaChart = Template.bind({});
AreaChart.args = {
  isInverse: false,
  type: CarbonChartType.area,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2019-01-01T05:00:00.000Z',
      value: 0,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-06T05:00:00.000Z',
      value: -37312,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-08T05:00:00.000Z',
      value: -22392,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-15T05:00:00.000Z',
      value: -52576,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-19T05:00:00.000Z',
      value: 20135,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-01T05:00:00.000Z',
      value: 47263,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-05T05:00:00.000Z',
      value: 14178,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-08T05:00:00.000Z',
      value: 23094,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-13T05:00:00.000Z',
      value: 45281,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-19T05:00:00.000Z',
      value: -63954,
    },
  ],
  options: {
    title: 'Area (time series - natural curve)',
    axes: {
      bottom: {
        title: '2019 Annual Sales Figures',
        mapsTo: 'date',
        scaleType: 'time',
      },
      left: {
        mapsTo: 'value',
        scaleType: 'linear',
      },
    },
    curve: 'curveNatural',
    height: '400px',
  },
};

export const BarChart = Template.bind({});
BarChart.args = {
  isInverse: false,
  type: CarbonChartType.bar,
  dataSet: [
    {
      group: 'Qty',
      value: 65000,
    },
    {
      group: 'More',
      value: 29123,
    },
    {
      group: 'Sold',
      value: 35213,
    },
    {
      group: 'Restocking',
      value: 51213,
    },
    {
      group: 'Misc',
      value: 16932,
    },
  ],
  options: {
    title: 'Vertical simple bar (discrete)',
    axes: {
      left: {
        mapsTo: 'value',
      },
      bottom: {
        mapsTo: 'group',
        scaleType: 'labels',
      },
    },
    height: '400px',
  },
};

export const BubbleChart = Template.bind({});
BubbleChart.args = {
  isInverse: false,
  type: CarbonChartType.bubble,
  dataSet: [
    {
      group: 'Dataset 1',
      sales: 10000,
      profit: 32100,
      surplus: 50000,
    },
    {
      group: 'Dataset 1',
      sales: 12000,
      profit: 23500,
      surplus: 34000,
    },
    {
      group: 'Dataset 1',
      sales: 14000,
      profit: 53100,
      surplus: 63000,
    },
    {
      group: 'Dataset 1',
      sales: 15000,
      profit: 42300,
      surplus: 43000,
    },
    {
      group: 'Dataset 1',
      sales: 16000,
      profit: 12300,
      surplus: 55000,
    },
    {
      group: 'Dataset 2',
      sales: 11000,
      profit: 12400,
      surplus: 25000,
    },
    {
      group: 'Dataset 2',
      sales: 13000,
      profit: 34500,
      surplus: 35000,
    },
    {
      group: 'Dataset 2',
      sales: 13500,
      profit: 23100,
      surplus: 55000,
    },
    {
      group: 'Dataset 2',
      sales: 15500,
      profit: 63200,
      surplus: 35000,
    },
    {
      group: 'Dataset 2',
      sales: 15750,
      profit: 24300,
      surplus: 64000,
    },
  ],
  options: {
    title: 'Bubble (linear)',
    axes: {
      bottom: {
        title: 'No. of employees',
        mapsTo: 'sales',
        includeZero: false,
      },
      left: {
        title: 'Annual sales',
        mapsTo: 'profit',
        includeZero: false,
      },
    },
    bubble: {
      radiusMapsTo: 'surplus',
      radiusLabel: 'Surplus',
    },
    legend: {
      additionalItems: [
        {
          type: 'radius',
          name: 'Surplus',
        },
      ],
    },
    height: '400px',
  },
};

export const WordCloudChart = Template.bind({});
WordCloudChart.args = {
  isInverse: false,
  type: CarbonChartType.word,
  dataSet: [
    {
      word: 'Lorem',
      value: 52,
      group: 'Second',
    },
    {
      word: 'ipsum',
      value: 25,
      group: 'Second',
    },
    {
      word: 'dolor',
      value: 51,
      group: 'Second',
    },
    {
      word: 'amet',
      value: 40,
      group: 'First',
    },
    {
      word: 'consectetur',
      value: 25,
      group: 'Fourth',
    },
    {
      word: 'adipiscing',
      value: 36,
      group: 'Fourth',
    },
    {
      word: 'elit',
      value: 40,
      group: 'First',
    },
    {
      word: 'Duis',
      value: 18,
      group: 'First',
    },
    {
      word: 'dapibus',
      value: 49,
      group: 'Third',
    },
    {
      word: 'urna',
      value: 18,
      group: 'First',
    },
    {
      word: 'tellus',
      value: 54,
      group: 'Second',
    },
    {
      word: 'placerat',
      value: 57,
      group: 'Third',
    },
    {
      word: 'leo',
      value: 18,
      group: 'First',
    },
    {
      word: 'semper',
      value: 18,
      group: 'Second',
    },
    {
      word: 'venenatis',
      value: 43,
      group: 'Fourth',
    },
    {
      word: 'Vestibulum',
      value: 50,
      group: 'Fourth',
    },
    {
      word: 'imperdiet',
      value: 30,
      group: 'Fourth',
    },
    {
      word: 'erat',
      value: 18,
      group: 'First',
    },
    {
      word: 'auctor',
      value: 18,
      group: 'Second',
    },
    {
      word: 'purus',
      value: 18,
      group: 'Second',
    },
    {
      word: 'ullamcorper',
      value: 18,
      group: 'Fourth',
    },
    {
      word: 'porta',
      value: 52,
      group: 'Second',
    },
    {
      word: 'Pellentesque',
      value: 40,
      group: 'Fourth',
    },
    {
      word: 'porta',
      value: 39,
      group: 'Second',
    },
    {
      word: 'aliquam',
      value: 18,
      group: 'Third',
    },
    {
      word: 'est',
      value: 18,
      group: 'First',
    },
    {
      word: 'bibendum',
      value: 46,
      group: 'Third',
    },
    {
      word: 'lorem',
      value: 18,
      group: 'Second',
    },
    {
      word: 'Morbi',
      value: 46,
      group: 'Second',
    },
    {
      word: 'dui',
      value: 18,
      group: 'First',
    },
    {
      word: 'non',
      value: 42,
      group: 'First',
    },
    {
      word: 'neque',
      value: 18,
      group: 'Second',
    },
    {
      word: 'semper',
      value: 18,
      group: 'Second',
    },
    {
      word: 'aliquam',
      value: 34,
      group: 'Third',
    },
    {
      word: 'mollis',
      value: 18,
      group: 'Second',
    },
    {
      word: 'sapien',
      value: 39,
      group: 'Second',
    },
    {
      word: 'Interdum',
      value: 18,
      group: 'Third',
    },
    {
      word: 'malesuada',
      value: 18,
      group: 'Fourth',
    },
    {
      word: 'fames',
      value: 41,
      group: 'Second',
    },
    {
      word: 'ante',
      value: 18,
      group: 'First',
    },
    {
      word: 'ipsum',
      value: 53,
      group: 'Second',
    },
    {
      word: 'primis',
      value: 18,
      group: 'Second',
    },
    {
      word: 'faucibus',
      value: 29,
      group: 'Third',
    },
    {
      word: 'Fusce',
      value: 20,
      group: 'Second',
    },
    {
      word: 'magna',
      value: 18,
      group: 'Second',
    },
    {
      word: 'quis',
      value: 35,
      group: 'First',
    },
    {
      word: 'arcu',
      value: 46,
      group: 'First',
    },
    {
      word: 'aliquet',
      value: 18,
      group: 'Third',
    },
    {
      word: 'porttitor',
      value: 18,
      group: 'Fourth',
    },
    {
      word: 'amet',
      value: 18,
      group: 'First',
    },
    {
      word: 'nisl',
      value: 51,
      group: 'First',
    },
    {
      word: 'Praesent',
      value: 34,
      group: 'Third',
    },
    {
      word: 'varius',
      value: 18,
      group: 'Second',
    },
    {
      word: 'sit',
      value: 58,
      group: 'First',
    },
    {
      word: 'amet',
      value: 18,
      group: 'First',
    },
    {
      word: 'turpis',
      value: 24,
      group: 'Second',
    },
    {
      word: 'non',
      value: 47,
      group: 'First',
    },
    {
      word: 'finibus',
      value: 18,
      group: 'Third',
    },
    {
      word: 'Pellentesque',
      value: 48,
      group: 'Fourth',
    },
    {
      word: 'habitant',
      value: 27,
      group: 'Third',
    },
    {
      word: 'morbi',
      value: 19,
      group: 'Second',
    },
    {
      word: 'tristique',
      value: 18,
      group: 'Fourth',
    },
    {
      word: 'senectus',
      value: 43,
      group: 'Third',
    },
    {
      word: 'netus',
      value: 18,
      group: 'Second',
    },
    {
      word: 'malesuada',
      value: 18,
      group: 'Fourth',
    },
    {
      word: 'fames',
      value: 37,
      group: 'Second',
    },
    {
      word: 'turpis',
      value: 24,
      group: 'Second',
    },
    {
      word: 'egestas',
      value: 18,
      group: 'Third',
    },
    {
      word: 'Aliquam',
      value: 45,
      group: 'Third',
    },
    {
      word: 'erat',
      value: 18,
      group: 'First',
    },
    {
      word: 'volutpat',
      value: 57,
      group: 'Third',
    },
    {
      word: 'Aliquam',
      value: 18,
      group: 'Third',
    },
    {
      word: 'dapibus',
      value: 42,
      group: 'Third',
    },
    {
      word: 'urna',
      value: 36,
      group: 'First',
    },
    {
      word: 'vehicula',
      value: 19,
      group: 'Third',
    },
    {
      word: 'Quisque',
      value: 18,
      group: 'Third',
    },
    {
      word: 'convallis',
      value: 25,
      group: 'Fourth',
    },
    {
      word: 'finibus',
      value: 18,
      group: 'Third',
    },
    {
      word: 'felis',
      value: 18,
      group: 'Second',
    },
    {
      word: 'quis',
      value: 22,
      group: 'First',
    },
    {
      word: 'aliquam',
      value: 18,
      group: 'Third',
    },
    {
      word: 'massa',
      value: 55,
      group: 'Second',
    },
    {
      word: 'sagittis',
      value: 18,
      group: 'Third',
    },
    {
      word: 'Nam',
      value: 32,
      group: 'First',
    },
    {
      word: 'ipsum',
      value: 18,
      group: 'Second',
    },
    {
      word: 'orci',
      value: 38,
      group: 'First',
    },
    {
      word: 'ornare',
      value: 18,
      group: 'Second',
    },
    {
      word: 'non',
      value: 18,
      group: 'First',
    },
    {
      word: 'arcu',
      value: 32,
      group: 'First',
    },
    {
      word: 'consequat',
      value: 55,
      group: 'Fourth',
    },
    {
      word: 'tempus',
      value: 23,
      group: 'Second',
    },
    {
      word: 'lobortis',
      value: 47,
      group: 'Third',
    },
    {
      word: 'magna',
      value: 18,
      group: 'Second',
    },
  ],
  options: {
    title: 'Word cloud',
    resizable: true,
    color: {
      pairing: {
        option: 3,
      },
    },
    height: '400px',
  },
};
