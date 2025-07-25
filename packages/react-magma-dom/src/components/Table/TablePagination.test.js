import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { transparentize } from 'polished';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { TablePagination } from '.';

describe('Table Pagination', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <TablePagination itemCount={20} testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should use styles when hasOutsideBorder is true and hasSquareCorners is true', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <TablePagination
        itemCount={20}
        hasOutsideBorder
        hasSquareCorners
        testId={testId}
      />
    );

    expect(getByTestId(testId)).toHaveStyleRule(
      'border-left',
      `1px solid ${magma.colors.neutral300}`
    );
    expect(getByTestId(testId)).toHaveStyleRule(
      'border-right',
      `1px solid ${magma.colors.neutral300}`
    );
    expect(getByTestId(testId)).toHaveStyleRule(
      'border-bottom',
      `1px solid ${magma.colors.neutral300}`
    );
    expect(getByTestId(testId)).toHaveStyle('border-radius: 0');
  });

  it('should use inverse styles when hasOutsideBorder is true and hasSquareCorners is true', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <TablePagination
        itemCount={20}
        isInverse
        hasOutsideBorder
        hasSquareCorners
        testId={testId}
      />
    );

    expect(getByTestId(testId)).toHaveStyleRule(
      'border-left',
      `1px solid ${transparentize(0.6, magma.colors.neutral100)}`
    );
    expect(getByTestId(testId)).toHaveStyleRule(
      'border-right',
      `1px solid ${transparentize(0.6, magma.colors.neutral100)}`
    );
    expect(getByTestId(testId)).toHaveStyleRule(
      'border-bottom',
      `1px solid ${transparentize(0.6, magma.colors.neutral100)}`
    );
    expect(getByTestId(testId)).toHaveStyle('border-radius: 0');
  });

  it('should use styles when hasOutsideBorder is false and hasSquareCorners is false', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <TablePagination
        hasSquareCorners={false}
        itemCount={20}
        isInverse
        testId={testId}
      />
    );

    expect(getByTestId(testId)).toHaveStyle('border-left : none');
    expect(getByTestId(testId)).toHaveStyle('border-right : none');
    expect(getByTestId(testId)).toHaveStyle('border-bottom : none');
    expect(getByTestId(testId)).toHaveStyle(
      `border-radius: 0 0 ${magma.borderRadius} ${magma.borderRadius}`
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
      const rowsSelect = getByTestId('rowPerPageSelect');

      const appliedSelection = document.querySelector(
        'select[data-testid=rowPerPageSelect]'
      );

      fireEvent.change(rowsSelect, { target: { value: 20 } });

      expect(handlePageChange).toHaveBeenCalledWith(expect.any(Object), 1);
      expect(handleRowsPerPageChange).toHaveBeenCalledWith(20);
      expect(getByText(/1-20/i)).toBeInTheDocument();
      expect(appliedSelection).toHaveDisplayValue('20');
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
      const rowsSelect = getByTestId('rowPerPageSelect');

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
    const { container } = render(<TablePagination itemCount={20} />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('should hide rows per page component when no onRowsPerPageChanged function passed', () => {
    const { queryByText } = render(<TablePagination itemCount={20} />);

    expect(queryByText('Rows per page:')).not.toBeInTheDocument();
  });

  it('should show rows per page component when onRowsPerPageChanged function passed', () => {
    const { queryByText } = render(
      <TablePagination itemCount={20} onRowsPerPageChange={() => {}} />
    );

    expect(queryByText('Rows per page:')).toBeInTheDocument();
  });
});
