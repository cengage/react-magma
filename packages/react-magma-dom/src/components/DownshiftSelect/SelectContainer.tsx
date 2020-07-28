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
  labelText: string;
}

export function DownshiftSelectContainer<T>(
  props: DownshiftSelectContainer<T>
) {
  const { children, getLabelProps, labelText } = props;
  return (
    <SelectContainer>
      <Label {...getLabelProps()}>{labelText}</Label>
      {children}
    </SelectContainer>
  );
}
