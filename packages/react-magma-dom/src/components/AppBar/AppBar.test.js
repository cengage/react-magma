import React from 'react';
import { axe } from 'jest-axe';
import { AppBar } from '.';
import { render } from '@testing-library/react';

describe('AppBar', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <AppBar testId={testId}>Test AppBar</AppBar>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<AppBar>test text</AppBar>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
