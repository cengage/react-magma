import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { AlertCore } from './Alert';

describe('AlertCore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it('should handle the dismiss', () => {
    const onDismiss = jest.fn();
    const { getByText, getByTestId } = render(
      <AlertCore onDismiss={onDismiss}>
        {({ isExiting, handleDismiss }) => (
          <button onClick={handleDismiss} data-testid="target">
            {isExiting ? 'Exiting' : 'Not Exiting'}
          </button>
        )}
      </AlertCore>
    );
    expect(getByText(/not/i)).toBeInTheDocument();

    fireEvent.click(getByTestId('target'));
    jest.runAllTimers();

    expect(getByText(/exiting/i)).toBeInTheDocument();
    expect(onDismiss).toHaveBeenCalled();
  });
});
