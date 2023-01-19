import React from 'react';
import { axe } from '../../../axe-helper';
import { ToggleButtonGroup } from '.';
import { ToggleButton } from '../ToggleButton';
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
      <ToggleButtonGroup testId={testId}></ToggleButtonGroup>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Icon only buttons are compliant with accessibility', () => {
    const { container } = render(<ToggleButtonGroup></ToggleButtonGroup>);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
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
    it('Should allow just one selected button at a time', () => {
      const { getByTestId } = render(
        <ToggleButtonGroup singleSelect requiredSelect>
          <ToggleButton testId={testId}>{TEXT}</ToggleButton>
          <ToggleButton testId={`${testId}-1`}>{TEXT}</ToggleButton>
        </ToggleButtonGroup>
      );

      fireEvent.click(getByTestId(testId));

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral300)
      );

      fireEvent.click(getByTestId(`${testId}-1`));

      expect(getByTestId(testId)).toHaveStyleRule('background', 'none');
    });

    it('Should allow multiple selected buttons at a time', () => {});
  });
});
