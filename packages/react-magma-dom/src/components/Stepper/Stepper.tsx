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
   * Changes the Stepper orientation for responsive layouts, needs a minimum 'breakpoint' number.
   */
  breakpointOrientation?: StepperOrientation;
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
   * Determines if the stepper is displayed vertically or horizontally
   * @default StepperOrientation.horizontal
   */
  orientation?: StepperOrientation;
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

export enum StepperOrientation {
  horizontal = 'horizontal', //default
  vertical = 'vertical',
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

const StyledStepper = styled.div<{
  orientation?: StepperOrientation;
  hasLabels?: boolean;
}>`
  display: flex;
  flex: ${props =>
    props.orientation === StepperOrientation.vertical ? '0 0 auto' : 1};
  flex-direction: ${props =>
    props.orientation === StepperOrientation.horizontal && 'column'};
`;

const StyledStepContent = styled.ol<{ orientation?: StepperOrientation }>`
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: ${props =>
    props.orientation === StepperOrientation.vertical && 'column'};
`;

const StyledLiWrapper = styled.li<{
  hasLabels?: boolean;
  orientation?: StepperOrientation;
}>`
  list-style-type: none;
  display: ${props =>
    props.orientation === StepperOrientation.horizontal &&
    !props.hasLabels &&
    'contents'};
  flex: ${props => props.orientation === StepperOrientation.horizontal && 1};
  position: relative;
  margin: 0;

  &:not(:last-child) {
    min-height: ${props =>
      props.orientation === StepperOrientation.vertical && '64px'};
  }
`;

const isActiveLabels = props => {
  return (
    props.showLabelsLayout &&
    (props.bothLabels || props.allStepsHaveLabels || props.secondaryLabel)
  );
};

const StyledSeparator = styled.div<{
  isInverse?: boolean;
  orientation?: StepperOrientation;
  bothLabels?: boolean;
  allStepsHaveLabels?: boolean;
  secondaryLabel?: boolean;
  showLabelsLayout?: boolean;
  stepStatus: StepStatus;
  theme?: ThemeInterface;
}>`
  background: ${buildSeparatorBackgroundColors};
  width: ${props => {
    if (props.orientation === StepperOrientation.vertical) {
      return '2px';
    }

    return isActiveLabels(props) ? 'calc(100% - 24px)' : '100%';
  }};

  height: ${props =>
    props.orientation === StepperOrientation.vertical
      ? 'calc(100% - 24px)'
      : '2px'};
  top: ${props =>
    props.orientation === StepperOrientation.vertical ? '24px' : '11px'};
  left: ${props =>
    props.orientation === StepperOrientation.vertical
      ? '11px'
      : isActiveLabels(props) && 'calc(50% + 12px)'};
  position: ${props =>
    isActiveLabels(props) || props.orientation === StepperOrientation.vertical
      ? 'absolute'
      : 'relative'};
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
      breakpointLayout = StepperLayout.showLabels,
      breakpointOrientation = StepperOrientation.horizontal,
      children,
      currentStep,
      layout = StepperLayout.showLabels,
      orientation = StepperOrientation.horizontal,
      stepLabel,
      isInverse: isInverseProp,
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

    const [responsiveOrientation, setResponsiveOrientaion] =
      React.useState<StepperOrientation>(StepperOrientation.horizontal);

    React.useEffect(() => {
      setHideLabelsLayout(layout === StepperLayout.hideLabels);
      setShowLabelsLayout(layout === StepperLayout.showLabels);
      setSummaryViewLayout(layout === StepperLayout.summaryView);
    }, [layout]);

    React.useEffect(() => {
      setResponsiveOrientaion(orientation);
    }, [orientation]);

    React.useEffect(() => {
      if (breakpoint) {
        setHideLabelsLayout(breakpointLayout === StepperLayout.hideLabels);
        setShowLabelsLayout(breakpointLayout === StepperLayout.showLabels);
        setSummaryViewLayout(breakpointLayout === StepperLayout.summaryView);
      }
    }, [breakpointLayout]);

    React.useEffect(() => {
      if (breakpoint) {
        setResponsiveOrientaion(breakpointOrientation);
      }
    }, [breakpointOrientation]);

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth < breakpoint && breakpoint) {
          setShowLabelsLayout(breakpointLayout === StepperLayout.showLabels);
          setHideLabelsLayout(breakpointLayout === StepperLayout.hideLabels);
          setSummaryViewLayout(breakpointLayout === StepperLayout.summaryView);

          setResponsiveOrientaion(breakpointOrientation);
        }

        if (window.innerWidth > breakpoint || !breakpoint) {
          setShowLabelsLayout(layout === StepperLayout.showLabels);
          setHideLabelsLayout(layout === StepperLayout.hideLabels);
          setSummaryViewLayout(layout === StepperLayout.summaryView);

          setResponsiveOrientaion(orientation);
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

    const getLayout = () => {
      if (responsiveOrientation === StepperOrientation.vertical) {
        return showLabelsLayout
          ? StepperLayout.showLabels
          : StepperLayout.hideLabels;
      }

      return summaryViewLayout
        ? StepperLayout.summaryView
        : hideLabelsLayout
        ? StepperLayout.hideLabels
        : StepperLayout.showLabels;
    };

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
            orientation: responsiveOrientation,
            layout: getLayout(),
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
                  orientation={responsiveOrientation}
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
              orientation={responsiveOrientation}
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
        orientation={responsiveOrientation}
        hasLabels={showLabelsLayout || summaryViewLayout}
      >
        <StyledStepContent
          aria-label={ariaLabel}
          theme={theme}
          orientation={responsiveOrientation}
        >
          {stepContent}
        </StyledStepContent>
        {summaryViewLayout &&
          responsiveOrientation === StepperOrientation.horizontal && (
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
