import * as React from 'react';

import styled from '@emotion/styled';

export interface StyledContainerProps {
  additionalContent?: boolean;
  children?: any;
  style?: React.CSSProperties;
}

const StyledContainerComponent = styled.div<StyledContainerProps>`
  align-items: baseline;
  display: flex;
  flex-direction: ${props => (props.additionalContent ? 'column' : 'row')};
  flex-wrap: nowrap;
  position: relative;
  width: 100%;
`;

export const StyledContainer: React.FunctionComponent<StyledContainerProps> = ({
  additionalContent,
  children,
  style,
}: StyledContainerProps) => (
  <StyledContainerComponent additionalContent={additionalContent} style={style}>
    {children}
  </StyledContainerComponent>
);
