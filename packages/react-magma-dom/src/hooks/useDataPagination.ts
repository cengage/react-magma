import { useControlled } from './useControlled';

export interface UseDataPaginationProps<PaginatedItem> {
  /**
   * Number of items per page by default when uncontrolled
   * @default 10
   */
  defaultItemsPerPage?: number;
  /**
   * Array of items to be displayed
   */
  items?: PaginatedItem[];
  /**
   * Number of items per page
   */
  itemsPerPage?: number;
  /**
   * Event that fires when the number of items per page is changed
   */
  onItemsPerPageChange?: (newRowsPerPage: number) => void;
}
export interface UseDataPaginationReturn<PaginatedItem> {
  getPageItems: (page: number) => PaginatedItem[];
  itemsPerPage: number;
  length: number;
  onItemsPerPageChange: (newItemsPerPage: number) => void;
}

export function useDataPagination<T>(
  props: UseDataPaginationProps<T> = {}
): UseDataPaginationReturn<T> {
  const {
    defaultItemsPerPage = 10,
    items = [],
    itemsPerPage: itemsPerPageProp,
    onItemsPerPageChange,
  } = props;

  const [itemsPerPage, setItemsPerPageState] = useControlled({
    controlled: itemsPerPageProp,
    default: defaultItemsPerPage,
  });

  function handleItemsPerPageChange(newItemsPerPage: number) {
    if (!itemsPerPageProp) {
      setItemsPerPageState(newItemsPerPage);
    }

    onItemsPerPageChange &&
      typeof onItemsPerPageChange === 'function' &&
      onItemsPerPageChange(newItemsPerPage);
  }

  const getPageItems = (page: number) => {
    const isLastPage = page * itemsPerPage >= items.length;

    const start = (page - 1) * itemsPerPage;
    const end = isLastPage ? items.length : page * itemsPerPage;

    return items.slice(start, end);
  };

  const length = Math.ceil(items.length / itemsPerPage);

  return {
    getPageItems,
    itemsPerPage,
    length,
    onItemsPerPageChange: handleItemsPerPageChange,
  };
}
