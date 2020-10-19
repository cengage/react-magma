/// <reference types="jest-dom/extend-expect"/>
import React from 'react';
import { axe } from 'jest-axe';
import { Select } from '.';
import { getStyles } from './shared';
import { render, fireEvent, act } from '@testing-library/react';
import { magma } from 'react-magma-dom';
import { Search2Icon } from 'react-magma-icons';
import { components as ReactSelectComponents } from 'react-select';

describe('Select', () => {
  it('should find element by testId', async () => {
    let getByTestId;
    const testId = 'test-id';
    await act(async () => {
      ({ getByTestId } = render(<Select testId={testId} />));
    });

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a label for the select', async () => {
    let getByText;
    const labelText = 'Test';
    await act(async () => {
      ({ getByText } = render(<Select labelText={labelText} />));
    });

    expect(getByText(labelText)).toBeInTheDocument();
  });

  it('should render a select with desired attributes', async () => {
    let getByLabelText;
    const labelText = 'Test';
    await act(async () => {
      ({ getByLabelText } = render(<Select labelText={labelText} />));
    });
    const input = getByLabelText(labelText);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-label', labelText);
  });

  describe('Custom Styles', () => {
    it('control', () => {
      const color = '#cccccc';
      const styles = getStyles({ control: () => ({ color }) }, magma);

      expect(
        styles.control({}, { isDisabled: false, isFocused: false })
      ).toContainKey('color', color);
    });

    it('dropdownIndicator', () => {
      const color = '#cccccc';
      const styles = getStyles({ dropdownIndicator: () => ({ color }) }, magma);

      expect(styles.dropdownIndicator({})).toContainKey('color', color);
    });

    it('clearIndicator', () => {
      const color = '#cccccc';
      const styles = getStyles({ clearIndicator: () => ({ color }) }, magma);

      expect(styles.clearIndicator({})).toContainKey('color', color);
    });

    it('indicatorSeparator', () => {
      const color = '#cccccc';
      const styles = getStyles(
        { indicatorSeparator: () => ({ color }) },
        magma
      );

      expect(styles.indicatorSeparator({})).toContainKey('color', color);
    });

    it('menu', () => {
      const color = '#cccccc';
      const styles = getStyles({ menu: () => ({ color }) }, magma);

      expect(styles.menu({})).toContainKey('color', color);
    });

    it('multiValue', () => {
      const color = '#cccccc';
      const styles = getStyles({ multiValue: () => ({ color }) }, magma);

      expect(styles.multiValue({})).toContainKey('color', color);
    });

    it('multiValueRemove', () => {
      const color = '#cccccc';
      const styles = getStyles({ multiValueRemove: () => ({ color }) }, magma);

      expect(styles.multiValueRemove({})).toContainKey('color', color);
    });

    it('option', () => {
      const color = '#cccccc';
      const styles = getStyles({ option: () => ({ color }) }, magma);

      expect(styles.option({}, { isFocused: false })).toContainKey(
        'color',
        color
      );
    });

    it('placeholder', () => {
      const color = '#cccccc';
      const styles = getStyles({ placeholder: () => ({ color }) }, magma);

      expect(styles.placeholder({})).toContainKey('color', color);
    });

    it('singleValue', () => {
      const color = '#cccccc';
      const styles = getStyles({ singleValue: () => ({ color }) }, magma);

      expect(styles.singleValue({})).toContainKey('color', color);
    });
  });

  it('should render a select with a default value passed through', async () => {
    let getByDisplayValue;
    const defaultValue = { value: 'red', label: 'Red' };
    const inputName = 'Test';
    await act(async () => {
      ({ getByDisplayValue } = render(
        <Select name={inputName} defaultValue={defaultValue} />
      ));
    });

    expect(getByDisplayValue('red')).toBeInTheDocument();
  });

  it('should render a select with a value passed through', async () => {
    let getByDisplayValue;
    const value = { value: 'red', label: 'Red' };
    const inputName = 'Test';
    await act(async () => {
      ({ getByDisplayValue } = render(
        <Select name={inputName} value={value} />
      ));
    });

    expect(getByDisplayValue('red')).toBeInTheDocument();
  });

  it('should render a multi-select with a multiple values passed through', async () => {
    let getByDisplayValue;
    let getByText;
    const options = [
      {
        label: 'Red',
        value: 'red',
      },
      {
        label: 'Blue',
        value: 'blue',
      },
    ];
    const inputName = 'Test';
    await act(async () => {
      ({ getByDisplayValue, getByText } = render(
        <Select defaultValue={[...options]} name={inputName} isMulti />
      ));
    });

    expect(getByDisplayValue('red')).toBeInTheDocument();
    expect(getByText('Red')).toBeInTheDocument();

    expect(getByDisplayValue('blue')).toBeInTheDocument();
    expect(getByText('Blue')).toBeInTheDocument();
  });

  it('should disable the select', async () => {
    let container;
    await act(async () => {
      ({ container } = render(<Select isDisabled />));
    });
    const input = container.querySelector('input');

    expect(input).toBeDisabled();
  });

  it('should render the helper message with the correct styles', async () => {
    let getByTestId;
    const helperString = 'Helper text';

    await act(async () => {
      ({ getByTestId } = render(<Select helperMessage={helperString} />));
    });

    const helperMessage = getByTestId('inputMessage');

    expect(helperMessage).toBeInTheDocument();
    expect(helperMessage).toHaveStyleRule('color', magma.colors.neutral03);
    expect(helperMessage).toHaveStyleRule(
      'font-size',
      magma.typeScale.size02.fontSize
    );
  });

  it('should render the error message with the correct styles', async () => {
    let getByTestId;
    const errorString = 'Please fix this error';

    await act(async () => {
      ({ getByTestId } = render(<Select errorMessage={errorString} />));
    });

    const errorMessage = getByTestId('inputMessage');

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveStyleRule('background', 'none');
    expect(errorMessage).toHaveStyleRule('color', magma.colors.danger);
  });

  it('should render the error message on an inverse component with the correct styles', async () => {
    let getByTestId;
    const errorString = 'Please fix this error';

    await act(async () => {
      ({ getByTestId } = render(
        <Select errorMessage={errorString} isInverse />
      ));
    });

    const errorMessage = getByTestId('inputMessage');

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveStyleRule('background', magma.colors.danger);
    expect(errorMessage).toHaveStyleRule('color', magma.colors.neutral08);
  });

  it('should allow for the passing in of custom components', async () => {
    let getByTestId;
    const DropdownIndicator = props => {
      return (
        ReactSelectComponents.DropdownIndicator && (
          <ReactSelectComponents.DropdownIndicator {...props}>
            <Search2Icon testId="custom-dropdown-indicator" size={10} />
          </ReactSelectComponents.DropdownIndicator>
        )
      );
    };

    await act(async () => {
      ({ getByTestId } = render(
        <Select
          components={{
            DropdownIndicator,
          }}
        />
      ));
    });

    expect(getByTestId('custom-dropdown-indicator')).toBeInTheDocument();
  });

  it('should trigger the passed in onChange when option is changed', async () => {
    let getByLabelText;
    const options = [
      {
        label: 'Red',
        value: 'red',
      },
      {
        label: 'Blue',
        value: 'blue',
      },
    ];
    const onChangeSpy = jest.fn();

    await act(async () => {
      ({ getByLabelText } = render(
        <Select onChange={onChangeSpy} labelText="target" options={options} />
      ));
    });

    const targetNode = getByLabelText('target');

    fireEvent.keyDown(targetNode, {
      key: 'ArrowDown',
      code: 40,
    });
    fireEvent.keyDown(targetNode, {
      key: 'Enter',
      code: 13,
    });

    expect(onChangeSpy).toHaveBeenCalledWith(
      options[0],
      expect.objectContaining({ action: 'select-option' })
    );
  });

  it('should trigger the passed in onBlur when focus is removed', async () => {
    let container;
    const onBlurSpy = jest.fn();
    await act(async () => {
      ({ container } = render(<Select onFocus={onBlurSpy} />));
    });

    const input = container.querySelector('input');
    fireEvent.focus(input);

    expect(onBlurSpy).toHaveBeenCalledTimes(1);
  });

  it('should trigger the passed in onFocus when focused', async () => {
    let container;
    const onFocusSpy = jest.fn();
    await act(async () => {
      ({ container } = render(<Select onFocus={onFocusSpy} />));
    });

    const input = container.querySelector('input');
    fireEvent.focus(input);

    expect(onFocusSpy).toHaveBeenCalledTimes(1);
  });

  it('Does not violate accessibility standards', async () => {
    let container;
    await act(async () => {
      ({ container } = render(<Select labelText="test label" />));
    });
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
