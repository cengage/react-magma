import React from 'react';
import { axe } from '../../../axe-helper';
import { Badge } from '.';
import { render } from '@testing-library/react';
import { magma } from '../../theme/magma';
import { darken, lighten } from 'polished';

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
      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        darken(0.1, magma.colors.primary),
        {
          target: ':focus',
        }
      );
      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        darken(0.2, magma.colors.primary),
        {
          target: ':active',
        }
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
      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        darken(0.1, magma.colors.neutral700),
        {
          target: ':focus',
        }
      );
      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        darken(0.2, magma.colors.neutral700),
        {
          target: ':active',
        }
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
      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        darken(0.1, magma.colors.success),
        {
          target: ':focus',
        }
      );
      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        darken(0.2, magma.colors.success),
        {
          target: ':active',
        }
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
      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        darken(0.1, magma.colors.danger),
        {
          target: ':focus',
        }
      );
      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        darken(0.2, magma.colors.danger),
        {
          target: ':active',
        }
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
      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        lighten(0.05, magma.colors.neutral100),
        {
          target: ':focus',
        }
      );
      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        lighten(0.1, magma.colors.neutral100),
        {
          target: ':active',
        }
      );
    });

    it('should render the default badge', () => {
      const { getByText } = render(<Badge onClick={() => {}}>{TEXT}</Badge>);

      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        magma.colors.primary
      );
      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        darken(0.1, magma.colors.primary),
        {
          target: ':focus',
        }
      );
      expect(getByText(TEXT)).toHaveStyleRule(
        'background',
        darken(0.2, magma.colors.primary),
        {
          target: ':active',
        }
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
        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          darken(0.1, magma.colors.tertiary),
          {
            target: ':focus',
          }
        );
        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          darken(0.2, magma.colors.tertiary),
          {
            target: ':active',
          }
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
        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          darken(0.1, magma.colors.neutral100),
          {
            target: ':focus',
          }
        );
        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          darken(0.2, magma.colors.neutral100),
          {
            target: ':active',
          }
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
        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          darken(0.1, magma.colors.success200),
          {
            target: ':focus',
          }
        );
        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          darken(0.2, magma.colors.success200),
          {
            target: ':active',
          }
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
        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          darken(0.1, magma.colors.danger200),
          {
            target: ':focus',
          }
        );
        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          darken(0.2, magma.colors.danger200),
          {
            target: ':active',
          }
        );
      });

      it('should render the inverse light badge', () => {
        const { getByText } = render(
          <Badge color="light" onClick={() => {}} isInverse>
            {TEXT}
          </Badge>
        );

        expect(getByText(TEXT)).toHaveStyleRule('background', 'transparent');
        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          lighten(0.05, magma.colors.neutral600),
          {
            target: ':focus',
          }
        );
        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          lighten(0.1, magma.colors.neutral600),
          {
            target: ':active',
          }
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
          magma.colors.tertiary
        );
        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          darken(0.1, magma.colors.tertiary),
          {
            target: ':focus',
          }
        );
        expect(getByText(TEXT)).toHaveStyleRule(
          'background',
          darken(0.2, magma.colors.tertiary),
          {
            target: ':active',
          }
        );
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
