import * as React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { darken, lighten } from 'polished';

export interface BadgeProps extends React.HTMLAttributes<HTMLButtonElement> {
  color?: BadgeColor;
  isCounter?: boolean;
  onClick?: () => void;
}

export enum BadgeColor {
  danger = 'danger',
  primary = 'primary',
  secondary = 'secondary', // default
  success = 'success',
  light = 'light'
}

export function buildBadgeBackground(props) {
  switch (props.color) {
    case 'danger':
      return props.theme.colors.danger;
    case 'light':
      return props.theme.colors.neutral06;
    case 'primary':
      return props.theme.colors.primary;
    case 'secondary':
      return props.theme.colors.neutral03;
    case 'success':
      return props.theme.colors.success01;

    default:
      return props.theme.colors.neutral03;
  }
}

export function buildBadgeFocusBackground(props) {
  switch (props.color) {
    case 'danger':
      return darken(0.1, props.theme.colors.danger);
    case 'light':
      return lighten(0.05, props.theme.colors.neutral06);
    case 'primary':
      return darken(0.1, props.theme.colors.primary);
    case 'secondary':
      return darken(0.1, props.theme.colors.neutral03);
    case 'success':
      return darken(0.1, props.theme.colors.success01);

    default:
      return darken(0.1, props.theme.colors.neutral03);
  }
}

export function buildBadgeActiveBackground(props) {
  switch (props.color) {
    case 'danger':
      return darken(0.2, props.theme.colors.danger);
    case 'light':
      return lighten(0.1, props.theme.colors.neutral06);
    case 'primary':
      return darken(0.2, props.theme.colors.primary);
    case 'secondary':
      return darken(0.2, props.theme.colors.neutral03);
    case 'success':
      return darken(0.2, props.theme.colors.success01);

    default:
      return darken(0.2, props.theme.colors.neutral03);
  }
}

export const baseBadgeStyles = props => css`
  background: ${buildBadgeBackground(props)};
  border-radius: ${props.isCounter ? '10px' : '3px'};
  color: ${props.color === 'light'
    ? props.theme.colors.neutral02
    : props.theme.colors.neutral08};
  display: inline-block;
  font-weight: bold;
  font-size: ${props.isCounter ? '14px' : '12px'};
  line-height: ${props.isCounter ? '20px' : '23px'};
  padding: 0 6px;
`;

const StyledSpan = styled.span<BadgeProps>`
  ${baseBadgeStyles};
`;

const StyledButton = styled.button<BadgeProps>`
  ${baseBadgeStyles};
  border: 0;
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

function renderBadge(isClickable: boolean) {
  return isClickable ? StyledButton : StyledSpan;
}

export const Badge: React.FunctionComponent<BadgeProps> = React.forwardRef(
  ({ children, color, isCounter, onClick, ...other }: BadgeProps, ref: any) => {
    const HeadingComponent = renderBadge(!!onClick);

    return (
      <ThemeContext.Consumer>
        {theme => (
          <HeadingComponent
            {...other}
            color={color}
            isCounter={isCounter}
            onClick={onClick}
            ref={ref}
            theme={theme}
          >
            {children}
          </HeadingComponent>
        )}
      </ThemeContext.Consumer>
    );
  }
);
