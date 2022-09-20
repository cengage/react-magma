import * as React from 'react';
import styled from '../../theme/styled';

import { ErrorIcon } from 'react-magma-icons';
import { FormFieldContainerProps } from '../FormFieldContainer';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { InputSize } from '../InputBase';
// import { I18nContext } from '../../i18n';

export interface CharacterCounterProps
  extends Omit<FormFieldContainerProps, 'fieldId'>,
    React.HTMLAttributes<HTMLDivElement> {
  errorStying?: boolean;
  hasError?: boolean;
  inputSize?: InputSize;
  isInverse?: boolean;
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

const StyledCharacterCounter = styled.div<CharacterCounterProps>`
  align-items: center;
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => (props.hasError ? props.theme.colors.danger : 'inherit')};
  display: flex;
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  letter-spacing: ${props => props.theme.typeScale.size02.letterSpacing};
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  margin-top: ${props =>
    props.inputSize === InputSize.large
      ? props.theme.spaceScale.spacing03
      : props.theme.spaceScale.spacing02};
  text-align: left;
  svg {
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
    inputTotal,
    maxLength,
    numberBoundary,
    testId,
    isInverse: isInverseProp,
    ...rest
  } = props;
  const theme = React.useContext(ThemeContext);
  // const i18n = React.useContext(I18nContext);

  function nameSwitches() {
    if (inputTotal < maxLength) {
      if (inputTotal === maxLength - 1) {
        return `${numberBoundary} character left`;
      } else if (numberBoundary > 1) {
        return `${numberBoundary} characters left`;
      }
    }

    if (inputTotal > maxLength) {
      if (inputTotal === maxLength + 1) {
        return `${numberBoundary} character over limit`;
      }
      return `${numberBoundary} characters over limit`;
    }

    if (inputTotal == maxLength) {
      return `0 characters left`;
    }

    if (inputTotal === 0) {
      return `${maxLength} characters allowed`;
    }
    if (maxLength === 1) {
      return `${maxLength} character allowed`;
    }
  }

  const errorStyling = inputTotal > maxLength;

  return (
    <StyledCharacterCounter
      data-testid={props.testId}
      hasError={errorStyling}
      ref={ref}
      theme={theme}
      {...rest}
    >
      {console.log(inputTotal)}
      {errorStyling && <ErrorIcon size={theme.iconSizes.small} />}
      {nameSwitches()}
    </StyledCharacterCounter>
  );
});
