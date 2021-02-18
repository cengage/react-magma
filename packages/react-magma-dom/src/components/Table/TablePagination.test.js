import React from 'react';
import { axe } from 'jest-axe';
import { TablePagination } from '.';
import { render, fireEvent } from '@testing-library/react';
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

  it('should change page when clicking next', () => {
    const handleChangePage = jest.fn();

    const { getByTestId } = render(
      <TablePagination count={20} isInverse onChangePage={handleChangePage} />
    );
    const nextBtn = getByTestId('nextBtn');

    fireEvent.click(nextBtn);
    expect(handleChangePage).toHaveBeenCalled();
  });

  it('should change page when clicking previous', () => {
    const handleChangePage = jest.fn();

    const { getByTestId } = render(
      <TablePagination
        count={20}
        page={1}
        isInverse
        onChangePage={handleChangePage}
      />
    );
    const prevBtn = getByTestId('previousBtn');

    fireEvent.click(prevBtn);
    expect(handleChangePage).toHaveBeenCalled();
  });

  it('should change number of rows per page', () => {
    const handleChangeRowsPerPage = jest.fn();

    const { getByTestId, getByText } = render(
      <TablePagination
        count={20}
        isInverse
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    );
    const rowsSelect = getByTestId('selectTriggerButton');

    fireEvent.click(rowsSelect);
    fireEvent.click(getByText('20'));

    expect(handleChangeRowsPerPage).toHaveBeenCalled();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<TablePagination count={20} />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
