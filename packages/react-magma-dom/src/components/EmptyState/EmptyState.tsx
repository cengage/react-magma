import * as React from 'react';

import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';

import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { Button, ButtonColor, ButtonVariant } from '../Button';
import { Spinner } from '../Spinner';

/**
 * Action button configuration
 */
export interface EmptyStateAction {
  /** Button label text */
  label: string;
  /** Click handler */
  onClick: () => void;
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Body/description text (omit to hide body) */
  body?: string;
  /** Custom content rendered between text and action buttons */
  children?: React.ReactNode;
  /** Use danger/error color scheme (red) */
  isDanger?: boolean;
  /** Use inverse (dark) color scheme */
  isInverse?: boolean;
  /** Show loading spinner instead of content */
  isLoading?: boolean;
  /** Icon or image to display in the illustration area */
  illustration?: React.ReactNode;
  /** Primary action button - solid primary */
  primaryAction?: EmptyStateAction;
  /** Secondary action button - solid secondary (outlined) */
  secondaryAction?: EmptyStateAction;
  /** Tertiary action button - link primary */
  tertiaryAction?: EmptyStateAction;
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

interface StyledHeaderProps {
  theme: ThemeInterface;
}

const StyledHeader = styled('div', {
  shouldForwardProp: isPropValid,
})<StyledHeaderProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spaceScale.spacing03};
  width: 100%;
`;

interface StyledTitleProps {
  isInverse?: boolean;
  theme: ThemeInterface;
}

const StyledTitle = styled('h3', {
  shouldForwardProp: isPropValid,
})<StyledTitleProps>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  font-size: ${props =>
    props.theme.typographyVisualStyles.bodyMedium.mobile.fontSize};
  font-weight: 600;
  line-height: ${props =>
    props.theme.typographyVisualStyles.bodyMedium.mobile.lineHeight};
  margin: 0;

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVisualStyles.bodyMedium.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVisualStyles.bodyMedium.desktop.lineHeight};
  }
`;

interface StyledBodyProps {
  isInverse?: boolean;
  theme: ThemeInterface;
}

const StyledBody = styled('p', {
  shouldForwardProp: isPropValid,
})<StyledBodyProps>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral200
      : props.theme.colors.neutral500};
  font-size: ${props =>
    props.theme.typographyVisualStyles.bodyMedium.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVisualStyles.bodyMedium.mobile.lineHeight};
  margin: 0;

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVisualStyles.bodyMedium.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVisualStyles.bodyMedium.desktop.lineHeight};
  }
`;

interface StyledButtonGroupProps {
  theme: ThemeInterface;
}

const StyledButtonGroup = styled('div', {
  shouldForwardProp: isPropValid,
})<StyledButtonGroupProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spaceScale.spacing04};
`;

const StyledButtonRow = styled('div', {
  shouldForwardProp: isPropValid,
})<StyledButtonGroupProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${props => props.theme.spaceScale.spacing04};
`;

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (props, ref) => {
    const {
      body,
      children,
      illustration,
      isDanger = false,
      isLoading = false,
      primaryAction,
      secondaryAction,
      tertiaryAction,
      testId,
      title,
      ...rest
    } = props;

    const isInverse = useIsInverse(props.isInverse);
    const theme = React.useContext(ThemeContext);

    const hasActions = primaryAction || secondaryAction || tertiaryAction;

    if (isLoading) {
      return (
        <StyledEmptyState
          {...rest}
          data-testid={testId}
          isInverse={isInverse}
          ref={ref}
          theme={theme}
        >
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
        </StyledEmptyState>
      );
    }

    return (
      <StyledEmptyState
        {...rest}
        data-testid={testId}
        isInverse={isInverse}
        ref={ref}
        theme={theme}
      >
        {(illustration || title || body) && (
          <StyledHeader theme={theme}>
            {illustration && (
              <StyledIllustrationContainer
                aria-hidden="true"
                isDanger={isDanger}
                isInverse={isInverse}
                theme={theme}
              >
                {illustration}
              </StyledIllustrationContainer>
            )}
            {title && (
              <StyledTitle isInverse={isInverse} theme={theme}>
                {title}
              </StyledTitle>
            )}
            {body && (
              <StyledBody isInverse={isInverse} theme={theme}>
                {body}
              </StyledBody>
            )}
          </StyledHeader>
        )}
        {children}
        {hasActions && (
          <StyledButtonGroup theme={theme}>
            {(primaryAction || secondaryAction) && (
              <StyledButtonRow theme={theme}>
                {primaryAction && (
                  <Button
                    color={ButtonColor.primary}
                    isInverse={isInverse}
                    onClick={primaryAction.onClick}
                  >
                    {primaryAction.label}
                  </Button>
                )}
                {secondaryAction && (
                  <Button
                    color={ButtonColor.secondary}
                    isInverse={isInverse}
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.label}
                  </Button>
                )}
              </StyledButtonRow>
            )}
            {tertiaryAction && (
              <Button
                color={ButtonColor.primary}
                isInverse={isInverse}
                onClick={tertiaryAction.onClick}
                variant={ButtonVariant.link}
              >
                {tertiaryAction.label}
              </Button>
            )}
          </StyledButtonGroup>
        )}
      </StyledEmptyState>
    );
  }
);

EmptyState.displayName = 'EmptyState';
