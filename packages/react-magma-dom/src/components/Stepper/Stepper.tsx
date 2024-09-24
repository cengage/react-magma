import * as React from 'react';
import styled from '@emotion/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { Step, StepProps, StepStatus } from './Step';
import { transparentize } from 'polished';
import { I18nContext } from '../../i18n';

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @internal
   */
  testId?: string;
  /**
   * Customizable aria-label for accessibility.
   */
  ariaLabel: string;
  /**
   * Custom number for responsive styling, uses a minimum 'breakpoint' width from the set number.
   */
  breakpoint?: number;
  /**
   * Changes the Stepper view for responsive layouts, needs a minimum 'breakpoint' number.
   */
  breakpointLayout?: StepperLayout;
  /**
   * Sets the Stepper view
   * @default StepperLayout.showLabels
   */
  layout?: StepperLayout;
  /**
   * Sets a custom label for the Step count # of #.
   * @default 'Step'
   */
  stepLabel?: string;
  /**
   * Sets a custom label for the completed Step.
   * @default 'All steps completed'
   */
  completionLabel?: string;
  /**
   * Current step value.
   */
  currentStep: number;
  /**
   * Vertical orientation.
   * @default false
   */
  isVertical?: boolean;
  /**
   * Inverse styling.
   */
  isInverse?: boolean;
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

function buildSeparatorBackgroundColors(props) {
  const { isInverse, theme, stepStatus } = props;
  if (isInverse) {
    if (stepStatus === StepStatus.completed) {
      return theme.colors.tertiary500;
    }
    return theme.colors.primary400;
  } else {
    if (stepStatus === StepStatus.completed) {
      return theme.colors.primary500;
    }
    return theme.colors.neutral300;
  }
}

const StyledStepper = styled.div<{ isVertical?: boolean; hasLabels?: boolean }>`
  display: flex;
  flex: ${props => (props.isVertical ? '0 0 auto' : 1)};
  width: ${props => props.isVertical && props.hasLabels && '128px'};
  flex-direction: ${props => !props.isVertical && 'column'};
`;

const StyledStepContent = styled.ol<{ isVertical?: boolean }>`
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: ${props => props.isVertical && 'column'};
`;

const StyledLiWrapper = styled.li<{
  hasLabels?: boolean;
  isVertical?: boolean;
}>`
  list-style-type: none;
  display: ${props => !props.isVertical && !props.hasLabels && 'contents'};
  flex: ${props => !props.isVertical && 1};
  position: relative;

  min-height: ${props => props.isVertical && '64px'};
  margin: 0;
`;

const isActiveLabels = props => {
  return (
    props.showLabelsLayout &&
    (props.bothLabels || props.allStepsHaveLabels || props.secondaryLabel)
  );
};

const StyledSeparator = styled.div<{
  isInverse?: boolean;
  isVertical?: boolean;
  bothLabels?: boolean;
  allStepsHaveLabels?: boolean;
  secondaryLabel?: boolean;
  showLabelsLayout?: boolean;
  stepStatus: StepStatus;
  theme?: ThemeInterface;
}>`
  background: ${buildSeparatorBackgroundColors};
  width: ${props => {
    if (props.isVertical) {
      return '2px';
    }

    return isActiveLabels(props) ? 'calc(100% - 24px)' : '100%';
  }};

  height: ${props => (props.isVertical ? 'calc(100% - 24px)' : '2px')};
  top: ${props => (props.isVertical ? '24px' : '11px')};
  left: ${props =>
    props.isVertical ? '11px' : isActiveLabels(props) && 'calc(50% + 12px)'};
  position: ${props =>
    isActiveLabels(props) || props.isVertical ? 'absolute' : 'relative'};
  align-self: baseline;
  transition: background 0.4s ease;
`;

const StyledSummary = styled.div<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  display: flex;
  flex-direction: column;
  position: relative;
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
  span {
    display: flex;
    text-align: left;
  }
  svg {
    height: 0;
  }
  div > span:first-child {
    height: auto;
    margin: 0;
  }
  div span {
    margin: 3px 0;
    span:first-child {
      margin: 0;
    }
    span:last-child {
      margin: 4px 0 0 0;
    }
  }
`;

// Stepper!
export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (props, ref) => {
    const {
      ariaLabel,
      breakpoint,
      breakpointLayout,
      children,
      currentStep,
      layout = StepperLayout.showLabels,
      stepLabel,
      isInverse: isInverseProp,
      isVertical,
      testId,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const i18n = React.useContext(I18nContext);
    const isInverse = useIsInverse(isInverseProp);

    // Controls the varying layouts with a set breakpoint number between a breakpointLayout type and / or a layout type.
    const [showLabelsLayout, setShowLabelsLayout] = React.useState(false);
    const [hideLabelsLayout, setHideLabelsLayout] = React.useState(false);
    const [summaryViewLayout, setSummaryViewLayout] = React.useState(false);

    React.useEffect(() => {
      setHideLabelsLayout(layout === StepperLayout.hideLabels);
      setShowLabelsLayout(layout === StepperLayout.showLabels);
      setSummaryViewLayout(layout === StepperLayout.summaryView);
    }, [layout]);

    React.useEffect(() => {
      setHideLabelsLayout(breakpointLayout === StepperLayout.hideLabels);
      setShowLabelsLayout(breakpointLayout === StepperLayout.showLabels);
      setSummaryViewLayout(breakpointLayout === StepperLayout.summaryView);
    }, [breakpointLayout]);

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth < breakpoint && breakpoint) {
          setShowLabelsLayout(breakpointLayout === StepperLayout.showLabels);
          setHideLabelsLayout(breakpointLayout === StepperLayout.hideLabels);
          setSummaryViewLayout(breakpointLayout === StepperLayout.summaryView);
        }

        if (window.innerWidth > breakpoint || !breakpoint) {
          setShowLabelsLayout(layout === StepperLayout.showLabels);
          setHideLabelsLayout(layout === StepperLayout.hideLabels);
          setSummaryViewLayout(layout === StepperLayout.summaryView);
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

    const stepperChildren = React.Children.toArray(children);
    const numberOfSteps = stepperChildren.length;

    let allStepsHaveLabels = false;
    let allStepsHaveSecondaryLabels = false;

    for (const stepChild of stepperChildren) {
      if (React.isValidElement(stepChild)) {
        if (Object.keys(stepChild.props).includes('label')) {
          allStepsHaveLabels = true;
        }
        if (Object.keys(stepChild.props).includes('secondaryLabel')) {
          allStepsHaveSecondaryLabels = true;
        }
      }
    }

    const stepContent = React.Children.map(
      children,
      (
        child: React.ReactElement<React.PropsWithChildren<StepProps>>,
        index
      ) => {
        if (child.type === Step) {
          const stepStatusStyles =
            currentStep >= index + 1
              ? StepStatus.completed
              : currentStep >= index
              ? StepStatus.active
              : StepStatus.incomplete;

          const item = React.cloneElement(child, {
            isInverse,
            index,
            isVertical,
            layout: summaryViewLayout
              ? StepperLayout.summaryView
              : hideLabelsLayout
              ? StepperLayout.hideLabels
              : StepperLayout.showLabels,
            stepLabel: stepLabel || i18n.stepper.stepLabel,
            stepStatus: stepStatusStyles,
          });

          const stepAndSeparator = () => {
            return [
              item,
              index !== numberOfSteps - 1 && (
                <StyledSeparator
                  key={`separator-${index}`}
                  isInverse={isInverse}
                  isVertical={isVertical}
                  bothLabels={allStepsHaveLabels && allStepsHaveSecondaryLabels}
                  allStepsHaveLabels={allStepsHaveLabels}
                  secondaryLabel={allStepsHaveSecondaryLabels}
                  showLabelsLayout={showLabelsLayout}
                  stepStatus={stepStatusStyles}
                  theme={theme}
                />
              ),
            ];
          };

          return (
            <StyledLiWrapper
              aria-current={currentStep === index ? 'step' : false}
              hasLabels={
                showLabelsLayout &&
                (allStepsHaveLabels || allStepsHaveSecondaryLabels)
              }
              isVertical={isVertical}
            >
              {stepAndSeparator()}
            </StyledLiWrapper>
          );
        }
      }
    );

    // When summaryView is set to true, this shows one step label and description at a time based on the active step below the Stepper component.
    const getSummaryStepLabels = () =>
      React.Children.map(children, (child, index) => {
        const item = child as React.ReactElement<
          React.PropsWithChildren<StepProps>
        >;

        if (item.type === Step && currentStep === index) {
          return item;
        }
      });

    // Final step description
    const completionLabel =
      props.completionLabel || i18n.stepper.completionLabel;

    return (
      <StyledStepper
        {...rest}
        data-testid={testId}
        ref={ref}
        isVertical={isVertical}
        hasLabels={
          showLabelsLayout || summaryViewLayout
        }
      >
        <StyledStepContent
          aria-label={ariaLabel}
          theme={theme}
          isVertical={isVertical}
        >
          {stepContent}
        </StyledStepContent>
        {summaryViewLayout && (
          <StyledSummary
            data-testid={testId && `${testId}-stepper-summary`}
            isInverse={isInverse}
            theme={theme}
          >
            {currentStep < numberOfSteps
              ? stepLabel
                ? `${stepLabel} ${currentStep + 1} ${
                    i18n.stepper.stepOfLabel
                  } ${numberOfSteps}`
                : `${i18n.stepper.stepLabel} 
          ${currentStep + 1} ${i18n.stepper.stepOfLabel} ${numberOfSteps}`
              : completionLabel}
            {getSummaryStepLabels()}
          </StyledSummary>
        )}
      </StyledStepper>
    );
  }
);
