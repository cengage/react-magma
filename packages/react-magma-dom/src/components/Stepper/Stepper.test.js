import React from 'react';
import { act } from 'react-dom/test-utils';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { Stepper, Step, StepperLayout } from '.';
import { render } from '@testing-library/react';
import { transparentize } from 'polished';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';

const TEXT = 'Test Text';
const testId = 'test-id';

describe('Stepper', () => {
  it('should find element by testId', () => {
    const { getByTestId } = render(
      <Stepper ariaLabel="progress" testId={testId}>
        <Step testId="step" label="step" />
      </Stepper>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    it('Does not violate accessibility standards', () => {
      const { container } = render(
        <Stepper ariaLabel="progress">
          <Step testId="step1" label="step1" />
          <Step testId="step2" label="step2" />
        </Stepper>
      );

      return axe(container.innerHTML).then(result => {
        return expect(result).toHaveNoViolations();
      });
    });

    it('should use the custom aria-label', () => {
      const { getByLabelText } = render(
        <Stepper ariaLabel="custom" testId={testId} currentStep={0}>
          <Step />
          <Step />
        </Stepper>
      );

      const customAriaLabel = getByLabelText('custom', { selector: 'ol' });

      expect(customAriaLabel).toBeInTheDocument();
    });

    it('should have hidden labels for screen readers when layout is set to "showLabels"', () => {
      const { getByTestId } = render(
        <Stepper
          ariaLabel="progress"
          layout={StepperLayout.showLabels}
          currentStep={1}
        >
          <Step testId={`${testId}-1`} label={`${TEXT}-1`} />
          <Step testId={`${testId}-2`} label={`${TEXT}-2`} />
        </Stepper>
      );

      expect(getByTestId(`${testId}-1`)).toHaveTextContent(
        `Step completed, ${TEXT}-1`
      );
      expect(getByTestId(`${testId}-1`).closest('li')).toHaveAttribute(
        'aria-current',
        'false'
      );
      expect(getByTestId(`${testId}-2`)).toHaveTextContent(`${TEXT}-2`);
      expect(getByTestId(`${testId}-2`).closest('li')).toHaveAttribute(
        'aria-current',
        'step'
      );
    });

    it('should have hidden labels for screen readers when layout is set to "hideLabels"', () => {
      const { getByTestId } = render(
        <Stepper
          ariaLabel="progress"
          layout={StepperLayout.hideLabels}
          currentStep={1}
        >
          <Step testId={`${testId}-1`} label={`${TEXT}-1`} />
          <Step testId={`${testId}-2`} label={`${TEXT}-2`} />
        </Stepper>
      );

      expect(getByTestId(`${testId}-1`)).toHaveTextContent(
        `Step completed, ${TEXT}-1`
      );
      expect(getByTestId(`${testId}-1`).closest('li')).toHaveAttribute(
        'aria-current',
        'false'
      );
      expect(getByTestId(`${testId}-2`)).toHaveTextContent(`${TEXT}-2`);
      expect(getByTestId(`${testId}-2`).closest('li')).toHaveAttribute(
        'aria-current',
        'step'
      );
    });
  });

  it('should use the default completion label', () => {
    const { getByText } = render(
      <Stepper
        ariaLabel="progress"
        currentStep={2}
        layout={StepperLayout.summaryView}
      >
        <Step />
        <Step />
      </Stepper>
    );

    expect(getByText('All steps completed')).toBeInTheDocument();
  });

  it('should use the default step label', () => {
    const { getByText } = render(
      <Stepper
        ariaLabel="progress"
        currentStep={0}
        layout={StepperLayout.summaryView}
      >
        <Step />
        <Step />
      </Stepper>
    );

    expect(getByText('Step 1 of 2')).toBeInTheDocument();
  });

  it('should use the custom completion label', () => {
    const { getByText } = render(
      <Stepper
        ariaLabel="progress"
        completionLabel="You're victorious"
        currentStep={2}
        layout={StepperLayout.summaryView}
      >
        <Step />
        <Step />
      </Stepper>
    );

    expect(getByText("You're victorious")).toBeInTheDocument();
  });

  it('should use the custom step label', () => {
    const { getByText } = render(
      <Stepper
        ariaLabel="progress"
        stepLabel="Party On"
        currentStep={0}
        layout={StepperLayout.summaryView}
      >
        <Step />
        <Step />
      </Stepper>
    );

    expect(getByText('Party On 1 of 2')).toBeInTheDocument();
  });

  describe('i18n', () => {
    it('should use the completion label', () => {
      const completionLabel = 'completion label';
      const { getByText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            stepper: {
              completionLabel,
            },
          }}
        >
          <Stepper
            ariaLabel="progress"
            currentStep={2}
            layout={StepperLayout.summaryView}
          >
            <Step />
            <Step />
          </Stepper>
        </I18nContext.Provider>
      );

      expect(getByText(completionLabel)).toHaveTextContent(completionLabel);
    });

    it('should use the step label', () => {
      const stepLabel = 'Steppin';
      const stepOfLabel = 'of';
      const { getByText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            stepper: {
              stepLabel,
              stepOfLabel,
            },
          }}
        >
          <Stepper
            ariaLabel="progress"
            currentStep={0}
            layout={StepperLayout.summaryView}
          >
            <Step />
            <Step />
          </Stepper>
        </I18nContext.Provider>
      );

      expect(getByText(stepLabel + ' 1 of 2')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should have an active styled circle', () => {
      const { getByTestId } = render(
        <Stepper ariaLabel="progress" currentStep={0}>
          <Step testId={testId} />
          <Step />
        </Stepper>
      );

      const step = getByTestId(testId).querySelector('span');

      expect(step).toHaveStyleRule(
        'box-shadow',
        `inset 0 0 0 2px ${magma.colors.primary500}`
      );
    });

    it('should have an incomplete styled circle', () => {
      const { getByTestId } = render(
        <Stepper ariaLabel="progress" currentStep={0}>
          <Step />
          <Step testId={testId} />
        </Stepper>
      );

      const step = getByTestId(testId).querySelector('span');

      expect(step).toHaveStyleRule(
        'box-shadow',
        `inset 0 0 0 2px ${magma.colors.neutral300}`
      );
    });

    it('should have a completed styled circle', () => {
      const { getByTestId } = render(
        <Stepper ariaLabel="progress" currentStep={1}>
          <Step testId={testId} />
          <Step />
        </Stepper>
      );

      const step = getByTestId(testId).querySelector('span');

      expect(step).toHaveStyleRule('background', magma.colors.primary500);
    });

    it('should have a error styled circle', () => {
      const { getByTestId } = render(
        <Stepper ariaLabel="progress" currentStep={1}>
          <Step testId={testId} hasError />
          <Step />
        </Stepper>
      );

      const step = getByTestId(testId).querySelector('span');

      expect(step).toHaveStyleRule('background', magma.colors.danger500);
    });

    it('should have a primary label', () => {
      const { getByText } = render(
        <Stepper ariaLabel="progress" currentStep={1}>
          <Step label={TEXT} />
          <Step />
        </Stepper>
      );

      const label = getByText(TEXT);

      expect(label).toHaveStyleRule('font-size', '14px');
      expect(label).toHaveStyleRule('color', magma.colors.neutral700);
      expect(label).toHaveStyleRule('font-weight', '600');
    });

    it('should have a secondary label', () => {
      const { getByText } = render(
        <Stepper ariaLabel="progress" currentStep={1}>
          <Step secondaryLabel={TEXT} hasError />
          <Step />
        </Stepper>
      );

      const secondaryLabel = getByText(TEXT);

      expect(secondaryLabel).toHaveStyleRule('font-size', '12px');
      expect(secondaryLabel).toHaveStyleRule('color', magma.colors.neutral500);
    });

    it('should have an incomplete styled separator', () => {
      const { getByTestId } = render(
        <Stepper ariaLabel="progress" currentStep={0}>
          <Step testId={testId} />
          <Step />
        </Stepper>
      );

      const separator = getByTestId(testId).nextElementSibling;

      expect(separator).toHaveStyleRule('height', '2px');
      expect(separator).toHaveStyleRule('background', magma.colors.neutral300);
    });

    it('should have a completed styled separator', () => {
      const { getByTestId } = render(
        <Stepper ariaLabel="progress" currentStep={1}>
          <Step testId={testId} />
          <Step />
        </Stepper>
      );

      const separator = getByTestId(testId).nextElementSibling;

      expect(separator).toHaveStyleRule('height', '2px');
      expect(separator).toHaveStyleRule('background', magma.colors.primary500);
    });

    describe('Inverse', () => {
      it('should have an inverse active styled circle', () => {
        const { getByTestId } = render(
          <Stepper
            ariaLabel="progress"
            testId={testId}
            isInverse
            currentStep={0}
          >
            <Step />
            <Step />
          </Stepper>
        );

        const step = getByTestId(testId).querySelector('span');

        expect(step.firstChild).toHaveStyleRule(
          'box-shadow',
          `inset 0 0 0 2px ${magma.colors.tertiary500}`
        );
      });

      it('should have an inverse incomplete styled circle', () => {
        const { getByTestId } = render(
          <Stepper ariaLabel="progress" isInverse currentStep={0}>
            <Step />
            <Step testId={testId} />
          </Stepper>
        );

        const step = getByTestId(testId).querySelector('span');

        expect(step).toHaveStyleRule(
          'box-shadow',
          `inset 0 0 0 2px ${magma.colors.primary400}`
        );
      });

      it('should have an inverse completed styled circle', () => {
        const { getByTestId } = render(
          <Stepper ariaLabel="progress" isInverse currentStep={1}>
            <Step testId={testId} />
            <Step />
          </Stepper>
        );

        const step = getByTestId(testId).querySelector('span');

        expect(step).toHaveStyleRule('background', magma.colors.tertiary500);
      });

      it('should have an inverse error styled circle', () => {
        const { getByTestId } = render(
          <Stepper ariaLabel="progress" isInverse currentStep={1}>
            <Step testId={testId} hasError />
            <Step />
          </Stepper>
        );

        const step = getByTestId(testId).querySelector('span');

        expect(step).toHaveStyleRule('background', magma.colors.danger500);
      });

      it('should have an inverse primary label', () => {
        const { getByText } = render(
          <Stepper ariaLabel="progress" isInverse currentStep={1}>
            <Step label={TEXT} hasError />
            <Step />
          </Stepper>
        );

        const label = getByText(TEXT);

        expect(label).toHaveStyleRule('color', magma.colors.neutral100);
      });

      it('should have an inverse secondary label', () => {
        const { getByText } = render(
          <Stepper ariaLabel="progress" isInverse currentStep={1}>
            <Step secondaryLabel={TEXT} hasError />
            <Step />
          </Stepper>
        );

        const secondaryLabel = getByText(TEXT);

        expect(secondaryLabel).toHaveStyleRule(
          'color',
          transparentize(0.3, magma.colors.neutral100)
        );
      });

      it('should have an inverse incomplete styled separator', () => {
        const { getByTestId } = render(
          <Stepper ariaLabel="progress" isInverse currentStep={0}>
            <Step testId={testId} />
            <Step />
          </Stepper>
        );

        const separator = getByTestId(testId).nextElementSibling;

        expect(separator).toHaveStyleRule(
          'background',
          magma.colors.primary400
        );
      });

      it('should have an inverse completed styled separator', () => {
        const { getByTestId } = render(
          <Stepper ariaLabel="progress" isInverse currentStep={1}>
            <Step testId={testId} />
            <Step />
          </Stepper>
        );

        const separator = getByTestId(testId).nextElementSibling;

        expect(separator).toHaveStyleRule(
          'background',
          magma.colors.tertiary500
        );
      });
    });

    describe('States', () => {
      it('should hide labels when layout is set to "hideLabels"', () => {
        const { getByText } = render(
          <Stepper
            ariaLabel="progress"
            layout={StepperLayout.hideLabels}
            currentStep={1}
          >
            <Step label={`${TEXT}-1`} />
            <Step label={`${TEXT}-2`} />
          </Stepper>
        );

        const label1 = getByText(`Step completed, ${TEXT}-1`);
        const label2 = getByText(`${TEXT}-2`);

        expect(label1).toHaveStyleRule('height', '1px');
        expect(label1).toHaveStyleRule('position', 'absolute');
        expect(label1).toHaveStyleRule('overflow', 'hidden');
        expect(label1).toHaveStyleRule('top', 'auto');
        expect(label1).toHaveStyleRule('white-space', 'nowrap');
        expect(label1).toHaveStyleRule('width', '1px');

        expect(label2).toHaveStyleRule('height', '1px');
        expect(label2).toHaveStyleRule('position', 'absolute');
        expect(label2).toHaveStyleRule('overflow', 'hidden');
        expect(label2).toHaveStyleRule('top', 'auto');
        expect(label2).toHaveStyleRule('white-space', 'nowrap');
        expect(label2).toHaveStyleRule('width', '1px');
      });

      it('should only show one step label and description at a time along with a counter when layout is set to summaryView', () => {
        const { getByTestId } = render(
          <Stepper
            ariaLabel="progress"
            testId={testId}
            layout={StepperLayout.summaryView}
            currentStep={0}
          >
            <Step label={`${TEXT}-1`} />
            <Step label={`${TEXT}-2`} />
          </Stepper>
        );

        expect(getByTestId(`${testId}-stepper-summary`)).toBeVisible();
        expect(getByTestId(testId)).toHaveTextContent('Step 1 of 2');
      });

      it('should show labels when layout is set to "showLabels"', () => {
        const { getByText } = render(
          <Stepper
            ariaLabel="progress"
            layout={StepperLayout.showLabels}
            currentStep={0}
          >
            <Step label={`${TEXT}-1`} />
            <Step label={`${TEXT}-2`} />
          </Stepper>
        );
        const label1 = getByText(`${TEXT}-1`);

        expect(label1).toHaveStyleRule('color', magma.colors.neutral700);
        expect(label1).toHaveStyleRule(
          'font-size',
          magma.typographyVisualStyles.bodySmall.desktop.fontSize
        );
        expect(label1).toHaveStyleRule(
          'line-height',
          magma.typographyVisualStyles.bodySmall.desktop.lineHeight
        );
      });

      it('should hide labels when breakpointLayout is set to "hideLabels" if viewport is smaller than set breakpoint prop', () => {
        const { getByText } = render(
          <Stepper
            ariaLabel="progress"
            breakpoint={1500}
            breakpointLayout={StepperLayout.hideLabels}
            currentStep={1}
          >
            <Step label={`${TEXT}-1`} />
            <Step label={`${TEXT}-2`} />
          </Stepper>
        );
        act(() => {
          global.innerWidth = 1400;
          global.dispatchEvent(new Event('resize'));
        });
        const label1 = getByText(`Step completed,`);

        expect(label1).toHaveStyleRule('height', '1px');
        expect(label1).toHaveStyleRule('position', 'absolute');
        expect(label1).toHaveStyleRule('overflow', 'hidden');
        expect(label1).toHaveStyleRule('top', 'auto');
        expect(label1).toHaveStyleRule('white-space', 'nowrap');
        expect(label1).toHaveStyleRule('width', '1px');
      });

      it('should show labels when breakpointLayout is set to "showLabels" if viewport is smaller than set breakpoint prop', () => {
        const { getByText } = render(
          <Stepper
            ariaLabel="progress"
            breakpoint={1500}
            breakpointLayout={StepperLayout.showLabels}
            currentStep={0}
          >
            <Step label={`${TEXT}-1`} />
            <Step label={`${TEXT}-2`} />
          </Stepper>
        );
        act(() => {
          global.innerWidth = 1400;
          global.dispatchEvent(new Event('resize'));
        });
        const label1 = getByText(`${TEXT}-1`);

        expect(label1).toHaveStyleRule('color', magma.colors.neutral700);
        expect(label1).toHaveStyleRule(
          'font-size',
          magma.typographyVisualStyles.bodySmall.desktop.fontSize
        );
        expect(label1).toHaveStyleRule(
          'line-height',
          magma.typographyVisualStyles.bodySmall.desktop.lineHeight
        );
      });

      it('should show summaryView when breakpointStyle is set to "summaryView" if viewport is smaller than set breakpoint prop', () => {
        const { getByTestId } = render(
          <Stepper
            ariaLabel="progress"
            testId={testId}
            breakpoint={1500}
            breakpointLayout={StepperLayout.summaryView}
            currentStep={0}
          >
            <Step label={`${TEXT}-1`} />
            <Step label={`${TEXT}-2`} />
          </Stepper>
        );
        act(() => {
          global.innerWidth = 1400;
          global.dispatchEvent(new Event('resize'));
        });
        expect(getByTestId(`${testId}-stepper-summary`)).toBeVisible();
        expect(getByTestId(testId)).toHaveTextContent('Step 1 of 2');
      });
    });
  });
});
