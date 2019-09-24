import React from 'react';
import { axe } from 'jest-axe';
import { VisuallyHidden } from '.';
import { render } from '@testing-library/react';

const TEXT = 'Test Text';

describe('VisuallyHidden', () => {
  it('should render the visually hidden component', () => {
    const { container, getByText } = render(
      <VisuallyHidden>{TEXT}</VisuallyHidden>
    );

    expect(container).toBeInTheDocument();
    expect(getByText(TEXT)).toHaveStyleRule('clip', 'rect(1px,1px,1px,1px)');
    expect(getByText(TEXT)).toHaveStyleRule('height', '1px');
    expect(getByText(TEXT)).toHaveStyleRule('overflow', 'hidden');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<VisuallyHidden>{TEXT}</VisuallyHidden>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
