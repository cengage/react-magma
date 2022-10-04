import * as React from 'react';
import styled from '../../theme/styled';
import { FormFieldContainerProps } from '../FormFieldContainer';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { I18nContext } from '../../i18n';
import { InputMessage } from '../Input/InputMessage';

export interface CharacterCounterProps
  extends Omit<FormFieldContainerProps, 'fieldId'>,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * Total number of characters in an input.
   */
  inputLength?: number;
  /**
   * Sets the maximum amount of characters allowed.
   */
  maxLength?: number;
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

function buildFontWeight(props: CharacterCounterProps) {
  if (
    (props.inputLength < props.maxLength && props.inputLength >= 1) ||
    props.inputLength === props.maxLength
  ) {
    return props.theme.typographyVisualStyles.headingXSmall.fontWeight;
  }
}
const StyledWrapper = styled.div``;

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

  const theme = React.useContext(ThemeContext);

  const i18n = React.useContext(I18nContext);

  const isOverMaxLength = inputLength > maxLength;

  // As the user types, this shows the remaining characters set by maxLength which counts down to zero then counts up if over the limit.
  const characterLimit =
    maxLength > inputLength ? maxLength - inputLength : inputLength - maxLength;

  // Changes the Character Counter title states from remaining to over the limit.
  function characterTitleCount() {
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
  }

  // Character Counter default "allowed" title states.
  function characterTitle() {
    if (inputLength > 0) {
      return characterTitleCount();
    } else {
      if (maxLength === 1) {
        return `${maxLength} ${i18n.characterCounter.characterAllowed}`;
      }
      return `${maxLength} ${i18n.characterCounter.charactersAllowed}`;
    }
  }

  return (
    <StyledWrapper data-testid={testId} aria-live="polite">
      <StyledInputMessage
        hasError={isOverMaxLength}
        isInverse={isInverse}
        inputLength={inputLength}
        maxLength={maxLength}
        theme={theme}
        {...rest}
      >
        {characterTitle()}
      </StyledInputMessage>
    </StyledWrapper>
  );
});
