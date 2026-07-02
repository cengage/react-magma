import { transparentize } from 'polished';

import { token, TokenPath } from '../../theme/tokens';

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

function cssToken(props, path: TokenPath): string {
  return token.var(path, { theme: props.theme });
}

export function buildButtonBorderRadius(props) {
  switch (props.shape) {
    case 'round':
      return props.iconOnly ? '100%' : '2rem';
    case 'leftCap':
      return `${cssToken(props, 'components.button.borderRadius')} 0 0 ${cssToken(
        props,
        'components.button.borderRadius'
      )}`;
    case 'rightCap':
      return `0 ${cssToken(props, 'components.button.borderRadius')} ${cssToken(
        props,
        'components.button.borderRadius'
      )} 0`;
    default:
      //fill
      return cssToken(props, 'components.button.borderRadius');
  }
}

export function buildButtonFontSize(props) {
  switch (props.size) {
    case 'small':
      return cssToken(props, 'components.button.size.small.fontSize');
    case 'large':
      return cssToken(props, 'components.button.size.large.fontSize');
    default:
      //medium
      return cssToken(props, 'components.button.size.medium.fontSize');
  }
}

export function buildButtonLineHeight(props) {
  switch (props.size) {
    case 'small':
      return cssToken(props, 'components.button.size.small.lineHeight');
    case 'large':
      return cssToken(props, 'components.button.size.large.lineHeight');
    default:
      //medium
      return cssToken(props, 'components.button.size.medium.lineHeight');
  }
}

export function buildButtonSize(props) {
  switch (props.size) {
    case 'small':
      return cssToken(props, 'components.button.size.small.height');
    case 'large':
      return cssToken(props, 'components.button.size.large.height');
    default:
      //medium
      return cssToken(props, 'components.button.size.medium.height');
  }
}

export function buildButtonPadding(props) {
  switch (props.size) {
    case 'small':
      return cssToken(props, 'components.button.size.small.padding');
    case 'large':
      return cssToken(props, 'components.button.size.large.padding');
    default:
      //medium
      return cssToken(props, 'components.button.size.medium.padding');
  }
}

export function buildButtonBackground(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.disabled) {
    if (props.isInverse) {
      if (
        props.color === 'secondary' ||
        props.color === 'subtle' ||
        props.variant === 'link'
      ) {
        return 'none';
      }

      return transparentize(0.7, props.theme.colors.neutral100);
    }
    if (props.variant === 'link') {
      return 'none';
    }
    if (props.color === 'secondary' || props.color === 'subtle') {
      return cssToken(props, 'colors.neutral100');
    }

    return cssToken(props, 'colors.neutral300');
  }

  if (props.isInverse) {
    if (props.variant === 'link') {
      return 'none';
    }
    if (props.color === 'secondary') {
      return 'none';
    }
    if (props.color === 'marketing') {
      return cssToken(props, 'colors.secondary500');
    }
    if (props.color === 'danger') {
      return cssToken(props, 'colors.danger');
    }
    if (props.color === 'subtle') {
      return 'none';
    }
    if (props.color === 'success') {
      return cssToken(props, 'colors.success500');
    }

    return cssToken(props, 'colors.tertiary500');
  }

  if (props.variant === 'link') {
    return 'none';
  }

  switch (props.color) {
    case 'secondary':
      return cssToken(props, 'colors.neutral100');
    case 'marketing':
      return cssToken(props, 'colors.secondary500');
    case 'danger':
      return cssToken(props, 'colors.danger');
    case 'subtle':
      return cssToken(props, 'colors.neutral100');
    case 'success':
      return cssToken(props, 'colors.success500');
    default:
      return cssToken(props, 'colors.primary');
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

    return cssToken(props, 'colors.neutral300');
  }

  if (props.isInverse) {
    if (props.color === 'secondary') {
      return transparentize(0.5, props.theme.colors.tertiary500);
    }
    if (props.color === 'subtle') {
      return transparentize(0.8, props.theme.colors.neutral100);
    }

    return cssToken(props, 'colors.neutral100');
  }

  if (props.color === 'marketing') {
    return cssToken(props, 'colors.secondary500');
  }
  if (props.color === 'secondary') {
    return cssToken(props, 'colors.primary300');
  }
  if (props.color === 'subtle') {
    return cssToken(props, 'colors.neutral300');
  }
  if (props.variant === 'solid') {
    switch (props.color) {
      case 'danger':
        return cssToken(props, 'colors.danger');
      default:
        return cssToken(props, 'colors.primary');
    }
  }
}

export function buildColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.disabled) {
    if (props.isInverse) {
      if (
        props.color === 'secondary' ||
        props.color === 'subtle' ||
        props.variant === 'link'
      ) {
        return transparentize(0.7, props.theme.colors.neutral100);
      }

      return transparentize(0.6, props.theme.colors.neutral100);
    }

    return transparentize(0.4, props.theme.colors.neutral500);
  }

  if (props.isInverse) {
    if (props.color === 'subtle') {
      return cssToken(props, 'colors.neutral100');
    }
    if (props.color === 'success') {
      if (props.variant === 'link') {
        return cssToken(props, 'colors.success300');
      }

      return cssToken(props, 'colors.neutral100');
    }
    if (props.variant === 'link') {
      if (props.color === 'danger') {
        return cssToken(props, 'colors.danger200');
      }

      return cssToken(props, 'colors.tertiary500');
    }
    if (props.color === 'secondary') {
      return cssToken(props, 'colors.tertiary500');
    }
    if (props.color === 'marketing') {
      return cssToken(props, 'colors.primary500');
    }
    if (props.color === 'danger') {
      return cssToken(props, 'colors.neutral100');
    }

    return cssToken(props, 'colors.primary700');
  }

  if (props.variant === 'link') {
    switch (props.color) {
      case 'danger':
        return cssToken(props, 'colors.danger500');
      case 'subtle':
        return cssToken(props, 'colors.neutral700');
      case 'success':
        return cssToken(props, 'colors.success500');
      default:
        return cssToken(props, 'colors.primary');
    }
  }

  switch (props.color) {
    case 'secondary':
      return cssToken(props, 'colors.primary');
    case 'marketing':
      return cssToken(props, 'colors.primary');
    case 'subtle':
      return cssToken(props, 'colors.neutral700');
    default:
      return cssToken(props, 'colors.neutral100');
  }
}

export function buildFocusBackground(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  // All inverse link buttons have the same background color
  if (props.variant === 'link' && props.isInverse) {
    return transparentize(0.7, props.theme.colors.neutral900);
  }
  if (props.color === 'marketing') {
    return cssToken(props, 'colors.secondary600');
  }
  if (props.color === 'danger') {
    if (props.variant === 'link') {
      return cssToken(props, 'colors.danger100');
    }

    return cssToken(props, 'colors.danger600');
  }
  if (props.color === 'success') {
    if (props.variant === 'link') {
      return cssToken(props, 'colors.success100');
    }

    return cssToken(props, 'colors.success600');
  }
  if (props.color === 'secondary') {
    if (props.isInverse) {
      // solid && inverse
      return transparentize(0.7, props.theme.colors.neutral900);
    }

    return cssToken(props, 'colors.primary100');
  }
  if (props.color === 'subtle') {
    if (props.isInverse) {
      return transparentize(0.7, props.theme.colors.neutral900);
    }

    return transparentize(0.95, props.theme.colors.neutral900);
  }
  // primary
  if (props.variant === 'solid' && props.isInverse) {
    return cssToken(props, 'colors.tertiary600');
  }
  if (props.variant === 'link') {
    return cssToken(props, 'colors.primary100');
  }

  return cssToken(props, 'colors.primary600');
}

// Same styles for hover and focus
export function buildFocusColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.color === 'marketing') {
    if (!props.isInverse || props.variant === 'solid') {
      return cssToken(props, 'colors.primary');
    }
  }

  if (props.color === 'danger') {
    if (props.variant !== 'solid' && !props.isInverse) {
      return cssToken(props, 'colors.danger600');
    }
    if (props.variant === 'solid' && props.isInverse) {
      return cssToken(props, 'colors.neutral100');
    }
  }

  if (props.color === 'secondary') {
    if (props.isInverse) {
      return cssToken(props, 'colors.tertiary500');
    }

    return cssToken(props, 'colors.primary');
  }

  if (props.color === 'subtle') {
    if (props.isInverse) {
      return cssToken(props, 'colors.neutral100');
    }

    return cssToken(props, 'colors.neutral700');
  }

  if (props.variant === 'link' && !props.isInverse) {
    if (props.color === 'success') {
      return cssToken(props, 'colors.success600');
    }

    return cssToken(props, 'colors.primary');
  }

  if (props.variant === 'link' && props.isInverse) {
    switch (props.color) {
      case 'primary':
        return cssToken(props, 'colors.tertiary500');
      case 'marketing':
        return cssToken(props, 'colors.tertiary500');
      case 'success':
        return cssToken(props, 'colors.success300');
      case 'danger':
        return cssToken(props, 'colors.danger200');
      default:
        return cssToken(props, 'colors.tertiary500');
    }
  }

  if (props.variant === 'solid' && props.isInverse) {
    if (props.color === 'success') {
      return cssToken(props, 'colors.neutral100');
    }

    return cssToken(props, 'colors.primary700');
  }

  return cssToken(props, 'colors.neutral100');
}

export function buildActiveBackground(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.color === 'marketing') {
    if (props.variant !== 'solid' && props.isInverse) {
      return transparentize(0.7, props.theme.colors.neutral900);
    }

    return cssToken(props, 'colors.secondary700');
  }
  if (props.color === 'danger') {
    if (props.isInverse) {
      if (props.variant !== 'solid') {
        return transparentize(0.5, props.theme.colors.neutral900);
      }

      return cssToken(props, 'colors.danger700');
    }
    if (props.variant !== 'solid') {
      return cssToken(props, 'colors.danger200');
    }
  }
  if (props.color === 'success') {
    if (props.variant === 'link') {
      if (props.isInverse) {
        return transparentize(0.5, props.theme.colors.neutral900);
      }

      return cssToken(props, 'colors.success200');
    }

    return cssToken(props, 'colors.success700');
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
    return cssToken(props, 'colors.tertiary700');
  }

  if (props.variant === 'link') {
    if (props.isInverse) {
      return transparentize(0.5, props.theme.colors.neutral900);
    }

    return cssToken(props, 'colors.primary200');
  }

  switch (props.color) {
    case 'secondary':
      return cssToken(props, 'colors.primary200');
    case 'danger':
      return cssToken(props, 'colors.danger700');
    default:
      return cssToken(props, 'colors.primary700');
  }
}

export function buildActiveColor(props) {
  props = buildPropsWithDefaultButtonStyles(props);

  if (props.color === 'danger') {
    if (props.variant !== 'solid') {
      if (props.isInverse) {
        return cssToken(props, 'colors.danger200');
      }

      return cssToken(props, 'colors.danger700');
    }
  }
  if (props.color === 'success' && props.variant === 'link') {
    if (props.isInverse) {
      return cssToken(props, 'colors.success300');
    }

    return cssToken(props, 'colors.success700');
  }

  if (props.color === 'secondary' && props.variant === 'solid') {
    if (props.isInverse) {
      return cssToken(props, 'colors.tertiary500');
    }

    return cssToken(props, 'colors.primary600');
  }
  if (props.color === 'subtle') {
    if (props.isInverse) {
      return cssToken(props, 'colors.neutral100');
    }

    return cssToken(props, 'colors.neutral700');
  }
  if (
    (props.variant !== 'solid' && !props.isInverse) ||
    (props.variant === 'solid' && props.isInverse)
  ) {
    switch (props.color) {
      case 'danger':
        return cssToken(props, 'colors.neutral100');
      case 'success':
        return cssToken(props, 'colors.neutral100');
      default:
        return cssToken(props, 'colors.primary600');
    }
  }
  if (props.variant !== 'solid' && props.isInverse) {
    switch (props.color) {
      case 'primary':
        return cssToken(props, 'colors.tertiary500');
      case 'secondary':
        return cssToken(props, 'colors.tertiary500');
      case 'marketing':
        return cssToken(props, 'colors.tertiary500');
      default:
        return cssToken(props, 'colors.neutral100');
    }
  }

  if (props.color === 'marketing' && !props.isInverse) {
    return cssToken(props, 'colors.primary600');
  }

  return cssToken(props, 'colors.neutral100');
}
