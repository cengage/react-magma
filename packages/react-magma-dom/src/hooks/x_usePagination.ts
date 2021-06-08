import * as React from 'react';

interface UsePaginationBasics {
  /**
   * Event that fires when the page number changes
   */
  onPageChange?: (event: React.SyntheticEvent, newPage: number) => void;
  /**
   * Event that fires when the number of items per page changes
   */
  onItemsPerPageChange?: (event: any) => void;
  /**
   * Values added to the items per page select
   */
  itemsPerPageValues?: number[];
}

export interface UsePaginationControlled extends UsePaginationBasics {
  defaultPage?: never;
  defaultItemsPerPage?: never;
  /**
   * Zero-based page number
   *  @default 0
   */
  page?: number;
  /**
   * Number of items per page
   * @default 10
   */
  itemsPerPage?: number;
}

export interface UsePaginationUncontrolled extends UsePaginationBasics {
  /**
   * Zero-based page number used when initially rendered
   */
  defaultPage?: number;
  /**
   * Number of items per page when initially rendered
   */
  defaultItemsPerPage?: number;
  page?: never;
  itemsPerPage?: never;
}

export type UsePaginationProps =
  | UsePaginationControlled
  | UsePaginationUncontrolled;

export function usePagination(overrides: UsePaginationProps = {}) {
  const {
    defaultPage,
    defaultItemsPerPage,
    page: pageProp,
    itemsPerPage: itemsPerPageProp,
    itemsPerPageValues,
    onPageChange,
    onItemsPerPageChange,
  } = overrides;

  const [page, updatePage] = React.useState<number>(
    defaultPage || pageProp || 0
  );

  const [itemsPerPage, updateItemsPerPage] = React.useState<number>(
    defaultItemsPerPage || itemsPerPageProp || 10
  );

  function handleUpdatePage(newPageNumber: number) {
    if (!pageProp) {
      updatePage(newPageNumber);
    }
  }

  function handlePreviousButtonClick() {
    handleUpdatePage(page - 1);
  }

  function handleNextButtonClick() {
    handleUpdatePage(page + 1);
  }

  function handlePageButtonClick(pageNumber: number) {
    handleUpdatePage(pageNumber);
  }

  function handleChangePage(event: React.SyntheticEvent, newPage: number) {
    handleUpdatePage(newPage);

    onPageChange &&
      typeof onPageChange === 'function' &&
      onPageChange(event, newPage);
  }

  function handleChangeItemsPerPage(newItemsPerPage: number) {
    if (!itemsPerPageProp) {
      updateItemsPerPage(newItemsPerPage);
      handleChangePage({} as React.SyntheticEvent, 0);
    }

    onItemsPerPageChange &&
      typeof onItemsPerPageChange === 'function' &&
      onItemsPerPageChange(newItemsPerPage);
  }

  return {
    page,
    itemsPerPage,
    itemsPerPageValues,
    onPageChange: handleChangePage,
    onItemsPerPageChange: handleChangeItemsPerPage,
    onNextButtonClick: handleNextButtonClick,
    onPageButtonClick: handlePageButtonClick,
    onPreviousButtonClick: handlePreviousButtonClick,
  };
}

export type UsePaginationReturn = ReturnType<typeof usePagination>;
