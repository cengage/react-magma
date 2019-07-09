import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { CalendarDayCore } from './CalendarDay';

describe('CalendarDayCore', () => {
  describe('handle click', () => {
    it('should call the onClick from props during the internal onClick', () => {
      const onClickSpy = jest.fn();
      const { getByTestId } = render(
        <CalendarDayCore onClick={onClickSpy}>
          {({ onClick }) => {
            return (
              <button data-testid="onClickButton" onClick={onClick}>
                On Click Button
              </button>
            );
          }}
        </CalendarDayCore>
      );

      fireEvent.click(getByTestId('onClickButton'));

      expect(onClickSpy).toHaveBeenCalled();
    });

    it('should not fail if no onClick is passed through the props', () => {
      const { container, getByTestId } = render(
        <CalendarDayCore>
          {({ onClick }) => {
            return (
              <button data-testid="onClickButton" onClick={onClick}>
                On Click Button
              </button>
            );
          }}
        </CalendarDayCore>
      );

      fireEvent.click(getByTestId('onClickButton'));

      expect(container).not.toBeNull();
    });
  });
});
