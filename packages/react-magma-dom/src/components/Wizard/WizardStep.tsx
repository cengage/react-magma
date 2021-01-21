import * as React from 'react';
import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';

export interface WizardStepProps {
  title: string;
  description?: string;
  optional?: boolean;
  children: React.ReactNode;
}

interface InternalWizardStepProps {
  step: WizardStepProps;
}

export const WizardStep = React.forwardRef<
  HTMLDivElement,
  InternalWizardStepProps
>((props, ref) => {
  return (
    <div>
      <Heading level={4}>
        {props.step.title}
        {props.step.optional ? ' - optional' : ''}
      </Heading>
      {props.step.description && (
        <Paragraph>{props.step.description}</Paragraph>
      )}
      {props.step.children}
    </div>
  );
});
