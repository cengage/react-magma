import { debounce, getNormalizedScrollLeft } from '.';

describe('Utils', () => {
  describe('Debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should call function passed in to debounce after a delay', () => {
      const func = jest.fn();

      const debouncedFunc = debounce(func, 100);

      debouncedFunc();

      jest.runOnlyPendingTimers();

      expect(func).toHaveBeenCalled();
    });

    it('should not implement the debounced function twice within the same delay window', () => {
      const func = jest.fn();

      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      debouncedFunc();

      jest.runOnlyPendingTimers();

      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should clear the timeout when the clear function is called', () => {
      window.clearTimeout = jest.fn();
      const func = jest.fn();

      const debouncedFunc = debounce(func, 100);

      debouncedFunc.clear();

      expect(window.clearTimeout).toHaveBeenCalled();
      window.clearTimeout.mockRestore();
    });
  });

  describe('getNormalizedScrollLeft', () => {
    it('get the scroll left for ltr direction', () => {
      const scrollLeft = 1;
      const normalizedScrollLeft = getNormalizedScrollLeft(
        { scrollLeft },
        'ltr'
      );

      expect(normalizedScrollLeft).toEqual(scrollLeft);
    });
  });
});
