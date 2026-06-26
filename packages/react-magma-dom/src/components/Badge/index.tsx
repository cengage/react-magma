import * as React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { IconProps } from 'react-magma-icons';

import { ThemeContext } from '../../theme/ThemeContext';

export interface BadgeProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * @children required
   */
  children: React.ReactNode;
  /**
   * The color variant of the badge
   * @default BadgeColor.primary
   */
  color?: BadgeColor;
  /**
   * Icon to display on the left side of the badge. Alias for leftIcon.
   */
  icon?: React.ReactElement<IconProps>;
  /**
   * Icon to display on the left side of the badge
   */
  leftIcon?: React.ReactElement<IconProps>;
  /**
   * Icon to display on the right side of the badge
   */
  rightIcon?: React.ReactElement<IconProps>;
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
  /**
   * Indicates the visual weight of the component
   * @default BadgeWeight.default
   */
  weight?: BadgeWeight;
}

export enum BadgeColor {
  danger = 'danger',
  info = 'info',
  primary = 'primary', // default
  secondary = 'secondary',
  success = 'success',
  warning = 'warning',
  light = 'light',
}

export enum BadgeVariant {
  counter = 'counter',
  label = 'label', // default
}

export enum BadgeWeight {
  default = 'default',
  light = 'light',
}

export function buildInverseLightWeightBadgeBackground(props) {
  switch (props.color) {
    case BadgeColor.danger:
      return transparentize(0.5, props.theme.colors.danger700);
    case BadgeColor.info:
      return transparentize(0.5, props.theme.colors.info700);
    case BadgeColor.light:
      return 'transparent';
    case BadgeColor.secondary:
      return transparentize(0.6, props.theme.colors.neutral900);
    case BadgeColor.success:
      return transparentize(0.5, props.theme.colors.success700);
    case BadgeColor.warning:
      return transparentize(0.5, props.theme.colors.warning700);

    case BadgeColor.primary:
    default:
      return transparentize(0.5, props.theme.colors.primary700);
  }
}

export function buildLightWeightBadgeBackground(props) {
  if (props.isInverse) {
    return buildInverseLightWeightBadgeBackground(props);
  }

  switch (props.color) {
    case BadgeColor.danger:
      return props.theme.colors.danger100;
    case BadgeColor.info:
      return props.theme.colors.info100;
    case BadgeColor.light:
      return props.theme.colors.neutral100;
    case BadgeColor.secondary:
      return props.theme.colors.neutral200;
    case BadgeColor.success:
      return props.theme.colors.success100;
    case BadgeColor.warning:
      return props.theme.colors.warning100;

    case BadgeColor.primary:
    default:
      return props.theme.colors.primary100;
  }
}

export function buildBadgeBackground(props) {
  if (props.weight === BadgeWeight.light) {
    return buildLightWeightBadgeBackground(props);
  }

  if (props.isInverse) {
    switch (props.color) {
      case BadgeColor.danger:
        return props.theme.colors.danger200;
      case BadgeColor.info:
        return props.theme.colors.info200;
      case BadgeColor.light:
        return 'transparent';
      case BadgeColor.primary:
        return props.theme.colors.tertiary;
      case BadgeColor.secondary:
        return props.theme.colors.neutral100;
      case BadgeColor.success:
        return props.theme.colors.success200;
      case BadgeColor.warning:
        return props.theme.colors.warning200;

      default:
        return props.theme.colors.tertiary;
    }
  }

  switch (props.color) {
    case BadgeColor.danger:
      return props.theme.colors.danger;
    case BadgeColor.info:
      return props.theme.colors.info500;
    case BadgeColor.light:
      return props.theme.colors.neutral100;
    case BadgeColor.primary:
      return props.theme.colors.primary;
    case BadgeColor.secondary:
      return props.theme.colors.neutral700;
    case BadgeColor.success:
      return props.theme.colors.success;
    case BadgeColor.warning:
      return props.theme.colors.warning500;

    default:
      return props.theme.colors.primary;
  }
}

export function buildInverseLightWeightBadgeTextColor(props) {
  switch (props.color) {
    case BadgeColor.danger:
      return props.theme.colors.danger200;
    case BadgeColor.info:
      return props.theme.colors.info200;
    case BadgeColor.light:
    case BadgeColor.secondary:
      return props.theme.colors.neutral100;
    case BadgeColor.success:
      return props.theme.colors.success200;
    case BadgeColor.warning:
      return props.theme.colors.warning200;

    case BadgeColor.primary:
    default:
      return props.theme.colors.primary200;
  }
}

export function buildLightWeightBadgeTextColor(props) {
  if (props.isInverse) {
    return buildInverseLightWeightBadgeTextColor(props);
  }

  switch (props.color) {
    case BadgeColor.danger:
      return props.theme.colors.danger500;
    case BadgeColor.info:
      return props.theme.colors.info500;
    case BadgeColor.light:
    case BadgeColor.secondary:
      return props.theme.colors.neutral700;
    case BadgeColor.success:
      return props.theme.colors.success500;
    case BadgeColor.warning:
      return props.theme.colors.warning500;

    case BadgeColor.primary:
    default:
      return props.theme.colors.primary500;
  }
}

export function buildBadgeTextColor(props) {
  if (props.weight === BadgeWeight.light) {
    return buildLightWeightBadgeTextColor(props);
  }

  if (props.isInverse) {
    switch (props.color) {
      case BadgeColor.danger:
        return props.theme.colors.danger700;
      case BadgeColor.info:
        return props.theme.colors.info700;
      case BadgeColor.light:
        return props.theme.colors.neutral100;
      case BadgeColor.primary:
        return props.theme.colors.primary600;
      case BadgeColor.secondary:
        return props.theme.colors.neutral700;
      case BadgeColor.success:
        return props.theme.colors.success700;
      case BadgeColor.warning:
        return props.theme.colors.warning600;

      default:
        return props.theme.colors.primary600;
    }
  }
  if (props.color === BadgeColor.light) {
    return props.theme.colors.neutral700;
  }

  return props.theme.colors.neutral100;
}

export function buildInverseLightWeightBadgeBorderColor(props) {
  switch (props.color) {
    case BadgeColor.danger:
      return props.theme.colors.danger600;
    case BadgeColor.info:
      return props.theme.colors.info600;
    case BadgeColor.light:
      return transparentize(0.7, props.theme.colors.neutral100);
    case BadgeColor.success:
      return props.theme.colors.success600;
    case BadgeColor.warning:
      return props.theme.colors.warning600;
    case BadgeColor.secondary:
      return 'transparent';

    case BadgeColor.primary:
    default:
      return props.theme.colors.primary400;
  }
}

export function buildLightWeightBadgeBorderColor(props) {
  if (props.isInverse) {
    return buildInverseLightWeightBadgeBorderColor(props);
  }

  switch (props.color) {
    case BadgeColor.danger:
      return transparentize(0.85, props.theme.colors.danger500);
    case BadgeColor.info:
      return transparentize(0.85, props.theme.colors.info500);
    case BadgeColor.light:
      return props.theme.colors.neutral300;
    case BadgeColor.success:
      return transparentize(0.85, props.theme.colors.success500);
    case BadgeColor.warning:
      return transparentize(0.85, props.theme.colors.warning500);
    case BadgeColor.secondary:
      return 'transparent';

    case BadgeColor.primary:
    default:
      return transparentize(0.85, props.theme.colors.primary500);
  }
}

export function buildBadgeBorderColor(props) {
  if (props.weight === BadgeWeight.light) {
    return buildLightWeightBadgeBorderColor(props);
  }

  if (props.color === BadgeColor.light) {
    if (props.isInverse) {
      return transparentize(0.3, props.theme.colors.neutral100);
    }

    return props.color;
  }

  return 'transparent';
}

export const baseBadgeStyles = props => css`
  ${props.hasIcon && `align-items: center;`}
  background: ${buildBadgeBackground(props)};
  border: 1px solid;
  border-color: ${buildBadgeBorderColor(props)};
  border-radius: ${props.variant === BadgeVariant.counter
    ? props.theme.spaceScale.spacing06
    : props.theme.borderRadiusSmall};
  color: ${buildBadgeTextColor(props)};
  display: ${props.hasIcon ? 'inline-flex' : 'inline-block'};
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
  text-align: ${props.variant === BadgeVariant.counter ? 'center' : 'inherit'};
  vertical-align: middle;
`;

const StyledIcon = styled.span<{ iconPosition: 'left' | 'right' }>`
  display: inline-flex;
  flex-shrink: 0;
  line-height: 0;
  margin-left: ${props =>
    props.iconPosition === 'right' ? props.theme.spaceScale.spacing02 : 0};
  margin-right: ${props =>
    props.iconPosition === 'left' ? props.theme.spaceScale.spacing02 : 0};

  svg {
    display: block;
  }
`;

interface StyledBadgeProps extends BadgeProps {
  hasIcon?: boolean;
}

const StyledSpan = styled.span<StyledBadgeProps>`
  ${baseBadgeStyles};
`;

const StyledButton = styled.button<StyledBadgeProps>`
  ${baseBadgeStyles};
  cursor: pointer;

  &:focus {
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
    outline-offset: ${props => props.theme.spaceScale.spacing01};
  }
`;

function getStyledBadgeComponent(isClickable: boolean) {
  return isClickable ? StyledButton : StyledSpan;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (props, ref) => {
    const {
      children,
      icon,
      isInverse,
      leftIcon,
      onClick,
      rightIcon,
      testId,
      variant,
      weight,
      ...other
    } = props;

    const BadgeComponent = getStyledBadgeComponent(Boolean(onClick));

    const theme = React.useContext(ThemeContext);

    const badgeLeftIcon = leftIcon || icon;

    function renderBadgeIcon(badgeIcon: React.ReactElement<IconProps>) {
      return React.cloneElement(badgeIcon, {
        size: badgeIcon.props.size || theme.iconSizes.xSmall,
      });
    }

    const renderedLeftIcon = badgeLeftIcon
      ? renderBadgeIcon(badgeLeftIcon)
      : null;
    const renderedRightIcon = rightIcon ? renderBadgeIcon(rightIcon) : null;

    const hasIcon = Boolean(renderedLeftIcon || renderedRightIcon);

    function renderStyledIcon(
      badgeIcon: React.ReactElement<IconProps>,
      iconPosition: 'left' | 'right'
    ) {
      return (
        <StyledIcon iconPosition={iconPosition} theme={theme}>
          {badgeIcon}
        </StyledIcon>
      );
    }

    return (
      <BadgeComponent
        {...other}
        data-testid={testId}
        hasIcon={hasIcon}
        isInverse={isInverse}
        variant={variant ? variant : BadgeVariant.label}
        weight={weight ? weight : BadgeWeight.default}
        onClick={onClick}
        ref={ref}
        theme={theme}
      >
        {renderedLeftIcon && renderStyledIcon(renderedLeftIcon, 'left')}
        {children}
        {renderedRightIcon && renderStyledIcon(renderedRightIcon, 'right')}
      </BadgeComponent>
    );
  }
);
