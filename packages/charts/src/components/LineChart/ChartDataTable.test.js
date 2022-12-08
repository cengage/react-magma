import React from 'react';
import { render } from '@testing-library/react';
import { basicData, explicitData } from './test/exampleChartData';
import { ChartDataTable } from './ChartDataTable';

describe('Chart Data Table', () => {
  describe('Basic Data', () => {
    it('should render chart data with x values values', () => {
      const label = '2019 Annual Sales Figures';
      const { getByText, getAllByText } = render(
        <ChartDataTable
          data={basicData}
          xData={{
            label,
          }}
          yData={{
            tickFormat: t => `$${t}k`,
          }}
        />
      );

      expect(getByText(label)).toBeInTheDocument();
      expect(getByText(basicData[0].data[0].x)).toBeInTheDocument();
      expect(getByText(basicData[0].name)).toBeInTheDocument();
      expect(
        getAllByText(`$${basicData[0].data[0].y}k`)[0]
      ).toBeInTheDocument();
    });

    it('should render chart data with x tick values and an x tick format function', () => {
      const label = '2019 Annual Sales Figures';
      const { getByText } = render(
        <ChartDataTable
          data={basicData}
          xData={{
            label,
            tickFormat: t => `Month of ${t}`,
            tickValues: ['Jan', 'Feb', 'March', 'April', 'May'],
          }}
          yData={{
            tickFormat: t => `$${t}k`,
          }}
        />
      );

      expect(getByText('Month of Jan')).toBeInTheDocument();
    });

    it('should render chart data with an x tick format array', () => {
      const label = '2019 Annual Sales Figures';
      const { getByText, getAllByText } = render(
        <ChartDataTable
          data={basicData}
          xData={{
            label,
            tickFormat: ['Jan', 'Feb', 'March', 'April', 'May'],
          }}
          yData={{
            tickFormat: t => `$${t}k`,
          }}
        />
      );

      expect(getByText(label)).toBeInTheDocument();
      expect(getByText('Jan')).toBeInTheDocument();
      expect(getByText(basicData[0].name)).toBeInTheDocument();
      expect(
        getAllByText(`$${basicData[0].data[0].y}k`)[0]
      ).toBeInTheDocument();
    });
  });

  describe('Explicit Data', () => {
    it('should render chart data with x tick values', () => {
      const label = '2019 Annual Sales Figures';
      const { getByText, getAllByText } = render(
        <ChartDataTable
          data={explicitData}
          xData={{
            keyValue: 'month',
            label,
            tickValues: ['Jan', 'Feb', 'March', 'April', 'May'],
          }}
          yData={{
            keyValue: 'sales',
            tickFormat: t => `$${t}k`,
          }}
        />
      );

      expect(getByText(label)).toBeInTheDocument();
      expect(getByText('Jan')).toBeInTheDocument();
      expect(getByText(explicitData[0].name)).toBeInTheDocument();
      expect(
        getAllByText(`$${explicitData[0].data[0].sales}k`)[0]
      ).toBeInTheDocument();
    });

    it('should render column header for x values using the x key value when no label is provided', () => {
      const { getByText } = render(
        <ChartDataTable
          data={explicitData}
          xData={{
            keyValue: 'month',
            tickValues: ['Jan', 'Feb', 'March', 'April', 'May'],
          }}
          yData={{
            keyValue: 'sales',
            tickFormat: t => `$${t}k`,
          }}
        />
      );

      expect(getByText('month')).toBeInTheDocument();
    });

    it('should render chart data with x tick values and an x tick format function', () => {
      const label = '2019 Annual Sales Figures';
      const { getByText } = render(
        <ChartDataTable
          data={explicitData}
          xData={{
            label,
            keyValue: 'month',
            tickFormat: t => `Month of ${t}`,
            tickValues: ['Jan', 'Feb', 'March', 'April', 'May'],
          }}
          yData={{
            keyValue: 'sales',
            tickFormat: t => `$${t}k`,
          }}
        />
      );

      expect(getByText('Month of Jan')).toBeInTheDocument();
    });

    it('should render chart data with an x tick format array', () => {
      const label = '2019 Annual Sales Figures';
      const { getByText, getAllByText } = render(
        <ChartDataTable
          data={explicitData}
          xData={{
            label,
            keyValue: 'month',
            tickFormat: ['Jan', 'Feb', 'March', 'April', 'May'],
          }}
          yData={{
            keyValue: 'sales',
            tickFormat: t => `$${t}k`,
          }}
        />
      );

      expect(getByText(label)).toBeInTheDocument();
      expect(getByText('Jan')).toBeInTheDocument();
      expect(getByText(explicitData[0].name)).toBeInTheDocument();
      expect(
        getAllByText(`$${explicitData[0].data[0].sales}k`)[0]
      ).toBeInTheDocument();
    });
  });
});
