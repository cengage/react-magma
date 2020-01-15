import React from 'react';
import { axe } from 'jest-axe';
import { HideAtBreakpoint } from '.';
import { render } from '@testing-library/react';

const TEXT = 'Test Text';

describe('Hide at Breakpoint', () => {
  it('should render the HideAtBreakpoint component', () => {
    const { container, getByText } = render(
      <HideAtBreakpoint>{TEXT}</HideAtBreakpoint>
    );

    expect(container).toBeInTheDocument();
    expect(getByText(TEXT)).toHaveStyleRule('display', 'block');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<HideAtBreakpoint>{TEXT}</HideAtBreakpoint>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
