import * as React from 'react';
import styled from '../../theme/styled';
import { InputMessage } from '../Input/InputMessage';
import { magma } from '../../theme/magma';
import { I18nContext } from '../../i18n';

export interface CharacterCounterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 
   * Enables Character Counter by default. 
   * When set to false, the default HTML attribute of 'maxlength' will work. 
   * Note: This is a temporary prop and will be removed in future releases.
    @default true 
  */
  hasCharacterCounter?: boolean;
  /**
   * Identifier to associate Character Counter with Input.
   */
  id: string;
  /**
   * Total number of characters in an input.
   */
  inputLength: number;
  isInverse?: boolean;
  /**
   * Sets the maximum amount of characters allowed.
   */
  maxCount: number;
  /**
   * Sets the maximum amount of characters allowed.
   * @deprecated = true
   */
  maxLength: number;
  /**
   * @internal
   */
  testId?: string;
}

// Changes the font weight to bold based on maxCount.
function buildFontWeight(props: Omit<CharacterCounterProps, 'id'>) {
  if (
    (props.inputLength < props.maxCount && props.inputLength >= 1) ||
    props.inputLength === props.maxCount
  ) {
    return magma.typographyVisualStyles.headingXSmall.fontWeight;
  }
  return 'inherit';
}

const StyledInputMessage = styled(InputMessage)<{
  hasCharacterCounter?: boolean;
  inputLength: number;
  maxLength: number;
  maxCount: number;
}>`
  font-weight: ${buildFontWeight};
  font-family: ${props => props.theme.bodyFont};
`;

export const CharacterCounter = React.forwardRef<
  HTMLDivElement,
  CharacterCounterProps
>((props, ref) => {
  const {
    children,
    hasCharacterCounter,
    id,
    inputLength,
    maxCount,
    maxLength,
    testId,
    isInverse,
    ...rest
  } = props;

  const i18n = React.useContext(I18nContext);

  const isOverMaxCount = inputLength > maxCount;

  // Gets percentage value of total characters within Input to let aria-live have dynamic states.
  const getPercentage = (inputLength / maxCount) * 100;

  // Returns aria-live states based on percentage of characters within Input.
  function getAriaLiveState() {
    if (getPercentage >= 80) {
      if (getPercentage > 100) {
        return 'assertive';
      }
      return 'polite';
    }
    return 'off';
  }

  // As the user types, this calculates the remaining characters set by maxCount which counts down to zero then counts up if over the limit.
  const characterLimit =
    maxCount > inputLength ? maxCount - inputLength : inputLength - maxCount;

  /*
   * Returns the character counter description.
   * When there's no inputLength, returns "# character(s) allowed"
   * When inputLength < maxCount or inputLength === maxCount, returns "# character(s) left"
   * When inputLength > maxCount, returns "# character(s) over limit"
   */
  function characterTitle() {
    if (inputLength > 0) {
      if (inputLength < maxCount) {
        if (inputLength === maxCount - 1) {
          return `${characterLimit} ${i18n.characterCounter.characterLeft}`;
        } else if (characterLimit > 1) {
          return `${characterLimit} ${i18n.characterCounter.charactersLeft}`;
        }
      }
      if (inputLength > maxCount) {
        if (inputLength === maxCount + 1) {
          return `${characterLimit} ${i18n.characterCounter.characterOver}`;
        }
        return `${characterLimit} ${i18n.characterCounter.charactersOver}`;
      }
      if (inputLength === maxCount) {
        return `0 ${i18n.characterCounter.charactersLeft}`;
      }
    } else {
      if (maxCount === 1) {
        return `${maxCount} ${i18n.characterCounter.characterAllowed}`;
      }
      return `${maxCount} ${i18n.characterCounter.charactersAllowed}`;
    }
  }

  return (
    <div data-testid={testId} id={id} ref={ref} {...rest}>
      <StyledInputMessage
        aria-live={getAriaLiveState()}
        hasCharacterCounter={hasCharacterCounter}
        hasError={isOverMaxCount}
        isInverse={isInverse}
        inputLength={inputLength}
        maxCount={maxCount}
        maxLength={maxLength}
      >
        {characterTitle()}
      </StyledInputMessage>
    </div>
  );
});
