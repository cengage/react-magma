import React from 'react';
import { axe } from '../../../axe-helper';
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
import { magma } from '../../theme/magma';

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

  it('A button in the loading state does not violate detectible accessibility standards', () => {
    const icon = <CheckIcon />;
    const { container } = render(
      <IconButton icon={icon} isLoading>
        click
      </IconButton>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('shows a spinner icon when isLoading is true', () => {
    const icon = <CheckIcon />;
    const buttonText = 'Test';
    const testId = 'test-id';
    const spinnerTestId = `${testId}-spinner`;
    const { getByTestId, queryByText, rerender, queryByTestId } = render(
      <IconButton icon={icon} testId={testId} isLoading>
        {buttonText}
      </IconButton>
    );
    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByTestId(spinnerTestId)).toBeInTheDocument();
    expect(queryByText(buttonText)).not.toBeVisible();
    rerender(
      <IconButton icon={icon} testId={testId} isLoading={false}>
        {buttonText}
      </IconButton>
    );
    expect(queryByTestId(spinnerTestId)).not.toBeInTheDocument();
    expect(getByTestId(testId)).toBeInTheDocument();
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

    it('shows a spinner icon when isLoading is true', () => {
      const icon = <CheckIcon />;
      const buttonText = 'Test';
      const testId = 'test-id';
      const spinnerTestId = `${testId}-spinner`;
      const { getByTestId, rerender, queryByTestId } = render(
        <IconButton
          icon={icon}
          testId={testId}
          isLoading
          aria-label={buttonText}
        />
      );
      expect(getByTestId(testId)).toBeInTheDocument();
      expect(getByTestId(spinnerTestId)).toBeInTheDocument();

      rerender(
        <IconButton
          icon={icon}
          testId={testId}
          isLoading={false}
          aria-label={buttonText}
        />
      );
      expect(queryByTestId(spinnerTestId)).not.toBeInTheDocument();
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
        expect(container.querySelector('svg')).toHaveAttribute(
          'height',
          magma.iconSizes.large.toString()
        );
        expect(container.querySelector('svg')).toHaveAttribute(
          'width',
          magma.iconSizes.large.toString()
        );
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
        expect(container.querySelector('svg')).toHaveAttribute(
          'height',
          magma.iconSizes.medium.toString()
        );
        expect(container.querySelector('svg')).toHaveAttribute(
          'width',
          magma.iconSizes.medium.toString()
        );
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
        expect(container.querySelector('svg')).toHaveAttribute(
          'height',
          magma.iconSizes.small.toString()
        );
        expect(container.querySelector('svg')).toHaveAttribute(
          'width',
          magma.iconSizes.small.toString()
        );
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
            variant={ButtonVariant.solid}
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

      expect(getByText(buttonText).previousElementSibling).toHaveAttribute(
        'viewBox'
      );
    });

    it('should change padding based on position and size', () => {
      const icon = <CheckIcon />;
      const { getByText } = render(
        <IconButton
          icon={icon}
          iconPosition={ButtonIconPosition.left}
          size={ButtonSize.large}
        >
          Click me
        </IconButton>
      );

      expect(getByText('Click me')).toHaveStyleRule(
        'padding-left',
        magma.spaceScale.spacing05
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

        expect(svg).toHaveAttribute('height', '32');
        expect(svg).toHaveAttribute('width', '32');
      });

      it('Medium', () => {
        const icon = <CheckIcon />;
        const { container } = render(
          <IconButton icon={icon} size={ButtonSize.medium}>
            click
          </IconButton>
        );

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('height', '24');
        expect(svg).toHaveAttribute('width', '24');
      });

      it('Small', () => {
        const icon = <CheckIcon />;
        const { container } = render(
          <IconButton icon={icon} size={ButtonSize.small}>
            click
          </IconButton>
        );

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('height', '20');
        expect(svg).toHaveAttribute('width', '20');
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
            variant={ButtonVariant.solid}
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
