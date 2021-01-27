import * as React from 'react';
import {
  WizardStepProps,
  WizardInner,
  WizardInnerProps,
  NavigationStepClickProps,
} from '.';
import { TabsOrientation } from '../Tabs/shared';
import { HeadingProps } from '../Heading';
import { ParagraphProps } from '../Paragraph';

export interface WizardProps {
  /**
   * Array of steps for the wizard to use.
   */
  steps: WizardStepProps[];
  /**
   * The index of the current active step. You can use this for managing state of the wizard component by your custom logic.
   */
  activeStepIndex?: number;
  /**
   * Orientation of the tabs
   * @default TabsOrientation.Horizontal
   */
  orientation?: TabsOrientation;
  /**
   * Renders the loading button as loading for asynchronous states such as server side validation.
   */
  isLoadingNextStep?: boolean;
  /**
   * Fired when a user clicks the cancel button.
   */
  onCancelButtonClick?: () => void;
  /**
   * Fired when the user clicks the previous button.
   */
  onPreviousButtonClick?: (
    navigationStepClickProps: NavigationStepClickProps
  ) => void;
  /**
   * Fired when the user clicks the next button.
   */
  onNextButtonClick?: (
    navigationStepClickProps: NavigationStepClickProps
  ) => boolean;
  /**
   * Fired when the user clicks submit.
   */
  onSubmitButtonClick?: () => void;
  /**
   * Fired when the user clicks on a step from the navigation.
   */
  onStepNavigationClick?: (
    navigationStepClickProps: NavigationStepClickProps
  ) => void;
  /**
   * Text rendered next to an optional step.
   */
  optionalText?: string;
  /**
   * Optional props to pass to the heading.
   * @internal
   */
  headingProps?: HeadingProps;
  /**
   * Optional props to pass to the description.
   * @internal
   */
  paragraphProps?: ParagraphProps;
}

export const Wizard = React.forwardRef<HTMLDivElement, WizardProps>(
  (
    {
      steps,
      headingProps,
      paragraphProps,
      optionalText,
      isLoadingNextStep = false,
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
      isLoadingNextStep,
      onNextButtonClick: handleNextButtonClick,
      onPreviousButtonClick: handlePreviousButtonClick,
      onStepNavigationClick: handleStepNavigationClick,
      onSubmitButtonClick: onSubmitButtonClick,
      onCancelButtonClick: onCancelButtonClick,
      headingProps,
      paragraphProps,
    };

    return <WizardInner key={activeStepIndex} {...wizardInnerProps} />;
  }
);
