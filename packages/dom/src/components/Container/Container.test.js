import React from 'react';
import { axe } from '../../../axe-helper';
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

  it('should render with inverse styles', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Container isInverse testId={testId}>
        Test container
      </Container>
    );

    expect(getByTestId(testId)).toHaveStyleRule(
      'color',
      'var(--colors-neutral08)'
    );
  });

  it('should render with max-width', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Container maxWidth={600} testId={testId}>
        Test container
      </Container>
    );

    expect(getByTestId(testId)).toHaveStyleRule('max-width', '600px');
  });

  it('should render with custom gutter width', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Container gutterWidth={10} testId={testId}>
        Test container
      </Container>
    );

    expect(getByTestId(testId)).toHaveStyleRule('padding', '0 10px');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Container>Test container</Container>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
