import React from 'react';

import { render } from '@testing-library/react';

import { magma } from '../magma';

import { getGlobalLinkColor, GlobalStyles } from '.';

describe('GlobalStyles', () => {
  it('should render the global styles', () => {
    const { container } = render(<GlobalStyles />);

    expect(container).toBeInTheDocument();
  });

  it.each([
    [false, 'default', magma.colors.cyan700],
    [false, 'hover', magma.colors.cyan800],
    [false, 'focus', magma.colors.cyan700],
    [true, 'default', magma.colors.cyan500],
    [true, 'hover', magma.colors.cyan400],
    [true, 'focus', magma.colors.cyan500],
  ])(
    'uses the rebrand link color when inverse is %s and state is %s',
    (isInverse, state, color) => {
      expect(getGlobalLinkColor(magma, isInverse, state)).toBe(color);
    }
  );
});
