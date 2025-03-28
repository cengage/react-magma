import React from 'react';

import { render } from '@testing-library/react';

import { CarbonChart, CarbonChartType } from '.';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const dataSet = [
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
];

const chartOptions = {
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
};

describe('CarbonChart', () => {
  it('should render the visually hidden component', () => {
    const { getByText } = render(
      <CarbonChart
        dataSet={dataSet}
        options={chartOptions}
        type={CarbonChartType.bar}
      />
    );

    expect(getByText(chartOptions.title)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <CarbonChart
        testId={testId}
        dataSet={dataSet}
        options={chartOptions}
        type={CarbonChartType.bar}
      />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });
});
