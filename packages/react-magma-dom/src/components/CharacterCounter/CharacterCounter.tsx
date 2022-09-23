import * as React from 'react';
import styled from '../../theme/styled';
import { ErrorIcon } from 'react-magma-icons';
import { FormFieldContainerProps } from '../FormFieldContainer';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { InputSize } from '../InputBase';
import { I18nContext } from '../../i18n';

export interface CharacterCounterProps
  extends Omit<FormFieldContainerProps, 'fieldId'>,
    React.HTMLAttributes<HTMLDivElement> {
  activeStying?: boolean;
  hasError?: boolean;
  inputSize?: InputSize;
  isInverse?: boolean;
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

function buildFontColor(props: CharacterCounterProps) {
  if (props.isInverse && props.hasError) {
    return props.theme.colors.danger200;
  }
  if (props.hasError) {
    return props.theme.colors.danger;
  }
}

const StyledCharacterCounter = styled.div<CharacterCounterProps>`
  align-items: center;
  border-radius: ${props => props.theme.borderRadius};
  color: ${buildFontColor};
  display: flex;
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  font-weight: ${props =>
    props.activeStying
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
    inputClear,
    inputTotal,
    maxLength,
    testId,
    isInverse,
    ...rest
  } = props;

  const theme = React.useContext(ThemeContext);

  const i18n = React.useContext(I18nContext);

  const activeStyling = inputTotal < maxLength || inputTotal == maxLength;

  const errorStyling = inputTotal > maxLength;

  const characterCountDown = maxLength - inputTotal;

  const characterCountUp = inputTotal - maxLength;

  function characterTitleCount() {
    if (inputTotal < maxLength) {
      if (inputTotal === maxLength - 1) {
        return `${characterCountDown} ${i18n.characterCounter.characterLeft}`;
      } else if (characterCountDown > 1) {
        return `${characterCountDown} ${i18n.characterCounter.charactersLeft}`;
      }
    }
    if (inputTotal > maxLength) {
      if (inputTotal === maxLength + 1) {
        return `${characterCountUp} ${i18n.characterCounter.characterOver}`;
      }
      return `${characterCountUp} ${i18n.characterCounter.charactersOver}`;
    }
    if (inputTotal === maxLength) {
      return `0 ${i18n.characterCounter.charactersLeft}`;
    }
  }

  function characterTitle() {
    if (inputClear > 0) {
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
      data-testid={props.testId}
      activeStying={!inputClear ? null : activeStyling}
      hasError={errorStyling}
      isInverse={isInverse}
      ref={ref}
      theme={theme}
      {...rest}
    >
      {errorStyling && <ErrorIcon size={theme.iconSizes.small} />}
      {characterTitle()}
    </StyledCharacterCounter>
  );
});
