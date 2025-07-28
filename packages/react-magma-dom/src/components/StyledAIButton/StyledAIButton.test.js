import React from 'react';

import { act, render, fireEvent } from '@testing-library/react';
import { transparentize } from 'polished';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { AIButtonVariant } from '../AIButton';

import { StyledAIButton } from '.';

describe('Styled AI Button', () => {
  const text = 'test text';

  it('should find element by testId', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <StyledAIButton testId={testId}>test</StyledAIButton>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a button with the passed in text', () => {
    const { getByTestId } = render(
      <StyledAIButton testId="button-test">{text}</StyledAIButton>
    );

    expect(getByTestId('button-test')).toBeInTheDocument();
  });

  it('should autofocus a button when the passed autoFocus', () => {
    const { getByTestId } = render(
      // eslint-disable-next-line jsx-a11y/no-autofocus
      <StyledAIButton autoFocus testId="button-test">
        {text}
      </StyledAIButton>
    );

    expect(getByTestId('button-test')).toHaveFocus();
  });

  it('should disable a button when the passed disabled', () => {
    const { getByTestId } = render(
      <StyledAIButton disabled variant="solid" testId="button-test">
        {text}
      </StyledAIButton>
    );

    expect(getByTestId('button-test')).toBeDisabled();
    expect(getByTestId('button-test')).toHaveStyleRule(
      'background',
      magma.colors.neutral300
    );
  });

  describe('Button classes', () => {
    describe('Variants', () => {
      it('variant A', () => {
        const { getByTestId } = render(
          <StyledAIButton
            variant={AIButtonVariant.variantA}
            testId="button-test"
          >
            {text}
          </StyledAIButton>
        );

        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'background',
          `linear-gradient(268deg, ${magma.colors.aiColors.variantA.right} 0%, ${magma.colors.aiColors.variantA.left} 100%)`
        );
        expect(button).toHaveStyleRule(
          'border-color',
          `linear-gradient(268deg, ${magma.colors.aiColors.variantA.right} 0%, ${magma.colors.aiColors.variantA.left} 100%)`
        );
        expect(button).toHaveStyleRule('color', magma.colors.neutral100);
      });

      it('variant B', () => {
        const { getByTestId } = render(
          <StyledAIButton
            variant={AIButtonVariant.variantB}
            testId="button-test"
          >
            {text}
          </StyledAIButton>
        );

        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'background',
          `linear-gradient(268deg, ${magma.colors.aiColors.variantB.right} 0%, ${magma.colors.aiColors.variantB.left} 100%)`
        );
        expect(button).toHaveStyleRule(
          'border-color',
          `linear-gradient(268deg, ${magma.colors.aiColors.variantB.right} 0%, ${magma.colors.aiColors.variantB.left} 100%)`
        );
        expect(button).toHaveStyleRule('color', magma.colors.neutral100);
      });
    });

    describe('Inverse', () => {
      it('variant A', () => {
        const { getByTestId } = render(
          <StyledAIButton
            isInverse
            variant={AIButtonVariant.variantA}
            theme="magma"
            testId="button-test"
          >
            {text}
          </StyledAIButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'background',
          `linear-gradient(268deg, ${magma.colors.aiColors.variantA.right} 0%, ${magma.colors.aiColors.variantA.left} 100%)`
        );
        expect(button).toHaveStyleRule(
          'border-color',
          `linear-gradient(268deg, ${magma.colors.aiColors.variantA.right} 0%, ${magma.colors.aiColors.variantA.left} 100%)`
        );
        expect(button).toHaveStyleRule('color', magma.colors.neutral100);
      });

      it('variant B', () => {
        const { getByTestId } = render(
          <StyledAIButton
            isInverse
            variant={AIButtonVariant.variantB}
            theme="magma"
            testId="button-test"
          >
            {text}
          </StyledAIButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'background',
          `linear-gradient(268deg, ${magma.colors.aiColors.variantB.right} 0%, ${magma.colors.aiColors.variantB.left} 100%)`
        );
        expect(button).toHaveStyleRule(
          'border-color',
          `linear-gradient(268deg, ${magma.colors.aiColors.variantB.right} 0%, ${magma.colors.aiColors.variantB.left} 100%)`
        );
        expect(button).toHaveStyleRule('color', magma.colors.neutral100);
      });
    });

    describe('Sizes', () => {
      it('medium button', () => {
        const { getByTestId } = render(
          <StyledAIButton size="medium" testId="button-test">
            {text}
          </StyledAIButton>
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
          <StyledAIButton size="small" testId="button-test">
            {text}
          </StyledAIButton>
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
          <StyledAIButton size="large" testId="button-test">
            {text}
          </StyledAIButton>
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
          <StyledAIButton shape="fill" testId="button-test">
            {text}
          </StyledAIButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('border-radius', magma.borderRadius);
      });

      it('leftCap button', () => {
        const { getByTestId } = render(
          <StyledAIButton shape="leftCap" testId="button-test">
            {text}
          </StyledAIButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'border-radius',
          `${magma.borderRadius} 0 0 ${magma.borderRadius}`
        );
      });

      it('rightCap button', () => {
        const { getByTestId } = render(
          <StyledAIButton shape="rightCap" testId="button-test">
            {text}
          </StyledAIButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'border-radius',
          `0 ${magma.borderRadius} ${magma.borderRadius} 0`
        );
      });

      it('round button', () => {
        const { getByTestId } = render(
          <StyledAIButton shape="round" testId="button-test">
            {text}
          </StyledAIButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('border-radius', '100%');
      });
    });

    it('allCaps button', () => {
      const { getByTestId } = render(
        <StyledAIButton textTransform="uppercase" testId="button-test">
          {text}
        </StyledAIButton>
      );
      const button = getByTestId('button-test');

      expect(button).toHaveStyleRule('text-transform', 'uppercase');
    });

    it('textTransform none button', () => {
      const { getByTestId } = render(
        <StyledAIButton textTransform="none" testId="button-test">
          {text}
        </StyledAIButton>
      );
      const button = getByTestId('button-test');

      expect(button).toHaveStyleRule('text-transform', 'none');
    });
  });

  describe('Icon only', () => {
    it('icon small', () => {
      const { getByTestId } = render(
        <StyledAIButton testId="button-test" size="small" />
      );
      const button = getByTestId('button-test');

      expect(button).toHaveStyleRule('display', 'inline-flex');
      expect(button).toHaveStyleRule('height', magma.spaceScale.spacing07);
      expect(button).toHaveStyleRule('width', magma.spaceScale.spacing07);
    });

    it('icon medium', () => {
      const { getByTestId } = render(
        <StyledAIButton testId="button-test" size="medium" />
      );
      const button = getByTestId('button-test');

      expect(button).toHaveStyleRule('display', 'inline-flex');
      expect(button).toHaveStyleRule('height', magma.spaceScale.spacing09);
      expect(button).toHaveStyleRule('width', magma.spaceScale.spacing09);
    });

    it('icon large', () => {
      const { getByTestId } = render(
        <StyledAIButton testId="button-test" size="large" />
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
        <StyledAIButton testId="test-button">{text}</StyledAIButton>
      );
      const button = getByTestId('test-button');

      expect(button).toHaveStyleRule('display', 'inline-flex');
      expect(button).toHaveStyleRule('width', 'auto');
    });

    it('Full Width button', () => {
      const { getByTestId } = render(
        <StyledAIButton isFullWidth testId="button-test">
          {text}
        </StyledAIButton>
      );
      const button = getByTestId('button-test');

      expect(button).toHaveStyleRule('display', 'flex');
      expect(button).toHaveStyleRule('width', '100%');
    });
  });

  it('should apply custom colors', () => {
    const leftColor = '#FFF';
    const rightColor = '#000';
    const testId = 'custom-color-button';

    const { getByTestId } = render(
      <StyledAIButton
        leftColor={leftColor}
        rightColor={rightColor}
        testId={testId}
      >
        {text}
      </StyledAIButton>
    );

    const button = getByTestId(testId);

    expect(button).toHaveStyleRule(
      'background',
      `linear-gradient(268deg, ${rightColor} 0%, ${leftColor} 100%)`
    );
    expect(button).toHaveStyleRule(
      'border-color',
      `linear-gradient(268deg, ${rightColor} 0%, ${leftColor} 100%)`
    );
    expect(button).toHaveStyleRule('color', magma.colors.neutral100);
  });

  it('should work correctly with isAnimated=true', () => {
    const { getByTestId } = render(
      <StyledAIButton isAnimated testId="animated-button">
        {text}
      </StyledAIButton>
    );

    const button = getByTestId('animated-button');

    expect(button).toHaveStyleRule('background-size', '200% 100%', {
      media: '(prefers-reduced-motion: no-preference)',
    });
    expect(button).toHaveStyleRule('background-position', '0% 50%', {
      media: '(prefers-reduced-motion: no-preference)',
    });
    expect(button).toHaveStyleRule('animation', expect.stringContaining('4s'), {
      media: '(prefers-reduced-motion: no-preference)',
    });
  });

  it('should NOT animate if prefers-reduced-motion: reduce', () => {
    const { getByTestId } = render(
      <StyledAIButton isAnimated testId="animated-reduce-button">
        {text}
      </StyledAIButton>
    );
    const button = getByTestId('animated-reduce-button');
    expect(button).not.toHaveStyleRule('background-size', '200% 100%', {
      media: '(prefers-reduced-motion: reduce)',
    });
    expect(button).not.toHaveStyleRule('background-position', '0% 50%', {
      media: '(prefers-reduced-motion: reduce)',
    });
    expect(button).not.toHaveStyleRule(
      'animation',
      expect.stringContaining('4s'),
      {
        media: '(prefers-reduced-motion: reduce)',
      }
    );
    expect(button).toHaveStyleRule(
      'background',
      `linear-gradient(268deg, ${magma.colors.aiColors.variantA.right} 0%, ${magma.colors.aiColors.variantA.left} 100%)`
    );
  });

  it('should trigger the passed in function when clicked', () => {
    const onClickSpy = jest.fn();

    const { getByTestId } = render(
      <StyledAIButton onClick={onClickSpy} testId="button-test">
        {text}
      </StyledAIButton>
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
    const { container } = render(<StyledAIButton>{text}</StyledAIButton>);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
