import React from 'react';

import { StoryFn, Meta } from '@storybook/react';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Area',
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

export const AreaTimeSeriesNaturalCurve = {
  render: Template,

  args: {
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
  },
};

export const AreaTimeSeries = {
  render: Template,

  args: {
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
        value: 57312,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-08T05:00:00.000Z',
        value: 21432,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-15T05:00:00.000Z',
        value: 70323,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-19T05:00:00.000Z',
        value: 21300,
      },
      {
        group: 'Dataset 2',
        date: '2019-01-01T05:00:00.000Z',
        value: 50000,
      },
      {
        group: 'Dataset 2',
        date: '2019-01-05T05:00:00.000Z',
        value: 15000,
      },
      {
        group: 'Dataset 2',
        date: '2019-01-08T05:00:00.000Z',
        value: 20000,
      },
      {
        group: 'Dataset 2',
        date: '2019-01-13T05:00:00.000Z',
        value: 39213,
      },
      {
        group: 'Dataset 2',
        date: '2019-01-19T05:00:00.000Z',
        value: 61213,
      },
      {
        group: 'Dataset 3',
        date: '2019-01-02T05:00:00.000Z',
        value: 10,
      },
      {
        group: 'Dataset 3',
        date: '2019-01-06T05:00:00.000Z',
        value: 37312,
      },
      {
        group: 'Dataset 3',
        date: '2019-01-08T05:00:00.000Z',
        value: 51432,
      },
      {
        group: 'Dataset 3',
        date: '2019-01-13T05:00:00.000Z',
        value: 40323,
      },
      {
        group: 'Dataset 3',
        date: '2019-01-19T05:00:00.000Z',
        value: 31300,
      },
    ],

    options: {
      title: 'Area (time series)',
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
      height: '400px',
    },
  },
};

export const AreaDiscreteDomain = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.area,
    dataSet: [
      {
        group: 'Dataset 1',
        value: 10000,
        key: 'a',
      },
      {
        group: 'Dataset 1',
        value: 65000,
        key: 'b',
      },
      {
        group: 'Dataset 1',
        value: 10000,
        key: 'c',
      },
      {
        group: 'Dataset 1',
        value: 49213,
        key: 'd',
      },
      {
        group: 'Dataset 1',
        value: 51213,
        key: 'e',
      },
      {
        group: 'Dataset 2',
        value: 20000,
        key: 'a',
      },
      {
        group: 'Dataset 2',
        value: 25000,
        key: 'b',
      },
      {
        group: 'Dataset 2',
        value: 60000,
        key: 'c',
      },
      {
        group: 'Dataset 2',
        value: 30213,
        key: 'd',
      },
      {
        group: 'Dataset 2',
        value: 55213,
        key: 'e',
      },
      {
        group: 'Dataset 3',
        value: 30000,
        key: 'a',
      },
      {
        group: 'Dataset 3',
        value: 20000,
        key: 'b',
      },
      {
        group: 'Dataset 3',
        value: 40000,
        key: 'c',
      },
      {
        group: 'Dataset 3',
        value: 60213,
        key: 'd',
      },
      {
        group: 'Dataset 3',
        value: 25213,
        key: 'e',
      },
    ],
    options: {
      title: 'Discrete Domain',
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
  },
};

export const BoundedAreaTimeSeriesNaturalCurve = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.area,
    dataSet: [
      {
        group: 'Dataset 1',
        date: '2019-01-01T05:00:00.000Z',
        value: 47263,
        min: 40000,
        max: 50000,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-05T05:00:00.000Z',
        value: 14178,
        min: 10000,
        max: 20000,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-08T05:00:00.000Z',
        value: 23094,
        min: 10000,
        max: 25000,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-13T05:00:00.000Z',
        value: 45281,
        min: 42000,
        max: 50000,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-19T05:00:00.000Z',
        value: -63954,
        min: -70000,
        max: -10000,
      },
    ],

    options: {
      title: 'Bounded area (time series - natural curve)',
      legend: {
        enabled: false,
      },
      bounds: {
        upperBoundMapsTo: 'max',
        lowerBoundMapsTo: 'min',
      },
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
  },
};

export const AreaMultipleBoundedAreasNaturalCurve = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.area,
    dataSet: [
      {
        group: 'Dataset 1',
        date: '2023-01-01',
        value: 47263,
        min: 40000,
        max: 50000,
      },
      {
        group: 'Dataset 1',
        date: '2023-01-05',
        value: 14178,
        min: 10000,
        max: 20000,
      },
      {
        group: 'Dataset 1',
        date: '2023-01-08',
        value: 23094,
        min: 10000,
        max: 25000,
      },
      {
        group: 'Dataset 1',
        date: '2023-01-13',
        value: 45281,
        min: 42000,
        max: 50000,
      },
      {
        group: 'Dataset 1',
        date: '2023-01-19',
        value: -63954,
        min: -70000,
        max: -10000,
      },
    ],
    options: {
      title: 'Multiple Bounded Areas (Natural Curve)',
      legend: {
        enabled: false,
      },
      bounds: {
        upperBoundMapsTo: 'max',
        lowerBoundMapsTo: 'min',
      },
      axes: {
        bottom: {
          title: '2023 Annual Sales Figures',
          mapsTo: 'date',
          scaleType: 'time',
          highlights: {
            highlightStartMapsTo: 'startHighlight',
            highlightEndMapsTo: 'endHighlight',
            labelMapsTo: 'label',
            data: [
              {
                startHighlight: new Date(2023, 0, 3, 0, 0, 0),
                label: 'Custom formatter',
                endHighlight: new Date(2023, 0, 8, 0, 0, 0),
              },
              {
                startHighlight: new Date(2023, 0, 13, 0, 0, 0),
                label: 'Custom formatter',
                endHighlight: new Date(2023, 0, 14, 0, 0, 0),
              },
            ],
          },
        },
        left: {
          mapsTo: 'value',
          scaleType: 'linear',
        },
      },
      curve: 'curveNatural',
      height: '400px',
    },
  },
};

export const AreaMultipleBoundedAreasNaturalCurveZoomBarEnabled = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.area,
    dataSet: [
      {
        group: 'Dataset 1',
        date: '2023-01-01',
        value: 47263,
        min: 40000,
        max: 50000,
      },
      {
        group: 'Dataset 1',
        date: '2023-01-05',
        value: 14178,
        min: 10000,
        max: 20000,
      },
      {
        group: 'Dataset 1',
        date: '2023-01-08',
        value: 23094,
        min: 10000,
        max: 25000,
      },
      {
        group: 'Dataset 1',
        date: '2023-01-13',
        value: 45281,
        min: 42000,
        max: 50000,
      },
      {
        group: 'Dataset 1',
        date: '2023-01-19',
        value: -63954,
        min: -70000,
        max: -10000,
      },
    ],
    options: {
      title: 'Multiple Bounded Areas (Natural Curve) - Zoom bar enabled',
      legend: {
        enabled: false,
      },
      bounds: {
        upperBoundMapsTo: 'max',
        lowerBoundMapsTo: 'min',
      },
      axes: {
        bottom: {
          title: '2023 Annual Sales Figures',
          mapsTo: 'date',
          scaleType: 'time',
          highlights: {
            highlightStartMapsTo: 'startHighlight',
            highlightEndMapsTo: 'endHighlight',
            labelMapsTo: 'label',
            data: [
              {
                startHighlight: new Date(2023, 0, 3, 0, 0, 0),
                label: 'Custom formatter',
                endHighlight: new Date(2023, 0, 8, 0, 0, 0),
              },
              {
                startHighlight: new Date(2023, 0, 13, 0, 0, 0),
                label: 'Custom formatter',
                endHighlight: new Date(2023, 0, 14, 0, 0, 0),
              },
            ],
          },
        },
        left: {
          mapsTo: 'value',
          scaleType: 'linear',
        },
      },
      curve: 'curveNatural',
      height: '400px',
      zoomBar: {
        top: {
          enabled: true,
        },
      },
    },
  },
};

export const AreaSkeleton = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.area,
    dataSet: [
      {
        group: 'Dataset 1',
        date: '2019-01-01T05:00:00.000Z',
        value: 47263,
        min: 40000,
        max: 50000,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-05T05:00:00.000Z',
        value: 14178,
        min: 10000,
        max: 20000,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-08T05:00:00.000Z',
        value: 23094,
        min: 10000,
        max: 25000,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-13T05:00:00.000Z',
        value: 45281,
        min: 42000,
        max: 50000,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-19T05:00:00.000Z',
        value: -63954,
        min: -70000,
        max: -10000,
      },
    ],

    options: {
      title: 'Area (skeleton)',
      bounds: {
        upperBoundMapsTo: 'max',
        lowerBoundMapsTo: 'min',
      },
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
      data: {
        loading: true,
      },
      height: '400px',
    },
  },
};

export const AreaEmptyState = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.area,
    dataSet: [],

    options: {
      title: 'Area (empty state)',
      axes: {
        left: {
          mapsTo: 'value',
        },
        bottom: {
          scaleType: 'labels',
          mapsTo: 'key',
        },
      },
      height: '400px',
    },
  },
};

export const AreaTimeSeriesWithCustomColors = {
  render: Template,

  args: {
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
        value: 57312,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-08T05:00:00.000Z',
        value: 21432,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-15T05:00:00.000Z',
        value: 70323,
      },
      {
        group: 'Dataset 1',
        date: '2019-01-19T05:00:00.000Z',
        value: 21300,
      },
      {
        group: 'Dataset 2',
        date: '2019-01-01T05:00:00.000Z',
        value: 50000,
      },
      {
        group: 'Dataset 2',
        date: '2019-01-05T05:00:00.000Z',
        value: 15000,
      },
      {
        group: 'Dataset 2',
        date: '2019-01-08T05:00:00.000Z',
        value: 20000,
      },
      {
        group: 'Dataset 2',
        date: '2019-01-13T05:00:00.000Z',
        value: 39213,
      },
      {
        group: 'Dataset 2',
        date: '2019-01-19T05:00:00.000Z',
        value: 61213,
      },
      {
        group: 'Dataset 3',
        date: '2019-01-02T05:00:00.000Z',
        value: 10,
      },
      {
        group: 'Dataset 3',
        date: '2019-01-06T05:00:00.000Z',
        value: 37312,
      },
      {
        group: 'Dataset 3',
        date: '2019-01-08T05:00:00.000Z',
        value: 51432,
      },
      {
        group: 'Dataset 3',
        date: '2019-01-13T05:00:00.000Z',
        value: 40323,
      },
      {
        group: 'Dataset 3',
        date: '2019-01-19T05:00:00.000Z',
        value: 31300,
      },
    ],

    options: {
      title: 'Area (time series) with custom colors',
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
      height: '400px',
      colors: ['red', 'green'],
    },
  },
};
