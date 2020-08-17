import React from 'react';
import styled from '@emotion/styled';
import { Label } from '../Label';
import { HiddenLabelText } from '../Input/index';
import { UseSelectGetLabelPropsOptions } from 'downshift';

export const SelectContainer = styled.div`
  position: relative;
`;

interface DownshiftSelectContainer<T> {
  children: React.ReactNode[];
  containerStyle?: React.CSSProperties;
  getLabelProps: (options?: UseSelectGetLabelPropsOptions) => any;
  hasError?: boolean;
  isInverse?: boolean;
  isLabelVisuallyHidden?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: string;
}

export function DownshiftSelectContainer<T>(
  props: DownshiftSelectContainer<T>
) {
  const {
    children,
    getLabelProps,
    isInverse,
    isLabelVisuallyHidden,
    labelStyle,
    labelText
  } = props;
  return (
    <SelectContainer>
      <Label {...getLabelProps()} isInverse={isInverse} style={labelStyle}>
        {isLabelVisuallyHidden ? (
          <HiddenLabelText>{labelText}</HiddenLabelText>
        ) : (
          labelText
        )}{' '}
      </Label>
      {children}
    </SelectContainer>
  );
}
