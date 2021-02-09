import React from 'react';
import { axe } from 'jest-axe';
import { TablePagination } from '.';
import { render } from '@testing-library/react';
import { magma } from '../../theme/magma';

describe('Table Pagination', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <TablePagination count={20} testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should use inverse styles', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <TablePagination count={20} isInverse testId={testId} />
    );

    expect(getByTestId(testId)).toHaveStyleRule(
      'border-top',
      `1px solid ${magma.colors.neutral08}`
    );
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<TablePagination count={20} />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
