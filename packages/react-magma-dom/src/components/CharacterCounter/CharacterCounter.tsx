import * as React from 'react';
import styled from '../../theme/styled';
import { InputMessage } from '../Input/InputMessage';
import { magma } from '../../theme/magma';
import { I18nContext } from '../../i18n';

export interface CharacterCounterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Total number of characters in an input.
   */
  inputLength: number;
  isInverse?: boolean;
  /**
   * Sets the maximum amount of characters allowed.
   */
  maxLength: number;
  /**
   * @internal
   */
  testId?: string;
}

// Changes the font weight to bold based on maxLength.
function buildFontWeight(props: CharacterCounterProps) {
  if (
    (props.inputLength < props.maxLength && props.inputLength >= 1) ||
    props.inputLength === props.maxLength
  ) {
    return magma.typographyVisualStyles.headingXSmall.fontWeight;
  }
  return 'inherit';
}

const StyledInputMessage = styled(InputMessage)<{
  inputLength: number;
  maxLength: number;
}>`
  font-weight: ${buildFontWeight};
`;

export const CharacterCounter = React.forwardRef<
  HTMLDivElement,
  CharacterCounterProps
>(props => {
  const { children, inputLength, maxLength, testId, isInverse, ...rest } =
    props;

  const i18n = React.useContext(I18nContext);

  const isOverMaxLength = inputLength > maxLength;

  // Gets percentage value of total characters within Input to let aria-live have dynamic states.
  const getPercentage = (inputLength / maxLength) * 100;

  // Returns aria-live states based on percentage of characters within Input.
  function ariaLiveStates() {
    if (getPercentage >= 80) {
      if (getPercentage > 100) {
        return 'assertive';
      }
      return 'polite';
    }
    return 'off';
  }

  // As the user types, this calculates the remaining characters set by maxLength which counts down to zero then counts up if over the limit.
  const characterLimit =
    maxLength > inputLength ? maxLength - inputLength : inputLength - maxLength;

  /*
   * Returns the character counter description.
   * When there's no inputLength, returns "# character(s) allowed"
   * When inputLength < maxLength or inputLength === maxLength, returns "# character(s) left"
   * When inputLength > maxLength, returns "# character(s) over limit"
   */
  function characterTitle() {
    if (inputLength > 0) {
      if (inputLength < maxLength) {
        if (inputLength === maxLength - 1) {
          return `${characterLimit} ${i18n.characterCounter.characterLeft}`;
        } else if (characterLimit > 1) {
          return `${characterLimit} ${i18n.characterCounter.charactersLeft}`;
        }
      }
      if (inputLength > maxLength) {
        if (inputLength === maxLength + 1) {
          return `${characterLimit} ${i18n.characterCounter.characterOver}`;
        }
        return `${characterLimit} ${i18n.characterCounter.charactersOver}`;
      }
      if (inputLength === maxLength) {
        return `0 ${i18n.characterCounter.charactersLeft}`;
      }
    } else {
      if (maxLength === 1) {
        return `${maxLength} ${i18n.characterCounter.characterAllowed}`;
      }
      return `${maxLength} ${i18n.characterCounter.charactersAllowed}`;
    }
  }

  return (
    <div data-testid={testId} {...rest}>
      <StyledInputMessage
        aria-live={ariaLiveStates()}
        hasError={isOverMaxLength}
        isInverse={isInverse}
        inputLength={inputLength}
        maxLength={maxLength}
      >
        {characterTitle()}
      </StyledInputMessage>
    </div>
  );
});
