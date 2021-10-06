import { cssVar, darken, lighten, tint } from 'polished';

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
      return 'var(--borderRadius) 0 0 var(--borderRadius)';
    case 'rightCap':
      return '0 var(--borderRadius) var(--borderRadius) 0';
    default:
      //fill
      return 'var(--borderRadius)';
  }
}

export function buildButtonFontSize(props) {
  switch (props.size) {
    case 'small':
      return 'var(--typeScale-size01-fontSize)';
    case 'large':
      return 'var(--typeScale-size04-fontSize)';
    default:
      //medium
      return 'var(--typeScale-size03-fontSize)';
  }
}

export function buildButtonLineHeight(props) {
  switch (props.size) {
    case 'small':
      return 'var(--typeScale-size01-lineHeight)';
    case 'large':
      return 'var(--typeScale-size04-lineHeight)';
    default:
      //medium
      return 'var(--typeScale-size03-lineHeight)';
  }
}

export function buildButtonSize(props) {
  switch (props.size) {
    case 'small':
      return 'var(--spaceScale-spacing07)';
    case 'large':
      return 'var(--spaceScale-spacing11)';
    default:
      //medium
      return 'var(--spaceScale-spacing09)';
  }
}

export function buildButtonPadding(props) {
  switch (props.size) {
    case 'small':
      return 'var(--spaceScale.-spacing02) var(--spaceScale.-spacing03)';
    case 'large':
      return 'var(--spaceScale.-spacing04) var(--spaceScale.-spacing06)';
    default:
      //medium
      return 'var(--spaceScale.-spacing04) var(--spaceScale.-spacing05)';
  }
}

export function buildButtonBackground(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.variant !== 'solid' && props.color !== 'marketing') {
    return 'rgba(0,0,0,0)';
  }
  if (props.disabled) {
    return 'var(--colors-neutral06)';
  }
  if (props.color === 'marketing') {
    return 'var(--colors-pop04)';
  }
  if (props.isInverse) {
    return 'var(--colors-neutral08)';
  }
  switch (props.color) {
    case 'secondary':
      return 'var(--colors-neutral08)';
    case 'success':
      return 'var(--colors-success)';
    case 'danger':
      return 'var(--colors-danger)';
    default:
      return 'var(--colors-primary)';
  }
}

export function buildBorderColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.disabled && props.isInverse && props.variant === 'outline') {
    return 'var(--colors-disabledInverseText)';
  }
  if (props.disabled) {
    return 'var(--colors-neutral06)';
  }
  if (props.color === 'marketing') {
    return 'var(--colors-pop04)';
  }
  if (props.isInverse) {
    return 'var(--colors-neutral08)';
  }
  if (props.color === 'secondary') {
    return 'var(--colors-neutral05)';
  }
  if (props.variant === 'solid') {
    switch (props.color) {
      case 'success':
        return 'var(--colors-success)';
      case 'danger':
        return 'var(--colors-danger)';
      default:
        return 'var(--colors-primary)';
    }
  }
}

export function buildColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);
  console.log('primary', cssVar('--colors-primary'))

  if (props.disabled && props.isInverse && props.variant !== 'solid') {
    return 'var(--colors-disabledInverseText)';
  }
  if (props.disabled) {
    return 'var(--colors-disabledText)';
  }
  if (props.color === 'marketing') {
    return 'var(--colors-foundation02)';
  }
  if (
    (!props.isInverse && props.variant === 'solid') ||
    (props.isInverse && props.variant !== 'solid')
  ) {
    if (props.color === 'secondary' && !props.isInverse) {
      return 'var(--colors-neutral)';
    }
    return 'var(--colors-neutral08)';
  }
  switch (props.color) {
    case 'secondary':
      return 'var(--colors-neutral)';
    case 'success':
      return 'var(--colors-success)';
    case 'danger':
      return 'var(--colors-danger)';
    default:
      return 'var(--colors-primary)';
  }
}

export function buildFocusBackground(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.color === 'marketing') {
    return lighten(0.1, cssVar('--colors-pop04', '#bada55') as string);
  }
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
    ) {
      switch (props.color) {
      case 'secondary':
        return tint(0.9, cssVar('--colors-neutral', '#bada55') as string);
      case 'success':
        return tint(0.9, cssVar('--colors-success', '#bada55') as string);
      case 'danger':
        return tint(0.9, cssVar('--colors-danger', '#bada55') as string);
      default:
        return tint(0.9, cssVar('--colors-primary', '#bada55') as string);
    }
  }
  if (props.variant !== 'solid' && props.isInverse) {
    return 'rgba(0, 0, 0, 0.3)';
  }
  switch (props.color) {
    case 'secondary':
      return darken(0.1, cssVar('--colors-neutral08', '#bada55') as string);
    case 'success':
      return darken(0.1, cssVar('--colors-success', '#bada55') as string);
    case 'danger':
      return darken(0.1, cssVar('--colors-danger', '#bada55') as string);
    default:
      return darken(0.1, cssVar('--colors-primary', '#bada55') as string);
  }
}

export function buildFocusColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);
  if (props.color === 'marketing') {
    return 'var(--colors-foundation02)';
  }
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return 'var(--colors-neutral)';
      case 'success':
        return darken(0.1, cssVar('--colors-success', '#bada55') as string);
      case 'danger':
        return darken(0.1, cssVar('--colors-danger', '#bada55') as string);
      default:
        return darken(0.1, cssVar('--colors-primary', '#bada55') as string);
    }
  }
  if (props.variant !== 'solid' && props.isInverse) {
    return 'var(--colors-neutral08)';
  }
  if (props.color === 'secondary' && !props.isInverse) {
    return 'var(--colors-neutral)';
  }
  return 'var(--colors-neutral08)';
}

export function buildAfterBackground(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return 'var(--colors-neutral)';
      case 'success':
        return 'var(--colors-success)';
      case 'danger':
        return 'var(--colors-danger)';
      default:
        return 'var(--colors-primary)';
    }
  }
  if (
    props.variant === 'solid' &&
    !props.isInverse &&
    props.color === 'secondary'
  ) {
    return 'var(--colors-neutral)';
  }
  return 'var(--colors-neutral08)';
}

export function buildActiveBackground(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.color === 'marketing') {
    return lighten(0.2, cssVar('--colors-pop04', '#bada55') as string);
  }
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return tint(0.7, cssVar('--colors-neutral', '#bada55') as string);
      case 'success':
        return tint(0.7, cssVar('--colors-success', '#bada55') as string);
      case 'danger':
        return tint(0.7, cssVar('--colors-danger', '#bada55') as string);
      default:
        return tint(0.7, cssVar('--colors-primary', '#bada55') as string);
    }
  }
  if (props.variant !== 'solid' && props.isInverse) {
    return 'rgba(0, 0, 0, 0.5);';
  }
  switch (props.color) {
    case 'secondary':
      return darken(0.2, cssVar('--colors-neutral08', '#bada55') as string);
    case 'success':
      return darken(0.2, cssVar('--colors-success', '#bada55') as string);
    case 'danger':
      return darken(0.2, cssVar('--colors-danger', '#bada55') as string);
    default:
      return darken(0.2, cssVar('--colors-primary', '#bada55') as string);
  }
}

export function buildActiveColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.color === 'marketing') {
    return 'var(--colors-foundation02)';
  }
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'secondary':
        return 'var(--colors-neutral)';
      case 'success':
        return darken(0.2, cssVar('--colors-success', '#bada55') as string);
      case 'danger':
        return darken(0.2, cssVar('--colors-danger', '#bada55') as string);
      default:
        return darken(0.2, cssVar('--colors-primary', '#bada55') as string);
    }
  }
  if (props.variant !== 'solid' && props.isInverse) {
    return 'var(--colors-neutral08)';
  }
  if (props.color === 'secondary' && !props.isInverse) {
    return 'var(--colors-neutral)';
  }
  return 'var(--colors-neutral08)';
}
