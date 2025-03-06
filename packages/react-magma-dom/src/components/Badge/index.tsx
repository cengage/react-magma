import * as React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';

import { ThemeContext } from '../../theme/ThemeContext';

/**
 * @children required
 */

export interface BadgeProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * The color variant of the badge
   * @default BadgeColor.primary
   */
  color?: BadgeColor;
  isInverse?: boolean;
  /**
   * Action that fires when the badge is clicked. Causes the Badge to render as a button instead of a span.
   */
  onClick?: () => void;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Indicates the style variant of the component
   * @default BadgeVariant.label
   */
  variant?: BadgeVariant;
}

export enum BadgeColor {
  danger = 'danger',
  primary = 'primary', // default
  secondary = 'secondary',
  success = 'success',
  light = 'light',
}

export enum BadgeVariant {
  counter = 'counter',
  label = 'label', // default
}

export function buildBadgeBackground(props) {
  if (props.isInverse) {
    switch (props.color) {
      case BadgeColor.danger:
        return props.theme.colors.danger200;
      case BadgeColor.light:
        return 'transparent';
      case BadgeColor.primary:
        return props.theme.colors.tertiary;
      case BadgeColor.secondary:
        return props.theme.colors.neutral100;
      case BadgeColor.success:
        return props.theme.colors.success200;

      default:
        return props.theme.colors.tertiary;
    }
  }

  switch (props.color) {
    case BadgeColor.danger:
      return props.theme.colors.danger;
    case BadgeColor.light:
      return props.theme.colors.neutral100;
    case BadgeColor.primary:
      return props.theme.colors.primary;
    case BadgeColor.secondary:
      return props.theme.colors.neutral700;
    case BadgeColor.success:
      return props.theme.colors.success;

    default:
      return props.theme.colors.primary;
  }
}

export function buildBadgeTextColor(props) {
  if (props.isInverse) {
    switch (props.color) {
      case BadgeColor.danger:
        return props.theme.colors.danger700;
      case BadgeColor.light:
        return props.theme.colors.neutral100;
      case BadgeColor.primary:
        return props.theme.colors.primary600;
      case BadgeColor.secondary:
        return props.theme.colors.neutral700;
      case BadgeColor.success:
        return props.theme.colors.success700;

      default:
        return props.theme.colors.primary600;
    }
  }
  if (props.color === BadgeColor.light) {
    return props.theme.colors.neutral700;
  }
  return props.theme.colors.neutral100;
}

export function buildBadgeBorderColor(props) {
  if (props.color === BadgeColor.light) {
    if (props.isInverse) {
      return transparentize(0.3, props.theme.colors.neutral100);
    }
    return props.color;
  }
  return 'transparent';
}

export const baseBadgeStyles = props => css`
  background: ${buildBadgeBackground(props)};
  border: 1px solid;
  border-color: ${buildBadgeBorderColor(props)};
  border-radius: ${props.variant === BadgeVariant.counter
    ? props.theme.spaceScale.spacing06
    : props.theme.borderRadiusSmall};
  color: ${buildBadgeTextColor(props)};
  display: inline-block;
  font-weight: 500;
  font-size: ${props.variant === BadgeVariant.counter
    ? props.theme.typeScale.size02.fontSize
    : props.theme.typeScale.size01.fontSize};
  font-family: ${props.theme.bodyFont};
  letter-spacing: ${props.variant === BadgeVariant.counter
    ? props.theme.typeScale.size02.letterSpacing
    : props.theme.typeScale.size01.letterSpacing};
  line-height: ${props.variant === BadgeVariant.counter
    ? props.theme.typeScale.size02.lineHeight
    : props.theme.typeScale.size01.lineHeight};
  margin: ${props.variant === BadgeVariant.counter
    ? `0 0 0 ${props.theme.spaceScale.spacing03}`
    : `0 ${props.theme.spaceScale.spacing03} 0 0`};
  max-height: ${props.variant === BadgeVariant.counter
    ? props.theme.spaceScale.spacing06
    : 'auto'};
  min-width: ${props.theme.spaceScale.spacing06};
  padding: ${props.variant === BadgeVariant.counter
    ? `1px ${props.theme.spaceScale.spacing02}`
    : `3px  ${props.theme.spaceScale.spacing02}`};
  text-align: ${props.variant == BadgeVariant.counter ? 'center' : 'inherit'};
`;

const StyledSpan = styled.span<BadgeProps>`
  ${baseBadgeStyles};
`;

const StyledButton = styled.button<BadgeProps>`
  ${baseBadgeStyles};
  cursor: pointer;

  &:focus {
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
  }
`;

function getStyledBadgeComponent(isClickable: boolean) {
  return isClickable ? StyledButton : StyledSpan;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (props, ref) => {
    const { children, isInverse, onClick, testId, variant, ...other } = props;

    const BadgeComponent = getStyledBadgeComponent(Boolean(onClick));

    const theme = React.useContext(ThemeContext);

    return (
      <BadgeComponent
        {...other}
        data-testid={testId}
        isInverse={isInverse}
        variant={variant ? variant : BadgeVariant.label}
        onClick={onClick}
        ref={ref}
        theme={theme}
      >
        {children}
      </BadgeComponent>
    );
  }
);
