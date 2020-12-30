import * as React from 'react';
import styled from '@emotion/styled';

/**
 * @children required
 */
export interface HideAtBreakpointProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width at which to hide the content
   */
  maxWidth?: number;
  /**
   * Minimum width at which to hide the content
   */
  minWidth?: number;
  testId?: string;
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

export const HideAtBreakpoint = React.forwardRef<
  HTMLDivElement,
  HideAtBreakpointProps
>((props, ref) => {
  const { children, minWidth, maxWidth, testId, ...other } = props;

  return (
    <Container
      {...other}
      data-testid={testId}
      maxWidth={maxWidth}
      minWidth={minWidth}
      ref={ref}
    >
      {children}
    </Container>
  );
});
