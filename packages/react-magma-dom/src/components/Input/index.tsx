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
      hasError,
      helperMessage,
      iconPosition,
      id: defaultId,
      inputSize = InputSize.medium,
      isLabelVisuallyHidden,
      labelStyle,
      labelText,
      maxLength,
      messageStyle,
      ...other
    } = props;

    const id = useGenerateId(defaultId);

    const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;

    const isInverse = useIsInverse(props.isInverse);

    const [characterLength, setCharacterLength] = useState(0);

    function handleChange(e) {
      if (maxLength) {
        setCharacterLength(e.target.value.length);
      }
    }

    function handleClear() {
      if (maxLength) {
        setCharacterLength(null);
      }
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
        inputClear={characterLength}
        inputSize={inputSize}
        inputTotal={characterLength}
        labelStyle={labelStyle}
        labelText={labelText}
        maxLength={maxLength}
        messageStyle={messageStyle}
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
          isInverse={isInverse}
          onChange={maxLength ? handleChange : props.onChange}
          onClear={maxLength ? handleClear : props.onClear}
          ref={ref}
        >
          {children}
        </InputBase>
      </FormFieldContainer>
    );
  }
);
