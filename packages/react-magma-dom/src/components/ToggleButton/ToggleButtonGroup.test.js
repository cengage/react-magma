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

describe('ToggleButtonGroup', () => {
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

  describe('Grouping', () => {
    it('Has a container for multiple buttons', () => {
      const { getByTestId } = render(
        <ToggleButtonGroup testId={testId}>
          <ToggleButton>{TEXT}</ToggleButton>
          <ToggleButton testId={`${testId}-1`}>{TEXT}</ToggleButton>
          <ToggleButton>{TEXT}</ToggleButton>
        </ToggleButtonGroup>
      );
      const wrapper = getByTestId(testId);

      expect(wrapper).toHaveStyleRule('row-gap', magma.spaceScale.spacing03);
      expect(getByTestId(`${testId}-1`)).toHaveStyleRule(
        'padding',
        `${magma.spaceScale.spacing04} ${magma.spaceScale.spacing05}`
      );
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

    it('Should require at least one toggled state', () => {});

    it('Should allow just one selected button at a time', () => {});

    it('Should allow multiple selected buttons at a time', () => {});
  });

  describe('Variants', () => {
    it('Should have an icon button', () => {});

    it('Should have a text button', () => {});

    it('Should have a text button with an icon', () => {});
  });
});
