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
import { Stepper, StepperOrientation, StepperProps } from './Stepper';

interface ResponsibleStepperContainerProps {
  stepperContent: React.ReactNode | React.ReactNode[];
  children: React.ReactNode | React.ReactNode[];
  props: StepperProps;
}

export const ResponsibleStepperContainer: React.FC<
  ResponsibleStepperContainerProps
> = args => {
  const { children, stepperContent, props } = args;
  const { currentStep, ...rest } = props;

  if (!rest.breakpoint) {
    return (
      <Flex
        behavior={FlexBehavior.container}
        wrap={
          rest.orientation === StepperOrientation.vertical
            ? FlexWrap.nowrap
            : FlexWrap.wrap
        }
        style={{ gap: '24px' }}
      >
        <Stepper currentStep={currentStep} {...rest}>
          {stepperContent}
        </Stepper>

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
          style={{ gap: '24px' }}
        >
          <Stepper currentStep={currentStep} {...rest}>
            {stepperContent}
          </Stepper>

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
          style={{ gap: '24px' }}
        >
          <Stepper currentStep={currentStep} {...rest}>
            {stepperContent}
          </Stepper>

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
        </Flex>
      </Breakpoint>
    </BreakpointsContainer>
  );
};
