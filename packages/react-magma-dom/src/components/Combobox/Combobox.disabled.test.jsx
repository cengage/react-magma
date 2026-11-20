import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { Combobox } from '.';

it.each([false, true])(
  'blocks option changes after disabling (isMulti: %s)',
  isMulti => {
    const onChange = jest.fn();
    const props = {
      isMulti,
      labelText: 'Choice',
      items: ['Alpha', 'Bravo'],
      ...(isMulti
        ? { onSelectedItemsChange: onChange }
        : { onSelectedItemChange: onChange }),
    };

    const { rerender } = render(<Combobox {...props} />);
    const option = { name: 'Bravo' };

    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('option', option)).toBeTruthy();

    rerender(<Combobox {...props} disabled />);
    fireEvent.click(screen.getByRole('option', option));
    expect(onChange).not.toHaveBeenCalled();

    rerender(<Combobox {...props} />);
    fireEvent.click(screen.getByRole('option', option));
    expect(onChange).toHaveBeenCalledTimes(1);
  }
);
