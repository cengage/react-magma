import * as React from 'react';
import { WizardStepProps } from '.';
import {
  Tab,
  Tabs,
  TabsOrientation,
  TabsProps,
  Orientation,
} from 'react-magma-dom';

export interface NavigationStepClickProps {
  requestedStepIndex: number;
}

export interface WizardNavigationProps extends TabsProps {
  maxStepIndex: number;
  onStepNavigationClick?: (stepClickDetail: NavigationStepClickProps) => void;
  optionalText: string;
  orientation?: TabsOrientation;
  steps: WizardStepProps[];
}

export const WizardNavigation = React.forwardRef<
  HTMLDivElement,
  WizardNavigationProps & Orientation
>(props => {
  const { maxStepIndex, onStepNavigationClick, optionalText, ...other } = props;

  function handleTabsChange(index: number) {
    if (onStepNavigationClick) {
      onStepNavigationClick({ requestedStepIndex: index });
    }
  }

  return (
    <Tabs onChange={handleTabsChange} {...other}>
      {props.steps.map((step, index) => (
        <Tab key={index} disabled={index > maxStepIndex}>
          {step.title}
          {step.optional ? ` - ${optionalText}` : ''}
        </Tab>
      ))}
    </Tabs>
  );
});
