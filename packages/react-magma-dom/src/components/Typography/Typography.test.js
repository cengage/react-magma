import React from 'react';
import { Typography } from '.';
import { magma } from '../../theme/magma';
import { render } from '@testing-library/react';

describe('Typography', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Typography testId={testId}>test</Typography>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render element with the default html tag and body medium styles', () => {
    const testId = 'test-id';
    const { container, getByTestId } = render(
      <Typography testId={testId}>test</Typography>
    );

    expect(getByTestId(testId)).toHaveStyleRule('font-size', '16px');
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('should render heading XL element with the default html tag and correct styles', () => {
    const testId = 'test-id';
    const { container, getByTestId } = render(
      <Typography variant="headingXLarge" testId={testId}>
        test
      </Typography>
    );

    expect(getByTestId(testId)).toHaveStyleRule('font-size', '28px');
    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  it('should render heading Large element with the default html tag and correct styles', () => {
    const testId = 'test-id';
    const { container, getByTestId } = render(
      <Typography variant="headingLarge" testId={testId}>
        test
      </Typography>
    );

    expect(getByTestId(testId)).toHaveStyleRule('font-size', '24px');
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('should render heading medium element with the default html tag and correct styles', () => {
    const testId = 'test-id';
    const { container, getByTestId } = render(
      <Typography variant="headingMedium" testId={testId}>
        test
      </Typography>
    );

    expect(getByTestId(testId)).toHaveStyleRule('font-size', '20px');
    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  it('should render heading small element with the default html tag and correct styles', () => {
    const testId = 'test-id';
    const { container, getByTestId } = render(
      <Typography variant="headingSmall" testId={testId}>
        test
      </Typography>
    );

    expect(getByTestId(testId)).toHaveStyleRule('font-size', '18px');
    expect(container.querySelector('h4')).toBeInTheDocument();
  });

  it('should render heading xs element with the default html tag and correct styles', () => {
    const testId = 'test-id';
    const { container, getByTestId } = render(
      <Typography variant="headingXSmall" testId={testId}>
        test
      </Typography>
    );

    expect(getByTestId(testId)).toHaveStyleRule('font-size', '18px');
    expect(container.querySelector('h5')).toBeInTheDocument();
  });

  it('should render heading xxs element with the default html tag and correct styles', () => {
    const testId = 'test-id';
    const { container, getByTestId } = render(
      <Typography variant="headingXXSmall" testId={testId}>
        test
      </Typography>
    );

    expect(getByTestId(testId)).toHaveStyleRule('font-size', '12px');
    expect(container.querySelector('h6')).toBeInTheDocument();
  });

  it('should render body large element with the default html tag and correct styles', () => {
    const testId = 'test-id';
    const { container, getByTestId } = render(
      <Typography variant="bodyLarge" testId={testId}>
        test
      </Typography>
    );

    expect(getByTestId(testId)).toHaveStyleRule('font-size', '18px');
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('should render body small element with the default html tag and correct styles', () => {
    const testId = 'test-id';
    const { container, getByTestId } = render(
      <Typography variant="bodySmall" testId={testId}>
        test
      </Typography>
    );

    expect(getByTestId(testId)).toHaveStyleRule('font-size', '14px');
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('should render body xs element with the default html tag and correct styles', () => {
    const testId = 'test-id';
    const { container, getByTestId } = render(
      <Typography variant="bodyXSmall" testId={testId}>
        test
      </Typography>
    );

    expect(getByTestId(testId)).toHaveStyleRule('font-size', '12px');
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  describe('with margins', () => {
    it('should render body medium element with correct margin', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography hasMargins testId={testId}>
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('margin', '0 0 24px');
    });

    it('should render heading XL element with correct margins', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography hasMargins variant="headingXLarge" testId={testId}>
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('margin', '0 0 16px');
    });

    it('should render heading Large element with correct margins', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography hasMargins variant="headingLarge" testId={testId}>
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('margin', '48px 0 16px');
    });

    it('should render heading medium element with correct margins', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography hasMargins variant="headingMedium" testId={testId}>
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('margin', '40px 0 16px');
    });

    it('should render heading small element with correct margins', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography hasMargins variant="headingSmall" testId={testId}>
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('margin', '32px 0 16px');
    });

    it('should render  heading XSmall element with correct margins', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography hasMargins variant="headingXSmall" testId={testId}>
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('margin', '24px 0 12px');
    });

    it('should render heading XXS element with correct margins', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography hasMargins variant="headingXXSmall" testId={testId}>
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('margin', '24px 0 8px');
    });

    it('should render body large element with correct margins', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography hasMargins variant="bodyLarge" testId={testId}>
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('margin', '0 0 24px');
    });

    it('should render body small element with correct margins', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography hasMargins variant="bodySmall" testId={testId}>
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('margin', '0 0 16px');
    });

    it('should render body xs element with correct margins', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography hasMargins variant="bodyXSmall" testId={testId}>
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('margin', '0 0 8px');
    });
  });

  describe('with colors', () => {
    it('should render the correct success styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography color="success" testId={testId}>
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.success01
      );
    });

    it('should render the correct danger styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography color="danger" testId={testId}>
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('color', magma.colors.danger);
    });

    it('should render the correct subdued styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography color="subdued" testId={testId}>
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.neutral03
      );
    });
  });

  describe('inverse', () => {
    it('should render body text with the correct inverse styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography isInverse testId={testId}>
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.neutral08
      );
    });

    it('should render body text with the correct inverse, subdued styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography color="subdued" isInverse testId={testId}>
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.focusInverse
      );
    });

    it('should render headings with the correct inverse styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography isInverse testId={testId} variant="headingLarge">
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.neutral08
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'border-bottom',
        `2px dotted ${magma.colors.focusInverse}`,
        {
          target: ':focus'
        }
      );
    });

    it('should render headings with the the correct inverse, subdued styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography
          color="subdued"
          isInverse
          testId={testId}
          variant="headingLarge"
        >
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.focusInverse
      );
    });
  });

  describe('expressive type style', () => {
    it('should render expressive heading XL element with the correct styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography
          variant="headingXLarge"
          testId={testId}
          typeStyle="expressive"
        >
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('font-size', '32px');
      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.foundation02
      );
    });

    it('should render expressive heading Large element with the correct styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography
          variant="headingLarge"
          testId={testId}
          typeStyle="expressive"
        >
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('font-size', '28px');
    });

    it('should render expressive heading medium element with the correct styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography
          variant="headingMedium"
          testId={testId}
          typeStyle="expressive"
        >
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('font-size', '24px');
    });

    it('should render expressive heading small element with the correct styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography
          variant="headingSmall"
          testId={testId}
          typeStyle="expressive"
        >
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('font-size', '20px');
    });

    it('should render expressive heading xsmall element with the correct styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography
          variant="headingXSmall"
          testId={testId}
          typeStyle="expressive"
        >
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('font-size', '18px');
    });

    it('should render expressive heading xxsmall element with the correct styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography
          variant="headingXXSmall"
          testId={testId}
          typeStyle="expressive"
        >
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('font-size', '16px');
    });

    it('should render expressive body large element with the  correct styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Typography variant="bodyLarge" testId={testId} typeStyle="expressive">
          test
        </Typography>
      );

      expect(getByTestId(testId)).toHaveStyleRule('font-size', '20px');
    });
  });
});
