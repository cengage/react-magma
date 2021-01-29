import * as React from 'react';
import { Heading, HeadingProps } from '../Heading';
import { Paragraph, ParagraphProps } from '../Paragraph';
import { TabsOrientation } from '../Tabs';
import { I18nContext } from '../../i18n';
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
  orientation?: TabsOrientation;
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
  optionalText?: string;
  children?: React.ReactNode;
}

const Step = styled.div<{
  orientation?: TabsOrientation;
  theme?: ThemeInterface;
}>`
  padding: ${props =>
    props.orientation === TabsOrientation.vertical
      ? `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05}`
      : props.theme.spaceScale.spacing05};
`;

const StyledHeading = styled(Heading)`
  margin-top: 0;
`;

export const WizardStep = React.forwardRef<HTMLDivElement, WizardStepProps>(
  (props, ref) => {
    const i18n = React.useContext(I18nContext);
    const theme = React.useContext(ThemeContext);

    const {
      children,
      description,
      headingProps,
      optional,
      optionalText,
      orientation,
    } = props;

    return (
      <Step ref={ref} orientation={orientation} theme={theme}>
        <StyledHeading level={4} {...headingProps}>
          {props.title}
          {optional ? ` - ${optionalText || i18n.wizard.optional}` : ''}
        </StyledHeading>
        {description && <Paragraph>{props.description}</Paragraph>}
        {children}
      </Step>
    );
  }
);
