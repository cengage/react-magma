import React from 'react';

import { StoryFn, Meta } from '@storybook/react/types-6-0';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Step',
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

export const StepTimeSeries = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.line,
    dataSet: [
      {
        group: 'Dataset 1',
        date: '2018-12-31T23:00:00.000Z',
        value: 50000,
        surplus: 844630247.9315708,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-04T23:00:00.000Z',
        value: 65000,
        surplus: 722253377.7025548,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-07T23:00:00.000Z',
        value: null,
        surplus: 9586.628515900247,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-12T23:00:00.000Z',
        value: 49213,
        surplus: 519710030.3060996,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-16T23:00:00.000Z',
        value: 51213,
        surplus: 964336709.1293422,
      },
      {
        group: 'Dataset 2',
        date: '2019-01-01T23:00:00.000Z',
        value: 0,
        surplus: 24733.73210194359,
      },
      {
        group: 'Dataset 2',
        date: '2019-01-05T23:00:00.000Z',
        value: 57312,
        surplus: 2104847.5679499935,
      },
      {
        group: 'Dataset 2',
        date: '2019-01-07T23:00:00.000Z',
        value: 27432,
        surplus: 632664658.6542752,
      },
      {
        group: 'Dataset 2',
        date: '2019-01-14T23:00:00.000Z',
        value: 70323,
        surplus: 1484604165.9194114,
      },
      {
        group: 'Dataset 2',
        date: '2019-01-18T23:00:00.000Z',
        value: 21300,
        surplus: 228423489.25766274,
      },
      {
        group: 'Dataset 3',
        date: '2018-12-31T23:00:00.000Z',
        value: 40000,
        surplus: 634264360.9426379,
      },
      {
        group: 'Dataset 3',
        date: '2019-01-04T23:00:00.000Z',
        value: null,
        surplus: 781.4728603674881,
      },
      {
        group: 'Dataset 3',
        date: '2019-01-07T23:00:00.000Z',
        value: 18000,
        surplus: 210741530.6295638,
      },
      {
        group: 'Dataset 3',
        date: '2019-01-12T23:00:00.000Z',
        value: 39213,
        surplus: 135260712.71714658,
      },
      {
        group: 'Dataset 3',
        date: '2019-01-16T23:00:00.000Z',
        value: 61213,
        surplus: 313154331.2033775,
      },
      {
        group: 'Dataset 4',
        date: '2019-01-01T23:00:00.000Z',
        value: 20000,
        surplus: 450715657.7789645,
      },
      {
        group: 'Dataset 4',
        date: '2019-01-05T23:00:00.000Z',
        value: 37312,
        surplus: 60444212.38584305,
      },
      {
        group: 'Dataset 4',
        date: '2019-01-07T23:00:00.000Z',
        value: 51432,
        surplus: 1007946419.445114,
      },
      {
        group: 'Dataset 4',
        date: '2019-01-14T23:00:00.000Z',
        value: 25332,
        surplus: 281099594.1962531,
      },
      {
        group: 'Dataset 4',
        date: '2019-01-18T23:00:00.000Z',
        value: null,
        surplus: 1928.4268222770295,
      },
    ],
    options: {
      title: 'Step (time series)',
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
      curve: 'curveStepAfter',
      height: '400px',
    },
  },
};
