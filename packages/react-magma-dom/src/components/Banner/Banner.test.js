import React from 'react';

import { render } from '@testing-library/react';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { Badge } from '../Badge';

import { Banner } from '.';
import userEvent from '@testing-library/user-event';

describe('Banner', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Banner testId={testId}>Test</Banner>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  describe('variants', () => {
    const testId = 'test-id';

    it('should render with correct variant styles for warning', () => {
      const { getByTestId, getByLabelText } = render(
        <Banner isDismissible testId={testId} variant="warning">
          Test
        </Banner>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        magma.colors.warning100
      );

      const closeBtn = getByLabelText('Close this message');
      expect(closeBtn).toHaveStyleRule('color', magma.colors.warning500);
      expect(closeBtn).toHaveStyleRule(
        'outline',
        `2px solid ${magma.colors.focus}`,
        {
          target: ':focus',
        }
      );
    });

    it('should render with correct variant styles for success', () => {
      const { getByTestId, getByLabelText } = render(
        <Banner isDismissible testId={testId} variant="success">
          Test
        </Banner>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        magma.colors.success100
      );

      const closeBtn = getByLabelText('Close this message');
      expect(closeBtn).toHaveStyleRule('color', magma.colors.success500);
      expect(closeBtn).toHaveStyleRule(
        'outline',
        `2px solid ${magma.colors.focus}`,
        {
          target: ':focus',
        }
      );
    });

    it('should render with correct variant styles for info', () => {
      const { getByTestId, getByLabelText } = render(
        <Banner isDismissible testId={testId}>
          Test
        </Banner>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        magma.colors.info100
      );

      const closeBtn = getByLabelText('Close this message');
      expect(closeBtn).toHaveStyleRule('color', magma.colors.info500);
      expect(closeBtn).toHaveStyleRule(
        'outline',
        `2px solid ${magma.colors.focus}`,
        {
          target: ':focus',
        }
      );
    });

    it('should render with correct variant styles for danger', () => {
      const { getByTestId, getByLabelText } = render(
        <Banner isDismissible testId={testId} variant="danger">
          Test
        </Banner>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        magma.colors.danger100
      );

      const closeBtn = getByLabelText('Close this message');
      expect(closeBtn).toHaveStyleRule('color', magma.colors.danger500);
      expect(closeBtn).toHaveStyleRule(
        'outline',
        `2px solid ${magma.colors.focus}`,
        {
          target: ':focus',
        }
      );
    });

    describe('isInverse', () => {
      it('should render with correct variant styles for inverse warning', () => {
        const { getByTestId, getByLabelText } = render(
          <Banner isDismissible testId={testId} variant="warning" isInverse>
            Test
          </Banner>
        );

        expect(getByTestId(testId)).toHaveStyleRule(
          'background',
          magma.colors.warning700
        );

        const closeBtn = getByLabelText('Close this message');
        expect(closeBtn).toHaveStyleRule('color', magma.colors.neutral100);
        expect(closeBtn).toHaveStyleRule(
          'outline',
          `2px solid ${magma.colors.focusInverse}`,
          {
            target: ':focus',
          }
        );
      });

      it('should render with correct variant styles for inverse success', () => {
        const { getByTestId, getByLabelText } = render(
          <Banner isDismissible testId={testId} variant="success" isInverse>
            Test
          </Banner>
        );

        expect(getByTestId(testId)).toHaveStyleRule(
          'background',
          magma.colors.success700
        );

        const closeBtn = getByLabelText('Close this message');
        expect(closeBtn).toHaveStyleRule('color', magma.colors.neutral100);
        expect(closeBtn).toHaveStyleRule(
          'outline',
          `2px solid ${magma.colors.focusInverse}`,
          {
            target: ':focus',
          }
        );
      });

      it('should render with correct variant styles for inverse info', () => {
        const { getByTestId, getByLabelText } = render(
          <Banner isDismissible testId={testId} isInverse>
            Test
          </Banner>
        );

        expect(getByTestId(testId)).toHaveStyleRule(
          'background',
          magma.colors.info700
        );

        const closeBtn = getByLabelText('Close this message');
        expect(closeBtn).toHaveStyleRule('color', magma.colors.neutral100);
        expect(closeBtn).toHaveStyleRule(
          'outline',
          `2px solid ${magma.colors.focusInverse}`,
          {
            target: ':focus',
          }
        );
      });

      it('should render with correct variant styles for inverse danger', () => {
        const { getByTestId, getByLabelText } = render(
          <Banner isDismissible testId={testId} variant="danger" isInverse>
            Test
          </Banner>
        );

        expect(getByTestId(testId)).toHaveStyleRule(
          'background',
          magma.colors.danger700
        );

        const closeBtn = getByLabelText('Close this message');
        expect(closeBtn).toHaveStyleRule('color', magma.colors.neutral100);
        expect(closeBtn).toHaveStyleRule(
          'outline',
          `2px solid ${magma.colors.focusInverse}`,
          {
            target: ':focus',
          }
        );
      });
    });
  });

  describe('close button', () => {
    it('should render a close button when isDismissible is true', () => {
      const { getByLabelText } = render(<Banner isDismissible>Text</Banner>);

      expect(getByLabelText('Close this message')).toBeInTheDocument();
    });

    it('should render a close button with custom aria label', () => {
      const { getByLabelText } = render(
        <Banner isDismissible closeAriaLabel="Test">
          Text
        </Banner>
      );

      const dismissibleIconButton = getByLabelText('Test');
      expect(dismissibleIconButton).toBeInTheDocument();
    });
  });

  describe('action button', () => {
    it('should render an action button with an action that fires when clicked', async () => {
      const actionBtnClick = jest.fn();

      const { getByText } = render(
        <Banner
          actionButtonText="btn text"
          actionButtonOnClick={actionBtnClick}
        >
          Test
        </Banner>
      );

      const btn = getByText('btn text').parentElement;

      expect(btn).toHaveStyleRule('color', magma.colors.neutral100);
      expect(btn).toHaveStyleRule('background', magma.colors.primary500);

      await userEvent.click(btn);
      expect(actionBtnClick).toHaveBeenCalled();
    });

    it('should render an action button with danger styles', () => {
      const { getByText } = render(
        <Banner
          actionButtonText="btn text"
          actionButtonOnClick={() => {}}
          variant="danger"
        >
          Test
        </Banner>
      );
      expect(getByText('btn text').parentElement).toHaveStyleRule(
        'color',
        magma.colors.neutral100
      );
    });

    it('should render an action button with primary styles', () => {
      const { getByText } = render(
        <Banner
          actionButtonText="btn text"
          actionButtonOnClick={() => {}}
          variant="warning"
        >
          Test
        </Banner>
      );

      const btn = getByText('btn text').parentElement;

      expect(btn).toHaveStyleRule('color', magma.colors.neutral100);
      expect(btn).toHaveStyleRule('background', magma.colors.primary500);
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Banner>Test</Banner>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('should render right aligned children passed in by the additionalContent prop', () => {
    const { getByText } = render(
      <Banner additionalContent={<Badge>Test Component</Badge>}>
        Alert with additional right aligned children
      </Banner>
    );

    expect(getByText('Test Component')).toBeInTheDocument();
  });
});
