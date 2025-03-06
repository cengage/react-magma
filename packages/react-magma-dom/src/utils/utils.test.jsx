import React from 'react';

import { debounce, getNormalizedScrollLeft, reactNodeToString } from '.';

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

      jest.runAllTimers();

      expect(func).toHaveBeenCalled();
    });

    it('should not implement the debounced function twice within the same delay window', () => {
      const func = jest.fn();

      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      debouncedFunc();

      jest.runAllTimers();

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

  describe('reactNodeToString', () => {
    it('converts string to string', () => {
      const actual = reactNodeToString('test');
      const expected = 'test';

      expect(actual).toEqual(expected);
    });

    it('converts number to string', () => {
      const actual = reactNodeToString(123);
      const expected = '123';

      expect(actual).toEqual(expected);
    });

    it('converts node to string', () => {
      const actual = reactNodeToString(<div>test</div>);
      const expected = 'test';

      expect(actual).toEqual(expected);
    });

    it('converts array of nodes to string', () => {
      const actual = reactNodeToString([<div key={1}>test</div>]);
      const expected = 'test';

      expect(actual).toEqual(expected);
    });
  });
});
