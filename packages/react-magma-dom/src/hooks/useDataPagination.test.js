import { act, renderHook } from '@testing-library/react';

import { useDataPagination } from './useDataPagination';

describe('useDataPagination', () => {
  it('should return uncontrolled items per page', () => {
    const { result } = renderHook(() => useDataPagination());

    expect(result.current.itemsPerPage).toEqual(10);
  });

  it('should return controlled items per page', () => {
    const itemsPerPage = 20;
    const { result } = renderHook(() => useDataPagination({ itemsPerPage }));

    expect(result.current.itemsPerPage).toEqual(itemsPerPage);
  });

  it('should allow itemsPerPage to be updated', () => {
    const newItemsPerPage = 20;
    const { result } = renderHook(() => useDataPagination());

    act(() => {
      result.current.onItemsPerPageChange(newItemsPerPage);
    });

    expect(result.current.itemsPerPage).toEqual(newItemsPerPage);
  });
});
