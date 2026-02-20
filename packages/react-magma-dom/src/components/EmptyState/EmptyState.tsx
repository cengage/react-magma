import * as React from 'react';

import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';

import { InverseContext, useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';
import { Spinner } from '../Spinner';
import {
  TypographyColor,
  TypographyContextVariant,
  TypographyVisualStyle,
} from '../Typography';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Actions rendered below the content area (compose your own Buttons / ButtonGroup) */
  actions?: React.ReactNode;
  /** Custom content rendered between text and actions */
  additionalContent?: React.ReactNode;
  /** Description text displayed below the title (omit to hide) */
  description?: string;
  /** Icon element to display in the circular illustration area */
  icon?: React.ReactElement;
  /** Use danger/error color scheme (red) */
  isDanger?: boolean;
  /** Use inverse (dark) color scheme */
  isInverse?: boolean;
  /** Show loading spinner instead of content */
  isLoading?: boolean;
  /**
   * @internal
   */
  testId?: string;
  /** Title text (omit to hide title) */
  title?: string;
}

interface StyledEmptyStateProps {
  isInverse?: boolean;
  theme: ThemeInterface;
}

const StyledEmptyState = styled('div', {
  shouldForwardProp: isPropValid,
})<StyledEmptyStateProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spaceScale.spacing05};
  margin: 0 auto;
  max-width: 450px;
  min-width: 240px;
  font-family: ${props => props.theme.bodyFont};
  text-align: center;
`;

interface StyledIllustrationContainerProps {
  isDanger?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}

function getIllustrationBackground(
  props: StyledIllustrationContainerProps
): string {
  if (props.isInverse) {
    return props.isDanger
      ? props.theme.colors.danger700
      : props.theme.colors.primary500;
  }

  return props.isDanger
    ? props.theme.colors.danger100
    : props.theme.colors.primary100;
}

function getIllustrationIconColor(
  props: StyledIllustrationContainerProps
): string {
  if (props.isInverse) {
    return props.theme.colors.neutral100;
  }

  return props.isDanger
    ? props.theme.colors.danger500
    : props.theme.colors.primary500;
}

const StyledIllustrationContainer = styled('div', {
  shouldForwardProp: isPropValid,
})<StyledIllustrationContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${props => props.theme.spaceScale.spacing10};
  height: ${props => props.theme.spaceScale.spacing10};
  background: ${props => getIllustrationBackground(props)};
  border-radius: 50%;
  color: ${props => getIllustrationIconColor(props)};

  svg {
    width: ${props => props.theme.spaceScale.spacing07};
    height: ${props => props.theme.spaceScale.spacing07};
  }
`;

const StyledHeader = styled('div')<{ theme: ThemeInterface }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spaceScale.spacing03};
  width: 100%;
`;

const StyledActions = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;

  && > * {
    justify-content: center;
  }
`;

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (props, ref) => {
    const {
      actions,
      additionalContent,
      description,
      icon,
      isDanger = false,
      isLoading = false,
      testId,
      title,
      ...rest
    } = props;

    const isInverse = useIsInverse(props.isInverse);
    const theme = React.useContext(ThemeContext);
    const descriptionColor = isInverse
      ? TypographyColor.default
      : TypographyColor.subdued;

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <StyledEmptyState
          {...rest}
          data-testid={testId}
          isInverse={isInverse}
          ref={ref}
          theme={theme}
        >
          {isLoading ? (
            <Spinner
              color={
                isInverse
                  ? theme.colors.neutral100
                  : isDanger
                    ? theme.colors.danger500
                    : theme.colors.primary500
              }
              isInverse={isInverse}
              size={48}
            />
          ) : (
            <>
              {(icon || title || description) && (
                <StyledHeader theme={theme}>
                  {icon && (
                    <StyledIllustrationContainer
                      aria-hidden="true"
                      isDanger={isDanger}
                      isInverse={isInverse}
                      theme={theme}
                    >
                      {icon}
                    </StyledIllustrationContainer>
                  )}
                  {title && (
                    <Heading
                      level={3}
                      visualStyle={TypographyVisualStyle.heading2XSmall}
                      contextVariant={TypographyContextVariant.expressive}
                      noMargins
                      isInverse={isInverse}
                      style={{
                        color: isInverse
                          ? theme.colors.neutral100
                          : theme.colors.neutral700,
                      }}
                    >
                      {title}
                    </Heading>
                  )}
                  {description && (
                    <Paragraph
                      isInverse={isInverse}
                      noMargins
                      color={descriptionColor}
                    >
                      {description}
                    </Paragraph>
                  )}
                </StyledHeader>
              )}
              {additionalContent}
              {actions && <StyledActions>{actions}</StyledActions>}
            </>
          )}
        </StyledEmptyState>
      </InverseContext.Provider>
    );
  }
);

EmptyState.displayName = 'EmptyState';
