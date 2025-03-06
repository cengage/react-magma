import React from 'react';

import { render } from '@testing-library/react';

import { HideAtBreakpoint } from '.';

describe('Hide at Breakpoint', () => {
  it('should render the HideAtBreakpoint component', () => {
    const TEXT = 'Test Text';
    const { container } = render(<HideAtBreakpoint>{TEXT}</HideAtBreakpoint>);

    expect(container).toBeInTheDocument();
  });
});
