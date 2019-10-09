import React from 'react';
import { axe } from 'jest-axe';
import { Search } from '.';
import { render } from '@testing-library/react';

describe('Search', () => {
  it('should render the search component', () => {
    const { container } = render(<Search />);

    expect(container).toBeInTheDocument();
  });

  it('should render the search component with custom aria-label, placeholder, and label text', () => {
    const { container } = render(
      <Search
        iconAriaLabel="Test icon label"
        labelText="Test input label"
        placeholderText="Test placeholder"
      />
    );

    expect(container.querySelector('button')).toHaveAttribute(
      'aria-label',
      'Test icon label'
    );

    expect(container.querySelector('input')).toHaveAttribute(
      'placeholder',
      'Test placeholder'
    );

    expect(container.querySelector('input')).toHaveAttribute(
      'aria-label',
      'Test input label'
    );
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Search />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
