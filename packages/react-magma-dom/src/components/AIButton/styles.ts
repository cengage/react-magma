import { transparentize } from 'polished';

import { AIButtonShape, AIButtonSize, AIButtonVariant } from '.';

const DEFAULT_STYLE_PROPS = {
  shape: 'fill',
  size: 'medium',
  textTransform: 'uppercase',
  variant: 1,
};

export function buildPropsWithDefaultAIButtonStyles(props) {
  return { ...DEFAULT_STYLE_PROPS, ...props };
}

export function buildAIButtonBorderRadius(props) {
  switch (props.shape) {
    case AIButtonShape.round:
      return '100%';
    case AIButtonShape.leftCap:
      return `${props.theme.borderRadius} 0 0 ${props.theme.borderRadius}`;
    case AIButtonShape.rightCap:
      return `0 ${props.theme.borderRadius} ${props.theme.borderRadius} 0`;
    default:
      //fill
      return props.theme.borderRadius;
  }
}

export function buildAIButtonFontSize(props) {
  switch (props.size) {
    case AIButtonSize.small:
      return props.theme.typeScale.size01.fontSize;
    case AIButtonSize.large:
      return props.theme.typeScale.size04.fontSize;
    default:
      //medium
      return props.theme.typeScale.size03.fontSize;
  }
}

export function buildAIButtonLineHeight(props) {
  switch (props.size) {
    case AIButtonSize.small:
      return props.theme.typeScale.size01.lineHeight;
    case AIButtonSize.large:
      return props.theme.typeScale.size04.lineHeight;
    default:
      //medium
      return props.theme.typeScale.size03.lineHeight;
  }
}

export function buildAIButtonSize(props) {
  switch (props.size) {
    case AIButtonSize.small:
      return props.theme.spaceScale.spacing07;
    case AIButtonSize.large:
      return props.theme.spaceScale.spacing11;
    default:
      //medium
      return props.theme.spaceScale.spacing09;
  }
}

export function buildAIButtonPadding(props) {
  switch (props.size) {
    case AIButtonSize.small:
      return `${props.theme.spaceScale.spacing02} ${props.theme.spaceScale.spacing03}`;
    case AIButtonSize.large:
      return `${props.theme.spaceScale.spacing04} ${props.theme.spaceScale.spacing06}`;
    default:
      //medium
      return `${props.theme.spaceScale.spacing04} ${props.theme.spaceScale.spacing05}`;
  }
}

export function buildAIButtonBackground(initialProps) {
  const props = buildPropsWithDefaultAIButtonStyles(initialProps);

  if (props.disabled) {
    if (props.isInverse) {
      return transparentize(0.7, props.theme.colors.neutral100);
    }

    return props.theme.colors.neutral300;
  }

  if (props.variant === AIButtonVariant.variantA) {
    return `linear-gradient(268deg, ${props.rightColor ?? props.theme.colors.aiColors.variantA.right} 0%, ${props.leftColor ?? props.theme.colors.aiColors.variantA.left} 100%)`;
  } else {
    return `linear-gradient(268deg, ${props.rightColor ?? props.theme.colors.aiColors.variantB.right} 0%, ${props.leftColor ?? props.theme.colors.aiColors.variantB.left} 100%)`;
  }
}

export function buildAIBorderColor(initialProps) {
  const props = buildPropsWithDefaultAIButtonStyles(initialProps);

  if (props.disabled) {
    if (props.isInverse) {
      return 'none';
    }
    return props.theme.colors.neutral300;
  }

  if (props.variant === AIButtonVariant.variantA) {
    return `linear-gradient(268deg, ${props.rightColor ?? props.theme.colors.aiColors.variantA.right} 0%, ${props.leftColor ?? props.theme.colors.aiColors.variantA.left} 100%)`;
  } else {
    return `linear-gradient(268deg, ${props.rightColor ?? props.theme.colors.aiColors.variantB.right} 0%, ${props.leftColor ?? props.theme.colors.aiColors.variantB.left} 100%)`;
  }
}

export function buildAIColor(initialProps) {
  const props = buildPropsWithDefaultAIButtonStyles(initialProps);

  if (props.disabled) {
    if (props.isInverse) {
      return transparentize(0.6, props.theme.colors.neutral100);
    }
    return transparentize(0.4, props.theme.colors.neutral500);
  }

  return props.theme.colors.neutral100;
}

export function buildAIFocusBackground(initialProps) {
  const props = buildPropsWithDefaultAIButtonStyles(initialProps);

  if (props.variant === AIButtonVariant.variantA) {
    return `linear-gradient(268deg, ${props.hoverColor ?? props.theme.colors.aiColors.variantA.hover} 0%, ${props.hoverColor ?? props.theme.colors.aiColors.variantA.hover} 100%)`;
  } else {
    return `linear-gradient(268deg, ${props.hoverColor ?? props.theme.colors.aiColors.variantB.hover} 0%, ${props.hoverColor ?? props.theme.colors.aiColors.variantB.hover} 100%)`;
  }
}

// Same styles for hover and focus
export function buildAIFocusColor(initialProps) {
  const props = buildPropsWithDefaultAIButtonStyles(initialProps);

  return props.theme.colors.neutral100;
}

export function buildAIActiveBackground(initialProps) {
  const props = buildPropsWithDefaultAIButtonStyles(initialProps);

  if (props.variant === AIButtonVariant.variantA) {
    return `linear-gradient(268deg, ${props.pressedColor ?? props.theme.colors.aiColors.variantA.pressed} 0%, ${props.pressedColor ?? props.theme.colors.aiColors.variantA.pressed} 100%)`;
  } else {
    return `linear-gradient(268deg, ${props.pressedColor ?? props.theme.colors.aiColors.variantB.pressed} 0%, ${props.pressedColor ?? props.theme.colors.aiColors.variantB.pressed} 100%)`;
  }
}

export function buildAIActiveColor(initialProps) {
  const props = buildPropsWithDefaultAIButtonStyles(initialProps);

  return props.theme.colors.neutral100;
}
