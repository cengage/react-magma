import React from 'react';
import { axe } from 'jest-axe';
import { Pagination } from '.';
import { render } from '@testing-library/react';

describe('Pagination', () => {
  //  it('should find element by testId', () => {
  //    const testId = 'test-id';
  //    const { getByTestId } = render(<Pagination testId={testId} />);

  //    expect(getByTestId(testId)).toBeInTheDocument();
  //  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Pagination />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
