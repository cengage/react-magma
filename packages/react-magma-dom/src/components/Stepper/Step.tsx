import * as React from 'react';
import styled from '@emotion/styled';
import { CheckIcon, CrossIcon } from 'react-magma-icons';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { transparentize } from 'polished';

/**
 * @children required
 */
export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  /*
   * Index set by Stepper component
   */
  currentStep?: number;
  /**
   * @internal
   */
  ariaLabel?: string;
  /**
   * Displays step number out of total steps beneath the Stepper
   */
  description?: string;
  /**
   * Error state for each step
   * @default false
   */
  hasError?: boolean;
  eachStep?: number;
  /**
   * Total number of steps
   */
  index?: number;
  /**
   * Hides label and secondaryLabel
   * @default false
   */
  isLabelVisuallyHidden?: boolean;
  // /**
  //  * Hides description
  //  * @default false
  //  */
  // isDescriptionVisuallyHidden?: boolean;
  /**
   * Label beneath each step
   */
  label?: string;
  /**
   * Sub label beneath each step
   */
  secondaryLabel?: string;
  /**
   * Uses step description count instead of custom labels
   * @default false
   */
  summaryLabel?: boolean;
  isInverse?: boolean;
  /**
   * @internal
   */
  stepStatus?: StepStatus;
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export enum StepStatus {
  active = 'active',
  complete = 'complete',
  incomplete = 'incomplete',
}

function StepCircleOutlineColors(props: StepProps) {
  if (props.isInverse && !props.hasError) {
    if (props.stepStatus === 'active') {
      return props.theme.colors.tertiary500;
    } else if (props.stepStatus === 'incomplete') {
      return props.theme.colors.primary400;
    }
  } else {
    if (!props.isInverse && !props.hasError) {
      if (props.stepStatus === 'active') {
        return props.theme.colors.primary500;
      } else if (props.stepStatus === 'incomplete') {
        return props.theme.colors.neutral300;
      }
    }
  }
}

function StepCircleBackgroundColors(props: StepProps) {
  if (props.isInverse) {
    if (props.stepStatus === 'complete' && !props.hasError) {
      return props.theme.colors.tertiary500;
    } else if (props.hasError) {
      return props.theme.colors.danger500;
    }
  } else {
    if (props.stepStatus === 'complete' && !props.hasError) {
      return props.theme.colors.primary500;
    } else if (props.hasError) {
      return props.theme.colors.danger500;
    }
  }
}

function StepLabelColors(props: StepProps) {
  if (props.isInverse) {
    if (props.label) {
      return props.theme.colors.neutral100;
    } else if (props.secondaryLabel) {
      return transparentize(0.3, props.theme.colors.neutral100);
    }
  } else {
    if (props.label) {
      return props.theme.colors.neutral700;
    } else if (props.secondaryLabel) {
      return props.theme.colors.neutral500;
    }
  }
}

const StyledStep = styled.div<StepProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 10;
`;

const StyledStepIndicator = styled.span<StepProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  box-shadow: inset 0 0 0 2px
    ${props =>
      (props.stepStatus === 'incomplete' && !props.hasError) ||
      (props.stepStatus === 'active' && !props.hasError)
        ? StepCircleOutlineColors
        : 'none'};
  background: ${StepCircleBackgroundColors};
  z-index: 9;
  svg {
    color: ${props =>
      props.isInverse
        ? props.theme.colors.primary600
        : props.theme.colors.neutral100};
    width: ${props => props.theme.spaceScale.spacing05};
    height: ${props => props.theme.spaceScale.spacing05};
  }
`;

const StyledStepTextWrapper = styled.div<StepProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 7em;
  position: relative;
  /* text-align: center; */
  margin: 6px -10em 0;
`;

const StyledLabel = styled.span<StepProps>`
  color: ${StepLabelColors};
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  font-weight: 600;
  line-height: normal;
`;

const StyledSecondaryLabel = styled.span<StepProps>`
  color: ${StepLabelColors};
  font-size: ${props => props.theme.typeScale.size01.fontSize};
  line-height: normal;
  margin: 5px 0;
`;

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  (props, ref) => {
    const {
      children,
      currentStep,
      description,
      eachStep,
      hasError,
      index,
      isLabelVisuallyHidden,
      // isDescriptionVisuallyHidden,
      label,
      secondaryLabel,
      testId,
      isInverse: isInverseProp,
      onClick,
      stepStatus,
      summaryLabel,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    // const stepContent = props.children;

    return (
      <>
        <div>
          <StyledStep
            currentStep={currentStep}
            theme={theme}
            isInverse={isInverse}
            index={index}
            ref={ref}
            data-testid={props.testId}
            stepStatus={stepStatus}
            summaryLabel={summaryLabel}
            {...rest}
          >
            <StyledStepIndicator
              hasError={hasError}
              isInverse={isInverse}
              stepStatus={stepStatus}
              theme={theme}
            >
              {stepStatus === 'complete' && !hasError && <CheckIcon />}
              {hasError && <CrossIcon />}
            </StyledStepIndicator>
            <StyledStepTextWrapper theme={theme} isInverse={isInverse}>
              {summaryLabel ? (
                <StyledLabel label={label} isInverse={isInverse} theme={theme}>
                  Step {eachStep} of {index}
                </StyledLabel>
              ) : (
                !isLabelVisuallyHidden && (
                  <>
                    {label && (
                      <StyledLabel
                        label={label}
                        isInverse={isInverse}
                        theme={theme}
                      >
                        {label}
                      </StyledLabel>
                    )}
                    {secondaryLabel && (
                      <StyledSecondaryLabel
                        secondaryLabel={secondaryLabel}
                        isInverse={isInverse}
                        theme={theme}
                      >
                        {secondaryLabel}
                      </StyledSecondaryLabel>
                    )}
                  </>
                )
              )}
              {/* {!isDescriptionVisuallyHidden && <p>{description}</p>} */}
            </StyledStepTextWrapper>
          </StyledStep>

          {/* Should this be wrapping child elements that pertain to each step? */}

          {/* {stepStatus === 'active' && (
            <StyledStepContentWrapper>{stepContent}</StyledStepContentWrapper>
          )} */}
        </div>
      </>
    );
  }
);
