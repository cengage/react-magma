import * as React from 'react';
import styled from '@emotion/styled';
import { useMediaQuery } from '../utils';

export enum HideAtBreakpointImplementation {
  css = 'css',
  js = 'js' //default
}

export interface HideAtBreakpointProps
  extends React.HTMLAttributes<HTMLDivElement> {
  implementation?: HideAtBreakpointImplementation;
  minWidth?: number;
  maxWidth?: number;
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

function matchesMediaQuery(minWidth?: number, maxWidth?: number) {
  if (minWidth && maxWidth) {
    return useMediaQuery(
      `(min-width:${minWidth}px), (max-width:${maxWidth}px)`
    );
  } else if (minWidth) {
    return useMediaQuery(`(min-width:${minWidth}px)`);
  } else if (maxWidth) {
    return useMediaQuery(`(max-width:${maxWidth}px)`);
  } else return false;
}

export const HideAtBreakpoint: React.FunctionComponent<
  HideAtBreakpointProps
> = ({
  children,
  implementation,
  minWidth,
  maxWidth,
  testId,
  ...other
}: HideAtBreakpointProps) => {
  if (implementation === 'css') {
    return (
      <Container
        {...other}
        data-testId={testId}
        maxWidth={maxWidth}
        minWidth={minWidth}
      >
        {children}
      </Container>
    );
  }
  return matchesMediaQuery(minWidth, maxWidth) ? null : <>{children}</>;
};
