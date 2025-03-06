import { act, renderHook } from '@testing-library/react-hooks';

import { usePagination } from './usePagination';
import { defaultI18n } from '../../i18n/default';

const itemsForPagination = [
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
  it('should return default page buttons', () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.pageButtons).toEqual([
      {
        disabled: true,
        isSelected: false,
        onClick: expect.any(Function),
        page: 0,
        type: 'previous',
      },
      {
        'aria-current': 'true',
        'aria-label': `${defaultI18n.pagination.pageButtonLabel} 1`,
        disabled: false,
        isSelected: true,
        onClick: expect.any(Function),
        page: 1,
        type: 'page',
      },
      {
        disabled: true,
        isSelected: false,
        onClick: expect.any(Function),
        page: 2,
        type: 'next',
      },
    ]);
  });

  it('should return multiple page buttons', () => {
    const { result } = renderHook(() => usePagination({ count: 2 }));

    expect(result.current.pageButtons).toEqual([
      {
        disabled: true,
        isSelected: false,
        onClick: expect.any(Function),
        page: 0,
        type: 'previous',
      },
      {
        'aria-current': 'true',
        'aria-label': `${defaultI18n.pagination.pageButtonLabel} 1`,
        disabled: false,
        isSelected: true,
        onClick: expect.any(Function),
        page: 1,
        type: 'page',
      },
      {
        'aria-current': undefined,
        'aria-label': `${defaultI18n.pagination.pageButtonLabel} 2`,
        disabled: false,
        isSelected: false,
        onClick: expect.any(Function),
        page: 2,
        type: 'page',
      },
      {
        disabled: false,
        isSelected: false,
        onClick: expect.any(Function),
        page: 2,
        type: 'next',
      },
    ]);
  });

  it('should return page buttons with a default page', () => {
    const { result } = renderHook(() =>
      usePagination({
        count: 2,
        defaultPage: 2,
      })
    );

    expect(result.current.pageButtons).toEqual([
      {
        disabled: false,
        isSelected: false,
        onClick: expect.any(Function),
        page: 1,
        type: 'previous',
      },
      {
        'aria-current': undefined,
        'aria-label': `${defaultI18n.pagination.pageButtonLabel} 1`,
        disabled: false,
        isSelected: false,
        onClick: expect.any(Function),
        page: 1,
        type: 'page',
      },
      {
        'aria-current': 'true',
        'aria-label': `${defaultI18n.pagination.pageButtonLabel} 2`,
        disabled: false,
        isSelected: true,
        onClick: expect.any(Function),
        page: 2,
        type: 'page',
      },
      {
        disabled: true,
        isSelected: false,
        onClick: expect.any(Function),
        page: 3,
        type: 'next',
      },
    ]);
  });

  it('should disable all of the buttons', () => {
    const { result } = renderHook(() =>
      usePagination({ count: 2, disabled: true })
    );

    expect(result.current.pageButtons).toEqual([
      {
        disabled: true,
        isSelected: false,
        onClick: expect.any(Function),
        page: 0,
        type: 'previous',
      },
      {
        'aria-current': 'true',
        'aria-label': `${defaultI18n.pagination.pageButtonLabel} 1`,
        disabled: true,
        isSelected: true,
        onClick: expect.any(Function),
        page: 1,
        type: 'page',
      },
      {
        'aria-current': undefined,
        'aria-label': `${defaultI18n.pagination.pageButtonLabel} 2`,
        disabled: true,
        isSelected: false,
        onClick: expect.any(Function),
        page: 2,
        type: 'page',
      },
      {
        disabled: true,
        isSelected: false,
        onClick: expect.any(Function),
        page: 2,
        type: 'next',
      },
    ]);
  });

  it('should hide the next and previous buttons', () => {
    const { result } = renderHook(() =>
      usePagination({
        count: 2,
        hidePreviousButton: true,
        hideNextButton: true,
      })
    );

    expect(result.current.pageButtons).toEqual([
      {
        'aria-current': 'true',
        'aria-label': `${defaultI18n.pagination.pageButtonLabel} 1`,
        disabled: false,
        isSelected: true,
        onClick: expect.any(Function),
        page: 1,
        type: 'page',
      },
      {
        'aria-current': undefined,
        'aria-label': `${defaultI18n.pagination.pageButtonLabel} 2`,
        disabled: false,
        isSelected: false,
        onClick: expect.any(Function),
        page: 2,
        type: 'page',
      },
    ]);
  });

  it('should return default pagination values with controlled pages', () => {
    const { result } = renderHook(() =>
      usePagination({
        count: 2,
        page: 2,
      })
    );

    expect(result.current.pageButtons).toEqual([
      {
        disabled: false,
        isSelected: false,
        onClick: expect.any(Function),
        page: 1,
        type: 'previous',
      },
      {
        'aria-current': undefined,
        'aria-label': `${defaultI18n.pagination.pageButtonLabel} 1`,
        disabled: false,
        isSelected: false,
        onClick: expect.any(Function),
        page: 1,
        type: 'page',
      },
      {
        'aria-current': 'true',
        'aria-label': `${defaultI18n.pagination.pageButtonLabel} 2`,
        disabled: false,
        isSelected: true,
        onClick: expect.any(Function),
        page: 2,
        type: 'page',
      },
      {
        disabled: true,
        isSelected: false,
        onClick: expect.any(Function),
        page: 3,
        type: 'next',
      },
    ]);
  });

  it('should update the page number on page button click', () => {
    const { result } = renderHook(() =>
      usePagination({
        count: 2,
      })
    );

    expect(result.current.pageButtons[1].isSelected).toBeTruthy();

    act(() => {
      result.current.pageButtons[2].onClick({});
    });

    expect(result.current.pageButtons).toEqual([
      {
        disabled: false,
        isSelected: false,
        onClick: expect.any(Function),
        page: 1,
        type: 'previous',
      },
      {
        'aria-current': undefined,
        'aria-label': `${defaultI18n.pagination.pageButtonLabel} 1`,
        disabled: false,
        isSelected: false,
        onClick: expect.any(Function),
        page: 1,
        type: 'page',
      },
      {
        'aria-current': 'true',
        'aria-label': `${defaultI18n.pagination.pageButtonLabel} 2`,
        disabled: false,
        isSelected: true,
        onClick: expect.any(Function),
        page: 2,
        type: 'page',
      },
      {
        disabled: true,
        isSelected: false,
        onClick: expect.any(Function),
        page: 3,
        type: 'next',
      },
    ]);
  });

  it('should not update the page buttons if a page is passed in', () => {
    const { result } = renderHook(() =>
      usePagination({
        count: 2,
        page: 2,
      })
    );

    expect(result.current.pageButtons[2].isSelected).toBeTruthy();

    act(() => {
      result.current.pageButtons[1].onClick({});
    });

    expect(result.current.pageButtons).toEqual([
      {
        disabled: false,
        isSelected: false,
        onClick: expect.any(Function),
        page: 1,
        type: 'previous',
      },
      {
        'aria-current': undefined,
        'aria-label': `${defaultI18n.pagination.pageButtonLabel} 1`,
        disabled: false,
        isSelected: false,
        onClick: expect.any(Function),
        page: 1,
        type: 'page',
      },
      {
        'aria-current': 'true',
        'aria-label': `${defaultI18n.pagination.pageButtonLabel} 2`,
        disabled: false,
        isSelected: true,
        onClick: expect.any(Function),
        page: 2,
        type: 'page',
      },
      {
        disabled: true,
        isSelected: false,
        onClick: expect.any(Function),
        page: 3,
        type: 'next',
      },
    ]);
  });

  it('should only allow 1 adjacent page button to the current page by default', () => {
    const { result } = renderHook(() =>
      usePagination({ count: 11, defaultPage: 6 })
    );

    const currentPage = result.current.pageButtons[4];

    expect(result.current.pageButtons[2].type).toEqual('start-ellipsis');
    expect(result.current.pageButtons[3].page).toEqual(5);

    expect(currentPage['aria-current']).toEqual('true');
    expect(currentPage.isSelected).toBeTruthy();
    expect(currentPage.page).toEqual(6);

    expect(result.current.pageButtons[5].page).toEqual(7);
    expect(result.current.pageButtons[6].type).toEqual('end-ellipsis');
  });

  it('should allow number of adjacent page buttons to be overwritten', () => {
    const { result } = renderHook(() =>
      usePagination({ count: 11, defaultPage: 6, numberOfAdjacentPages: 2 })
    );

    const currentPage = result.current.pageButtons[5];

    expect(result.current.pageButtons[2].type).toEqual('start-ellipsis');
    expect(result.current.pageButtons[3].page).toEqual(4);
    expect(result.current.pageButtons[4].page).toEqual(5);

    expect(currentPage['aria-current']).toEqual('true');
    expect(currentPage.isSelected).toBeTruthy();
    expect(currentPage.page).toEqual(6);

    expect(result.current.pageButtons[6].page).toEqual(7);
    expect(result.current.pageButtons[7].page).toEqual(8);
    expect(result.current.pageButtons[8].type).toEqual('end-ellipsis');
  });

  it('should only allow 1 edge page button by default', () => {
    const { result } = renderHook(() =>
      usePagination({ count: 11, defaultPage: 6 })
    );

    expect(result.current.pageButtons[1].page).toEqual(1);
    expect(result.current.pageButtons[2].type).toEqual('start-ellipsis');

    expect(result.current.pageButtons[6].type).toEqual('end-ellipsis');
    expect(result.current.pageButtons[7].page).toEqual(11);
  });

  it('should allow number of edge page buttons to be overwritten', () => {
    const { result } = renderHook(() =>
      usePagination({ count: 11, defaultPage: 6, numberOfEdgePages: 2 })
    );

    expect(result.current.pageButtons[1].page).toEqual(1);
    expect(result.current.pageButtons[2].page).toEqual(2);
    expect(result.current.pageButtons[3].type).toEqual('start-ellipsis');

    expect(result.current.pageButtons[7].type).toEqual('end-ellipsis');
    expect(result.current.pageButtons[8].page).toEqual(10);
    expect(result.current.pageButtons[9].page).toEqual(11);
  });

  it('should call passed in onPageChange function', () => {
    const onPageChange = jest.fn();
    const { result } = renderHook(() =>
      usePagination({ count: 10, onPageChange })
    );

    act(() => {
      result.current.pageButtons[2].onClick({});
    });

    expect(onPageChange).toHaveBeenCalledWith(expect.any(Object), 2);
  });

  it('should change the page to the next page number when the next button is clicked', () => {
    const { result } = renderHook(() => usePagination({ count: 10 }));

    act(() => {
      result.current.pageButtons[result.current.pageButtons.length - 1].onClick(
        {}
      );
    });

    expect(result.current.pageButtons[2].isSelected).toBeTruthy();
  });

  it('should change the page to the previous page number when the previous button is clicked', () => {
    const { result } = renderHook(() =>
      usePagination({ count: 10, defaultPage: 2 })
    );

    act(() => {
      result.current.pageButtons[0].onClick({});
    });

    expect(result.current.pageButtons[1].isSelected).toBeTruthy();
  });
});
