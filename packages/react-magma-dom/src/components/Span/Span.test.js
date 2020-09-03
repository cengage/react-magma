import React from 'react';
import { axe } from 'jest-axe';
import { Span } from '.';
import { render } from '@testing-library/react';
import { magma } from '../../theme/magma';

describe('Span', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Span testId={testId}>Test Span</Span>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a span with success styles', () => {
    const text = 'Test Span';
    const { getByText } = render(<Span color="success">{text}</Span>);
    expect(getByText(text)).toHaveStyleRule('color', magma.colors.success01);
  });

  it('should render a span with danger styles', () => {
    const text = 'Test Span';
    const { getByText } = render(<Span color="danger">{text}</Span>);
    expect(getByText(text)).toHaveStyleRule('color', magma.colors.danger);
  });

  it('should render a span with subdued styles', () => {
    const text = 'Test Span';
    const { getByText } = render(<Span color="subdued">{text}</Span>);
    expect(getByText(text)).toHaveStyleRule('color', magma.colors.neutral03);
  });

  it('should render a span with inverse styles', () => {
    const text = 'Test Span';
    const { getByText } = render(<Span isInverse>{text}</Span>);
    expect(getByText(text)).toHaveStyleRule('color', magma.colors.neutral08);
  });

  it('should render a span with inverse, subdued styles', () => {
    const text = 'Test Span';
    const { getByText } = render(
      <Span isInverse color="subdued">
        {text}
      </Span>
    );
    expect(getByText(text)).toHaveStyleRule('color', magma.colors.focusInverse);
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Span>test text</Span>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
