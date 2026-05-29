import React from 'react';

import { act, render, screen, fireEvent } from '@testing-library/react';
import {
  ThemeContext,
  magma,
  DropdownMenuItem,
  I18nContext,
  defaultI18n,
} from 'react-magma-dom';

import { CarbonChart, CarbonChartType } from '.';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Capture MutationObserver callbacks so we can trigger them manually
let mutationObserverCallback;
global.MutationObserver = jest.fn().mockImplementation(callback => {
  mutationObserverCallback = callback;
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };
});

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

  describe('Modal Focus Management', () => {
    let wrapper;
    let modal;
    let closeButton;
    let otherButton;

    beforeEach(() => {
      jest.useFakeTimers();
      jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
        cb(0);
        return 0;
      });
      const testId = 'focus-mgmt-test';
      const { getByTestId } = render(
        <CarbonChart
          testId={testId}
          dataSet={dataSet}
          options={chartOptions}
          type={CarbonChartType.bar}
        />
      );

      wrapper = getByTestId(testId);

      // Manually create Carbon modal DOM inside the wrapper
      modal = document.createElement('div');
      modal.className = 'cds--modal';

      closeButton = document.createElement('button');
      closeButton.className = 'cds--modal-close';
      closeButton.textContent = 'Close';

      otherButton = document.createElement('button');
      otherButton.textContent = 'Copy';

      modal.appendChild(closeButton);
      modal.appendChild(otherButton);
      wrapper.appendChild(modal);
    });

    afterEach(() => {
      window.requestAnimationFrame.mockRestore();
      jest.useRealTimers();
    });

    // Simulate Carbon's handleShowModal: sets aria-modal, role, style
    function simulateModalOpen() {
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('role', 'dialog');
      modal.style.visibility = 'visible';
      modal.style.opacity = '1';
      act(() => {
        mutationObserverCallback([
          { type: 'attributes', attributeName: 'aria-modal', target: modal },
          { type: 'attributes', attributeName: 'style', target: modal },
        ]);
      });
      jest.runAllTimers();
      act(() => {
        jest.advanceTimersByTime(0);
      });
    }

    // Simulate Carbon's handleHideModal: removes aria-modal, role, sets hidden
    function simulateModalClose() {
      modal.removeAttribute('aria-modal');
      modal.removeAttribute('role');
      modal.style.visibility = 'hidden';
      modal.style.opacity = '0';
      act(() => {
        mutationObserverCallback([
          { type: 'attributes', attributeName: 'aria-modal', target: modal },
          { type: 'attributes', attributeName: 'style', target: modal },
        ]);
      });
    }

    it('should move focus to the close button when modal opens', () => {
      const triggerButton = document.createElement('button');
      triggerButton.textContent = 'Show as table';
      wrapper.appendChild(triggerButton);
      triggerButton.focus();

      simulateModalOpen();

      expect(document.activeElement).toBe(closeButton);
    });

    it('should restore focus to the previously focused element when modal closes', () => {
      const triggerButton = document.createElement('button');
      triggerButton.textContent = 'Show as table';
      wrapper.appendChild(triggerButton);
      triggerButton.focus();

      simulateModalOpen();
      simulateModalClose();

      expect(document.activeElement).toBe(triggerButton);
    });

    it('should move focus into modal on second open after close', () => {
      const triggerButton = document.createElement('button');
      triggerButton.textContent = 'Show as table';
      wrapper.appendChild(triggerButton);
      triggerButton.focus();

      // First open/close cycle
      simulateModalOpen();
      simulateModalClose();
      expect(document.activeElement).toBe(triggerButton);

      // Second open - focus should move into modal again
      simulateModalOpen();
      expect(document.activeElement).toBe(closeButton);
    });

    it('should trap focus with Tab wrapping from last to first element', () => {
      simulateModalOpen();

      otherButton.focus();
      expect(document.activeElement).toBe(otherButton);

      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
      });
      Object.defineProperty(tabEvent, 'shiftKey', { value: false });
      document.dispatchEvent(tabEvent);

      expect(document.activeElement).toBe(closeButton);
    });

    it('should trap focus with Shift+Tab wrapping from first to last element', () => {
      simulateModalOpen();

      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);

      const shiftTabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
      });
      document.dispatchEvent(shiftTabEvent);

      expect(document.activeElement).toBe(otherButton);
    });

    it('should redirect focus back to modal when focus escapes to an outside element', () => {
      simulateModalOpen();
      expect(document.activeElement).toBe(closeButton);

      // Simulate overflow menu stealing focus (what Carbon does on second open)
      const outsideButton = document.createElement('button');
      outsideButton.className = 'cds--overflow-menu__trigger';
      wrapper.appendChild(outsideButton);
      outsideButton.focus();

      // The redirect is deferred via setTimeout(0) to avoid re-entrancy issues
      jest.runAllTimers();

      expect(document.activeElement).toBe(closeButton);
    });
  });

  describe('chartToolbar prop', () => {
    const toolbarProps = {
      dataSet,
      options: chartOptions,
      type: CarbonChartType.bar,
      chartToolbar: {},
    };

    it('should render the show-as-table button with aria-haspopup="dialog"', () => {
      render(<CarbonChart {...toolbarProps} />);

      const button = screen.getByRole('button', {
        name: chartOptions.title,
      });
      expect(button).toHaveAttribute('aria-haspopup', 'dialog');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('should render the fullscreen button without aria-haspopup', () => {
      render(<CarbonChart {...toolbarProps} />);

      const button = screen.getByRole('button', {
        name: `View ${chartOptions.title} full screen`,
      });
      expect(button).not.toHaveAttribute('aria-haspopup');
    });

    it('should open the table modal when show-as-table button is clicked', () => {
      render(<CarbonChart {...toolbarProps} />);

      fireEvent.click(screen.getByRole('button', { name: chartOptions.title }));

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: `Tabular representation ${chartOptions.title}`,
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('columnheader', { name: 'Group' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('columnheader', { name: 'Value' })
      ).toBeInTheDocument();
    });

    it('should render chart data in the table modal', () => {
      render(<CarbonChart {...toolbarProps} />);

      fireEvent.click(screen.getByRole('button', { name: chartOptions.title }));

      expect(screen.getByRole('cell', { name: 'Qty' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '65000' })).toBeInTheDocument();
    });

    it('should set aria-expanded to true when modal is open', () => {
      render(<CarbonChart {...toolbarProps} />);

      const tableButton = screen.getByRole('button', {
        name: chartOptions.title,
      });
      fireEvent.click(tableButton);

      expect(tableButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should not render the table button when showAsTable is false', () => {
      render(
        <CarbonChart {...toolbarProps} chartToolbar={{ showAsTable: false }} />
      );

      expect(
        screen.queryByRole('button', { name: chartOptions.title })
      ).not.toBeInTheDocument();
    });

    it('should not render the fullscreen button when fullscreen is false', () => {
      render(
        <CarbonChart {...toolbarProps} chartToolbar={{ fullscreen: false }} />
      );

      expect(
        screen.queryByRole('button', { name: /full screen/i })
      ).not.toBeInTheDocument();
    });

    it('should render the chart title as h2 by default', () => {
      render(<CarbonChart {...toolbarProps} />);

      expect(
        screen.getByRole('heading', { level: 2, name: chartOptions.title })
      ).toBeInTheDocument();
    });

    it('should render the chart title at the level set by titleLevel', () => {
      render(
        <CarbonChart {...toolbarProps} chartToolbar={{ titleLevel: 3 }} />
      );

      expect(
        screen.getByRole('heading', { level: 3, name: chartOptions.title })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('heading', { level: 2, name: chartOptions.title })
      ).not.toBeInTheDocument();
    });

    it('should always render the more options dropdown with built-in download items', () => {
      render(<CarbonChart {...toolbarProps} />);

      const moreBtn = screen.getByRole('button', { name: 'More options' });
      expect(moreBtn).toBeInTheDocument();

      fireEvent.click(moreBtn);
      expect(screen.getByText('Download as CSV')).toBeVisible();
      expect(screen.getByText('Download as PNG')).toBeVisible();
      expect(screen.getByText('Download as JPG')).toBeVisible();
    });

    it('should render additional moreOptions items below built-in downloads', () => {
      render(
        <CarbonChart
          {...toolbarProps}
          chartToolbar={{
            moreOptions: <DropdownMenuItem>Custom Action</DropdownMenuItem>,
          }}
        />
      );

      const moreBtn = screen.getByRole('button', { name: 'More options' });
      fireEvent.click(moreBtn);
      expect(screen.getByText('Download as CSV')).toBeVisible();
      expect(screen.getByText('Download as PNG')).toBeVisible();
      expect(screen.getByText('Download as JPG')).toBeVisible();
      expect(screen.getByText('Custom Action')).toBeVisible();
    });

    it('should support custom table columns', () => {
      render(
        <CarbonChart
          {...toolbarProps}
          chartToolbar={{
            tableColumns: [
              { header: 'Category', key: 'group' },
              { header: 'Count', key: 'value' },
            ],
          }}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: chartOptions.title }));

      expect(
        screen.getByRole('columnheader', { name: 'Category' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('columnheader', { name: 'Count' })
      ).toBeInTheDocument();
    });
  });

  describe('Legend accessibility wrap', () => {
    const testId = 'legend-a11y';

    it('wraps the Carbon legend in a fieldset with a legend caption derived from the chart title', () => {
      const { getByTestId } = render(
        <CarbonChart
          testId={testId}
          dataSet={dataSet}
          options={chartOptions}
          type={CarbonChartType.bar}
        />
      );
      const wrapper = getByTestId(testId);

      const fieldset = wrapper.querySelector('.cds--cc--legend-fieldset');
      expect(fieldset).not.toBeNull();
      expect(fieldset.tagName).toBe('FIELDSET');
      expect(fieldset.querySelector('.cds--cc--legend')).not.toBeNull();

      const caption = fieldset.querySelector('legend');
      expect(caption).not.toBeNull();
      expect(caption.textContent).toBe(
        `${chartOptions.title}. Checking these checkboxes will update the chart.`
      );
    });

    it('uses ariaLabel for the legend caption when provided', () => {
      const ariaLabel = 'Quarterly sales chart';
      const { getByTestId } = render(
        <CarbonChart
          testId={testId}
          ariaLabel={ariaLabel}
          dataSet={dataSet}
          options={chartOptions}
          type={CarbonChartType.bar}
        />
      );
      const wrapper = getByTestId(testId);

      const caption = wrapper.querySelector(
        '.cds--cc--legend-fieldset > legend'
      );
      expect(caption).not.toBeNull();
      expect(caption.textContent).toBe(
        `${ariaLabel}. Checking these checkboxes will update the chart.`
      );
    });

    it('does not duplicate the fieldset when the mutation observer fires again with no DOM changes', () => {
      const { getByTestId } = render(
        <CarbonChart
          testId={testId}
          dataSet={dataSet}
          options={chartOptions}
          type={CarbonChartType.bar}
        />
      );
      const wrapper = getByTestId(testId);

      const before = wrapper.querySelectorAll('.cds--cc--legend-fieldset');
      expect(before).toHaveLength(1);

      act(() => {
        mutationObserverCallback?.();
        mutationObserverCallback?.();
      });

      const after = wrapper.querySelectorAll('.cds--cc--legend-fieldset');
      expect(after).toHaveLength(1);
      expect(after[0]).toBe(before[0]);
    });

    it('replaces Carbon\'s generic "Data groups" aria-label with semantic list roles on the legend and its items', () => {
      const { getByTestId } = render(
        <CarbonChart
          testId={testId}
          dataSet={dataSet}
          options={chartOptions}
          type={CarbonChartType.bar}
        />
      );
      const wrapper = getByTestId(testId);

      const legend = wrapper.querySelector('.cds--cc--legend');
      expect(legend).not.toBeNull();
      expect(legend.getAttribute('aria-label')).toBeNull();
      expect(legend.getAttribute('role')).toBe('list');

      const items = legend.querySelectorAll('.legend-item');
      expect(items.length).toBeGreaterThan(0);
      items.forEach(item => {
        expect(item.getAttribute('role')).toBe('listitem');
      });
    });

    it('uses translated legend instructions from I18nContext', () => {
      const translatedInstructions =
        'Marquer ces cases mettra à jour le graphique.';
      const i18nValue = {
        ...defaultI18n,
        charts: {
          ...defaultI18n.charts,
          toolbar: { legendInstructions: translatedInstructions },
        },
      };

      const { getByTestId } = render(
        <I18nContext.Provider value={i18nValue}>
          <CarbonChart
            testId={testId}
            dataSet={dataSet}
            options={chartOptions}
            type={CarbonChartType.bar}
          />
        </I18nContext.Provider>
      );
      const wrapper = getByTestId(testId);

      const caption = wrapper.querySelector(
        '.cds--cc--legend-fieldset > legend'
      );
      expect(caption.textContent).toBe(
        `${chartOptions.title}. ${translatedInstructions}`
      );
    });
  });
});
