import { ThemeTransitions, transitions } from './components/transition';

export interface Colors {
  primary: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;

  secondary: string;
  secondary500: string;
  secondary600: string;
  secondary700: string;

  tertiary: string;
  tertiary500: string;
  tertiary600: string;
  tertiary700: string;

  neutral: string;
  neutral100: string;
  neutral200: string;
  neutral300: string;
  neutral400: string;
  neutral500: string;
  neutral600: string;
  neutral700: string;
  neutral800: string;
  neutral900: string;

  info: string;
  info100: string;
  info200: string;
  info300: string;
  info400: string;
  info500: string;
  info600: string;
  info700: string;

  danger: string;
  danger100: string;
  danger200: string;
  danger300: string;
  danger400: string;
  danger500: string;
  danger600: string;
  danger700: string;

  warning: string;
  warning100: string;
  warning200: string;
  warning300: string;
  warning400: string;
  warning500: string;
  warning600: string;
  warning700: string;

  success: string;
  success100: string;
  success200: string;
  success300: string;
  success400: string;
  success500: string;
  success600: string;
  success700: string;

  focus: string;
  focusInverse: string;

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
  xLarge: number;
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
  heading2XLarge: any;
  headingXLarge: any;
  headingLarge: any;
  headingMedium: any;
  headingSmall: any;
  headingXSmall: any;
  heading2XSmall: any;
  bodyLarge: any;
  bodyMedium: any;
  bodySmall: any;
  bodyXSmall: any;
}

export interface TypeScaleSize {
  fontSize: string;
  letterSpacing?: string;
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
  size14: TypeScaleSize;
  size15: TypeScaleSize;
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

export interface TypographyVisualStylesExpressive {
  heading2XLarge: VisualStyle;
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
export interface Modal {
  width: {
    small: string;
    medium: string;
    large: string;
  };
}

interface Drawer {
  default: {
    maxWidth: string;
    minHeight: string;
    borderRadius: string;
    margin: string;
    top: string;
    bottom: string;
    left: string;
    right: string;
    position: string;
  };
  right: {
    left: string;
    height: string;
    width: string;
  };
  left: {
    right: string;
    height: string;
    width: string;
  };
  top: {
    bottom: string;
    height: string;
  };
  bottom: {
    top: string;
    height: string;
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
  breakpoints: Breakpoints;
  bodyFont: string;
  bodyExpressiveFont: string;
  bodyNarrativeFont: string;
  borderRadius: string;
  borderRadiusSmall: string;
  colors: Colors;
  combobox: Combobox;
  direction: string;
  drawer: Drawer;
  dropdown: Dropdown;
  headingFont: string;
  iconSizes: IconSizes;
  iterableColors: string[];
  chartColors?: string[];
  chartColorsInverse?: string[];
  spacingMultiplier: number;
  spaceScale: SpacingScale;
  headingExpressiveFont: string;
  headingNarrativeFont: string;
  select: Select;
  typeScale: TypeScale;
  typographyVisualStyles: TypographyVisualStyles;
  typographyExpressiveVisualStyles: TypographyVisualStylesExpressive;
  typographyNarrativeVisualStyles: TypographyVisualStyles;
  modal: Modal;
  tabs: Tabs;
  tooltip: Tooltip;
  transitions: ThemeTransitions;
}

const typeScale = {
  size01: {
    fontSize: '12px',
    letterSpacing: '.32px',
    lineHeight: '16px',
  },
  size02: {
    fontSize: '14px',
    letterSpacing: '.16px',
    lineHeight: '20px',
  },
  size03: {
    fontSize: '16px',
    letterSpacing: '.32px',
    lineHeight: '24px',
  },
  size04: {
    fontSize: '18px',
    lineHeight: '24px',
  },
  size05: {
    fontSize: '20px',
    lineHeight: '32px',
  },
  size06: {
    fontSize: '24px',
    lineHeight: '32px',
  },
  size07: {
    fontSize: '28px',
    lineHeight: '40px',
  },
  size08: {
    fontSize: '32px',
    lineHeight: '40px',
  },
  size09: {
    fontSize: '36px',
    lineHeight: '48px',
  },
  size10: {
    fontSize: '42px',
    lineHeight: '48px',
  },
  size11: {
    fontSize: '48px',
    lineHeight: '56px',
  },
  size12: {
    fontSize: '52px',
    lineHeight: '68px',
  },
  size13: {
    fontSize: '54px',
    lineHeight: '64px',
  },
  size14: {
    fontSize: '60px',
    lineHeight: '72px',
  },
  size15: {
    fontSize: '72px',
    lineHeight: '84px',
  },
};

const primaryColors = {
  primary100: '#E8E9F8',
  primary200: '#BABDE9',
  primary300: '#8B91DA',
  primary400: '#5D65CB',
  primary500: '#3942B0',
  primary600: '#292F7C',
  primary700: '#1A1E51',
};

const secondaryColors = {
  secondary500: '#FEE449',
  secondary600: '#FEDA0D',
  secondary700: '#ECC901',
};

const tertiaryColors = {
  tertiary500: '#CDDEFF',
  tertiary600: '#A2C1FF',
  tertiary700: '#79A5FF',
};

const neutralColors = {
  neutral100: '#FFFFFF', // white
  neutral200: '#F5F5F5',
  neutral300: '#D4D4D4',
  neutral400: '#8D8D8D',
  neutral500: '#707070',
  neutral600: '#5A5A5A',
  neutral700: '#454545',
  neutral800: '#2D2D2D',
  neutral900: '#000000', // black
};

const infoColors = {
  info100: '#E8F5FC',
  info200: '#A6DEFF',
  info300: '#2FB3FF',
  info400: '#009AF3',
  info500: '#0074B7',
  info600: '#005F96',
  info700: '#004A75',
};

const dangerColors = {
  danger100: '#FDEFEE',
  danger200: '#FAAEB0',
  danger300: '#E8716D',
  danger400: '#E24943',
  danger500: '#D32821',
  danger600: '#A91F1A',
  danger700: '#7F1714',
};

const warningColors = {
  warning100: '#FCEEE5',
  warning200: '#F6CDB2',
  warning300: '#E98B4C',
  warning400: '#E06A1C',
  warning500: '#AD5115',
  warning600: '#8D4311',
  warning700: '#6E340E',
};

const successColors = {
  success100: '#E3FAEA',
  success200: '#ACF0C1',
  success300: '#3EDD6E',
  success400: '#21B94E',
  success500: '#178037',
  success600: '#136A2D',
  success700: '#0F5323',
};

const colors = {
  primary: primaryColors.primary500,
  secondary: secondaryColors.secondary500,
  tertiary: tertiaryColors.tertiary500,
  neutral: neutralColors.neutral500,
  info: infoColors.info500,
  danger: dangerColors.danger500,
  warning: warningColors.warning500,
  success: successColors.success500,
  ...primaryColors,
  ...secondaryColors,
  ...tertiaryColors,
  ...neutralColors,
  ...infoColors,
  ...dangerColors,
  ...warningColors,
  ...successColors,

  focus: infoColors.info500,
  focusInverse: infoColors.info200,

  border: neutralColors.neutral300,
  borderInverse: 'rgba(255,255,255,0.25)',
};

const spaceScale = {
  spacing01: '2px',
  spacing02: '4px',
  spacing03: '8px',
  spacing04: '12px',
  spacing05: '16px',
  spacing06: '24px',
  spacing07: '28px',
  spacing08: '32px',
  spacing09: '40px',
  spacing10: '48px',
  spacing11: '56px',
  spacing12: '64px',
  spacing13: '96px',
  spacing14: '160px',
};

export const magma = {
  bodyFont: '"Work Sans",Helvetica,sans-serif',
  bodyExpressiveFont: '"Work Sans",Helvetica,sans-serif',
  bodyNarrativeFont: "'Noto Serif',Times New Roman,serif",
  borderRadius: '8px',
  borderRadiusSmall: '4px',
  colors: colors,
  headingFont: '"Work Sans",Helvetica,sans-serif',
  headingExpressiveFont: '"Work Sans",Helvetica,sans-serif',
  headingNarrativeFont: "'Noto Serif',Times New Roman,serif",
  direction: 'ltr',
  spacingMultiplier: 8,
  transitions,
  // breakpoints
  breakpoints: {
    xs: 0,
    small: 600,
    medium: 768,
    large: 1024,
    xl: 1200,
  },

  spaceScale: spaceScale,

  iconSizes: {
    xSmall: 16,
    small: 20,
    medium: 24,
    large: 32,
    xLarge: 54,
  },

  // Typography
  typeScale: typeScale,
  typographyVisualStyles: {
    // Productive
    headingXLarge: {
      mobile: typeScale.size07,
      desktop: typeScale.size09,
      fontWeight: 600,
    },
    headingLarge: {
      mobile: typeScale.size06,
      desktop: typeScale.size07,
      fontWeight: 600,
    },
    headingMedium: {
      mobile: typeScale.size05,
      desktop: typeScale.size06,
      fontWeight: 600,
    },
    headingSmall: {
      mobile: typeScale.size04,
      desktop: typeScale.size05,
      fontWeight: 600,
    },
    headingXSmall: {
      mobile: typeScale.size04,
      desktop: typeScale.size04,
      fontWeight: 600,
    },
    heading2XSmall: {
      mobile: typeScale.size01,
      desktop: typeScale.size01,
      fontWeight: 700,
    },
    bodyLarge: {
      mobile: typeScale.size04,
      desktop: typeScale.size05,
    },
    bodyMedium: {
      mobile: typeScale.size03,
      desktop: typeScale.size03,
    },
    bodySmall: {
      mobile: typeScale.size02,
      desktop: typeScale.size02,
    },
    bodyXSmall: {
      mobile: typeScale.size01,
      desktop: typeScale.size01,
    },
  },
  typographyExpressiveVisualStyles: {
    heading2XLarge: {
      mobile: typeScale.size13,
      desktop: typeScale.size15,
      fontWeight: 600,
    },
    headingXLarge: {
      mobile: typeScale.size10,
      desktop: typeScale.size12,
      fontWeight: 400,
    },
    headingLarge: {
      mobile: typeScale.size07,
      desktop: typeScale.size09,
      fontWeight: 300,
    },
    headingMedium: {
      mobile: typeScale.size06,
      desktop: typeScale.size07,
      fontWeight: 300,
    },
    headingSmall: {
      mobile: typeScale.size05,
      desktop: typeScale.size06,
      fontWeight: 300,
    },
    headingXSmall: {
      mobile: typeScale.size04,
      desktop: typeScale.size05,
      fontWeight: 300,
    },
    heading2XSmall: {
      mobile: typeScale.size03,
      desktop: typeScale.size03,
      fontWeight: 700,
    },
    bodyLarge: {
      mobile: typeScale.size05,
      desktop: typeScale.size06,
    },
    bodyMedium: {
      mobile: typeScale.size03,
      desktop: typeScale.size03,
    },
    bodySmall: {
      mobile: typeScale.size02,
      desktop: typeScale.size02,
    },
    bodyXSmall: {
      mobile: typeScale.size01,
      desktop: typeScale.size01,
    },
  },
  typographyNarrativeVisualStyles: {
    headingXLarge: {
      mobile: typeScale.size07,
      desktop: typeScale.size08,
      fontWeight: 700,
    },
    headingLarge: {
      mobile: typeScale.size06,
      desktop: typeScale.size07,
      fontWeight: 700,
    },
    headingMedium: {
      mobile: typeScale.size05,
      desktop: typeScale.size06,
      fontWeight: 700,
    },
    headingSmall: {
      mobile: typeScale.size04,
      desktop: typeScale.size05,
      fontWeight: 700,
    },
    headingXSmall: {
      mobile: typeScale.size04,
      desktop: typeScale.size04,
      fontWeight: 700,
    },
    heading2XSmall: {
      mobile: typeScale.size01,
      desktop: typeScale.size01,
      fontWeight: 700,
    },
    bodyLarge: {
      mobile: typeScale.size04,
      desktop: typeScale.size05,
    },
    bodyMedium: {
      mobile: typeScale.size03,
      desktop: typeScale.size03,
    },
    bodySmall: {
      mobile: typeScale.size02,
      desktop: typeScale.size02,
    },
    bodyXSmall: {
      mobile: typeScale.size01,
      desktop: typeScale.size01,
    },
  },

  appBar: {
    backgroundColor: colors.neutral100,
    height: '88px',
    padding: `${spaceScale.spacing06} ${spaceScale.spacing05}`,
    textColor: colors.neutral,
    compact: {
      height: '56px',
      padding: `${spaceScale.spacing05} ${spaceScale.spacing05} ${spaceScale.spacing05} ${spaceScale.spacing06}`,
    },
    inverse: {
      backgroundColor: colors.primary600,
      textColor: colors.neutral100,
    },
  },

  combobox: {
    menu: {
      maxHeight: '250px',
    },
  },

  modal: {
    width: {
      small: '300px',
      medium: '600px',
      large: '900px',
    },
  },

  drawer: {
    default: {
      maxWidth: '100%',
      minHeight: '300px',
      margin: '0',
      borderRadius: '0',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      position: 'relative',
    },
    right: {
      left: 'auto',
      height: '100%',
      width: '300px',
      position: 'fixed',
    },
    left: {
      right: 'auto',
      height: '100%',
      width: '300px',
    },
    top: {
      bottom: 'auto',
      height: '300px',
    },
    bottom: {
      top: 'auto',
      height: '300px',
      position: 'fixed',
    },
  },

  dropdown: {
    content: {
      maxHeight: '250px',
    },
  },

  iterableColors: [
    '#0085CC',
    '#E0004D',
    '#FA6600',
    '#48A200',
    '#B12FAD',
    '#00A393',
    '#00507A',
    '#8F0033',
    '#B84900',
    '#255200',
    '#711E6E',
    '#005249',
  ],

  chartColors: [
    '#009AF3',
    '#E0004D',
    '#1EA746',
    '#FA6600',
    '#B12FAD',
    '#00A393',
    '#005F96',
    '#8F0033',
    '#136A2D',
    '#B84900',
    '#711E6E',
    '#005249',
  ],

  chartColorsInverse: [
    '#1FB0FF',
    '#FF337A',
    '#65E000',
    '#FF9147',
    '#D45ED0',
    '#00E0CA',
    '#85D4FF',
    '#FF99BD',
    '#FFB685',
    '#C7FF99',
    '#E9AFE7',
    '#99FFF5',
  ],

  tabs: {
    approxTabSize: {
      horizontal: 120,
      vertical: 80,
    },
  },

  select: {
    menu: {
      maxHeight: '250px',
    },
  },

  tag: {
    border: '0',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  tooltip: {
    arrowSize: '4px',
    arrowSizeDoubled: '8px',
    backgroundColor: colors.neutral700,
    fontWeight: 500,
    maxWidth: '300px',
    textColor: colors.neutral100,
    typeScale: typeScale.size01,
    zIndex: 999,
    inverse: {
      backgroundColor: colors.neutral100,
      textColor: colors.neutral700,
    },
  },
};
