import { act, renderHook } from '@testing-library/react-hooks';
import { usePagination } from './usePagination';

const rowsForPagination = [
  {
    id: 1,
    col1: '1 Lorem ipsum dolor sit amet consectetur',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 2,
    col1: '2 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 3,
    col1: '3 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 4,
    col1: '4 Lorem ipsum dolor sit amet consectetur',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 5,
    col1: '5 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 6,
    col1: '6 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 7,
    col1: '7  Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 8,
    col1: '8 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 9,
    col1: '9 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 10,
    col1: '10 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 11,
    col1: '11 Lorem ipsum dolor sit amet consectetur',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 12,
    col1: '12 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 13,
    col1: '13 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 14,
    col1: '14 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 15,
    col1: '15 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 16,
    col1: '16 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 17,
    col1: '17 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 18,
    col1: '18 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 19,
    col1: '19 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 20,
    col1: '20 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 21,
    col1: '21 Lorem ipsum dolor sit amet consectetur',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 22,
    col1: '22 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 23,
    col1: '23 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 24,
    col1: '24 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 25,
    col1: '25 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
];

describe('usePagination', () => {
  it('should return default pagination values', () => {
    const { result } = renderHook(() =>
      usePagination(rowsForPagination.length)
    );

    expect(result.current).toEqual({
      count: rowsForPagination.length,
      page: 0,
      rowsPerPage: 10,
      onChangePage: expect.any(Function),
      onChangeRowsPerPage: expect.any(Function),
    });
  });

  it('should return default pagination values with default overrides', () => {
    const { result } = renderHook(() =>
      usePagination(rowsForPagination.length, {
        defaultPage: 1,
        defaultRowsPerPage: 20,
      })
    );

    expect(result.current).toEqual({
      count: rowsForPagination.length,
      page: 1,
      rowsPerPage: 20,
      onChangePage: expect.any(Function),
      onChangeRowsPerPage: expect.any(Function),
    });
  });

  it('should return default pagination values with controlled overrides', () => {
    const { result } = renderHook(() =>
      usePagination(rowsForPagination.length, {
        page: 1,
        rowsPerPage: 20,
      })
    );

    expect(result.current).toEqual({
      count: rowsForPagination.length,
      page: 1,
      rowsPerPage: 20,
      onChangePage: expect.any(Function),
      onChangeRowsPerPage: expect.any(Function),
    });
  });

  it('should update the page number', () => {
    const newPage = 2;
    const { result } = renderHook(() =>
      usePagination(rowsForPagination.length)
    );

    act(() => {
      result.current.onChangePage({}, newPage);
    });

    expect(result.current).toEqual({
      count: rowsForPagination.length,
      page: newPage,
      rowsPerPage: 10,
      onChangePage: expect.any(Function),
      onChangeRowsPerPage: expect.any(Function),
    });
  });

  it('should update the rows per page number', () => {
    const newRowsPerPage = 50;
    const { result } = renderHook(() =>
      usePagination(rowsForPagination.length)
    );

    act(() => {
      result.current.onChangeRowsPerPage(newRowsPerPage);
    });

    expect(result.current).toEqual({
      count: rowsForPagination.length,
      page: 0,
      rowsPerPage: newRowsPerPage,
      onChangePage: expect.any(Function),
      onChangeRowsPerPage: expect.any(Function),
    });
  });

  it('should update the page number to 0 when updating the rows per page', () => {
    const newRowsPerPage = 50;
    const { result } = renderHook(() =>
      usePagination(rowsForPagination.length)
    );

    act(() => {
      result.current.onChangePage(2);
    });

    act(() => {
      result.current.onChangeRowsPerPage(newRowsPerPage);
    });

    expect(result.current).toEqual({
      count: rowsForPagination.length,
      page: 0,
      rowsPerPage: newRowsPerPage,
      onChangePage: expect.any(Function),
      onChangeRowsPerPage: expect.any(Function),
    });
  });

  it('should not update the page number if a page is passed in with the overrides', () => {
    const newPage = 2;
    const { result } = renderHook(() =>
      usePagination(rowsForPagination.length, { page: 1 })
    );

    act(() => {
      result.current.onChangePage({}, newPage);
    });

    expect(result.current).toEqual({
      count: rowsForPagination.length,
      page: 1,
      rowsPerPage: 10,
      onChangePage: expect.any(Function),
      onChangeRowsPerPage: expect.any(Function),
    });
  });

  it('should not update the rows per page number if rows per page is passed in with the overrides', () => {
    const newRowsPerPage = 50;
    const { result } = renderHook(() =>
      usePagination(rowsForPagination.length, { rowsPerPage: 10 })
    );

    act(() => {
      result.current.onChangeRowsPerPage(newRowsPerPage);
    });

    expect(result.current).toEqual({
      count: rowsForPagination.length,
      page: 0,
      rowsPerPage: 10,
      onChangePage: expect.any(Function),
      onChangeRowsPerPage: expect.any(Function),
    });
  });
});
