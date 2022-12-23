import React from 'react';
import { axe } from '../../../axe-helper';
import { ButtonSize } from '../Button';
import { ToggleButton, ToggleButtonGroup } from '.';
import { fireEvent, render } from '@testing-library/react';
import { SettingsIcon } from 'react-magma-icons';
import { magma } from '../../theme/magma';
import { transparentize } from 'polished';

const TEXT = 'Test Text';

const testId = 'test-id';

const icon = <SettingsIcon />;

describe('ToggleButton', () => {
  it('Should find element by testId', () => {
    const { getByTestId } = render(
      <ToggleButton testId={testId}>{TEXT}</ToggleButton>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Icon only buttons are compliant with accessibility', () => {
    // const { container } = render(
    //   <ToggleButton icon={icon} aria-label="Icon Button" />
    // );
    // return axe(container.innerHTML).then(result => {
    //   return expect(result).toHaveNoViolations();
    // });
  });

  describe('Styles', () => {
    it('Icon only styling', () => {
      const { getByTestId } = render(
        <ToggleButton icon={icon} testId={testId} />
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
        <ToggleButton testId={testId}>{TEXT}</ToggleButton>
      );
      const button = getByTestId(testId);

      expect(getByTestId(testId).querySelector('svg')).not.toBeInTheDocument();
      expect(button).toHaveStyleRule('min-width', magma.spaceScale.spacing13);
      expect(button).toHaveStyleRule('width', 'auto');
    });

    it('Text and icon styling', () => {
      const { getByTestId, getByText } = render(
        <ToggleButton icon={icon} testId={testId}>
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
        <ToggleButton testId={testId}>{TEXT}</ToggleButton>
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('border', '1px solid');
      expect(button).toHaveStyleRule('border-color', magma.colors.neutral300);

      rerender(
        <ToggleButton testId={testId} disabled>
          {TEXT}
        </ToggleButton>
      );

      expect(button).toHaveStyleRule('border', '1px solid');
      expect(button).toHaveStyleRule('border-color', magma.colors.neutral300);
    });

    it('Supports small icon sizes', () => {
      const { getByTestId } = render(
        <ToggleButton size={ButtonSize.small} icon={icon} testId={testId} />
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('width', magma.spaceScale.spacing07);
      expect(button).toHaveStyleRule('height', magma.spaceScale.spacing07);
    });

    it('Supports medium icon sizes', () => {
      const { getByTestId } = render(
        <ToggleButton size={ButtonSize.medium} icon={icon} testId={testId} />
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('width', magma.spaceScale.spacing09);
      expect(button).toHaveStyleRule('height', magma.spaceScale.spacing09);
    });

    it('Supports large icon sizes', () => {
      const { getByTestId } = render(
        <ToggleButton size={ButtonSize.large} icon={icon} testId={testId} />
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('width', magma.spaceScale.spacing11);
      expect(button).toHaveStyleRule('height', magma.spaceScale.spacing11);
    });
  });

  describe('States', () => {
    it('Should have a toggled state', () => {
      const { getByTestId } = render(
        <ToggleButton testId={testId} icon={icon} />
      );
      const button = getByTestId(testId);
      expect(button).toHaveStyleRule('background', magma.colors.neutral100);
      fireEvent.click(getByTestId(testId));

      expect(button).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral300)
      );
    });

    it('Should have an untoggled state', () => {
      const { getByTestId } = render(
        <ToggleButton testId={testId} icon={icon} />
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule('background', magma.colors.neutral100);
    });

    it('Should have a default toggled state', () => {
      const { getByTestId } = render(
        <ToggleButton defaultChecked testId={testId} icon={icon} />
      );
      const button = getByTestId(testId);

      expect(button).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral300)
      );
    });
  });

  describe('Variants', () => {
    it('Should have an icon button', () => {});

    it('Should have a text button', () => {});

    it('Should have a text button with an icon', () => {});
  });
});
