import * as React from 'react';
import { HideAtBreakpoint } from '../HideAtBreakpoint';
import { ThemeContext } from '../../theme/ThemeContext';

export enum BreakpointScreenSize {
  xs = 'xs', //default
  small = 'small',
  medium = 'medium',
  large = 'large',
  xl = 'xl'
}

export interface BreakpointsContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  breakpoints?: object;
}

export interface BreakpointProps extends React.HTMLAttributes<HTMLDivElement> {
  screenSize?: BreakpointScreenSize;
  testId?: string;
}

export const Breakpoint: React.FunctionComponent<BreakpointProps> = ({
  children,
  screenSize,
  testId,
  ...other
}: BreakpointProps) => {
  return <div {...other}>{children}</div>;
};

function getMinWidth(
  screenSize: BreakpointScreenSize,
  breakpointValues: object,
  definedBreakpoints: any
) {
  const sizes = Object.keys(breakpointValues);

  const newSizes = sizes.slice(sizes.indexOf(screenSize) + 1);

  const nextSize = newSizes.find(newSize =>
    definedBreakpoints.includes(newSize)
  );

  return breakpointValues[nextSize];
}

export const BreakpointsContainer: React.FunctionComponent<BreakpointsContainerProps> = ({
  children,
  breakpoints,
  ...other
}: BreakpointsContainerProps) => {
  const definedBreakpoints = [];

  React.Children.forEach(children, (child: React.ReactElement) => {
    definedBreakpoints.push(child.props.screenSize);
  });

  const theme = React.useContext(ThemeContext);

  const defaultBreakpoints = theme.breakpoints;

  const breakpointValues = breakpoints ? breakpoints : defaultBreakpoints;

  return (
    <>
      {React.Children.map(children, (child: React.ReactElement) => {
        return child.props.screenSize ? (
          <HideAtBreakpoint
            {...other}
            maxWidth={breakpointValues[child.props.screenSize] - 1}
            minWidth={getMinWidth(
              child.props.screenSize,
              breakpointValues,
              definedBreakpoints
            )}
            testId={child.props.testId}
          >
            {child}
          </HideAtBreakpoint>
        ) : (
          child
        );
      })}
    </>
  );
};
