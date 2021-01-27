import * as React from 'react';
import { Heading, HeadingProps } from '../Heading';
import { Paragraph, ParagraphProps } from '../Paragraph';

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
  /**
   * @internal
   */
  optionalText: string;
  children?: React.ReactNode;
}

export const WizardStep = React.forwardRef<HTMLDivElement, WizardStepProps>(
  (props, ref) => {
    return (
      <div>
        <Heading level={4} {...props.headingProps}>
          {props.title}
          {props.optional ? ' - ${props.optionalText}' : ''}
        </Heading>
        {props.description && <Paragraph>{props.description}</Paragraph>}
        {props.children}
      </div>
    );
  }
);
