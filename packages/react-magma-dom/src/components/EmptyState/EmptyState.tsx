import * as React from 'react';

import styled from '@emotion/styled';

import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { Button, ButtonColor, ButtonVariant } from '../Button';
import { Spinner } from '../Spinner';

/**
 * Size options for the illustration container
 */
export enum EmptyStateIllustrationSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  '2xl' = '2xl',
}

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
  /** Use danger/error color scheme (red) */
  isDanger?: boolean;
  /** Use inverse (dark) color scheme */
  isInverse?: boolean;
  /** Show loading spinner instead of content */
  isLoading?: boolean;
  /** Icon or image to display in the illustration area */
  illustration?: React.ReactNode;
  /** Size of the illustration container */
  illustrationSize?: EmptyStateIllustrationSize;
  /** Primary action button - uses React Magma Button (filled variant) */
  primaryAction?: EmptyStateAction;
  /** Secondary action button - uses React Magma Button (link variant) */
  secondaryAction?: EmptyStateAction;
  /**
   * @internal
   */
  testId?: string;
  /** Title text (omit to hide title) */
  title?: string;
  /** Layout orientation - vertical (stacked) or horizontal (side-by-side) */
  vertical?: boolean;
}

interface StyledEmptyStateProps {
  isInverse?: boolean;
  theme: ThemeInterface;
  vertical?: boolean;
}

const StyledEmptyState = styled.div<StyledEmptyStateProps>`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spaceScale.spacing05};
  font-family: ${props => props.theme.bodyFont};
  margin: 0 auto;
  max-width: 450px;
  min-width: 240px;
  text-align: center;

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    flex-direction: ${props => (props.vertical ? 'column' : 'row')};
    max-width: ${props => (props.vertical ? '450px' : '500px')};
    text-align: ${props => (props.vertical ? 'center' : 'left')};
  }
`;

interface StyledIllustrationContainerProps {
  isDanger?: boolean;
  isInverse?: boolean;
  size: EmptyStateIllustrationSize;
  theme: ThemeInterface;
}

function getIllustrationSizePx(size: EmptyStateIllustrationSize): string {
  const sizeMap: Record<EmptyStateIllustrationSize, string> = {
    sm: '48px',
    md: '64px',
    lg: '80px',
    xl: '96px',
    '2xl': '120px',
  };

  return sizeMap[size] || '80px';
}

function getIllustrationBackground(
  props: StyledIllustrationContainerProps
): string {
  if (props.isInverse) {
    return props.isDanger
      ? props.theme.colors.danger200
      : props.theme.colors.primary300;
  }

  return props.isDanger
    ? props.theme.colors.danger100
    : props.theme.colors.primary100;
}

function getIllustrationIconColor(
  props: StyledIllustrationContainerProps
): string {
  if (props.isInverse) {
    return props.isDanger
      ? props.theme.colors.danger700
      : props.theme.colors.primary700;
  }

  return props.isDanger
    ? props.theme.colors.danger500
    : props.theme.colors.primary500;
}

const StyledIllustrationContainer = styled.div<StyledIllustrationContainerProps>`
  align-items: center;
  background: ${props => getIllustrationBackground(props)};
  border-radius: 50%;
  color: ${props => getIllustrationIconColor(props)};
  display: flex;
  flex-shrink: 0;
  height: ${props => getIllustrationSizePx(props.size)};
  justify-content: center;
  width: ${props => getIllustrationSizePx(props.size)};

  svg {
    height: 50%;
    width: 50%;
  }
`;

interface StyledContentProps {
  isInverse?: boolean;
  theme: ThemeInterface;
  vertical?: boolean;
}

const StyledContent = styled.div<StyledContentProps>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spaceScale.spacing05};
  align-items: center;

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    align-items: ${props => (props.vertical ? 'center' : 'flex-start')};
  }
`;

interface StyledTextContentProps {
  theme: ThemeInterface;
  vertical?: boolean;
}

const StyledTextContent = styled.div<StyledTextContentProps>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spaceScale.spacing03};
  text-align: center;
  width: 100%;

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    text-align: ${props => (props.vertical ? 'center' : 'left')};
  }
`;

interface StyledTitleProps {
  isInverse?: boolean;
  theme: ThemeInterface;
}

const StyledTitle = styled.h3<StyledTitleProps>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  font-size: ${props =>
    props.theme.typographyVisualStyles.headingSmall.mobile.fontSize};
  font-weight: ${props =>
    props.theme.typographyVisualStyles.headingSmall.fontWeight};
  line-height: ${props =>
    props.theme.typographyVisualStyles.headingSmall.mobile.lineHeight};
  margin: 0;

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVisualStyles.headingSmall.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVisualStyles.headingSmall.desktop.lineHeight};
  }
`;

interface StyledBodyProps {
  isInverse?: boolean;
  theme: ThemeInterface;
}

const StyledBody = styled.p<StyledBodyProps>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
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

interface StyledButtonContainerProps {
  theme: ThemeInterface;
}

const StyledButtonContainer = styled.div<StyledButtonContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spaceScale.spacing03};
  align-items: center;
  width: 100%;

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    flex-direction: row;
    width: auto;
  }
`;

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (props, ref) => {
    const {
      body,
      children,
      illustration,
      illustrationSize = EmptyStateIllustrationSize.lg,
      isDanger = false,
      isLoading = false,
      primaryAction,
      secondaryAction,
      testId,
      title,
      vertical = true,
      ...rest
    } = props;

    const isInverse = useIsInverse(props.isInverse);
    const theme = React.useContext(ThemeContext);

    const hasActions = primaryAction || secondaryAction;
    const hasContent = title || body || hasActions;

    if (isLoading) {
      return (
        <StyledEmptyState
          {...rest}
          data-testid={testId}
          isInverse={isInverse}
          ref={ref}
          theme={theme}
          vertical={vertical}
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
        vertical={vertical}
      >
        {illustration && (
          <StyledIllustrationContainer
            aria-hidden="true"
            isDanger={isDanger}
            isInverse={isInverse}
            size={illustrationSize}
            theme={theme}
          >
            {illustration}
          </StyledIllustrationContainer>
        )}
        {hasContent && (
          <StyledContent
            isInverse={isInverse}
            theme={theme}
            vertical={vertical}
          >
            {(title || body) && (
              <StyledTextContent theme={theme} vertical={vertical}>
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
              </StyledTextContent>
            )}
            {hasActions && (
              <StyledButtonContainer theme={theme}>
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
                    variant={ButtonVariant.link}
                  >
                    {secondaryAction.label}
                  </Button>
                )}
              </StyledButtonContainer>
            )}
          </StyledContent>
        )}
        {children}
      </StyledEmptyState>
    );
  }
);

EmptyState.displayName = 'EmptyState';
