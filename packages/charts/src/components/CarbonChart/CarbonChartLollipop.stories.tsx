import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Lollipop',
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

//Lollipop//
export const LollipopDiscrete = Template.bind({});
LollipopDiscrete.args = {
  isInverse: false,
  type: CarbonChartType.lollipop,
  dataSet: [
    {
      group: 'Dataset 1',
      key: 'Qty',
      value: 34200,
    },
    {
      group: 'Dataset 2',
      key: 'More',
      value: 34200,
    },
    {
      group: 'Dataset 3',
      key: 'Sold',
      value: 41200,
    },
    {
      group: 'Dataset 4',
      key: 'Restocking',
      value: 22000,
    },
  ],
  options: {
    title: 'Lollipop (discrete)',
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
export const LollipopHorizontalPresentation = Template.bind({});
LollipopHorizontalPresentation.args = {
  isInverse: false,
  type: CarbonChartType.lollipop,
  dataSet: [
    {
      group: 'Dataset 1',
      key: 'Qty',
      value: 34200,
    },
    {
      group: 'Dataset 2',
      key: 'More',
      value: 34200,
    },
    {
      group: 'Dataset 3',
      key: 'Sold',
      value: 41200,
    },
    {
      group: 'Dataset 4',
      key: 'Restocking',
      value: 22000,
    },
  ],
  options: {
    title: 'Lollipop (horizontal) - presentation',
    axes: {
      left: {
        title: '2019 Annual Sales Figures',
        scaleType: 'labels',
        mapsTo: 'key',
      },
      bottom: {
        mapsTo: 'value',
      },
    },
    height: '400px',
  },
};
//Lollipop//
