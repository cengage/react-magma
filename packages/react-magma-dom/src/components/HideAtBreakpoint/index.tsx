import * as React from 'react';

import styled from '@emotion/styled';

/**
 * @children required
 */
export interface HideAtBreakpointProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @default HideAtBreakpointDisplayType.block
   */
  displayType?: HideAtBreakpointDisplayType;
  /**
   * Maximum width at which to hide the content
   */
  maxWidth?: number;
  /**
   * Minimum width at which to hide the content
   */
  minWidth?: number;
  /**
   * @internal
   */
  testId?: string;
}

export enum HideAtBreakpointDisplayType {
  block = 'block', // default
  flex = 'flex',
  inline = 'inline',
  inlineFlex = 'inline-flex',
}

const Container = styled.div<HideAtBreakpointProps>`
  display: ${props => props.displayType};

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
  const {
    children,
    displayType = HideAtBreakpointDisplayType.block,
    minWidth,
    maxWidth,
    testId,
    ...other
  } = props;

  return (
    <Container
      {...other}
      data-testid={testId}
      displayType={displayType}
      maxWidth={maxWidth}
      minWidth={minWidth}
      ref={ref}
    >
      {children}
    </Container>
  );
});
