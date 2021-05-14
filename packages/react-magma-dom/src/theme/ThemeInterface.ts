import { ThemeButtons } from './magma/components/button';
import { ThemeCheckbox } from './magma/components/checkbox';
import { ThemeTransitions } from './magma/components/transition';
import { TypographyColors } from './magma/components/typography';

export interface Colors {
  primary: string;
  focus: string;
  focusInverse: string;
  foundation: string;
  foundation02: string;
  foundation03: string;
  foundation04: string;
  pop: string;
  pop02: string;
  pop03: string;
  pop04: string;
  pop05: string;
  pop06: string;
  success: string;
  success02: string;
  successInverse: string;
  danger: string;
  dangerInverse: string;
  neutral: string;
  neutral02: string;
  neutral03: string;
  neutral04: string;
  neutral05: string;
  neutral06: string;
  neutral07: string;
  neutral08: string;
  disabledText: string;
  disabledInverseText: string;
  toggleBoxShadow: string;
  shade: string;
  shade02: string;
  tint: string;
  tint02: string;
  tint03: string;
  tint04: string;
  tone: string;
  tone02: string;
  border: string;
  borderInverse: string;
}

export interface Breakpoints {
  xs: number;
  small: number;
  medium: number;
  large: number;
  xl: number;
}

export interface IconSizes {
  xSmall: number;
  small: number;
  medium: number;
  large: number;
}

export interface SpacingScale {
  spacing01: string;
  spacing02: string;
  spacing03: string;
  spacing04: string;
  spacing05: string;
  spacing06: string;
  spacing07: string;
  spacing08: string;
  spacing09: string;
  spacing10: string;
  spacing11: string;
  spacing12: string;
  spacing13: string;
  spacing14: string;
}

export interface TypographyExpressiveSizes {
  headingXLarge: any;
  headingLarge: any;
  headingMedium: any;
  headingSmall: any;
  headingXSmall: any;
  headingXXSmall: any;
  bodyLarge: any;
  bodyMedium: any;
  bodySmall: any;
  bodyXSmall: any;
}

export interface TypeScaleSize {
  fontSize: string;
  lineHeight: string;
}

export interface TypeScale {
  size01: TypeScaleSize;
  size02: TypeScaleSize;
  size03: TypeScaleSize;
  size04: TypeScaleSize;
  size05: TypeScaleSize;
  size06: TypeScaleSize;
  size07: TypeScaleSize;
  size08: TypeScaleSize;
  size09: TypeScaleSize;
  size10: TypeScaleSize;
  size11: TypeScaleSize;
  size12: TypeScaleSize;
  size13: TypeScaleSize;
}

export interface VisualStyle {
  mobile: TypeScaleSize;
  desktop: TypeScaleSize;
  fontWeight?: number;
}

export interface TypographyVisualStyles {
  headingXLarge: VisualStyle;
  headingLarge: VisualStyle;
  headingMedium: VisualStyle;
  headingSmall: VisualStyle;
  headingXSmall: VisualStyle;
  heading2XSmall: VisualStyle;
  bodyLarge: VisualStyle;
  bodyMedium: VisualStyle;
  bodySmall: VisualStyle;
  bodyXSmall: VisualStyle;
}

interface AppBar {
  backgroundColor: string;
  height: string;
  padding: string;
  textColor: string;
  compact: {
    height: string;
    padding: string;
  };
  inverse: {
    backgroundColor: string;
    textColor: string;
  };
}

export interface ThemeHyperlink {
  textColor: string;
  textHoverColor: string;
  inverse: {
    textColor: string;
    textHoverColor: string;
  };
}

export interface Modal {
  width: {
    small: string;
    medium: string;
    large: string;
  };
}

interface Combobox {
  menu: {
    maxHeight: string;
  };
}

interface Dropdown {
  content: {
    maxHeight: string;
  };
}

interface Select {
  menu: {
    maxHeight: string;
  };
}

interface Tabs {
  approxTabSize: {
    horizontal: number;
    vertical: number;
  };
}

export interface Tooltip {
  arrowSize: string;
  arrowSizeDoubled: string;
  backgroundColor: string;
  fontWeight: number | string;
  maxWidth: string;
  textColor: string;
  typeScale: TypeScaleSize;
  zIndex: number;
  inverse: any;
}

export interface ThemeInterface {
  appBar: AppBar;
  bodyFont: string;
  bodyExpressiveFont: string;
  bodyNarrativeFont: string;
  borderRadius: string;
  breakpoints: Breakpoints;
  button?: ThemeButtons;
  colors: Colors;
  checkbox: ThemeCheckbox;
  combobox: Combobox;
  direction: string;
  dropdown: Dropdown;
  headingFont: string;
  hyperlink: ThemeHyperlink;
  iconSizes: IconSizes;
  spacingMultiplier: number;
  spaceScale: SpacingScale;
  headingExpressiveFont: string;
  headingNarrativeFont: string;
  select: Select;
  typeScale: TypeScale;
  typographyVisualStyles: TypographyVisualStyles;
  typographyExpressiveVisualStyles: TypographyVisualStyles;
  typographyNarrativeVisualStyles: TypographyVisualStyles;
  typographyColors: TypographyColors;
  modal: Modal;
  tabs: Tabs;
  tooltip: Tooltip;
  transitions: ThemeTransitions;
}
