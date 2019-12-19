import React from 'react';
import { axe } from 'jest-axe';
import { Search } from '.';
import { render, fireEvent } from '@testing-library/react';

const onSearchSpy = jest.fn();

describe('Search', () => {
  it('should render the search component', () => {
    const { container } = render(<Search onSearch={onSearchSpy} />);

    expect(container).toBeInTheDocument();
  });

  it('should render the search component with custom aria-label, placeholder, and label text', () => {
    const { container } = render(
      <Search
        iconAriaLabel="Test icon label"
        labelText="Test input label"
        onSearch={onSearchSpy}
        placeholder="Test placeholder"
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

  it('should fire the onSearch event when enter is pressed', () => {
    const { container } = render(<Search onSearch={onSearchSpy} />);

    fireEvent.keyDown(container.querySelector('input'), {
      keyCode: 27
    });

    expect(onSearchSpy).not.toHaveBeenCalled();

    fireEvent.keyDown(container.querySelector('input'), {
      keyCode: 13
    });

    expect(onSearchSpy).toHaveBeenCalled();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Search onSearch={onSearchSpy} />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
