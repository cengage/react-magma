import * as React from 'react';
import {
  WizardStepProps,
  WizardInner,
  WizardInnerProps,
  NavigationStepClickProps,
} from '.';
import { TabsOrientation } from '../Tabs/shared';

export interface WizardProps {
  steps: WizardStepProps[];
  activeStepIndex?: number;
  orientation?: TabsOrientation;
  getStepNumberLabel?: (stepNumber: number) => string;
  isLoadingNextStep?: boolean;
  onCancelButtonClick?: () => void;
  onPreviousButtonClick?: (
    navigationStepClickProps: NavigationStepClickProps
  ) => void;
  onNextButtonClick?: (
    navigationStepClickProps: NavigationStepClickProps
  ) => boolean;
  onSubmitButtonClick?: () => void;
  onStepNavigationClick?: (
    navigationStepClickProps: NavigationStepClickProps
  ) => void;
  disableStepNavigation?: boolean;
}

export const Wizard = React.forwardRef<HTMLDivElement, WizardProps>(
  (
    {
      steps,
      getStepNumberLabel = (stepNumber: number) => `Step ${stepNumber}`,
      isLoadingNextStep = false,
      disableStepNavigation = false,
      orientation = TabsOrientation.horizontal,
      onNextButtonClick = () => true,
      onPreviousButtonClick = () => {},
      onStepNavigationClick = () => {},
      onSubmitButtonClick = () => {},
      onCancelButtonClick = () => {},
      ...props
    },
    ref
  ) => {
    const [maxStepIndex, setMaxStepIndex] = React.useState(
      props.activeStepIndex || 0
    );
    const [activeStepIndex, setActiveStepIndex] = React.useState(
      props.activeStepIndex || 0
    );

    const handleStepNavigationClick = (
      NavigationStepClickProps: NavigationStepClickProps
    ) => {
      setActiveStepIndex(NavigationStepClickProps.requestedStepIndex);
      onStepNavigationClick(NavigationStepClickProps);
    };

    const handleNextButtonClick = () => {
      const target = activeStepIndex + 1;
      if (onNextButtonClick({ requestedStepIndex: target })) {
        setActiveStepIndex(target);
        if (target > maxStepIndex) {
          setMaxStepIndex(target);
        }
      }
    };

    const handlePreviousButtonClick = () => {
      const target = activeStepIndex - 1;
      if (target >= 0) {
        setActiveStepIndex(target);
        onPreviousButtonClick({ requestedStepIndex: target });
      }
    };
    const wizardInnerProps: WizardInnerProps = {
      orientation,
      step: steps[activeStepIndex],
      stepsInfo: steps,
      stepCount: steps.length,
      activeStepIndex,
      maxStepIndex,
      getStepNumberLabel,
      isLoadingNextStep,
      disableStepNavigation,
      onNextButtonClick: handleNextButtonClick,
      onPreviousButtonClick: handlePreviousButtonClick,
      onStepNavigationClick: handleStepNavigationClick,
      onSubmitButtonClick: onSubmitButtonClick,
      onCancelButtonClick: onCancelButtonClick,
    };

    return <WizardInner key={activeStepIndex} {...wizardInnerProps} />;
  }
);
