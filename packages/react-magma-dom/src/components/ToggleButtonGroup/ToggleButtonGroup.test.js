import React from 'react';
import { axe } from '../../../axe-helper';
import { ToggleButtonGroup } from '.';
import { ToggleButton } from '../ToggleButton';
import { render, fireEvent, getByTestId } from '@testing-library/react';
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

  it('Toggle Button Groups are compliant with accessibility', () => {
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
        <ToggleButtonGroup exclusive>
          <ToggleButton testId={testId}>Button One</ToggleButton>
          <ToggleButton testId={`${testId}-1`}>Button Two</ToggleButton>
        </ToggleButtonGroup>
      );

      const buttonOne = getByTestId(testId).parentElement;
      const buttonTwo = getByTestId(`${testId}-1`).parentElement;

      expect(buttonOne).toHaveAttribute('aria-checked', 'false');

      fireEvent.click(buttonOne);

      expect(buttonOne).toHaveAttribute('aria-checked', 'true');

      fireEvent.click(buttonTwo);
      expect(buttonOne).toHaveAttribute('aria-checked', 'false');
    });

    it('Should require one button remain selected', () => {
      const { getByTestId } = render(
        <ToggleButtonGroup exclusive enforced>
          <ToggleButton testId={testId}>Button One</ToggleButton>
          <ToggleButton testId={`${testId}-1`}>Button Two</ToggleButton>
        </ToggleButtonGroup>
      );

      const buttonOne = getByTestId(testId).parentElement;

      expect(buttonOne).toHaveAttribute('aria-checked', 'false');

      fireEvent.click(buttonOne);

      expect(buttonOne).toHaveAttribute('aria-checked', 'true');

      fireEvent.click(buttonOne);
      expect(buttonOne).toHaveAttribute('aria-checked', 'true');
    });

    it('Should allow multiple selected buttons at a time', () => {
      const { getByTestId } = render(
        <ToggleButtonGroup>
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

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral300)
      );
      expect(getByTestId(`${testId}-1`)).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral300)
      );
    });

    it('Should allow one default selection set by the user', () => {
      const { getByTestId } = render(
        <ToggleButtonGroup value="one">
          <ToggleButton value="one" testId={testId}>
            {TEXT}
          </ToggleButton>
          <ToggleButton testId={`${testId}-1`}>{TEXT}</ToggleButton>
        </ToggleButtonGroup>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral300)
      );
    });

    it('Should allow multiple default selections set by the user', () => {
      const { getByTestId } = render(
        <ToggleButtonGroup value="one">
          <ToggleButton value="one" testId={testId}>
            {TEXT}
          </ToggleButton>
          <ToggleButton value="one" testId={`${testId}-1`}>
            {TEXT}
          </ToggleButton>
        </ToggleButtonGroup>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral300)
      );
      expect(getByTestId(`${testId}-1`)).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral300)
      );
    });

    it('Should allow a default selection set by the user to be unselected', () => {
      const { getByTestId } = render(
        <ToggleButtonGroup value="one">
          <ToggleButton value="one" testId={testId}>
            {TEXT}
          </ToggleButton>
          <ToggleButton testId={`${testId}-1`}>{TEXT}</ToggleButton>
        </ToggleButtonGroup>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral300)
      );

      fireEvent.click(getByTestId(testId));

      expect(getByTestId(testId)).toHaveStyleRule('background', 'none');
    });

    // it('Should fire the onChange function when any button in the group is clicked', () => {
    //   const customFunction = () => {};
    //   const { getByTestId } = render(
    //     <ToggleButtonGroup onChange={customFunction} value="one">
    //       <ToggleButton testId={testId} value="one">
    //         {TEXT}
    //       </ToggleButton>
    //       <ToggleButton>{TEXT}</ToggleButton>
    //     </ToggleButtonGroup>
    //   );

    //   expect(getByTestId(testId)).toHaveStyleRule(
    //     'background',
    //     transparentize(0.5, magma.colors.neutral300)
    //   );
    //   fireEvent.click(getByTestId(testId));
    //   expect(getByTestId(testId)).toHaveStyleRule('background', 'none');
    //   expect(customFunction).toHaveBeenCalledTimes(1);
    // });
  });
});
