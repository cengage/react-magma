import { transparentize } from 'polished';

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
      if (props.color === 'secondary' || props.color === 'subtle' ||props.variant === 'link') {
        return 'none';
      }
      return transparentize(0.7, props.theme.colors.neutral100);
    }
    if (props.variant === 'link') {
      return 'none';
    }
    if (props.color === 'secondary' || props.color === 'subtle') {
      return props.theme.colors.neutral100;
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
      return props.theme.colors.danger;
    }
    if (props.color === 'subtle') {
      return 'none';
    }
    return props.theme.colors.tertiary500;
  }

  if (props.variant === 'link') {
    return 'none';
  }

  switch (props.color) {
    case 'secondary':
      return props.theme.colors.neutral100;
    case 'marketing':
      return props.theme.colors.secondary500;
    case 'danger':
      return props.theme.colors.danger;
    case 'subtle':
      return props.theme.colors.neutral100;
    default:
      return props.theme.colors.primary;
  }
}

export function buildBorderWidth(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.variant !== 'link') {
    if (props.color === 'secondary' || props.color === 'subtle') {
      return '1px solid';
    }
  }
  return 0;
}

export function buildBorderColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.disabled) {
    if (props.isInverse) {
      if (props.color === 'secondary' || props.color === 'subtle') {
        return transparentize(0.8, props.theme.colors.neutral100);
      }
      return 'none';
    }
    return props.theme.colors.neutral300;
  }

  if (props.isInverse) {
    if (props.color === 'secondary') {
      return transparentize(0.5, props.theme.colors.tertiary500);
    }
    if (props.color === 'subtle') {
      return transparentize(0.8, props.theme.colors.neutral100);
    }

    return props.theme.colors.neutral100;
  }

  if (props.color === 'marketing') {
    return props.theme.colors.secondary500;
  }
  if (props.color === 'secondary') {
    return props.theme.colors.primary300;
  }
  if (props.color === 'subtle') {
    return props.theme.colors.neutral300;
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

  if (props.disabled) {
    if (props.isInverse) {
      if (props.color === 'secondary' || props.color === 'subtle' || props.variant === 'link') {
        return transparentize(0.7, props.theme.colors.neutral100);
      }
      return transparentize(0.6, props.theme.colors.neutral100);
    }
    return transparentize(0.4, props.theme.colors.neutral500);
  }

  if (props.isInverse) {
    if (props.color === 'subtle') {
      return props.theme.colors.neutral100;
    }
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
      return props.theme.colors.neutral700;
    }
    if (props.color === 'danger') {
      return props.theme.colors.neutral100;
    }
    return props.theme.colors.primary700;
  }

  if (props.variant === 'link') {
    switch (props.color) {
      case 'danger': 
        return props.theme.colors.danger500;
      case 'subtle':
        return props.theme.colors.neutral700;
      default:
        return props.theme.colors.primary;
    }
  }

  switch (props.color) {
    case 'secondary':
      return props.theme.colors.primary;
    case 'marketing':
      return props.theme.colors.neutral700;
    case 'subtle':
      return props.theme.colors.neutral700;
    default:
      return props.theme.colors.neutral100;
  }
}

export function buildFocusBackground(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  // All inverse link buttons have the same background color
  if (props.variant === 'link' && props.isInverse) {
    return transparentize(0.7, props.theme.colors.neutral900);
  }
  if (props.color === 'marketing') {
    return props.theme.colors.secondary600;
  }
  if (props.color === 'danger') {
    if (props.variant === 'link') {
      return props.theme.colors.danger100;
    }
    return props.theme.colors.danger600;
  }
  if (props.color === 'secondary') {
    if (props.isInverse) {
      // solid && inverse
      return transparentize(0.7, props.theme.colors.neutral900);
    }
    return props.theme.colors.primary100;
  }
  if (props.color === 'subtle') {
    if (props.isInverse) {
      return transparentize(0.7, props.theme.colors.neutral900);
    }
    return transparentize(0.95, props.theme.colors.neutral900);
  }
  // primary
  if (props.variant === 'solid' && props.isInverse) {
    return props.theme.colors.tertiary600;
  }
  if (props.variant === 'link') {
    return props.theme.colors.primary100;
  }
  return props.theme.colors.primary600;
}

// Same styles for hover and focus
export function buildFocusColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.color === 'marketing') {
    if (!props.isInverse || props.variant === 'solid') {
      return props.theme.colors.neutral700;
    }
  }

  if (props.color === 'danger') {
    if (props.variant !== 'solid' && !props.isInverse) {
      return props.theme.colors.danger600;
    }
    if (props.variant === 'solid' && props.isInverse) {
      return props.theme.colors.neutral100;
    }
  }

  if (props.color === 'secondary') {
    if (props.isInverse) {
      return props.theme.colors.tertiary500;
    }
    return props.theme.colors.primary;
  }

  if (props.color === 'subtle') {
    if (props.isInverse) {
      return props.theme.colors.neutral100;
    }
    return props.theme.colors.neutral700;
  }

  if (props.variant === 'link' && !props.isInverse) {
    return props.theme.colors.primary;
  }

  if (props.variant === 'link' && props.isInverse) {
    switch (props.color) {
      case 'primary':
        return props.theme.colors.tertiary500;
      case 'marketing':
        return props.theme.colors.tertiary500;
      case 'danger':
        return props.theme.colors.danger200;
      default:
        return props.theme.colors.tertiary500;
    }
  }

  if (props.variant === 'solid' && props.isInverse) {
    return props.theme.colors.primary700;
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
        return props.theme.colors.primary;
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
    if (props.variant !== 'solid' && props.isInverse) {
      return transparentize(0.7, props.theme.colors.neutral900);
    }
    return props.theme.colors.secondary700;
  }
  if (props.color === 'danger') {
    if (props.isInverse) {
      if (props.variant !== 'solid') {
        return transparentize(0.5, props.theme.colors.neutral900);
      }
      return props.theme.colors.danger700;
    }
    if (props.variant !== 'solid') {
      return props.theme.colors.danger200;
    }
  }
  if (props.color === 'secondary') {
    if ((props.variant === 'link' && props.isInverse) || props.isInverse) {
      return transparentize(0.5, props.theme.colors.neutral900);
    }
  }
  if (props.color === 'subtle') {
    if (props.isInverse) {
      return transparentize(0.5, props.theme.colors.neutral900);
    }
    return transparentize(0.9, props.theme.colors.neutral900);
  }
  if (props.variant === 'solid' && props.isInverse) {
    return props.theme.colors.tertiary700;
  }

  if (props.variant === 'link') {
    if (props.isInverse) {
      return transparentize(0.5, props.theme.colors.neutral900);
    }
    return props.theme.colors.primary200;
  }

  switch (props.color) {
    case 'secondary':
      return props.theme.colors.primary200;
    case 'danger':
      return props.theme.colors.danger700;
    default:
      return props.theme.colors.primary700;
  }
}

export function buildActiveColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.color === 'danger') {
    if (props.variant !== 'solid') {
      if (props.isInverse) {
        return props.theme.colors.danger200;
      }
      return props.theme.colors.danger700;
    }
  }
  if (props.color === 'secondary' && props.variant === 'solid') {
    if (props.isInverse) {
      return props.theme.colors.tertiary500;
    }
    return props.theme.colors.primary600;
  }
  if (props.color === 'subtle') {
    if (props.isInverse) {
      return props.theme.colors.neutral100;
    }
    return props.theme.colors.neutral700;
  }
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'danger':
        return props.theme.colors.neutral100;
      case 'marketing':
        return props.theme.colors.neutral800;
      default:
        return props.theme.colors.primary600;
    }
  }
  if (props.variant !== 'solid' && props.isInverse) {
    switch (props.color) {
      case 'primary':
        return props.theme.colors.tertiary500;
      case 'secondary':
        return props.theme.colors.tertiary500;
      case 'marketing':
        return props.theme.colors.tertiary500;
      default:
        return props.theme.colors.neutral100;
    }
  }

  if (props.color === 'marketing' && !props.isInverse) {
    return props.theme.colors.neutral800;
  }
  return props.theme.colors.neutral100;
}
