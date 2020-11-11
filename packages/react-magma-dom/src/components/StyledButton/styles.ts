import { darken, lighten, tint } from 'polished';

const DEFAULT_STYLE_PROPS = {
  color: 'primary',
  shape: 'fill',
  size: 'medium',
  textTransform: 'uppercase',
  variant: 'solid',
};

export function buildPropsWithDefaultButtonStyles(props) {
  return { ...DEFAULT_STYLE_PROPS, ...props };
}

export function buildButtonBorderRadius(props) {
  switch (props.shape) {
    case 'round':
      return '100%';
    case 'leftCap':
      return `${props.theme.borderRadius} 0 0 ${props.theme.borderRadius}`;
    case 'rightCap':
      return `0 ${props.theme.borderRadius} ${props.theme.borderRadius} 0`;
    default:
      //fill
      return props.theme.borderRadius;
  }
}

export function buildButtonFontSize(props) {
  switch (props.size) {
    case 'small':
      return props.theme.typeScale.size01.fontSize;
    case 'large':
      return props.theme.typeScale.size04.fontSize;
    default:
      //medium
      return props.theme.typeScale.size03.fontSize;
  }
}

export function buildButtonBaseHeight(props) {
  switch (props.size) {
    case 'small':
      return '28px';
    case 'large':
      return props.theme.spaceScale.spacing10;
    default:
      //medium
      return props.theme.spaceScale.spacing08;
  }
}

export function buildButtonIconOnlyHeight(props) {
  switch (props.size) {
    case 'small':
      return '28px';
    case 'large':
      return props.theme.spaceScale.spacing10;
    default:
      //medium
      return props.theme.spaceScale.spacing08;
  }
}

export function buildButtonIconOnlyWidth(props) {
  switch (props.size) {
    case 'small':
      return '28px';
    case 'large':
      return props.theme.spaceScale.spacing10;
    default:
      //medium
      return props.theme.spaceScale.spacing08;
  }
}

export function buildButtonPadding(props) {
  switch (props.size) {
    case 'small':
      return `${props.theme.spaceScale.spacing02} ${props.theme.spaceScale.spacing03}`;
    case 'large':
      return `${props.theme.spaceScale.spacing04} ${props.theme.spaceScale.spacing06}`;
    default:
      //medium
      return `${props.theme.spaceScale.spacing04} ${props.theme.spaceScale.spacing05}`;
  }
}

export function buildButtonBackground(props) {
  if (props.variant !== 'solid' && props.color !== 'marketing') {
    return 'rgba(0,0,0,0)';
  }
  if (props.disabled) {
    return props.theme.colors.neutral06;
  }
  if (props.color === 'marketing') {
    return props.theme.colors.pop04;
  }
  if (props.isInverse) {
    return props.theme.colors.neutral08;
  }
  switch (props.color) {
    case 'secondary':
      return props.theme.colors.neutral08;
    case 'success':
      return props.theme.colors.success;
    case 'danger':
      return props.theme.colors.danger;
    default:
      return props.theme.colors.primary;
  }
}

export function buildBorderColor(props) {
  if (props.disabled && props.isInverse && props.variant === 'outline') {
    return props.theme.colors.disabledInverseText;
  }
  if (props.disabled) {
    return props.theme.colors.neutral06;
  }
  if (props.color === 'marketing') {
    return props.theme.colors.pop04;
  }
  if (props.isInverse) {
    return props.theme.colors.neutral08;
  }
  if (props.color === 'secondary') {
    return props.theme.colors.neutral05;
  }
  if (props.variant === 'solid') {
    switch (props.color) {
      case 'success':
        return props.theme.colors.success;
      case 'danger':
        return props.theme.colors.danger;
      default:
        return props.theme.colors.primary;
    }
  }
}

export function buildColor(props) {
  if (props.disabled && props.isInverse && props.variant !== 'solid') {
    return props.theme.colors.disabledInverseText;
  }
  if (props.disabled) {
    return props.theme.colors.disabledText;
  }
  if (props.color === 'marketing') {
    return props.theme.colors.foundation02;
  }
  if (
    (!props.isInverse && props.variant === 'solid') ||
    (props.isInverse && props.variant !== 'solid')
  ) {
    if (props.color === 'secondary' && !props.isInverse) {
      return props.theme.colors.neutral;
    }
    return props.theme.colors.neutral08;
  }
  switch (props.color) {
    case 'secondary':
      return props.theme.colors.neutral;
    case 'success':
      return props.theme.colors.success;
    case 'danger':
      return props.theme.colors.danger;
    default:
      return props.theme.colors.primary;
  }
}

export function buildFocusBackground(props) {
  if (props.color === 'marketing') {
    return lighten(0.1, props.theme.colors.pop04);
  }
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return tint(0.9, props.theme.colors.neutral);
      case 'success':
        return tint(0.9, props.theme.colors.success);
      case 'danger':
        return tint(0.9, props.theme.colors.danger);
      default:
        return tint(0.9, props.theme.colors.primary);
    }
  }
  if (props.variant !== 'solid' && props.isInverse) {
    return 'rgba(0, 0, 0, 0.3)';
  }
  switch (props.color) {
    case 'secondary':
      return darken(0.1, props.theme.colors.neutral08);
    case 'success':
      return darken(0.1, props.theme.colors.success);
    case 'danger':
      return darken(0.1, props.theme.colors.danger);
    default:
      return darken(0.1, props.theme.colors.primary);
  }
}

export function buildFocusColor(props) {
  if (props.color === 'marketing') {
    return props.theme.colors.foundation02;
  }
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return props.theme.colors.neutral;
      case 'success':
        return darken(0.1, props.theme.colors.success);
      case 'danger':
        return darken(0.1, props.theme.colors.danger);
      default:
        return darken(0.1, props.theme.colors.primary);
    }
  }
  if (props.variant !== 'solid' && props.isInverse) {
    return props.theme.colors.neutral08;
  }
  if (props.color === 'secondary' && !props.isInverse) {
    return props.theme.colors.neutral;
  }
  return props.theme.colors.neutral08;
}

export function buildAfterBackground(props) {
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return props.theme.colors.neutral;
      case 'success':
        return props.theme.colors.success;
      case 'danger':
        return props.theme.colors.danger;
      default:
        return props.theme.colors.primary;
    }
  }
  if (
    props.variant === 'solid' &&
    !props.isInverse &&
    props.color === 'secondary'
  ) {
    return props.theme.colors.neutral;
  }
  return props.theme.colors.neutral08;
}

export function buildActiveBackground(props) {
  if (props.color === 'marketing') {
    return lighten(0.2, props.theme.colors.pop04);
  }
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return tint(0.7, props.theme.colors.neutral);
      case 'success':
        return tint(0.7, props.theme.colors.success);
      case 'danger':
        return tint(0.7, props.theme.colors.danger);
      default:
        return tint(0.7, props.theme.colors.primary);
    }
  }
  if (props.variant !== 'solid' && props.isInverse) {
    return 'rgba(0, 0, 0, 0.5);';
  }
  switch (props.color) {
    case 'secondary':
      return darken(0.2, props.theme.colors.neutral08);
    case 'success':
      return darken(0.2, props.theme.colors.success);
    case 'danger':
      return darken(0.2, props.theme.colors.danger);
    default:
      return darken(0.2, props.theme.colors.primary);
  }
}

export function buildActiveColor(props) {
  if (props.color === 'marketing') {
    return props.theme.colors.foundation02;
  }
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return props.theme.colors.neutral;
      case 'success':
        return darken(0.2, props.theme.colors.success);
      case 'danger':
        return darken(0.2, props.theme.colors.danger);
      default:
        return darken(0.2, props.theme.colors.primary);
    }
  }
  if (props.variant !== 'solid' && props.isInverse) {
    return props.theme.colors.neutral08;
  }
  if (props.color === 'secondary' && !props.isInverse) {
    return props.theme.colors.neutral;
  }
  return props.theme.colors.neutral08;
}
