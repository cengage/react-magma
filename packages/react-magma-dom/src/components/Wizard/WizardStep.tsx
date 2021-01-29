import * as React from 'react';
import { Heading, HeadingProps } from '../Heading';
import { Paragraph, ParagraphProps } from '../Paragraph';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import styled from '@emotion/styled';

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

const Step = styled.div<{ theme?: ThemeInterface }>`
  padding: ${props => props.theme.spaceScale.spacing05};
`;

const StyledHeading = styled(Heading)`
  margin-top: 0;
`;

export const WizardStep = React.forwardRef<HTMLDivElement, WizardStepProps>(
  (props, ref) => {
    const theme = React.useContext(ThemeContext);

    return (
      <Step ref={ref} theme={theme}>
        <StyledHeading level={4} {...props.headingProps}>
          {props.title}
          {props.optional ? ' - ${props.optionalText}' : ''}
        </StyledHeading>
        {props.description && <Paragraph>{props.description}</Paragraph>}
        {props.children}
      </Step>
    );
  }
);
