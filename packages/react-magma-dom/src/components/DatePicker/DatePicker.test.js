import React from 'react';
import { axe } from 'jest-axe';
import { render, fireEvent } from '@testing-library/react';
import {
  format,
  subWeeks,
  subDays,
  startOfWeek,
  subMonths,
  addMonths,
  addWeeks,
  addDays,
  endOfWeek,
  isSameDay
} from 'date-fns';
import { DatePicker } from '.';

describe('Date Picker', () => {
  it('should render an input', () => {
    const { getByLabelText } = render(
      <DatePicker labelText="Date Picker Label" />
    );

    expect(getByLabelText('Date Picker Label')).not.toBeNull();
    expect(getByLabelText('Date Picker Label')).toHaveAttribute(
      'placeholder',
      'MM/DD/YYYY'
    );
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

  it('should watch for input change', () => {
    const onInputChange = jest.fn();
    const labelText = 'Date Picker Label';
    const { getByLabelText } = render(
      <DatePicker labelText={labelText} onInputChange={onInputChange} />
    );

    fireEvent.change(getByLabelText(labelText), {
      target: { value: 'new value' }
    });

    expect(onInputChange).toHaveBeenCalled();
  });

  it('should call passed in handle blur function', () => {
    const onInputBlur = jest.fn();
    const labelText = 'Date Picker Label';
    const { getByLabelText } = render(
      <DatePicker labelText={labelText} onInputBlur={onInputBlur} />
    );

    getByLabelText(labelText).focus();

    getByLabelText('Calendar').focus();

    expect(onInputBlur).toHaveBeenCalled();
  });

  it('should change the focused date on blur if the typed in date is a valid date', () => {
    const labelText = 'Date Picker Label';
    const { getByLabelText, getByText } = render(
      <DatePicker labelText={labelText} />
    );

    getByLabelText(labelText).focus();

    fireEvent.change(getByLabelText(labelText), {
      target: { value: '1/1/1991' }
    });

    getByLabelText('Calendar').focus();

    fireEvent.click(getByLabelText('Calendar'));

    expect(
      getByText(new Date('1/1/1991').getDate().toString())
    ).not.toHaveStyleRule('border-color', 'transparent');
  });

  it('should open the calendar month when the icon button is clicked', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByTestId } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');

    fireEvent.click(getByLabelText('Calendar'));

    expect(getByTestId('calendarContainer')).toHaveStyleRule(
      'display',
      'block'
    );
  });

  it('should focus the calendar header when the calendar is opened with no chosen date', () => {
    const now = new Date();
    const monthYear = format(now, 'MMMM YYYY');
    const { getByLabelText, getByText } = render(
      <DatePicker labelText="Date Picker Label" />
    );
    fireEvent.click(getByLabelText('Calendar'));

    expect(getByText(monthYear)).toBe(document.activeElement);
  });

  it('should focus the chosen date when the calendar is opened', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );
    fireEvent.click(getByLabelText('Calendar'));

    expect(getByText('17')).toBe(document.activeElement);
  });

  it('should take focus off of chosen date when none valid date in input', () => {
    const defaultDate = new Date('January 17, 2019');
    const now = new Date();
    const labelText = 'Date Picker Label';
    const { getByLabelText, getByText } = render(
      <DatePicker defaultDate={defaultDate} labelText={labelText} />
    );

    getByLabelText(labelText).focus();

    fireEvent.change(getByLabelText(labelText), {
      target: { value: '12' }
    });

    getByLabelText('Calendar').focus();

    fireEvent.click(getByLabelText('Calendar'));

    expect(getByText(format(now, 'MMMM YYYY'))).not.toBeNull();
    expect(getByText(format(now, 'D'))).not.toBe(document.activeElement);
  });

  it('should go to the previous month when the previous month button is clicked', () => {
    const defaultDate = new Date('January 17, 2019');
    const labelText = 'Date Picker Label';
    const { getByLabelText, getByText } = render(
      <DatePicker defaultDate={defaultDate} labelText={labelText} />
    );

    fireEvent.click(getByLabelText('Calendar'));

    expect(getByText(/january/i)).toBeInTheDocument();

    fireEvent.click(getByLabelText(/previous month/i));

    expect(getByText(/december/i)).toBeInTheDocument();
  });

  it('should go to the next month when the next month button is clicked', () => {
    const defaultDate = new Date('January 17, 2019');
    const labelText = 'Date Picker Label';
    const { getByLabelText, getByText } = render(
      <DatePicker defaultDate={defaultDate} labelText={labelText} />
    );

    fireEvent.click(getByLabelText('Calendar'));

    expect(getByText(/january/i)).toBeInTheDocument();

    fireEvent.click(getByLabelText(/next month/i));

    expect(getByText(/february/i)).toBeInTheDocument();
  });

  it('should close the calendar when the close button is clicked', () => {
    const { getByLabelText, getByTestId } = render(
      <DatePicker labelText="Date Picker Label" />
    );

    fireEvent.click(getByLabelText('Calendar'));

    fireEvent.click(getByLabelText(/close calendar/i));

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');
  });

  it('should close the calendar when there is an input change', () => {
    const { getByLabelText, getByTestId } = render(
      <DatePicker labelText="Date Picker Label" />
    );

    fireEvent.click(getByLabelText('Calendar'));

    expect(getByTestId('calendarContainer')).not.toHaveStyleRule(
      'display',
      'none'
    );

    fireEvent.change(getByLabelText('Date Picker Label'), {
      target: { value: '12' }
    });

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');
  });

  it('should close the calendar month when the escape key is pressed', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByTestId } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    fireEvent.click(getByLabelText('Calendar'));

    expect(getByTestId('calendarContainer')).toHaveStyleRule(
      'display',
      'block'
    );

    fireEvent.keyDown(getByLabelText('Calendar'), {
      key: 'Escape',
      code: 27
    });

    expect(getByTestId('calendarContainer')).toHaveStyleRule('display', 'none');
  });

  it('should open the helper information on ? press', () => {
    const defaultDate = new Date('January 17, 2019');
    const labelText = 'Date Picker Label';
    const { getByLabelText, queryByText, getByText } = render(
      <DatePicker defaultDate={defaultDate} labelText={labelText} />
    );

    expect(getByLabelText(labelText)).toBeInTheDocument();
    expect(queryByText(/select the date/i)).not.toBeInTheDocument();

    fireEvent.keyDown(getByLabelText(labelText), {
      key: '?',
      code: 63
    });

    expect(getByText(/select the date/i)).toBeInTheDocument();
  });

  it('should handle a day click', () => {
    const onDateChange = jest.fn();
    const defaultDate = new Date();
    const labelText = 'Date picker label';
    const { getByText, container } = render(
      <DatePicker
        defaultDate={defaultDate}
        labelText={labelText}
        onDateChange={onDateChange}
      />
    );

    fireEvent.focus(container.querySelector('table'));

    fireEvent.click(getByText(defaultDate.getDate().toString()));

    expect(onDateChange).toHaveBeenCalled();
  });

  describe('on key down press', () => {
    it('handles the question mark key when typing in the input', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByLabelText, getByRole } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      const datePickerInput = getByLabelText(labelText);
      fireEvent.focus(datePickerInput);

      fireEvent.keyDown(datePickerInput, {
        key: '?'
      });

      expect(getByRole('dialog')).toBeVisible();
    });

    it('types in the input if you type anything other than the question mark key', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByLabelText, queryByRole } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      const datePickerInput = getByLabelText(labelText);
      fireEvent.focus(datePickerInput);

      fireEvent.keyDown(datePickerInput, {
        key: 'abc123'
      });

      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('does not update focused date if date is not focused', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByLabelText, getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      const nextMonthButton = getByLabelText(/next month/i);
      fireEvent.focus(nextMonthButton);

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'ArrowUp',
        code: 38
      });

      fireEvent.focus(container.querySelector('table'));

      expect(getByText(defaultDate.getDate().toString())).not.toHaveStyleRule(
        'border-color',
        'transparent'
      );
    });

    it('ArrowUp', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'ArrowUp',
        code: 38
      });

      expect(
        getByText(
          subWeeks(defaultDate, 1)
            .getDate()
            .toString()
        )
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('ArrowLeft', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'ArrowLeft',
        code: 37
      });

      expect(
        getByText(
          subDays(defaultDate, 1)
            .getDate()
            .toString()
        )
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('Home', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'Home',
        code: 36
      });

      expect(
        getByText(
          startOfWeek(defaultDate, 1)
            .getDate()
            .toString()
        )
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('PageUp', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'PageUp',
        code: 33
      });

      expect(
        getByText(
          subMonths(defaultDate, 1)
            .getDate()
            .toString()
        )
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('PageDown', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'PageDown',
        code: 34
      });

      expect(
        getByText(
          addMonths(defaultDate, 1)
            .getDate()
            .toString()
        )
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('ArrowDown', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'ArrowDown',
        code: 40
      });

      expect(
        getByText(
          addWeeks(defaultDate, 1)
            .getDate()
            .toString()
        )
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('ArrowRight', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'ArrowRight',
        code: 39
      });

      expect(
        getByText(
          addDays(defaultDate, 1)
            .getDate()
            .toString()
        )
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('End', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'End',
        code: 35
      });

      expect(
        getByText(
          endOfWeek(defaultDate)
            .getDate()
            .toString()
        )
      ).not.toHaveStyleRule('border-color', 'transparent');
    });

    it('Escape', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByLabelText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.click(getByLabelText('Calendar'));

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'Tab'
      });

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'Tab'
      });

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'Tab'
      });

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'Escape',
        code: 27
      });

      expect(container.querySelector('table')).not.toBeVisible();
      expect(document.activeElement).toBe(container.querySelector('input'));
    });

    it('?', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: '?'
      });

      expect(getByText(/keyboard shortcuts/i)).toBeVisible();
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
        code: 27
      });

      expect(container.querySelector('table')).not.toBeVisible();
    });

    it('? without focus', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { container, getByText } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('input'));

      fireEvent.keyDown(container.querySelector('table'), {
        key: '?'
      });

      expect(getByText(/keyboard shortcuts/i)).toBeVisible();
    });

    it('Enter', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'Enter',
        code: 13
      });

      expect(
        isSameDay(container.querySelector('input').value, defaultDate)
      ).toBeTruthy();
    });

    it('Spacebar', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'Space',
        code: 32
      });

      expect(
        isSameDay(container.querySelector('input').value, defaultDate)
      ).toBeTruthy();
    });

    it('does not update the focused date if a bad key press occurs', () => {
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'f',
        code: 70
      });

      expect(getByText(defaultDate.getDate().toString())).not.toHaveStyleRule(
        'border-color',
        'transparent'
      );
    });
  });

  it('Does not violate accessibility standards', async () => {
    const { container } = render(<DatePicker labelText="Date Picker Label" />);
    const result = await axe(container.innerHTML);
    return expect(result).toHaveNoViolations();
  });
});
