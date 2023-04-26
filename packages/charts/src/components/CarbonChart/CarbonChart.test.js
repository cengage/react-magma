import React from 'react';
import { CarbonChart, CarbonChartType } from '.';
import { render } from '@testing-library/react';

const TEXT = 'Test Text';
const dataSet = [
  {
    group: 'Dataset 1',
    date: '2019-01-01T05:00:00.000Z',
    value: 0,
  },
  {
    group: 'Dataset 2',
    date: '2019-01-01T05:00:00.000Z',
    value: 47263,
  },
];

describe.skip('CarbonChart', () => {
  it('should render the visually hidden component', () => {
    const { getByText } = render(
      <CarbonChart dataSet={dataSet} type={CarbonChartType.area}>
        {TEXT}
      </CarbonChart>
    );

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <CarbonChart
        testId={testId}
        dataSet={dataSet}
        type={CarbonChartType.area}
      >
        {TEXT}
      </CarbonChart>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });
});
