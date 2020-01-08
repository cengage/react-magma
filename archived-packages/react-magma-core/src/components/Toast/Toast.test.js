import React from 'react';
import { ToastCore } from './Toast';
import { render, fireEvent } from '@testing-library/react';

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

  it('Should pause the timer', () => {
    const handleDismiss = jest.fn();
    const { getByTestId } = render(
      <ToastCore onDismiss={handleDismiss} toastDuration={1000}>
        {({ clearTimeoutAndDismiss, handlePause, handleResume }) => (
          <button
            onClick={clearTimeoutAndDismiss}
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
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

  it('Should pause the timer with default duration', () => {
    const handleDismiss = jest.fn();
    const { getByTestId } = render(
      <ToastCore onDismiss={handleDismiss}>
        {({ clearTimeoutAndDismiss, handlePause, handleResume }) => (
          <button
            onClick={clearTimeoutAndDismiss}
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
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
});
