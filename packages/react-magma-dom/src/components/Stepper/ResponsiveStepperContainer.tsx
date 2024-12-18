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
import { magma } from '../../theme/magma';

export interface ResponsiveStepperContainerProps
  extends Omit<StepperProps, 'currentStep'> {
  /**
   * @children
   */
  children?: React.ReactNode;
  /**
   * Steps of the Stepper.
   */
  steps: React.ReactNode[];
  /**
   * Current step value.
   */
  currentStep: number;
}

export const ResponsiveStepperContainer: React.FunctionComponent<
  ResponsiveStepperContainerProps
> = props => {
  const { children, steps, currentStep, ...rest } = props;
  const {
    breakpoint,
    orientation,
    layout,
    breakpointOrientation,
    breakpointLayout,
  } = rest;

  if (!breakpoint) {
    return (
      <Flex
        behavior={FlexBehavior.container}
        wrap={
          orientation === StepperOrientation.vertical
            ? FlexWrap.nowrap
            : FlexWrap.wrap
        }
        style={{
          gap: magma.spaceScale.spacing06,
          minWidth:
            orientation === StepperOrientation.horizontal &&
            layout !== StepperLayout.showLabels &&
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
              orientation === StepperOrientation.vertical
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
    <BreakpointsContainer breakpoints={{ medium: breakpoint }}>
      <Breakpoint screenSize={BreakpointScreenSize.xs}>
        <Flex
          behavior={FlexBehavior.container}
          wrap={
            breakpointOrientation === StepperOrientation.vertical
              ? FlexWrap.nowrap
              : FlexWrap.wrap
          }
          style={{
            gap: magma.spaceScale.spacing06,
            minWidth:
              breakpointOrientation === StepperOrientation.horizontal &&
              breakpointLayout !== StepperLayout.showLabels &&
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
                breakpointOrientation === StepperOrientation.vertical
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
            orientation === StepperOrientation.vertical
              ? FlexWrap.nowrap
              : FlexWrap.wrap
          }
          style={{
            gap: magma.spaceScale.spacing06,
            minWidth:
              orientation === StepperOrientation.horizontal &&
              layout !== StepperLayout.showLabels &&
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
                orientation === StepperOrientation.vertical
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