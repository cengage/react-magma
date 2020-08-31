import * as React from 'react';
import styled from '@emotion/styled';

export interface ContainerProps {
  children?: any;
  style?: React.CSSProperties;
}

const StyledContainerComponent = styled.div<ContainerProps>`
  align-items: baseline;
  display: flex;
  flex-wrap: nowrap;
  margin: 0 0 0 10px;
  position: relative;
`;

export const StyledContainer: React.FunctionComponent<ContainerProps> = ({
  children,
  style
}: ContainerProps) => (
  <StyledContainerComponent style={style}>{children}</StyledContainerComponent>
);
