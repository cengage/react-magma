import React from 'react';

import { act, fireEvent, render } from '@testing-library/react';
import { transparentize } from 'polished';
import { CheckIcon, SettingsIcon } from 'react-magma-icons';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { ButtonSize, ButtonTextTransform } from '../Button';

import { ToggleButton } from '.';

const TEXT = 'Test Text';
const testId = 'test-id';
const icon = <SettingsIcon />;
const value = '1';

describe('ToggleButton', () => {
  it('Should find element by testId', () => {
    const { getByTestId } = render(
      <ToggleButton value={value} testId={testId}>
        {TEXT}
      </ToggleButton>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Icon only buttons are compliant with accessibility', () => {
    const { container } = render(
      <ToggleButton value={value} icon={icon} aria-label="Icon Button" />
    );
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('Text only buttons are compliant with accessibility', () => {
    const { container } = render(
      <ToggleButton value={value}>Text Only Button</ToggleButton>
    );
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  describe('Styles', () => {
    it('Icon only styling', () => {
      const { getByTestId } = render(
        <ToggleButton value={value} icon={icon} testId={testId} />
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('border-color', magma.colors.neutral300);
      expect(button).toHaveStyleRule('border', '1px solid');
      expect(button).toHaveStyleRule(
        'border-radius',
        magma.spaceScale.spacing03
      );
      expect(button).toHaveStyleRule('height', magma.spaceScale.spacing09);
      expect(button).toHaveStyleRule('width', magma.spaceScale.spacing09);
    });

    it('Text only styling', () => {
      const { getByTestId } = render(
        <ToggleButton value={value} testId={testId}>
          {TEXT}
        </ToggleButton>
      );
      const button = getByTestId(testId);

      expect(getByTestId(testId).querySelector('svg')).not.toBeInTheDocument();
      expect(button).toHaveStyleRule('min-width', magma.spaceScale.spacing13);
      expect(button).toHaveStyleRule('width', 'auto');
    });

    it('Text and icon styling', () => {
      const { getByTestId, getByText } = render(
        <ToggleButton value={value} icon={icon} testId={testId}>
          {TEXT}
        </ToggleButton>
      );
      const button = getByTestId(testId);

      expect(getByTestId(testId).querySelector('svg')).toBeInTheDocument();
      expect(getByText(TEXT)).toHaveStyleRule(
        'padding-left',
        magma.spaceScale.spacing03
      );
      expect(button).toHaveStyleRule('min-width', 'auto');
    });

    it('Consistent border styling on disabled', () => {
      const { getByTestId, rerender } = render(
        <ToggleButton value={value} testId={testId}>
          {TEXT}
        </ToggleButton>
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('border', '1px solid');
      expect(button).toHaveStyleRule('border-color', magma.colors.neutral300);

      rerender(
        <ToggleButton value={value} testId={testId} disabled>
          {TEXT}
        </ToggleButton>
      );

      expect(button).toHaveStyleRule('border', '1px solid');
      expect(button).toHaveStyleRule('border-color', magma.colors.neutral300);
    });

    it('Supports small icon sizes', () => {
      const { getByTestId } = render(
        <ToggleButton
          value={value}
          size={ButtonSize.small}
          icon={icon}
          testId={testId}
        />
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('width', magma.spaceScale.spacing07);
      expect(button).toHaveStyleRule('height', magma.spaceScale.spacing07);
    });

    it('Supports medium icon sizes', () => {
      const { getByTestId } = render(
        <ToggleButton
          value={value}
          size={ButtonSize.medium}
          icon={icon}
          testId={testId}
        />
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('width', magma.spaceScale.spacing09);
      expect(button).toHaveStyleRule('height', magma.spaceScale.spacing09);
    });

    it('Supports large icon sizes', () => {
      const { getByTestId } = render(
        <ToggleButton
          value={value}
          size={ButtonSize.large}
          icon={icon}
          testId={testId}
        />
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('width', magma.spaceScale.spacing11);
      expect(button).toHaveStyleRule('height', magma.spaceScale.spacing11);
    });

    it('Has a disabled state', () => {
      const { getByTestId } = render(
        <ToggleButton value={value} disabled icon={icon} testId={testId} />
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('cursor', 'not-allowed');
      expect(button).toHaveStyleRule('color', magma.colors.neutral500);
      expect(button).toHaveStyleRule('background', magma.colors.neutral0);
      expect(button).toHaveStyleRule('border', '1px solid');
      expect(button).toHaveStyleRule('border-color', magma.colors.neutral300);
    });

    it('Has a selected disabled state', () => {
      const { getByTestId } = render(
        <ToggleButton
          value={value}
          disabled
          isChecked
          icon={icon}
          testId={testId}
        />
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('color', magma.colors.neutral500);
      expect(button).toHaveStyleRule(
        'background',
        transparentize(0.25, magma.colors.neutral200)
      );
      expect(button).toHaveStyleRule('border', '1px solid transparent');
    });

    it('Supports text transform', () => {
      const text = 'Text Transform';

      const { getByTestId, rerender } = render(
        <ToggleButton
          value={value}
          icon={icon}
          testId={testId}
          textTransform={ButtonTextTransform.uppercase}
        >
          {text}
        </ToggleButton>
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('text-transform', 'uppercase');

      rerender(
        <ToggleButton
          value={value}
          icon={icon}
          testId={testId}
          textTransform={ButtonTextTransform.none}
        >
          {text}
        </ToggleButton>
      );

      expect(button).toHaveStyleRule('text-transform', 'none');
    });
  });

  describe('States', () => {
    it('Should have a toggled state', () => {
      const { getByTestId } = render(
        <ToggleButton value={value} testId={testId} icon={icon} />
      );
      const button = getByTestId(testId);
      expect(button).toHaveStyleRule('background', magma.colors.neutral0);
      expect(button).toHaveStyleRule('color', magma.colors.brand.navy);
      expect(button).toHaveStyleRule('border', '1px solid');
      expect(button).toHaveStyleRule('border-color', magma.colors.neutral300);
      fireEvent.click(getByTestId(testId));

      expect(button).toHaveStyleRule('background', magma.colors.neutral700);
      expect(button).toHaveStyleRule('color', magma.colors.neutral0);
      expect(button).toHaveStyleRule('border', '1px solid transparent');
      expect(button).toHaveStyleRule('border-radius', magma.borderRadius);
      expect(button).toHaveStyleRule('background', magma.colors.neutral800, {
        target: ':not(:disabled):hover',
      });
      expect(button).toHaveStyleRule('color', magma.colors.neutral0, {
        target: ':not(:disabled):hover',
      });
      expect(button).toHaveStyleRule('background', magma.colors.neutral800, {
        target: ':not(:disabled):focus',
      });
      expect(button).toHaveStyleRule('color', magma.colors.neutral0, {
        target: ':not(:disabled):focus',
      });
      expect(button).toHaveStyleRule('outline-offset', '2px', {
        target: ':not(:disabled):focus',
      });
      expect(button).toHaveStyleRule('background', magma.colors.neutral900, {
        target: ':not(:disabled):active',
      });
      expect(button).toHaveStyleRule('color', magma.colors.neutral0, {
        target: ':not(:disabled):active',
      });
      expect(button).toHaveAttribute('aria-checked', 'true');
    });

    it('Should have an untoggled state', () => {
      const { getByTestId } = render(
        <ToggleButton value={value} testId={testId} icon={icon} />
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('background', magma.colors.neutral0);
      expect(button).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral200),
        {
          target: ':not(:disabled):hover',
        }
      );
      expect(button).toHaveStyleRule('color', magma.colors.brand.navy, {
        target: ':not(:disabled):hover',
      });
      expect(button).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral200),
        { target: ':not(:disabled):focus' }
      );
      expect(button).toHaveStyleRule('color', magma.colors.brand.navy, {
        target: ':not(:disabled):focus',
      });
      expect(button).toHaveStyleRule(
        'background',
        transparentize(0.25, magma.colors.neutral200),
        { target: ':not(:disabled):active' }
      );
      expect(button).toHaveStyleRule('color', magma.colors.brand.navy, {
        target: ':not(:disabled):active',
      });
      expect(button).toHaveStyleRule('border', '1px solid');
      expect(button).toHaveStyleRule('border-color', magma.colors.neutral300);
      expect(button).toHaveAttribute('aria-checked', 'false');
    });

    it('Should have an inverse toggled state', () => {
      const { getByTestId } = render(
        <ToggleButton value={value} isInverse testId={testId} icon={icon} />
      );
      const button = getByTestId(testId);
      expect(button).toHaveStyleRule('background', 'none');
      expect(button).toHaveStyleRule('border', '1px solid');
      expect(button).toHaveStyleRule('border-color', magma.colors.neutral800);
      expect(button).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral900),
        {
          target: ':not(:disabled):hover',
        }
      );
      expect(button).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral900),
        { target: ':not(:disabled):focus' }
      );
      expect(button).toHaveStyleRule(
        'background',
        transparentize(0.25, magma.colors.neutral900),
        { target: ':not(:disabled):active' }
      );
      fireEvent.click(getByTestId(testId));

      expect(button).toHaveStyleRule('background', magma.colors.neutral700);
      expect(button).toHaveStyleRule('color', magma.colors.neutral0);
      expect(button).toHaveStyleRule('border', '1px solid transparent');
      expect(button).toHaveStyleRule('background', magma.colors.neutral800, {
        target: ':not(:disabled):hover',
      });
      expect(button).toHaveStyleRule('color', magma.colors.neutral0, {
        target: ':not(:disabled):hover',
      });
      expect(button).toHaveStyleRule('background', magma.colors.neutral800, {
        target: ':not(:disabled):focus',
      });
      expect(button).toHaveStyleRule('color', magma.colors.neutral0, {
        target: ':not(:disabled):focus',
      });
      expect(button).toHaveStyleRule('background', magma.colors.neutral900, {
        target: ':not(:disabled):active',
      });
      expect(button).toHaveStyleRule('color', magma.colors.neutral0, {
        target: ':not(:disabled):active',
      });
    });

    it('Should have inverse disabled states', () => {
      const { getByTestId } = render(
        <>
          <ToggleButton
            value="off"
            disabled
            isInverse
            testId={`${testId}-off`}
            icon={icon}
          />
          <ToggleButton
            value="on"
            disabled
            isChecked
            isInverse
            testId={`${testId}-on`}
            icon={icon}
          />
        </>
      );

      const offButton = getByTestId(`${testId}-off`);
      expect(offButton).toHaveStyleRule('background', 'none');
      expect(offButton).toHaveStyleRule('color', magma.colors.neutral600);
      expect(offButton).toHaveStyleRule('border', '1px solid');
      expect(offButton).toHaveStyleRule(
        'border-color',
        magma.colors.neutral800
      );

      const onButton = getByTestId(`${testId}-on`);
      expect(onButton).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral900)
      );
      expect(onButton).toHaveStyleRule('color', magma.colors.neutral600);
      expect(onButton).toHaveStyleRule('border', '1px solid transparent');
    });

    it('Should have an untoggled state after being toggled', () => {
      const { getByTestId } = render(
        <ToggleButton value={value} testId={testId} icon={icon} />
      );
      const button = getByTestId(testId);

      fireEvent.click(button);

      expect(button).toHaveStyleRule('background', magma.colors.neutral700);
      fireEvent.click(button);

      expect(button).toHaveStyleRule('background', magma.colors.neutral0);

      expect(button).toHaveAttribute('aria-checked', 'false');
    });

    it('Should have a pre-selected toggled state', () => {
      const { getByTestId } = render(
        <ToggleButton value={value} isChecked testId={testId} icon={icon} />
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('background', magma.colors.neutral700);
      expect(button).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Callback', () => {
    it('Should call the onClick function when a button is clicked', () => {
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <ToggleButton value={value} testId={testId} onClick={onClickMock} />
      );
      const button = getByTestId(testId);
      fireEvent.click(button);
      act(() => {
        expect(onClickMock).toHaveBeenCalled();
      });
    });
  });

  describe('Size', () => {
    const icon = <CheckIcon />;

    it('Large', () => {
      const { container } = render(
        <ToggleButton
          size={ButtonSize.large}
          icon={icon}
          value={value}
          testId={testId}
        />
      );

      const svg = container.querySelector('svg');

      expect(svg).toHaveAttribute('height', magma.iconSizes.medium.toString());
      expect(svg).toHaveAttribute('width', magma.iconSizes.medium.toString());
    });

    it('Medium', () => {
      const { container } = render(
        <ToggleButton
          size={ButtonSize.medium}
          icon={icon}
          value={value}
          testId={testId}
        />
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('height', magma.iconSizes.small.toString());
      expect(svg).toHaveAttribute('width', magma.iconSizes.small.toString());
    });

    it('Small', () => {
      const { container } = render(
        <ToggleButton
          size={ButtonSize.small}
          icon={icon}
          value={value}
          testId={testId}
        />
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('height', magma.iconSizes.xSmall.toString());
      expect(svg).toHaveAttribute('width', magma.iconSizes.xSmall.toString());
    });
  });
});
