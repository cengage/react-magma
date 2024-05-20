import * as React from 'react';
import styled from '@emotion/styled';
import { CheckIcon, CrossIcon } from 'react-magma-icons';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
// import { I18nContext } from '../../i18n';

/**
 * @children required
 */
export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  /*
   * Index set by Stepper component
   */
  stepStatus?: StepStatus;
  currentStep?: number;
  description?: string;
  index?: number;
  label?: string;
  testId?: string;
  isInverse?: boolean;
  /**
   * Icon to display within the component
   */
  onClick?: () => void;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export enum StepStatus {
  active = 'active',
  complete = 'complete',
  incomplete = 'incomplete',
  error = 'error',
}

function StepColors(props: StepProps) {
  switch (props.stepStatus) {
    case 'active':
      return props.theme.colors.primary500;
    case 'complete':
      return props.theme.colors.primary500;
    case 'incomplete':
      return props.theme.colors.neutral300;
    case 'error':
      return props.theme.colors.danger500;
  }
}

const StyledStep = styled.div<StepProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledStepIndicator = styled.span<StepProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  box-shadow: inset 0 0 0 2px ${StepColors};
  background: ${props =>
    props.stepStatus === 'complete'
      ? props.theme.colors.primary500
      : props.stepStatus === 'error'
      ? props.theme.colors.danger500
      : ''};
  svg {
    color: white;
    width: 16px;
    height: 16px;
  }
`;

const StyledStepTextWrapper = styled.div<StepProps>`
  display: flex;
  flex-direction: column;
`;

// function icons() {
//   if (props => props.stepStatus === StepStatus.complete) {
//     return <CheckIcon />;
//   } else if (props => props.stepStatus === StepStatus.error) {
//     return <CrossIcon />;
//   }
//   return null;
// }

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  (props, ref) => {
    const {
      children,
      currentStep,
      description,
      index,
      label,
      testId,
      isInverse: isInverseProp,
      onClick,
      stepStatus,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);
    // const i18n = React.useContext(I18nContext);

    console.log(`Current index ?: ${index}`);

    return (
      <>
        <StyledStep
          currentStep={currentStep}
          theme={theme}
          isInverse={isInverse}
          index={currentStep}
          ref={ref}
          data-testid={props.testId}
          stepStatus={stepStatus}
          {...rest}
        >
          <StyledStepIndicator stepStatus={stepStatus} theme={theme}>
            {StepStatus.complete ? (
              <CheckIcon />
            ) : StepStatus.error ? (
              <CrossIcon />
            ) : (
              ''
            )}
          </StyledStepIndicator>
          <StyledStepTextWrapper theme={theme}>
            <label>{label}</label>
            <p>{description}</p>
          </StyledStepTextWrapper>
        </StyledStep>
      </>
    );
  }
);
