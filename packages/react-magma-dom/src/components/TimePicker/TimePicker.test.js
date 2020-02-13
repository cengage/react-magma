import React from 'react';
import { TimePicker } from '.';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';

describe('TimePicker', () => {
  it('should render the timepicker', () => {
    const label = 'test label';
    const { container, getByLabelText } = render(
      <TimePicker labelText={label} />
    );

    expect(getByLabelText(label)).toHaveStyleRule('border-color', '#727272');

    expect(container).toBeInTheDocument();
  });

  describe('Hour Input', () => {
    it('should allow for a single digit hour to be entered', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const hoursInput = getByTestId('hoursTimeInput');

      fireEvent.change(hoursInput, { target: { value: '9' } });

      expect(hoursInput.value).toEqual('09');
    });

    it('should allow for a double digit hour below 12', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const hoursInput = getByTestId('hoursTimeInput');

      fireEvent.change(hoursInput, { target: { value: '12' } });

      expect(hoursInput.value).toEqual('12');
    });

    it('should allow for a an hour above 12 but under 24 to be entered and calculated to AM/PM time', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const hoursInput = getByTestId('hoursTimeInput');

      fireEvent.change(hoursInput, { target: { value: '19' } });

      expect(hoursInput.value).toEqual('07');
      expect(getByTestId('amPmTimeButton').textContent).toEqual('PM');
    });

    it('should set the hour to the first number if the number inputted is 24 or above', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const hoursInput = getByTestId('hoursTimeInput');

      fireEvent.change(hoursInput, { target: { value: '24' } });

      expect(hoursInput.value).toEqual('02');

      fireEvent.change(hoursInput, { target: { value: '34' } });

      expect(hoursInput.value).toEqual('03');
    });

    it('should set the hour to 00 if the backspace key is clicked', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const hoursInput = getByTestId('hoursTimeInput');

      fireEvent.keyDown(hoursInput, { key: 'Backspace' });

      expect(hoursInput.value).toEqual('00');
    });

    it('should focus the minute input if the right arrow key is clicked', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const hoursInput = getByTestId('hoursTimeInput');
      hoursInput.focus();

      fireEvent.keyDown(hoursInput, { key: 'ArrowRight' });

      expect(getByTestId('minutesTimeInput')).toHaveFocus();
    });

    it('should call the onChange for a valid hour entered', () => {
      const onChange = jest.fn();
      const { getByTestId } = render(
        <TimePicker label="label" onChange={onChange} />
      );

      const hoursInput = getByTestId('hoursTimeInput');

      fireEvent.change(hoursInput, { target: { value: '9' } });

      expect(onChange).toHaveBeenCalledWith('09: AM');
    });
  });

  describe('Minute Input', () => {
    it('should set the minute to 00 if 0 is keyed in', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const minutesInput = getByTestId('minutesTimeInput');

      fireEvent.change(minutesInput, { target: { value: '0' } });

      expect(minutesInput.value).toEqual('00');
    });

    it('should allow for a single digit minute to be entered', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const minutesInput = getByTestId('minutesTimeInput');

      fireEvent.change(minutesInput, { target: { value: '9' } });

      expect(minutesInput.value).toEqual('09');
    });

    it('should allow for a double digit minute below 59', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const minutesInput = getByTestId('minutesTimeInput');

      fireEvent.change(minutesInput, { target: { value: '34' } });

      expect(minutesInput.value).toEqual('34');
    });

    it('should set the minute to the first number if the number inputted is 60 or above', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const hoursInput = getByTestId('hoursTimeInput');

      fireEvent.change(hoursInput, { target: { value: '60' } });

      expect(hoursInput.value).toEqual('06');

      fireEvent.change(hoursInput, { target: { value: '89' } });

      expect(hoursInput.value).toEqual('08');
    });

    it('should set the minutes to 00 if the backspace key is clicked', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const minutesInput = getByTestId('minutesTimeInput');

      fireEvent.keyDown(minutesInput, { key: 'Backspace' });

      expect(minutesInput.value).toEqual('00');
    });

    it('should focus the hour input if the left arrow key is clicked', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const minutesInput = getByTestId('minutesTimeInput');
      minutesInput.focus();

      fireEvent.keyDown(minutesInput, { key: 'ArrowLeft' });

      expect(getByTestId('hoursTimeInput')).toHaveFocus();
    });

    it('should focus the AM/PM button if the right arrow key is clicked', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const minutesInput = getByTestId('minutesTimeInput');
      minutesInput.focus();

      fireEvent.keyDown(minutesInput, { key: 'ArrowRight' });

      expect(getByTestId('amPmTimeButton')).toHaveFocus();
    });

    it('should call the onChange for a valid minute entered', () => {
      const onChange = jest.fn();
      const { getByTestId } = render(
        <TimePicker label="label" onChange={onChange} />
      );

      const minutesInput = getByTestId('minutesTimeInput');

      fireEvent.change(minutesInput, { target: { value: '9' } });

      expect(onChange).toHaveBeenCalledWith(':09 AM');
    });
  });

  describe('AM/PM', () => {
    it('should toggle between AM and PM on click', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const amPmButton = getByTestId('amPmTimeButton');

      expect(amPmButton).toHaveTextContent('AM');

      fireEvent.click(amPmButton);

      expect(amPmButton).toHaveTextContent('PM');

      fireEvent.click(amPmButton);

      expect(amPmButton).toHaveTextContent('AM');
    });

    it('should toggle between AM and PM on arrow down', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const amPmButton = getByTestId('amPmTimeButton');

      expect(amPmButton).toHaveTextContent('AM');

      fireEvent.keyDown(amPmButton, {
        key: 'ArrowDown'
      });

      expect(amPmButton).toHaveTextContent('PM');

      fireEvent.keyDown(amPmButton, {
        key: 'ArrowDown'
      });

      expect(amPmButton).toHaveTextContent('AM');
    });

    it('should toggle between AM and PM on arrow up', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const amPmButton = getByTestId('amPmTimeButton');

      expect(amPmButton).toHaveTextContent('AM');

      fireEvent.keyDown(amPmButton, {
        key: 'ArrowUp'
      });

      expect(amPmButton).toHaveTextContent('PM');

      fireEvent.keyDown(amPmButton, {
        key: 'ArrowUp'
      });

      expect(amPmButton).toHaveTextContent('AM');
    });

    it('should focus the minutes input if the left arrow key is clicked', () => {
      const { getByTestId } = render(<TimePicker label="label" />);

      const amPmButton = getByTestId('amPmTimeButton');
      amPmButton.focus();

      fireEvent.keyDown(amPmButton, { key: 'ArrowLeft' });

      expect(getByTestId('minutesTimeInput')).toHaveFocus();
    });

    it('should call the onChange when the AM/PM is toggled', () => {
      const onChange = jest.fn();
      const { getByTestId } = render(
        <TimePicker label="label" onChange={onChange} />
      );

      const amPmButton = getByTestId('amPmTimeButton');
      amPmButton.focus();

      fireEvent.keyDown(amPmButton, { key: 'ArrowUp' });

      expect(onChange).toHaveBeenCalledWith(': PM');
    });
  });

  describe('Passed in value', () => {
    it('should allow for the ##:## AM format', () => {
      const value = '01:30 AM';
      const { getByTestId } = render(
        <TimePicker label="label" value={value} />
      );

      expect(getByTestId('hoursTimeInput').value).toEqual('01');
      expect(getByTestId('minutesTimeInput').value).toEqual('30');
      expect(getByTestId('amPmTimeButton')).toHaveTextContent('AM');
    });

    it('should allow for the ##:## PM format', () => {
      const value = '01:30 PM';
      const { getByTestId } = render(
        <TimePicker label="label" value={value} />
      );

      expect(getByTestId('hoursTimeInput').value).toEqual('01');
      expect(getByTestId('minutesTimeInput').value).toEqual('30');
      expect(getByTestId('amPmTimeButton')).toHaveTextContent('PM');
    });

    it('should allow for the ##:## format and choose AM under time 11:59', () => {
      const value = '01:30';
      const { getByTestId } = render(
        <TimePicker label="label" value={value} />
      );

      expect(getByTestId('hoursTimeInput').value).toEqual('01');
      expect(getByTestId('minutesTimeInput').value).toEqual('30');
      expect(getByTestId('amPmTimeButton')).toHaveTextContent('AM');
    });

    it('should allow for the ##:## format and convert to PM over time 12:00', () => {
      const value = '13:30';
      const { getByTestId } = render(
        <TimePicker label="label" value={value} />
      );

      expect(getByTestId('hoursTimeInput').value).toEqual('01');
      expect(getByTestId('minutesTimeInput').value).toEqual('30');
      expect(getByTestId('amPmTimeButton')).toHaveTextContent('PM');
    });

    it('should not allow for a passed in value with hour above 23', () => {
      const value = '24:00';
      const { getByTestId } = render(
        <TimePicker label="label" value={value} />
      );

      expect(getByTestId('hoursTimeInput').value).toEqual('');
      expect(getByTestId('minutesTimeInput').value).toEqual('');
      expect(getByTestId('amPmTimeButton')).toHaveTextContent('AM');
    });

    it('should not allow for a passed in value with minute above 59', () => {
      const value = '12:80';
      const { getByTestId } = render(
        <TimePicker label="label" value={value} />
      );

      expect(getByTestId('hoursTimeInput').value).toEqual('');
      expect(getByTestId('minutesTimeInput').value).toEqual('');
      expect(getByTestId('amPmTimeButton')).toHaveTextContent('AM');
    });

    it('should not allow for a bad format to be passed in', () => {
      const value = '123:80 CX';
      const { getByTestId } = render(
        <TimePicker label="label" value={value} />
      );

      expect(getByTestId('hoursTimeInput').value).toEqual('');
      expect(getByTestId('minutesTimeInput').value).toEqual('');
      expect(getByTestId('amPmTimeButton')).toHaveTextContent('AM');
    });

    it('should call the onChange when the passed in value is valid', () => {
      const onChange = jest.fn();
      const value = '12:30 PM';
      render(<TimePicker label="label" onChange={onChange} value={value} />);

      expect(onChange).toHaveBeenCalledWith(value);
    });
  });

  it('should render the timepicker with a error message', () => {
    const message = 'test error';
    const label = 'test label';
    const { getByLabelText, getByText } = render(
      <TimePicker errorMessage={message} labelText={label} />
    );

    expect(getByText(message)).toBeInTheDocument();
    expect(getByLabelText(label)).toHaveStyleRule('border-color', '#E70000');
  });

  it('should render the timepicker with inverse styles', () => {
    const label = 'test label';
    const { getByLabelText } = render(
      <TimePicker isInverse labelText={label} />
    );

    expect(getByLabelText(label)).toHaveStyleRule('border-color', '#FFFFFF');
  });
});
