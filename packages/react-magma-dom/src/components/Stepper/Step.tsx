import * as React from 'react';
import { CheckIcon, CrossIcon } from 'react-magma-icons';
import styled from '@emotion/styled';
import { CreateStyled } from '@emotion/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { transparentize } from 'polished';
import { HiddenStyles } from '../../utils/UtilityStyles';
import { StepperLayout } from './Stepper';

export interface StepProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Error state for each step.
   * @default false
   */
  hasError?: boolean;
  /**
   * @internal
   */
  areLabelsHidden?: boolean;
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
  complete = 'complete',
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

const typedStyled = styled as CreateStyled<ThemeInterface>;

export const HiddenLabelText = typedStyled.span`
  ${HiddenStyles};
`;

const StyledStep = typedStyled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-self: self-start;
  align-items: center;

`;

const StyledStepIndicator = typedStyled.span<{
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

const StyledStepTextWrapper = typedStyled.div`
  flex: 1;
  display: flex;
  align-self: center;
  flex-direction: column;
  position: relative;
  margin: 6px 8px 0;
`;

const StyledLabel = typedStyled.span<{
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

const StyledSecondaryLabel = typedStyled.span<{
  isInverse?: boolean;
  secondaryLabel?: string;
  theme?: ThemeInterface;
}>`
  color: ${buildStepLabelColors};
  font-size: ${props =>
    props.theme.typographyVisualStyles.bodyXSmall.desktop.fontSize};
  letter-spacing: ${props =>
    props.theme.typographyVisualStyles.bodyXSmall.desktop.letterSpacing};
  line-height: ${props =>
    props.theme.typographyVisualStyles.bodyXSmall.desktop.lineHeight};
  margin: 2px 12px 0 12px;
`;

export const Step = React.forwardRef<HTMLLIElement, StepProps>((props, ref) => {
  const {
    hasError,
    areLabelsHidden,
    index,
    label,
    layout,
    secondaryLabel,
    stepLabel,
    testId,
    isInverse: isInverseProp,
    stepStatus,
    ...rest
  } = props;
  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(isInverseProp);

  return (
    <StyledStep {...rest} ref={ref} data-testid={testId}>
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

      <StyledStepTextWrapper>
        {!areLabelsHidden ? (
          <>
            {layout === StepperLayout.showLabels && (
              <HiddenLabelText>{`${stepLabel} ${index + 1}, `}</HiddenLabelText>
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
              >
                {secondaryLabel}
              </StyledSecondaryLabel>
            )}
            {layout === StepperLayout.showLabels && (
              <HiddenLabelText>
                {stepStatus === StepStatus.complete
                  ? `, ${stepLabel} ${stepStatus}`
                  : ''}
              </HiddenLabelText>
            )}
          </>
        ) : (
          layout !== StepperLayout.summaryView && (
            <HiddenLabelText
              data-testid={testId && `${testId}-hiddenlabeltext`}
            >
              {`${stepLabel} ${index + 1}, ${label || ''}${
                secondaryLabel ? ' ' : ''
              }${secondaryLabel || ''}${
                stepStatus === StepStatus.complete
                  ? `, ${stepLabel} ${stepStatus}`
                  : ''
              }`}
            </HiddenLabelText>
          )
        )}
      </StyledStepTextWrapper>
    </StyledStep>
  );
});
