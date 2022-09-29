import * as React from 'react';
import styled from '../../theme/styled';
import { transparentize } from 'polished';
import { ErrorIcon } from 'react-magma-icons';
import { FormFieldContainerProps } from '../FormFieldContainer';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { InputSize } from '../InputBase';
import { I18nContext } from '../../i18n';

export interface CharacterCounterProps
  extends Omit<FormFieldContainerProps, 'fieldId'>,
    React.HTMLAttributes<HTMLDivElement> {
  hasError?: boolean;
  inputLength?: number;
  inputSize?: InputSize;
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

function buildFontColor(props: CharacterCounterProps) {
  if (props.isInverse) {
    if (props.hasError) {
      return props.theme.colors.danger200;
    }
    return transparentize(0.3, props.theme.colors.neutral100);
  }
  if (props.hasError) {
    return props.theme.colors.danger;
  }
}

const StyledCharacterCounter = styled.div<{
  activeStyling?: boolean;
  hasError?: boolean;
  inputLength?: number;
  inputSize?: InputSize;
  isInverse?: boolean;
}>`
  align-items: center;
  border-radius: ${props => props.theme.borderRadius};
  color: ${buildFontColor};
  display: flex;
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  font-weight: ${props =>
    !props.activeStyling && !props.hasError && props.inputLength >= 1
      ? props.theme.typographyVisualStyles.headingXSmall.fontWeight
      : ''};
  letter-spacing: ${props => props.theme.typeScale.size02.letterSpacing};
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  margin-top: ${props =>
    props.inputSize === InputSize.large
      ? props.theme.spaceScale.spacing03
      : props.theme.spaceScale.spacing02};
  text-align: left;
  svg {
    color: ${props =>
      props.isInverse ? props.theme.colors.danger200 : 'inherit'};
    margin-right: ${props => props.theme.spaceScale.spacing02};
  }
`;

export const CharacterCounter = React.forwardRef<
  HTMLDivElement,
  CharacterCounterProps
>((props, ref) => {
  const {
    children,
    hasError,
    inputLength,
    inputSize,
    maxLength,
    testId,
    isInverse,
    ...rest
  } = props;

  const theme = React.useContext(ThemeContext);

  const i18n = React.useContext(I18nContext);

  const characterStyling =
    maxLength < inputLength && hasError
      ? inputLength < maxLength
      : inputLength > maxLength;

  const characterLimit =
    maxLength > inputLength ? maxLength - inputLength : inputLength - maxLength;

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
    <StyledCharacterCounter
      aria-live="polite"
      activeStyling={characterStyling}
      data-testid={testId}
      hasError={characterStyling}
      isInverse={isInverse}
      inputLength={inputLength}
      inputSize={inputSize}
      ref={ref}
      theme={theme}
      {...rest}
    >
      {console.log(testId)}
      {characterStyling && <ErrorIcon size={theme.iconSizes.small} />}
      {characterTitle()}
    </StyledCharacterCounter>
  );
});
