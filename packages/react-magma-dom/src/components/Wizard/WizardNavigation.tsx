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
  navigationLabel: string;
}

export const WizardNavigation = React.forwardRef<
  TabsProps,
  WizardNavigationProps
>((props, ref) => {
  return (
    <Tabs
      aria-label={props.navigationLabel}
      onChange={index =>
        props.onStepNavigationClick({ requestedStepIndex: index })
      }
      orientation={props.orientation}
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
