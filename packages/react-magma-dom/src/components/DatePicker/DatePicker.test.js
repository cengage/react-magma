import React from 'react';
import { axe } from 'jest-axe';
import { render, fireEvent } from 'react-testing-library';
import { format, getDate } from 'date-fns';
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

  it('should open the calendar month', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText } = render(
      <DatePicker defaultDate={defaultDate} labelText="Date Picker Label" />
    );

    fireEvent.focus(getByLabelText('Date Picker Label'));

    expect(getByText(getDate(defaultDate).toString())).toBeInTheDocument();
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

  it('Does not violate accessibility standards', async () => {
    const { container } = render(<DatePicker labelText="Date Picker Label" />);
    const result = await axe(container.innerHTML);
    return expect(result).toHaveNoViolations();
  });
});
