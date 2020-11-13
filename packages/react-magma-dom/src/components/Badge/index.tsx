import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { darken, lighten } from 'polished';

export interface BadgeProps extends React.HTMLAttributes<HTMLButtonElement> {
  color?: BadgeColor;
  onClick?: () => void;
  testId?: string;
  variant?: BadgeVariant;
}

export enum BadgeColor {
  danger = 'danger',
  primary = 'primary',
  secondary = 'secondary', // default
  success = 'success',
  light = 'light',
}

export enum BadgeVariant {
  counter = 'counter',
  label = 'label', // default
}

export function buildBadgeBackground(props) {
  switch (props.color) {
    case 'danger':
      return props.theme.colors.danger;
    case 'light':
      return props.theme.colors.neutral07;
    case 'primary':
      return props.theme.colors.primary;
    case 'secondary':
      return props.theme.colors.neutral02;
    case 'success':
      return props.theme.colors.success;

    default:
      return props.theme.colors.neutral02;
  }
}

export function buildBadgeFocusBackground(props) {
  switch (props.color) {
    case 'danger':
      return darken(0.1, props.theme.colors.danger);
    case 'light':
      return lighten(0.05, props.theme.colors.neutral07);
    case 'primary':
      return darken(0.1, props.theme.colors.primary);
    case 'secondary':
      return darken(0.1, props.theme.colors.neutral02);
    case 'success':
      return darken(0.1, props.theme.colors.success);

    default:
      return darken(0.1, props.theme.colors.neutral02);
  }
}

export function buildBadgeActiveBackground(props) {
  switch (props.color) {
    case 'danger':
      return darken(0.2, props.theme.colors.danger);
    case 'light':
      return lighten(0.1, props.theme.colors.neutral07);
    case 'primary':
      return darken(0.2, props.theme.colors.primary);
    case 'secondary':
      return darken(0.2, props.theme.colors.neutral02);
    case 'success':
      return darken(0.2, props.theme.colors.success);

    default:
      return darken(0.2, props.theme.colors.neutral02);
  }
}

export const baseBadgeStyles = props => css`
  background: ${buildBadgeBackground(props)};
  border: 1px solid;
  border-color: ${props.color === BadgeColor.light
    ? props.theme.colors.neutral06
    : 'transparent'};
  border-radius: ${props.variant === BadgeVariant.counter
    ? props.theme.spaceScale.spacing06
    : props.theme.borderRadius};
  color: ${props.color === 'light'
    ? props.theme.colors.neutral
    : props.theme.colors.neutral08};
  display: inline-block;
  font-weight: bold;
  font-size: ${props.variant === BadgeVariant.counter
    ? props.theme.typeScale.size02.fontSize
    : props.theme.typeScale.size01.fontSize};
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
    : `${props.theme.spaceScale.spacing01} ${props.theme.spaceScale.spacing02}`};
  text-align: ${props.variant == BadgeVariant.counter ? 'center' : 'inherit'};
`;

const StyledSpan = styled.span<BadgeProps>`
  ${baseBadgeStyles};
`;

const StyledButton = styled.button<BadgeProps>`
  ${baseBadgeStyles};
  cursor: pointer;
  transition: background 0.35s;

  &:hover,
  &:focus {
    background: ${props => buildBadgeFocusBackground(props)};
  }

  &:active {
    background: ${props => buildBadgeActiveBackground(props)};
  }
`;

function getStyledBadgeComponent(isClickable: boolean) {
  return isClickable ? StyledButton : StyledSpan;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (props, ref) => {
    const { children, onClick, testId, variant, ...other } = props;

    const BadgeComponent = getStyledBadgeComponent(Boolean(onClick));

    const theme = React.useContext(ThemeContext);

    return (
      <BadgeComponent
        {...other}
        data-testid={testId}
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
