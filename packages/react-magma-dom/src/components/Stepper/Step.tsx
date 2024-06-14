import * as React from 'react';
import styled from '@emotion/styled';
import { CheckIcon, CrossIcon } from 'react-magma-icons';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { transparentize } from 'polished';
import { HiddenStyles } from '../../utils/UtilityStyles';

/**
 * @children required
 */
export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Error state for each step
   * @default false
   */
  hasError?: boolean;
  /**
   * @internal
   */
  hasHideLabels?: boolean;
  /**
   * @internal
   */
  hasSummaryView?: boolean;
  /**
   * Label beneath each step
   */
  label?: string;
  /**
   * Sub label beneath each step
   */
  secondaryLabel?: string;
  /**
   * @internal
   */
  stepStatus?: StepStatus;
  /**
   * @internal
   */
  isInverse?: boolean;
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
  complete = 'complete',
  incomplete = 'incomplete',
}

export const HiddenLabelText = styled.span`
  ${HiddenStyles};
`;

function stepCircleOutlineColors(props: StepProps) {
  if (props.isInverse && !props.hasError) {
    if (props.stepStatus === StepStatus.active) {
      return props.theme.colors.tertiary500;
    } else if (props.stepStatus === StepStatus.incomplete) {
      return props.theme.colors.primary400;
    }
  } else {
    if (!props.isInverse && !props.hasError) {
      if (props.stepStatus === StepStatus.active) {
        return props.theme.colors.primary500;
      } else if (props.stepStatus === StepStatus.incomplete) {
        return props.theme.colors.neutral300;
      }
    }
  }
}

function stepCircleBackgroundColors(props: StepProps) {
  const { isInverse, stepStatus, hasError, theme } = props;
  if (isInverse) {
    if (stepStatus === StepStatus.complete && !hasError) {
      return theme.colors.tertiary500;
    } else if (hasError) {
      return theme.colors.danger500;
    }
  } else {
    if (stepStatus === StepStatus.complete && !hasError) {
      return theme.colors.primary500;
    } else if (hasError) {
      return theme.colors.danger500;
    }
  }
}

function stepLabelColors(props: StepProps) {
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

function stepSvgColors(props: StepProps) {
  if (props.isInverse) {
    if (props.hasError) {
      return props.theme.colors.neutral100;
    }
    return props.theme.colors.primary600;
  } else {
    return props.theme.colors.neutral100;
  }
}

const StyledStep = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-self: self-start;
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
      (props.stepStatus === StepStatus.incomplete && !props.hasError) ||
      (props.stepStatus === StepStatus.active && !props.hasError)
        ? stepCircleOutlineColors
        : 'none'};
  background: ${stepCircleBackgroundColors};
  svg {
    color: ${stepSvgColors};
    width: ${props => props.theme.iconSizes.xSmall}px;
    height: ${props => props.theme.iconSizes.xSmall}px;
  }
`;

const StyledStepTextWrapper = styled.div`
  flex: 1;
  display: flex;
  align-self: center;
  flex-direction: column;
  position: relative;
  margin: 6px -10em 0;
`;

const StyledLabel = styled.span<StepProps>`
  color: ${stepLabelColors};
  font-weight: 600;
  font-size: ${props =>
    props.theme.typographyVisualStyles.bodySmall.desktop.fontSize};
  letter-spacing: ${props =>
    props.theme.typographyVisualStyles.bodySmall.desktop.letterSpacing};
  line-height: ${props =>
    props.theme.typographyVisualStyles.bodySmall.desktop.lineHeight};
`;

const StyledSecondaryLabel = styled.span<StepProps>`
  color: ${stepLabelColors};
  font-size: ${props =>
    props.theme.typographyVisualStyles.bodyXSmall.desktop.fontSize};
  letter-spacing: ${props =>
    props.theme.typographyVisualStyles.bodyXSmall.desktop.letterSpacing};
  line-height: ${props =>
    props.theme.typographyVisualStyles.bodyXSmall.desktop.lineHeight};
  margin: 5px 0;
`;

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  (props, ref) => {
    const {
      children,
      hasError,
      hasHideLabels,
      hasSummaryView,
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
      <StyledStep {...rest} ref={ref} data-testid={testId}>
        {stepStatus && (
          <StyledStepIndicator
            hasError={hasError}
            isInverse={isInverse}
            stepStatus={stepStatus}
            theme={theme}
          >
            {stepStatus === StepStatus.complete && !hasError && (
              <CheckIcon aria-hidden="true" />
            )}
            {hasError && <CrossIcon aria-hidden="true" />}
          </StyledStepIndicator>
        )}

        <StyledStepTextWrapper>
          {!hasSummaryView && !hasHideLabels ? (
            <>
              {label && (
                <StyledLabel label={label} isInverse={isInverse} theme={theme}>
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
          ) : (
            <HiddenLabelText>
              {label}
              {secondaryLabel}
            </HiddenLabelText>
          )}
        </StyledStepTextWrapper>
      </StyledStep>
    );
  }
);
