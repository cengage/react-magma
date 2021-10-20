import React from 'react';
import { axe } from '../../../axe-helper';
import { StyledButton } from '.';
import { render, fireEvent } from '@testing-library/react';
import { cssVar, darken, lighten } from 'polished';

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
      'var(--colors-neutral06)'
    );
  });

  it('should render correct styled for disabled outline button when the passed disabled', () => {
    const text = 'test text';
    const { getByTestId } = render(
      <StyledButton disabled variant="outline" testId="button-test">
        {text}
      </StyledButton>
    );

    expect(getByTestId('button-test')).toHaveStyleRule(
      'background',
      'rgba(0,0,0,0)'
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

        expect(button).toHaveStyleRule('background', 'var(--colors-primary)');
        expect(button).toHaveStyleRule('background', '#004165', {
          target: ':hover',
        });
        expect(button).toHaveStyleRule('background', '#002032', {
          target: ':active',
        });
        expect(button).toHaveStyleRule('border-color', 'var(--colors-primary)');
        expect(button).toHaveStyleRule('color', 'var(--colors-neutral08)');
      });

      it('outline button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton variant="outline" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', 'rgba(0,0,0,0)');
        expect(button).toHaveStyleRule('background', '#e5eff4', {
          target: ':hover',
        });
        expect(button).toHaveStyleRule('background', '#b2cfe0', {
          target: ':active',
        });
        expect(button).toHaveStyleRule('color', 'var(--colors-primary)');
      });

      it('link button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton variant="link" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', 'rgba(0,0,0,0)');
        expect(button).toHaveStyleRule('color', 'var(--colors-primary)');
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

        expect(button).toHaveStyleRule('background', 'var(--colors-primary)');
        expect(button).toHaveStyleRule(
          'background',
          darken(0.1, 'var(--colors-primary)'),
          { target: ':hover' }
        );
        expect(button).toHaveStyleRule(
          'background',
          darken(0.2, 'var(--colors-primary)'),
          { target: ':active' }
        );
        expect(button).toHaveStyleRule('border-color', 'var(--colors-primary)');
        expect(button).toHaveStyleRule('color', 'var(--colors-neutral08)');
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

        expect(button).toHaveStyleRule('background', 'var(--colors-neutral08)');
        expect(button).toHaveStyleRule(
          'background',
          darken(0.1, 'var(--colors-neutral08)'),
          { target: ':hover' }
        );
        expect(button).toHaveStyleRule(
          'background',
          darken(0.2, 'var(--colors-neutral08)'),
          { target: ':active' }
        );
        expect(button).toHaveStyleRule(
          'border-color',
          'var(--colors-neutral05)'
        );
        expect(button).toHaveStyleRule('color', 'var(--colors-neutral)');
      });

      it('success button', () => {
        const text = 'test text';
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

        expect(button).toHaveStyleRule('background', 'var(--colors-success)');
        expect(button).toHaveStyleRule(
          'background',
          darken(0.1, cssVar('--colors-success')),
          { target: ':hover' }
        );
        expect(button).toHaveStyleRule(
          'background',
          darken(0.2, cssVar('--colors-success')),
          { target: ':active' }
        );
        expect(button).toHaveStyleRule('border-color', 'var(--colors-success)');
        expect(button).toHaveStyleRule('color', 'var(--colors-neutral08)');
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

        expect(button).toHaveStyleRule('background', 'var(--colors-danger)');
        expect(button).toHaveStyleRule(
          'background',
          darken(0.1, cssVar('--colors-danger')),
          { target: ':hover' }
        );
        expect(button).toHaveStyleRule(
          'background',
          darken(0.2, cssVar('--colors-danger')),
          { target: ':active' }
        );
        expect(button).toHaveStyleRule('border-color', 'var(--colors-danger)');
        expect(button).toHaveStyleRule('color', 'var(--colors-neutral08)');
      });

      it('marketing button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton color="marketing" testId="button-test">
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', 'var(--colors-pop04)');
        expect(button).toHaveStyleRule(
          'background',
          lighten(0.1, cssVar('--colors-pop04')),
          { target: ':hover' }
        );
        expect(button).toHaveStyleRule(
          'background',
          lighten(0.2, cssVar('--colors-pop04')),
          { target: ':active' }
        );
        expect(button).toHaveStyleRule('border-color', 'var(--colors-pop04)');
        expect(button).toHaveStyleRule('color', 'var(--colors-foundation02)');
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

        expect(button).toHaveStyleRule('background', 'var(--colors-neutral08)');
        expect(button).toHaveStyleRule(
          'border-color',
          'var(--colors-neutral08)'
        );
        expect(button).toHaveStyleRule('color', 'var(--colors-primary)');
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

        expect(button).toHaveStyleRule('background', 'var(--colors-neutral08)');
        expect(button).toHaveStyleRule(
          'border-color',
          'var(--colors-neutral08)'
        );
        expect(button).toHaveStyleRule('color', 'var(--colors-neutral)');
      });

      it('success button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton
            isInverse
            color="success"
            theme="magma"
            variant="solid"
            testId="button-test"
          >
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule('background', 'var(--colors-neutral08)');
        expect(button).toHaveStyleRule(
          'border-color',
          'var(--colors-neutral08)'
        );
        expect(button).toHaveStyleRule('color', 'var(--colors-success)');
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

        expect(button).toHaveStyleRule('background', 'var(--colors-neutral08)');
        expect(button).toHaveStyleRule(
          'border-color',
          'var(--colors-neutral08)'
        );
        expect(button).toHaveStyleRule('color', 'var(--colors-danger)');
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
          'var(--typeScale-size03-fontSize)'
        );
        expect(button).toHaveStyleRule(
          'padding',
          'var(--spaceScale-spacing04) var(--spaceScale-spacing05)'
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
          'var(--typeScale-size01-fontSize)'
        );
        expect(button).toHaveStyleRule(
          'padding',
          'var(--spaceScale-spacing02) var(--spaceScale-spacing03)'
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
          'var(--typeScale-size04-fontSize)'
        );
        expect(button).toHaveStyleRule(
          'padding',
          'var(--spaceScale-spacing04) var(--spaceScale-spacing06)'
        );
      });

      it('disabled inverse outline button', () => {
        const text = 'test text';
        const { getByTestId } = render(
          <StyledButton
            disabled
            isInverse
            variant="outline"
            testId="button-test"
          >
            {text}
          </StyledButton>
        );
        const button = getByTestId('button-test');

        expect(button).toHaveStyleRule(
          'border-color',
          'var(--colors-disabledInverseText)'
        );
        expect(button).toHaveStyleRule(
          'color',
          'var(--colors-disabledInverseText)'
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

        expect(button).toHaveStyleRule('border-radius', 'var(--borderRadius)');
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
          'var(--borderRadius) 0 0 var(--borderRadius)'
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
          '0 var(--borderRadius} var(--borderRadius) 0'
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
      expect(button).toHaveStyleRule('height', 'var(--spaceScale-spacing07)');
      expect(button).toHaveStyleRule('width', 'var(--spaceScale-spacing07)');
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
      expect(button).toHaveStyleRule('height', 'var(--spaceScale-spacing09)');
      expect(button).toHaveStyleRule('width', 'var(--spaceScale-spacing09)');
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
      expect(button).toHaveStyleRule('height', 'var(--spaceScale-spacing11)');
      expect(button).toHaveStyleRule('width', 'var(--spaceScale-spacing11)');
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
