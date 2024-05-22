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
  breakpoint?: number;
  customDescriptionLabel?: string;
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
  isDescriptionVisuallyHidden?: boolean;
  summaryLabel?: boolean;
  /**
   * @internal
   */
  stepStatus?: StepStatus;
  /**
   * @internal
   */
  theme?: ThemeInterface;
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
  margin: 0 12.5px;
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
  top: 14px;
  margin-left: 12px;
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  color: ${props =>
    props.isInverse
      ? transparentize(0.3, props.theme.colors.neutral100)
      : props.theme.colors.neutral500};
`;

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (props, ref) => {
    const {
      breakpoint,
      children,
      currentStep,
      customDescriptionLabel,
      index,
      isInverse: isInverseProp,
      isLabelVisuallyHidden,
      isDescriptionVisuallyHidden,
      summaryLabel,
      testId,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

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
            eachStep: index + 1,
            index: steps.length,
            isInverse: isInverse,
            isLabelVisuallyHidden,
            summaryLabel,
            key: index,
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

    return (
      <>
        <StyledStepper
          currentStep={currentStep}
          customDescriptionLabel={customDescriptionLabel}
          data-testid={props.testId}
          isInverse={isInverse}
          ref={ref}
          theme={theme}
          {...rest}
        >
          {Steps}
        </StyledStepper>
        {!isDescriptionVisuallyHidden && (
          <StyledSummary isInverse={isInverse} theme={theme}>
            {customDescriptionLabel ? `${customDescriptionLabel} ` : 'Step '}
            {currentStep + 1} of {steps.length}
          </StyledSummary>
        )}
      </>
    );
  }
);
