import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';
import { Card } from 'react-magma-dom';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Scatter',
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

export const ScatterLinearXAndY = Template.bind({});
ScatterLinearXAndY.args = {
  isInverse: false,
  type: CarbonChartType.scatter,
  dataSet: [
    {
      group: 'Dataset 1',
      employees: 5000,
      sales: 32100,
    },
    {
      group: 'Dataset 1',
      employees: 3000,
      sales: 25100,
    },
    {
      group: 'Dataset 1',
      employees: 8000,
      sales: 12100,
    },
    {
      group: 'Dataset 1',
      employees: 4000,
      sales: 53100,
    },
    {
      group: 'Dataset 2',
      employees: 5000,
      sales: 32100,
    },
    {
      group: 'Dataset 2',
      employees: 2000,
      sales: 34100,
    },
    {
      group: 'Dataset 2',
      employees: 4000,
      sales: 23100,
    },
    {
      group: 'Dataset 2',
      employees: 7000,
      sales: 14100,
    },
    {
      group: 'Dataset 2',
      employees: 6000,
      sales: 53100,
    },
  ],
  options: {
    title: 'Scatter (linear x & y)',
    axes: {
      bottom: {
        title: 'No. of employees',
        mapsTo: 'employees',
        scaleType: 'linear',
      },
      left: {
        title: 'Annual sales',
        mapsTo: 'sales',
        scaleType: 'linear',
      },
    },
    height: '400px',
  },
};

export const ScatterTimeSeries = Template.bind({});
ScatterTimeSeries.args = {
  isInverse: false,
  type: CarbonChartType.scatter,
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
    title: 'Scatter (time series)',
    axes: {
      bottom: {
        title: '2019 Annual Sales Figures',
        scaleType: 'time',
        mapsTo: 'date',
      },
      left: {
        mapsTo: 'value',
      },
    },
    height: '400px',
  },
};

export const ScatterDiscrete = Template.bind({});
ScatterDiscrete.args = {
  isInverse: false,
  type: CarbonChartType.scatter,
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
    },
    {
      group: 'Dataset 4',
      key: 'Misc',
      value: 3000,
    },
  ],
  options: {
    title: 'Scatter (discrete)',
    axes: {
      bottom: {
        title: '2019 Annual Sales Figures',
        scaleType: 'labels',
        mapsTo: 'key',
      },
      left: {
        mapsTo: 'value',
      },
    },
    height: '400px',
  },
};

export const ScatterDualAxes = Template.bind({});
ScatterDualAxes.args = {
  isInverse: false,
  type: CarbonChartType.scatter,
  dataSet: [
    {
      group: 'Orders',
      date: 'January',
      orderCount: 121,
    },
    {
      group: 'Orders',
      date: 'February',
      orderCount: 321,
    },
    {
      group: 'Orders',
      date: 'March',
      orderCount: 370,
    },
    {
      group: 'Orders',
      date: 'April',
      orderCount: 329,
    },
    {
      group: 'Orders',
      date: 'May',
      orderCount: 121,
    },
    {
      group: 'Products',
      date: 'January',
      productCount: 26100,
    },
    {
      group: 'Products',
      date: 'February',
      productCount: 25100,
    },
    {
      group: 'Products',
      date: 'March',
      productCount: 28100,
    },
    {
      group: 'Products',
      date: 'April',
      productCount: 15900,
    },
    {
      group: 'Products',
      date: 'May',
      productCount: 34100,
    },
  ],
  options: {
    title: 'Scatter (dual axes)',
    axes: {
      bottom: {
        mapsTo: 'date',
        scaleType: 'labels',
      },
      left: {
        title: 'order count',
        mapsTo: 'orderCount',
        scaleType: 'linear',
      },
      right: {
        title: 'product count',
        mapsTo: 'productCount',
        scaleType: 'linear',
        correspondingDatasets: ['Products'],
      },
    },
    height: '400px',
  },
};

export const ScatterEmptyState = Template.bind({});
ScatterEmptyState.args = {
  isInverse: false,
  type: CarbonChartType.scatter,
  dataSet: [],
  options: {
    title: 'Scatter (empty state)',
    axes: {
      bottom: {
        title: '2019 Annual Sales Figures',
        scaleType: 'time',
        mapsTo: 'date',
      },
      left: {
        mapsTo: 'value',
      },
    },
    height: '400px',
  },
};

export const ScatterSkeleton = Template.bind({});
ScatterSkeleton.args = {
  isInverse: false,
  type: CarbonChartType.scatter,
  dataSet: [],
  options: {
    title: 'Scatter (skeleton)',
    axes: {
      bottom: {
        title: '2019 Annual Sales Figures',
        scaleType: 'time',
        mapsTo: 'date',
      },
      left: {
        mapsTo: 'value',
      },
    },
    data: {
      loading: true,
    },
    height: '400px',
  },
};
