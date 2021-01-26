import React from 'react';
import styled from '@emotion/styled';
import { Label, LabelPosition } from '../Label';
import { HiddenLabelText } from '../Input/index';
import { UseSelectGetLabelPropsOptions } from 'downshift';

export const SelectContainerElement = styled.div<{
  labelPosition?: LabelPosition;
}>`
  position: relative;

  align-items: center;
  display: ${props =>
    props.labelPosition == LabelPosition.left ? 'flex' : 'block'};

  label {
    white-space: nowrap;
    margin-bottom: 0;
    margin-right: 16px;
  }
`;

interface SelectContainerInterface<T> {
  children: React.ReactNode[];
  containerStyle?: React.CSSProperties;
  getLabelProps: (options?: UseSelectGetLabelPropsOptions) => any;
  hasError?: boolean;
  isInverse?: boolean;
  isLabelVisuallyHidden?: boolean;
  labelPosition?: LabelPosition;
  labelStyle?: React.CSSProperties;
  labelText: string;
}

export function SelectContainer<T>(props: SelectContainerInterface<T>) {
  const {
    children,
    getLabelProps,
    isInverse,
    isLabelVisuallyHidden,
    labelPosition,
    labelStyle,
    labelText,
  } = props;
  return (
    <SelectContainerElement labelPosition={labelPosition}>
      <Label {...getLabelProps()} isInverse={isInverse} style={labelStyle}>
        {isLabelVisuallyHidden ? (
          <HiddenLabelText>{labelText}</HiddenLabelText>
        ) : (
          labelText
        )}{' '}
      </Label>
      {children}
    </SelectContainerElement>
  );
}
