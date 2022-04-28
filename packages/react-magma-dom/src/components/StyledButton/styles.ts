import { darken, lighten, tint, transparentize } from 'polished';

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

export function buildButtonLineHeight(props) {
  switch (props.size) {
    case 'small':
      return props.theme.typeScale.size01.lineHeight;
    case 'large':
      return props.theme.typeScale.size04.lineHeight;
    default:
      //medium
      return props.theme.typeScale.size03.lineHeight;
  }
}

export function buildButtonSize(props) {
  switch (props.size) {
    case 'small':
      return props.theme.spaceScale.spacing07;
    case 'large':
      return props.theme.spaceScale.spacing11;
    default:
      //medium
      return props.theme.spaceScale.spacing09;
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
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.disabled) {
    if (props.isInverse) {
      if (props.color === 'secondary' || props.variant === 'link') {
        return 'none';
      }
      return transparentize(0.7, props.theme.colors.neutral100);
    }
    if (props.color === 'secondary') {
      return props.theme.colors.neutral100;
    }
    if (props.variant === 'link') {
      return 'none';
    }
    return props.theme.colors.neutral300;
  }

  if (props.isInverse) {
    if (props.variant === 'link') {
      return 'none';
    }
    if (props.color === 'secondary') {
      return 'none';
    }
    if (props.color === 'marketing') {
      return props.theme.colors.secondary500;
    }
    if (props.color === 'danger') {
      return props.theme.colors.danger200;
    }
    return props.theme.colors.tertiary500;
  }

  if (props.variant === 'link' && !props.isInverse) {
    return 'none';
  }

  switch (props.color) {
    case 'secondary':
      return props.theme.colors.neutral100;
    case 'marketing':
      return props.theme.colors.secondary500;
    case 'danger':
      return props.theme.colors.danger;
    default:
      return props.theme.colors.primary;
  }
}

export function buildBorderColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.disabled) {
    if (props.isInverse) {
      if (props.color === 'secondary') {
        return transparentize(0.8, props.theme.colors.neutral100);
      }
      return 'none';
    }
    if (props.color === 'secondary') {
      return props.theme.colors.neutral300;
    }
    return props.theme.colors.neutral06;
  }

  if (props.color === 'marketing') {
    return props.theme.colors.secondary500;
  }
  if (props.color === 'secondary') {
    return props.theme.colors.primary300;
  }
  if (props.isInverse) {
    if (props.color === 'secondary') {
      return transparentize(0.5, props.theme.colors.tertiary500);
    }
    return props.theme.colors.neutral100;
  }
  if (props.variant === 'solid') {
    switch (props.color) {
      case 'danger':
        return props.theme.colors.danger;
      default:
        return props.theme.colors.primary;
    }
  }
}

export function buildColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.variant === 'link' && !props.isInverse && !props.disabled) {
    if (props.color === 'danger') {
      return props.theme.colors.danger500;
    }
    return props.theme.colors.primary;
  }

  if (props.disabled) {
    if (props.isInverse) {
      if (props.color === 'secondary') {
        return transparentize(0.3, props.theme.colors.neutral100);
      }
      return transparentize(0.2, props.theme.colors.neutral100);
    }

    if (props.variant === 'link') {
      return transparentize(0.4, props.theme.colors.neutral500);
    }
    return transparentize(0.4, props.theme.colors.neutral500);
  }

  if (props.isInverse) {
    if (props.variant === 'link') {
      if (props.color === 'danger') {
        return props.theme.colors.danger200;
      }
      return props.theme.colors.tertiary500;
    }
    if (props.color === 'secondary') {
      return props.theme.colors.tertiary500;
    }
    if (props.color === 'marketing') {
      return props.theme.colors.primary500;
    }
    if (props.color === 'danger') {
      return props.theme.colors.danger700;
    }
    return props.theme.colors.primary700;
  }

  switch (props.color) {
    case 'secondary':
      return props.theme.colors.primary;
    case 'marketing':
      return props.theme.colors.primary;
    default:
      return props.theme.colors.neutral100;
  }
}

export function buildFocusBackground(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.color === 'marketing') {
    return lighten(0.1, props.theme.colors.secondary500);
  }
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return tint(0.9, props.theme.colors.neutral);
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
      return darken(0.1, props.theme.colors.neutral100);
    case 'danger':
      return darken(0.1, props.theme.colors.danger);
    default:
      return darken(0.1, props.theme.colors.primary);
  }
}

export function buildFocusColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);
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
      case 'danger':
        return darken(0.1, props.theme.colors.danger);
      default:
        return darken(0.1, props.theme.colors.primary);
    }
  }
  if (props.variant !== 'solid' && props.isInverse) {
    return props.theme.colors.neutral100;
  }
  if (props.color === 'secondary' && !props.isInverse) {
    return props.theme.colors.neutral;
  }
  return props.theme.colors.neutral100;
}

export function buildAfterBackground(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return props.theme.colors.neutral;
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
  return props.theme.colors.neutral100;
}

export function buildActiveBackground(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.color === 'marketing') {
    return lighten(0.2, props.theme.colors.secondary500);
  }
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return tint(0.7, props.theme.colors.neutral);
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
      return darken(0.2, props.theme.colors.neutral100);
    case 'danger':
      return darken(0.2, props.theme.colors.danger);
    default:
      return darken(0.2, props.theme.colors.primary);
  }
}

export function buildActiveColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);

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
      case 'danger':
        return darken(0.2, props.theme.colors.danger);
      default:
        return darken(0.2, props.theme.colors.primary);
    }
  }
  if (props.variant !== 'solid' && props.isInverse) {
    return props.theme.colors.neutral100;
  }
  if (props.color === 'secondary' && !props.isInverse) {
    return props.theme.colors.neutral;
  }
  return props.theme.colors.neutral100;
}
