import * as React from 'react';
import { Alert } from '../Alert';
import { AlertVariant } from '../AlertBase';
import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { InverseContext, useIsInverse } from '../../inverse';
import styled from '@emotion/styled';
import { TypographyContextVariant, TypographyVisualStyle } from '../Typography';

/**
 * @children required
 */
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /**
   * React Node containing the form action buttons; will appear under the form fields
   */
  actions: React.ReactNode;
  /**
   * General description of the form
   */
  description?: string;
  /**
   * Additional form level validation message
   */
  errorMessage?: string;
  /**
   * Title of the form
   */
  header: string;
  /**
   * Additional styles to the form heading for typography based on the context of the content
   * @default TypographyColor.default
   */
  headingContextVariant?: TypographyContextVariant;
  /**
   * Number to indicate which level heading will render for the form header (e.g. h1, h2 etc.)
   * @default 3
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Applies visual styles to the form heading including font-size, font-weight, line-height and margins
   */
  headingVisualStyle?: TypographyVisualStyle;
  isInverse?: boolean;
  /**
   * @internal
   */
  testId?: string;
}

const StyledForm = styled.form<{ isInverse?: boolean; theme: ThemeInterface }>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.primary600
      : props.theme.colors.neutral100};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral};
  font-family: ${props => props.theme.bodyFont};
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (props, ref) => {
    const {
      actions,
      children,
      header,
      headingContextVariant,
      headingLevel = 3,
      headingVisualStyle,
      description,
      errorMessage,
      testId,
      ...other
    } = props;

    const theme = React.useContext(ThemeContext);

    const isInverse = useIsInverse(props.isInverse);

    return (
      <InverseContext.Provider
        value={{
          isInverse,
        }}
      >
        <StyledForm
          ref={ref}
          data-testid={testId}
          isInverse={isInverse}
          theme={theme}
          {...other}
        >
          <Heading
            contextVariant={headingContextVariant}
            level={headingLevel}
            visualStyle={headingVisualStyle}
          >
            {header}
          </Heading>
          {description && <Paragraph>{description}</Paragraph>}
          {errorMessage && (
            <Alert variant={AlertVariant.danger}>{errorMessage}</Alert>
          )}
          <div>{children}</div>
          <FormActions>{actions}</FormActions>
        </StyledForm>
      </InverseContext.Provider>
    );
  }
);
