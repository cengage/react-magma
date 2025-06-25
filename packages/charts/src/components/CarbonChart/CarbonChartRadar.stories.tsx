import React from 'react';

import { StoryFn, Meta } from '@storybook/react/types-6-0';
import { Card } from 'react-magma-dom';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '.';

export default {
  component: CarbonChart,
  title: 'CarbonChart/Radar',
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

export const Radar = {
  render: Template,

  args: {
    isInverse: false,
    type: CarbonChartType.radar,
    dataSet: [
      {
        product: 'Product 1',
        feature: 'Price',
        score: 60,
      },
      {
        product: 'Product 1',
        feature: 'Usability',
        score: 92,
      },
      {
        product: 'Product 1',
        feature: 'Availability',
        score: 5,
      },
      {
        product: 'Product 1',
        feature: 'Performance',
        score: 85,
      },
      {
        product: 'Product 1',
        feature: 'Quality',
        score: 60,
      },
      {
        product: 'Product 2',
        feature: 'Price',
        score: 70,
      },
      {
        product: 'Product 2',
        feature: 'Usability',
        score: 63,
      },
      {
        product: 'Product 2',
        feature: 'Availability',
        score: 78,
      },
      {
        product: 'Product 2',
        feature: 'Performance',
        score: 50,
      },
      {
        product: 'Product 2',
        feature: 'Quality',
        score: 30,
      },
    ],
    options: {
      title: 'Radar',
      radar: {
        axes: {
          angle: 'feature',
          value: 'score',
        },
      },
      data: {
        groupMapsTo: 'product',
      },
      height: '400px',
    },
  },
};
