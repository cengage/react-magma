import { renderHook } from '@testing-library/react-hooks';
import { useMediaQuery } from './useMediaQuery';

describe('useMediaQuery', () => {
  it('should return false if outside of range', () => {
    const matches = () => {
      return false;
    };

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: matches(),
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    });

    const { result } = renderHook(() => useMediaQuery('(max-width: 1024px)'));

    expect(result.current).toEqual(false);
  });

  it('should return true if inside of range', () => {
    const matches = () => {
      return true;
    };

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: matches(),
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    });

    const { result } = renderHook(() => useMediaQuery('(max-width:1024px)'));

    expect(result.current).toEqual(true);
  });
});
