import * as React from 'react';
import styled from '../../theme/styled-components';
import { magma } from '../../theme/magma';

export interface LabelProps {
  children?: any;
  htmlFor: string;
  inverse?: boolean;
  style?: React.CSSProperties;
}

const StyledLabelComponent = styled<LabelProps, 'label'>('label')`
  align-items: flex-start;
  color: ${props => (props.inverse ? magma.colors.neutral08 : 'inherit')};
  display: flex;
  margin: 0;
  padding: 10px;
`;

export const StyledLabel: React.FunctionComponent<LabelProps> = ({
  children,
  htmlFor,
  inverse,
  style
}: LabelProps) => (
  <StyledLabelComponent htmlFor={htmlFor} inverse={inverse} style={style}>
    {children}
  </StyledLabelComponent>
);
