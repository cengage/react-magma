import { renderHook } from '@testing-library/react-hooks';
import { useMediaQuery } from './useMediaQuery';

const mockedScreenWidth = 1200;

const mockMatches = query => {
  const reg = /\d+/;
  const querySize = query.match(reg)[0];
  return parseInt(querySize) > mockedScreenWidth;
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
      dispatchEvent: jest.fn()
    }))
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
    const { result } = renderHook(() => useMediaQuery('(max-width:1024px)'));

    expect(result.current).toEqual(false);
  });

  it('should return true if screen-size is less than max-width', () => {
    defineMatchMedia();
    const { result } = renderHook(() => useMediaQuery('(max-width:1331px)'));

    expect(result.current).toEqual(true);
  });

  it('should return false if window does not support matchMedia', () => {
    const { result } = renderHook(() => useMediaQuery('(max-width:1024px)'));

    expect(result.current).toEqual(false);
  });
});
