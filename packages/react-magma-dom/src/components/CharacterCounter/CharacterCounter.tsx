import * as React from 'react';
import styled from '../../theme/styled';
import { InputMessage } from '../Input/InputMessage';
import { magma } from '../../theme/magma';
import { I18nContext } from '../../i18n';

export interface CharacterCounterProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
   * @deprecated true
   */
  maxLength: number;
  /**
   * @internal
   */
  testId?: string;
}

// Changes the font weight to bold based on maxLength.
function buildFontWeight(props: Omit<CharacterCounterProps, 'id'>) {
  if (
    props.inputLength < props.maxLength ||
    (props.maxCount && props.inputLength >= 1) ||
    props.inputLength === props.maxLength ||
    props.maxCount
  ) {
    return magma.typographyVisualStyles.headingXSmall.fontWeight;
  }
  return 'inherit';
}

const StyledInputMessage = styled(InputMessage)<{
  inputLength: number;
  maxCount: number;
  maxLength: number;
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
    id,
    inputLength,
    maxCount,
    maxLength,
    testId,
    isInverse,
    ...rest
  } = props;

  const i18n = React.useContext(I18nContext);

  const isOverMaxLength = inputLength > maxLength || inputLength > maxCount;

  // Gets percentage value of total characters within Input to let aria-live have dynamic states.
  const getPercentage = (inputLength / maxLength || maxCount) * 100;

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

  // As the user types, this calculates the remaining characters set by maxLength or maxCount which counts down to zero then counts up if over the limit.
  const characterLimit =
    maxLength > inputLength || maxCount > inputLength
      ? maxLength - inputLength || maxCount - inputLength
      : inputLength - maxLength || inputLength - maxCount;

  /*
   * Returns the character counter description.
   * When there's no inputLength, returns "# character(s) allowed"
   * When inputLength < maxLength or maxCount or inputLength === maxLength or maxCount, returns "# character(s) left"
   * When inputLength > maxLength or maxCount, returns "# character(s) over limit"
   */
  function characterTitle() {
    if (inputLength > 0) {
      if (inputLength < maxLength || inputLength < maxCount) {
        if (inputLength === maxLength - 1 || inputLength === maxCount - 1) {
          return `${characterLimit} ${i18n.characterCounter.characterLeft}`;
        } else if (characterLimit > 1) {
          return `${characterLimit} ${i18n.characterCounter.charactersLeft}`;
        }
      }
      if (inputLength > maxLength || inputLength > maxCount) {
        if (inputLength === maxLength + 1 || inputLength === maxCount + 1) {
          return `${characterLimit} ${i18n.characterCounter.characterOver}`;
        }
        return `${characterLimit} ${i18n.characterCounter.charactersOver}`;
      }
      if (inputLength === maxLength || inputLength === maxCount) {
        return `0 ${i18n.characterCounter.charactersLeft}`;
      }
    } else {
      if (maxLength === 1 || maxCount === 1) {
        return `${maxLength || maxCount} ${
          i18n.characterCounter.characterAllowed
        }`;
      }
      return `${maxLength || maxCount} ${
        i18n.characterCounter.charactersAllowed
      }`;
    }
  }

  return (
    <div data-testid={testId} id={id} ref={ref} {...rest}>
      <StyledInputMessage
        aria-live={getAriaLiveState()}
        hasError={isOverMaxLength}
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
