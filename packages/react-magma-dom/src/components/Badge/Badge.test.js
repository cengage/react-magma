import React from 'react';

import { render } from '@testing-library/react';
import { transparentize } from 'polished';
import { CheckIcon, InfoIcon } from 'react-magma-icons';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { Badge } from '.';

const TEXT = 'Test Text';

describe('Badge', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Badge testId={testId}>Test Badge</Badge>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the badge component', () => {
    const { container } = render(<Badge>{TEXT}</Badge>);

    expect(container).toBeInTheDocument();
  });

  it('should render a left icon on the left side of the badge', () => {
    const { getByTestId, getByText } = render(
      <Badge leftIcon={<CheckIcon testId="badge-left-icon" />}>{TEXT}</Badge>
    );
    const badge = getByText(TEXT);
    const icon = getByTestId('badge-left-icon');
    const iconWrapper = icon.parentElement;

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('height', `${magma.iconSizes.xSmall}`);
    expect(icon).toHaveAttribute('width', `${magma.iconSizes.xSmall}`);
    expect(badge).toHaveStyleRule('display', 'inline-flex');
    expect(badge).toHaveStyleRule('vertical-align', 'middle');
    expect(iconWrapper).toHaveStyleRule(
      'margin-right',
      magma.spaceScale.spacing02
    );
    expect(badge.firstChild).toBe(iconWrapper);
  });

  it('should render a right icon on the right side of the badge', () => {
    const { getByTestId, getByText } = render(
      <Badge rightIcon={<InfoIcon testId="badge-right-icon" />}>{TEXT}</Badge>
    );
    const badge = getByText(TEXT);
    const icon = getByTestId('badge-right-icon');
    const iconWrapper = icon.parentElement;

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('height', `${magma.iconSizes.xSmall}`);
    expect(icon).toHaveAttribute('width', `${magma.iconSizes.xSmall}`);
    expect(badge).toHaveStyleRule('display', 'inline-flex');
    expect(iconWrapper).toHaveStyleRule(
      'margin-left',
      magma.spaceScale.spacing02
    );
    expect(badge.lastChild).toBe(iconWrapper);
  });

  it('should render left and right icons together', () => {
    const { getByTestId, getByText } = render(
      <Badge
        leftIcon={<CheckIcon testId="badge-left-icon" />}
        rightIcon={<InfoIcon testId="badge-right-icon" />}
      >
        {TEXT}
      </Badge>
    );
    const badge = getByText(TEXT);
    const leftIconWrapper = getByTestId('badge-left-icon').parentElement;
    const rightIconWrapper = getByTestId('badge-right-icon').parentElement;

    expect(badge.firstChild).toBe(leftIconWrapper);
    expect(badge.lastChild).toBe(rightIconWrapper);
  });

  it('should render the badge component with counter styles', () => {
    const { getByText } = render(<Badge variant="counter">{TEXT}</Badge>);

    expect(getByText(TEXT)).toHaveStyleRule(
      'border-radius',
      magma.spaceScale.spacing06
    );
    expect(getByText(TEXT)).toHaveStyleRule(
      'font-size',
      magma.typeScale.size02.fontSize
    );
    expect(getByText(TEXT)).toHaveStyleRule(
      'letter-spacing',
      magma.typeScale.size02.letterSpacing
    );
    expect(getByText(TEXT)).toHaveStyleRule(
      'line-height',
      magma.typeScale.size02.lineHeight
    );
  });

  it('should have styles when badge is clickable', () => {
    const { getByText } = render(
      <Badge color="primary" onClick={() => {}}>
        {TEXT}
      </Badge>
    );

    expect(getByText(TEXT)).toHaveStyleRule('cursor', 'pointer');

    expect(getByText(TEXT)).toHaveStyleRule(
      'outline',
      `2px solid ${magma.colors.focus}`,
      { target: ':focus' }
    );

    expect(getByText(TEXT)).toHaveStyleRule(
      'outline-offset',
      `${magma.spaceScale.spacing01}`,
      { target: ':focus' }
    );
  });

  it('should have styles when badge is clickable and isInverse', () => {
    const { getByText } = render(
      <Badge color="primary" onClick={() => {}} isInverse>
        {TEXT}
      </Badge>
    );

    expect(getByText(TEXT)).toHaveStyleRule(
      'outline',
      `2px solid ${magma.colors.focusInverse}`,
      { target: ':focus' }
    );
  });

  describe('color variants', () => {
    it('should render the primary badge', () => {
      const { getByText } = render(
        <Badge color="primary" onClick={() => {}}>
          {TEXT}
        </Badge>
      );

      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        magma.colors.primary
      );
    });

    it('should render the secondary badge', () => {
      const { getByText } = render(
        <Badge color="secondary" onClick={() => {}}>
          {TEXT}
        </Badge>
      );

      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        magma.colors.neutral700
      );
    });

    it('should render the success badge', () => {
      const { getByText } = render(
        <Badge color="success" onClick={() => {}}>
          {TEXT}
        </Badge>
      );

      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        magma.colors.success
      );
    });

    it('should render the info badge', () => {
      const { getByText } = render(
        <Badge color="info" onClick={() => {}}>
          {TEXT}
        </Badge>
      );

      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        magma.colors.info500
      );
    });

    it('should render the warning badge', () => {
      const { getByText } = render(
        <Badge color="warning" onClick={() => {}}>
          {TEXT}
        </Badge>
      );

      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        magma.colors.warning500
      );
    });

    it('should render the danger badge', () => {
      const { getByText } = render(
        <Badge color="danger" onClick={() => {}}>
          {TEXT}
        </Badge>
      );

      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        magma.colors.danger
      );
    });

    it('should render the light badge', () => {
      const { getByText } = render(
        <Badge color="light" onClick={() => {}}>
          {TEXT}
        </Badge>
      );

      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        magma.colors.neutral100
      );
    });

    it('should render the default badge', () => {
      const { getByText } = render(<Badge onClick={() => {}}>{TEXT}</Badge>);

      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        magma.colors.primary
      );
      expect(getByText(TEXT)).toHaveStyleRule(
        'padding',
        `3px ${magma.spaceScale.spacing02}`
      );
    });

    describe('inverse', () => {
      it('should render the inverse primary badge', () => {
        const { getByText } = render(
          <Badge color="primary" onClick={() => {}} isInverse>
            {TEXT}
          </Badge>
        );

        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          magma.colors.tertiary
        );
      });

      it('should render the inverse secondary badge', () => {
        const { getByText } = render(
          <Badge color="secondary" onClick={() => {}} isInverse>
            {TEXT}
          </Badge>
        );

        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          magma.colors.neutral100
        );
      });

      it('should render the inverse success badge', () => {
        const { getByText } = render(
          <Badge color="success" onClick={() => {}} isInverse>
            {TEXT}
          </Badge>
        );

        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          magma.colors.success200
        );
      });

      it('should render the inverse info badge', () => {
        const { getByText } = render(
          <Badge color="info" onClick={() => {}} isInverse>
            {TEXT}
          </Badge>
        );

        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          magma.colors.info200
        );
        expect(getByText(TEXT)).toHaveStyleRule('color', magma.colors.info700);
      });

      it('should render the inverse warning badge', () => {
        const { getByText } = render(
          <Badge color="warning" onClick={() => {}} isInverse>
            {TEXT}
          </Badge>
        );

        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          magma.colors.warning200
        );
        expect(getByText(TEXT)).toHaveStyleRule(
          'color',
          magma.colors.warning600
        );
      });

      it('should render the inverse danger badge', () => {
        const { getByText } = render(
          <Badge color="danger" onClick={() => {}} isInverse>
            {TEXT}
          </Badge>
        );

        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          magma.colors.danger200
        );
      });

      it('should render the inverse light badge', () => {
        const { getByText } = render(
          <Badge color="light" onClick={() => {}} isInverse>
            {TEXT}
          </Badge>
        );

        expect(getByText(TEXT)).toHaveStyleRule('background', 'transparent');
      });

      it('should render the inverse default badge', () => {
        const { getByText } = render(
          <Badge onClick={() => {}} isInverse>
            {TEXT}
          </Badge>
        );

        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          magma.colors.tertiary
        );
      });
    });

    describe('light weight', () => {
      [
        {
          background: magma.colors.primary100,
          borderColor: transparentize(0.85, magma.colors.primary500),
          color: undefined,
          name: 'default',
          textColor: magma.colors.primary500,
        },
        {
          background: magma.colors.primary100,
          borderColor: transparentize(0.85, magma.colors.primary500),
          color: 'primary',
          name: 'primary',
          textColor: magma.colors.primary500,
        },
        {
          background: magma.colors.neutral200,
          borderColor: 'transparent',
          color: 'secondary',
          name: 'secondary',
          textColor: magma.colors.neutral700,
        },
        {
          background: magma.colors.danger100,
          borderColor: transparentize(0.85, magma.colors.danger500),
          color: 'danger',
          name: 'danger',
          textColor: magma.colors.danger500,
        },
        {
          background: magma.colors.neutral100,
          borderColor: magma.colors.neutral300,
          color: 'light',
          name: 'light',
          textColor: magma.colors.neutral700,
        },
        {
          background: magma.colors.info100,
          borderColor: transparentize(0.85, magma.colors.info500),
          color: 'info',
          name: 'info',
          textColor: magma.colors.info500,
        },
        {
          background: magma.colors.success100,
          borderColor: transparentize(0.85, magma.colors.success500),
          color: 'success',
          name: 'success',
          textColor: magma.colors.success500,
        },
        {
          background: magma.colors.warning100,
          borderColor: transparentize(0.85, magma.colors.warning500),
          color: 'warning',
          name: 'warning',
          textColor: magma.colors.warning500,
        },
      ].forEach(testCase => {
        it(`should render the ${testCase.name} light weight badge`, () => {
          const { getByText } = render(
            <Badge color={testCase.color} weight="light">
              {TEXT}
            </Badge>
          );

          expect(getByText(TEXT)).toHaveStyleRule(
            'background',
            testCase.background
          );
          expect(getByText(TEXT)).toHaveStyleRule('color', testCase.textColor);
          expect(getByText(TEXT)).toHaveStyleRule(
            'border-color',
            testCase.borderColor
          );
        });
      });

      [
        {
          background: transparentize(0.5, magma.colors.primary700),
          borderColor: magma.colors.primary400,
          color: undefined,
          name: 'default inverse',
          textColor: magma.colors.primary200,
        },
        {
          background: transparentize(0.5, magma.colors.primary700),
          borderColor: magma.colors.primary400,
          color: 'primary',
          name: 'primary inverse',
          textColor: magma.colors.primary200,
        },
        {
          background: transparentize(0.6, magma.colors.neutral900),
          borderColor: 'transparent',
          color: 'secondary',
          name: 'secondary inverse',
          textColor: magma.colors.neutral100,
        },
        {
          background: transparentize(0.5, magma.colors.danger700),
          borderColor: magma.colors.danger600,
          color: 'danger',
          name: 'danger inverse',
          textColor: magma.colors.danger200,
        },
        {
          background: 'transparent',
          borderColor: transparentize(0.7, magma.colors.neutral100),
          color: 'light',
          name: 'light inverse',
          textColor: magma.colors.neutral100,
        },
        {
          background: transparentize(0.5, magma.colors.info700),
          borderColor: magma.colors.info600,
          color: 'info',
          name: 'info inverse',
          textColor: magma.colors.info200,
        },
        {
          background: transparentize(0.5, magma.colors.success700),
          borderColor: magma.colors.success600,
          color: 'success',
          name: 'success inverse',
          textColor: magma.colors.success200,
        },
        {
          background: transparentize(0.5, magma.colors.warning700),
          borderColor: magma.colors.warning600,
          color: 'warning',
          name: 'warning inverse',
          textColor: magma.colors.warning200,
        },
      ].forEach(testCase => {
        it(`should render the ${testCase.name} light weight badge`, () => {
          const { getByText } = render(
            <Badge color={testCase.color} isInverse weight="light">
              {TEXT}
            </Badge>
          );

          expect(getByText(TEXT)).toHaveStyleRule(
            'background',
            testCase.background
          );
          expect(getByText(TEXT)).toHaveStyleRule('color', testCase.textColor);
          expect(getByText(TEXT)).toHaveStyleRule(
            'border-color',
            testCase.borderColor
          );
        });
      });
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Badge>{TEXT}</Badge>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
