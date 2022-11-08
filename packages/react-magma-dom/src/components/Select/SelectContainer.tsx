import React from 'react';
import styled from '@emotion/styled';
import { Label, LabelPosition } from '../Label';
import { VisuallyHidden } from '../VisuallyHidden';
import { UseSelectGetLabelPropsOptions } from 'downshift';
import { InputMessage } from '../Input/InputMessage';

export const SelectContainerElement = styled.div<{
  labelPosition?: LabelPosition;
  labelWidth?: number;
}>`
  display: ${props =>
    props.labelPosition == LabelPosition.left ? 'flex' : 'block'};
  position: relative;
  label {
    flex-basis: ${props =>
      props.labelWidth && props.labelPosition === LabelPosition.left
        ? `${props.labelWidth}%`
        : ''};
  }
`;

const InputMessageContainer = styled.div`
  flex-grow: 1;
`;

interface SelectContainerInterface<T> {
  children: React.ReactNode[];
  containerStyle?: React.CSSProperties;
  errorMessage?: React.ReactNode;
  descriptionId?: string;
  getLabelProps: (options?: UseSelectGetLabelPropsOptions) => any;
  hasError?: boolean;
  helperMessage?: React.ReactNode;
  isInverse?: boolean;
  isLabelVisuallyHidden?: boolean;
  labelPosition?: LabelPosition;
  labelStyle?: React.CSSProperties;
  labelText: string;
  labelWidth?: number;
  messageStyle?: React.CSSProperties;
}

export function SelectContainer<T>(props: SelectContainerInterface<T>) {
  const {
    children,
    descriptionId,
    errorMessage,
    getLabelProps,
    helperMessage,
    isInverse,
    isLabelVisuallyHidden,
    labelPosition,
    labelStyle,
    labelText,
    labelWidth,
    messageStyle,
  } = props;

  const hasError = !!errorMessage;

  return (
    <SelectContainerElement
      labelPosition={labelPosition}
      labelWidth={labelWidth}
      data-testid="selectContainerElement"
    >
      <Label
        {...getLabelProps()}
        isInverse={isInverse}
        labelPosition={labelPosition}
        style={labelStyle}
      >
        {isLabelVisuallyHidden ? (
          <VisuallyHidden>{labelText}</VisuallyHidden>
        ) : (
          labelText
        )}
      </Label>
      <InputMessageContainer>
        {children}
        {!(
          labelPosition === LabelPosition.left &&
          !(errorMessage || helperMessage)
        ) &&
          (errorMessage || helperMessage) && (
            <InputMessage
              id={descriptionId}
              isInverse={isInverse}
              hasError={hasError}
              style={messageStyle}
            >
              {(errorMessage || helperMessage) && (
                <>{errorMessage ? errorMessage : helperMessage}</>
              )}
            </InputMessage>
          )}
      </InputMessageContainer>
    </SelectContainerElement>
  );
}
