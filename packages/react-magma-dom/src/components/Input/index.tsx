import * as React from 'react';
import { useState } from 'react';
import { useIsInverse } from '../../inverse';
import { useGenerateId } from '../../utils';
import {
  FormFieldContainer,
  FormFieldContainerBaseProps,
} from '../FormFieldContainer';
import { InputBase, InputBaseProps, InputSize } from '../InputBase';

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

    const maxLengthNum = !hasCharacterCounter && maxLength ? maxLength : undefined;

    const isInverse = useIsInverse(props.isInverse);

    const [characterLength, setCharacterLength] = useState(
      value?.toString().length
    );

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
      <FormFieldContainer
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
      >
        <InputBase
          {...other}
          aria-describedby={
            descriptionId ?? props['aria-describedby']
          }
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
      </FormFieldContainer>
    );
  }
);
