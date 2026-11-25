import React from 'react';

import { render, fireEvent, waitFor } from '@testing-library/react';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { TablePagination } from '.';
import userEvent from '@testing-library/user-event';

describe('Table Pagination', () => {
  it('should render the rows-per-page label at 14px and weight 500', () => {
    const { getByText } = render(
      <TablePagination
        itemCount={20}
        onRowsPerPageChange={() => {}}
        rowsPerPageValues={[10, 20]}
      />
    );

    expect(getByText(/rows per page/i)).toHaveStyleRule(
      'font-size',
      magma.typeScale.size02.fontSize
    );
    expect(getByText(/rows per page/i)).toHaveStyleRule('font-weight', '500');
    expect(getByText(/rows per page/i)).toHaveStyleRule(
      'white-space',
      'nowrap'
    );
  });

  it('should size the rows-per-page select to its selected value', () => {
    const { getByTestId, rerender } = render(
      <TablePagination
        itemCount={200}
        onRowsPerPageChange={() => {}}
        rowsPerPage={10}
        rowsPerPageValues={[10, 100]}
      />
    );

    expect(getByTestId('rowPerPageSelect')).toHaveStyle(
      'width: calc(2ch + 56px)'
    );

    rerender(
      <TablePagination
        itemCount={200}
        onRowsPerPageChange={() => {}}
        rowsPerPage={100}
        rowsPerPageValues={[10, 100]}
      />
    );

    expect(getByTestId('rowPerPageSelect')).toHaveStyle(
      'width: calc(3ch + 56px)'
    );
  });

  it('should render the page-count text at weight 400', () => {
    const { getByTestId } = render(<TablePagination itemCount={20} />);

    expect(getByTestId('page-count')).toHaveStyleRule('font-weight', '400');
    expect(getByTestId('page-count')).toHaveTextContent('Page 1: 1-10 of 20');
    expect(getByTestId('page-number')).toHaveTextContent('Page 1:');
    expect(getByTestId('page-number')).toHaveStyleRule('font-weight', '500');
    expect(getByTestId('page-range')).toHaveStyleRule('white-space', 'nowrap');
  });

  it('should separate the left-aligned pagination details and right-aligned navigation', () => {
    const { getByTestId } = render(
      <TablePagination
        itemCount={20}
        onRowsPerPageChange={() => {}}
        testId="table-pagination"
      />
    );

    expect(getByTestId('table-pagination')).toHaveStyleRule(
      'padding',
      `${magma.spaceScale.spacing03} ${magma.spaceScale.spacing05}`
    );
    expect(
      getByTestId('table-pagination-responsive-container')
    ).toHaveStyleRule('container-type', 'inline-size');
    expect(getByTestId('pagination-navigation')).toHaveStyleRule(
      'margin-left',
      'auto'
    );
    expect(getByTestId('rows-page-divider')).toHaveStyleRule(
      'background',
      magma.colors.neutral200
    );
    expect(getByTestId('navigation-divider')).toHaveStyleRule(
      'background',
      magma.colors.neutral200
    );
    expect(getByTestId('rows-page-divider')).toHaveStyleRule(
      'align-self',
      'stretch'
    );
    expect(getByTestId('navigation-divider')).toHaveStyleRule(
      'align-self',
      'stretch'
    );
  });

  it('should use inverse pagination divider colors', () => {
    const { getByTestId } = render(
      <TablePagination
        isInverse
        itemCount={20}
        onRowsPerPageChange={() => {}}
      />
    );

    expect(getByTestId('rows-page-divider')).toHaveStyleRule(
      'background',
      magma.colors.neutral800
    );
    expect(getByTestId('navigation-divider')).toHaveStyleRule(
      'background',
      magma.colors.neutral800
    );
    expect(getByTestId('rowPerPageSelect').parentElement).toHaveStyleRule(
      'border',
      `1px solid ${magma.colors.neutral700}`
    );
    expect(getByTestId('rowPerPageSelect').parentElement).toHaveStyleRule(
      'color',
      magma.colors.neutral0,
      { target: 'svg' }
    );
  });

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
      `1px solid ${magma.colors.neutral200}`
    );
    expect(getByTestId(testId)).toHaveStyleRule(
      'border-right',
      `1px solid ${magma.colors.neutral200}`
    );
    expect(getByTestId(testId)).toHaveStyleRule(
      'border-bottom',
      `1px solid ${magma.colors.neutral200}`
    );
    expect(getByTestId(testId)).toHaveStyleRule(
      'background',
      magma.colors.neutral150
    );
    expect(getByTestId('page-count')).toHaveStyleRule(
      'color',
      magma.colors.brand.navy
    );
    expect(getByTestId('previousBtn')).toHaveStyleRule(
      'color',
      magma.colors.neutral500
    );
    expect(getByTestId('nextBtn')).toHaveStyleRule(
      'color',
      magma.colors.brand.navy
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
      `1px solid ${magma.colors.neutral800}`
    );
    expect(getByTestId(testId)).toHaveStyleRule(
      'border-right',
      `1px solid ${magma.colors.neutral800}`
    );
    expect(getByTestId(testId)).toHaveStyleRule(
      'border-bottom',
      `1px solid ${magma.colors.neutral800}`
    );
    expect(getByTestId(testId)).toHaveStyleRule(
      'background',
      magma.colors.neutral1000
    );
    expect(getByTestId('previousBtn')).toHaveStyleRule(
      'color',
      magma.colors.neutral600
    );
    expect(getByTestId('nextBtn')).toHaveStyleRule(
      'color',
      magma.colors.neutral0
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

  it('should move focus to the previous button when clicking next and the next page is disabled', async () => {
    const { getByTestId } = render(
      <TablePagination itemCount={20} isInverse rowsPerPage={10} />
    );
    const nextBtn = getByTestId('nextBtn');
    const previousBtn = getByTestId('previousBtn');

    userEvent.click(nextBtn);

    await waitFor(() => {
      expect(previousBtn).toHaveFocus();
    });
  });

  it('should move focus to the next button when clicking previous and the previous page is disabled', async () => {
    const { getByTestId } = render(
      <TablePagination
        itemCount={20}
        isInverse
        defaultPage={2}
        rowsPerPage={10}
      />
    );
    const nextBtn = getByTestId('nextBtn');
    const previousBtn = getByTestId('previousBtn');

    userEvent.click(previousBtn);

    await waitFor(() => {
      expect(nextBtn).toHaveFocus();
    });
  });

  describe('uncontrolled', () => {
    it('should change page when clicking next', () => {
      const handlePageChange = jest.fn();

      const { getByTestId } = render(
        <TablePagination
          itemCount={20}
          isInverse
          onPageChange={handlePageChange}
        />
      );
      const nextBtn = getByTestId('nextBtn');

      fireEvent.click(nextBtn);
      expect(handlePageChange).toHaveBeenCalledWith(expect.any(Object), 2);
      expect(getByTestId('page-count')).toHaveTextContent(/11-20/i);
    });

    it('should change page when clicking previous', () => {
      const handlePageChange = jest.fn();

      const { getByTestId } = render(
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
      expect(getByTestId('page-count')).toHaveTextContent(/1-10/i);
    });

    it('should change number of rows per page', () => {
      const handlePageChange = jest.fn();
      const handleRowsPerPageChange = jest.fn();

      const { getByTestId } = render(
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
      expect(getByTestId('page-count')).toHaveTextContent(/1-20/i);
      expect(appliedSelection).toHaveDisplayValue('20');
    });
  });

  describe('controlled', () => {
    it('should only change page when prop is changed', () => {
      let page = 1;
      const handlePageChange = (_, newPage) => {
        page = newPage;
      };

      const { getByTestId, rerender } = render(
        <TablePagination
          itemCount={20}
          isInverse
          onPageChange={handlePageChange}
          page={page}
        />
      );
      const nextBtn = getByTestId('nextBtn');

      fireEvent.click(nextBtn);
      expect(getByTestId('page-count')).toHaveTextContent(/1-10/i);

      rerender(
        <TablePagination
          itemCount={20}
          isInverse
          onPageChange={handlePageChange}
          page={page}
        />
      );

      expect(getByTestId('page-count')).toHaveTextContent(/11-20/i);
    });

    it('should change page when clicking previous', () => {
      let page = 2;
      const handlePageChange = (_, newPage) => {
        page = newPage;
      };

      const { getByTestId, rerender } = render(
        <TablePagination
          itemCount={20}
          isInverse
          onPageChange={handlePageChange}
          page={page}
        />
      );
      const nextBtn = getByTestId('previousBtn');

      fireEvent.click(nextBtn);
      expect(getByTestId('page-count')).toHaveTextContent(/11-20/i);

      rerender(
        <TablePagination
          itemCount={20}
          isInverse
          onPageChange={handlePageChange}
          page={page}
        />
      );

      expect(getByTestId('page-count')).toHaveTextContent(/1-10/i);
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

      expect(getByTestId('page-count')).toHaveTextContent(/11-20/i);

      rerender(
        <TablePagination
          itemCount={40}
          isInverse
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      );

      expect(getByTestId('page-count')).toHaveTextContent(/1-20/i);
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
