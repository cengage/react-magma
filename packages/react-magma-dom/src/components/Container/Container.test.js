import React from 'react';
import { axe } from 'jest-axe';
import { Container } from '.';
import { render } from '@testing-library/react';

describe('Container', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Container testId={testId}>Test container</Container>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Container>Test container</Container>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
