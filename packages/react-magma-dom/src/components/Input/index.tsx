import * as React from 'react';
import { useState } from 'react';
import {
  FormFieldContainer,
  FormFieldContainerBaseProps,
} from '../FormFieldContainer';
import { InputBase, InputBaseProps, InputSize } from '../InputBase';
import { useGenerateId } from '../../utils';
import { useIsInverse } from '../../inverse';

export interface InputProps
  extends Omit<FormFieldContainerBaseProps, 'fieldId'>,
    InputBaseProps {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      children,
      containerStyle,
      errorMessage,
      helperMessage,
      iconPosition,
      id: defaultId,
      inputSize = InputSize.medium,
      isLabelVisuallyHidden,
      labelPosition,
      labelStyle,
      labelText,
      labelWidth,
      maxLength,
      messageStyle,
      testId,
      ...other
    } = props;

    const id = useGenerateId(defaultId);

    const descriptionId =
      errorMessage || helperMessage || maxLength ? `${id}__desc` : null;

    const isInverse = useIsInverse(props.isInverse);

    const [characterLength, setCharacterLength] = useState(0);

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
      <FormFieldContainer
        containerStyle={containerStyle}
        errorMessage={errorMessage}
        fieldId={id}
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
        messageStyle={messageStyle}
        testId={testId && `${testId}-formFieldContainer`}
      >
        <InputBase
          {...other}
          aria-describedby={
            descriptionId ? descriptionId : props['aria-describedby']
          }
          aria-invalid={!!errorMessage}
          hasError={!!errorMessage || characterLength > maxLength}
          iconPosition={iconPosition}
          id={id}
          inputSize={inputSize}
          inputLength={characterLength}
          isInverse={isInverse}
          onChange={handleChange}
          onClear={handleClear}
          ref={ref}
          testId={testId}
        >
          {children}
        </InputBase>
      </FormFieldContainer>
    );
  }
);
