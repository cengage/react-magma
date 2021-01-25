import * as React from 'react';
import { WizardStepProps } from '.';
import { Tabs, TabsOrientation, TabsProps } from '../Tabs';
import { Tab } from '../Tabs/Tab';

export interface NavigationStepClickProps {
  requestedStepIndex: number;
}

export interface WizardNavigationProps {
  steps: WizardStepProps[];
  maxStepIndex: number;
  onStepNavigationClick?: (stepClickDetail: NavigationStepClickProps) => void;
  orientation: TabsOrientation;
  optionalText: string;
}

export const WizardNavigation = React.forwardRef<
  TabsProps,
  WizardNavigationProps
>((props, ref) => {
  return (
    <Tabs
      orientation={props.orientation}
      onChange={index =>
        props.onStepNavigationClick({ requestedStepIndex: index })
      }
      aria-label="Navigation for the wizard"
    >
      {props.steps.map((step, index) => (
        <Tab key={index} disabled={index > props.maxStepIndex}>
          {step.title}
          {step.optional ? ` - ${props.optionalText}` : ''}
        </Tab>
      ))}
    </Tabs>
  );
});
