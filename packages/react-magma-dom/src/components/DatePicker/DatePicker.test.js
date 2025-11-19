import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';
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

import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { Button } from '../Button';
import { Modal } from '../Modal';

import { DatePicker } from '.';

const ClearingTheDate = args => {
  const [chosenDate, setChosenDate] = React.useState(undefined);

  function handleDateChange(newChosenDate) {
    setChosenDate(newChosenDate);
  }

  return (
    <div>
      <p>
        <strong>Chosen Date: </strong>
        {chosenDate && (
          <span>
            {`${
              chosenDate.getMonth() + 1
            }/${chosenDate.getDate()}/${chosenDate.getFullYear()}`}
          </span>
        )}
      </p>
      <DatePicker
        {...args}
        onDateChange={handleDateChange}
        onChange={() => {}}
        value={chosenDate}
        isClearable
      />
      <br />
      <Button onClick={() => handleDateChange(null)}>Clear Date</Button>
    </div>
  );
};

const errorMessage = 'Error message';
const helperMessage = 'Helper message';

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
    const valueDate = new Date(2025, 8, 1);
    const day =
      format(valueDate, 'dd')[0] === '0'
        ? format(valueDate, 'dd')[1]
        : format(valueDate, 'dd');
    const chosenDate = `${
      valueDate.getMonth() + 2
    }/${valueDate.getDate()}/${valueDate.getFullYear()}`;

    const { getByText, getAllByText, getByTestId, getByLabelText } = render(
      <ClearingTheDate labelText={labelText} defaultDate={valueDate} />
    );

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getAllByText(day)[1]).toBeInTheDocument();
    fireEvent.click(getAllByText(day)[1]);

    expect(getByText('Chosen Date:').nextSibling.innerHTML).toEqual(chosenDate);

    fireEvent.click(getByTestId('clear-button'));

    expect(getByLabelText('Date Picker Label')).toHaveAttribute('value', '');
    expect(getByText('Chosen Date:').nextSibling).not.toBeInTheDocument();
  });

  it('should clear input and Chosen Date value after clicking on Clear Date button', () => {
    const labelText = 'Date Picker Label';
    const valueDate = new Date(2025, 6, 1);
    const day =
      format(valueDate, 'dd')[0] === '0'
        ? format(valueDate, 'dd')[1]
        : format(valueDate, 'dd');
    const chosenDate = `${
      valueDate.getMonth() + 2
    }/${valueDate.getDate()}/${valueDate.getFullYear()}`;

    const { getByText, getAllByText, getByLabelText } = render(
      <ClearingTheDate labelText={labelText} defaultDate={valueDate} />
    );

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getAllByText(day)[1]).toBeInTheDocument();
    fireEvent.click(getAllByText(day)[1]);

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
    const { getByText } = render(
      <DatePicker labelText="Date Picker Label" helperMessage={helperMessage} />
    );

    expect(getByText(helperMessage)).not.toBeNull();
  });

  it('should render an error message on the date picker input', () => {
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
    const { getByLabelText, getByTestId } = render(
      <DatePicker labelText="Date Picker Label" />
    );
    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    const monthElement = getByTestId('month-picker');
    const yearElement = getByTestId('year-picker');

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
    const { getByLabelText, getAllByText } = render(
      <DatePicker defaultDate={defaultDate} labelText={labelText} />
    );

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getAllByText(/january/i)[0]).toBeInTheDocument();

    fireEvent.click(getByLabelText(/Navigate back/i));

    expect(getAllByText(/december/i)[0]).toBeInTheDocument();
  });

  it('should go to the next month when the next month button is clicked', () => {
    const defaultDate = new Date(2019, 0, 17);
    const labelText = 'Date Picker Label';
    const { getByLabelText, getAllByText } = render(
      <DatePicker defaultDate={defaultDate} labelText={labelText} />
    );

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getAllByText(/january/i)[0]).toBeInTheDocument();

    fireEvent.click(getByLabelText(/Navigate forward/i));

    expect(getAllByText(/february/i)[0]).toBeInTheDocument();
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

    const { getByLabelText, getByTestId } = render(
      <DatePicker minDate={minDate} labelText="Date Picker Label" />
    );
    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    const monthElement = getByTestId('month-picker');
    const yearElement = getByTestId('year-picker');

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
      const { getByLabelText, getByTestId } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            locale: es,
          }}
        >
          <DatePicker labelText="Spanish" defaultDate={new Date(2020, 3, 10)} />
        </I18nContext.Provider>
      );

      const monthElement = getByTestId('month-picker');
      const yearElement = getByTestId('year-picker');

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

    it('should move focus on the previous month button when maxDate is reached', () => {
      const defaultDate = new Date(2019, 0, 17);
      const maxDate = new Date(2019, 2, 17);
      const labelText = 'Date Picker Label';
      const { getByLabelText, getAllByText } = render(
        <DatePicker
          defaultDate={defaultDate}
          labelText={labelText}
          maxDate={maxDate}
        />
      );

      const prevMonthButton = getByLabelText(/Navigate back/i);
      const nextMonthButton = getByLabelText(/Navigate forward/i);

      fireEvent.click(getByLabelText('Toggle Calendar Widget'));
      expect(getAllByText(/january/i)[0]).toBeInTheDocument();

      fireEvent.click(nextMonthButton);
      expect(getAllByText(/february/i)[0]).toBeInTheDocument();

      fireEvent.click(nextMonthButton);
      expect(getAllByText(/march/i)[0]).toBeInTheDocument();
      expect(nextMonthButton).toBeDisabled();
      expect(prevMonthButton).toHaveFocus();
    });

    it('should move focus on the next month button when minDate is reached', () => {
      const defaultDate = new Date(2019, 2, 17);
      const minDate = new Date(2019, 0, 1);
      const labelText = 'Date Picker Label';
      const { getByLabelText, getAllByText } = render(
        <DatePicker
          defaultDate={defaultDate}
          labelText={labelText}
          minDate={minDate}
        />
      );

      const prevMonthButton = getByLabelText(/Navigate back/i);
      const nextMonthButton = getByLabelText(/Navigate forward/i);

      fireEvent.click(getByLabelText('Toggle Calendar Widget'));
      expect(getAllByText(/march/i)[0]).toBeInTheDocument();

      fireEvent.click(prevMonthButton);
      expect(getAllByText(/february/i)[0]).toBeInTheDocument();

      fireEvent.click(prevMonthButton);
      expect(getAllByText(/january/i)[0]).toBeInTheDocument();
      expect(prevMonthButton).toBeDisabled();
      expect(nextMonthButton).toHaveFocus();
    });
  });

  describe('Date Field Input', () => {
    it('should render a helper message on the date picker input', () => {
      const { getByText } = render(
        <DatePicker isDateFieldInput helperMessage={helperMessage} />
      );

      expect(getByText(helperMessage)).not.toBeNull();
    });

    it('should render an error message on the date picker input', () => {
      const { getByText } = render(
        <DatePicker isDateFieldInput errorMessage={errorMessage} />
      );

      expect(getByText(errorMessage)).not.toBeNull();
    });

    it('should increment and decrement the date', () => {
      const { getByTestId } = render(
        <DatePicker isDateFieldInput value={new Date(2025, 9, 22)} />
      );

      const monthInput = getByTestId('month-input');
      const dayInput = getByTestId('day-input');
      const yearInput = getByTestId('year-input');

      userEvent.click(monthInput);
      userEvent.keyboard('{ArrowUp}');
      expect(monthInput.value).toBe('11');

      userEvent.click(dayInput);
      userEvent.keyboard('{ArrowUp}');
      expect(dayInput.value).toBe('23');

      userEvent.click(yearInput);
      userEvent.keyboard('{ArrowUp}');
      waitFor(() => {
        expect(yearInput.value).toBe('2026');
      });

      userEvent.click(monthInput);
      userEvent.keyboard('{ArrowDown}');
      expect(monthInput.value).toBe('10');

      userEvent.click(dayInput);
      userEvent.keyboard('{ArrowDown}');
      waitFor(() => {
        expect(dayInput.value).toBe('22');
      });

      userEvent.click(yearInput);
      userEvent.keyboard('{ArrowDown}');
      expect(yearInput.value).toBe('2025');
    });

    it('should increment and decrement the date when date format is `MMMM d, yyyy`', () => {
      const { getByTestId } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            dateFormat: 'MMMM d, yyyy',
          }}
        >
          <DatePicker isDateFieldInput value={new Date(2025, 9, 22)} />
        </I18nContext.Provider>
      );

      const monthInput = getByTestId('month-input');
      const dayInput = getByTestId('day-input');
      const yearInput = getByTestId('year-input');

      userEvent.click(monthInput);
      userEvent.keyboard('{ArrowUp}');
      expect(monthInput.value).toBe('November');

      userEvent.click(dayInput);
      userEvent.keyboard('{ArrowUp}');
      waitFor(() => {
        expect(dayInput.value).toBe('23');
      });

      userEvent.click(yearInput);
      userEvent.keyboard('{ArrowUp}');
      waitFor(() => {
        expect(yearInput.value).toBe('2026');
      });

      userEvent.click(monthInput);
      userEvent.keyboard('{ArrowDown}');
      expect(monthInput.value).toBe('October');

      userEvent.click(dayInput);
      userEvent.keyboard('{ArrowDown}');
      expect(dayInput.value).toBe('22');

      userEvent.click(yearInput);
      userEvent.keyboard('{ArrowDown}');
      expect(yearInput.value).toBe('2025');
    });

    it('should show current values for today', () => {
      const { getByTestId } = render(<DatePicker isDateFieldInput />);

      const today = new Date();
      const monthInput = getByTestId('month-input');
      const dayInput = getByTestId('day-input');
      const yearInput = getByTestId('year-input');

      const monthValue =
        today.getMonth() + 1 < 10
          ? `0${today.getMonth() + 1}`
          : String(today.getMonth() + 1);
      const dayValue =
        today.getDate() < 10 ? `0${today.getDate()}` : String(today.getDate());

      userEvent.click(monthInput);
      userEvent.keyboard('{ArrowDown}');
      expect(monthInput.value).toBe(monthValue);

      userEvent.click(dayInput);
      userEvent.keyboard('{ArrowDown}');
      expect(dayInput.value).toBe(dayValue);

      userEvent.click(yearInput);
      userEvent.keyboard('{ArrowUp}');
      waitFor(() => {
        expect(yearInput.value).toBe(String(today.getFullYear()));
      });
    });

    it('should render with a default date', () => {
      const defaultDate = new Date(2019, 0, 17);
      const { getByTestId } = render(
        <DatePicker defaultDate={defaultDate} isDateFieldInput />
      );

      expect(getByTestId('month-input')).toHaveDisplayValue('01');
      expect(getByTestId('day-input')).toHaveDisplayValue('17');
      expect(getByTestId('year-input')).toHaveDisplayValue('2019');
    });

    it('should render with a value', () => {
      const value = new Date(2018, 1, 21);
      const { getByTestId } = render(
        <DatePicker value={value} isDateFieldInput />
      );

      expect(getByTestId('month-input')).toHaveDisplayValue('02');
      expect(getByTestId('day-input')).toHaveDisplayValue('21');
      expect(getByTestId('year-input')).toHaveDisplayValue('2018');
    });

    it('should call onChange and onDateChange when date is changed', () => {
      const onChange = jest.fn();
      const onDateChange = jest.fn();

      const { getByTestId } = render(
        <DatePicker
          isDateFieldInput
          onChange={onChange}
          onDateChange={onDateChange}
        />
      );

      const monthInput = getByTestId('month-input');
      const dayInput = getByTestId('day-input');
      const yearInput = getByTestId('year-input');

      userEvent.click(monthInput);
      userEvent.keyboard('{ArrowDown}');

      expect(onDateChange).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();

      userEvent.click(dayInput);
      userEvent.keyboard('{ArrowDown}');

      expect(onDateChange).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();

      userEvent.click(yearInput);
      userEvent.keyboard('{ArrowUp}');
      waitFor(() => {
        expect(onDateChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalled();
      });
    });

    it('should handle focus and blur events on DateFieldInput', () => {
      const onInputFocus = jest.fn();
      const onInputBlur = jest.fn();
      const { getByTestId } = render(
        <DatePicker
          isDateFieldInput
          onInputFocus={onInputFocus}
          onInputBlur={onInputBlur}
        />
      );

      const dateFieldInput = getByTestId('date-field-input');

      dateFieldInput.focus();
      expect(onInputFocus).toHaveBeenCalled();

      dateFieldInput.blur();
      expect(onInputBlur).toHaveBeenCalled();
    });

    describe('Focus behavior', () => {
      it('should handle input focus behavior via tabbing', () => {
        const { getByTestId } = render(<DatePicker isDateFieldInput />);

        const monthInput = getByTestId('month-input');
        const dayInput = getByTestId('day-input');
        const yearInput = getByTestId('year-input');

        userEvent.tab();
        // Initial focus on first input
        expect(monthInput).toHaveFocus();

        userEvent.tab();
        expect(dayInput).toHaveFocus();

        userEvent.tab();
        expect(yearInput).toHaveFocus();

        userEvent.tab({ shift: true });
        expect(dayInput).toHaveFocus();

        userEvent.tab({ shift: true });
        expect(monthInput).toHaveFocus();
      });

      it('should handle focus behavior via arrows', () => {
        const { getByTestId } = render(<DatePicker isDateFieldInput />);

        const monthInput = getByTestId('month-input');
        const dayInput = getByTestId('day-input');
        const yearInput = getByTestId('year-input');

        userEvent.tab(); // Initial focus on first input
        expect(monthInput).toHaveFocus();

        userEvent.type(monthInput, '{arrowright}');
        expect(dayInput).toHaveFocus();

        userEvent.type(dayInput, '{arrowright}');
        expect(yearInput).toHaveFocus();

        userEvent.type(yearInput, '{arrowleft}');
        expect(dayInput).toHaveFocus();

        userEvent.type(dayInput, '{arrowleft}');
        expect(monthInput).toHaveFocus();

        userEvent.tab();
        expect(dayInput).toHaveFocus();

        userEvent.tab();
        expect(yearInput).toHaveFocus();
      });
    });

    describe('Date Field Input formats', () => {
      it('should support default `MM/dd/yyyy` format', () => {
        const { getByTestId } = render(
          <DatePicker isDateFieldInput value={new Date(2022, 6, 24)} />
        );

        expect(getByTestId('day-input').value).toEqual('24');
        expect(getByTestId('month-input').value).toEqual('07');
        expect(getByTestId('year-input').value).toEqual('2022');
      });

      it('should support dd/MM/yyyy format', () => {
        const { getByTestId } = render(
          <I18nContext.Provider
            value={{
              ...defaultI18n,
              dateFormat: 'dd/MM/yyyy',
            }}
          >
            <DatePicker isDateFieldInput value={new Date(2021, 5, 17)} />
          </I18nContext.Provider>
        );

        expect(getByTestId('day-input').value).toEqual('17');
        expect(getByTestId('month-input').value).toEqual('06');
        expect(getByTestId('year-input').value).toEqual('2021');
      });

      it('should support yyyy/MM/dd format', () => {
        const { getByTestId } = render(
          <I18nContext.Provider
            value={{
              ...defaultI18n,
              dateFormat: 'yyyy/MM/dd',
            }}
          >
            <DatePicker isDateFieldInput value={new Date(2020, 1, 15)} />
          </I18nContext.Provider>
        );

        expect(getByTestId('day-input').value).toEqual('15');
        expect(getByTestId('month-input').value).toEqual('02');
        expect(getByTestId('year-input').value).toEqual('2020');
      });

      it('should support yyyy/dd/MM format', () => {
        const { getByTestId } = render(
          <I18nContext.Provider
            value={{
              ...defaultI18n,
              dateFormat: 'yyyy/dd/MM',
            }}
          >
            <DatePicker isDateFieldInput value={new Date(2025, 9, 28)} />
          </I18nContext.Provider>
        );

        expect(getByTestId('day-input').value).toEqual('28');
        expect(getByTestId('month-input').value).toEqual('10');
        expect(getByTestId('year-input').value).toEqual('2025');
      });

      it('should support MMMM d, yyyy format', () => {
        const { getByTestId } = render(
          <I18nContext.Provider
            value={{
              ...defaultI18n,
              dateFormat: 'MMMM d, yyyy',
            }}
          >
            <DatePicker isDateFieldInput value={new Date(2025, 8, 22)} />
          </I18nContext.Provider>
        );

        expect(getByTestId('month-input').value).toEqual('September');
        expect(getByTestId('day-input').value).toEqual('22');
        expect(getByTestId('year-input').value).toEqual('2025');
      });

      it('should show January month when date format is MMMM d, yyyy and user type J', () => {
        const { getByTestId } = render(
          <I18nContext.Provider
            value={{
              ...defaultI18n,
              dateFormat: 'MMMM d, yyyy',
            }}
          >
            <DatePicker isDateFieldInput />
          </I18nContext.Provider>
        );

        const monthInput = getByTestId('month-input');

        userEvent.type(monthInput, 'J');

        expect(monthInput.value).toBe('January');
      });

      it('should show April month when date format is MMMM d, yyyy and user type 4', () => {
        const { getByTestId } = render(
          <I18nContext.Provider
            value={{
              ...defaultI18n,
              dateFormat: 'MMMM d, yyyy',
            }}
          >
            <DatePicker isDateFieldInput />
          </I18nContext.Provider>
        );

        const monthInput = getByTestId('month-input');

        userEvent.type(monthInput, '4');

        expect(monthInput.value).toBe('April');
      });

      it('should show October month when date format is MMMM d, yyyy and user type 10', () => {
        const { getByTestId } = render(
          <I18nContext.Provider
            value={{
              ...defaultI18n,
              dateFormat: 'MMMM d, yyyy',
            }}
          >
            <DatePicker isDateFieldInput />
          </I18nContext.Provider>
        );

        const monthInput = getByTestId('month-input');

        userEvent.type(monthInput, '1');

        expect(monthInput.value).toBe('January');

        userEvent.type(monthInput, '0');

        expect(monthInput.value).toBe('October');
      });

      it('should show February month when date format is MMMM d, yyyy and user type `J` and after 2', () => {
        const { getByTestId } = render(
          <I18nContext.Provider
            value={{
              ...defaultI18n,
              dateFormat: 'MMMM d, yyyy',
            }}
          >
            <DatePicker isDateFieldInput />
          </I18nContext.Provider>
        );

        const monthInput = getByTestId('month-input');

        userEvent.type(monthInput, 'J');

        expect(monthInput.value).toBe('January');

        userEvent.type(monthInput, '2');

        expect(monthInput.value).toBe('February');
      });

      it('should not show any month when date format is MMMM d, yyyy and user type `P`', () => {
        const { getByTestId } = render(
          <I18nContext.Provider
            value={{
              ...defaultI18n,
              dateFormat: 'MMMM d, yyyy',
            }}
          >
            <DatePicker isDateFieldInput />
          </I18nContext.Provider>
        );

        const monthInput = getByTestId('month-input');

        userEvent.type(monthInput, 'p');

        expect(monthInput.value).toBe('');
      });
    });
    describe('Clearing the date', () => {
      it('should show clear button and clears fields', () => {
        const { getByTestId } = render(
          <DatePicker
            isDateFieldInput
            isClearable
            defaultDate={new Date(2025, 11, 25)}
          />
        );
        const clearButton = getByTestId('clear-button');
        expect(clearButton).toBeInTheDocument();

        userEvent.click(clearButton);

        expect(getByTestId('month-input').value).toBe('');
        expect(getByTestId('day-input').value).toBe('');
        expect(getByTestId('year-input').value).toBe('');
      });

      it('should call handleDateChange to parent when all fields are cleared with default format', () => {
        const onDateChange = jest.fn();

        const { getByTestId } = render(
          <DatePicker
            isDateFieldInput
            value={new Date(2025, 9, 22)}
            onDateChange={onDateChange}
          />
        );
        const monthInput = getByTestId('month-input');
        const dayInput = getByTestId('day-input');
        const yearInput = getByTestId('year-input');

        userEvent.type(monthInput, '{backspace}');
        userEvent.type(dayInput, '{backspace}');
        userEvent.type(yearInput, '{backspace}');

        waitFor(() => {
          expect(onDateChange).toHaveBeenCalledWith(null, null);
        });
      });
    });
  });
});
