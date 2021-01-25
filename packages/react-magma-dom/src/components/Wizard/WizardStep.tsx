import * as React from 'react';
import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';

export interface WizardStepProps {
  /**
   * The title to be rendered for the wizard step.
   */
  title: string;
  /**
   * The description to be rendered for the wizard step.
   */
  description?: string;
  /**
   * Flag to display the optional text next to the step title in the wizard navigation.
   */
  optional?: boolean;
  children?: React.ReactNode;
}

export const WizardStep = React.forwardRef<HTMLDivElement, WizardStepProps>(
  (props, ref) => {
    return (
      <div>
        <Heading level={4}>
          {props.title}
          {props.optional ? ' - optional' : ''}
        </Heading>
        {props.description && <Paragraph>{props.description}</Paragraph>}
        {props.children}
      </div>
    );
  }
);
