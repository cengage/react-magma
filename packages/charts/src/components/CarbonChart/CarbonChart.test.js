import React from 'react';

import { render } from '@testing-library/react';
import { ThemeContext, magma } from 'react-magma-dom';

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

  describe('Magma Theme Values Applied to Styles', () => {
    it('should apply theme.colors.neutral700 to data table cells', () => {
      const testId = 'table-color-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.colors.neutral700 to .cds--data-table td
      expect(wrapper).toHaveStyleRule('color', magma.colors.neutral700, {
        target: '.cds--data-table td',
      });
    });

    it('should apply theme.colors.primary for button background in non-inverse mode', () => {
      const testId = 'button-color-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
            isInverse={false}
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.colors.primary to .cds--btn--primary
      expect(wrapper).toHaveStyleRule('background', magma.colors.primary, {
        target: '.chart-holder .cds--btn--primary',
      });
    });

    it('should apply theme.colors.tertiary500 for button background when isInverse is true', () => {
      const testId = 'button-inverse-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
            isInverse
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.colors.tertiary500 to .cds--btn--primary when inverse
      expect(wrapper).toHaveStyleRule('background', magma.colors.tertiary500, {
        target: '.chart-holder .cds--btn--primary',
      });
    });

    it('should apply theme.colors.primary700 for inverse table header background', () => {
      const testId = 'table-inverse-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
            isInverse
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.colors.primary700 to table header when inverse
      expect(wrapper).toHaveStyleRule(
        'background',
        `${magma.colors.primary700}!important`,
        {
          target: '.cds--data-table thead tr th',
        }
      );
    });

    it('should apply theme.colors.neutral100 for inverse text color', () => {
      const testId = 'text-inverse-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
            isInverse
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.colors.neutral100 to text when inverse
      expect(wrapper).toHaveStyleRule('color', magma.colors.neutral100, {
        target: 'p',
      });
    });

    it('should apply theme.bodyFont to chart text elements', () => {
      const testId = 'font-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.bodyFont to various text elements
      expect(wrapper).toHaveStyleRule(
        'font-family',
        `${magma.bodyFont}!important`,
        {
          target: 'p',
        }
      );
    });

    it('should apply theme.typeScale.size02.fontSize to tooltip text', () => {
      const testId = 'font-size-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.typeScale.size02.fontSize to tooltips
      expect(wrapper).toHaveStyleRule(
        'font-size',
        magma.typeScale.size02.fontSize,
        {
          target: '.cds--cc--tooltip .content-box .datapoint-tooltip p',
        }
      );
    });

    it('should apply theme.typeScale.size03.fontSize to legend text', () => {
      const testId = 'legend-font-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.typeScale.size03.fontSize to legend
      expect(wrapper).toHaveStyleRule(
        'font-size',
        magma.typeScale.size03.fontSize,
        {
          target: 'div.cds--cc--legend div.legend-item p',
        }
      );
    });

    it('should apply theme.borderRadius to modal container', () => {
      const testId = 'border-radius-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.borderRadius in clip-path
      expect(wrapper).toHaveStyleRule(
        'clip-path',
        `inset(0% 0% 0% 0% round ${magma.borderRadius})`,
        {
          target: '.cds--modal-container',
        }
      );
    });

    it('should apply theme.colors.focus for focus outline', () => {
      const testId = 'focus-color-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.colors.focus to outline
      expect(wrapper).toHaveStyleRule(
        'outline',
        `2px solid ${magma.colors.focus}!important`,
        {
          target: '.chart-holder *:focus',
        }
      );
    });

    it('should apply theme.colors.focusInverse for focus outline when isInverse is true', () => {
      const testId = 'focus-inverse-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
            isInverse
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.colors.focusInverse to outline when inverse
      expect(wrapper).toHaveStyleRule(
        'outline',
        `2px solid ${magma.colors.focusInverse}!important`,
        {
          target: '.chart-holder *:focus',
        }
      );
    });

    it('should apply theme.spaceScale.spacing05 to legend checkbox dimensions', () => {
      const testId = 'spacing-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.spaceScale.spacing05 to checkbox width
      expect(wrapper).toHaveStyleRule('width', magma.spaceScale.spacing05, {
        target: 'div.cds--cc--legend div.legend-item div.checkbox',
      });

      // And height
      expect(wrapper).toHaveStyleRule('height', magma.spaceScale.spacing05, {
        target: 'div.cds--cc--legend div.legend-item div.checkbox',
      });
    });

    it('should apply theme.colors.neutral900 to legend checkbox background when isInverse', () => {
      const testId = 'legend-bg-inverse-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
            isInverse
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.colors.neutral900 to checkbox background when inverse
      expect(wrapper).toHaveStyleRule('background', magma.colors.neutral900, {
        target: 'div.cds--cc--legend div.legend-item div.checkbox',
      });
    });

    it('should apply theme.colors.neutral100 to legend checkbox background in normal mode', () => {
      const testId = 'legend-bg-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
            isInverse={false}
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.colors.neutral100 to checkbox background
      expect(wrapper).toHaveStyleRule('background', magma.colors.neutral100, {
        target: 'div.cds--cc--legend div.legend-item div.checkbox',
      });
    });

    it('should apply theme.colors.neutral100 to modal header background in normal mode', () => {
      const testId = 'modal-header-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
            isInverse={false}
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.colors.neutral100 to modal header background
      expect(wrapper).toHaveStyleRule('background', magma.colors.neutral100, {
        target: '.chart-holder .cds--modal-header',
      });
    });

    it('should apply theme.colors.primary600 to modal header background when isInverse', () => {
      const testId = 'modal-header-inverse-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
            isInverse
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.colors.primary600 to modal header when inverse
      expect(wrapper).toHaveStyleRule('background', magma.colors.primary600, {
        target: '.chart-holder .cds--modal-header',
      });
    });

    it('should apply font-weight 600 to modal header heading', () => {
      const testId = 'modal-heading-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies font-weight to modal header heading
      expect(wrapper).toHaveStyleRule('font-weight', '600', {
        target: '.chart-holder .cds--modal-header__heading',
      });
    });

    it('should apply theme.colors.neutral100 to modal footer background in normal mode', () => {
      const testId = 'modal-footer-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
            isInverse={false}
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.colors.neutral100 to modal footer background
      expect(wrapper).toHaveStyleRule(
        'background',
        `${magma.colors.neutral100}!important`,
        {
          target: '.cds--modal-footer.cds--modal-footer',
        }
      );
    });

    it('should apply theme.colors.primary600 to modal footer background when isInverse', () => {
      const testId = 'modal-footer-inverse-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
            isInverse
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.colors.primary600 to modal footer when inverse
      expect(wrapper).toHaveStyleRule(
        'background',
        `${magma.colors.primary600}!important`,
        {
          target: '.cds--modal-footer.cds--modal-footer',
        }
      );
    });

    it('should apply theme.colors.neutral300 border to modal header in normal mode', () => {
      const testId = 'modal-header-border-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
            isInverse={false}
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.colors.neutral300 border to modal header
      expect(wrapper).toHaveStyleRule(
        'border-bottom',
        `1px solid ${magma.colors.neutral300}`,
        {
          target: '.chart-holder .cds--modal-header',
        }
      );
    });

    it('should apply theme.colors.neutral300 border to modal footer in normal mode', () => {
      const testId = 'modal-footer-border-test';
      const { getByTestId } = render(
        <ThemeContext.Provider value={magma}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
            isInverse={false}
          />
        </ThemeContext.Provider>
      );

      const wrapper = getByTestId(testId);

      // CarbonChartWrapper applies theme.colors.neutral300 border to modal footer
      expect(wrapper).toHaveStyleRule(
        'border-top',
        `1px solid ${magma.colors.neutral300}`,
        {
          target: '.cds--modal-footer.cds--modal-footer',
        }
      );
    });
  });
});
