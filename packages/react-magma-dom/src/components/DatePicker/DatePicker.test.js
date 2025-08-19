import React from 'react';

import { fireEvent, render } from '@testing-library/react';
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

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('Date Picker', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <DatePicker labelText="Date Picker Label" testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render an input', () => {
    const { getByLabelText } = render(
      <DatePicker labelText="Date Picker Label" />
    );

    expect(getByLabelText('Date Picker Label')).not.toBeNull();
    expect(getByLabelText('Date Picker Label')).toHaveAttribute(
      'placeholder',
      'mm/dd/yyyy'
    );
  });

  it('should render with a default date', () => {
    const defaultDate = new Date(2019, 0, 17);
    const { getByLabelText } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    expect(getByLabelText('Date Picker Label')).toHaveAttribute(
      'value',
      format(defaultDate, 'MM/dd/yyyy')
    );
  });

  it('should render a Clear icon if isClearable prop is true', () => {
    const valueDate = new Date(2019, 0, 23);
    const { getByTestId } = render(
      <DatePicker value={valueDate} isClearable labelText="Date Picker Label" />
    );

    expect(getByTestId('clear-button')).toBeInTheDocument();
  });

  it('should clear input and Chosen Date value after clicking on isClearable X button', () => {
    const labelText = 'Date Picker Label';
    const now = new Date();
    const day =
      format(now, 'dd')[0] === '0' ? format(now, 'dd')[1] : format(now, 'dd');
    const chosenDate = `${
      now.getMonth() + 1
    }/${now.getDate()}/${now.getFullYear()}`;

    const { getByText, getAllByText, getByTestId, getByLabelText } = render(
      <ClearingTheDate labelText={labelText} />
    );

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getAllByText(day)[0]).toBeInTheDocument();
    fireEvent.click(getAllByText(day)[0]);

    expect(getByText('Chosen Date:').nextSibling.innerHTML).toEqual(chosenDate);

    fireEvent.click(getByTestId('clear-button'));

    expect(getByLabelText('Date Picker Label')).toHaveAttribute('value', '');
    expect(getByText('Chosen Date:').nextSibling).not.toBeInTheDocument();
  });

  it('should clear input and Chosen Date value after clicking on Clear Date button', () => {
    const labelText = 'Date Picker Label';
    const now = new Date();
    const day =
      format(now, 'dd')[0] === '0' ? format(now, 'dd')[1] : format(now, 'dd');
    const chosenDate = `${
      now.getMonth() + 1
    }/${now.getDate()}/${now.getFullYear()}`;

    const { getByText, getAllByText, getByLabelText } = render(
      <ClearingTheDate labelText={labelText} />
    );

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getAllByText(day)[0]).toBeInTheDocument();
    fireEvent.click(getAllByText(day)[0]);

    expect(getByText('Chosen Date:').nextSibling.innerHTML).toEqual(chosenDate);

    fireEvent.click(getByText('Clear Date').parentElement);

    expect(getByLabelText('Date Picker Label')).toHaveAttribute('value', '');
    expect(getByText('Chosen Date:').nextSibling).not.toBeInTheDocument();
  });

  it('should set the value to the date in the value prop', () => {
    const defaultDate = new Date(2019, 0, 17);
    const valueDate = new Date(2019, 0, 23);

    const { getByLabelText } = render(
      <DatePicker
        defaultDate={defaultDate}
        labelText="Date Picker Label"
        value={valueDate}
      />
    );

    expect(getByLabelText('Date Picker Label')).toHaveAttribute(
      'value',
      format(valueDate, 'MM/dd/yyyy')
    );
  });

  it('should not set the value to the date if it is before the minDate', () => {
    const valueDate = new Date(2019, 0, 23);
    const minDate = new Date(2020, 0, 10);

    const { getByLabelText } = render(
      <DatePicker
        labelText="Date Picker Label"
        value={valueDate}
        minDate={minDate}
      />
    );

    expect(getByLabelText('Date Picker Label')).toHaveAttribute('value', '');
  });

  it('should not allow to navigate through inactive days', () => {
    const minDate = new Date(2020, 0, 10);
    const valueDate = new Date(2020, 0, 11);
    const monthYear = format(valueDate, 'MMMM yyyy');
    const [month, year] = monthYear.split(' ');

    const { getByText, getByRole } = render(
      <DatePicker minDate={minDate} value={valueDate} />
    );

    expect(getByText(month)).toBeInTheDocument();
    expect(getByText(year)).toBeInTheDocument();

    const selectedDateButton = getByText(11);
    const button = getByRole('button');

    userEvent.click(button);

    expect(selectedDateButton).toBeInTheDocument();
    expect(selectedDateButton).toHaveFocus();

    userEvent.keyboard('[ArrowLeft]');

    expect(selectedDateButton).not.toHaveFocus();

    const startDateButton = getByText(10);
    expect(startDateButton).toBeInTheDocument();
    expect(startDateButton).toHaveFocus();

    userEvent.keyboard('[ArrowUp]');
    userEvent.keyboard('[ArrowLeft]');

    expect(startDateButton).toHaveFocus();

    userEvent.keyboard('[ArrowRight]');

    expect(startDateButton).not.toHaveFocus();
    expect(selectedDateButton).toHaveFocus();

    userEvent.keyboard('[ArrowDown]');

    expect(getByText(18)).toHaveFocus();
  });

  it('should lock focus inside', () => {
    const valueDate = new Date(2020, 0, 1);

    const { getByRole, getAllByText } = render(
      <DatePicker value={valueDate} />
    );

    const selectedDateButton = getAllByText(1)[0];
    const button = getByRole('button');

    userEvent.click(button);

    expect(selectedDateButton).toBeInTheDocument();
    expect(selectedDateButton).toHaveFocus();

    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();

    expect(selectedDateButton).toHaveFocus();
  });

  it('should not set the value to the date if it is after the maxDate', () => {
    const valueDate = new Date(2020, 0, 23);
    const maxDate = new Date(2020, 0, 10);

    const { getByLabelText } = render(
      <DatePicker
        labelText="Date Picker Label"
        value={valueDate}
        maxDate={maxDate}
      />
    );

    expect(getByLabelText('Date Picker Label')).toHaveAttribute('value', '');
  });

  it('should keep the user inputted date in the input even if it is before the minDate', () => {
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

    userEvent.type(
      getByLabelText(labelText),
      `{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}${valueDate}`
    );

    expect(datePickerInput).toHaveAttribute('value', valueDate);

    getByLabelText('Toggle Calendar Widget').focus();
    expect(datePickerInput).not.toHaveFocus();
    expect(datePickerInput).toHaveAttribute('value', valueDate);
  });

  it('should keep the user inputted date in the input even if it is before the maxDate', () => {
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

    userEvent.type(
      getByLabelText(labelText),
      `{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}${valueDate}`
    );

    expect(datePickerInput).toHaveAttribute('value', valueDate);

    getByLabelText('Toggle Calendar Widget').focus();
    expect(datePickerInput).not.toHaveFocus();
    expect(datePickerInput).toHaveAttribute('value', valueDate);
  });

  it('should disable a date the does not fall in the min and max date range', () => {
    const minDate = new Date(2020, 0, 5);
    const maxDate = new Date(2020, 0, 10);

    const { container, getAllByText } = render(
      <DatePicker
        labelText="Date Picker Label"
        minDate={minDate}
        maxDate={maxDate}
      />
    );

    fireEvent.focus(container.querySelector('table'));

    expect(getAllByText('1')[0]).toHaveAttribute('aria-disabled');
    expect(getAllByText('12')[0]).toHaveAttribute('aria-disabled');
  });

  it('should render custom placeholder text', () => {
    const customPlaceholder = 'Custom text';
    const { getByLabelText } = render(
      <DatePicker
        placeholder={customPlaceholder}
        labelText="Date Picker Label"
      />
    );

    expect(getByLabelText('Date Picker Label')).toHaveAttribute(
      'placeholder',
      customPlaceholder
    );
  });

  it('should render a helper message on the date picker input', () => {
    const helperMessage = 'Help information';
    const { getByText } = render(
      <DatePicker labelText="Date Picker Label" helperMessage={helperMessage} />
    );

    expect(getByText(helperMessage)).not.toBeNull();
  });

  it('should render an error message on the date picker input', () => {
    const errorMessage = 'Help information';
    const { getByText } = render(
      <DatePicker labelText="Date Picker Label" errorMessage={errorMessage} />
    );

    expect(getByText(errorMessage)).not.toBeNull();
  });

  it('should require the date picker input', () => {
    const labelText = 'Date Picker Label';
    const { getByLabelText } = render(
      <DatePicker labelText={labelText} required />
    );

    expect(getByLabelText(labelText)).toHaveAttribute('required');
  });

  it('should watch for input change', () => {
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

    fireEvent.change(getByLabelText(labelText), {
      target: { value: 'new value' },
    });

    expect(onChange).toHaveBeenCalled();
    expect(onInputChange).toHaveBeenCalled();
  });

  it('should call passed in handle focus function', () => {
    const onInputFocus = jest.fn();
    const labelText = 'Date Picker Label';
    const { getByLabelText } = render(
      <DatePicker labelText={labelText} onInputFocus={onInputFocus} />
    );

    getByLabelText(labelText).focus();

    expect(onInputFocus).toHaveBeenCalled();
  });

  it('should call passed in handle blur function', () => {
    const onInputBlur = jest.fn();
    const labelText = 'Date Picker Label';
    const { getByLabelText } = render(
      <DatePicker labelText={labelText} onInputBlur={onInputBlur} />
    );

    getByLabelText(labelText).focus();

    getByLabelText('Toggle Calendar Widget').focus();

    expect(onInputBlur).toHaveBeenCalled();
  });

  it('should change the focused date and call on change on blur if the typed in date is a valid date', () => {
    const onChange = jest.fn();
    const labelText = 'Date Picker Label';
    const { getByLabelText, getAllByText } = render(
      <DatePicker labelText={labelText} onChange={onChange} />
    );

    getByLabelText(labelText).focus();

    fireEvent.change(getByLabelText(labelText), {
      target: { value: '1/1/1991' },
    });

    getByLabelText('Toggle Calendar Widget').focus();

    expect(onChange).toHaveBeenCalled();

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(
      getAllByText(new Date(1991, 0, 1).getDate().toString())[0]
    ).not.toHaveStyleRule('border-color', 'transparent');
  });

  it('should handle a date lower than the year 1000', () => {
    const onChange = jest.fn();
    const labelText = 'Date Picker Label';
    const { getByLabelText, getAllByText } = render(
      <DatePicker labelText={labelText} onChange={onChange} />
    );

    getByLabelText(labelText).focus();

    fireEvent.change(getByLabelText(labelText), {
      target: { value: '1/1/0123' },
    });

    getByLabelText('Toggle Calendar Widget').focus();

    expect(onChange).toHaveBeenCalled();

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(
      getAllByText(new Date(123, 0, 1).getDate().toString())[0]
    ).not.toHaveStyleRule('border-color', 'transparent');
  });

  it('should open the calendar month when the icon button is clicked', () => {
    const defaultDate = new Date(2019, 0, 17);
    const { getByLabelText, getByTestId } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByTestId('calendarContainer')).toHaveStyleRule(
      'display',
      'block'
    );
  });

  it('should focus the calendar header when the calendar is opened with no chosen date', () => {
    const defaultDate = new Date(2019, 0, 17);
    const monthYear = format(defaultDate, 'MMMM yyyy');
    const [month, year] = monthYear.split(' ');
    const { getByLabelText, getAllByTestId } = render(
      <DatePicker labelText="Date Picker Label" />
    );
    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    const monthElement = getAllByTestId('selectedItemText')[0];
    const yearElement = getAllByTestId('selectedItemText')[1];

    expect(monthElement).toBeInTheDocument(document.activeElement);
    expect(monthElement).toBeInTheDocument(month);
    expect(yearElement).toBeInTheDocument(year);
  });

  it('should focus the chosen date when the calendar is opened', () => {
    const defaultDate = new Date(2019, 0, 17);
    const { getByLabelText, getByText } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );
    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText('17')).toBe(document.activeElement);
  });

  it('should take focus off of chosen date when none valid date in input', () => {
    const defaultDate = new Date(2019, 0, 17);
    const now = new Date();
    const [month, year] = format(now, 'MMMM yyyy').split(' ');
    const labelText = 'Date Picker Label';
    const { getByLabelText, getByText, getAllByText } = render(
      <DatePicker defaultDate={defaultDate} labelText={labelText} />
    );

    getByLabelText(labelText).focus();

    fireEvent.change(getByLabelText(labelText), {
      target: { value: '12' },
    });

    getByLabelText('Toggle Calendar Widget').focus();

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText(month)).not.toBeNull();
    expect(getByText(year)).not.toBeNull();
    expect(getAllByText(format(now, 'd'))[0]).not.toBe(document.activeElement);
  });

  it('should go to the previous month when the previous month button is clicked', () => {
    const defaultDate = new Date(2019, 0, 17);
    const labelText = 'Date Picker Label';
    const { getByLabelText, getByText } = render(
      <DatePicker defaultDate={defaultDate} labelText={labelText} />
    );

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText(/january/i)).toBeInTheDocument();

    fireEvent.click(getByLabelText(/Navigate back/i));

    expect(getByText(/december/i)).toBeInTheDocument();
  });

  it('should go to the next month when the next month button is clicked', () => {
    const defaultDate = new Date(2019, 0, 17);
    const labelText = 'Date Picker Label';
    const { getByLabelText, getByText } = render(
      <DatePicker defaultDate={defaultDate} labelText={labelText} />
    );

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText(/january/i)).toBeInTheDocument();

    fireEvent.click(getByLabelText(/Navigate forward/i));

    expect(getByText(/february/i)).toBeInTheDocument();
  });

  it('should close the calendar when the close button is clicked', () => {
    const { container, getByLabelText, getByTestId } = render(
      <DatePicker labelText="Date Picker Label" />
    );

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    fireEvent.click(getByLabelText(/close calendar/i));

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');
    expect(document.activeElement).toBe(container.querySelector('button'));
  });

  it('should close the calendar when there is an input change', () => {
    const { getByLabelText, getByTestId } = render(
      <DatePicker labelText="Date Picker Label" />
    );

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByTestId('calendarContainer')).not.toHaveStyleRule(
      'display',
      'none'
    );

    fireEvent.change(getByLabelText('Date Picker Label'), {
      target: { value: '12' },
    });

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');
  });

  it('should close the calendar month when the escape key is pressed', () => {
    const defaultDate = new Date(2019, 0, 17);
    const { getByLabelText, getByTestId } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByTestId('calendarContainer')).toHaveStyleRule(
      'display',
      'block'
    );

    fireEvent.keyDown(getByLabelText('Toggle Calendar Widget'), {
      key: 'Escape',
      code: 27,
    });

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');
  });

  it('inside a modal, should close the calendar month when no date is selected and the escape key is pressed, and retain the active modal', () => {
    const { getByTestId, getByLabelText } = render(
      <Modal testId="modal" isOpen>
        <DatePicker labelText="Date Picker inside a modal" />
      </Modal>
    );

    const calendarButton = getByLabelText('Toggle Calendar Widget');

    fireEvent.click(calendarButton);
    expect(getByTestId('calendarContainer')).toHaveStyleRule(
      'display',
      'block'
    );
    fireEvent.keyDown(calendarButton, {
      key: 'Escape',
      code: 27,
    });

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');
    expect(getByTestId('modal')).toBeInTheDocument();
  });

  it('inside a modal, should close the calendar month when date is selected and the escape key is pressed, and retain the active modal', () => {
    const { getByTestId, getByLabelText } = render(
      <Modal testId="modal" isOpen>
        <DatePicker labelText="Date Picker inside a modal" />
      </Modal>
    );

    const calendarButton = getByLabelText('Toggle Calendar Widget');

    fireEvent.click(calendarButton);
    expect(getByTestId('calendarContainer')).toHaveStyleRule(
      'display',
      'block'
    );
    fireEvent.change(getByLabelText('Date Picker inside a modal'), {
      target: { value: '12' },
    });
    fireEvent.click(calendarButton);
    fireEvent.keyDown(calendarButton, {
      key: 'Escape',
      code: 27,
    });

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');
    expect(getByTestId('modal')).toBeInTheDocument();
  });

  it('should default to the min date when it is later than today', () => {
    const now = new Date();
    const minDate = format(addMonths(now, 2), 'MM/dd/yyyy');
    const monthYear = format(addMonths(now, 2), 'MMMM yyyy');
    const [month, year] = monthYear.split(' ');

    const { getByLabelText, getAllByTestId } = render(
      <DatePicker minDate={minDate} labelText="Date Picker Label" />
    );
    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    const monthElement = getAllByTestId('selectedItemText')[0];
    const yearElement = getAllByTestId('selectedItemText')[1];

    expect(monthElement).toBeInTheDocument(document.activeElement);
    expect(monthElement).toBeInTheDocument(month);
    expect(yearElement).toBeInTheDocument(year);
  });

  it('should handle a day click', () => {
    const onChange = jest.fn();
    const onDateChange = jest.fn();
    const defaultDate = new Date();
    const labelText = 'Date picker label';
    const { getAllByText, container } = render(
      <DatePicker
        defaultDate={defaultDate}
        labelText={labelText}
        onChange={onChange}
        onDateChange={onDateChange}
      />
    );

    fireEvent.focus(container.querySelector('table'));

    fireEvent.click(getAllByText(defaultDate.getDate().toString())[0]);

    expect(onDateChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
  });

  describe('on key down press', () => {
    it('types in the input if you type anything other than the question mark key', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByLabelText, queryByRole } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      const datePickerInput = getByLabelText(labelText);
      fireEvent.focus(datePickerInput);

      fireEvent.keyDown(datePickerInput, {
        key: 'abc123',
      });

      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('does not update focused date if date is not focused', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByLabelText, getAllByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      const nextMonthButton = getByLabelText(/Navigate forward/i);
      fireEvent.focus(nextMonthButton);

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'ArrowUp',
        code: 38,
      });

      fireEvent.focus(container.querySelector('table'));

      expect(
        getAllByText(defaultDate.getDate().toString())[0]
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('ArrowUp', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getAllByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getAllByText(subWeeks(defaultDate, 1).getDate().toString())[0].focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'ArrowUp',
        code: 38,
      });

      expect(
        getAllByText(subWeeks(defaultDate, 1).getDate().toString())[0]
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('ArrowLeft', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getAllByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getAllByText(defaultDate.getDate().toString())[0].focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'ArrowLeft',
        code: 37,
      });

      expect(
        getAllByText(subDays(defaultDate, 1).getDate().toString())[0]
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('Home', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getAllByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getAllByText(defaultDate.getDate().toString())[0].focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'Home',
        code: 36,
      });

      expect(
        getAllByText(startOfWeek(defaultDate, 1).getDate().toString())[0]
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('PageUp', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getAllByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getAllByText(defaultDate.getDate().toString())[0].focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'PageUp',
        code: 33,
      });

      expect(
        getAllByText(subMonths(defaultDate, 1).getDate().toString())[0]
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('PageDown', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getAllByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getAllByText(defaultDate.getDate().toString())[0].focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'PageDown',
        code: 34,
      });

      expect(
        getAllByText(addMonths(defaultDate, 1).getDate().toString())[0]
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('ArrowDown', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getAllByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getAllByText(defaultDate.getDate().toString())[0].focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'ArrowDown',
        code: 40,
      });

      expect(
        getAllByText(addWeeks(defaultDate, 1).getDate().toString())[0]
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('ArrowRight', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getAllByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getAllByText(defaultDate.getDate().toString())[0].focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'ArrowRight',
        code: 39,
      });

      expect(
        getAllByText(addDays(defaultDate, 1).getDate().toString())[0]
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('End', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getAllByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getAllByText(defaultDate.getDate().toString())[0].focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'End',
        code: 35,
      });

      expect(
        getAllByText(endOfWeek(defaultDate).getDate().toString())[0]
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('Escape', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByLabelText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.click(getByLabelText('Toggle Calendar Widget'));

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'Tab',
      });

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'Tab',
      });

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'Tab',
      });

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'Escape',
        code: 27,
      });

      expect(container.querySelector('table')).not.toBeVisible();
      expect(document.activeElement).toBe(container.querySelector('button'));
    });

    it('Escape without focus', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('input'));
      fireEvent.keyDown(container.querySelector('table'), {
        key: 'Escape',
        code: 27,
      });

      expect(container.querySelector('table')).not.toBeVisible();
    });

    it('Enter', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getAllByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getAllByText(defaultDate.getDate().toString())[0].focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'Enter',
        code: 13,
      });

      expect(
        isSameDay(new Date(container.querySelector('input').value), defaultDate)
      ).toBeTruthy();
    });

    it('Spacebar', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getAllByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getAllByText(defaultDate.getDate().toString())[0].focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'Space',
        code: 32,
      });

      expect(
        isSameDay(new Date(container.querySelector('input').value), defaultDate)
      ).toBeTruthy();
    });

    it('does not update the focused date if a bad key press occurs', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getAllByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getAllByText(defaultDate.getDate().toString())[0].focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'f',
        code: 70,
      });

      expect(
        getAllByText(defaultDate.getDate().toString())[0]
      ).not.toHaveStyleRule('border-color', 'transparent');
    });
  });

  describe('i18n', () => {
    it('formats dates with the locale', () => {
      const { getByLabelText, getAllByTestId } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            locale: es,
          }}
        >
          <DatePicker labelText="Spanish" defaultDate={new Date(2020, 3, 10)} />
        </I18nContext.Provider>
      );

      const monthElement = getAllByTestId('selectedItemText')[0];
      const yearElement = getAllByTestId('selectedItemText')[1];

      expect(monthElement).toBeInTheDocument('Abril');
      expect(yearElement).toBeInTheDocument('2020');
      expect(
        getByLabelText(`Navigate back one month marzo 2020`)
      ).toBeInTheDocument();
      expect(
        getByLabelText(`Navigate forward one month mayo 2020`)
      ).toBeInTheDocument();
    });

    it('min days string in the i18n context', () => {
      const short = {
        sunday: 'i18nSun',
        monday: 'i18nMon',
        tuesday: 'i18nTue',
        wednesday: 'i18nWed',
        thursday: 'i18nThu',
        friday: 'i18nFri',
        saturday: 'i18nSat',
      };
      const { getByText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            days: {
              ...defaultI18n.days,
              short,
            },
          }}
        >
          <DatePicker labelText="Spanish" />
        </I18nContext.Provider>
      );

      expect(getByText(short.sunday)).toBeInTheDocument();
      expect(getByText(short.monday)).toBeInTheDocument();
      expect(getByText(short.tuesday)).toBeInTheDocument();
      expect(getByText(short.wednesday)).toBeInTheDocument();
      expect(getByText(short.thursday)).toBeInTheDocument();
      expect(getByText(short.friday)).toBeInTheDocument();
      expect(getByText(short.saturday)).toBeInTheDocument();
    });

    it('previous and next month aria labels override', () => {
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

      expect(getByLabelText(/i am previous/i)).toBeInTheDocument();
      expect(getByLabelText(/i am next/i)).toBeInTheDocument();
    });

    it('help button aria label override', () => {
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

      expect(getByLabelText(/i am the help button/i)).toBeInTheDocument();
    });

    it('calendar close aria label override', () => {
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

      expect(getByLabelText(/i am the close button/i)).toBeInTheDocument();
    });

    it('start of week override', () => {
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
            defaultDate={new Date(2020, 0, 10)}
            labelText="Start of Week"
          />
        </I18nContext.Provider>
      );

      const startOfMonthDate = startOfMonth(new Date(2020, 0, 10));
      const firstDayOfMonthDayOfWeek = getDay(startOfMonthDate);

      const allRows = container.querySelectorAll('tr');
      const dayRow = allRows[0];
      const firstDayOfMonthElement =
        allRows[1].children[firstDayOfMonthDayOfWeek - 3];

      expect(dayRow.children[0].textContent).toEqual('Wed');
      expect(firstDayOfMonthElement.textContent).toEqual('1');
    });
  });

  describe('Date formats', () => {
    it('supports dd/MM/yyyy format', () => {
      const defaultDate = new Date(2022, 6, 24);
      const selectDate = new Date(2022, 6, 27);
      const label = 'dd/MM/yyyy Date Picker';
      const { getByLabelText, getAllByText } = render(
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
      fireEvent.click(calendar);
      fireEvent.click(getAllByText(selectDate.getDate().toString())[1]);
      fireEvent.blur(datePickerInput);
      expect(datePickerInput).toHaveAttribute('value', '27/07/2022');
    });

    it('supports yyyy/MM/dd format', () => {
      const defaultDate = new Date(2022, 7, 25);
      const selectDate = new Date(2022, 7, 30);
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
      fireEvent.click(calendar);
      fireEvent.click(getByText(selectDate.getDate().toString()));
      fireEvent.blur(datePickerInput);
      expect(datePickerInput).toHaveAttribute('value', '2022/08/30');
    });

    it('supports yyyy/dd/MM format', () => {
      const defaultDate = new Date(2022, 8, 1);
      const selectDate = new Date(2022, 8, 29);
      const label = 'yyyy/dd/MM Date Picker';
      const { getByLabelText, getAllByText } = render(
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
      fireEvent.click(calendar);
      fireEvent.click(getAllByText(selectDate.getDate().toString())[1]);
      fireEvent.blur(datePickerInput);
      expect(datePickerInput).toHaveAttribute('value', '2022/29/09');
    });

    it('supports MMMM d, yyyy format', () => {
      const defaultDate = new Date(2022, 10, 3);
      const selectDate = new Date(2022, 10, 21);
      const label = 'MMMM d, yyyy Date Picker';
      const { getAllByText, getByLabelText } = render(
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
      fireEvent.click(calendar);
      fireEvent.click(getAllByText(selectDate.getDate().toString())[0]);
      fireEvent.blur(datePickerInput);
      expect(datePickerInput).toHaveAttribute('value', 'November 21, 2022');
    });
  });
});
