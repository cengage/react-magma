interface PaginationI18n {
  ofLabel: string;
  pageNumberLabel: string;
  pageLabel: string;
  pagesLabel: string;
  selectedLabel: string;
}

export const formatPageNumber = (pageNumber: number) =>
  typeof pageNumber === 'number'
    ? pageNumber.toLocaleString()
    : String(pageNumber);

export const paginationLabel = (count: number, pagination: PaginationI18n) => {
  return `${pagination.ofLabel} ${formatPageNumber(count)} ${count <= 1 ? pagination.pageLabel : pagination.pagesLabel}`;
};

export const pageAriaLabel = (
  selectedPage: number,
  count: number,
  pagination: PaginationI18n
) => {
  return `${pagination.pageNumberLabel} ${formatPageNumber(selectedPage)} ${paginationLabel(count, pagination)} ${pagination.selectedLabel}`;
};
