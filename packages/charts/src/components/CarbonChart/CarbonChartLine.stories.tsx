import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

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
    <CarbonChart {...args} />
  </Card>
);

export const CustomDomainLine = Template.bind({});
CustomDomainLine.args = {
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
    title: 'Custom domain (line)',
    axes: {
      bottom: {
        title: '2023 Annual Sales Figures',
        mapsTo: 'key',
        scaleType: 'labels',
        domain: ['Qty', 'More', 'Misc'],
      },
      left: {
        domain: [10000, 50000],
        mapsTo: 'value',
        title: 'Conversion rate',
        scaleType: 'linear',
      },
    },
    height: '400px',
  },
};

export const RotatedTicksLine = Template.bind({});
RotatedTicksLine.args = {
  isInverse: false,
  type: CarbonChartType.line,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2023-12-30',
      value: 32100,
    },
    {
      group: 'Dataset 1',
      date: '2023-12-31',
      value: 23500,
    },
    {
      group: 'Dataset 1',
      date: '2024-01-01',
      value: 53100,
    },
    {
      group: 'Dataset 1',
      date: '2024-01-02',
      value: 42300,
    },
    {
      group: 'Dataset 1',
      date: '2024-01-03',
      value: 12300,
    },
  ],
  options: {
    title: 'Rotated ticks (line)',
    axes: {
      bottom: {
        scaleType: 'time',
        mapsTo: 'date',
        ticks: {
          rotation: 'always',
        },
      },
      left: {
        mapsTo: 'value',
      },
    },
    legend: {
      clickable: false,
    },
    height: '400px',
  },
};

export const LineTimeSeries15SecondInterval = Template.bind({});
LineTimeSeries15SecondInterval.args = {
  isInverse: false,
  type: CarbonChartType.line,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2020-12-11T04:59:15.000Z',
      value: 15,
    },
    {
      group: 'Dataset 1',
      date: '2020-12-11T04:59:30.000Z',
      value: 15,
    },
    {
      group: 'Dataset 1',
      date: '2020-12-11T04:59:45.000Z',
      value: 7,
    },
    {
      group: 'Dataset 1',
      date: '2020-12-11T05:00:00.000Z',
      value: 2,
    },
    {
      group: 'Dataset 1',
      date: '2020-12-11T05:00:15.000Z',
      value: 9,
    },
    {
      group: 'Dataset 1',
      date: '2020-12-11T05:00:30.000Z',
      value: 13,
    },
    {
      group: 'Dataset 1',
      date: '2020-12-11T05:00:45.000Z',
      value: 8,
    },
  ],
  options: {
    title: 'Line (time series) - 15 second interval',
    axes: {
      left: {
        mapsTo: 'value',
      },
      bottom: {
        scaleType: 'time',
        mapsTo: 'date',
      },
    },
    legend: {
      clickable: false,
    },
    height: '400px',
  },
};

export const LogAxis = Template.bind({});
LogAxis.args = {
  isInverse: false,
  type: CarbonChartType.line,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2023-12-30',
      value: 300100,
    },
    {
      group: 'Dataset 1',
      date: '2023-12-31',
      value: 235000,
    },
    {
      group: 'Dataset 1',
      date: '2024-01-01',
      value: 153100,
    },
    {
      group: 'Dataset 1',
      date: '2024-01-02',
      value: 142300,
    },
    {
      group: 'Dataset 1',
      date: '2024-01-03',
      value: 82300,
    },
  ],
  options: {
    title: 'Log Axis',
    axes: {
      bottom: {
        scaleType: 'time',
        mapsTo: 'date',
      },
      left: {
        mapsTo: 'value',
        scaleType: 'log',
        includeZero: false,
      },
    },
    height: '400px',
  },
};

export const PreSelectedGroupsLine = Template.bind({});
PreSelectedGroupsLine.args = {
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
      value: 56000,
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
    title: 'Pre-selected groups (line)',
    data: {
      selectedGroups: ['Dataset 1', 'Dataset 3'],
    },
    axes: {
      bottom: {
        title: '2023 Annual Sales Figures',
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
  },
};

export const LeftAlignedVerticalLegendLine = Template.bind({});
LeftAlignedVerticalLegendLine.args = {
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
    title: 'Left aligned vertical legend (line)',
    axes: {
      bottom: {
        title: '2023 Annual Sales Figures',
        mapsTo: 'key',
        scaleType: 'labels',
      },
      left: {
        mapsTo: 'value',
        title: 'Conversion rate',
        scaleType: 'linear',
      },
    },
    legend: {
      position: 'left',
      orientation: 'vertical',
    },
    height: '400px',
  },
};

export const ThresholdsLine = Template.bind({});
ThresholdsLine.args = {
  isInverse: false,
  type: CarbonChartType.line,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2023-01-01',
      value: 50000,
    },
    {
      group: 'Dataset 1',
      date: '2023-01-05',
      value: 65000,
    },
    {
      group: 'Dataset 1',
      date: '2023-01-08',
      value: null,
    },
    {
      group: 'Dataset 1',
      date: '2023-01-13',
      value: 49213,
    },
    {
      group: 'Dataset 1',
      date: '2023-01-17',
      value: 51213,
    },
    {
      group: 'Dataset 2',
      date: '2023-01-02',
      value: 0,
    },
    {
      group: 'Dataset 2',
      date: '2023-01-06',
      value: 57312,
    },
    {
      group: 'Dataset 2',
      date: '2023-01-08',
      value: 27432,
    },
    {
      group: 'Dataset 2',
      date: '2023-01-15',
      value: 70323,
    },
    {
      group: 'Dataset 2',
      date: '2023-01-19',
      value: 21300,
    },
    {
      group: 'Dataset 3',
      date: '2023-01-01',
      value: 40000,
    },
    {
      group: 'Dataset 3',
      date: '2023-01-05',
      value: null,
    },
    {
      group: 'Dataset 3',
      date: '2023-01-08',
      value: 18000,
    },
    {
      group: 'Dataset 3',
      date: '2023-01-13',
      value: 39213,
    },
    {
      group: 'Dataset 3',
      date: '2023-01-17',
      value: 61213,
    },
    {
      group: 'Dataset 4',
      date: '2023-01-02',
      value: 20000,
    },
    {
      group: 'Dataset 4',
      date: '2023-01-06',
      value: 37312,
    },
    {
      group: 'Dataset 4',
      date: '2023-01-08',
      value: 51432,
    },
    {
      group: 'Dataset 4',
      date: '2023-01-15',
      value: 25332,
    },
    {
      group: 'Dataset 4',
      date: '2023-01-19',
      value: null,
    },
  ],
  options: {
    title: 'Thresholds (line)',
    axes: {
      bottom: {
        title: '2023 Annual Sales Figures',
        mapsTo: 'date',
        scaleType: 'time',
        thresholds: [
          {
            value: new Date(2023, 0, 11, 0, 0, 0),
            label: 'Custom formatter',
            valueFormatter: e =>
              new Intl.DateTimeFormat('en-CA', {
                month: 'short',
                day: '2-digit',
              }).format(e),
          },
        ],
      },
      left: {
        mapsTo: 'value',
        title: 'Conversion rate',
        scaleType: 'linear',
        thresholds: [
          {
            value: 55000,
            label: 'Custom label',
            fillColor: 'orange',
          },
          {
            value: 10000,
            fillColor: '#03a9f4',
          },
        ],
      },
    },
    curve: 'curveMonotoneX',
    height: '400px',
  },
};

export const LineTimeSeriesSingleDatum = Template.bind({});
LineTimeSeriesSingleDatum.args = {
  isInverse: false,
  type: CarbonChartType.line,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2020-01-06T19:43:16.000Z',
      value: 10,
    },
  ],
  options: {
    title: 'Line (time series) - Single datum',
    axes: {
      left: {
        mapsTo: 'value',
      },
      bottom: {
        scaleType: 'time',
        mapsTo: 'date',
      },
    },
    legend: {
      clickable: false,
    },
    height: '400px',
  },
};

export const TruncatedlabelsLine = Template.bind({});
TruncatedlabelsLine.args = {
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
      key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
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
      key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
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
      key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
      value: 1400,
    },
    {
      group: 'Dataset 3',
      key: 'Misc',
      value: 42100,
    },
    {
      group: 'LongLabelShouldBeTruncated',
      key: 'Qty',
      value: 22000,
    },
    {
      group: 'LongLabelShouldBeTruncated',
      key: 'More',
      value: 1200,
    },
    {
      group: 'LongLabelShouldBeTruncated',
      key: 'Sold',
      value: 9000,
    },
    {
      group: 'LongLabelShouldBeTruncated',
      key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
      value: 24000,
      audienceSize: 10,
    },
    {
      group: 'LongLabelShouldBeTruncated',
      key: 'Misc',
      value: 3000,
      audienceSize: 10,
    },
  ],
  options: {
    title: 'Truncated labels (line)',
    axes: {
      bottom: {
        title: '2023 Annual Sales Figures',
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
  },
};

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
  },
};

export const LineTimeSeriesAllLabelsInPrimaryFormat = Template.bind({});
LineTimeSeriesAllLabelsInPrimaryFormat.args = {
  isInverse: false,
  type: CarbonChartType.line,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2020-01-23T06:00:00.000Z',
      value: 10,
    },
    {
      group: 'Dataset 1',
      date: '2020-01-29T06:00:00.000Z',
      value: 10,
    },
  ],
  options: {
    title: 'Line (time series) - All labels in primary format',
    axes: {
      left: {
        mapsTo: 'value',
      },
      bottom: {
        scaleType: 'time',
        mapsTo: 'date',
      },
    },
    timeScale: {
      addSpaceOnEdges: 0,
    },
    legend: {
      clickable: false,
    },
    height: '400px',
  },
};

export const LineTimeSeriesTwoIcons = Template.bind({});
LineTimeSeriesTwoIcons.args = {
  isInverse: false,
  type: CarbonChartType.line,
  dataSet: [
    {
      group: 'Dataset 1',
      date: '2019-01-01T05:00:00.000Z',
      value: 50000,
      surplus: 776202545.2043447,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-05T05:00:00.000Z',
      value: 65000,
      surplus: 1185729357.0244992,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-08T05:00:00.000Z',
      value: null,
      surplus: 11613.75907479044,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-13T05:00:00.000Z',
      value: 49213,
      surplus: 847080513.346657,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-17T05:00:00.000Z',
      value: 51213,
      surplus: 1211892509.000086,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-02T05:00:00.000Z',
      value: 0,
      surplus: 6102.7727993504,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-06T05:00:00.000Z',
      value: 57312,
      surplus: 261556941.96214834,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-08T05:00:00.000Z',
      value: 27432,
      surplus: 14178837.917517675,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-15T05:00:00.000Z',
      value: 70323,
      surplus: 295263282.23943055,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-19T05:00:00.000Z',
      value: 21300,
      surplus: 133872100.36457807,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-01T05:00:00.000Z',
      value: 40000,
      surplus: 302619995.3236921,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-05T05:00:00.000Z',
      value: null,
      surplus: 19518.355960758956,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-08T05:00:00.000Z',
      value: 18000,
      surplus: 431282259.09100664,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-13T05:00:00.000Z',
      value: 39213,
      surplus: 788505803.1662132,
    },
    {
      group: 'Dataset 3',
      date: '2019-01-17T05:00:00.000Z',
      value: 61213,
      surplus: 1273123736.0033627,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-02T05:00:00.000Z',
      value: 20000,
      surplus: 466576638.7877422,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-06T05:00:00.000Z',
      value: 37312,
      surplus: 368228069.08366436,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-08T05:00:00.000Z',
      value: 51432,
      surplus: 240908388.9062717,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-15T05:00:00.000Z',
      value: 25332,
      surplus: 422842585.96060365,
    },
    {
      group: 'Dataset 4',
      date: '2019-01-19T05:00:00.000Z',
      value: null,
      surplus: 24964.179219263424,
    },
  ],
  options: {
    title: 'Line (time series) - two icons',
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
    toolbar: {
      enabled: true,
      numberOfIcons: 2,
      controls: [
        {
          type: 'Reset zoom',
        },
        {
          type: 'Zoom in',
        },
        {
          type: 'Zoom out',
        },
      ],
    },
    zoomBar: {
      top: {
        enabled: true,
      },
    },
    height: '400px',
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
  },
};
