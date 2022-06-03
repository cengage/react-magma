import React from 'react';
import { axe } from '../../../axe-helper';
import { ButtonGroup, ButtonGroupOrientation, ButtonGroupAlignment } from '.';
import { Button } from '../Button';
import { render } from '@testing-library/react';

const testId = 'test-id';

describe('ButtonGroup', () => {
  it('should find element by testId', () => {
    const { getByTestId } = render(
      <ButtonGroup testId={testId}>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </ButtonGroup>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('does not violate accessibility standards', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </ButtonGroup>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  describe('Horizontal', () => {
    describe('Alignment', () => {
      it('Default: aligns the buttons to the left', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.horizontal}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'row');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'start');
      });
      it('Center: aligns the buttons to the center', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.horizontal}
            alignment={ButtonGroupAlignment.center}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'row');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'center');
      });
      it('Right: aligns the buttons to the right', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.horizontal}
            alignment={ButtonGroupAlignment.right}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'row');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'end');
      });
      it('Fill: fills the space with the buttons', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.horizontal}
            alignment={ButtonGroupAlignment.fill}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'row');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'stretch');
      });
      it('Apart: spreads out the buttons', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.horizontal}
            alignment={ButtonGroupAlignment.apart}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'row');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'space-between');
      });
    });
    describe('No Space', () => {
      it('Removes the border radius around the buttons', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            noSpace={true}
            orientation={ButtonGroupOrientation.horizontal}
            alignment={ButtonGroupAlignment.left}
          >
            <Button testId={`${testId}-1`}>1</Button>
            <Button testId={`${testId}-2`}>2</Button>
            <Button testId={`${testId}-3`}>3</Button>
          </ButtonGroup>
        );

        expect(getByTestId(`${testId}-1`)).toHaveStyleRule(
          'border-radius',
          '8px 0 0 8px'
        );
        expect(getByTestId(`${testId}-2`)).toHaveStyleRule(
          'border-radius',
          '0'
        );
        expect(getByTestId(`${testId}-3`)).toHaveStyleRule(
          'border-radius',
          '0 8px 8px 0'
        );
      });
    });
  });

  describe('Vertical', () => {
    describe('Alignment', () => {
      it('Default: aligns the buttons to the left', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'column');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'start');
      });
      it('Center: aligns the buttons to the center', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            alignment={ButtonGroupAlignment.center}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'column');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'center');
      });
      it('Right: aligns the buttons to the right', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            alignment={ButtonGroupAlignment.right}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'column');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'end');
      });
      it('Fill: fills the space with the buttons', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            alignment={ButtonGroupAlignment.fill}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'column');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'stretch');
      });
      it('Apart: behaves like the left align', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            alignment={ButtonGroupAlignment.apart}
          >
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        );

        const buttonGroup = getByTestId(testId);
        expect(buttonGroup).toHaveStyleRule('flex-direction', 'column');
        expect(buttonGroup).toHaveStyleRule('justify-content', 'start');
      });
    });
    describe('No Space', () => {
      it('Does NOT remove the border radius around the buttons', () => {
        const { getByTestId } = render(
          <ButtonGroup
            testId={testId}
            orientation={ButtonGroupOrientation.vertical}
            noSpace
          >
            <Button testId={`${testId}-1`}>1</Button>
            <Button testId={`${testId}-2`}>2</Button>
            <Button testId={`${testId}-3`}>3</Button>
          </ButtonGroup>
        );

        expect(getByTestId(`${testId}-1`)).toHaveStyleRule(
          'border-radius',
          '8px'
        );
        expect(getByTestId(`${testId}-2`)).toHaveStyleRule(
          'border-radius',
          '8px'
        );
        expect(getByTestId(`${testId}-3`)).toHaveStyleRule(
          'border-radius',
          '8px'
        );
      });
    });
  });
});
