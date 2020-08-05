import React from 'react';
import styled from '@emotion/styled';
import { Label } from '../Label';
import { UseSelectGetLabelPropsOptions } from 'downshift';

export const SelectContainer = styled.div`
  position: relative;
`;

interface DownshiftSelectContainer<T> {
  children: React.ReactNode[];
  getLabelProps: (options?: UseSelectGetLabelPropsOptions) => any;
  hasError?: boolean;
  isInverse?: boolean;
  labelText: string;
}

export function DownshiftSelectContainer<T>(
  props: DownshiftSelectContainer<T>
) {
  const { children, getLabelProps, isInverse, labelText } = props;
  return (
    <SelectContainer>
      <Label {...getLabelProps()} isInverse={isInverse}>
        {labelText}
      </Label>
      {children}
    </SelectContainer>
  );
}
