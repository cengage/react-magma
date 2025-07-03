import React, { act } from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { HelperInformation } from './HelperInformation';

describe('Calendar Month', () => {
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

    act(() => {
      getByText(/click/i).focus();
    });

    rerender(
      <>
        <button>Click</button>
        <HelperInformation isOpen onClose={onCloseSpy} />
      </>
    );

    await userEvent.click(getByLabelText(/close/i));

    expect(onCloseSpy).toHaveBeenCalled();
  });

  it('should hold focus inside the helper information', async () => {
    const { getByLabelText } = render(<HelperInformation isOpen />);

    const button = getByLabelText('Close Calendar Widget');

    await userEvent.tab();

    expect(button).toBeInTheDocument();
    expect(button).toHaveFocus();

    await userEvent.tab();
    await userEvent.tab();

    expect(button).toHaveFocus();
  });
});
