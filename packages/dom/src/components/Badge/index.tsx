import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { darken, lighten } from 'polished';

/**
 * @children required
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * The color variant of the badge
   * @default BadgeColor.primary
   */
  color?: BadgeColor;
  /**
   * Action that fires when the badge is clicked. Causes the Badge to render as a button instead of a span.
   */
  onClick?: () => void;
  testId?: string;
  /**
   * Indicates the style variant of the component
   * @default BadgeVariant.label
   */
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
      return 'var(--colors-danger)';
    case 'light':
      return 'var(--colors-neutral07)';
    case 'primary':
      return 'var(--colors-primary)';
    case 'secondary':
      return 'var(--colors-neutral02)';
    case 'success':
      return 'var(--colors-success)';

    default:
      return 'var(--colors-neutral02)';
  }
}

export function buildBadgeFocusBackground(props) {
  switch (props.color) {
    case 'danger':
      return darken(0.1, '#C61D23');
    case 'light':
      return lighten(0.05, '#F7F7F7');
    case 'primary':
      return darken(0.1, '#006298');
    case 'secondary':
      return darken(0.1, '#575757');
    case 'success':
      return darken(0.1, '#3A8200');

    default:
      return darken(0.1, '#575757');
  }
}

export function buildBadgeActiveBackground(props) {
  switch (props.color) {
    case 'danger':
      return darken(0.2, '#C61D23');
    case 'light':
      return lighten(0.1, '#F7F7F7');
    case 'primary':
      return darken(0.2, '#006298');
    case 'secondary':
      return darken(0.2, '#575757');
    case 'success':
      return darken(0.2, '#3A8200');

    default:
      return darken(0.2, '#575757');
  }
}

export const baseBadgeStyles = props => css`
  background: ${buildBadgeBackground(props)};
  border: 1px solid;
  border-color: ${props.color === BadgeColor.light
    ? 'var(--colors-neutral06)'
    : 'transparent'};
  border-radius: ${props.variant === BadgeVariant.counter
    ? 'var(--spaceScale-spacing06)'
    : 'var(--borderRadius)'};
  color: ${props.color === 'light'
    ? 'var(--colors-neutral)'
    : 'var(--colors-neutral08)'};
  display: inline-block;
  font-weight: bold;
  font-size: ${props.variant === BadgeVariant.counter
    ? 'var(--typeScale-size02-fontSize)'
    : 'var(--typeScale-size01-fontSize)'};
  line-height: ${props.variant === BadgeVariant.counter
    ? 'var(--typeScale-size02-lineHeight)'
    : 'var(--typeScale-size01-lineHeight)'};
  margin: ${props.variant === BadgeVariant.counter
    ? '0 0 0 var(--spaceScale-spacing03)'
    : '0 var(--spaceScale-spacing03) 0 0'};
  max-height: ${props.variant === BadgeVariant.counter
    ? 'var(--spaceScale-spacing06)'
    : 'auto'};
  min-width: var(--spaceScale-spacing06);
  padding: ${props.variant === BadgeVariant.counter
    ? '1px var(--spaceScale-spacing02)'
    : 'var(--spaceScale-spacing01) var(--spaceScale-spacing02)'};
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

    return (
      <BadgeComponent
        {...other}
        data-testid={testId}
        variant={variant ? variant : BadgeVariant.label}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </BadgeComponent>
    );
  }
);
