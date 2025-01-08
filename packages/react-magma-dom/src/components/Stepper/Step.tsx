import styled from '@emotion/styled';
import * as React from 'react';
import { CheckIcon, CloseIcon } from 'react-magma-icons';

import { transparentize } from 'polished';
import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { HiddenStyles } from '../../utils/UtilityStyles';
import { StepperLayout, StepperOrientation } from './Stepper';

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Error state for each step.
   * @default false
   */
  hasError?: boolean;
  /**
   * @internal
   */
  layout?: StepperLayout;
  /**
   * Label beneath each step.
   */
  label?: string;
  /**
   * Sub label beneath each step.
   */
  secondaryLabel?: string;
  /**
   * @internal
   */
  stepStatus?: StepStatus;
  /**
   * @internal
   */
  index?: number;
  /**
   * @internal
   */
  orientation?: StepperOrientation;
  /**
   * @internal
   */
  isInverse?: boolean;
  /**
   * @internal
   */
  stepLabel?: string;
  /**
   * @internal
   */
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export enum StepStatus {
  active = 'active',
  completed = 'completed',
  incomplete = 'incomplete',
}

function buildStepCircleOutlineColors(props) {
  const { isInverse, stepStatus, hasError, theme } = props;

  if (isInverse && !hasError) {
    if (stepStatus === StepStatus.active) {
      return theme.colors.tertiary500;
    } else if (stepStatus === StepStatus.incomplete) {
      return theme.colors.primary400;
    }
  } else {
    if (!isInverse && !hasError) {
      if (stepStatus === StepStatus.active) {
        return theme.colors.primary500;
      } else if (stepStatus === StepStatus.incomplete) {
        return theme.colors.neutral300;
      }
    }
  }
}

function buildStepCircleBackgroundColors(props) {
  const { isInverse, stepStatus, hasError, theme } = props;
  if (isInverse) {
    if (stepStatus === StepStatus.completed && !hasError) {
      return theme.colors.tertiary500;
    } else if (hasError) {
      return theme.colors.danger500;
    }
  } else {
    if (stepStatus === StepStatus.completed && !hasError) {
      return theme.colors.primary500;
    } else if (hasError) {
      return theme.colors.danger500;
    }
  }
}

function buildStepLabelColors(props) {
  const { label, secondaryLabel, theme, isInverse } = props;

  if (isInverse) {
    if (label) {
      return theme.colors.neutral100;
    } else if (secondaryLabel) {
      return transparentize(0.3, theme.colors.neutral100);
    }
  } else {
    if (label) {
      return theme.colors.neutral700;
    } else if (secondaryLabel) {
      return theme.colors.neutral500;
    }
  }
}

function buildStepSvgColors(props) {
  const { theme, hasError, isInverse } = props;
  if (isInverse) {
    if (hasError) {
      return theme.colors.neutral100;
    }
    return theme.colors.primary600;
  } else {
    return theme.colors.neutral100;
  }
}

export const HiddenLabelText = styled.span`
  ${HiddenStyles};
`;

const StyledStep = styled.div<{
  isVerticalOrientation: boolean;
}>`
  display: flex;
  flex-direction: ${props => !props.isVerticalOrientation && 'column'};
  justify-content: center;
  text-align: ${props => !props.isVerticalOrientation && 'center'};
  align-self: self-start;
  align-items: ${props => !props.isVerticalOrientation && 'center'};

  &:last-child > span {
    margin-bottom: ${props => props.isVerticalOrientation && 0};
  }
`;

const StyledStepIndicator = styled.span<{
  hasError?: boolean;
  stepStatus?: StepStatus;
  isInverse?: boolean;
  theme?: ThemeInterface;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  box-shadow: inset 0 0 0 2px
    ${props =>
      (props.stepStatus === StepStatus.incomplete && !props.hasError) ||
      (props.stepStatus === StepStatus.active && !props.hasError)
        ? buildStepCircleOutlineColors
        : 'none'};
  background: ${buildStepCircleBackgroundColors};
  svg {
    color: ${buildStepSvgColors};
    width: ${props => props.theme.iconSizes.xSmall}px;
    height: ${props => props.theme.iconSizes.xSmall}px;
  }
`;

const StyledStepTextWrapper = styled.span<{ isVerticalOrientation?: boolean }>`
  flex: 1;
  display: flex;
  align-self: center;
  flex-direction: column;
  position: relative;
  margin: ${props =>
    props.isVerticalOrientation ? '2px 0 24px 8px' : '6px 8px 0'};
`;

const StyledLabel = styled.span<{
  isInverse?: boolean;
  label?: string;
  theme?: ThemeInterface;
}>`
  color: ${buildStepLabelColors};
  font-weight: 600;
  font-size: ${props =>
    props.theme.typographyVisualStyles.bodySmall.desktop.fontSize};
  letter-spacing: ${props =>
    props.theme.typographyVisualStyles.bodySmall.desktop.letterSpacing};
  line-height: ${props =>
    props.theme.typographyVisualStyles.bodySmall.desktop.lineHeight};
`;

const StyledSecondaryLabel = styled.span<{
  isInverse?: boolean;
  secondaryLabel?: string;
  theme?: ThemeInterface;
  isVerticalOrientation?: boolean;
}>`
  color: ${buildStepLabelColors};
  font-size: ${props =>
    props.theme.typographyVisualStyles.bodyXSmall.desktop.fontSize};
  letter-spacing: ${props =>
    props.theme.typographyVisualStyles.bodyXSmall.desktop.letterSpacing};
  line-height: ${props =>
    props.theme.typographyVisualStyles.bodyXSmall.desktop.lineHeight};
  margin: ${props =>
    props.isVerticalOrientation ? '2px 0 0' : '2px 12px 0 12px'};
`;

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  (props, ref) => {
    const {
      hasError,
      index,
      label,
      layout,
      orientation = StepperOrientation.horizontal,
      secondaryLabel,
      stepLabel,
      testId,
      isInverse: isInverseProp,
      stepStatus,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);
    const isVerticalOrientation = orientation === StepperOrientation.vertical;

    return (
      <StyledStep
        {...rest}
        ref={ref}
        data-testid={testId}
        isVerticalOrientation={isVerticalOrientation}
      >
        <StyledStepIndicator
          hasError={hasError}
          isInverse={isInverse}
          stepStatus={stepStatus}
          theme={theme}
        >
          {stepStatus === StepStatus.completed && !hasError && (
            <CheckIcon aria-hidden="true" />
          )}
          {hasError && <CloseIcon aria-hidden="true" />}
        </StyledStepIndicator>

        <StyledStepTextWrapper isVerticalOrientation={isVerticalOrientation}>
          {layout !== StepperLayout.hideLabels &&
          layout !== StepperLayout.summaryView ? (
            <>
              {layout === StepperLayout.showLabels && (
                <HiddenLabelText>
                  {`${
                    stepStatus === StepStatus.completed
                      ? `${stepLabel} ${stepStatus}, `
                      : ''
                  }`}
                </HiddenLabelText>
              )}
              {label && (
                <StyledLabel
                  label={label}
                  isInverse={isInverse}
                  data-testid={testId && `${testId}-label`}
                  theme={theme}
                >
                  {label}
                </StyledLabel>
              )}
              {secondaryLabel && (
                <StyledSecondaryLabel
                  secondaryLabel={secondaryLabel}
                  isInverse={isInverse}
                  data-testid={testId && `${testId}-secondaryLabel`}
                  theme={theme}
                  isVerticalOrientation={isVerticalOrientation}
                >
                  {secondaryLabel}
                </StyledSecondaryLabel>
              )}
            </>
          ) : (
            layout !== StepperLayout.summaryView && (
              <HiddenLabelText>
                {`${
                  stepStatus === StepStatus.completed
                    ? `${stepLabel} ${stepStatus}, `
                    : ''
                }${label || ''}${secondaryLabel ? ' ' : ''}${
                  secondaryLabel || ''
                }`}
              </HiddenLabelText>
            )
          )}
        </StyledStepTextWrapper>
      </StyledStep>
    );
  }
);
