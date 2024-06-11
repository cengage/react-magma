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
  /*
   * Determines the Stepper view based on a minimum breakpoint number.
   */
  breakpointStyle?: BreakPointStyle;
  /*
   * Sets a custom label for the Step count # of #.
   */
  stepDescriptionLabel?: string;
  /*
   * Sets a custom label for the completed Step.
   */
  completedStepDescription?: string;
  /*
   * Current step value
   */
  currentStep?: number;
  /**
   * @internal
   */
  hasBreakpoint?: boolean;
  /*
   * Inverse styling
   */
  isInverse?: boolean;
  /*
   * Hides the Step labels
   */
  hideLabels?: boolean;
  /*
   * Changes from Step labels on each Step to one label at a time.
   */
  summaryView?: boolean;
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
  hideLabels = 'hideLabels',
  summaryView = 'summaryView',
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
  flex: 1;
  flex-direction: column;
  padding: ${props =>
    props.summaryView ||
    props.hideLabels ||
    (props.hasBreakpoint && BreakPointStyle.summaryView) ||
    (props.hasBreakpoint && BreakPointStyle.hideLabels)
      ? ''
      : '0 40px'};
`;

const StyledStepContent = styled.div<StepperProps>`
  display: flex;
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
  top: 14px;
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  color: ${props =>
    props.isInverse
      ? transparentize(0.3, props.theme.colors.neutral100)
      : props.theme.colors.neutral500};
  div > div {
    margin: 4px 0 0 0;
  }
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
      isInverse: isInverseProp,
      hideLabels,
      summaryView,
      testId,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    let [breakPointHideLabels, setBreakPointHideLabels] = React.useState(false);
    let [breakPointSummaryView, setBreakPointSummaryView] =
      React.useState(false);

    // Breakpoint states when a specific breakpoint number is set, then a breakpointStyle which results in the removal of all text or the summary view.
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    const hasBreakpoint = breakpoint > windowWidth;
    const beyondBreakpoint = breakpoint < windowWidth;

    React.useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth);
      }
      window.addEventListener('resize', handleResize);
      handleResize();

      if (hasBreakpoint && breakpointStyle === BreakPointStyle.summaryView) {
        setBreakPointSummaryView(true);
      } else if (
        hasBreakpoint &&
        breakpointStyle === BreakPointStyle.hideLabels
      ) {
        setBreakPointHideLabels(true);
      } else if (
        (beyondBreakpoint && breakpointStyle === BreakPointStyle.hideLabels) ||
        (beyondBreakpoint && BreakPointStyle.summaryView)
      ) {
        setBreakPointSummaryView(false);
        setBreakPointHideLabels(false);
      }

      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Sets aria-current based on the active step, else false.
    const ariaCurrent = index => {
      if (currentStep === index) {
        return true;
      }
      return false;
    };

    // Step states
    const steps = React.Children.toArray(children);

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
            'aria-current': ariaCurrent(index),
            children: currentStep === index ? child : null,
            key: index,
            isInverse: isInverse,
            hideLabels: breakPointHideLabels ? true : hideLabels,
            summaryView: summaryView || breakPointSummaryView,
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

    // When summaryView is set to true, this shows one step label and description at a time based on the active step below the Stepper component.

    const StepLabels = React.Children.map(
      children,
      (
        child: React.ReactElement<React.PropsWithChildren<StepProps>>,
        index
      ) => {
        const item = child as React.ReactElement<
          React.PropsWithChildren<StepProps>
        >;

        if (
          item.type === Step &&
          currentStep >= index &&
          currentStep <= index
        ) {
          return child;
        } else if (
          // Retains last Step label and description
          item.type === Step &&
          currentStep >= +Steps.length &&
          currentStep <= index + 1
        ) {
          return child;
        }
      }
    );

    // Final step description
    const completedStepDescription = props.completedStepDescription
      ? props.completedStepDescription
      : 'Steps Completed';

    // Shows both the step count out of total steps and the step label, allows for customization of the step title.
    const stepSummary = (
      <StyledSummary
        data-testid="stepper summary"
        isInverse={isInverse}
        summaryView={summaryView}
        theme={theme}
      >
        {currentStep < steps.length
          ? stepDescriptionLabel
            ? `${stepDescriptionLabel} ${currentStep + 1} of ${steps.length}`
            : `Step 
          ${currentStep + 1} of ${steps.length}`
          : completedStepDescription}
        {StepLabels}
      </StyledSummary>
    );

    // Shows summary view via the summaryView prop or the breakpointStyle of BreakPointStyle.summaryView
    function isSummaryView() {
      if (
        (summaryView && !breakPointHideLabels && !hideLabels) ||
        breakPointSummaryView
      ) {
        return stepSummary;
      }
    }

    return (
      <>
        <StyledStepper
          breakpoint={breakpoint}
          breakpointStyle={breakpointStyle}
          hasBreakpoint={hasBreakpoint}
          currentStep={currentStep}
          stepDescriptionLabel={stepDescriptionLabel}
          data-testid={props.testId}
          hideLabels={hideLabels}
          summaryView={summaryView}
          isInverse={isInverse}
          ref={ref}
          theme={theme}
          {...rest}
        >
          <StyledStepContent>{Steps}</StyledStepContent>
          <StyledStepContent>{isSummaryView()}</StyledStepContent>
        </StyledStepper>
      </>
    );
  }
);
