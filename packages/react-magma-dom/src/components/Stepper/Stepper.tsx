import * as React from 'react';
import styled from '@emotion/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { Step, StepProps, StepStatus } from './Step';
import { Button } from '../Button';
// import { I18nContext } from '../../i18n';

/**
 * @children required
 */
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;

  /*
   * Current step value
   */
  currentStep?: number;
  hasNext?: boolean;
  // hasPrevious?: boolean;

  isInverse?: boolean;
  /**
   * @internal
   */
  theme?: ThemeInterface;

  stepStatus?: StepStatus;
}

const StyledStepper = styled.div<StepperProps>`
  display: flex;
`;

const StyledSeparator = styled.div<StepperProps>`
  background: ${props =>
    props.stepStatus === 'complete' ? props.theme.colors.primary500 : 'gray'};
  width: 100%;
  height: 2px;
  top: 12px;
  position: relative;
  align-self: baseline;
  transition: all 0.4s ease;
`;

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (props, ref) => {
    const {
      children,
      testId,
      isInverse: isInverseProp,
      hasNext,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);
    // const i18n = React.useContext(I18nContext);

    const steps = React.Children.toArray(children);

    const [currentStep, setCurrentStep] = React.useState(0);

    const previousStep = React.useRef<number>(0);

    React.useEffect(() => {
      previousStep.current = currentStep;
    }, [currentStep]);

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
            index: currentStep,
            key: index,
            stepStatus: stepStatusStyles,
          });

          return (
            <>
              {item}
              {index !== steps.length - 1 && (
                <StyledSeparator stepStatus={stepStatusStyles} theme={theme} />
              )}
            </>
          );
        }
      }
    );

    const handleOnNext = () => {
      if (currentStep !== steps.length) {
        setCurrentStep(currentStep + 1);
      }
    };
    const handleOnPrevious = () => {
      if (currentStep !== 0) {
        setCurrentStep(currentStep - 1);
      }
    };

    return (
      <>
        <StyledStepper
          currentStep={currentStep}
          theme={theme}
          isInverse={isInverse}
          ref={ref}
          data-testid={props.testId}
          {...rest}
        >
          {Steps}
        </StyledStepper>
        <Button onClick={handleOnPrevious}>Previous</Button>
        <Button onClick={handleOnNext}>Next</Button>
      </>
    );
  }
);
