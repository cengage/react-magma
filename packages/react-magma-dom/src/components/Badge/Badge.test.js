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
    const { container, getByText } = render(<Badge>{TEXT}</Badge>);

    expect(container).toBeInTheDocument();
    expect(getByText(TEXT)).not.toHaveStyleRule('vertical-align', 'middle');
    expect(getByText(TEXT)).toHaveStyleRule(
      'border-radius',
      magma.borderRadiusExtraSmall
    );
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
        magma.colors.brand.amber
      );
      expect(getByText(TEXT)).toHaveStyleRule('color', magma.colors.brand.navy);
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
        magma.colors.blue600
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
        magma.colors.yellow400
      );
      expect(getByText(TEXT)).toHaveStyleRule('color', magma.colors.brand.navy);
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
        magma.colors.neutral0
      );
      expect(getByText(TEXT)).toHaveStyleRule('color', magma.colors.brand.navy);
      expect(getByText(TEXT)).toHaveStyleRule(
        'border-color',
        magma.colors.neutral500
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
          magma.colors.brand.cyan
        );
        expect(getByText(TEXT)).toHaveStyleRule(
          'color',
          magma.colors.brand.navy
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
          magma.colors.brand.amber
        );
        expect(getByText(TEXT)).toHaveStyleRule(
          'color',
          magma.colors.brand.navy
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
          magma.colors.green500
        );
        expect(getByText(TEXT)).toHaveStyleRule(
          'color',
          magma.colors.green1000
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
          magma.colors.blue500
        );
        expect(getByText(TEXT)).toHaveStyleRule('color', magma.colors.blue1000);
      });

      it('should render the inverse warning badge', () => {
        const { getByText } = render(
          <Badge color="warning" onClick={() => {}} isInverse>
            {TEXT}
          </Badge>
        );

        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          magma.colors.yellow400
        );
        expect(getByText(TEXT)).toHaveStyleRule(
          'color',
          magma.colors.brand.navy
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
          magma.colors.red500
        );
        expect(getByText(TEXT)).toHaveStyleRule('color', magma.colors.red1000);
      });

      it('should render the inverse light badge', () => {
        const { getByText } = render(
          <Badge color="light" onClick={() => {}} isInverse>
            {TEXT}
          </Badge>
        );

        expect(getByText(TEXT)).toHaveStyleRule('background', 'transparent');
        expect(getByText(TEXT)).toHaveStyleRule(
          'border-color',
          magma.colors.neutral500
        );
      });

      it('should render the inverse default badge', () => {
        const { getByText } = render(
          <Badge onClick={() => {}} isInverse>
            {TEXT}
          </Badge>
        );

        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          magma.colors.brand.cyan
        );
      });
    });

    describe('light weight', () => {
      [
        {
          background: magma.colors.neutral200,
          borderColor: 'transparent',
          color: undefined,
          name: 'default',
          textColor: magma.colors.brand.navy,
        },
        {
          background: magma.colors.neutral200,
          borderColor: 'transparent',
          color: 'primary',
          name: 'primary',
          textColor: magma.colors.brand.navy,
        },
        {
          background: magma.colors.tangerine100,
          borderColor: transparentize(0.85, magma.colors.tangerine600),
          color: 'secondary',
          name: 'secondary',
          textColor: magma.colors.tangerine700,
        },
        {
          background: magma.colors.red100,
          borderColor: transparentize(0.85, magma.colors.red600),
          color: 'danger',
          name: 'danger',
          textColor: magma.colors.red600,
        },
        {
          background: magma.colors.neutral0,
          borderColor: magma.colors.neutral200,
          color: 'light',
          name: 'light',
          textColor: magma.colors.brand.navy,
        },
        {
          background: magma.colors.blue100,
          borderColor: transparentize(0.85, magma.colors.blue600),
          color: 'info',
          name: 'info',
          textColor: magma.colors.blue600,
        },
        {
          background: magma.colors.green100,
          borderColor: transparentize(0.85, magma.colors.green600),
          color: 'success',
          name: 'success',
          textColor: magma.colors.green700,
        },
        {
          background: magma.colors.yellow100,
          borderColor: transparentize(0.85, magma.colors.yellow700),
          color: 'warning',
          name: 'warning',
          textColor: magma.colors.yellow700,
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
          background: magma.colors.neutral900,
          borderColor: 'transparent',
          color: undefined,
          name: 'default inverse',
          textColor: magma.colors.neutral0,
        },
        {
          background: magma.colors.neutral900,
          borderColor: 'transparent',
          color: 'primary',
          name: 'primary inverse',
          textColor: magma.colors.neutral0,
        },
        {
          background: magma.colors.tangerine1000,
          borderColor: magma.colors.tangerine900,
          color: 'secondary',
          name: 'secondary inverse',
          textColor: magma.colors.tangerine200,
        },
        {
          background: magma.colors.red1000,
          borderColor: magma.colors.red800,
          color: 'danger',
          name: 'danger inverse',
          textColor: magma.colors.red200,
        },
        {
          background: 'transparent',
          borderColor: transparentize(0.8, magma.colors.neutral0),
          color: 'light',
          name: 'light inverse',
          textColor: magma.colors.neutral0,
        },
        {
          background: magma.colors.blue900,
          borderColor: magma.colors.blue700,
          color: 'info',
          name: 'info inverse',
          textColor: magma.colors.blue200,
        },
        {
          background: magma.colors.green1000,
          borderColor: magma.colors.green800,
          color: 'success',
          name: 'success inverse',
          textColor: magma.colors.green200,
        },
        {
          background: magma.colors.yellow1000,
          borderColor: magma.colors.yellow800,
          color: 'warning',
          name: 'warning inverse',
          textColor: magma.colors.yellow200,
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
