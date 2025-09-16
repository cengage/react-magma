import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';

import { DateTimePicker } from '.';

HTMLCanvasElement.prototype.getContext = () => ({
  font: '',
  measureText: text => ({ width: text.length * 8 }),
});

describe('DateTimePicker', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <DateTimePicker labelText="Date Time Picker Label" testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render an input with correct placeholder', () => {
    const { getByPlaceholderText } = render(
      <DateTimePicker labelText="Date Time Picker Label" />
    );

    expect(getByPlaceholderText('mm/dd/yyyy hh:mm AM')).toBeInTheDocument();
  });

  it('should render with the default label text', () => {
    const { getByLabelText } = render(
      <DateTimePicker labelText="Date Time Picker Label" />
    );

    expect(getByLabelText('Date Time Picker Label')).toBeInTheDocument();
  });

  describe('Default Date and Time', () => {
    it('should render with a default date and time', () => {
      const defaultValue = new Date('January 17, 2019 10:30 AM');
      const { getByDisplayValue } = render(
        <DateTimePicker
          defaultValue={defaultValue}
          labelText="Date Time Picker Label"
        />
      );

      expect(getByDisplayValue('01/17/2019 10:30 AM')).toBeInTheDocument();
    });

    it('should format time correctly from defaultValue', () => {
      const defaultValue = new Date('2024-03-15 14:45:00');
      const { getByDisplayValue } = render(
        <DateTimePicker
          defaultValue={defaultValue}
          labelText="Date Time Picker Label"
        />
      );

      expect(getByDisplayValue('03/15/2024 2:45 PM')).toBeInTheDocument();
    });

    it('should show empty time when no default date is provided', () => {
      const { getByPlaceholderText } = render(
        <DateTimePicker labelText="Date Time Picker Label" />
      );

      expect(getByPlaceholderText('mm/dd/yyyy hh:mm AM')).toHaveAttribute(
        'value',
        ''
      );
    });
  });

  describe('Value Prop', () => {
    it('should set the value to the date and time in the value prop', () => {
      const defaultValue = new Date('January 17, 2019 09:15 AM');
      const valueDate = new Date('January 23, 2019 14:45:00');

      const { getByDisplayValue } = render(
        <DateTimePicker
          defaultValue={defaultValue}
          labelText="Date Time Picker Label"
          value={valueDate}
        />
      );

      expect(getByDisplayValue('01/23/2019 2:45 PM')).toBeInTheDocument();
    });

    it('should prioritize value over defaultValue', () => {
      const defaultValue = new Date('2020-01-01 10:00:00');
      const valueDate = new Date('2020-12-25 15:30:00');

      const { getByDisplayValue } = render(
        <DateTimePicker
          defaultValue={defaultValue}
          value={valueDate}
          labelText="Date Time Picker Label"
        />
      );

      expect(getByDisplayValue('12/25/2020 3:30 PM')).toBeInTheDocument();
    });
  });

  describe('Clearable functionality', () => {
    it('should render a clear button when isClearable is true and there is a value', () => {
      const valueDate = new Date('January 23, 2019 10:30 AM');
      const { getByTestId } = render(
        <DateTimePicker
          value={valueDate}
          isClearable
          labelText="Date Time Picker Label"
        />
      );

      expect(getByTestId('clear-button')).toBeInTheDocument();
    });

    it('should clear both date and time when clear button is clicked', () => {
      const valueDate = new Date('2024-03-15 14:30:00');
      const { getByTestId, getByPlaceholderText } = render(
        <DateTimePicker
          value={valueDate}
          isClearable
          labelText="Date Time Picker Label"
        />
      );

      userEvent.click(getByTestId('clear-button'));

      expect(getByPlaceholderText('mm/dd/yyyy hh:mm AM')).toHaveAttribute(
        'value',
        ''
      );
    });
  });

  describe('Calendar Integration', () => {
    it('should open calendar when toggle button is clicked', () => {
      const { getByLabelText, getByTestId } = render(
        <DateTimePicker labelText="Date Time Picker Label" />
      );

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      expect(getByTestId('calendarMonthContainer')).toBeInTheDocument();
    });

    it('should show TimePicker in the calendar popup', () => {
      const { getByLabelText, getByText } = render(
        <DateTimePicker labelText="Date Time Picker Label" />
      );

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      expect(getByText('Time')).toBeInTheDocument();
    });

    it('should show Done button in the calendar popup', () => {
      const { getByLabelText, getByText } = render(
        <DateTimePicker labelText="Date Time Picker Label" />
      );

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      expect(getByText('Done')).toBeInTheDocument();
    });

    it('should close calendar when Done button is clicked', () => {
      const { getByLabelText, getByText, queryByTestId } = render(
        <DateTimePicker labelText="Date Time Picker Label" />
      );

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      expect(queryByTestId('calendarMonthContainer')).toBeInTheDocument();
      expect(queryByTestId('calendarMonthContainer')).toBeVisible();

      userEvent.click(getByText('Done'));

      expect(queryByTestId('calendarMonthContainer')).not.toBeVisible();
    });
  });

  describe('Time Input Functionality', () => {
    it('should handle time change from TimePicker', async () => {
      const onTimeChange = jest.fn();
      const { getByLabelText, getByTestId } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          onTimeChange={onTimeChange}
        />
      );

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      const hoursInput = getByTestId('hoursTimeInput');

      userEvent.type(hoursInput, '9');

      expect(onTimeChange).toHaveBeenCalledWith('09:00 AM');
    });

    it('should show time in input when time is selected', () => {
      const { getByLabelText, getByTestId, getByDisplayValue } = render(
        <DateTimePicker labelText="Date Time Picker Label" />
      );

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      const hoursInput = getByTestId('hoursTimeInput');
      const minutesInput = getByTestId('minutesTimeInput');

      userEvent.type(hoursInput, '10');
      userEvent.type(minutesInput, '30');

      userEvent.click(getByTestId('calendarMonthContainer'));

      expect(getByDisplayValue('10:30 AM')).toBeInTheDocument();
    });
  });

  describe('Input Change Handling', () => {
    it('should parse time from manual input', () => {
      const { getByPlaceholderText } = render(
        <DateTimePicker labelText="Date Time Picker Label" />
      );

      const input = getByPlaceholderText('mm/dd/yyyy hh:mm AM');

      userEvent.type(input, '03/15/2030 2:30 PM');

      expect(input).toHaveAttribute('value', '03/15/2030 2:30 PM');
    });

    it('should handle time extraction from input value', () => {
      const { getByPlaceholderText } = render(
        <DateTimePicker labelText="Date Time Picker Label" />
      );

      const input = getByPlaceholderText('mm/dd/yyyy hh:mm AM');

      userEvent.type(input, '12/25/2024 11:45 PM');

      expect(input).toHaveAttribute('value', '12/25/2024 11:45 PM');
    });

    it('should preserve previous time when only date is entered', () => {
      const today = new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });

      const { getByPlaceholderText, getByLabelText, getByTestId } = render(
        <DateTimePicker labelText="Date Time Picker Label" />
      );

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      const hoursInput = getByTestId('hoursTimeInput');

      userEvent.type(hoursInput, '9');
      userEvent.click(getByTestId('calendarMonthContainer'));

      const input = getByPlaceholderText('mm/dd/yyyy hh:mm AM');

      expect(input).toHaveAttribute('value', `${today} 09:00 AM`);
    });

    it('should clear time when input is completely cleared', () => {
      const defaultValue = new Date('2024-03-15 14:30:00');
      const { getByDisplayValue } = render(
        <DateTimePicker
          defaultValue={defaultValue}
          labelText="Date Time Picker Label"
        />
      );

      const input = getByDisplayValue('03/15/2024 2:30 PM');

      userEvent.clear(input);

      expect(input).toHaveAttribute('value', '');
    });
  });

  describe('Date Change Events', () => {
    it('should call onDateChange when date is changed', () => {
      const onDateChange = jest.fn();
      const { getByLabelText } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          onDateChange={onDateChange}
          defaultValue={new Date('2024-03-15')}
        />
      );

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      const dayButton = screen.getByText('15');

      userEvent.click(dayButton);

      expect(onDateChange).toHaveBeenCalled();
    });

    it('should call onChange when date changes', () => {
      const onChange = jest.fn();
      const { getByLabelText } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          onChange={onChange}
        />
      );

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      const dayButton = screen.getByText('15');

      userEvent.click(dayButton);

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Min/Max Date Validation', () => {
    it('should respect minDate when provided', () => {
      const minDate = new Date('2024-01-01');

      const { getByTestId, getByText, getByPlaceholderText, getByLabelText } =
        render(
          <DateTimePicker
            labelText="Date Time Picker Label"
            minDate={minDate}
          />
        );

      const input = getByPlaceholderText('mm/dd/yyyy hh:mm AM');

      userEvent.type(input, '12/31/2023');

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      const calendar = getByTestId('calendarMonthContainer');

      expect(calendar).toBeVisible();
      expect(getByText('31')).toBeVisible();
      expect(getByText('31')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should respect maxDate when provided', () => {
      const maxDate = new Date('2024-12-31');

      const { getByTestId, getByText, getByPlaceholderText, getByLabelText } =
        render(
          <DateTimePicker
            labelText="Date Time Picker Label"
            maxDate={maxDate}
          />
        );

      const input = getByPlaceholderText('mm/dd/yyyy hh:mm AM');

      userEvent.type(input, '12/31/2025');

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      const calendar = getByTestId('calendarMonthContainer');

      expect(calendar).toBeVisible();
      expect(getByText('31')).toBeVisible();
      expect(getByText('31')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Error and Helper Messages', () => {
    it('should render error message when provided', () => {
      const errorMessage = 'This field is required';
      const { getByText } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          errorMessage={errorMessage}
        />
      );

      expect(getByText(errorMessage)).toBeInTheDocument();
    });

    it('should render helper message when provided', () => {
      const helperMessage = 'Please select a date and time';
      const { getByText } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          helperMessage={helperMessage}
        />
      );

      expect(getByText(helperMessage)).toBeInTheDocument();
    });
  });

  describe('Required Field', () => {
    it('should render as required when required prop is true', () => {
      const { getByPlaceholderText } = render(
        <DateTimePicker labelText="Date Time Picker Label" required />
      );

      expect(getByPlaceholderText('mm/dd/yyyy hh:mm AM')).toBeRequired();
    });
  });

  describe('Inverse Styling', () => {
    it('should apply inverse styling when isInverse is true', () => {
      const { getByLabelText } = render(
        <DateTimePicker labelText="Date Time Picker Label" isInverse />
      );

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      const doneButton = screen.getByText('Done');

      expect(doneButton.closest('div')).toHaveStyle({
        backgroundColor: magma.colors.primary600,
      });
    });

    it('should apply normal styling when isInverse is false', () => {
      const { getByLabelText } = render(
        <DateTimePicker labelText="Date Time Picker Label" isInverse={false} />
      );

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      const doneButton = screen.getByText('Done');

      expect(doneButton.closest('div')).toHaveStyle({
        backgroundColor: magma.colors.neutral200,
      });
    });
  });

  describe('Focus Events', () => {
    it('should call onInputFocus when input receives focus', () => {
      const onInputFocus = jest.fn();
      const { getByPlaceholderText } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          onInputFocus={onInputFocus}
        />
      );

      getByPlaceholderText('mm/dd/yyyy hh:mm AM').focus();

      expect(onInputFocus).toHaveBeenCalled();
    });

    it('should call onInputBlur when input loses focus', () => {
      const onInputBlur = jest.fn();
      const { getByPlaceholderText } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          onInputBlur={onInputBlur}
        />
      );

      const input = getByPlaceholderText('mm/dd/yyyy hh:mm AM');

      input.focus();
      input.blur();

      expect(onInputBlur).toHaveBeenCalled();
    });

    it('should call onInputChange when input value changes', () => {
      const onInputChange = jest.fn();
      const { getByPlaceholderText } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          onInputChange={onInputChange}
        />
      );

      userEvent.type(
        getByPlaceholderText('mm/dd/yyyy hh:mm AM'),
        '03/15/2024 10:30 AM'
      );

      expect(onInputChange).toHaveBeenCalled();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should allow keyboard navigation in time picker', () => {
      const { getByLabelText, getByTestId } = render(
        <DateTimePicker labelText="Date Time Picker Label" />
      );

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      const hoursInput = getByTestId('hoursTimeInput');
      const minutesInput = getByTestId('minutesTimeInput');

      hoursInput.focus();

      userEvent.type(hoursInput, '{arrowright}');

      expect(minutesInput).toHaveFocus();
    });

    it('should handle backspace in time inputs', () => {
      const { getByLabelText, getByTestId } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          value={new Date('2024-03-15 10:30:00')}
        />
      );

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      const hoursInput = getByTestId('hoursTimeInput');

      userEvent.type(hoursInput, '{backspace}');

      hoursInput.blur();

      expect(hoursInput).toHaveAttribute('value', '');
    });
  });

  describe('Edge Cases', () => {
    it('should handle null/undefined values gracefully', () => {
      const { getByPlaceholderText } = render(
        <DateTimePicker labelText="Date Time Picker Label" value={null} />
      );

      expect(getByPlaceholderText('mm/dd/yyyy hh:mm AM')).toHaveAttribute(
        'value',
        ''
      );
    });

    it('should update when value prop changes externally', () => {
      const { getByDisplayValue, rerender } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          value={new Date('2024-03-15 10:30:00')}
        />
      );

      expect(getByDisplayValue('03/15/2024 10:30 AM')).toBeInTheDocument();

      rerender(
        <DateTimePicker
          labelText="Date Time Picker Label"
          value={new Date('2024-03-20 14:45:00')}
        />
      );

      expect(getByDisplayValue('03/20/2024 2:45 PM')).toBeInTheDocument();
    });

    it('should clear state when value changes to null', () => {
      const { getByDisplayValue, getByPlaceholderText, rerender } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          value={new Date('2024-03-15 10:30:00')}
        />
      );

      expect(getByDisplayValue('03/15/2024 10:30 AM')).toBeInTheDocument();

      rerender(
        <DateTimePicker labelText="Date Time Picker Label" value={null} />
      );

      expect(getByPlaceholderText('mm/dd/yyyy hh:mm AM')).toHaveAttribute(
        'value',
        ''
      );
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom input styles', () => {
      const customStyle = { backgroundColor: 'red' };
      const { getByPlaceholderText } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          inputStyle={customStyle}
        />
      );

      expect(getByPlaceholderText('mm/dd/yyyy hh:mm AM')).toHaveStyle(
        customStyle
      );
    });

    it('should apply custom label styles', () => {
      const customStyle = { color: 'blue' };
      const { getByText } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          labelStyle={customStyle}
        />
      );

      expect(getByText('Date Time Picker Label')).toHaveStyle(customStyle);
    });

    it('should apply custom message styles', () => {
      const customStyle = { fontSize: '14px' };
      const helperMessage = 'Helper text';
      const { getByText } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          helperMessage={helperMessage}
          messageStyle={customStyle}
        />
      );

      expect(getByText(helperMessage).parentElement).toHaveStyle(customStyle);
    });
  });

  describe('Integration Tests', () => {
    it('should work with both date selection and time input', () => {
      const onChange = jest.fn();
      const onDateChange = jest.fn();
      const onTimeChange = jest.fn();

      const { getByLabelText, getByTestId } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          onChange={onChange}
          onDateChange={onDateChange}
          onTimeChange={onTimeChange}
        />
      );

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      const hoursInput = getByTestId('hoursTimeInput');
      const minutesInput = getByTestId('minutesTimeInput');

      userEvent.type(hoursInput, '10');
      userEvent.type(minutesInput, '30');

      const dayButton = screen.queryByText('15');
      userEvent.click(dayButton);

      userEvent.click(screen.getByText('Done'));

      expect(onTimeChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalled();
    });

    it('should maintain time when date is changed', () => {
      const { getByLabelText, getByTestId, getByDisplayValue } = render(
        <DateTimePicker
          labelText="Date Time Picker Label"
          defaultValue={new Date('2024-03-15 10:30:00')}
        />
      );

      const input = getByDisplayValue('03/15/2024 10:30 AM');

      expect(input).toBeInTheDocument();

      userEvent.click(getByLabelText('Toggle Calendar Widget'));

      const hoursInput = getByTestId('hoursTimeInput');

      userEvent.type(hoursInput, '2');
      userEvent.click(screen.getByText('Done'));

      expect(input).toHaveValue('03/15/2024 02:30 AM');
    });
  });

  describe('I18n Support', () => {
    it('should use default i18n values', () => {
      const { getByLabelText } = render(
        <DateTimePicker labelText="Date Time Picker Label" />
      );

      expect(getByLabelText('Date Time Picker Label')).toHaveAttribute(
        'placeholder',
        'mm/dd/yyyy hh:mm AM'
      );
    });

    it('should work with custom i18n context', () => {
      const customI18n = {
        ...defaultI18n,
        dateFormat: 'dd/MM/yyyy',
      };

      const { getByDisplayValue } = render(
        <I18nContext.Provider value={customI18n}>
          <DateTimePicker
            labelText="Date Time Picker Label"
            value={new Date('2024-03-15 10:30:00')}
          />
        </I18nContext.Provider>
      );

      expect(getByDisplayValue('15/03/2024 10:30 AM')).toBeInTheDocument();
    });
  });
});
