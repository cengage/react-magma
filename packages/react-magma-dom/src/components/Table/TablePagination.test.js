import React from 'react';
import { axe } from '../../../axe-helper';
import { TablePagination } from '.';
import { act, render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';
import { transparentize } from 'polished';

const testId = 'test-id';

describe('Table Pagination', () => {
  it('should find element by testId', () => {
    const { getByTestId } = render(
      <TablePagination itemCount={20} testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should use inverse styles', () => {
    const { getByTestId } = render(
      <TablePagination itemCount={20} isInverse testId={testId} />
    );

    expect(getByTestId(testId)).toHaveStyleRule(
      'border-top',
      `1px solid ${transparentize(0.6, magma.colors.neutral100)}`
    );
  });

  it('should change the direction of the dropdown content with passed in props', () => {
    const { getByTestId } = render(
      <TablePagination itemCount={20} dropdownDropDirection="down" />
    );
    const rowsSelect = getByTestId('rowPerPageDropdownButton');

    fireEvent.click(rowsSelect);

    expect(getByTestId('dropdownContent')).not.toHaveStyleRule('top', 'auto');
    expect(getByTestId('dropdownContent')).not.toHaveStyleRule(
      'bottom',
      '100%'
    );
  });

  describe('uncontrolled', () => {
    it('should change page when clicking next', () => {
      const handlePageChange = jest.fn();

      const { getByTestId, getByText } = render(
        <TablePagination
          itemCount={20}
          isInverse
          onPageChange={handlePageChange}
        />
      );
      const nextBtn = getByTestId('nextBtn');

      fireEvent.click(nextBtn);
      expect(handlePageChange).toHaveBeenCalledWith(expect.any(Object), 2);
      expect(getByText(/11-20/i)).toBeInTheDocument();
    });

    it('should change page when clicking previous', () => {
      const handlePageChange = jest.fn();

      const { getByTestId, getByText } = render(
        <TablePagination
          itemCount={20}
          defaultPage={2}
          isInverse
          onPageChange={handlePageChange}
        />
      );
      const prevBtn = getByTestId('previousBtn');

      fireEvent.click(prevBtn);
      expect(handlePageChange).toHaveBeenCalledWith(expect.any(Object), 1);
      expect(getByText(/1-10/i)).toBeInTheDocument();
    });

    it('should change number of rows per page', () => {
      const handlePageChange = jest.fn();
      const handleRowsPerPageChange = jest.fn();

      const { getByTestId, getByText } = render(
        <TablePagination
          itemCount={20}
          isInverse
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      );
      const rowsSelect = getByTestId('rowPerPageDropdownButton');

      fireEvent.click(rowsSelect);
      fireEvent.click(getByText('20'));

      expect(handlePageChange).toHaveBeenCalledWith(expect.any(Object), 1);
      expect(handleRowsPerPageChange).toHaveBeenCalledWith(20);
      expect(getByText(/1-20/i)).toBeInTheDocument();
    });
  });

  describe('controlled', () => {
    it('should only change page when prop is changed', () => {
      let page = 1;
      const handlePageChange = (_, newPage) => {
        page = newPage;
      };

      const { getByTestId, getByText, rerender } = render(
        <TablePagination
          itemCount={20}
          isInverse
          onPageChange={handlePageChange}
          page={page}
        />
      );
      const nextBtn = getByTestId('nextBtn');

      fireEvent.click(nextBtn);
      expect(getByText(/1-10/i)).toBeInTheDocument();

      rerender(
        <TablePagination
          itemCount={20}
          isInverse
          onPageChange={handlePageChange}
          page={page}
        />
      );

      expect(getByText(/11-20/i)).toBeInTheDocument();
    });

    it('should change page when clicking previous', () => {
      let page = 2;
      const handlePageChange = (_, newPage) => {
        page = newPage;
      };

      const { getByTestId, getByText, rerender } = render(
        <TablePagination
          itemCount={20}
          isInverse
          onPageChange={handlePageChange}
          page={page}
        />
      );
      const nextBtn = getByTestId('previousBtn');

      fireEvent.click(nextBtn);
      expect(getByText(/11-20/i)).toBeInTheDocument();

      rerender(
        <TablePagination
          itemCount={20}
          isInverse
          onPageChange={handlePageChange}
          page={page}
        />
      );

      expect(getByText(/1-10/i)).toBeInTheDocument();
    });

    it('should change number of rows per page', () => {
      let rowsPerPage = 10;
      let page = 2;
      const handleRowsPerPageChange = newRowsPerPage => {
        page = 1;
        rowsPerPage = newRowsPerPage;
      };

      const { getByTestId, getByText, rerender } = render(
        <TablePagination
          itemCount={40}
          isInverse
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      );
      const rowsSelect = getByTestId('rowPerPageDropdownButton');

      fireEvent.click(rowsSelect);
      fireEvent.click(getByText('20'));

      expect(getByText(/11-20/i)).toBeInTheDocument();

      rerender(
        <TablePagination
          itemCount={40}
          isInverse
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      );

      expect(getByText(/1-20/i)).toBeInTheDocument();
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <TablePagination itemCount={20} testId={testId} />
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
