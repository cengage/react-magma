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

  const { button } = props.theme;

  if (props.variant !== 'solid') {
    return 'rgba(0,0,0,0)';
  }

  if (props.disabled) {
    if (props.isInverse) {
      return button.disabled.inverse.backgroundColor;
    }
    return button.disabled.backgroundColor;
  }

  if (props.isInverse) {
    switch (props.color) {
      case 'secondary':
        return button.secondary.inverse.backgroundColor;
      case 'success':
        return button.success.inverse.backgroundColor;
      case 'danger':
        return button.danger.inverse.backgroundColor;
      case 'marketing':
        return button.marketing.inverse.backgroundColor;
      default:
        return button.primary.inverse.backgroundColor;
    }
  }

  switch (props.color) {
    case 'secondary':
      return button.secondary.backgroundColor;
    case 'success':
      return button.success.backgroundColor;
    case 'danger':
      return button.danger.backgroundColor;
    case 'marketing':
      return button.marketing.backgroundColor;
    default:
      return button.primary.backgroundColor;
  }
}

export function buildBorderColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  const { button } = props.theme;

  if (props.disabled) {
    if (props.isInverse && props.variant !== 'solid') {
      return button.disabled.outline.inverse.borderColor;
    }
    if (props.isInverse) {
      return button.disabled.inverse.borderColor;
    }
    if (props.variant !== 'solid') {
      return button.disabled.outline.borderColor;
    }
    return button.disabled.borderColor;
  }

  if (props.variant === 'outline' && props.isInverse) {
    switch (props.color) {
      case 'secondary':
        return button.secondary.outline.inverse.borderColor;
      case 'success':
        return button.success.outline.inverse.borderColor;
      case 'danger':
        return button.danger.outline.inverse.borderColor;
      case 'marketing':
        return button.marketing.inverse.borderColor;
      default:
        return button.primary.outline.inverse.borderColor;
    }
  }

  if (props.variant === 'outline') {
    switch (props.color) {
      case 'secondary':
        return button.secondary.outline.borderColor;
      case 'success':
        return button.success.outline.borderColor;
      case 'danger':
        return button.danger.outline.borderColor;
      case 'marketing':
        return button.marketing.borderColor;
      default:
        return button.primary.outline.borderColor;
    }
  }

  if (props.isInverse) {
    switch (props.color) {
      case 'secondary':
        return button.secondary.inverse.borderColor;
      case 'success':
        return button.success.inverse.borderColor;
      case 'danger':
        return button.danger.inverse.borderColor;
      case 'marketing':
        return button.marketing.inverse.borderColor;
      default:
        return button.primary.inverse.borderColor;
    }
  }

  switch (props.color) {
    case 'secondary':
      return button.secondary.borderColor;
    case 'success':
      return button.success.borderColor;
    case 'danger':
      return button.danger.borderColor;
    case 'marketing':
      return button.marketing.borderColor;
    default:
      return button.primary.borderColor;
  }
}

export function buildColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  const { button } = props.theme;

  if (props.disabled) {
    if (props.isInverse && props.variant !== 'solid') {
      return button.disabled.outline.inverse.textColor;
    }
    if (props.isInverse) {
      return button.disabled.inverse.textColor;
    }
    if (props.variant !== 'solid') {
      return button.disabled.outline.textColor;
    }
    return button.disabled.textColor;
  }

  if (props.variant !== 'solid' && props.isInverse) {
    switch (props.color) {
      case 'secondary':
        return button.secondary.outline.inverse.textColor;
      case 'success':
        return button.success.outline.inverse.textColor;
      case 'danger':
        return button.danger.outline.inverse.textColor;
      case 'marketing':
        return button.marketing.inverse.textColor;
      default:
        return button.primary.outline.inverse.textColor;
    }
  }

  if (props.variant !== 'solid') {
    switch (props.color) {
      case 'secondary':
        return button.secondary.outline.textColor;
      case 'success':
        return button.success.outline.textColor;
      case 'danger':
        return button.danger.outline.textColor;
      case 'marketing':
        return button.marketing.textColor;
      default:
        return button.primary.outline.textColor;
    }
  }

  if (props.isInverse) {
    switch (props.color) {
      case 'secondary':
        return button.secondary.inverse.textColor;
      case 'success':
        return button.success.inverse.textColor;
      case 'danger':
        return button.danger.inverse.textColor;
      case 'marketing':
        return button.marketing.inverse.textColor;
      default:
        return button.primary.inverse.textColor;
    }
  }

  switch (props.color) {
    case 'secondary':
      return button.secondary.textColor;
    case 'success':
      return button.success.textColor;
    case 'danger':
      return button.danger.textColor;
    case 'marketing':
      return button.marketing.textColor;
    default:
      return button.primary.textColor;
  }
}

export function buildFocusBackground(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  const { button } = props.theme;

  if (props.color === 'marketing') {
    return lighten(0.1, button.marketing.backgroundColor);
  }
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return darken(0.1, button.secondary.backgroundColor);
      case 'success':
        return tint(0.9, button.success.backgroundColor);
      case 'danger':
        return tint(0.9, button.danger.backgroundColor);
      default:
        return tint(0.9, button.primary.backgroundColor);
    }
  }
  if (props.variant !== 'solid' && props.isInverse) {
    return 'rgba(0, 0, 0, 0.3)';
  }
  switch (props.color) {
    case 'secondary':
      return darken(0.1, button.secondary.backgroundColor);
    case 'success':
      return darken(0.1, button.success.backgroundColor);
    case 'danger':
      return darken(0.1, button.danger.backgroundColor);
    default:
      return button.primary.hover.backgroundColor;
  }
}

export function buildFocusColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);
  const { button } = props.theme;

  if (props.variant !== 'solid' && props.isInverse) {
    switch (props.color) {
      case 'secondary':
        return button.secondary.outline.inverse.textColor;
      case 'success':
        return button.success.outline.inverse.textColor;
      case 'danger':
        return button.danger.outline.inverse.textColor;
      case 'marketing':
        return button.marketing.inverse.textColor;
      default:
        return button.primary.outline.inverse.textColor;
    }
  }

  if (props.variant !== 'solid') {
    switch (props.color) {
      case 'secondary':
        return darken(0.1, button.secondary.outline.textColor);
      case 'success':
        return darken(button.success.outline.textColor);
      case 'danger':
        return darken(button.danger.outline.textColor);
      case 'marketing':
        return darken(button.marketing.textColor);
      default:
        return darken(button.primary.outline.textColor);
    }
  }

  if (props.isInverse) {
    switch (props.color) {
      case 'secondary':
        return darken(0.1, button.secondary.inverse.textColor);
      case 'success':
        return darken(0.1, button.success.inverse.textColor);
      case 'danger':
        return darken(0.1, button.danger.inverse.textColor);
      case 'marketing':
        return darken(0.1, button.marketing.inverse.textColor);
      default:
        return darken(0.1, button.primary.inverse.textColor);
    }
  }

  switch (props.color) {
    case 'secondary':
      return button.secondary.textColor;
    case 'success':
      return button.success.textColor;
    case 'danger':
      return button.danger.textColor;
    case 'marketing':
      return button.marketing.textColor;
    default:
      return button.primary.textColor;
  }
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
  props = buildPropsWithDefaultButtonStyles(props);
  const { button } = props.theme;

  if (props.color === 'marketing') {
    return lighten(0.2, props.theme.colors.pop04);
  }
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return tint(0.7, button.secondary.textColor);
      case 'success':
        return tint(0.7, button.success.backgroundColor);
      case 'danger':
        return tint(0.7, button.danger.backgroundColor);
      default:
        return tint(0.7, button.primary.backgroundColor);
    }
  }
  if (props.variant !== 'solid' && props.isInverse) {
    return 'rgba(0, 0, 0, 0.5);';
  }
  switch (props.color) {
    case 'secondary':
      return darken(0.2, button.secondary.backgroundColor);
    case 'success':
      return darken(0.2, button.success.backgroundColor);
    case 'danger':
      return darken(0.2, button.danger.backgroundColor);
    default:
      return button.primary.active.backgroundColor;
  }
}

export function buildActiveColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);
  const { button } = props.theme;

  if (props.color === 'marketing') {
    return button.marketing.textColor;
  }
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return button.success.outline.textColor;
      case 'success':
        return darken(0.2, button.success.outline.textColor);
      case 'danger':
        return darken(0.2, button.danger.outline.textColor);
      default:
        return darken(0.2, button.primary.outline.textColor);
    }
  }
  if (props.variant !== 'solid' && props.isInverse) {
    return props.theme.colors.neutral08;
  }
  if (props.color === 'secondary' && !props.isInverse) {
    return props.theme.colors.neutral;
  }
  if (props.color === 'primary') {
    return button.primary.textColor;
  }
  return props.theme.colors.neutral08;
}
