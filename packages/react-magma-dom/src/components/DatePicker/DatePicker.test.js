import React from 'react';
import { axe } from 'jest-axe';
import { render, fireEvent } from 'react-testing-library';
import {
  format,
  getDate,
  addDays,
  subDays,
  subWeeks,
  addWeeks,
  startOfWeek,
  endOfWeek,
  subMonths,
  addMonths
} from 'date-fns';
import { DatePicker } from '.';

describe('Date Picker', () => {
  it('should render an input', () => {
    const { getByLabelText } = render(
      <DatePicker labelText="Date Picker Label" />
    );

    expect(getByLabelText('Date Picker Label')).not.toBeNull();
  });

  it('should render with a default date', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    expect(getByLabelText('Date Picker Label')).toHaveAttribute(
      'value',
      format(defaultDate, 'MM/DD/YYYY')
    );
  });

  it('should focus the next day when hitting the arrow right key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText, container } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    fireEvent.focus(getByLabelText('Date Picker Label'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'ArrowRight',
      code: 39
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(addDays(defaultDate, 1), 'MMMM Do YYYY')
    );
  });

  it('should focus the previous day when hitting the arrow left key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText, container } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    fireEvent.focus(getByLabelText('Date Picker Label'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'ArrowLeft',
      code: 37
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(subDays(defaultDate, 1), 'MMMM Do YYYY')
    );
  });

  it('should focus the previous week when hitting the arrow up key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText, container } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    fireEvent.focus(getByLabelText('Date Picker Label'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'ArrowUp',
      code: 38
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(subWeeks(defaultDate, 1), 'MMMM Do YYYY')
    );
  });

  it('should focus the next week when hitting the arrow down key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText, container } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    fireEvent.focus(getByLabelText('Date Picker Label'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'ArrowDown',
      code: 40
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(addWeeks(defaultDate, 1), 'MMMM Do YYYY')
    );
  });

  it('should focus the beginning of the week when hitting the home key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText, container } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    fireEvent.focus(getByLabelText('Date Picker Label'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'Home',
      code: 36
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(startOfWeek(defaultDate), 'MMMM Do YYYY')
    );
  });

  it('should focus the end of the week when hitting the end key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText, container } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    fireEvent.focus(getByLabelText('Date Picker Label'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'End',
      code: 35
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(endOfWeek(defaultDate), 'MMMM Do YYYY')
    );
  });

  it('should focus the previous month when hitting the page up key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText, container } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    fireEvent.focus(getByLabelText('Date Picker Label'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'PageUp',
      code: 33
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(subMonths(defaultDate, 1), 'MMMM Do YYYY')
    );
  });

  it('should focus the next month when hitting the page down key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText, container } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    fireEvent.focus(getByLabelText('Date Picker Label'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'PageDown',
      code: 34
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(addMonths(defaultDate, 1), 'MMMM Do YYYY')
    );
  });

  it('should close the calendar when the escape key is clicked', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText, queryByText } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    fireEvent.focus(getByLabelText('Date Picker Label'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'Escape',
      code: 27
    });

    expect(queryByText(getDate(defaultDate).toString())).not.toBeVisible();
  });

  it('should call onDayClick when hitting enter', () => {
    const onDayClickSpy = jest.fn();
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText } = render(
      <DatePicker
        defaultDate={defaultDate}
        labelText="Date Picker Label"
        onDayClick={onDayClickSpy}
      />
    );
    const datePickerInput = getByLabelText('Date Picker Label');
    const calendarDay = getByText(getDate(defaultDate).toString());

    fireEvent.focus(datePickerInput);
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(calendarDay, {
      key: 'ArrowRight',
      code: 39
    });
    fireEvent.keyDown(calendarDay, { key: 'Enter', code: 13 });

    expect(datePickerInput).toHaveAttribute(
      'value',
      format(addDays(defaultDate, 1), 'MM/DD/YYYY')
    );
    expect(onDayClickSpy).toHaveBeenCalled();
  });

  it('should call onDayClick when hitting spacebar', () => {
    const onDayClickSpy = jest.fn();
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText } = render(
      <DatePicker
        defaultDate={defaultDate}
        labelText="Date Picker Label"
        onDayClick={onDayClickSpy}
      />
    );
    const datePickerInput = getByLabelText('Date Picker Label');
    const calendarDay = getByText(getDate(defaultDate).toString());

    fireEvent.focus(datePickerInput);
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(calendarDay, {
      key: 'ArrowRight',
      code: 39
    });
    fireEvent.keyDown(calendarDay, { key: ' ', code: 32 });

    expect(datePickerInput).toHaveAttribute(
      'value',
      format(addDays(defaultDate, 1), 'MM/DD/YYYY')
    );
    expect(onDayClickSpy).toHaveBeenCalled();
  });

  it('should call onDayClick when calendar is clicked', () => {
    const onDayClickSpy = jest.fn();
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText } = render(
      <DatePicker
        defaultDate={defaultDate}
        labelText="Date Picker Label"
        onDayClick={onDayClickSpy}
      />
    );
    const datePickerInput = getByLabelText('Date Picker Label');
    const calendarDay = getByText((getDate(defaultDate) + 1).toString());

    fireEvent.focus(datePickerInput);
    fireEvent.click(calendarDay);

    expect(datePickerInput).toHaveAttribute(
      'value',
      format(addDays(defaultDate, 1), 'MM/DD/YYYY')
    );
    expect(onDayClickSpy).toHaveBeenCalled();
  });

  it('should ignore additional keys', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText, container } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    fireEvent.focus(getByLabelText('Date Picker Label'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'a',
      code: 65
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(defaultDate, 'MMMM Do YYYY')
    );
  });

  it('should move forward a month when clicking the next month button', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, queryByText } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    fireEvent.click(getByLabelText('Next Month'));

    expect(queryByText('February 2019')).toBeInTheDocument();
  });

  it('should move backward a month when clicking the previous month button', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, queryByText } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    fireEvent.click(getByLabelText('Previous Month'));

    expect(queryByText('December 2018')).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', async () => {
    const { container } = render(<DatePicker labelText="Date Picker Label" />);
    const result = await axe(container.innerHTML);
    return expect(result).toHaveNoViolations();
  });
});
