import React from 'react';
import { ToastCore } from './Toast';
import { render, fireEvent } from 'react-testing-library';

describe('ToastCore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it('Should auto dismiss after timeout', () => {
    const handleDismiss = jest.fn();
    render(
      <ToastCore onDismiss={handleDismiss} toastDuration={1000}>
        {() => 'rendered'}
      </ToastCore>
    );
    expect(handleDismiss).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(handleDismiss).not.toHaveBeenCalled();

    jest.advanceTimersByTime(501);
    expect(handleDismiss).toHaveBeenCalled();
  });

  it('Should persist after timeout when auto dismissed is disabled', () => {
    const handleDismiss = jest.fn();
    render(
      <ToastCore
        onDismiss={handleDismiss}
        toastDuration={1000}
        disableAutoDismiss
      >
        {() => 'rendered'}
      </ToastCore>
    );

    jest.advanceTimersByTime(2000);
    expect(handleDismiss).not.toHaveBeenCalled();
  });

  it('Should not call onDismiss more than once when dismissed before the timeout', () => {
    const handleDismiss = jest.fn();
    const { getByTestId } = render(
      <ToastCore onDismiss={handleDismiss} toastDuration={1000}>
        {({ clearTimeoutAndDismiss }) => (
          <button onClick={clearTimeoutAndDismiss} data-testid="the-button">
            dismiss
          </button>
        )}
      </ToastCore>
    );

    fireEvent.click(getByTestId('the-button'));
    jest.runAllTimers();
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('Should persist while the mouse is over the element', () => {
    const handleDismiss = jest.fn();
    const { getByTestId } = render(
      <ToastCore onDismiss={handleDismiss} toastDuration={1000}>
        {({ clearTimeoutAndDismiss, handleMouseEnter, handleMouseLeave }) => (
          <button
            onClick={clearTimeoutAndDismiss}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-testid="the-button"
          >
            dismiss
          </button>
        )}
      </ToastCore>
    );

    fireEvent.mouseOver(getByTestId('the-button'));
    jest.runAllTimers();
    expect(handleDismiss).not.toHaveBeenCalled();

    fireEvent.mouseLeave(getByTestId('the-button'));
    jest.runAllTimers();
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('Should call supplied mouseEnter and mouseLeave handlers', () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    const { getByTestId } = render(
      <ToastCore
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {({ handleMouseEnter, handleMouseLeave }) => (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-testid="toast-message"
          >
            toast message
          </div>
        )}
      </ToastCore>
    );

    const targetEl = getByTestId('toast-message');
    fireEvent.mouseOver(targetEl);
    expect(handleMouseEnter).toHaveBeenCalled();

    fireEvent.mouseLeave(targetEl);
    expect(handleMouseLeave).toHaveBeenCalled();
  });
});
