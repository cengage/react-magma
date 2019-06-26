/// <reference types="jest-dom/extend-expect"/>
import React from 'react';
import { axe } from 'jest-axe';
import { Select, getStyles } from '.';
import { render, fireEvent } from 'react-testing-library';
import { magma } from '../../theme/magma';

describe('Select', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Select testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a label for the select', () => {
    const labelText = 'Test';
    const { getByText } = render(<Select labelText={labelText} />);

    expect(getByText(labelText)).toBeInTheDocument();
  });

  it('should render a select with desired attributes', () => {
    const labelText = 'Test';
    const { getByLabelText } = render(<Select labelText={labelText} />);
    const input = getByLabelText(labelText);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-label', labelText);
  });

  it('should render custom styles', () => {
    const color = '#cccccc';
    const styles = getStyles({ multiValue: { color } }, magma);

    expect(styles.multiValue({})).toContainKey('color', color);
  });

  it('should render a select with a default value passed through', () => {
    const defaultValue = { value: 'red', label: 'Red' };
    const inputName = 'Test';
    const { getByValue } = render(
      <Select name={inputName} defaultValue={defaultValue} />
    );

    expect(getByValue('red')).toBeInTheDocument();
  });

  it('should render a select with a value passed through', () => {
    const value = { value: 'red', label: 'Red' };
    const inputName = 'Test';
    const { getByValue } = render(<Select name={inputName} value={value} />);

    expect(getByValue('red')).toBeInTheDocument();
  });

  it('should render a multi-select with a multiple values passed through', () => {
    const options = [
      {
        label: 'Red',
        value: 'red'
      },
      {
        label: 'Blue',
        value: 'blue'
      }
    ];
    const inputName = 'Test';
    const { getByValue, getByText } = render(
      <Select defaultValue={[...options]} name={inputName} multi />
    );
    expect(getByValue('red')).toBeInTheDocument();
    expect(getByText('Red')).toBeInTheDocument();

    expect(getByValue('blue')).toBeInTheDocument();
    expect(getByText('Blue')).toBeInTheDocument();
  });

  it('should disable the select', () => {
    const { container } = render(<Select disabled />);
    const input = container.querySelector('input');

    expect(input).toBeDisabled();
  });

  it('should render the helper message with the correct styles', () => {
    const helperString = 'Helper text';

    const { getByText } = render(<Select helperMessage={helperString} />);
    const helperMessage = getByText(helperString);

    expect(helperMessage).toBeInTheDocument();
    expect(helperMessage).toHaveStyleRule('color', '#727272');
    expect(helperMessage).toHaveStyleRule('font-size', '13px');
  });

  it('should render the error message with the correct styles', () => {
    const errorString = 'Please fix this error';

    const { getByText } = render(<Select errorMessage={errorString} />);
    const errorMessage = getByText(errorString);

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveStyleRule('background', 'none');
    expect(errorMessage).toHaveStyleRule('color', '#E70000');
  });

  it('should render the error message on an inverse component with the correct styles', () => {
    const errorString = 'Please fix this error';

    const { getByText } = render(<Select errorMessage={errorString} inverse />);
    const errorMessage = getByText(errorString);

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveStyleRule('background', '#E70000');
    expect(errorMessage).toHaveStyleRule('color', '#FFFFFF');
  });

  it('should trigger the passed in onChange when option is changed', () => {
    const options = [
      {
        label: 'Red',
        value: 'red'
      },
      {
        label: 'Blue',
        value: 'blue'
      }
    ];
    const onChangeSpy = jest.fn();
    const { getByLabelText } = render(
      <Select onChange={onChangeSpy} labelText="target" options={options} />
    );

    const targetNode = getByLabelText('target');

    fireEvent.keyDown(targetNode, {
      key: 'ArrowDown',
      code: 40
    });
    fireEvent.keyDown(targetNode, {
      key: 'Enter',
      code: 13
    });

    expect(onChangeSpy).toHaveBeenCalledWith(options[0]);
  });

  it('should trigger the passed in onBlur when focus is removed', () => {
    const onBlurSpy = jest.fn();
    const { container } = render(<Select onFocus={onBlurSpy} />);

    const input = container.querySelector('input');
    fireEvent.focus(input);

    expect(onBlurSpy).toHaveBeenCalledTimes(1);
  });

  it('should trigger the passed in onFocus when focused', () => {
    const onFocusSpy = jest.fn();
    const { container } = render(<Select onFocus={onFocusSpy} />);

    const input = container.querySelector('input');
    fireEvent.focus(input);

    expect(onFocusSpy).toHaveBeenCalledTimes(1);
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Select labelText="test label" />);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
