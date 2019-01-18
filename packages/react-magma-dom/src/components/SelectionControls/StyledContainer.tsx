import * as React from 'react';
import { styled } from '../../theme/styled-components';

export interface ContainerProps {
  children?: any;
  style?: React.CSSProperties;
}

const StyledContainerComponent = styled<ContainerProps, 'div'>('div')`
  align-items: baseline;
  display: flex;
  flex-wrap: nowrap;
  margin: 0 0 0 10px;
`;

export const StyledContainer: React.FunctionComponent<ContainerProps> = ({
  children,
  style
}: ContainerProps) => (
  <StyledContainerComponent style={style}>{children}</StyledContainerComponent>
);
