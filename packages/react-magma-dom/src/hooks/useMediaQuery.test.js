import { renderHook } from '@testing-library/react';

import { useMediaQuery } from './useMediaQuery';

const mockMatches = query => {
  const mockScreenWidth = 1200;

  const reg = /\d+/g;
  const maxSize = query.match(reg)[0];
  const minSize = query.match(reg)[1];

  return (
    mockScreenWidth <= parseInt(maxSize) && mockScreenWidth >= parseInt(minSize)
  );
};

function defineMatchMedia() {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: mockMatches(query),
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

function clearMatchMedia() {
  Object.defineProperty(window, 'matchMedia', { undefined });
}

describe('useMediaQuery', () => {
  afterEach(() => {
    clearMatchMedia();
  });

  it('should return false if screen-size is greater than max-width', () => {
    defineMatchMedia();
    const { result } = renderHook(() =>
      useMediaQuery('(max-width:1024px) and (min-width: 600px)')
    );

    expect(result.current).toEqual(false);
  });

  it('should return true if screen-size is less than max-width and greater than the min-width', () => {
    defineMatchMedia();
    const { result } = renderHook(() =>
      useMediaQuery('(max-width:1300px) and (min-width: 600px)')
    );

    expect(result.current).toEqual(true);
  });

  it('should return false if screen-size is less than the min-width', () => {
    defineMatchMedia();
    const { result } = renderHook(() =>
      useMediaQuery('(max-width:1500px) and (min-width: 1300px)')
    );

    expect(result.current).toEqual(false);
  });

  it('should return false if window does not support matchMedia', () => {
    const { result } = renderHook(() => useMediaQuery('(max-width:1024px)'));

    expect(result.current).toEqual(false);
  });
});
