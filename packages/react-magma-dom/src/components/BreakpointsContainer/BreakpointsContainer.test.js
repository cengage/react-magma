import React from 'react';
import { axe } from 'jest-axe';
import { BreakpointsContainer, Breakpoint } from '.';
import { render } from '@testing-library/react';

describe('Breakpoints Container', () => {
  it('should render the BreakpointsContainer component', () => {
    const TEXT = 'Test Text';
    const { container, getByText } = render(
      <BreakpointsContainer>
        <Breakpoint>{TEXT}</Breakpoint>
      </BreakpointsContainer>
    );

    expect(container).toBeInTheDocument();
    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <BreakpointsContainer>
        <Breakpoint>hello</Breakpoint>
      </BreakpointsContainer>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
