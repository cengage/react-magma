import * as React from 'react';
import { useState } from 'react';
import { useIsInverse } from '../../inverse';
import { useGenerateId } from '../../utils';
import {
  FormFieldContainer,
  FormFieldContainerBaseProps,
  FormFieldContainerProps,
} from '../FormFieldContainer';
import {
  getHelpIconButtonSize,
  InputBase,
  InputBaseProps,
  InputSize,
  isLeftOrHidden,
} from '../InputBase';
import { LabelPosition } from '../Label';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { Theme } from '@emotion/core';

const getLabelStyles = (
  props: FormFieldContainerProps &
    React.RefAttributes<HTMLDivElement> & { theme?: Theme } & {
      labelPosition?: LabelPosition;
      InputSize?: InputSize;
    } & { theme: Theme }
) => {
  const marginBlock = isLeftOrHidden(props)
    ? '0'
    : `0 ${props.theme.spaceScale.spacing03}`;
  const marginInline = isLeftOrHidden(props)
    ? `0 ${props.theme.spaceScale.spacing03}`
    : '0';
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

  return { marginBlock, marginInline, maxWidth, minHeight, justifyContent };
};

const StyledFormFieldContainer = styled(FormFieldContainer)<{
  labelPosition?: LabelPosition;
  InputSize?: InputSize;
}>`
  position: relative;
  align-items: start;

  label {
    ${props => {
      const { marginBlock, marginInline, maxWidth, minHeight, justifyContent } =
        getLabelStyles(props);
      return `
        margin-block: ${marginBlock};
        margin-inline: ${marginInline};
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

    const descriptionId =
      errorMessage || helperMessage || maxCount || maxLength
        ? `${id}__desc`
        : null;

    const maxCharacters = typeof maxCount === 'number' ? maxCount : maxLength;

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

    return (
      <StyledFormFieldContainer
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
          {...other}
          aria-describedby={descriptionId ?? props['aria-describedby']}
          aria-invalid={!!errorMessage}
          hasError={
            !!errorMessage ||
            (hasCharacterCounter && characterLength > maxCharacters)
          }
          iconPosition={iconPosition}
          id={id}
          inputSize={inputSize}
          inputLength={characterLength}
          isInverse={isInverse}
          maxLength={maxLengthNum}
          onChange={handleChange}
          onClear={handleClear}
          onDateChange={props.onDateChange}
          ref={ref}
          setReference={setReference}
          testId={testId}
          value={value}
          isLabelVisuallyHidden={isLabelVisuallyHidden}
          labelPosition={labelPosition}
        >
          {children}
        </InputBase>
      </StyledFormFieldContainer>
    );
  }
);
