import React from 'react';

import { act, fireEvent, render } from '@testing-library/react';
import { transparentize } from 'polished';
import { CheckIcon, SettingsIcon } from 'react-magma-icons';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { ButtonSize } from '../Button';

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
    });
  });

  describe('States', () => {
    it('Should have a toggled state', () => {
      const { getByTestId } = render(
        <ToggleButton value={value} testId={testId} icon={icon} />
      );
      const button = getByTestId(testId);
      expect(button).toHaveStyleRule('background', magma.colors.neutral100);
      fireEvent.click(getByTestId(testId));

      expect(button).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral300)
      );
      expect(button).toHaveAttribute('aria-checked', 'true');
    });

    it('Should have an untoggled state', () => {
      const { getByTestId } = render(
        <ToggleButton value={value} testId={testId} icon={icon} />
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('background', magma.colors.neutral100);
      expect(button).toHaveAttribute('aria-checked', 'false');
    });

    it('Should have an inverse toggled state', () => {
      const { getByTestId } = render(
        <ToggleButton value={value} isInverse testId={testId} icon={icon} />
      );
      const button = getByTestId(testId);
      expect(button).toHaveStyleRule('background', 'none');
      fireEvent.click(getByTestId(testId));

      expect(button).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral900)
      );
    });

    it('Should have an untoggled state after being toggled', () => {
      const { getByTestId } = render(
        <ToggleButton value={value} testId={testId} icon={icon} />
      );
      const button = getByTestId(testId);

      fireEvent.click(button);

      expect(button).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral300)
      );
      fireEvent.click(button);

      expect(button).toHaveStyleRule('background', magma.colors.neutral100);

      expect(button).toHaveAttribute('aria-checked', 'false');
    });

    it('Should have a pre-selected toggled state', () => {
      const { getByTestId } = render(
        <ToggleButton value={value} isChecked testId={testId} icon={icon} />
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral300)
      );
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

      expect(svg).toHaveAttribute('height', '24');
      expect(svg).toHaveAttribute('width', '24');
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
      expect(svg).toHaveAttribute('height', '20');
      expect(svg).toHaveAttribute('width', '20');
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
      expect(svg).toHaveAttribute('height', '16');
      expect(svg).toHaveAttribute('width', '16');
    });
  });
});
