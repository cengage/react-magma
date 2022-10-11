import React from 'react';
import { axe } from '../../../axe-helper';
import { CharacterCounter } from '.';
import { render } from '@testing-library/react';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';

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
      <CharacterCounter inputLength={45} maxLength={231} testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <CharacterCounter inputLength={2} maxLength={22} />
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
  describe('Titles', () => {
    describe('Characters Allowed', () => {
      it('Shows the default label of "characters allowed" if maxLength is 0', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={0} maxLength={0} />
        );

        expect(getByText('0 ' + charactersAllowed)).toBeInTheDocument();
      });

      it('Shows the default label of "character allowed" if maxLength is 1', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={0} maxLength={1} />
        );

        expect(getByText('1 ' + characterAllowed)).toBeInTheDocument();
      });
      it('Shows the default label of "characters allowed" if maxLength > 1', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={0} maxLength={2} />
        );

        expect(getByText('2 ' + charactersAllowed)).toBeInTheDocument();
      });
    });

    describe('Characters Left', () => {
      it('Shows the label "characters left" when inputLength > 1', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={2} maxLength={4} />
        );
        expect(getByText('2 ' + charactersLeft)).toBeInTheDocument();
      });

      it('Shows the label "characters left" when maxLength is equal to inputLength', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={4} maxLength={4} />
        );
        expect(getByText('0 ' + charactersLeft)).toBeInTheDocument();
      });

      it('Shows the label "character left" when inputLength < maxLength by 1', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={3} maxLength={4} />
        );
        expect(getByText('1 ' + characterLeft)).toBeInTheDocument();
      });
    });

    describe('Characters Over Limit', () => {
      it('Shows the label "character over limit" when inputLength > maxLength by 1', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={5} maxLength={4} />
        );
        expect(getByText('1 ' + characterOver)).toBeInTheDocument();
      });

      it('Shows the label "characters over limit" when inputLength > maxLength by 2', () => {
        const { getByText } = render(
          <CharacterCounter inputLength={6} maxLength={4} />
        );
        expect(getByText('2 ' + charactersOver)).toBeInTheDocument();
      });
    });

    describe('styling', () => {
      it('Should render an input with a correctly styled error message', () => {
        const testId = 'inputMessageErrror';
        const { getByText, getByTestId } = render(
          <CharacterCounter testId={testId} inputLength={4} maxLength={2} />
        );

        const errorMessage = getByTestId(testId);

        expect(getByText('2 ' + charactersOver)).toBeInTheDocument();

        expect(errorMessage.querySelector('svg')).toHaveAttribute(
          'height',
          magma.iconSizes.small.toString()
        );
      });
    });
  });
});
