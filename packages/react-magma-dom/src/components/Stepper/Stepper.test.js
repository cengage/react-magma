import React from 'react';
import { act } from 'react-dom/test-utils';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { Stepper, Step, BreakPointStyle } from '.';
import { fireEvent, render } from '@testing-library/react';
import { transparentize } from 'polished';

const TEXT = 'Test Text';
const testId = 'test-id';

describe('Stepper', () => {
  it('should find element by testId', () => {
    const { getByTestId } = render(<Stepper testId={testId}>{TEXT}</Stepper>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Stepper>{TEXT}</Stepper>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  describe('Styling', () => {
    it('should have an active styled circle', () => {
      const { getByTestId } = render(
        <Stepper currentStep={0}>
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
        <Stepper currentStep={0}>
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
        <Stepper currentStep={1}>
          <Step testId={testId} />
          <Step />
        </Stepper>
      );

      const step = getByTestId(testId).querySelector('span');

      expect(step).toHaveStyleRule('background', magma.colors.primary500);
    });

    it('should have a error styled circle', () => {
      const { getByTestId } = render(
        <Stepper currentStep={1}>
          <Step hasError testId={testId} />
          <Step />
        </Stepper>
      );

      const step = getByTestId(testId).querySelector('span');

      expect(step).toHaveStyleRule('background', magma.colors.danger500);
    });

    it('should have a primary label', () => {
      const { getByText } = render(
        <Stepper currentStep={1}>
          <Step label={TEXT} hasError testId={testId} />
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
        <Stepper currentStep={1}>
          <Step secondaryLabel={TEXT} hasError testId={testId} />
          <Step />
        </Stepper>
      );

      const secondaryLabel = getByText(TEXT);

      expect(secondaryLabel).toHaveStyleRule('font-size', '12px');
      expect(secondaryLabel).toHaveStyleRule('color', magma.colors.neutral500);
    });

    it('should have an incomplete styled separator', () => {
      const { getByTestId } = render(
        <Stepper currentStep={0}>
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
        <Stepper currentStep={1}>
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
          <Stepper isInverse currentStep={0}>
            <Step testId={testId} />
            <Step />
          </Stepper>
        );

        const step = getByTestId(testId).querySelector('span');

        expect(step).toHaveStyleRule(
          'box-shadow',
          `inset 0 0 0 2px ${magma.colors.tertiary500}`
        );
      });

      it('should have an inverse incomplete styled circle', () => {
        const { getByTestId } = render(
          <Stepper isInverse currentStep={0}>
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

      it('should have a inverse completed styled circle', () => {
        const { getByTestId } = render(
          <Stepper isInverse currentStep={1}>
            <Step testId={testId} />
            <Step />
          </Stepper>
        );

        const step = getByTestId(testId).querySelector('span');

        expect(step).toHaveStyleRule('background', magma.colors.tertiary500);
      });

      it('should have a inverse error styled circle', () => {
        const { getByTestId } = render(
          <Stepper isInverse currentStep={1}>
            <Step hasError testId={testId} />
            <Step />
          </Stepper>
        );

        const step = getByTestId(testId).querySelector('span');

        expect(step).toHaveStyleRule('background', magma.colors.danger500);
      });

      it('should have a inverse primary label', () => {
        const { getByText } = render(
          <Stepper isInverse currentStep={1}>
            <Step label={TEXT} hasError testId={testId} />
            <Step />
          </Stepper>
        );

        const label = getByText(TEXT);

        expect(label).toHaveStyleRule('color', magma.colors.neutral100);
      });

      it('should have a inverse secondary label', () => {
        const { getByText } = render(
          <Stepper isInverse currentStep={1}>
            <Step secondaryLabel={TEXT} hasError testId={testId} />
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
          <Stepper isInverse currentStep={0}>
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

      it('should have a inverse completed styled separator', () => {
        const { getByTestId } = render(
          <Stepper isInverse currentStep={1}>
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
      it('should hide labels with prop hideLabels', () => {
        const { getByText } = render(
          <Stepper hideLabels currentStep={1}>
            <Step label={`${TEXT}-1`} />
            <Step label={`${TEXT}-2`} />
          </Stepper>
        );

        const label1 = getByText(`${TEXT}-1`);
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

      it('should only show one step label and description at a time along with a counter when using the prop summaryView', () => {
        const { getByTestId } = render(
          <Stepper testId={testId} summaryView currentStep={0}>
            <Step label={`${TEXT}-1`} />
            <Step label={`${TEXT}-2`} />
          </Stepper>
        );

        expect(getByTestId(`stepper summary`)).toBeVisible();
        expect(getByTestId(testId)).toHaveTextContent('Step 1 of 2');
      });

      it('should hide labels when breakpointStyle is set to "hideLabels" if viewport is smaller than set breakpoint prop', () => {
        const { getByText } = render(
          <Stepper
            breakpoint={1500}
            breakpointStyle={BreakPointStyle.hideLabels}
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

        expect(label1).toHaveStyleRule('height', '1px');
        expect(label1).toHaveStyleRule('position', 'absolute');
        expect(label1).toHaveStyleRule('overflow', 'hidden');
        expect(label1).toHaveStyleRule('top', 'auto');
        expect(label1).toHaveStyleRule('white-space', 'nowrap');
        expect(label1).toHaveStyleRule('width', '1px');
      });

      it('should show summaryView when breakpointStyle is set to "summaryView" if viewport is smaller than set breakpoint prop', () => {
        const { getByTestId } = render(
          <Stepper
            testId={testId}
            breakpoint={1500}
            breakpointStyle={BreakPointStyle.summaryView}
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
        expect(getByTestId(`stepper summary`)).toBeVisible();
        expect(getByTestId(testId)).toHaveTextContent('Step 1 of 2');
      });
    });
  });
});
