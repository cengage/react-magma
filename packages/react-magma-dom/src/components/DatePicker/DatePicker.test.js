import React from 'react';

import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  addDays,
  addMonths,
  addWeeks,
  endOfWeek,
  format,
  getDay,
  isSameDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns';
import * as es from 'date-fns/locale/es';

import { Modal } from '../Modal';
import { ClearingTheDate } from './DatePicker.stories';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';

import { DatePicker } from '.';

describe('Date Picker', () => {
  it('should find element by testId', async () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <DatePicker labelText="Date Picker Label" testId={testId} />
    );

    await waitFor(() => {
      expect(getByTestId(testId)).toBeInTheDocument();
    });
  });

  it('should render an input', async () => {
    const { getByLabelText } = render(
      <DatePicker labelText="Date Picker Label" />
    );

    await waitFor(() => {
      expect(getByLabelText('Date Picker Label')).not.toBeNull();
      expect(getByLabelText('Date Picker Label')).toHaveAttribute(
        'placeholder',
        'mm/dd/yyyy'
      );
    });
  });

  it('should render with a default date', async () => {
    const defaultDate = new Date('January 17, 2019');

    const { getByLabelText } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    await waitFor(() => {
      expect(getByLabelText('Date Picker Label')).toHaveAttribute(
        'value',
        format(defaultDate, 'MM/dd/yyyy')
      );
    });
  });

  it('should render a Clear icon if isClearable prop is true', async () => {
    const valueDate = new Date('January 23, 2019');

    const { getByTestId } = render(
      <DatePicker value={valueDate} isClearable labelText="Date Picker Label" />
    );

    await waitFor(() => {
      expect(getByTestId('clear-button')).toBeInTheDocument();
    });
  });

  it('should clear input and Chosen Date value after clicking on isClearable X button', async () => {
    const labelText = 'Date Picker Label';
    const now = new Date();
    const day =
      format(now, 'dd')[0] === '0' ? format(now, 'dd')[1] : format(now, 'dd');
    const chosenDate = `${
      now.getMonth() + 1
    }/${now.getDate()}/${now.getFullYear()}`;

    const { getByText, getByTestId, getByLabelText } = render(
      <ClearingTheDate.render labelText={labelText} />
    );

    await userEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText(day)).toBeInTheDocument();

    await userEvent.click(getByText(day));

    expect(getByText('Chosen Date:').nextSibling.innerHTML).toEqual(chosenDate);

    await userEvent.click(getByTestId('clear-button'));

    expect(getByLabelText('Date Picker Label')).toHaveAttribute('value', '');
    expect(getByText('Chosen Date:').nextSibling).not.toBeInTheDocument();
  });

  it('should clear input and Chosen Date value after clicking on Clear Date button', async () => {
    const labelText = 'Date Picker Label';
    const now = new Date();
    const day =
      format(now, 'dd')[0] === '0' ? format(now, 'dd')[1] : format(now, 'dd');
    const chosenDate = `${
      now.getMonth() + 1
    }/${now.getDate()}/${now.getFullYear()}`;

    const { getByText, getByLabelText } = render(
      <ClearingTheDate.render labelText={labelText} />
    );

    await userEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText(day)).toBeInTheDocument();

    await userEvent.click(getByText(day));

    expect(getByText('Chosen Date:').nextSibling.innerHTML).toEqual(chosenDate);

    await userEvent.click(getByText('Clear Date').parentElement);

    expect(getByLabelText('Date Picker Label')).toHaveAttribute('value', '');
    expect(getByText('Chosen Date:').nextSibling).not.toBeInTheDocument();
  });

  it('should set the value to the date in the value prop', async () => {
    const defaultDate = new Date('January 17, 2019');
    const valueDate = new Date('January 23, 2019');

    const { getByLabelText } = render(
      <DatePicker
        defaultDate={defaultDate}
        labelText="Date Picker Label"
        value={valueDate}
      />
    );

    await waitFor(() => {
      expect(getByLabelText('Date Picker Label')).toHaveAttribute(
        'value',
        format(valueDate, 'MM/dd/yyyy')
      );
    });
  });

  it('should not set the value to the date if it is before the minDate', async () => {
    const valueDate = new Date('January 23, 2019');
    const minDate = new Date('January 10, 2020');

    const { getByLabelText } = render(
      <DatePicker
        labelText="Date Picker Label"
        value={valueDate}
        minDate={minDate}
      />
    );

    waitFor(() => {
      expect(getByLabelText('Date Picker Label')).toHaveAttribute('value', '');
    });
  });

  it('should not allow to navigate through inactive days', async () => {
    const minDate = new Date('January 10, 2020');
    const valueDate = new Date('January 11, 2020');

    const { getByText, getByRole } = render(
      <DatePicker minDate={minDate} value={valueDate} />
    );

    expect(getByText('January 2020')).toBeInTheDocument();

    const selectedDateButton = getByText(11);
    const button = getByRole('button');

    await userEvent.click(button);

    expect(selectedDateButton).toBeInTheDocument();
    expect(selectedDateButton).toHaveFocus();

    await userEvent.keyboard('[ArrowLeft]');

    expect(selectedDateButton).not.toHaveFocus();

    const startDateButton = getByText(10);

    expect(startDateButton).toBeInTheDocument();
    expect(startDateButton).toHaveFocus();

    await userEvent.keyboard('[ArrowUp]');
    await userEvent.keyboard('[ArrowLeft]');

    expect(startDateButton).toHaveFocus();

    await userEvent.keyboard('[ArrowRight]');

    expect(startDateButton).not.toHaveFocus();
    expect(selectedDateButton).toHaveFocus();

    await userEvent.keyboard('[ArrowDown]');

    expect(getByText(18)).toHaveFocus();
  });

  it('should lock focus inside', async () => {
    const valueDate = new Date('January 1, 2020');

    const { getByText, getByRole } = render(<DatePicker value={valueDate} />);

    const selectedDateButton = getByText(1);
    const button = getByRole('button');

    await userEvent.click(button);

    expect(selectedDateButton).toBeInTheDocument();
    expect(selectedDateButton).toHaveFocus();

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();

    expect(selectedDateButton).toHaveFocus();
  });

  it('should not set the value to the date if it is after the maxDate', async () => {
    const valueDate = new Date('January 23, 2020');
    const maxDate = new Date('January 10, 2020');

    const { getByLabelText } = render(
      <DatePicker
        labelText="Date Picker Label"
        value={valueDate}
        maxDate={maxDate}
      />
    );

    await waitFor(() => {
      expect(getByLabelText('Date Picker Label')).toHaveAttribute('value', '');
    });
  });

  it('should keep the user inputted date in the input even if it is before the minDate', async () => {
    const labelText = 'Date Picker Label';
    const valueDate = '01/20/2020';
    const minDate = '02/02/2020';
    const defaultDate = '02/20/2020';

    const { getByLabelText } = render(
      <DatePicker
        labelText={labelText}
        minDate={minDate}
        defaultDate={defaultDate}
      />
    );

    const datePickerInput = getByLabelText('Date Picker Label');

    expect(datePickerInput).toHaveAttribute('value', defaultDate);

    await userEvent.type(
      getByLabelText(labelText),
      `{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}${valueDate}`
    );

    expect(datePickerInput).toHaveAttribute('value', valueDate);

    act(() => {
      getByLabelText('Toggle Calendar Widget').focus();
    });

    expect(datePickerInput).not.toHaveFocus();
    expect(datePickerInput).toHaveAttribute('value', valueDate);
  });

  it('should keep the user inputted date in the input even if it is before the maxDate', async () => {
    const labelText = 'Date Picker Label';
    const valueDate = '03/20/2020';
    const maxDate = '02/02/2020';
    const defaultDate = '01/20/2020';

    const { getByLabelText } = render(
      <DatePicker
        labelText={labelText}
        maxDate={maxDate}
        defaultDate={defaultDate}
      />
    );

    const datePickerInput = getByLabelText('Date Picker Label');

    expect(datePickerInput).toHaveAttribute('value', defaultDate);

    await userEvent.type(
      getByLabelText(labelText),
      `{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}${valueDate}`
    );

    expect(datePickerInput).toHaveAttribute('value', valueDate);

    act(() => {
      getByLabelText('Toggle Calendar Widget').focus();
    });

    expect(datePickerInput).not.toHaveFocus();
    expect(datePickerInput).toHaveAttribute('value', valueDate);
  });

  it('should disable a date the does not fall in the min and max date range', async () => {
    const minDate = new Date('January 5, 2020');
    const maxDate = new Date('January 10, 2020');

    const { container, getByText } = render(
      <DatePicker
        labelText="Date Picker Label"
        minDate={minDate}
        maxDate={maxDate}
      />
    );

    await waitFor(() => {
      container.querySelector('table').focus();
    });

    expect(getByText('1')).toHaveAttribute('aria-disabled');
    expect(getByText('12')).toHaveAttribute('aria-disabled');
  });

  it('should render custom placeholder text', async () => {
    const customPlaceholder = 'Custom text';

    const { getByLabelText } = render(
      <DatePicker
        placeholder={customPlaceholder}
        labelText="Date Picker Label"
      />
    );

    await waitFor(() => {
      expect(getByLabelText('Date Picker Label')).toHaveAttribute(
        'placeholder',
        customPlaceholder
      );
    });
  });

  it('should render a helper message on the date picker input', async () => {
    const helperMessage = 'Help information';

    const { getByText } = render(
      <DatePicker labelText="Date Picker Label" helperMessage={helperMessage} />
    );

    await waitFor(() => {
      expect(getByText(helperMessage)).not.toBeNull();
    });
  });

  it('should render an error message on the date picker input', async () => {
    const errorMessage = 'Help information';

    const { getByText } = render(
      <DatePicker labelText="Date Picker Label" errorMessage={errorMessage} />
    );

    await waitFor(() => {
      expect(getByText(errorMessage)).not.toBeNull();
    });
  });

  it('should require the date picker input', async () => {
    const labelText = 'Date Picker Label';

    const { getByLabelText } = render(
      <DatePicker labelText={labelText} required />
    );

    await waitFor(() => {
      expect(getByLabelText(labelText)).toHaveAttribute('required');
    });
  });

  it('should watch for input change', async () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();
    const labelText = 'Date Picker Label';

    const { getByLabelText } = render(
      <DatePicker
        labelText={labelText}
        onChange={onChange}
        onInputChange={onInputChange}
      />
    );

    await userEvent.type(getByLabelText(labelText), 'new value');

    expect(onChange).toHaveBeenCalled();
    expect(onInputChange).toHaveBeenCalled();
  });

  it('should call passed in handle focus function', async () => {
    const onInputFocus = jest.fn();
    const labelText = 'Date Picker Label';

    const { findByLabelText } = render(
      <DatePicker labelText={labelText} onInputFocus={onInputFocus} />
    );
    const datePickerInput = await findByLabelText(labelText);

    act(() => {
      datePickerInput.focus();
    });

    expect(onInputFocus).toHaveBeenCalled();
  });

  it('should call passed in handle blur function', async () => {
    const onInputBlur = jest.fn();
    const labelText = 'Date Picker Label';

    const { findByLabelText } = render(
      <DatePicker labelText={labelText} onInputBlur={onInputBlur} />
    );

    const datePickerInput = await findByLabelText(labelText);
    const toggleButton = await findByLabelText('Toggle Calendar Widget');

    act(() => {
      datePickerInput.focus();
      toggleButton.focus();
    });

    expect(onInputBlur).toHaveBeenCalled();
  });

  // TODO: Fix test (The logic for DatePicker was changed)
  xit('should change the focused date and call on change on blur if the typed in date is a valid date', async () => {
    const onChange = jest.fn();
    const labelText = 'Date Picker Label';

    const { findByLabelText } = render(
      <DatePicker labelText={labelText} onChange={onChange} />
    );

    const datePickerInput = await findByLabelText(labelText);
    const toggleButton = await findByLabelText('Toggle Calendar Widget');

    act(() => {
      datePickerInput.focus();
    });

    await userEvent.type(datePickerInput, '1/1/1991');

    act(() => {
      toggleButton.focus();
    });

    expect(onChange).toHaveBeenCalled();

    await userEvent.click(toggleButton);

    expect(
      getByText(new Date('1/1/1991').getDate().toString())
    ).not.toHaveStyleRule('border-color', 'transparent');
  });

  // TODO: Fix test (The logic for DatePicker was changed)
  xit('should handle a date lower than the year 1000', async () => {
    const onChange = jest.fn();
    const labelText = 'Date Picker Label';

    const { findByLabelText } = render(
      <DatePicker labelText={labelText} onChange={onChange} />
    );

    const datePickerInput = await findByLabelText(labelText);
    const toggleButton = await findByLabelText('Toggle Calendar Widget');

    act(() => {
      datePickerInput.focus();
    });

    await userEvent.type(datePickerInput, '1/1/0123');

    act(() => {
      toggleButton.focus();
    });

    expect(onChange).toHaveBeenCalled();

    await userEvent.click(toggleButton);

    expect(
      getByText(new Date('1/1/0123').getDate().toString())
    ).not.toHaveStyleRule('border-color', 'transparent');
  });

  it('should open the calendar month when the icon button is clicked', async () => {
    const defaultDate = new Date('January 17, 2019');

    const { getByLabelText, getByTestId } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');

    await userEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByTestId('calendarContainer')).toHaveStyleRule(
      'display',
      'block'
    );
  });

  it('should focus the calendar header when the calendar is opened with no chosen date', async () => {
    const now = new Date();
    const monthYear = format(now, 'MMMM yyyy');

    const { getByLabelText, getByText } = render(
      <DatePicker labelText="Date Picker Label" />
    );

    await userEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText(monthYear)).toBe(document.activeElement.firstChild);
  });

  it('should focus the chosen date when the calendar is opened', async () => {
    const defaultDate = new Date('January 17, 2019');

    const { getByLabelText, getByText } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    await userEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText('17')).toBe(document.activeElement);
  });

  it('should take focus off of chosen date when none valid date in input', async () => {
    const defaultDate = new Date('January 17, 2019');
    const now = new Date();
    const labelText = 'Date Picker Label';

    const { getByLabelText, getByText } = render(
      <DatePicker defaultDate={defaultDate} labelText={labelText} />
    );

    act(() => {
      getByLabelText(labelText).focus();
    });

    await userEvent.type(getByLabelText(labelText), '12');

    act(() => {
      getByLabelText('Toggle Calendar Widget').focus();
    });

    await userEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText(format(now, 'MMMM yyyy'))).not.toBeNull();
    expect(getByText(format(now, 'd'))).not.toBe(document.activeElement);
  });

  it('should go to the previous month when the previous month button is clicked', async () => {
    const defaultDate = new Date('January 17, 2019');
    const labelText = 'Date Picker Label';

    const { getByLabelText, getByText } = render(
      <DatePicker defaultDate={defaultDate} labelText={labelText} />
    );

    await userEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText(/january/i)).toBeInTheDocument();

    await userEvent.click(getByLabelText(/previous month/i));

    expect(getByText(/december/i)).toBeInTheDocument();
  });

  it('should go to the next month when the next month button is clicked', async () => {
    const defaultDate = new Date('January 17, 2019');
    const labelText = 'Date Picker Label';

    const { getByLabelText, getByText } = render(
      <DatePicker defaultDate={defaultDate} labelText={labelText} />
    );

    await userEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText(/january/i)).toBeInTheDocument();

    await userEvent.click(getByLabelText(/next month/i));

    expect(getByText(/february/i)).toBeInTheDocument();
  });

  it('should close the calendar when the close button is clicked', async () => {
    const { container, getByLabelText, getByTestId } = render(
      <DatePicker labelText="Date Picker Label" />
    );

    await userEvent.click(getByLabelText('Toggle Calendar Widget'));

    await userEvent.click(getByLabelText(/close calendar/i));

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');
    expect(document.activeElement).toBe(container.querySelector('button'));
  });

  it('should close the calendar when there is an input change', async () => {
    const { getByLabelText, getByTestId } = render(
      <DatePicker labelText="Date Picker Label" />
    );

    await userEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByTestId('calendarContainer')).not.toHaveStyleRule(
      'display',
      'none'
    );

    await userEvent.type(getByLabelText('Date Picker Label'), '12');

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');
  });

  it('should close the calendar month when the escape key is pressed', async () => {
    const defaultDate = new Date('January 17, 2019');

    const { getByLabelText, getByTestId } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    await userEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByTestId('calendarContainer')).toHaveStyleRule(
      'display',
      'block'
    );

    await userEvent.keyboard('{Escape}');

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');
  });

  it('inside a modal, should close the calendar month when no date is selected and the escape key is pressed, and retain the active modal', async () => {
    const { getByTestId, getByLabelText } = render(
      <Modal testId="modal" isOpen>
        <DatePicker labelText="Date Picker inside a modal" />
      </Modal>
    );

    const calendarButton = getByLabelText('Toggle Calendar Widget');

    await userEvent.click(calendarButton);

    expect(getByTestId('calendarContainer')).toHaveStyleRule(
      'display',
      'block'
    );

    await userEvent.keyboard('{Escape}');

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');
    expect(getByTestId('modal')).toBeInTheDocument();
  });

  it('inside a modal, should close the calendar month when date is selected and the escape key is pressed, and retain the active modal', async () => {
    const { getByTestId, getByLabelText } = render(
      <Modal testId="modal" isOpen>
        <DatePicker labelText="Date Picker inside a modal" />
      </Modal>
    );

    const calendarButton = getByLabelText('Toggle Calendar Widget');

    await userEvent.click(calendarButton);

    expect(getByTestId('calendarContainer')).toHaveStyleRule(
      'display',
      'block'
    );

    await userEvent.type(getByLabelText('Date Picker inside a modal'), '12');
    await userEvent.click(calendarButton);
    await userEvent.keyboard('{Escape}');

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');
    expect(getByTestId('modal')).toBeInTheDocument();
  });

  it('should default to the min date when it is later than today', async () => {
    const now = new Date();
    const minDate = format(addMonths(now, 2), 'MM/dd/yyyy');
    const monthYear = format(addMonths(now, 2), 'MMMM yyyy');

    const { getByLabelText, getByText } = render(
      <DatePicker minDate={minDate} labelText="Date Picker Label" />
    );

    await userEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText(monthYear)).toBe(document.activeElement.firstChild);
  });

  it('should handle a day click', async () => {
    const onChange = jest.fn();
    const onDateChange = jest.fn();
    const defaultDate = new Date();
    const labelText = 'Date picker label';

    const { getByText, container } = render(
      <DatePicker
        defaultDate={defaultDate}
        labelText={labelText}
        onChange={onChange}
        onDateChange={onDateChange}
      />
    );

    act(() => {
      container.querySelector('table').focus();
    });

    await userEvent.click(getByText(defaultDate.getDate().toString()));

    expect(onDateChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
  });

  describe('on key down press', () => {
    it('types in the input if you type anything other than the question mark key', async () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';

      const { getByLabelText, queryByRole } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      const datePickerInput = getByLabelText(labelText);

      act(() => {
        datePickerInput.focus();
      });

      await userEvent.type(datePickerInput, 'abc123');

      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    // TODO: Fix test (Incorrect except, use not.toHaveFocus() and not.toHaveSelection())
    it('does not update focused date if date is not focused', async () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';

      const { getByLabelText, getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      const nextMonthButton = getByLabelText(/next month/i);

      act(() => {
        nextMonthButton.focus();
      });

      await userEvent.keyboard('{ArrowUp}');

      act(() => {
        container.querySelector('table').focus();
      });

      expect(getByText(defaultDate.getDate().toString())).not.toHaveStyleRule(
        'border-color',
        'transparent'
      );
    });

    // TODO: Fix test (Incorrect except, use toHaveFocus())
    it('ArrowUp', async () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';

      const { getByText, getByLabelText } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      await userEvent.click(getByLabelText('Toggle Calendar Widget'));
      await userEvent.keyboard('{ArrowUp}');

      expect(
        getByText(subWeeks(defaultDate, 1).getDate().toString())
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    // TODO: Fix test (Incorrect except, use toHaveFocus())
    it('ArrowLeft', async () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';

      const { getByText, getByLabelText } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      await userEvent.click(getByLabelText('Toggle Calendar Widget'));
      await userEvent.keyboard('{ArrowLeft}');

      expect(
        getByText(subDays(defaultDate, 1).getDate().toString())
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    // TODO: Fix test (Incorrect except, use toHaveFocus())
    it('Home', async () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';

      const { getByText, getByLabelText } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      await userEvent.click(getByLabelText('Toggle Calendar Widget'));
      await userEvent.keyboard('{Home}');

      expect(
        getByText(startOfWeek(defaultDate, 1).getDate().toString())
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    // TODO: Fix test (Incorrect except, use toHaveFocus())
    it('PageUp', async () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';

      const { getByText, getByLabelText } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      await userEvent.click(getByLabelText('Toggle Calendar Widget'));
      await userEvent.keyboard('{PageUp}');

      expect(
        getByText(subMonths(defaultDate, 1).getDate().toString())
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    // TODO: Fix test (Incorrect except, use toHaveFocus())
    it('PageDown', async () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';

      const { getByText, getByLabelText } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      await userEvent.click(getByLabelText('Toggle Calendar Widget'));
      await userEvent.keyboard('{PageDown}');

      expect(
        getByText(addMonths(defaultDate, 1).getDate().toString())
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    // TODO: Fix test (Incorrect except, use toHaveFocus())
    it('ArrowDown', async () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';

      const { getByText, getByLabelText } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      await userEvent.click(getByLabelText('Toggle Calendar Widget'));
      await userEvent.keyboard('{ArrowDown}');

      expect(
        getByText(addWeeks(defaultDate, 1).getDate().toString())
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    // TODO: Fix test (Incorrect except, use toHaveFocus())
    it('ArrowRight', async () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';

      const { getByText, getByLabelText } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      await userEvent.click(getByLabelText('Toggle Calendar Widget'));
      await userEvent.keyboard('{ArrowRight}');

      expect(
        getByText(addDays(defaultDate, 1).getDate().toString())
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    // TODO: Fix test (Incorrect except, use toHaveFocus())
    it('End', async () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';

      const { getByText, getByLabelText } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      await userEvent.click(getByLabelText('Toggle Calendar Widget'));
      await userEvent.keyboard('{End}');

      expect(
        getByText(endOfWeek(defaultDate).getDate().toString())
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('Escape', async () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';

      const { getByLabelText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      await userEvent.click(getByLabelText('Toggle Calendar Widget'));
      await userEvent.tab();
      await userEvent.tab();
      await userEvent.tab();
      await userEvent.keyboard('{Escape}');

      expect(container.querySelector('table')).not.toBeVisible();
      expect(document.activeElement).toBe(container.querySelector('button'));
    });

    it('Escape without focus', async () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';

      const { container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      act(() => {
        container.querySelector('input').focus();
      });

      await userEvent.keyboard('{Escape}');

      expect(container.querySelector('table')).not.toBeVisible();
    });

    it('Enter', async () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';

      const { getByLabelText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      await userEvent.click(getByLabelText('Toggle Calendar Widget'));
      await userEvent.keyboard('{Enter}');

      expect(
        isSameDay(new Date(container.querySelector('input').value), defaultDate)
      ).toBeTruthy();
    });

    it('Spacebar', async () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';

      const { getByLabelText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      await userEvent.click(getByLabelText('Toggle Calendar Widget'));
      await userEvent.keyboard('{Enter}');

      expect(
        isSameDay(new Date(container.querySelector('input').value), defaultDate)
      ).toBeTruthy();
    });

    it('does not update the focused date if a bad key press occurs', async () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';

      const { getByText, getByLabelText } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      await userEvent.click(getByLabelText('Toggle Calendar Widget'));
      await userEvent.keyboard('{f}');

      expect(getByText(defaultDate.getDate().toString())).toHaveFocus();
    });
  });

  describe('i18n', () => {
    it('formats dates with the locale', async () => {
      const { getByText, getByLabelText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            locale: es,
          }}
        >
          <DatePicker
            labelText="Spanish"
            defaultDate={new Date('April 10, 2020')}
          />
        </I18nContext.Provider>
      );

      await waitFor(() => {
        expect(getByText('Abril 2020')).toBeInTheDocument();
        expect(getByLabelText(`Previous Month marzo 2020`)).toBeInTheDocument();
        expect(getByLabelText(`Next Month mayo 2020`)).toBeInTheDocument();
      });
    });

    it('min days string in the i18n context', async () => {
      const min = {
        sunday: 'i18nSu',
        monday: 'i18nMo',
        tuesday: 'i18nTu',
        wednesday: 'i18nWe',
        thursday: 'i18nTh',
        friday: 'i18nFr',
        saturday: 'i18nSa',
      };

      const { getByText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            days: {
              ...defaultI18n.days,
              min,
            },
          }}
        >
          <DatePicker labelText="Spanish" />
        </I18nContext.Provider>
      );

      await waitFor(() => {
        expect(getByText(min.sunday)).toBeInTheDocument();
        expect(getByText(min.monday)).toBeInTheDocument();
        expect(getByText(min.tuesday)).toBeInTheDocument();
        expect(getByText(min.wednesday)).toBeInTheDocument();
        expect(getByText(min.thursday)).toBeInTheDocument();
        expect(getByText(min.friday)).toBeInTheDocument();
        expect(getByText(min.saturday)).toBeInTheDocument();
      });
    });

    it('previous and next month aria labels override', async () => {
      const { getByLabelText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            datePicker: {
              ...defaultI18n.datePicker,
              previousMonthAriaLabel: 'I am previous',
              nextMonthAriaLabel: 'I am next',
            },
          }}
        >
          <DatePicker labelText="Spanish" />
        </I18nContext.Provider>
      );

      await waitFor(() => {
        expect(getByLabelText(/i am previous/i)).toBeInTheDocument();
        expect(getByLabelText(/i am next/i)).toBeInTheDocument();
      });
    });

    it('help button aria label override', async () => {
      const { getByLabelText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            datePicker: {
              ...defaultI18n.datePicker,
              helpModal: {
                ...defaultI18n.datePicker.helpModal,
                helpButtonAriaLabel: 'I am the help button',
              },
            },
          }}
        >
          <DatePicker labelText="Spanish" />
        </I18nContext.Provider>
      );

      await waitFor(() => {
        expect(getByLabelText(/i am the help button/i)).toBeInTheDocument();
      });
    });

    it('calendar close aria label override', async () => {
      const { getByLabelText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            datePicker: {
              ...defaultI18n.datePicker,
              calendarCloseAriaLabel: 'I am the close button',
            },
          }}
        >
          <DatePicker labelText="Spanish" />
        </I18nContext.Provider>
      );

      await waitFor(() => {
        expect(getByLabelText(/i am the close button/i)).toBeInTheDocument();
      });
    });

    it('start of week override', async () => {
      const { container } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            datePicker: {
              ...defaultI18n.datePicker,
              startOfWeek: 'wednesday',
            },
          }}
        >
          <DatePicker
            defaultDate={new Date('January 10, 2020')}
            labelText="Start of Week"
          />
        </I18nContext.Provider>
      );

      const startOfMonthDate = startOfMonth(new Date('January 10, 2020'));
      const firstDayOfMonthDayOfWeek = getDay(startOfMonthDate);

      const allRows = container.querySelectorAll('tr');
      const dayRow = allRows[0];
      const firstDayOfMonthElement =
        allRows[1].children[firstDayOfMonthDayOfWeek - 3];

      await waitFor(() => {
        expect(dayRow.children[0].textContent).toEqual('W');
        expect(firstDayOfMonthElement.textContent).toEqual('1');
      });
    });
  });

  describe('Date formats', () => {
    it('supports dd/MM/yyyy format', async () => {
      const defaultDate = new Date('July 24, 2022');
      const selectDate = new Date('July 27, 2022');
      const label = 'dd/MM/yyyy Date Picker';

      const { getByText, getByLabelText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            dateFormat: 'dd/MM/yyyy',
          }}
        >
          <DatePicker labelText={label} defaultDate={defaultDate} />
        </I18nContext.Provider>
      );

      const datePickerInput = getByLabelText(label);
      const calendar = getByLabelText('Toggle Calendar Widget');

      expect(datePickerInput).toHaveAttribute('placeholder', 'dd/mm/yyyy');

      await userEvent.click(calendar);
      await userEvent.click(getByText(selectDate.getDate().toString()));

      act(() => {
        datePickerInput.blur();
      });

      expect(datePickerInput).toHaveAttribute('value', '27/07/2022');
    });

    it('supports yyyy/MM/dd format', async () => {
      const defaultDate = new Date('August 25, 2022');
      const selectDate = new Date('August 30, 2022');
      const label = 'yyyy/MM/dd Date Picker';

      const { getByText, getByLabelText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            dateFormat: 'yyyy/MM/dd',
          }}
        >
          <DatePicker labelText={label} defaultDate={defaultDate} />
        </I18nContext.Provider>
      );

      const datePickerInput = getByLabelText(label);
      const calendar = getByLabelText('Toggle Calendar Widget');

      expect(datePickerInput).toHaveAttribute('placeholder', 'yyyy/mm/dd');

      await userEvent.click(calendar);
      await userEvent.click(getByText(selectDate.getDate().toString()));

      act(() => {
        datePickerInput.blur();
      });

      expect(datePickerInput).toHaveAttribute('value', '2022/08/30');
    });

    it('supports yyyy/dd/MM format', async () => {
      const defaultDate = new Date('September 1, 2022');
      const selectDate = new Date('September 29, 2022');
      const label = 'yyyy/dd/MM Date Picker';

      const { getByText, getByLabelText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            dateFormat: 'yyyy/dd/MM',
          }}
        >
          <DatePicker labelText={label} defaultDate={defaultDate} />
        </I18nContext.Provider>
      );

      const datePickerInput = getByLabelText(label);
      const calendar = getByLabelText('Toggle Calendar Widget');

      expect(datePickerInput).toHaveAttribute('placeholder', 'yyyy/dd/mm');

      await userEvent.click(calendar);
      await userEvent.click(getByText(selectDate.getDate().toString()));

      act(() => {
        datePickerInput.blur();
      });

      expect(datePickerInput).toHaveAttribute('value', '2022/29/09');
    });

    it('supports MMMM d, yyyy format', async () => {
      const defaultDate = new Date('November 3, 2022');
      const selectDate = new Date('November 21, 2022');
      const label = 'MMMM d, yyyy Date Picker';

      const { getByText, getByLabelText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            dateFormat: 'MMMM d, yyyy',
          }}
        >
          <DatePicker labelText={label} defaultDate={defaultDate} />
        </I18nContext.Provider>
      );

      const datePickerInput = getByLabelText(label);
      const calendar = getByLabelText('Toggle Calendar Widget');

      expect(datePickerInput).toHaveAttribute('placeholder', 'mmmm d, yyyy');

      await userEvent.click(calendar);
      await userEvent.click(getByText(selectDate.getDate().toString()));

      act(() => {
        datePickerInput.blur();
      });

      expect(datePickerInput).toHaveAttribute('value', 'November 21, 2022');
    });
  });
});
