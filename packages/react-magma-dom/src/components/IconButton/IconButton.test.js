/// <reference types="jest-dom/extend-expect"/>
import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import {
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonTextTransform,
  ButtonVariant,
} from '../Button';
import { IconButton, ButtonIconPosition } from '.';
import { CheckIcon } from 'react-magma-icons';

describe('IconButton', () => {
  it('An icon-only button does not violate detectible accessibility standards', () => {
    const icon = <CheckIcon />;
    const { container } = render(
      <IconButton icon={icon} aria-label="Click me" />
    );
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  describe('Icon Only Button', () => {
    it('should render an icon only button with passed in icon', () => {
      const icon = <CheckIcon />;
      const buttonLabel = 'check icon';
      const { getByLabelText } = render(
        <IconButton icon={icon} aria-label={buttonLabel} />
      );

      expect(getByLabelText(buttonLabel)).toBeInTheDocument();
    });

    describe('Size', () => {
      it('Large', () => {
        const icon = <CheckIcon id="testId" />;
        const { container } = render(
          <IconButton
            aria-label="Check Icon"
            id="testId"
            icon={icon}
            iconPosition={ButtonIconPosition.right}
            size={ButtonSize.large}
          />
        );
        expect(container.querySelector('svg')).toHaveAttribute('height', '24');
        expect(container.querySelector('svg')).toHaveAttribute('width', '24');
      });

      it('Medium', () => {
        const icon = <CheckIcon id="testId" />;
        const { container } = render(
          <IconButton
            aria-label="Check Icon"
            id="testId"
            icon={icon}
            iconPosition={ButtonIconPosition.right}
            size={ButtonSize.medium}
          />
        );
        expect(container.querySelector('svg')).toHaveAttribute('height', '18');
        expect(container.querySelector('svg')).toHaveAttribute('width', '18');
      });

      it('Small', () => {
        const icon = <CheckIcon id="testId" />;
        const { container } = render(
          <IconButton
            aria-label="Check Icon"
            id="testId"
            icon={icon}
            iconPosition={ButtonIconPosition.right}
            size={ButtonSize.small}
          />
        );
        expect(container.querySelector('svg')).toHaveAttribute('height', '14');
        expect(container.querySelector('svg')).toHaveAttribute('width', '14');
      });
    });

    describe('Snapshot', () => {
      it('should render with updated color', () => {
        const icon = <CheckIcon id="testId" />;
        const { container } = render(
          <IconButton
            aria-label="Check Icon"
            id="testId"
            icon={icon}
            iconPosition={ButtonIconPosition.right}
            color={ButtonColor.secondary}
          />
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with updated shape', () => {
        const icon = <CheckIcon id="testId" />;
        const { container } = render(
          <IconButton
            aria-label="Check Icon"
            id="testId"
            icon={icon}
            iconPosition={ButtonIconPosition.right}
            shape={ButtonShape.fill}
          />
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with small size', () => {
        const icon = <CheckIcon id="testId" />;
        const { container } = render(
          <IconButton
            aria-label="Check Icon"
            id="testId"
            icon={icon}
            iconPosition={ButtonIconPosition.right}
            size={ButtonSize.small}
          />
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with large size', () => {
        const icon = <CheckIcon id="testId" />;
        const { container } = render(
          <IconButton
            aria-label="Check Icon"
            id="testId"
            icon={icon}
            iconPosition={ButtonIconPosition.right}
            size={ButtonSize.large}
          />
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with updated variant', () => {
        const icon = <CheckIcon id="testId" />;
        const { container } = render(
          <IconButton
            aria-label="Check Icon"
            id="testId"
            icon={icon}
            iconPosition={ButtonIconPosition.right}
            variant={ButtonVariant.outline}
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    it('should render an icon  with custom size', () => {
      const icon = <CheckIcon size={5} />;
      const { container } = render(
        <IconButton icon={icon} size={ButtonSize.medium} />
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('height', '5');
      expect(svg).toHaveAttribute('width', '5');
    });
  });

  describe('Icon With Text Button', () => {
    it('should find element by testId', () => {
      const testId = 'test-id';
      const icon = <CheckIcon />;
      const { getByTestId } = render(
        <IconButton icon={icon} testId={testId}>
          click
        </IconButton>
      );

      expect(getByTestId(testId)).toBeInTheDocument();
    });

    it('should render an icon with text button with passed in icon and text', () => {
      const buttonText = 'Click me';
      const iconTestId = 'check-icon';
      const icon = <CheckIcon testId={iconTestId} />;
      const { getByTestId, getByText } = render(
        <IconButton icon={icon}>{buttonText}</IconButton>
      );
      expect(getByTestId(iconTestId, { selector: 'svg' })).toBeInTheDocument();
      expect(getByText(buttonText)).toBeInTheDocument();
    });

    it('should change the icon position', () => {
      const buttonText = 'Click me';
      const icon = <CheckIcon />;

      const { container, getByText } = render(
        <IconButton iconPosition={ButtonIconPosition.left} icon={icon}>
          {buttonText}
        </IconButton>
      );

      const [firstEl, secondEl] = container.firstChild.childNodes;
      expect(firstEl.nodeName).toBe('svg');
      expect(getByText(buttonText)).toBe(secondEl);
    });

    it('should change padding based on position and size', () => {
      const icon = <CheckIcon />;
      const { container } = render(
        <IconButton
          icon={icon}
          iconPosition={ButtonIconPosition.left}
          size={ButtonSize.large}
        >
          Click me
        </IconButton>
      );

      expect(container.querySelector('span')).toHaveStyleRule(
        'padding-left',
        '15px'
      );
    });

    describe('Size', () => {
      it('Large', () => {
        const icon = <CheckIcon />;
        const { container } = render(
          <IconButton icon={icon} size={ButtonSize.large}>
            click
          </IconButton>
        );

        const svg = container.querySelector('svg');

        expect(svg).toHaveAttribute('height', '20');
        expect(svg).toHaveAttribute('width', '20');
      });

      it('Medium', () => {
        const icon = <CheckIcon />;
        const { container } = render(
          <IconButton icon={icon} size={ButtonSize.medium}>
            click
          </IconButton>
        );

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('height', '16');
        expect(svg).toHaveAttribute('width', '16');
      });

      it('Small', () => {
        const icon = <CheckIcon />;
        const { container } = render(
          <IconButton icon={icon} size={ButtonSize.small}>
            click
          </IconButton>
        );

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('height', '12');
        expect(svg).toHaveAttribute('width', '12');
      });
    });

    describe('Snapshot', () => {
      it('should render with updated color', () => {
        const icon = <CheckIcon id="testId" />;
        const { container } = render(
          <IconButton
            aria-label="Check Icon"
            id="testId"
            icon={icon}
            iconPosition={ButtonIconPosition.right}
            color={ButtonColor.secondary}
          >
            Test Text
          </IconButton>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with updated shape', () => {
        const icon = <CheckIcon id="testId" />;
        const { container } = render(
          <IconButton
            aria-label="Check Icon"
            id="testId"
            icon={icon}
            iconPosition={ButtonIconPosition.right}
            shape={ButtonShape.fill}
          >
            Test Text
          </IconButton>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with small size', () => {
        const icon = <CheckIcon id="testId" />;
        const { container } = render(
          <IconButton
            aria-label="Check Icon"
            id="testId"
            icon={icon}
            iconPosition={ButtonIconPosition.right}
            size={ButtonSize.small}
          >
            Test Text
          </IconButton>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with medium size', () => {
        const icon = <CheckIcon id="testId" />;
        const { container } = render(
          <IconButton
            aria-label="Check Icon"
            id="testId"
            icon={icon}
            iconPosition={ButtonIconPosition.right}
            size={ButtonSize.medium}
          >
            Test Text
          </IconButton>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with large size', () => {
        const icon = <CheckIcon id="testId" />;
        const { container } = render(
          <IconButton
            aria-label="Check Icon"
            id="testId"
            icon={icon}
            iconPosition={ButtonIconPosition.right}
            size={ButtonSize.large}
          >
            Test Text
          </IconButton>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with updated text transform', () => {
        const icon = <CheckIcon id="testId" />;
        const { container } = render(
          <IconButton
            aria-label="Check Icon"
            id="testId"
            icon={icon}
            iconPosition={ButtonIconPosition.right}
            textTransform={ButtonTextTransform.none}
          >
            Test Text
          </IconButton>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with updated variant', () => {
        const icon = <CheckIcon id="testId" />;
        const { container } = render(
          <IconButton
            aria-label="Check Icon"
            id="testId"
            icon={icon}
            iconPosition={ButtonIconPosition.right}
            variant={ButtonVariant.outline}
          >
            Test Text
          </IconButton>
        );

        expect(container).toMatchSnapshot();
      });
    });

    it('should render an icon  with custom size', () => {
      const icon = <CheckIcon size={5} />;
      const { container } = render(
        <IconButton icon={icon} size={ButtonSize.medium}>
          click
        </IconButton>
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('height', '5');
      expect(svg).toHaveAttribute('width', '5');
    });
  });
});
