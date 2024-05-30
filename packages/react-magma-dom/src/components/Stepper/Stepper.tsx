import * as React from 'react';
import styled from '@emotion/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { Step, StepProps, StepStatus } from './Step';
import { transparentize } from 'polished';

/**
 * @children required
 */
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
  /*
   * Custom number for specific breakpoint responsive styling
   */
  breakpoint?: number;
  breakpointStyle?: BreakPointStyle;
  stepDescriptionLabel?: string;
  completedStepDescription?: string;
  /*
   * Current step value
   */
  currentStep?: number;
  /*
   * Index of total steps
   */
  index?: number;
  isInverse?: boolean;
  isLabelVisuallyHidden?: boolean;
  isSummaryView?: boolean;
  /**
   * @internal
   */
  stepStatus?: StepStatus;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export enum BreakPointStyle {
  noLabels = 'noLabels',
  summary = 'summary',
}

function StepSeparatorBackgroundColors(props: StepperProps) {
  if (props.isInverse) {
    if (props.stepStatus === 'complete') {
      return props.theme.colors.tertiary500;
    }
    return props.theme.colors.primary400;
  } else {
    if (props.stepStatus === 'complete') {
      return props.theme.colors.primary500;
    }
    return props.theme.colors.neutral300;
  }
}

const StyledStepper = styled.div<StepperProps>`
  display: flex;
  padding: 0 40px;
`;

const StyledSeparator = styled.div<StepperProps>`
  background: ${StepSeparatorBackgroundColors};
  width: 100%;
  height: 2px;
  top: 12px;
  position: relative;
  align-self: baseline;
  transition: all 0.4s ease;
`;

const StyledSummary = styled.div<StepperProps>`
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  top: 14px;
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  color: ${props =>
    props.isInverse
      ? transparentize(0.3, props.theme.colors.neutral100)
      : props.theme.colors.neutral500};
  span {
    display: flex;
    text-align: left;
  }
`;

// Stepper!
export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (props, ref) => {
    const {
      breakpoint,
      breakpointStyle,
      children,
      currentStep,
      stepDescriptionLabel,
      index,
      isInverse: isInverseProp,
      isLabelVisuallyHidden,
      isSummaryView,
      testId,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    const [breakPointNoLabel, setBreakPointNoLabel] = React.useState(false);
    const [breakPointSummary, setBreakPointSummary] = React.useState(false);

    const breakpointSize = breakpoint && breakpoint > window.innerWidth;

    React.useEffect(() => {
      if (breakpointSize && breakpointStyle === 'noLabels') {
        setBreakPointNoLabel(true);
      } else if (breakpointSize && breakpointStyle === 'summary') {
        setBreakPointSummary(true);
      }
    });

    const steps = React.Children.toArray(children);

    // Step states
    const Steps = React.Children.map(
      children,
      (
        child: React.ReactElement<React.PropsWithChildren<StepProps>>,
        index
      ) => {
        if (child.type === Step) {
          const stepStatusStyles =
            currentStep >= index + 1
              ? StepStatus.complete
              : currentStep >= index
              ? StepStatus.active
              : StepStatus.incomplete;

          const item = React.cloneElement(child, {
            breakpointStyle,
            eachStep: index + 1,
            key: index,
            index: steps.length,
            isInverse: isInverse,
            isLabelVisuallyHidden: breakPointNoLabel
              ? true
              : isLabelVisuallyHidden,
            isSummaryView,
            stepStatus: stepStatusStyles,
          });

          return (
            <>
              {item}
              {index !== steps.length - 1 && (
                <StyledSeparator
                  isInverse={isInverse}
                  stepStatus={stepStatusStyles}
                  theme={theme}
                />
              )}
            </>
          );
        }
      }
    );

    // When isSummaryView is set to true, this shows one step label and description at a time based on the active step below the Stepper component.
    const StepLabels = React.Children.map(children, (child, index) => {
      const item = child as React.ReactElement<
        React.PropsWithChildren<StepProps>
      >;
      if (item.type === Step && currentStep >= index && currentStep <= index) {
        return child;
      } else if (
        // Retains last Step label and description
        item.type === Step &&
        currentStep >= +Steps.length &&
        currentStep <= index + 1
      ) {
        return child;
      }
    });

    // Final step description
    const completedStepDescription = props.completedStepDescription
      ? props.completedStepDescription
      : 'Steps Completed';

    // Shows both the step count out of total steps and the step label, allows for customization of the step title.
    const stepSummary = (
      <StyledSummary isInverse={isInverse} theme={theme}>
        <span>
          {currentStep < steps.length
            ? stepDescriptionLabel
              ? `${stepDescriptionLabel} ${currentStep + 1} of ${steps.length}`
              : `Step 
          ${currentStep + 1} of ${steps.length}`
            : completedStepDescription}
        </span>
        <span>{StepLabels}</span>
      </StyledSummary>
    );

    return (
      <>
        <StyledStepper
          breakpoint={breakpoint}
          breakpointStyle={breakpointStyle}
          currentStep={currentStep}
          stepDescriptionLabel={stepDescriptionLabel}
          data-testid={props.testId}
          isInverse={isInverse}
          ref={ref}
          theme={theme}
          {...rest}
        >
          {Steps}
        </StyledStepper>
        {isSummaryView && !breakPointNoLabel && !isLabelVisuallyHidden && (
          <>{stepSummary}</>
        )}
      </>
    );
  }
);
