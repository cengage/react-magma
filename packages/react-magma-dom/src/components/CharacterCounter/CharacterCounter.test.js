import React from 'react';

import { render, act } from '@testing-library/react';

import { axe } from '../../../axe-helper';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';

import { CharacterCounter } from '.';

const testId = 'test-id';

const characterAllowed = defaultI18n.characterCounter.characterAllowed;

const charactersAllowed = defaultI18n.characterCounter.charactersAllowed;

const characterLeft = defaultI18n.characterCounter.characterLeft;

const charactersLeft = defaultI18n.characterCounter.charactersLeft;

const characterOver = defaultI18n.characterCounter.characterOver;

const charactersOver = defaultI18n.characterCounter.charactersOver;

describe('CharacterCounter', () => {
  it('should find element by testId', () => {
    const { getByTestId } = render(
      <CharacterCounter inputLength={45} maxCount={231} testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    jest.useRealTimers();

    const { container } = render(
      <CharacterCounter inputLength={2} maxCount={22} />
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  describe('Titles', () => {
    describe('Characters Allowed', () => {
      it('Shows the default label of "characters allowed" if maxCount is 0', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={0} maxCount={0} />
        );

        expect(getByText('0 ' + charactersAllowed)).toBeInTheDocument();
      });

      it('Shows the default label of "character allowed" if maxCount is 1', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={0} maxCount={1} />
        );

        expect(getByText('1 ' + characterAllowed)).toBeInTheDocument();
      });
      it('Shows the default label of "characters allowed" if maxCount > 1', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={0} maxCount={2} />
        );

        expect(getByText('2 ' + charactersAllowed)).toBeInTheDocument();
      });
    });

    describe('Characters Left', () => {
      it('Shows the label "characters left" when inputLength > 1', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={2} maxCount={4} />
        );
        expect(getByText('2 ' + charactersLeft)).toBeInTheDocument();
      });

      it('Shows the label "characters left" when maxCount is equal to inputLength', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={4} maxCount={4} />
        );
        expect(getByText('0 ' + charactersLeft)).toBeInTheDocument();
      });

      it('Shows the label "character left" when inputLength < maxCount by 1', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={3} maxCount={4} />
        );
        expect(getByText('1 ' + characterLeft)).toBeInTheDocument();
      });
    });

    describe('Characters Over Limit', () => {
      it('Shows the label "character over limit" when inputLength > maxCount by 1', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={5} maxCount={4} />
        );
        expect(getByText('1 ' + characterOver)).toBeInTheDocument();
      });

      it('Shows the label "characters over limit" when inputLength > maxCount by 2', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={6} maxCount={4} />
        );
        expect(getByText('2 ' + charactersOver)).toBeInTheDocument();
      });
    });
  });

  describe('styling', () => {
    it('Should render an input with a correctly styled error message', () => {
      const testId = 'inputMessageErrror';
      const { getByText, getByTestId } = render(
        <CharacterCounter testId={testId} inputLength={4} maxCount={2} />
      );

      const errorMessage = getByTestId(testId);

      expect(getByText('2 ' + charactersOver)).toBeInTheDocument();

      expect(errorMessage.querySelector('svg')).toHaveAttribute(
        'height',
        magma.iconSizes.small.toString()
      );
    });
  });

  describe('accessibility', () => {
    it('Should have the aria-live attribute "polite" until inputLength gets to 100%', () => {
      const { getByText } = render(
        <CharacterCounter inputLength={2} maxCount={4} />
      );

      const characterCounter = getByText('2 ' + charactersLeft).parentElement;

      expect(characterCounter).toHaveAttribute('aria-live', 'polite');
    });

    it('Should have the aria-live attribute "assertive" when inputLength exceeds 100%', () => {
      const { getByText } = render(
        <CharacterCounter inputLength={5} maxCount={4} />
      );

      const characterCounter = getByText('1 ' + characterOver).parentElement;

      expect(characterCounter).toHaveAttribute('aria-live', 'assertive');
    });
  });

  describe('debounce behavior', () => {
    it('should update screenReaderMessage after debounce delay on MacOS', () => {
      jest.useFakeTimers();
      Object.defineProperty(navigator, 'userAgent', {
        value:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
        writable: true,
      });

      const { rerender, getByText, getByTestId } = render(
        <CharacterCounter inputLength={0} maxCount={10} id="counter-id" />
      );

      expect(getByText('10 characters allowed')).toBeInTheDocument();

      rerender(
        <CharacterCounter inputLength={5} maxCount={10} id="counter-id" />
      );

      expect(getByText('5 characters left')).toBeInTheDocument();

      expect(() => getByTestId('screenReaderMessage')).toThrowError();

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(() => getByTestId('screenReaderMessage')).toThrowError();

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(() => getByTestId('screenReaderMessage')).toThrowError();

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(() => getByTestId('screenReaderMessage')).not.toThrowError();
      expect(getByTestId('screenReaderMessage')).toBeInTheDocument();
      expect(getByTestId('screenReaderMessage')).toHaveTextContent(
        '5 characters left'
      );

      rerender(
        <CharacterCounter inputLength={15} maxCount={10} id="counter-id" />
      );

      expect(getByText('5 characters over limit')).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(getByTestId('screenReaderMessage')).toBeInTheDocument();
      expect(getByTestId('screenReaderMessage')).toHaveTextContent(
        '5 characters over limit'
      );
    });
  });
});
