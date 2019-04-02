import React from 'react';
import { axe } from 'jest-axe';
import { Button } from '.';
import { render, cleanup } from 'react-testing-library';
import {
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonTextTransform,
  ButtonVariant,
  ButtonIconPostition
} from '../StyledButton';
import { CheckIcon } from '../Icon/types/CheckIcon';
import { magma } from '../../theme/magma';
import { ThemeProvider } from 'emotion-theming';

const TEXT = 'Test Text';

const BASE_BUTTON_PROPS = {
  onClick: jest.fn()
};

const ICON_ONLY_BUTTON_PROPS = {
  onClick: jest.fn(),
  icon: <CheckIcon />,
  ariaLabel: 'Check Icon'
};

const ICON_WITH_TEXT_BUTTON_PROPS = {
  onClick: jest.fn(),
  icon: <CheckIcon />,
  ariaLabel: 'Check Icon',
  iconPosition: ButtonIconPostition.right
};

const renderBasicButton = (myProps = {}) => {
  const props = {
    ...BASE_BUTTON_PROPS,
    ...myProps
  };

  return render(
    <ThemeProvider theme={magma}>
      <Button {...props}>{TEXT}</Button>
    </ThemeProvider>
  );
};

const renderIconOnlyButton = (myProps = {}) => {
  const props = {
    ...ICON_ONLY_BUTTON_PROPS,
    ...myProps
  };

  return render(
    <ThemeProvider theme={magma}>
      <Button {...props} />
    </ThemeProvider>
  );
};

const renderIconWithTextButton = (myProps = {}) => {
  const props = {
    ...ICON_WITH_TEXT_BUTTON_PROPS,
    ...myProps
  };

  return render(
    <ThemeProvider theme={magma}>
      <Button {...props}>{TEXT}</Button>
    </ThemeProvider>
  );
};

describe('Button', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Base Button', () => {
    it('should render a button with the passed in text', () => {
      const { getByText } = renderBasicButton();

      expect(getByText(TEXT)).not.toBeNull();
    });

    describe('Snapshot', () => {
      it('should render with updated color', () => {
        const { container } = render(
          <ThemeProvider theme={magma}>
            <Button {...BASE_BUTTON_PROPS} color={ButtonColor.secondary}>
              {TEXT}
            </Button>
          </ThemeProvider>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with updated shape', () => {
        const { container } = render(
          <ThemeProvider theme={magma}>
            <Button {...BASE_BUTTON_PROPS} shape={ButtonShape.round}>
              {TEXT}
            </Button>
          </ThemeProvider>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with small size', () => {
        const { container } = render(
          <ThemeProvider theme={magma}>
            <Button {...BASE_BUTTON_PROPS} size={ButtonSize.small}>
              {TEXT}
            </Button>
          </ThemeProvider>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with large size', () => {
        const { container } = render(
          <ThemeProvider theme={magma}>
            <Button {...BASE_BUTTON_PROPS} size={ButtonSize.large}>
              {TEXT}
            </Button>
          </ThemeProvider>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with updated textTransform', () => {
        const { container } = render(
          <ThemeProvider theme={magma}>
            <Button
              {...BASE_BUTTON_PROPS}
              textTransform={ButtonTextTransform.none}
            >
              {TEXT}
            </Button>
          </ThemeProvider>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with updated variant', () => {
        const { container } = render(
          <ThemeProvider theme={magma}>
            <Button {...BASE_BUTTON_PROPS} variant={ButtonVariant.outline}>
              {TEXT}
            </Button>
          </ThemeProvider>
        );

        expect(container).toMatchSnapshot();
      });
    });

    it('Does not violate accessibility standards', () => {
      const { container } = renderBasicButton();
      return axe(container.innerHTML).then(result => {
        return expect(result).toHaveNoViolations();
      });
    });
  });

  describe('Icon Only Button', () => {
    it('should render an icon only button with passed in icon', () => {
      const { getByLabelText } = renderIconOnlyButton();

      expect(getByLabelText(ICON_ONLY_BUTTON_PROPS.ariaLabel)).not.toBeNull();
    });

    describe('Size', () => {
      it('Large', () => {
        const { container } = renderIconOnlyButton({ size: ButtonSize.large });

        expect(container.querySelector('svg')).toHaveAttribute('height', '24');
        expect(container.querySelector('svg')).toHaveAttribute('width', '24');
      });

      it('Medium', () => {
        const { container } = renderIconOnlyButton({ size: ButtonSize.medium });

        expect(container.querySelector('svg')).toHaveAttribute('height', '18');
        expect(container.querySelector('svg')).toHaveAttribute('width', '18');
      });

      it('Small', () => {
        const { container } = renderIconOnlyButton({ size: ButtonSize.small });

        expect(container.querySelector('svg')).toHaveAttribute('height', '14');
        expect(container.querySelector('svg')).toHaveAttribute('width', '14');
      });
    });

    describe('Snapshot', () => {
      it('should render with updated color', () => {
        const { container } = renderIconOnlyButton({
          color: ButtonColor.secondary
        });

        expect(container).toMatchSnapshot();
      });

      it('should render with updated shape', () => {
        const { container } = renderIconOnlyButton({ shape: ButtonShape.fill });

        expect(container).toMatchSnapshot();
      });

      it('should render with small size', () => {
        const { container } = renderIconOnlyButton({ size: ButtonSize.small });

        expect(container).toMatchSnapshot();
      });

      it('should render with large size', () => {
        const { container } = renderIconOnlyButton({ size: ButtonSize.small });

        expect(container).toMatchSnapshot();
      });

      it('should render with updated variant', () => {
        const { container } = renderIconOnlyButton({
          variant: ButtonVariant.outline
        });

        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('Icon With Text Button', () => {
    it('should render an icon with text button with passed in icon and text', () => {
      const { getByText, container } = renderIconWithTextButton();

      expect(getByText(TEXT)).not.toBeNull();
      expect(container.querySelector('svg')).not.toBeNull();

      expect(container.querySelector('button').childNodes[0].nodeName).toEqual(
        'SPAN'
      );
      expect(container.querySelector('button').childNodes[1].nodeName).toEqual(
        'svg'
      );
    });

    it('should change the icon position', () => {
      const { container } = renderIconWithTextButton({
        iconPosition: ButtonIconPostition.left
      });

      expect(container.querySelector('button').childNodes[0].nodeName).toEqual(
        'svg'
      );
      expect(container.querySelector('button').childNodes[1].nodeName).toEqual(
        'SPAN'
      );
      expect(container.querySelector('span')).toHaveStyleRule(
        'padding-left',
        '10px'
      );
    });

    it('should change padding based on position and size', () => {
      const { container } = renderIconWithTextButton({
        iconPosition: ButtonIconPostition.left,
        size: ButtonSize.large
      });

      expect(container.querySelector('span')).toHaveStyleRule(
        'padding-left',
        '15px'
      );
    });

    describe('Size', () => {
      it('Large', () => {
        const { container } = renderIconWithTextButton({
          size: ButtonSize.large
        });

        expect(container.querySelector('svg')).toHaveAttribute('height', '20');
        expect(container.querySelector('svg')).toHaveAttribute('width', '20');
      });

      it('Medium', () => {
        const { container } = renderIconWithTextButton({
          size: ButtonSize.medium
        });

        expect(container.querySelector('svg')).toHaveAttribute('height', '16');
        expect(container.querySelector('svg')).toHaveAttribute('width', '16');
      });

      it('Small', () => {
        const { container } = renderIconWithTextButton({
          size: ButtonSize.small
        });

        expect(container.querySelector('svg')).toHaveAttribute('height', '12');
        expect(container.querySelector('svg')).toHaveAttribute('width', '12');
      });
    });

    describe('Snapshot', () => {
      it('should render with updated color', () => {
        const { container } = renderIconWithTextButton({
          color: ButtonColor.secondary
        });

        expect(container).toMatchSnapshot();
      });

      it('should render with updated shape', () => {
        const { container } = renderIconWithTextButton({
          shape: ButtonShape.fill
        });

        expect(container).toMatchSnapshot();
      });

      it('should render with small size', () => {
        const { container } = renderIconWithTextButton({
          size: ButtonSize.small
        });

        expect(container).toMatchSnapshot();
      });

      it('should render with large size', () => {
        const { container } = renderIconWithTextButton({
          size: ButtonSize.small
        });

        expect(container).toMatchSnapshot();
      });

      it('should render with updated text transform', () => {
        const { container } = renderIconWithTextButton({
          textTransform: ButtonTextTransform.none
        });

        expect(container).toMatchSnapshot();
      });

      it('should render with updated variant', () => {
        const { container } = renderIconWithTextButton({
          variant: ButtonVariant.outline
        });

        expect(container).toMatchSnapshot();
      });
    });
  });
});
