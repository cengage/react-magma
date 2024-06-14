import * as React from 'react';
import styled from '@emotion/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { Step, StepProps, StepStatus } from './Step';
import { transparentize } from 'polished';
import { I18nContext } from '../../i18n';

/**
 * @children required
 */
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @internal
   */
  testId?: string;
  /*
   * Custom number for specific breakpoint responsive styling
   */
  breakpoint?: number;
  /*
   * Changes the Stepper view for responsive layouts, needs a minimum 'breakpoint' number.
   */
  breakpointLayout?: StepperLayout;
  /*
   * Changes the Stepper view.
   */
  layout?: StepperLayout;
  /*
   * Sets a custom label for the Step count # of #.
   */
  customStepLabel?: string;
  /*
   * Sets a custom label for the completed Step.
   */
  completionLabel?: string;
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
  /**
   * @internal
   */
  showLabelsLayout?: boolean;
  /**
   * @internal
   */
  stepStatus?: StepStatus;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export enum StepperLayout {
  showLabels = 'showLabels', //default
  hideLabels = 'hideLabels',
  summaryView = 'summaryView',
}

function stepSeparatorBackgroundColors(props: StepperProps) {
  const { isInverse, theme, stepStatus } = props;
  if (isInverse) {
    if (stepStatus === StepStatus.complete) {
      return theme.colors.tertiary500;
    }
    return theme.colors.primary400;
  } else {
    if (stepStatus === StepStatus.complete) {
      return theme.colors.primary500;
    }
    return theme.colors.neutral300;
  }
}

const StyledStepper = styled.div<StepperProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StyledStepContent = styled.div<StepperProps>`
  display: flex;
  padding: ${props => (props.showLabelsLayout ? '0 40px' : '')};
`;

const StyledSeparator = styled.div<StepperProps>`
  background: ${stepSeparatorBackgroundColors};
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
  font-size: ${props =>
    props.theme.typographyVisualStyles.bodySmall.desktop.fontSize};
  letter-spacing: ${props =>
    props.theme.typographyVisualStyles.bodySmall.desktop.letterSpacing};
  line-height: ${props =>
    props.theme.typographyVisualStyles.bodySmall.desktop.lineHeight};
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
      breakpointLayout,
      children,
      currentStep,
      layout = StepperLayout.showLabels,
      customStepLabel,
      isInverse: isInverseProp,
      testId,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const i18n = React.useContext(I18nContext);
    const isInverse = useIsInverse(isInverseProp);

    // Controls the varying layouts with a set breakpoint number between a breakpointLayout type and / or a layout type.

    let [showLabelsLayout, setShowLabelsLayout] = React.useState(false);
    let [hideLabelsLayout, setHideLabelsLayout] = React.useState(false);
    let [summaryViewLayout, setSummaryViewLayout] = React.useState(false);

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth < breakpoint && breakpoint) {
          if (layout === StepperLayout.showLabels) {
            setShowLabelsLayout(false);
          } else if (layout === StepperLayout.hideLabels) {
            setHideLabelsLayout(false);
          } else if (layout === StepperLayout.summaryView) {
            setSummaryViewLayout(false);
          }
          if (breakpointLayout === StepperLayout.showLabels) {
            setShowLabelsLayout(true);
          } else if (breakpointLayout === StepperLayout.hideLabels) {
            setHideLabelsLayout(true);
          } else if (breakpointLayout === StepperLayout.summaryView) {
            setSummaryViewLayout(true);
          }
        }
        if (window.innerWidth > breakpoint || !breakpoint) {
          if (breakpointLayout === StepperLayout.showLabels) {
            setShowLabelsLayout(false);
          } else if (breakpointLayout === StepperLayout.hideLabels) {
            setHideLabelsLayout(false);
          } else if (breakpointLayout === StepperLayout.summaryView) {
            setSummaryViewLayout(false);
          }
          if (layout === StepperLayout.showLabels) {
            setShowLabelsLayout(true);
          } else if (layout === StepperLayout.hideLabels) {
            setHideLabelsLayout(true);
          } else if (layout === StepperLayout.summaryView) {
            setSummaryViewLayout(true);
          }
        }
        if (showLabelsLayout) {
          setHideLabelsLayout(false);
          setSummaryViewLayout(false);
        } else if (hideLabelsLayout) {
          setShowLabelsLayout(false);
          setSummaryViewLayout(false);
        } else if (summaryViewLayout) {
          setShowLabelsLayout(false);
          setHideLabelsLayout(false);
        }
      }

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    // Step states
    const step = React.Children.toArray(children);

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
            'aria-current': currentStep === index,
            children: currentStep === index ? child : null,
            key: index,
            isInverse: isInverse,
            hasHideLabels: hideLabelsLayout,
            hasSummaryView: summaryViewLayout,
            stepStatus: stepStatusStyles,
          });

          return (
            <>
              {item}
              {index !== step.length - 1 && (
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
        }
      }
    );

    // Final step description
    const completionLabel = props.completionLabel
      ? props.completionLabel
      : i18n.stepper.completionLabel;

    // Shows both the step count out of total steps and the step label, allows for customization of the step title.
    const stepSummary = (
      <StyledSummary
        data-testid="stepper summary"
        isInverse={isInverse}
        layout={layout}
        theme={theme}
      >
        {currentStep < step.length
          ? customStepLabel
            ? `${customStepLabel} ${currentStep + 1} of ${step.length}`
            : `${i18n.stepper.stepLabel} 
          ${currentStep + 1} of ${step.length}`
          : completionLabel}
        {StepLabels}
      </StyledSummary>
    );

    return (
      <>
        <StyledStepper
          {...rest}
          breakpoint={breakpoint}
          breakpointLayout={breakpointLayout}
          currentStep={currentStep}
          data-testid={testId}
          layout={layout}
          isInverse={isInverse}
          ref={ref}
          customStepLabel={customStepLabel}
          theme={theme}
        >
          <StyledStepContent showLabelsLayout={showLabelsLayout}>
            {Steps}
          </StyledStepContent>
          <StyledStepContent>
            {summaryViewLayout && stepSummary}
          </StyledStepContent>
        </StyledStepper>
      </>
    );
  }
);
