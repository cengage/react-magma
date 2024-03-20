import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';
import { Card } from 'react-magma-dom';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Line',
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

export const LineDiscrete = Template.bind({});
LineDiscrete.args = {
  isInverse: false,
  type: CarbonChartType.line,
  dataSet: [
    {
      group: 'Dataset 1',
      key: 'Qty',
      value: 34200,
    },
    {
      group: 'Dataset 1',
      key: 'More',
      value: 23500,
    },
    {
      group: 'Dataset 1',
      key: 'Sold',
      value: 53100,
    },
    {
      group: 'Dataset 1',
      key: 'Restocking',
      value: 42300,
    },
    {
      group: 'Dataset 1',
      key: 'Misc',
      value: 12300,
    },
    {
      group: 'Dataset 2',
      key: 'Qty',
      value: 34200,
    },
    {
      group: 'Dataset 2',
      key: 'More',
      value: 53200,
    },
    {
      group: 'Dataset 2',
      key: 'Sold',
      value: 42300,
    },
    {
      group: 'Dataset 2',
      key: 'Restocking',
      value: 21400,
    },
    {
      group: 'Dataset 2',
      key: 'Misc',
      value: 0,
    },
    {
      group: 'Dataset 3',
      key: 'Qty',
      value: 41200,
    },
    {
      group: 'Dataset 3',
      key: 'More',
      value: 18400,
    },
    {
      group: 'Dataset 3',
      key: 'Sold',
      value: 34210,
    },
    {
      group: 'Dataset 3',
      key: 'Restocking',
      value: 1400,
    },
    {
      group: 'Dataset 3',
      key: 'Misc',
      value: 42100,
    },
    {
      group: 'Dataset 4',
      key: 'Qty',
      value: 22000,
    },
    {
      group: 'Dataset 4',
      key: 'More',
      value: 1200,
    },
    {
      group: 'Dataset 4',
      key: 'Sold',
      value: 9000,
    },
    {
      group: 'Dataset 4',
      key: 'Restocking',
      value: 24000,
      audienceSize: 10,
    },
    {
      group: 'Dataset 4',
      key: 'Misc',
      value: 3000,
      audienceSize: 10,
    },
  ],
  options: {
    title: 'Line (discrete)',
    axes: {
      bottom: {
        title: '2019 Annual Sales Figures',
        mapsTo: 'key',
        scaleType: 'labels',
      },
      left: {
        mapsTo: 'value',
        title: 'Conversion rate',
        scaleType: 'linear',
      },
    },
    height: '400px',
    theme: 'g100',
  },
};

export const LineTimeSeries = Template.bind({});
LineTimeSeries.args = {
  isInverse: false,
  type: CarbonChartType.line,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2019-01-01T05:00:00.000Z',
      value: 50000,
      surplus: 523012392.5263605,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-05T05:00:00.000Z',
      value: 65000,
      surplus: 772740170.8482182,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-08T05:00:00.000Z',
      value: null,
      surplus: 13322.578682563697,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-13T05:00:00.000Z',
      value: 49213,
      surplus: 1000448679.2227045,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-17T05:00:00.000Z',
      value: 51213,
      surplus: 1234900823.3172598,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-02T05:00:00.000Z',
      value: 0,
      surplus: 7620.93487174954,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-06T05:00:00.000Z',
      value: 57312,
      surplus: 1308387951.9203572,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-08T05:00:00.000Z',
      value: 27432,
      surplus: 553140870.9513942,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-15T05:00:00.000Z',
      value: 70323,
      surplus: 1448993520.232652,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-19T05:00:00.000Z',
      value: 21300,
      surplus: 468792972.92781883,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-01T05:00:00.000Z',
      value: 40000,
      surplus: 309637962.3262422,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-05T05:00:00.000Z',
      value: null,
      surplus: 2051.471861823623,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-08T05:00:00.000Z',
      value: 18000,
      surplus: 343093081.6745837,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-13T05:00:00.000Z',
      value: 39213,
      surplus: 716440523.7786787,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-17T05:00:00.000Z',
      value: 61213,
      surplus: 584039753.4962941,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-02T05:00:00.000Z',
      value: 20000,
      surplus: 186495096.85354337,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-06T05:00:00.000Z',
      value: 37312,
      surplus: 202885089.37063065,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-08T05:00:00.000Z',
      value: 51432,
      surplus: 763947723.2503313,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-15T05:00:00.000Z',
      value: 25332,
      surplus: 560375921.1862621,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-19T05:00:00.000Z',
      value: null,
      surplus: 24577.821805054795,
    },
  ],
  options: {
    title: 'Line (time series)',
    axes: {
      bottom: {
        title: '2019 Annual Sales Figures',
        mapsTo: 'date',
        scaleType: 'time',
      },
      left: {
        mapsTo: 'value',
        title: 'Conversion rate',
        scaleType: 'linear',
      },
    },
    curve: 'curveMonotoneX',
    height: '400px',
    theme: 'g100',
  },
};

export const LineDenseTimeSeries = Template.bind({});
LineDenseTimeSeries.args = {
  isInverse: false,
  type: CarbonChartType.line,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2019-01-01T05:00:00.000Z',
      value: -10000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-01T10:00:00.000Z',
      value: -12000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-01T15:00:00.000Z',
      value: -14000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-02T05:00:00.000Z',
      value: -25000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-02T07:00:00.000Z',
      value: -26000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-03T05:00:00.000Z',
      value: -10000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-03T10:00:00.000Z',
      value: 10000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-03T15:00:00.000Z',
      value: 12000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-05T05:00:00.000Z',
      value: 45000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-07T05:00:00.000Z',
      value: 49000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-07T20:00:00.000Z',
      value: 45000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-09T05:00:00.000Z',
      value: 50000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-09T10:00:00.000Z',
      value: 52000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-09T20:00:00.000Z',
      value: 55000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-10T05:00:00.000Z',
      value: 50000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-12T05:00:00.000Z',
      value: 65000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-13T05:00:00.000Z',
      value: 80000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-14T15:00:00.000Z',
      value: 85000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-15T12:00:00.000Z',
      value: 90000,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-15T23:00:00.000Z',
      value: 70000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-01T05:00:00.000Z',
      value: 20000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-01T08:00:00.000Z',
      value: 22000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-01T21:00:00.000Z',
      value: 24000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-02T05:00:00.000Z',
      value: 35000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-02T12:00:00.000Z',
      value: 36000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-03T05:00:00.000Z',
      value: 20000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-03T11:00:00.000Z',
      value: 20000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-03T23:00:00.000Z',
      value: 22000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-05T05:00:00.000Z',
      value: 62000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-06T05:00:00.000Z',
      value: 52000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-07T05:00:00.000Z',
      value: 52000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-07T20:00:00.000Z',
      value: 52000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-09T05:00:00.000Z',
      value: 60000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-09T10:00:00.000Z',
      value: 62000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-09T15:00:00.000Z',
      value: 62000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-12T05:00:00.000Z',
      value: 65000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-14T05:00:00.000Z',
      value: 40000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-15T10:00:00.000Z',
      value: 45000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-15T15:00:00.000Z',
      value: 35000,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-15T23:00:00.000Z',
      value: 30000,
    },
  ],
  options: {
    title: 'Line (dense time series)',
    axes: {
      bottom: {
        title: '2019 Annual Sales Figures',
        mapsTo: 'date',
        scaleType: 'time',
      },
      left: {
        mapsTo: 'value',
        title: 'Conversion rate',
        scaleType: 'linear',
      },
    },
    curve: 'curveMonotoneX',
    height: '400px',
    theme: 'g100',
  },
};

export const LineLineDualDualAxes = Template.bind({});
LineLineDualDualAxes.args = {
  isInverse: false,
  type: CarbonChartType.line,
  dataSet: [
    {
      group: 'Temperature',
      date: '2019-01-01T05:00:00.000Z',
      temp: 23,
    },
    {
      group: 'Temperature',
      date: '2019-02-01T05:00:00.000Z',
      temp: 15,
    },
    {
      group: 'Temperature',
      date: '2019-03-01T05:00:00.000Z',
      temp: 24,
    },
    {
      group: 'Temperature',
      date: '2019-04-01T04:00:00.000Z',
      temp: 33,
    },
    {
      group: 'Temperature',
      date: '2019-05-01T04:00:00.000Z',
      temp: 23,
    },
    {
      group: 'Temperature',
      date: '2019-06-01T04:00:00.000Z',
      temp: 32,
    },
    {
      group: 'Temperature',
      date: '2019-07-01T04:00:00.000Z',
      temp: 23,
    },
    {
      group: 'Rainfall',
      date: '2019-01-01T05:00:00.000Z',
      rainfall: 50,
    },
    {
      group: 'Rainfall',
      date: '2019-02-01T05:00:00.000Z',
      rainfall: 65,
    },
    {
      group: 'Rainfall',
      date: '2019-03-01T05:00:00.000Z',
      rainfall: 35,
    },
    {
      group: 'Rainfall',
      date: '2019-04-01T04:00:00.000Z',
      rainfall: 43,
    },
    {
      group: 'Rainfall',
      date: '2019-05-01T04:00:00.000Z',
      rainfall: 53,
    },
    {
      group: 'Rainfall',
      date: '2019-06-01T04:00:00.000Z',
      rainfall: 19,
    },
    {
      group: 'Rainfall',
      date: '2019-07-01T04:00:00.000Z',
      rainfall: 13,
    },
  ],
  options: {
    title: 'Line + Line (dual axes)',
    axes: {
      left: {
        title: 'Temperature (°C)',
        mapsTo: 'temp',
      },
      bottom: {
        scaleType: 'time',
        mapsTo: 'date',
        title: 'Date',
      },
      right: {
        title: 'Rainfall (mm)',
        mapsTo: 'rainfall',
        correspondingDatasets: ['Rainfall'],
      },
    },
    curve: 'curveMonotoneX',
    height: '400px',
    theme: 'g100',
  },
};

export const LineEmptyState = Template.bind({});
LineEmptyState.args = {
  isInverse: false,
  type: CarbonChartType.line,
  dataSet: [],
  options: {
    title: 'Line (empty state)',
    axes: {
      bottom: {
        title: '2019 Annual Sales Figures',
        mapsTo: 'date',
        scaleType: 'time',
      },
      left: {
        mapsTo: 'value',
        title: 'Conversion rate',
        scaleType: 'linear',
      },
    },
    curve: 'curveMonotoneX',
    height: '400px',
    theme: 'g100',
  },
};

export const LineSkeleton = Template.bind({});
LineSkeleton.args = {
  isInverse: false,
  type: CarbonChartType.line,
  dataSet: [],
  options: {
    title: 'Line (skeleton)',
    axes: {
      bottom: {
        title: '2019 Annual Sales Figures',
        mapsTo: 'date',
        scaleType: 'time',
      },
      left: {
        mapsTo: 'value',
        title: 'Conversion rate',
        scaleType: 'linear',
      },
    },
    curve: 'curveMonotoneX',
    data: {
      loading: true,
    },
    height: '400px',
    theme: 'g100',
  },
};
