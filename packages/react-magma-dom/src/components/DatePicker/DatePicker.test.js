import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
  format,
  subWeeks,
  subDays,
  startOfMonth,
  startOfWeek,
  subMonths,
  addMonths,
  addWeeks,
  addDays,
  endOfWeek,
  isSameDay,
  getDay,
} from 'date-fns';
import * as es from 'date-fns/locale/es';
import { DatePicker } from '.';
import { Modal } from '../Modal';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';

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
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    expect(getByLabelText('Date Picker Label')).toHaveAttribute(
      'value',
      format(defaultDate, 'MM/dd/yyyy')
    );
  });

  it('should set the value to the date in the value prop', () => {
    const defaultDate = new Date('January 17, 2019');
    const valueDate = new Date('January 23, 2019');

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
    const valueDate = new Date('January 23, 2019');
    const minDate = new Date('January 10, 2020');

    const { getByLabelText } = render(
      <DatePicker
        labelText="Date Picker Label"
        value={valueDate}
        minDate={minDate}
      />
    );

    expect(getByLabelText('Date Picker Label')).toHaveAttribute('value', '');
  });

  it('should not set the value to the date if it is after the maxDate', () => {
    const valueDate = new Date('January 23, 2020');
    const maxDate = new Date('January 10, 2020');

    const { getByLabelText } = render(
      <DatePicker
        labelText="Date Picker Label"
        value={valueDate}
        maxDate={maxDate}
      />
    );

    expect(getByLabelText('Date Picker Label')).toHaveAttribute('value', '');
  });

  it('should disable a date the does not fall in the min and max date range', () => {
    const minDate = new Date('January 5, 2020');
    const maxDate = new Date('January 10, 2020');

    const { container, getByText } = render(
      <DatePicker
        labelText="Date Picker Label"
        minDate={minDate}
        maxDate={maxDate}
      />
    );

    fireEvent.focus(container.querySelector('table'));

    expect(getByText('1')).toHaveAttribute('aria-disabled');
    expect(getByText('12')).toHaveAttribute('aria-disabled');
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
    const { getByLabelText, getByText } = render(
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
      getByText(new Date('1/1/1991').getDate().toString())
    ).not.toHaveStyleRule('border-color', 'transparent');
  });

  it('should handle a date lower than the year 1000', () => {
    const onChange = jest.fn();
    const labelText = 'Date Picker Label';
    const { getByLabelText, getByText } = render(
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
      getByText(new Date('1/1/0123').getDate().toString())
    ).not.toHaveStyleRule('border-color', 'transparent');
  });

  it('should open the calendar month when the icon button is clicked', () => {
    const defaultDate = new Date('January 17, 2019');
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
    const now = new Date();
    const monthYear = format(now, 'MMMM yyyy');
    const { getByLabelText, getByText } = render(
      <DatePicker labelText="Date Picker Label" />
    );
    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText(monthYear)).toBe(document.activeElement.firstChild);
  });

  it('should focus the chosen date when the calendar is opened', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );
    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

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
      target: { value: '12' },
    });

    getByLabelText('Toggle Calendar Widget').focus();

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText(format(now, 'MMMM yyyy'))).not.toBeNull();
    expect(getByText(format(now, 'd'))).not.toBe(document.activeElement);
  });

  it('should go to the previous month when the previous month button is clicked', () => {
    const defaultDate = new Date('January 17, 2019');
    const labelText = 'Date Picker Label';
    const { getByLabelText, getByText } = render(
      <DatePicker defaultDate={defaultDate} labelText={labelText} />
    );

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

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

    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText(/january/i)).toBeInTheDocument();

    fireEvent.click(getByLabelText(/next month/i));

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
    const defaultDate = new Date('January 17, 2019');
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

  it('should close the calendar month when the escape key is pressed, and retain the active modal', () => {
    const defaultDate = new Date();
    const { getByTestId } = render(
      <Modal testId="modal" isOpen>
        <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
      </Modal>
    );

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

    expect(getByTestId('modal')).toBeInTheDocument();
  });

  it('should default to the min date when it is later than today', () => {
    const now = new Date();
    const minDate = format(addMonths(now, 2), 'MM/dd/yyyy');
    const monthYear = format(addMonths(now, 2), 'MMMM yyyy');

    const { getByLabelText, getByText } = render(
      <DatePicker minDate={minDate} labelText="Date Picker Label" />
    );
    fireEvent.click(getByLabelText('Toggle Calendar Widget'));

    expect(getByText(monthYear)).toBe(document.activeElement.firstChild);
  });

  it('should handle a day click', () => {
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

    fireEvent.focus(container.querySelector('table'));

    fireEvent.click(getByText(defaultDate.getDate().toString()));

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
      const { getByLabelText, getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      const nextMonthButton = getByLabelText(/next month/i);
      fireEvent.focus(nextMonthButton);

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'ArrowUp',
        code: 38,
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
        code: 38,
      });

      expect(
        getByText(subWeeks(defaultDate, 1).getDate().toString())
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
        code: 37,
      });

      expect(
        getByText(subDays(defaultDate, 1).getDate().toString())
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
        code: 36,
      });

      expect(
        getByText(startOfWeek(defaultDate, 1).getDate().toString())
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
        code: 33,
      });

      expect(
        getByText(subMonths(defaultDate, 1).getDate().toString())
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
        code: 34,
      });

      expect(
        getByText(addMonths(defaultDate, 1).getDate().toString())
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
        code: 40,
      });

      expect(
        getByText(addWeeks(defaultDate, 1).getDate().toString())
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
        code: 39,
      });

      expect(
        getByText(addDays(defaultDate, 1).getDate().toString())
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
        code: 35,
      });

      expect(
        getByText(endOfWeek(defaultDate).getDate().toString())
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

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('?', async () => {
      // TODO
      const defaultDate = new Date();
      const labelText = 'Date picker label';
      const { getByText, baseElement } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(baseElement.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

      fireEvent.keyDown(baseElement.querySelector('table'), {
        key: '?',
      });
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
      const { getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

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
      const { getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

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
      const { getByText, container } = render(
        <DatePicker defaultDate={defaultDate} labelText={labelText} />
      );

      fireEvent.focus(container.querySelector('table'));

      getByText(defaultDate.getDate().toString()).focus();

      fireEvent.keyDown(container.querySelector('table'), {
        key: 'f',
        code: 70,
      });

      expect(getByText(defaultDate.getDate().toString())).not.toHaveStyleRule(
        'border-color',
        'transparent'
      );
    });
  });

  describe('i18n', () => {
    it('formats dates with the locale', () => {
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

      expect(getByText('Abril 2020')).toBeInTheDocument();
      expect(getByLabelText(`Previous Month marzo 2020`)).toBeInTheDocument();
      expect(getByLabelText(`Next Month mayo 2020`)).toBeInTheDocument();
    });

    it('min days string in the i18n context', () => {
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

      expect(getByText(min.sunday)).toBeInTheDocument();
      expect(getByText(min.monday)).toBeInTheDocument();
      expect(getByText(min.tuesday)).toBeInTheDocument();
      expect(getByText(min.wednesday)).toBeInTheDocument();
      expect(getByText(min.thursday)).toBeInTheDocument();
      expect(getByText(min.friday)).toBeInTheDocument();
      expect(getByText(min.saturday)).toBeInTheDocument();
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

      expect(dayRow.children[0].textContent).toEqual('W');
      expect(firstDayOfMonthElement.textContent).toEqual('1');
    });
  });

  describe('Date formats', () => {
    it('supports dd/MM/yyyy format', () => {
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
      fireEvent.click(calendar);
      fireEvent.click(getByText(selectDate.getDate().toString()));
      fireEvent.blur(datePickerInput);
      expect(datePickerInput).toHaveAttribute('value', '27/07/2022');
    });

    it('supports yyyy/MM/dd format', () => {
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
      fireEvent.click(calendar);
      fireEvent.click(getByText(selectDate.getDate().toString()));
      fireEvent.blur(datePickerInput);
      expect(datePickerInput).toHaveAttribute('value', '2022/08/30');
    });

    it('supports yyyy/dd/MM format', () => {
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
      fireEvent.click(calendar);
      fireEvent.click(getByText(selectDate.getDate().toString()));
      fireEvent.blur(datePickerInput);
      expect(datePickerInput).toHaveAttribute('value', '2022/29/09');
    });

    it('supports MMMM d, yyyy format', () => {
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
      fireEvent.click(calendar);
      fireEvent.click(getByText(selectDate.getDate().toString()));
      fireEvent.blur(datePickerInput);
      expect(datePickerInput).toHaveAttribute('value', 'November 21, 2022');
    });
  });
});
