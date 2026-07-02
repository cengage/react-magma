import React from 'react';

import { act, render, fireEvent } from '@testing-library/react';
import { transparentize } from 'polished';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { token } from '../../theme/tokens';

import { StyledButton } from '.';

describe('Styled Button', () => {
  const text = 'test text';

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <StyledButton testId={testId}>test</StyledButton>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a button with the passed in text', () => {
    const { getByTestId } = render(
      <StyledButton testId="button-test">{text}</StyledButton>
    );

    expect(getByTestId('button-test')).toBeInTheDocument();
  });

  it('should autofocus a button when the passed autoFocus', () => {
    const { getByTestId } = render(
      // eslint-disable-next-line jsx-a11y/no-autofocus
      <StyledButton autoFocus testId="button-test">
        {text}
      </StyledButton>
    );

    expect(getByTestId('button-test')).toHaveFocus();
  });

  it('should disable a button when the passed disabled', () => {
    const { getByTestId } = render(
      <StyledButton disabled variant="solid" testId="button-test">
        {text}
      </StyledButton>
    );

    expect(getByTestId('button-test')).toBeDisabled();
    expect(getByTestId('button-test')).toHaveStyleRule(
      'background',
      token.var('colors.neutral300')
    );
  });

  describe('Button classes', () => {
    describe('Variants', () => {
      it('solid button', () => {
        const { getByTestId } = render(
          <StyledButton variant="solid" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.primary')
        );
        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.primary600'),
          {
            target: ':hover',
          }
        );
        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.primary700'),
          {
            target: ':active',
          }
        );
        expect(button).toHaveStyleRule(
          'border-color',
          token.var('colors.primary')
        );
        expect(button).toHaveStyleRule('color', token.var('colors.neutral100'));
      });

      it('link button', () => {
        const { getByTestId } = render(
          <StyledButton variant="link" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', 'none');
        expect(button).toHaveStyleRule('color', token.var('colors.primary'));
      });
    });

    describe('Colors', () => {
      it('primary button', () => {
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

        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.primary')
        );
        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.primary600'),
          {
            target: ':hover',
          }
        );
        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.primary700'),
          {
            target: ':active',
          }
        );
        expect(button).toHaveStyleRule(
          'border-color',
          token.var('colors.primary')
        );
        expect(button).toHaveStyleRule('color', token.var('colors.neutral100'));
      });

      it('secondary button', () => {
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

        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.neutral100')
        );
        expect(button).toHaveStyleRule(
          'background',

          token.var('colors.primary100'),
          { target: ':hover' }
        );
        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.primary200'),
          {
            target: ':active',
          }
        );
        expect(button).toHaveStyleRule(
          'border-color',
          token.var('colors.primary300')
        );
        expect(button).toHaveStyleRule('color', token.var('colors.primary'));
      });

      it('danger button', () => {
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

        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.danger')
        );
        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.danger600'),
          {
            target: ':hover',
          }
        );
        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.danger700'),
          {
            target: ':active',
          }
        );
        expect(button).toHaveStyleRule(
          'border-color',
          token.var('colors.danger')
        );
        expect(button).toHaveStyleRule('color', token.var('colors.neutral100'));
      });

      it('marketing button', () => {
        const { getByTestId } = render(
          <StyledButton color="marketing" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.secondary500')
        );
        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.secondary600'),
          { target: ':hover' }
        );
        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.secondary700'),

          { target: ':active' }
        );
        expect(button).toHaveStyleRule(
          'border-color',
          token.var('colors.secondary500')
        );
        expect(button).toHaveStyleRule('color', token.var('colors.primary'));
      });

      it('subtle button', () => {
        const { getByTestId } = render(
          <StyledButton
            color="subtle"
            theme="magma"
            variant="solid"
            testId="button-test"
          >
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.neutral100')
        );
        expect(button).toHaveStyleRule(
          'background',
          transparentize(0.95, magma.colors.neutral900),
          {
            target: ':hover',
          }
        );
        expect(button).toHaveStyleRule(
          'background',
          transparentize(0.9, magma.colors.neutral900),
          {
            target: ':active',
          }
        );
        expect(button).toHaveStyleRule(
          'border-color',
          token.var('colors.neutral300')
        );
        expect(button).toHaveStyleRule('color', token.var('colors.neutral700'));
      });
    });

    describe('Inverse', () => {
      it('primary button', () => {
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

        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.tertiary500')
        );
        expect(button).toHaveStyleRule(
          'border-color',
          token.var('colors.neutral100')
        );
        expect(button).toHaveStyleRule('color', token.var('colors.primary700'));
      });

      it('secondary button', () => {
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
        expect(button).toHaveStyleRule(
          'color',
          token.var('colors.tertiary500')
        );
      });

      it('danger button', () => {
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

        expect(button).toHaveStyleRule(
          'background',
          token.var('colors.danger')
        );
        expect(button).toHaveStyleRule(
          'border-color',
          token.var('colors.neutral100')
        );
        expect(button).toHaveStyleRule('color', token.var('colors.neutral100'));
      });

      it('subtle button', () => {
        const { getByTestId } = render(
          <StyledButton
            isInverse
            color="subtle"
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
          transparentize(0.8, magma.colors.neutral100)
        );
        expect(button).toHaveStyleRule('color', token.var('colors.neutral100'));
      });
    });

    describe('Sizes', () => {
      it('medium button', () => {
        const { getByTestId } = render(
          <StyledButton size="medium" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'font-size',
          token.var('components.button.size.medium.fontSize')
        );
        expect(button).toHaveStyleRule(
          'padding',
          token.var('components.button.size.medium.padding')
        );
      });

      it('small button', () => {
        const { getByTestId } = render(
          <StyledButton size="small" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'font-size',
          token.var('components.button.size.small.fontSize')
        );
        expect(button).toHaveStyleRule(
          'padding',
          token.var('components.button.size.small.padding')
        );
      });

      it('large button', () => {
        const { getByTestId } = render(
          <StyledButton size="large" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'font-size',
          token.var('components.button.size.large.fontSize')
        );
        expect(button).toHaveStyleRule(
          'padding',
          token.var('components.button.size.large.padding')
        );
      });
    });

    describe('Shapes', () => {
      it('fill button', () => {
        const { getByTestId } = render(
          <StyledButton shape="fill" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'border-radius',
          token.var('components.button.borderRadius')
        );
      });

      it('leftCap button', () => {
        const { getByTestId } = render(
          <StyledButton shape="leftCap" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'border-radius',
          `${token.var('components.button.borderRadius')} 0 0 ${token.var(
            'components.button.borderRadius'
          )}`
        );
      });

      it('rightCap button', () => {
        const { getByTestId } = render(
          <StyledButton shape="rightCap" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'border-radius',
          `0 ${token.var('components.button.borderRadius')} ${token.var(
            'components.button.borderRadius'
          )} 0`
        );
      });

      it('round button', () => {
        const { getByTestId } = render(
          <StyledButton shape="round" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('border-radius', '2rem');
      });
    });

    it('allCaps button', () => {
      const { getByTestId } = render(
        <StyledButton textTransform="uppercase" testId="button-test">
          {text}
        </StyledButton>
      );
      const button = getByTestId('button-test');

      expect(button).toHaveStyleRule('text-transform', 'uppercase');
    });

    it('textTransform none button', () => {
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
      const { getByTestId } = render(
        <StyledButton iconOnly testId="button-test" size="small">
          {text}
        </StyledButton>
      );
      const button = getByTestId('button-test');

      expect(button).toHaveStyleRule('display', 'inline-flex');
      expect(button).toHaveStyleRule(
        'height',
        token.var('components.button.size.small.height')
      );
      expect(button).toHaveStyleRule(
        'width',
        token.var('components.button.size.small.height')
      );
    });

    it('icon medium', () => {
      const { getByTestId } = render(
        <StyledButton iconOnly testId="button-test" size="medium">
          {text}
        </StyledButton>
      );
      const button = getByTestId('button-test');

      expect(button).toHaveStyleRule('display', 'inline-flex');
      expect(button).toHaveStyleRule(
        'height',
        token.var('components.button.size.medium.height')
      );
      expect(button).toHaveStyleRule(
        'width',
        token.var('components.button.size.medium.height')
      );
    });

    it('icon large', () => {
      const { getByTestId } = render(
        <StyledButton iconOnly testId="button-test" size="large">
          {text}
        </StyledButton>
      );
      const button = getByTestId('button-test');

      expect(button).toHaveStyleRule('display', 'inline-flex');
      expect(button).toHaveStyleRule(
        'height',
        token.var('components.button.size.large.height')
      );
      expect(button).toHaveStyleRule(
        'width',
        token.var('components.button.size.large.height')
      );
    });
  });

  describe('Full Width', () => {
    it('default button', () => {
      const { getByTestId } = render(
        <StyledButton testId="test-button">{text}</StyledButton>
      );
      const button = getByTestId('test-button');

      expect(button).toHaveStyleRule('display', 'inline-flex');
      expect(button).toHaveStyleRule('width', 'auto');
    });

    it('Full Width button', () => {
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
    act(() => {
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<StyledButton>{text}</StyledButton>);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
