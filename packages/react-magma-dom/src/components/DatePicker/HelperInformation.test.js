import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { HelperInformation } from './HelperInformation';

describe('Calendar Month', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('helper information should be visible when open', async () => {
    const { getByText, rerender } = render(<HelperInformation />);

    rerender(<HelperInformation open={true} />);

    expect(getByText(/keyboard shortcuts/i)).toBeInTheDocument();
  });

  it('helper information should not be visible when not open', () => {
    const { queryByText } = render(<HelperInformation open={false} />);

    expect(queryByText(/keyboard shortcuts/i)).not.toBeInTheDocument();
  });

  it('should call the onClose method when the helper information is closed', () => {
    const onCloseSpy = jest.fn();
    const { getByLabelText, getByText, rerender } = render(
      <>
        <button>Click</button>
        <HelperInformation open={false} onClose={onCloseSpy} />
      </>
    );

    getByText(/click/i).focus();

    rerender(
      <>
        <button>Click</button>
        <HelperInformation open={true} onClose={onCloseSpy} />
      </>
    );

    fireEvent.click(getByLabelText(/close/i));

    jest.runAllTimers();

    expect(onCloseSpy).toHaveBeenCalled();
  });
});
