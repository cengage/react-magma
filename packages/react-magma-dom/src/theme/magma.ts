import { ThemeTransitions, transitions } from './components/transition';

export interface Colors {
  brand: {
    navy: string;
    cyan: string;
    cyanDeep: string;
    cyanElectric: string;
    sunriseOrange: string;
    galeOrange: string;
  };

  primary: string;
  secondary: string;
  tertiary: string;
  neutral: string;
  neutral0: string;
  neutral100: string;
  neutral150: string;
  neutral200: string;
  neutral300: string;
  neutral400: string;
  neutral500: string;
  neutral600: string;
  neutral700: string;
  neutral800: string;
  neutral900: string;
  neutral1000: string;
  neutral1100: string;
  neutral1150: string;
  neutral1200: string;

  blue100: string;
  blue200: string;
  blue300: string;
  blue400: string;
  blue500: string;
  blue600: string;
  blue700: string;
  blue800: string;
  blue900: string;
  blue1000: string;
  cyan100: string;
  cyan200: string;
  cyan300: string;
  cyan400: string;
  cyan500: string;
  cyan600: string;
  cyan700: string;
  cyan800: string;
  cyan900: string;
  cyan1000: string;
  green100: string;
  green200: string;
  green300: string;
  green400: string;
  green500: string;
  green600: string;
  green700: string;
  green800: string;
  green900: string;
  green1000: string;
  red100: string;
  red200: string;
  red300: string;
  red400: string;
  red500: string;
  red600: string;
  red700: string;
  red800: string;
  red900: string;
  red1000: string;
  tangerine100: string;
  tangerine200: string;
  tangerine300: string;
  tangerine400: string;
  tangerine500: string;
  tangerine600: string;
  tangerine700: string;
  tangerine800: string;
  tangerine900: string;
  tangerine1000: string;
  yellow100: string;
  yellow200: string;
  yellow300: string;
  yellow400: string;
  yellow500: string;
  yellow600: string;
  yellow700: string;
  yellow800: string;
  yellow900: string;
  yellow1000: string;

  indigo100: string;
  indigo200: string;
  indigo300: string;
  indigo400: string;
  indigo500: string;
  indigo600: string;
  indigo700: string;
  indigo800: string;
  indigo900: string;
  indigo1000: string;
  teal100: string;
  teal200: string;
  teal300: string;
  teal400: string;
  teal500: string;
  teal600: string;
  teal700: string;
  teal800: string;
  teal900: string;
  teal1000: string;
  violet100: string;
  violet200: string;
  violet300: string;
  violet400: string;
  violet500: string;
  violet600: string;
  violet700: string;
  violet800: string;
  violet900: string;
  violet1000: string;
  purple100: string;
  purple200: string;
  purple300: string;
  purple400: string;
  purple500: string;
  purple600: string;
  purple700: string;
  purple800: string;
  purple900: string;
  purple1000: string;

  info: string;
  danger: string;
  warning: string;
  success: string;

  focus: string;
  focusInverse: string;

  border: string;
  borderInverse: string;

  aiColors: {
    variantA: {
      right: string;
      left: string;
      hover: string;
      pressed: string;
    };
    variantB: {
      right: string;
      left: string;
      hover: string;
      pressed: string;
    };
  };
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
  size16: TypeScaleSize;
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
  borderRadiusNone: string;
  borderRadiusExtraSmall: string;
  borderRadiusSmall: string;
  borderRadiusMedium: string;
  borderRadiusLarge: string;
  borderRadiusExtraLarge: string;
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
    lineHeight: '64px',
  },
  size12: {
    fontSize: '52px',
    lineHeight: '64px',
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
    fontSize: '64px',
    lineHeight: '84px',
  },
  size16: {
    fontSize: '72px',
    lineHeight: '84px',
  },
};

const neutralColors = {
  neutral0: '#FFFFFF',
  neutral100: '#F7F9FC',
  neutral150: '#F1F3F7',
  neutral200: '#DEE5EE',
  neutral300: '#C5CEDB',
  neutral400: '#A9B5C4',
  neutral500: '#8B99AA',
  neutral600: '#6F7E91',
  neutral700: '#56667A',
  neutral800: '#3D4A60',
  neutral900: '#2A374A',
  neutral1000: '#1B2636',
  neutral1100: '#101820',
  neutral1150: '#080C10',
  neutral1200: '#000000',
};

const brandColors = {
  navy: '#0B1F3A',
  cyan: '#00B8D9',
  cyanDeep: '#008EBA',
  cyanElectric: '#00E7FF',
  sunriseOrange: '#FD9A04',
  galeOrange: '#F03500',
};

const rebrandColors = {
  blue100: '#EAF4FF',
  blue200: '#C3DFFD',
  blue300: '#94C5F2',
  blue400: '#5EA4E1',
  blue500: '#3082CA',
  blue600: '#0A56A4',
  blue700: '#084684',
  blue800: '#063565',
  blue900: '#042448',
  blue1000: '#02152D',
  cyan100: '#E8FBFE',
  cyan200: '#B5F3FA',
  cyan300: '#7CE9F4',
  cyan400: '#32D3E8',
  cyan500: '#00B8D9',
  cyan600: '#009AB6',
  cyan700: '#007D95',
  cyan800: '#005F72',
  cyan900: '#004351',
  cyan1000: '#002933',
  green100: '#E7FAEF',
  green200: '#BFECCD',
  green300: '#8EDDA9',
  green400: '#4CC77E',
  green500: '#17A962',
  green600: '#00844B',
  green700: '#006C3B',
  green800: '#00512D',
  green900: '#00391E',
  green1000: '#002311',
  red100: '#FFE9EC',
  red200: '#FFC8D0',
  red300: '#FFA0AE',
  red400: '#F66D84',
  red500: '#EB3A59',
  red600: '#C60034',
  red700: '#9E0029',
  red800: '#76001E',
  red900: '#520013',
  red1000: '#330008',
  tangerine100: '#FFF1DE',
  tangerine200: '#FFDDB8',
  tangerine300: '#FFC483',
  tangerine400: '#FFA94B',
  tangerine500: brandColors.sunriseOrange,
  tangerine600: '#C97100',
  tangerine700: '#A25900',
  tangerine800: '#784100',
  tangerine900: '#552B00',
  tangerine1000: '#331800',
  yellow100: '#FFF7D6',
  yellow200: '#FFEBA3',
  yellow300: '#FFD95C',
  yellow400: '#FFC200',
  yellow500: '#D99E00',
  yellow600: '#B27F00',
  yellow700: '#8C6300',
  yellow800: '#674800',
  yellow900: '#493100',
  yellow1000: '#2B1C00',
  indigo100: '#F0F3FF',
  indigo200: '#D5DCF8',
  indigo300: '#B2BDF0',
  indigo400: '#8998DF',
  indigo500: '#6170C6',
  indigo600: '#404FAC',
  indigo700: '#27328C',
  indigo800: '#1C256D',
  indigo900: '#12194E',
  indigo1000: '#080C31',
  teal100: '#E6F7FA',
  teal200: '#BFE8EF',
  teal300: '#8FD3DE',
  teal400: '#51B4C5',
  teal500: '#1592B0',
  teal600: '#0D7892',
  teal700: '#095F75',
  teal800: '#064858',
  teal900: '#03313D',
  teal1000: '#021D25',
  violet100: '#FBEAF9',
  violet200: '#F1C6EC',
  violet300: '#E59ADD',
  violet400: '#CE68C5',
  violet500: '#B847AE',
  violet600: '#982E93',
  violet700: '#782273',
  violet800: '#5B1857',
  violet900: '#3F0D3C',
  violet1000: '#270325',
  purple100: '#F4ECFF',
  purple200: '#DDCCF2',
  purple300: '#C4A6E5',
  purple400: '#A77CD3',
  purple500: '#8959BD',
  purple600: '#6F40A8',
  purple700: '#592D8E',
  purple800: '#421F6B',
  purple900: '#2E134D',
  purple1000: '#1D0832',
};

const colors = {
  brand: brandColors,
  primary: brandColors.navy,
  secondary: brandColors.sunriseOrange,
  tertiary: '#007D95',
  neutral: neutralColors.neutral600,
  info: '#0A56A4',
  danger: '#C60034',
  warning: '#8C6300',
  success: '#00844B',
  ...neutralColors,
  ...rebrandColors,

  focus: rebrandColors.blue500,
  focusInverse: '#5EA4E1',

  border: neutralColors.neutral200,
  borderInverse: neutralColors.neutral800,

  aiColors: {
    variantA: {
      right: '#C3419A',
      left: '#3942B0',
      hover: '#3942B0',
      pressed: '#292F7C',
    },
    variantB: {
      right: '#178037',
      left: '#3942B0',
      hover: '#3942B0',
      pressed: '#292F7C',
    },
  },
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
  bodyFont: 'Inter,Arial,Helvetica,sans-serif',
  bodyExpressiveFont: 'Inter,Arial,Helvetica,sans-serif',
  bodyNarrativeFont: "'Noto Serif',Times New Roman,serif",
  borderRadius: '8px',
  borderRadiusNone: '0px',
  borderRadiusExtraSmall: '4px',
  borderRadiusSmall: '8px',
  borderRadiusMedium: '16px',
  borderRadiusLarge: '24px',
  borderRadiusExtraLarge: '40px',
  colors: colors,
  headingFont: 'Inter,Arial,Helvetica,sans-serif',
  headingExpressiveFont: 'Inter,Arial,Helvetica,sans-serif',
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
      mobile: typeScale.size11,
      desktop: {
        fontSize: '56px',
        lineHeight: '64px',
      },
      fontWeight: 600,
    },
    headingXLarge: {
      mobile: typeScale.size09,
      desktop: {
        fontSize: '48px',
        lineHeight: '56px',
      },
      fontWeight: 600,
    },
    headingLarge: {
      mobile: typeScale.size07,
      desktop: {
        fontSize: '40px',
        lineHeight: '48px',
      },
      fontWeight: 600,
    },
    headingMedium: {
      mobile: typeScale.size06,
      desktop: {
        fontSize: '32px',
        lineHeight: '40px',
      },
      fontWeight: 600,
    },
    headingSmall: {
      mobile: typeScale.size05,
      desktop: {
        fontSize: '24px',
        lineHeight: '28px',
      },
      fontWeight: 600,
    },
    headingXSmall: {
      mobile: typeScale.size04,
      desktop: {
        fontSize: '20px',
        lineHeight: '24px',
      },
      fontWeight: 600,
    },
    heading2XSmall: {
      mobile: typeScale.size03,
      desktop: {
        fontSize: '14px',
        lineHeight: '17px',
      },
      fontWeight: 600,
    },
    bodyLarge: {
      mobile: typeScale.size05,
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
    backgroundColor: colors.neutral0,
    height: '88px',
    padding: `${spaceScale.spacing06} ${spaceScale.spacing05}`,
    textColor: colors.neutral,
    compact: {
      height: '56px',
      padding: `${spaceScale.spacing05} ${spaceScale.spacing05} ${spaceScale.spacing05} ${spaceScale.spacing06}`,
    },
    inverse: {
      backgroundColor: colors.indigo600,
      textColor: colors.neutral0,
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
    '#C7FF99',
    '#FFB685',
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
    arrowSize: '6px',
    arrowSizeDoubled: '12px',
    backgroundColor: colors.neutral1100,
    fontWeight: 500,
    maxWidth: '300px',
    textColor: colors.neutral0,
    typeScale: typeScale.size01,
    zIndex: 999,
    inverse: {
      backgroundColor: colors.neutral0,
      textColor: colors.brand.navy,
    },
  },
};
