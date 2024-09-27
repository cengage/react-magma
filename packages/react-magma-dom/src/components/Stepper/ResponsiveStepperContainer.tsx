import React from 'react';
import {
  Breakpoint,
  BreakpointsContainer,
  BreakpointScreenSize,
} from '../BreakpointsContainer';
import {
  Flex,
  FlexAlignItems,
  FlexBehavior,
  FlexDirection,
  FlexJustify,
  FlexWrap,
} from '../Flex';
import {
  Stepper,
  StepperLayout,
  StepperOrientation,
  StepperProps,
} from './Stepper';

export interface ResponsiveStepperContainerProps extends StepperProps {
  children?: React.ReactNode | React.ReactNode[];
  steps: React.ReactNode | React.ReactNode[];
  currentStep: number;
}

export const ResponsiveStepperContainer: React.FunctionComponent<
  ResponsiveStepperContainerProps
> = props => {
  const { children, steps, currentStep, ...rest } = props;

  if (!rest.breakpoint) {
    return (
      <Flex
        behavior={FlexBehavior.container}
        wrap={
          rest.orientation === StepperOrientation.vertical
            ? FlexWrap.nowrap
            : FlexWrap.wrap
        }
        style={{
          gap: '24px',
          whiteSpace:
            rest.orientation === StepperOrientation.vertical
              ? 'nowrap'
              : 'normal',
          minWidth:
            rest.orientation === StepperOrientation.horizontal &&
            rest.layout !== StepperLayout.showLabels &&
            '25em',
        }}
      >
        <Stepper currentStep={currentStep} {...rest}>
          {steps}
        </Stepper>

        {children && (
          <Flex
            behavior={FlexBehavior.container}
            alignItems={
              rest.orientation === StepperOrientation.vertical
                ? FlexAlignItems.stretch
                : FlexAlignItems.center
            }
            justify={FlexJustify.spaceBetween}
            direction={FlexDirection.column}
          >
            {children}
          </Flex>
        )}
      </Flex>
    );
  }

  return (
    <BreakpointsContainer breakpoints={{ medium: rest.breakpoint }}>
      <Breakpoint screenSize={BreakpointScreenSize.xs}>
        <Flex
          behavior={FlexBehavior.container}
          wrap={
            rest.breakpointOrientation === StepperOrientation.vertical
              ? FlexWrap.nowrap
              : FlexWrap.wrap
          }
          style={{
            gap: '24px',
            whiteSpace:
              rest.breakpointOrientation === StepperOrientation.vertical
                ? 'nowrap'
                : 'normal',
            minWidth:
              rest.breakpointOrientation === StepperOrientation.horizontal &&
              rest.breakpointLayout !== StepperLayout.showLabels &&
              '25em',
          }}
        >
          <Stepper currentStep={currentStep} {...rest}>
            {steps}
          </Stepper>

          {children && (
            <Flex
              behavior={FlexBehavior.container}
              alignItems={
                rest.breakpointOrientation === StepperOrientation.vertical
                  ? FlexAlignItems.stretch
                  : FlexAlignItems.center
              }
              justify={FlexJustify.spaceBetween}
              direction={FlexDirection.column}
            >
              {children}
            </Flex>
          )}
        </Flex>
      </Breakpoint>
      <Breakpoint screenSize={BreakpointScreenSize.medium}>
        <Flex
          behavior={FlexBehavior.container}
          wrap={
            rest.orientation === StepperOrientation.vertical
              ? FlexWrap.nowrap
              : FlexWrap.wrap
          }
          style={{
            gap: '24px',
            whiteSpace:
              rest.orientation === StepperOrientation.vertical
                ? 'nowrap'
                : 'normal',
            minWidth:
              rest.orientation === StepperOrientation.horizontal &&
              rest.layout !== StepperLayout.showLabels &&
              '25em',
          }}
        >
          <Stepper currentStep={currentStep} {...rest}>
            {steps}
          </Stepper>

          {children && (
            <Flex
              behavior={FlexBehavior.container}
              alignItems={
                rest.orientation === StepperOrientation.vertical
                  ? FlexAlignItems.stretch
                  : FlexAlignItems.center
              }
              justify={FlexJustify.spaceBetween}
              direction={FlexDirection.column}
            >
              {!!children && children}
            </Flex>
          )}
        </Flex>
      </Breakpoint>
    </BreakpointsContainer>
  );
};
