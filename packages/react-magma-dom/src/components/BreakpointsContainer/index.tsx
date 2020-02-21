import * as React from 'react';
import { HideAtBreakpoint } from '../HideAtBreakpoint';

export interface BreakpointsContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  breakpoints?: object;
}

export interface BreakpointProps extends React.HTMLAttributes<HTMLDivElement> {
  breakpoints?: object;
  size?: string;
}

export const Breakpoint: React.FunctionComponent<BreakpointsContainerProps> = ({
  children,
  ...other
}: BreakpointsContainerProps) => {
  return <div {...other}>{children}</div>;
};

function getMinWidth(size, breakpoints) {
  switch (size) {
    case 'xs':
      return breakpoints.small;
    case 'small':
      return breakpoints.medium;
    case 'medium':
      return breakpoints.large;
    case 'large':
      return null;
    default:
      return breakpoints.small;
  }
}

function getMaxWidth(size, breakpoints) {
  switch (size) {
    case 'xs':
      return null;
    case 'small':
      return breakpoints.small - 1;
    case 'medium':
      return breakpoints.medium - 1;
    case 'large':
      return breakpoints.large - 1;
    default:
      return null;
  }
}

export const BreakpointsContainer: React.FunctionComponent<
  BreakpointsContainerProps
> = ({ children, breakpoints, ...other }: BreakpointsContainerProps) => {
  // let sizes = [];

  // React.Children.map(children, (child: React.ReactElement) => {
  //   sizes.push(child.props.size);
  // });

  const defaultBreakpoints = {
    xs: 0,
    small: 600,
    medium: 960,
    large: 1280
  };

  return (
    <div {...other}>
      {React.Children.map(children, (child: React.ReactElement) => {
        return child.props.size ? (
          <HideAtBreakpoint
            maxWidth={getMaxWidth(
              child.props.size,
              breakpoints ? breakpoints : defaultBreakpoints
            )}
            minWidth={getMinWidth(
              child.props.size,
              breakpoints ? breakpoints : defaultBreakpoints
            )}
          >
            {child}
          </HideAtBreakpoint>
        ) : (
          child
        );
      })}
    </div>
  );
};
