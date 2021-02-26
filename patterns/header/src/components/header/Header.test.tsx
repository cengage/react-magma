import React from 'react';
import { axe } from 'jest-axe';
import { Header } from '.';
import { render } from '@testing-library/react';

describe('Header', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Header testId={testId}></Header>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Header>Test Text</Header>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
