import React from 'react';

import { useControlled } from '../../hooks/useControlled';
import { I18nContext } from '../../i18n';

export interface UsePaginationProps {
  /**
   * The total number of Pagination buttons
   * @default 1
   */
  count?: number;
  /**
   * Page selected by default when the component is uncontrolled
   * @default 1
   */
  defaultPage?: number;
  /**
   * If true, disables all of the Pagination buttons
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, hides the next page button
   * @default false
   */
  hideNextButton?: boolean;
  /**
   * If true, hides the previous page button
   * @default false
   */
  hidePreviousButton?: boolean;
  /**
   * Number of page buttons before and after the current page
   * @default 1
   */
  numberOfAdjacentPages?: number;
  /**
   * Number of page buttons at the beginning and end of the page number buttons list
   * @default 1
   */
  numberOfEdgePages?: number;
  /**
   * Event that fires when the page number changes
   */
  onPageChange?: (event: React.SyntheticEvent, newPage: number) => void;
  /**
   * Current page number
   */
  page?: number;
  /**
   * If true, shows the first page button
   * @default false
   */
  showFirstButton?: boolean;
  /**
   * If true, shows the last page button
   * @default false
   */
  showLastButton?: boolean;
}

export function usePagination(props: Partial<UsePaginationProps> = {}) {
  const {
    count = 1,
    defaultPage = 1,
    disabled = false,
    hideNextButton = false,
    hidePreviousButton = false,
    numberOfAdjacentPages = 1,
    numberOfEdgePages = 1,
    onPageChange: handleChange,
    page: pageProp,
    showFirstButton = false,
    showLastButton = false,
    ...other
  } = props;

  const i18n = React.useContext(I18nContext);

  const [page, setPageState] = useControlled({
    controlled: pageProp,
    default: defaultPage,
  });

  const handleClick = (event, value) => {
    if (!pageProp) {
      setPageState(value);
    }

    handleChange &&
      typeof handleChange === 'function' &&
      handleChange(event, value);
  };

  const range = (start, end) => {
    const length = end - start + 1;

    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(numberOfEdgePages, count));
  const endPages = range(
    Math.max(count - numberOfEdgePages + 1, numberOfEdgePages + 1),
    count
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - numberOfAdjacentPages,
      // Lower boundary when page is high
      count - numberOfEdgePages - numberOfAdjacentPages * 2 - 1
    ),
    // Greater than startPages
    numberOfEdgePages + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + numberOfAdjacentPages,
      // Upper boundary when page is low
      numberOfEdgePages + numberOfAdjacentPages * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1
  );

  // Basic list of items to render
  const itemList = [
    ...(showFirstButton ? ['first'] : []),
    ...(hidePreviousButton ? [] : ['previous']),
    ...startPages,

    // Start ellipsis
    ...(siblingsStart > numberOfEdgePages + 2
      ? ['start-ellipsis']
      : numberOfEdgePages + 1 < count - numberOfEdgePages
        ? [numberOfEdgePages + 1]
        : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...(siblingsEnd < count - numberOfEdgePages - 1
      ? ['end-ellipsis']
      : count - numberOfEdgePages > numberOfEdgePages
        ? [count - numberOfEdgePages]
        : []),

    ...endPages,
    ...(hideNextButton ? [] : ['next']),
    ...(showLastButton ? ['last'] : []),
  ];

  // Map the button type to its page number
  const buttonPage = type => {
    switch (type) {
      case 'first':
        return 1;
      case 'previous':
        return page - 1;
      case 'next':
        return page + 1;
      case 'last':
        return count;
      default:
        return null;
    }
  };

  // Convert the basic item list to PaginationItem props objects
  const pageButtons = itemList.map(item => {
    return typeof item === 'number'
      ? {
          onClick: event => {
            handleClick(event, item);
          },
          type: 'page',
          page: item,
          isSelected: item === page,
          disabled,
          'aria-current': item === page ? 'true' : undefined,
          'aria-label': `${i18n.pagination.pageButtonLabel} ${item}`,
        }
      : {
          onClick: event => {
            handleClick(event, buttonPage(item));
          },
          type: item,
          page: buttonPage(item),
          isSelected: false,
          disabled:
            disabled ||
            (item.indexOf('ellipsis') === -1 &&
              (item === 'next' || item === 'last' ? page >= count : page <= 1)),
        };
  });

  return {
    page,
    pageButtons,
    setPageState,
    ...other,
  };
}
