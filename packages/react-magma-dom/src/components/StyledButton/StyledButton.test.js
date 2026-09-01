import React from 'react';

import { act, render, fireEvent } from '@testing-library/react';
import { transparentize } from 'polished';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

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
      magma.colors.neutral200
    );
    expect(getByTestId('button-test')).toHaveStyleRule(
      'color',
      magma.colors.neutral500
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

        expect(button).toHaveStyleRule('background', magma.colors.brand.navy);
        expect(button).toHaveStyleRule('background', magma.colors.blue800, {
          target: ':hover',
        });
        expect(button).toHaveStyleRule('background', magma.colors.brand.navy, {
          target: ':active',
        });
        expect(button).toHaveStyleRule('border-color', magma.colors.primary);
        expect(button).toHaveStyleRule('color', magma.colors.neutral0);
      });

      it('link button', () => {
        const { getByTestId } = render(
          <StyledButton variant="link" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', 'none');
        expect(button).toHaveStyleRule('color', magma.colors.cyan700);
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

        expect(button).toHaveStyleRule('background', magma.colors.brand.navy);
        expect(button).toHaveStyleRule('background', magma.colors.blue800, {
          target: ':hover',
        });
        expect(button).toHaveStyleRule('background', magma.colors.brand.navy, {
          target: ':active',
        });
        expect(button).toHaveStyleRule('border-color', magma.colors.primary);
        expect(button).toHaveStyleRule('color', magma.colors.neutral0);
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

        expect(button).toHaveStyleRule('background', magma.colors.neutral0);
        expect(button).toHaveStyleRule(
          'background',
          transparentize(0.5, magma.colors.neutral200),
          { target: ':hover' }
        );
        expect(button).toHaveStyleRule('background', magma.colors.neutral0, {
          target: ':active',
        });
        expect(button).toHaveStyleRule('border-color', magma.colors.neutral300);
        expect(button).toHaveStyleRule('color', magma.colors.brand.navy);
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

        expect(button).toHaveStyleRule('background', magma.colors.danger);
        expect(button).toHaveStyleRule('background', magma.colors.red700, {
          target: ':hover',
        });
        expect(button).toHaveStyleRule('background', magma.colors.danger, {
          target: ':active',
        });
        expect(button).toHaveStyleRule('border-color', magma.colors.danger);
        expect(button).toHaveStyleRule('color', magma.colors.neutral0);
      });

      it('marketing button', () => {
        const { getByTestId } = render(
          <StyledButton color="marketing" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', magma.colors.brand.amber);
        expect(button).toHaveStyleRule(
          'background',
          magma.colors.tangerine400,
          { target: ':hover' }
        );
        expect(button).toHaveStyleRule(
          'background',
          magma.colors.brand.amber,

          { target: ':active' }
        );
        expect(button).toHaveStyleRule(
          'border-color',
          magma.colors.secondary500
        );
        expect(button).toHaveStyleRule('color', magma.colors.brand.navy);
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
          transparentize(0.5, magma.colors.neutral200)
        );
        expect(button).toHaveStyleRule('background', magma.colors.neutral200, {
          target: ':hover',
        });
        expect(button).toHaveStyleRule(
          'background',
          transparentize(0.25, magma.colors.neutral200),
          {
            target: ':active',
          }
        );
        expect(button).toHaveStyleRule('border', '0');
        expect(button).toHaveStyleRule('color', magma.colors.brand.navy);
      });

      it('success button', () => {
        const { getByTestId } = render(
          <StyledButton
            color="success"
            theme="magma"
            variant="solid"
            testId="button-test"
          >
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', magma.colors.success);
        expect(button).toHaveStyleRule('background', magma.colors.green700, {
          target: ':hover',
        });
        expect(button).toHaveStyleRule('background', magma.colors.success, {
          target: ':active',
        });
        expect(button).toHaveStyleRule('color', magma.colors.neutral0);
      });
    });

    describe('Disabled solid colors', () => {
      it.each([
        ['primary', magma.colors.neutral200],
        ['secondary', magma.colors.neutral0],
        ['subtle', magma.colors.neutral200],
        ['danger', magma.colors.neutral200],
        ['success', magma.colors.neutral200],
        ['marketing', magma.colors.neutral200],
      ])('%s button', (color, background) => {
        const { getByTestId } = render(
          <StyledButton
            color={color}
            disabled
            variant="solid"
            testId="button-test"
          >
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', background);
        expect(button).toHaveStyleRule('color', magma.colors.neutral500);
        if (color === 'secondary') {
          expect(button).toHaveStyleRule(
            'border-color',
            magma.colors.neutral300
          );
        } else {
          expect(button).toHaveStyleRule('border', '0');
        }
      });
    });

    describe('Normal links', () => {
      it.each([
        [
          'primary',
          magma.colors.cyan700,
          magma.colors.cyan800,
          magma.colors.cyan800,
        ],
        [
          'secondary',
          magma.colors.cyan700,
          magma.colors.cyan800,
          magma.colors.cyan800,
        ],
        [
          'subtle',
          magma.colors.brand.navy,
          magma.colors.brand.navy,
          magma.colors.brand.navy,
        ],
        [
          'danger',
          magma.colors.red600,
          magma.colors.red600,
          magma.colors.red600,
        ],
        [
          'success',
          magma.colors.green600,
          magma.colors.green700,
          magma.colors.green700,
        ],
        [
          'marketing',
          magma.colors.brand.navy,
          magma.colors.brand.navy,
          magma.colors.brand.navy,
        ],
      ])(
        '%s link states',
        (color, textColor, hoverTextColor, activeTextColor) => {
          const { getByTestId } = render(
            <StyledButton color={color} variant="link" testId="button-test">
              {text}
            </StyledButton>
          );
          const button = getByTestId('button-test');
          const hoverBackground =
            color === 'marketing'
              ? magma.colors.tangerine400
              : transparentize(0.5, magma.colors.neutral200);
          const activeBackground =
            color === 'marketing'
              ? magma.colors.brand.amber
              : transparentize(0.25, magma.colors.neutral200);

          expect(button).toHaveStyleRule('background', 'none');
          expect(button).toHaveStyleRule('color', textColor);
          expect(button).toHaveStyleRule('background', hoverBackground, {
            target: ':hover',
          });
          expect(button).toHaveStyleRule('color', hoverTextColor, {
            target: ':hover',
          });
          expect(button).toHaveStyleRule('background', activeBackground, {
            target: ':active',
          });
          expect(button).toHaveStyleRule('color', activeTextColor, {
            target: ':active',
          });
        }
      );

      it.each([
        'primary',
        'secondary',
        'subtle',
        'danger',
        'success',
        'marketing',
      ])('%s disabled link', color => {
        const { getByTestId } = render(
          <StyledButton
            color={color}
            disabled
            variant="link"
            testId="button-test"
          >
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', 'none');
        expect(button).toHaveStyleRule('color', magma.colors.neutral500);
      });
    });

    describe('Inverse', () => {
      it.each([
        [
          'primary',
          magma.colors.brand.cyan,
          magma.colors.brand.navy,
          magma.colors.cyan400,
          magma.colors.brand.navy,
          magma.colors.brand.cyan,
          magma.colors.brand.navy,
        ],
        [
          'secondary',
          'none',
          magma.colors.neutral0,
          transparentize(0.5, magma.colors.neutral900),
          magma.colors.neutral0,
          'none',
          magma.colors.neutral0,
        ],
        [
          'subtle',
          transparentize(0.5, magma.colors.neutral900),
          magma.colors.neutral0,
          magma.colors.neutral900,
          magma.colors.neutral0,
          transparentize(0.5, magma.colors.neutral900),
          magma.colors.neutral0,
        ],
        [
          'danger',
          magma.colors.red500,
          magma.colors.brand.navy,
          magma.colors.red400,
          magma.colors.brand.navy,
          magma.colors.red500,
          magma.colors.brand.navy,
        ],
        [
          'success',
          magma.colors.green500,
          magma.colors.brand.navy,
          magma.colors.green400,
          magma.colors.brand.navy,
          magma.colors.green500,
          magma.colors.brand.navy,
        ],
        [
          'marketing',
          magma.colors.brand.amber,
          magma.colors.brand.navy,
          magma.colors.tangerine400,
          magma.colors.brand.navy,
          magma.colors.brand.amber,
          magma.colors.brand.navy,
        ],
      ])(
        '%s solid button states',
        (
          color,
          background,
          textColor,
          hoverBackground,
          hoverTextColor,
          activeBackground,
          activeTextColor
        ) => {
          const { getByTestId } = render(
            <StyledButton
              isInverse
              color={color}
              variant="solid"
              testId="button-test"
            >
              {text}
            </StyledButton>
          );
          const button = getByTestId('button-test');

          expect(button).toHaveStyleRule('background', background);
          expect(button).toHaveStyleRule('color', textColor);
          expect(button).toHaveStyleRule('background', hoverBackground, {
            target: ':hover',
          });
          expect(button).toHaveStyleRule('color', hoverTextColor, {
            target: ':hover',
          });
          expect(button).toHaveStyleRule('background', activeBackground, {
            target: ':active',
          });
          expect(button).toHaveStyleRule('color', activeTextColor, {
            target: ':active',
          });

          if (color === 'secondary') {
            expect(button).toHaveStyleRule('border', '1px solid');
            expect(button).toHaveStyleRule(
              'border-color',
              magma.colors.neutral800
            );
          } else {
            expect(button).toHaveStyleRule('border', '0');
          }
        }
      );

      it.each([
        ['primary', magma.colors.neutral900],
        ['secondary', 'none'],
        ['subtle', magma.colors.neutral900],
        ['danger', magma.colors.neutral900],
        ['success', magma.colors.neutral900],
        ['marketing', magma.colors.neutral900],
      ])('%s disabled solid button', (color, background) => {
        const { getByTestId } = render(
          <StyledButton
            isInverse
            color={color}
            disabled
            variant="solid"
            testId="button-test"
          >
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', background);
        expect(button).toHaveStyleRule('color', magma.colors.neutral600);
        if (color === 'secondary') {
          expect(button).toHaveStyleRule('border', '1px solid');
          expect(button).toHaveStyleRule(
            'border-color',
            magma.colors.neutral800
          );
        } else {
          expect(button).toHaveStyleRule('border', '0');
        }
      });

      it.each([
        [
          'primary',
          magma.colors.brand.cyan,
          magma.colors.brand.cyan,
          magma.colors.brand.cyan,
        ],
        [
          'secondary',
          magma.colors.brand.cyan,
          magma.colors.brand.cyan,
          magma.colors.brand.cyan,
        ],
        [
          'subtle',
          magma.colors.neutral0,
          magma.colors.neutral0,
          magma.colors.neutral0,
        ],
        [
          'danger',
          magma.colors.red500,
          magma.colors.red400,
          magma.colors.red400,
        ],
        [
          'success',
          magma.colors.green500,
          magma.colors.green500,
          magma.colors.green500,
        ],
        [
          'marketing',
          magma.colors.brand.amber,
          magma.colors.brand.amber,
          magma.colors.brand.amber,
        ],
      ])(
        '%s inverse link states',
        (color, textColor, hoverTextColor, activeTextColor) => {
          const { getByTestId } = render(
            <StyledButton
              isInverse
              color={color}
              variant="link"
              testId="button-test"
            >
              {text}
            </StyledButton>
          );
          const button = getByTestId('button-test');
          const interactionBackground = transparentize(
            0.5,
            magma.colors.neutral900
          );

          expect(button).toHaveStyleRule('background', 'none');
          expect(button).toHaveStyleRule('color', textColor);
          expect(button).toHaveStyleRule('background', interactionBackground, {
            target: ':hover',
          });
          expect(button).toHaveStyleRule('color', hoverTextColor, {
            target: ':hover',
          });
          expect(button).toHaveStyleRule('background', interactionBackground, {
            target: ':active',
          });
          expect(button).toHaveStyleRule('color', activeTextColor, {
            target: ':active',
          });
        }
      );

      it.each([
        'primary',
        'secondary',
        'subtle',
        'danger',
        'success',
        'marketing',
      ])('%s disabled inverse link', color => {
        const { getByTestId } = render(
          <StyledButton
            isInverse
            color={color}
            disabled
            variant="link"
            testId="button-test"
          >
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', 'none');
        expect(button).toHaveStyleRule('color', magma.colors.neutral600);
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
          magma.typeScale.size03.fontSize
        );
        expect(button).toHaveStyleRule(
          'padding',
          `${magma.spaceScale.spacing04} ${magma.spaceScale.spacing05}`
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
          magma.typeScale.size01.fontSize
        );
        expect(button).toHaveStyleRule(
          'padding',
          `${magma.spaceScale.spacing02} ${magma.spaceScale.spacing03}`
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
        const { getByTestId } = render(
          <StyledButton shape="fill" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('border-radius', magma.borderRadius);
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
          `${magma.borderRadius} 0 0 ${magma.borderRadius}`
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
          `0 ${magma.borderRadius} ${magma.borderRadius} 0`
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

    it('does not transform button text by default', () => {
      const { getByTestId } = render(
        <StyledButton testId="button-test">{text}</StyledButton>
      );

      expect(getByTestId('button-test')).toHaveStyleRule(
        'text-transform',
        'none'
      );
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
      expect(button).toHaveStyleRule('height', magma.spaceScale.spacing07);
      expect(button).toHaveStyleRule('width', magma.spaceScale.spacing07);
    });

    it('icon medium', () => {
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
