import React from 'react';
import styled from '@emotion/styled';
import { Label } from '../Label';
import { HiddenLabelText } from '../Input/index';
import { UseSelectGetLabelPropsOptions } from 'downshift';

export const SelectContainerElement = styled.div`
  position: relative;
`;

interface SelectContainerInterface<T> {
  children: React.ReactNode[];
  containerStyle?: React.CSSProperties;
  getLabelProps: (options?: UseSelectGetLabelPropsOptions) => any;
  hasError?: boolean;
  isInverse?: boolean;
  isLabelVisuallyHidden?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: string;
}

export function SelectContainer<T>(props: SelectContainerInterface<T>) {
  const {
    children,
    getLabelProps,
    isInverse,
    isLabelVisuallyHidden,
    labelStyle,
    labelText,
  } = props;
  return (
    <SelectContainerElement>
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
