import { darken, lighten, tint } from 'polished';
// import {
//   EnumButtonShape,
//   EnumButtonSize,
//   EnumButtonTextTransform,
//   EnumButtonVariant,
//   EnumButtonColor
// } from '../Button';

const DEFAULT_STYLE_PROPS = {
  color: 'primary',
  shape: 'fill',
  size: 'medium',
  textTransform: 'uppercase',
  variant: 'solid'
};

export function buildPropsWithDefaultButtonStyles(props) {
  return { ...DEFAULT_STYLE_PROPS, ...props };
}

export const buttonFontSize = {
  small: '.750rem',
  medium: '.875rem',
  large: '1.125rem'
};

export const buttonBorderRadius = {
  fill: '5px',
  round: '100%',
  leftCap: '5px 0 0 5px',
  rightCap: '0 5px 5px 0'
};

export const buttonBaseHeight = {
  small: '29px',
  medium: '37px',
  large: '45px'
};

export const buttonIconOnlyHeight = {
  small: '28px',
  medium: '37px',
  large: '44px'
};

export const buttonPadding = {
  small: '0 10px',
  medium: '0 15px',
  large: '0 20px'
};

export const buttonIconOnlyWidth = {
  small: '28px',
  medium: '37px',
  large: '44px'
};

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
  if (props.inverse) {
    return props.theme.colors.neutral08;
  }
  switch (props.color) {
    case 'secondary':
      return props.theme.colors.neutral08;
    case 'success':
      return props.theme.colors.success01;
    case 'danger':
      return props.theme.colors.danger;
    default:
      return props.theme.colors.primary;
  }
}

export function buildBorderColor(props) {
  if (props.disabled && props.inverse && props.variant === 'outline') {
    return props.theme.colors.disabledInverseText;
  }
  if (props.disabled) {
    return props.theme.colors.neutral06;
  }
  if (props.color === 'marketing') {
    return props.theme.colors.pop04;
  }
  if (props.inverse) {
    return props.theme.colors.neutral08;
  }
  if (props.color === 'secondary') {
    return props.theme.colors.neutral05;
  }
  if (props.variant === 'solid') {
    switch (props.color) {
      case 'success':
        return props.theme.colors.success01;
      case 'danger':
        return props.theme.colors.danger;
      default:
        return props.theme.colors.primary;
    }
  }
}

export function buildColor(props) {
  if (props.disabled && props.inverse && props.variant !== 'solid') {
    return props.theme.colors.disabledInverseText;
  }
  if (props.disabled) {
    return props.theme.colors.disabledText;
  }
  if (props.color === 'marketing') {
    return props.theme.colors.foundation01;
  }
  if (
    (!props.inverse && props.variant === 'solid') ||
    (props.inverse && props.variant !== 'solid')
  ) {
    if (props.color === 'secondary' && !props.inverse) {
      return props.theme.colors.neutral02;
    }
    return props.theme.colors.neutral08;
  }
  switch (props.color) {
    case 'secondary':
      return props.theme.colors.neutral02;
    case 'success':
      return props.theme.colors.success01;
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
    (props.variant !== 'solid' && !props.inverse) ||
    (props.variant === 'solid' && props.inverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return tint(0.9, props.theme.colors.neutral02);
      case 'success':
        return tint(0.9, props.theme.colors.success01);
      case 'danger':
        return tint(0.9, props.theme.colors.danger);
      default:
        return tint(0.9, props.theme.colors.primary);
    }
  }
  if (props.variant !== 'solid' && props.inverse) {
    return 'rgba(0, 0, 0, 0.3)';
  }
  switch (props.color) {
    case 'secondary':
      return darken(0.1, props.theme.colors.neutral08);
    case 'success':
      return darken(0.1, props.theme.colors.success01);
    case 'danger':
      return darken(0.1, props.theme.colors.danger);
    default:
      return darken(0.1, props.theme.colors.primary);
  }
}

export function buildFocusColor(props) {
  if (props.color === 'marketing') {
    return props.theme.colors.foundation01;
  }
  if (
    (props.variant !== 'solid' && !props.inverse) ||
    (props.variant === 'solid' && props.inverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return props.theme.colors.neutral02;
      case 'success':
        return darken(0.1, props.theme.colors.success01);
      case 'danger':
        return darken(0.1, props.theme.colors.danger);
      default:
        return darken(0.1, props.theme.colors.primary);
    }
  }
  if (props.variant !== 'solid' && props.inverse) {
    return props.theme.colors.neutral08;
  }
  if (props.color === 'secondary' && !props.inverse) {
    return props.theme.colors.neutral02;
  }
}

export function buildAfterBackground(props) {
  if (
    (props.variant !== 'solid' && !props.inverse) ||
    (props.variant === 'solid' && props.inverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return props.theme.colors.neutral02;
      case 'success':
        return props.theme.colors.success01;
      case 'danger':
        return props.theme.colors.danger;
      default:
        return props.theme.colors.primary;
    }
  }
  if (
    props.variant === 'solid' &&
    !props.inverse &&
    props.color === 'secondary'
  ) {
    return props.theme.colors.neutral02;
  }
  return props.theme.colors.neutral08;
}

export function buildActiveBackground(props) {
  if (props.color === 'marketing') {
    return lighten(0.2, props.theme.colors.pop04);
  }
  if (
    (props.variant !== 'solid' && !props.inverse) ||
    (props.variant === 'solid' && props.inverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return tint(0.7, props.theme.colors.neutral02);
      case 'success':
        return tint(0.7, props.theme.colors.success01);
      case 'danger':
        return tint(0.7, props.theme.colors.danger);
      default:
        return tint(0.7, props.theme.colors.primary);
    }
  }
  if (props.variant !== 'solid' && props.inverse) {
    return 'rgba(0, 0, 0, 0.5);';
  }
  switch (props.color) {
    case 'secondary':
      return darken(0.2, props.theme.colors.neutral08);
    case 'success':
      return darken(0.2, props.theme.colors.success01);
    case 'danger':
      return darken(0.2, props.theme.colors.danger);
    default:
      return darken(0.2, props.theme.colors.primary);
  }
}

export function buildActiveColor(props) {
  if (props.color === 'marketing') {
    return props.theme.colors.foundation01;
  }
  if (
    (props.variant !== 'solid' && !props.inverse) ||
    (props.variant === 'solid' && props.inverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return props.theme.colors.neutral02;
      case 'success':
        return darken(0.2, props.theme.colors.success01);
      case 'danger':
        return darken(0.2, props.theme.colors.danger);
      default:
        return darken(0.2, props.theme.colors.primary);
    }
  }
  if (props.variant !== 'solid' && props.inverse) {
    return props.theme.colors.neutral08;
  }
  if (props.color === 'secondary' && !props.inverse) {
    return props.theme.colors.neutral02;
  }
  return props.theme.colors.neutral08;
}
