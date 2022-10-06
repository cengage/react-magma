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
  inputLength?: number;
  /**
   * Sets the maximum amount of characters allowed.
   */
  isInverse?: boolean;
  /**
   * Enables the Character Counter and sets the maximum amount of characters allowed within the Input.
   */
  maxLength?: number;
  /**
   * @internal
   */
  testId?: string;
}

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
  inputLength?: number;
  maxLength?: number;
}>`
  font-weight: ${buildFontWeight};
`;

export const CharacterCounter = React.forwardRef<
  HTMLDivElement,
  CharacterCounterProps
>((props, ref) => {
  const { children, inputLength, maxLength, testId, isInverse, ...rest } =
    props;

  const i18n = React.useContext(I18nContext);

  const isOverMaxLength = inputLength > maxLength;

  // As the user types, this shows the remaining characters set by maxLength which counts down to zero then counts up if over the limit.
  const characterLimit =
    maxLength > inputLength ? maxLength - inputLength : inputLength - maxLength;

  // Character Counter default "allowed" title states.
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
    <div data-testid={testId} aria-live="polite">
      <StyledInputMessage
        hasError={isOverMaxLength}
        isInverse={isInverse}
        inputLength={inputLength}
        maxLength={maxLength}
        {...rest}
      >
        {characterTitle()}
      </StyledInputMessage>
    </div>
  );
});
