import * as React from 'react';
import styled from '@emotion/styled';
import { CheckIcon, CrossIcon } from 'react-magma-icons';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { transparentize } from 'polished';
import { BreakPointStyle } from './Stepper';

/**
 * @children required
 */
export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  breakpointStyle?: BreakPointStyle;
  /*
   * Index set by Stepper component
   */
  currentStep?: number;
  /**
   * @internal
   */
  ariaLabel?: string;
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
  /**
   * Hides label and secondaryLabel in place of summary view
   * @default false
   */
  isSummaryView?: boolean;
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
  /**
   * @internal
   */
  stepStatus?: StepStatus;
  isInverse?: boolean;
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

function StepSvgColors(props: StepProps) {
  if (props.isInverse) {
    if (props.hasError) {
      return props.theme.colors.neutral100;
    }
    return props.theme.colors.primary600;
  } else {
    return props.theme.colors.neutral100;
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
    color: ${StepSvgColors};
    width: ${props => props.theme.spaceScale.spacing05};
    height: ${props => props.theme.spaceScale.spacing05};
  }
`;

const StyledStepTextWrapper = styled.div<StepProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  /* width: 7em; */
  position: relative;
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
      breakpointStyle,
      children,
      currentStep,
      eachStep,
      hasError,
      index,
      isLabelVisuallyHidden,
      isSummaryView,
      label,
      secondaryLabel,
      testId,
      isInverse: isInverseProp,
      stepStatus,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

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
            {...rest}
          >
            {stepStatus && (
              <StyledStepIndicator
                hasError={hasError}
                isInverse={isInverse}
                stepStatus={stepStatus}
                theme={theme}
              >
                {stepStatus === 'complete' && !hasError && <CheckIcon />}
                {hasError && <CrossIcon />}
              </StyledStepIndicator>
            )}
            <StyledStepTextWrapper
              isSummaryView={isSummaryView}
              theme={theme}
              isInverse={isInverse}
            >
              {!isSummaryView && !isLabelVisuallyHidden && (
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
              )}
            </StyledStepTextWrapper>
          </StyledStep>
        </div>
      </>
    );
  }
);
