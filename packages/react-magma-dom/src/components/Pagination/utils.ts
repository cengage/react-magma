interface PaginationI18n {
  ofLabel: string;
  pageNumberLabel: string;
  pageLabel: string;
  pagesLabel: string;
  selectedLabel: string;
}

export const paginationLabel = (count: number, pagination: PaginationI18n) => {
  return `${pagination.ofLabel}
        ${count}
        ${count <= 1 ? pagination.pageLabel : pagination.pagesLabel}`;
};

export const pageAriaLabel = (
  selectedPage: number,
  count: number,
  pagination: PaginationI18n
) => {
  return `${pagination.pageNumberLabel}
    ${selectedPage}
    ${paginationLabel(count, pagination)}
    ${pagination.selectedLabel}`;
};
