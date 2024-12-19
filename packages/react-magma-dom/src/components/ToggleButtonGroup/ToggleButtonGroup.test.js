import React from 'react';
import { axe } from '../../../axe-helper';
import { ToggleButtonGroup } from '.';
import { ToggleButton } from '../ToggleButton';
import { render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';
import { transparentize } from 'polished';

const TEXT = 'Test Text';
const testId = 'test-id';

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

  it('Has a container for multiple buttons', () => {
    const { getByTestId } = render(
      <ToggleButtonGroup testId={testId}>
        <ToggleButton value="1">{TEXT}</ToggleButton>
        <ToggleButton value="2" testId={`${testId}-1`}>
          {TEXT}
        </ToggleButton>
        <ToggleButton value="3">{TEXT}</ToggleButton>
      </ToggleButtonGroup>
    );
    const wrapper = getByTestId(testId);

    expect(wrapper).toHaveStyleRule('row-gap', magma.spaceScale.spacing03);
    expect(getByTestId(`${testId}-1`)).toHaveStyleRule(
      'padding',
      `${magma.spaceScale.spacing04} ${magma.spaceScale.spacing05}`
    );
  });

  describe('States', () => {
    describe('Enforced', () => {
      it('Should require one button remain selected', () => {
        const { getByTestId } = render(
          <ToggleButtonGroup enforced>
            <ToggleButton value="1" testId={testId}>
              Button One
            </ToggleButton>
            <ToggleButton value="2" testId={`${testId}-1`}>
              Button Two
            </ToggleButton>
          </ToggleButtonGroup>
        );

        const buttonOne = getByTestId(testId);
        // ensure that clicking either the button or child SVG works
        const buttonOneSvg = buttonOne.children[0];
        expect(buttonOne).toHaveAttribute('aria-checked', 'false');
        fireEvent.click(buttonOneSvg);
        expect(buttonOne).toHaveAttribute('aria-checked', 'true');
        fireEvent.click(buttonOne);
        expect(buttonOne).toHaveAttribute('aria-checked', 'true');
      });
    });

    describe('Exclusive', () => {
      it('Should allow just one selected button at a time', () => {
        const { getByTestId } = render(
          <ToggleButtonGroup exclusive>
            <ToggleButton value="1" testId={testId}>
              Button One
            </ToggleButton>
            <ToggleButton value="2" testId={`${testId}-1`}>
              Button Two
            </ToggleButton>
          </ToggleButtonGroup>
        );

        const buttonOne = getByTestId(testId);
        // ensure that clicking either the button or child SVG works
        const buttonOneSvg = buttonOne.children[0];
        const buttonTwo = getByTestId(`${testId}-1`);

        expect(buttonOne).toHaveAttribute('aria-checked', 'false');
        fireEvent.click(buttonOneSvg);
        expect(buttonOne).toHaveAttribute('aria-checked', 'true');
        fireEvent.click(buttonTwo);
        expect(buttonOne).toHaveAttribute('aria-checked', 'false');
      });
    });

    describe('Enforced and Exclusive', () => {
      it('Should require one button remain selected', () => {
        const { getByTestId } = render(
          <ToggleButtonGroup exclusive enforced>
            <ToggleButton value="1" testId={testId}>
              Button One
            </ToggleButton>
            <ToggleButton value="2" testId={`${testId}-1`}>
              Button Two
            </ToggleButton>
          </ToggleButtonGroup>
        );

        const buttonOne = getByTestId(testId);
        // ensure that clicking either the button or child SVG works
        const buttonOneSvg = buttonOne.children[0];
        const buttonTwo = getByTestId(`${testId}-1`);

        expect(buttonOne).toHaveAttribute('aria-checked', 'false');
        fireEvent.click(buttonOneSvg);
        expect(buttonOne).toHaveAttribute('aria-checked', 'true');
        fireEvent.click(buttonOneSvg);
        expect(buttonOne).toHaveAttribute('aria-checked', 'true');
        fireEvent.click(buttonTwo);
        expect(buttonOne).toHaveAttribute('aria-checked', 'false');
        expect(buttonTwo).toHaveAttribute('aria-checked', 'true');
      });
    });

    describe('Neither enforced or exclusive', () => {
      it('Should allow multiple selected buttons at a time', () => {
        const { getByTestId } = render(
          <ToggleButtonGroup>
            <ToggleButton value="1" testId={testId}>
              {TEXT}
            </ToggleButton>
            <ToggleButton value="2" testId={`${testId}-1`}>
              {TEXT}
            </ToggleButton>
          </ToggleButtonGroup>
        );

        const buttonOne = getByTestId(testId);
        const buttonTwo = getByTestId(`${testId}-1`);

        fireEvent.click(buttonOne);
        expect(buttonOne).toHaveAttribute('aria-checked', 'true');
        fireEvent.click(buttonTwo);
        expect(buttonOne).toHaveAttribute('aria-checked', 'true');
        expect(buttonTwo).toHaveAttribute('aria-checked', 'true');
      });
    });

    describe('Default value', () => {
      it('Should allow a default selection set by the user', () => {
        const { getByTestId } = render(
          <ToggleButtonGroup value="one">
            <ToggleButton value="one" testId={testId}>
              {TEXT}
            </ToggleButton>
            <ToggleButton value="two" testId={`${testId}-1`}>
              {TEXT}
            </ToggleButton>
          </ToggleButtonGroup>
        );

        const buttonOne = getByTestId(testId);
        expect(buttonOne).toHaveStyleRule(
          'background',
          transparentize(0.5, magma.colors.neutral300)
        );
        expect(buttonOne).toHaveAttribute('aria-checked', 'true');
      });

      it('Should allow a default selection set by the user to be unselected', () => {
        const { getByTestId } = render(
          <ToggleButtonGroup value="one">
            <ToggleButton value="one" testId={testId}>
              {TEXT}
            </ToggleButton>
            <ToggleButton value="two" testId={`${testId}-1`}>
              {TEXT}
            </ToggleButton>
          </ToggleButtonGroup>
        );

        const buttonOne = getByTestId(testId);
        expect(buttonOne).toHaveAttribute('aria-checked', 'true');
        fireEvent.click(buttonOne);
        expect(buttonOne).toHaveAttribute('aria-checked', 'false');
      });
    });
  });

  it('Should fire the onChange function when any button in the group is clicked', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <ToggleButtonGroup onChange={onChangeMock} value="one">
        <ToggleButton testId={testId} value="one">
          {TEXT}
        </ToggleButton>
        <ToggleButton value="two">{TEXT}</ToggleButton>
      </ToggleButtonGroup>
    );

    const buttonOne = getByTestId(testId);

    expect(buttonOne).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(buttonOne);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
