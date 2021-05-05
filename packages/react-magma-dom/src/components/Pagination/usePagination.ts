import * as React from 'react';

interface UsePaginationBasics {
  /**
   * Event that fires when the page number changes
   */
  onChangePage?: (event: React.SyntheticEvent, newPage: number) => void;
  /**
   * Event that fires when the number of rows per page changes
   */
  onChangeRowsPerPage?: (event: any) => void;
  /**
   * Values added to the rows per page select
   */
  rowsPerPageValues?: number[];
}

export interface UsePaginationControlled extends UsePaginationBasics {
  defaultPage?: never;
  defaultRowsPerPage?: never;
  /**
   * Zero-based page number
   *  @default 0
   */
  page?: number;
  /**
   * Number of rows per page
   * @default 10
   */
  rowsPerPage?: number;
}

export interface UsePaginationUncontrolled extends UsePaginationBasics {
  /**
   * Zero-based page number used when initially rendered
   */
  defaultPage?: number;
  /**
   * Number of rows per page when initially rendered
   */
  defaultRowsPerPage?: number;
  page?: never;
  rowsPerPage?: never;
}

export type UsePaginationProps =
  | UsePaginationControlled
  | UsePaginationUncontrolled;

export function usePagination(
  count: number,
  overrides: UsePaginationProps = {}
) {
  const {
    defaultPage,
    defaultRowsPerPage,
    page: pageProp,
    rowsPerPage: rowsPerPageProp,
    rowsPerPageValues,
    onChangePage,
    onChangeRowsPerPage,
  } = overrides;

  const [page, updatePage] = React.useState<number>(
    defaultPage || pageProp || 0
  );
  const [rowsPerPage, updateRowsPerPage] = React.useState<number>(
    defaultRowsPerPage || rowsPerPageProp || 10
  );

  function handleChangePage(event: React.SyntheticEvent, newPage: number) {
    if (!pageProp) {
      updatePage(newPage);
    }

    onChangePage &&
      typeof onChangePage === 'function' &&
      onChangePage(event, newPage);
  }

  function handleChangeRowsPerPage(newRowsPerPage: number) {
    if (!rowsPerPageProp) {
      updateRowsPerPage(newRowsPerPage);
      handleChangePage({} as React.SyntheticEvent, 0);
    }

    onChangeRowsPerPage &&
      typeof onChangeRowsPerPage === 'function' &&
      onChangeRowsPerPage(newRowsPerPage);
  }

  return {
    count,
    page,
    rowsPerPage,
    rowsPerPageValues,
    onChangePage: handleChangePage,
    onChangeRowsPerPage: handleChangeRowsPerPage,
  };
}

export type UsePaginationReturn = ReturnType<typeof usePagination>;
