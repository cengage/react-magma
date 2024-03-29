import * as React from 'react';
import styled from '../../theme/styled';

export interface StyledContainerProps {
  children?: any;
  style?: React.CSSProperties;
}

const StyledContainerComponent = styled('div')<StyledContainerProps>`
  align-items: baseline;
  display: flex;
  flex-wrap: nowrap;
  position: relative;
`;

export const StyledContainer: React.FunctionComponent<StyledContainerProps> = ({
  children,
  style,
}: StyledContainerProps) => (
  <StyledContainerComponent style={style}>{children}</StyledContainerComponent>
);
