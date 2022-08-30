import React from 'react';
import { axe } from '../../../axe-helper';
import { StyledButton } from '.';
import { render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';
import { transparentize } from 'polished';

describe('Styled Button', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <StyledButton testId={testId}>test</StyledButton>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a button with the passed in text', () => {
    const text = 'test text';
    const { getByTestId } = render(
      <StyledButton testId="button-test">{text}</StyledButton>
    );

    expect(getByTestId('button-test')).toBeInTheDocument();
  });

  it('should autofocus a button when the passed autoFocus', () => {
    const text = 'test text';
    const { getByTestId } = render(
      // eslint-disable-next-line jsx-a11y/no-autofocus
      <StyledButton autoFocus testId="button-test">
        {text}
      </StyledButton>
    );

    expect(getByTestId('button-test')).toHaveFocus();
  });

  it('should disable a button when the passed disabled', () => {
    const text = 'test text';
    const { getByTestId } = render(
      <StyledButton disabled variant="solid" testId="button-test">
        {text}
      </StyledButton>
    );

    expect(getByTestId('button-test')).toBeDisabled();
    expect(getByTestId('button-test')).toHaveStyleRule(
      'background',
      magma.colors.neutral300
    );
  });

  describe('Button classes', () => {
    describe('Variants', () => {
      it('solid button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton variant="solid" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', magma.colors.primary);
        expect(button).toHaveStyleRule('background', magma.colors.primary600, {
          target: ':hover',
        });
        expect(button).toHaveStyleRule('background', magma.colors.primary700, {
          target: ':active',
        });
        expect(button).toHaveStyleRule('border-color', magma.colors.primary);
        expect(button).toHaveStyleRule('color', magma.colors.neutral100);
      });

      it('link button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton variant="link" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', 'none');
        expect(button).toHaveStyleRule('color', magma.colors.primary);
      });
    });

    describe('Colors', () => {
      it('primary button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton
            color="primary"
            theme="magma"
            variant="solid"
            testId="button-test"
          >
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', magma.colors.primary);
        expect(button).toHaveStyleRule('background', magma.colors.primary600, {
          target: ':hover',
        });
        expect(button).toHaveStyleRule('background', magma.colors.primary700, {
          target: ':active',
        });
        expect(button).toHaveStyleRule('border-color', magma.colors.primary);
        expect(button).toHaveStyleRule('color', magma.colors.neutral100);
      });

      it('secondary button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton
            color="secondary"
            theme="magma"
            variant="solid"
            testId="button-test"
          >
            {text}
          </StyledButton>
        );

        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', magma.colors.neutral100);
        expect(button).toHaveStyleRule(
          'background',

          magma.colors.primary100,
          { target: ':hover' }
        );
        expect(button).toHaveStyleRule('background', magma.colors.primary200, {
          target: ':active',
        });
        expect(button).toHaveStyleRule('border-color', magma.colors.primary300);
        expect(button).toHaveStyleRule('color', magma.colors.primary500);
      });

      it('danger button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton
            color="danger"
            theme="magma"
            variant="solid"
            testId="button-test"
          >
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', magma.colors.danger);
        expect(button).toHaveStyleRule('background', magma.colors.danger600, {
          target: ':hover',
        });
        expect(button).toHaveStyleRule('background', magma.colors.danger700, {
          target: ':active',
        });
        expect(button).toHaveStyleRule('border-color', magma.colors.danger);
        expect(button).toHaveStyleRule('color', magma.colors.neutral100);
      });

      it('marketing button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton color="marketing" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', magma.colors.secondary500);
        expect(button).toHaveStyleRule(
          'background',
          magma.colors.secondary600,
          { target: ':hover' }
        );
        expect(button).toHaveStyleRule(
          'background',
          magma.colors.secondary700,

          { target: ':active' }
        );
        expect(button).toHaveStyleRule(
          'border-color',
          magma.colors.secondary500
        );
        expect(button).toHaveStyleRule('color', magma.colors.primary500);
      });
    });

    describe('Inverse', () => {
      it('primary button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton
            isInverse
            color="primary"
            theme="magma"
            variant="solid"
            testId="button-test"
          >
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', magma.colors.tertiary500);
        expect(button).toHaveStyleRule('border-color', magma.colors.neutral100);
        expect(button).toHaveStyleRule('color', magma.colors.primary700);
      });

      it('secondary button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton
            isInverse
            color="secondary"
            theme="magma"
            variant="solid"
            testId="button-test"
          >
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', 'none');
        expect(button).toHaveStyleRule(
          'border-color',
          transparentize(0.5, magma.colors.tertiary500)
        );
        expect(button).toHaveStyleRule('color', magma.colors.tertiary500);
      });

      it('danger button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton
            isInverse
            color="danger"
            theme="magma"
            variant="solid"
            testId="button-test"
          >
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', magma.colors.danger);
        expect(button).toHaveStyleRule('border-color', magma.colors.neutral100);
        expect(button).toHaveStyleRule('color', magma.colors.neutral100);
      });
    });

    describe('Sizes', () => {
      it('medium button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton size="medium" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'font-size',
          magma.typeScale.size03.fontSize
        );
        expect(button).toHaveStyleRule(
          'padding',
          `${magma.spaceScale.spacing04} ${magma.spaceScale.spacing05}`
        );
      });

      it('small button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton size="small" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'font-size',
          magma.typeScale.size01.fontSize
        );
        expect(button).toHaveStyleRule(
          'padding',
          `${magma.spaceScale.spacing02} ${magma.spaceScale.spacing03}`
        );
      });

      it('large button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton size="large" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'font-size',
          magma.typeScale.size04.fontSize
        );
        expect(button).toHaveStyleRule(
          'padding',
          `${magma.spaceScale.spacing04} ${magma.spaceScale.spacing06}`
        );
      });
    });

    describe('Shapes', () => {
      it('fill button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton shape="fill" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('border-radius', magma.borderRadius);
      });

      it('leftCap button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton shape="leftCap" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'border-radius',
          `${magma.borderRadius} 0 0 ${magma.borderRadius}`
        );
      });

      it('rightCap button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton shape="rightCap" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'border-radius',
          `0 ${magma.borderRadius} ${magma.borderRadius} 0`
        );
      });

      it('round button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton shape="round" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('border-radius', '100%');
      });
    });

    it('allCaps button', () => {
      const text = 'test text';
      const { getByTestId } = render(
        <StyledButton textTransform="uppercase" testId="button-test">
          {text}
        </StyledButton>
      );
      const button = getByTestId('button-test');

      expect(button).toHaveStyleRule('text-transform', 'uppercase');
    });

    it('textTransform none button', () => {
      const text = 'test text';
      const { getByTestId } = render(
        <StyledButton textTransform="none" testId="button-test">
          {text}
        </StyledButton>
      );
      const button = getByTestId('button-test');

      expect(button).toHaveStyleRule('text-transform', 'none');
    });
  });

  describe('IconOnly', () => {
    it('icon small', () => {
      const text = 'test text';
      const { getByTestId } = render(
        <StyledButton iconOnly testId="button-test" size="small">
          {text}
        </StyledButton>
      );
      const button = getByTestId('button-test');

      expect(button).toHaveStyleRule('display', 'inline-flex');
      expect(button).toHaveStyleRule('height', magma.spaceScale.spacing07);
      expect(button).toHaveStyleRule('width', magma.spaceScale.spacing07);
    });

    it('icon medium', () => {
      const text = 'test text';
      const { getByTestId } = render(
        <StyledButton iconOnly testId="button-test" size="medium">
          {text}
        </StyledButton>
      );
      const button = getByTestId('button-test');

      expect(button).toHaveStyleRule('display', 'inline-flex');
      expect(button).toHaveStyleRule('height', magma.spaceScale.spacing09);
      expect(button).toHaveStyleRule('width', magma.spaceScale.spacing09);
    });

    it('icon large', () => {
      const text = 'test text';
      const { getByTestId } = render(
        <StyledButton iconOnly testId="button-test" size="large">
          {text}
        </StyledButton>
      );
      const button = getByTestId('button-test');

      expect(button).toHaveStyleRule('display', 'inline-flex');
      expect(button).toHaveStyleRule('height', magma.spaceScale.spacing11);
      expect(button).toHaveStyleRule('width', magma.spaceScale.spacing11);
    });
  });

  describe('Full Width', () => {
    it('default button', () => {
      const text = 'test text';
      const { getByTestId } = render(
        <StyledButton testId="test-button">{text}</StyledButton>
      );
      const button = getByTestId('test-button');

      expect(button).toHaveStyleRule('display', 'inline-flex');
      expect(button).toHaveStyleRule('width', 'auto');
    });

    it('Full Width button', () => {
      const text = 'test text';
      const { getByTestId } = render(
        <StyledButton isFullWidth testId="button-test">
          {text}
        </StyledButton>
      );
      const button = getByTestId('button-test');

      expect(button).toHaveStyleRule('display', 'flex');
      expect(button).toHaveStyleRule('width', '100%');
    });
  });

  it('should trigger the passed in function when clicked', () => {
    const onClickSpy = jest.fn();
    const text = 'test text';
    const { getByTestId } = render(
      <StyledButton onClick={onClickSpy} testId="button-test">
        {text}
      </StyledButton>
    );

    fireEvent(
      getByTestId('button-test'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it('Does not violate accessibility standards', () => {
    const text = 'test text';
    const { container } = render(<StyledButton>{text}</StyledButton>);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
