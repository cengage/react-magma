import * as React from 'react';
import { useState } from 'react';

import styled from '@emotion/styled';

import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { descriptionSuffix, omit, useGenerateId } from '../../utils';
import {
  FormFieldContainer,
  FormFieldContainerBaseProps,
  FormFieldContainerProps,
  getInputFormFieldColors,
} from '../FormFieldContainer';
import {
  getHelpIconButtonSize,
  InputBase,
  InputBaseProps,
  InputSize,
  isLeftOrHidden,
} from '../InputBase';
import { LabelPosition } from '../Label';

const getLabelStyles = (
  props: FormFieldContainerProps &
    React.RefAttributes<HTMLDivElement> & { theme?: ThemeInterface } & {
      labelPosition?: LabelPosition;
      InputSize?: InputSize;
    } & { theme: ThemeInterface }
) => {
  const maxWidth = isLeftOrHidden(props)
    ? 'auto'
    : `calc(100% - ${getHelpIconButtonSize(props)} - ${
        props.theme.spaceScale.spacing03
      })`;
  let minHeight: string;

  if (props.labelPosition === LabelPosition.left) {
    minHeight =
      props.InputSize === InputSize.large
        ? props.theme.spaceScale.spacing11
        : props.theme.spaceScale.spacing09;
  } else {
    minHeight = 'auto';
  }
  const justifyContent = isLeftOrHidden(props) ? 'end' : 'start';

  return { maxWidth, minHeight, justifyContent };
};

const StyledFormFieldContainer = styled(FormFieldContainer)<{
  labelPosition?: LabelPosition;
  InputSize?: InputSize;
}>`
  position: relative;
  align-items: start;

  label {
    ${props => {
      const { maxWidth, minHeight, justifyContent } = getLabelStyles(props);

      return `
        max-width: ${maxWidth};
        min-height: ${minHeight};
        justify-content: ${justifyContent};
      `;
    }}
    display: flex;
    align-items: center;
  }
`;

export interface InputProps
  extends Omit<FormFieldContainerBaseProps, 'fieldId'>,
    InputBaseProps {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      children,
      containerStyle,
      errorMessage,
      hasCharacterCounter = true,
      helperMessage,
      iconPosition,
      id: defaultId,
      inputSize = InputSize.medium,
      isLabelVisuallyHidden,
      labelPosition,
      labelStyle,
      labelText,
      labelWidth,
      maxCount,
      maxLength,
      messageStyle,
      testId,
      value,
      setReference,
      ...other
    } = props;

    const id = useGenerateId(defaultId);

    const maxCharacters = typeof maxCount === 'number' ? maxCount : maxLength;
    const counterDescriptionId =
      typeof maxCharacters === 'number' && hasCharacterCounter
        ? `${id}__counter`
        : null;
    const messageDescriptionId =
      errorMessage || helperMessage ? `${id}${descriptionSuffix}` : null;
    const descriptionId =
      [counterDescriptionId, messageDescriptionId].filter(Boolean).join(' ') ||
      null;

    const maxLengthNum =
      !hasCharacterCounter && maxLength ? maxLength : undefined;

    const isInverse = useIsInverse(props.isInverse);

    const [characterLength, setCharacterLength] = useState(
      value?.toString().length
    );

    const theme = React.useContext(ThemeContext);

    React.useEffect(() => {
      setCharacterLength(value?.toString().length);
    }, [value]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      props.onChange &&
        typeof props.onChange === 'function' &&
        props.onChange(event);
      setCharacterLength(event.target.value.length);
    }

    function handleClear() {
      props.onClear && typeof props.onClear === 'function' && props.onClear();
      setCharacterLength(0);
    }

    const validInputBaseProps = omit(
      [
        'onDateChange',
        'onInputChange',
        'onInputBlur',
        'onInputFocus',
        'onClear',
      ],
      other
    );

    return (
      <StyledFormFieldContainer
        {...getInputFormFieldColors(theme, isInverse)}
        containerStyle={containerStyle}
        errorMessage={errorMessage}
        fieldId={id}
        hasCharacterCounter={hasCharacterCounter}
        helperMessage={helperMessage}
        iconPosition={iconPosition}
        isLabelVisuallyHidden={isLabelVisuallyHidden}
        isInverse={isInverse}
        inputSize={inputSize}
        inputLength={characterLength}
        labelPosition={labelPosition}
        labelStyle={labelStyle}
        labelText={labelText}
        labelWidth={labelWidth}
        maxLength={maxLength}
        maxCount={maxCount}
        messageStyle={messageStyle}
        testId={testId && `${testId}-formFieldContainer`}
        theme={theme}
        InputSize={inputSize}
      >
        <InputBase
          {...validInputBaseProps}
          backgroundColor={isInverse ? theme.colors.neutral1150 : undefined}
          borderColor={
            isInverse ? theme.colors.neutral700 : theme.colors.neutral500
          }
          errorBorderColor={isInverse ? theme.colors.red500 : undefined}
          disabledBackgroundColor={
            isInverse ? theme.colors.neutral1100 : undefined
          }
          disabledBorderColor={isInverse ? theme.colors.neutral900 : undefined}
          disabledIconColor={
            isInverse ? theme.colors.neutral700 : theme.colors.neutral500
          }
          disabledPlaceholderColor={
            isInverse ? theme.colors.neutral700 : theme.colors.neutral500
          }
          disabledTextColor={
            isInverse ? theme.colors.neutral700 : theme.colors.neutral500
          }
          aria-describedby={
            descriptionId ? descriptionId : props['aria-describedby']
          }
          aria-invalid={!!errorMessage}
          hasError={
            !!errorMessage ||
            (hasCharacterCounter && characterLength > maxCharacters)
          }
          iconPosition={iconPosition}
          iconColor={theme.colors.neutral600}
          id={id}
          inputSize={inputSize}
          inputLength={characterLength}
          isInverse={isInverse}
          maxLength={maxLengthNum}
          placeholderColor={
            isInverse ? theme.colors.neutral500 : theme.colors.neutral700
          }
          onChange={handleChange}
          onClear={handleClear}
          onDateChange={props.onDateChange}
          ref={ref}
          setReference={setReference}
          testId={testId}
          value={value}
          textColor={isInverse ? undefined : theme.colors.brand.navy}
          isLabelVisuallyHidden={isLabelVisuallyHidden}
          labelPosition={labelPosition}
        >
          {children}
        </InputBase>
      </StyledFormFieldContainer>
    );
  }
);
