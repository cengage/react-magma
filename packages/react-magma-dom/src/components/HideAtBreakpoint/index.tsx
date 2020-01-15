import * as React from 'react';
import styled from '@emotion/styled';

export interface HideAtBreakpointProps
  extends React.HTMLAttributes<HTMLDivElement> {
  minWidth?: number;
  maxWidth?: number;
}

const Container = styled.div<HideAtBreakpointProps>`
  display: block;

  @media (min-width: ${props => props.minWidth}px) {
    display: none;
  }

  @media (max-width: ${props => props.maxWidth}px) {
    display: none;
  }
`;

export const HideAtBreakpoint: React.FunctionComponent<
  HideAtBreakpointProps
> = React.forwardRef(
  ({ children, ...other }: HideAtBreakpointProps, ref: any) => {
    return <Container {...other}>{children}</Container>;
  }
);
