import React from 'react';

import { act, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { HelperInformation } from './HelperInformation';

describe('Calendar Month', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('helper information should be visible when open', async () => {
    const { getByText } = render(<HelperInformation isOpen />);

    expect(getByText(/keyboard shortcuts/i)).toBeInTheDocument();
  });

  it('should call the onClose method when the helper information is closed', async () => {
    const onCloseSpy = jest.fn();
    const { getByLabelText, getByText, rerender } = render(
      <>
        <button>Click</button>
        <HelperInformation isOpen={false} onClose={onCloseSpy} />
      </>
    );

    getByText(/click/i).focus();

    rerender(
      <>
        <button>Click</button>
        <HelperInformation isOpen onClose={onCloseSpy} />
      </>
    );

    fireEvent.click(getByLabelText(/close/i));

    await act(async () => {
      jest.runAllTimers();
    });

    expect(onCloseSpy).toHaveBeenCalled();
  });

  it('should hold focus inside the helper information', () => {
    const { getByLabelText } = render(<HelperInformation isOpen />);

    const button = getByLabelText('Close Calendar Widget');

    userEvent.tab();

    expect(button).toBeInTheDocument();
    expect(button).toHaveFocus();

    userEvent.tab();
    userEvent.tab();

    expect(button).toHaveFocus();
  });
});
