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
  tone: string;
  tone02: string;
}

export interface Breakpoints {
  xs: number;
  small: number;
  medium: number;
  large: number;
  xl: number;
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

export interface ThemeInterface {
  breakpoints: Breakpoints;
  bodyFont: string;
  bodyExpressiveFont: string;
  bodyNarrativeFont: string;
  borderRadius: string;
  colors: Colors;
  direction: string;
  headingFont: string;
  spaceScale: SpacingScale;
  headingExpressiveFont: string;
  headingNarrativeFont: string;
  typeScale: TypeScale;
  typographyVisualStyles: TypographyVisualStyles;
  typographyExpressiveVisualStyles: TypographyVisualStyles;
  typographyNarrativeVisualStyles: TypographyVisualStyles;
}

const typeScale = {
  size01: {
    fontSize: '12px',
    lineHeight: '16px',
  },
  size02: {
    fontSize: '14px',
    lineHeight: '20px',
  },
  size03: {
    fontSize: '16px',
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
    fontSize: '54px',
    lineHeight: '64px',
  },
  size13: {
    fontSize: '60px',
    lineHeight: '72px',
  },
};

export const magma = {
  bodyFont: '"Open Sans",Helvetica,sans-serif',
  bodyExpressiveFont: '"Open Sans",Helvetica,sans-serif',
  bodyNarrativeFont: "'Noto Serif',Times New Roman,serif",
  borderRadius: '4px',
  headingFont: '"Open Sans",Helvetica,sans-serif',
  headingExpressiveFont: '"Open Sans",Helvetica,sans-serif',
  headingNarrativeFont: "'Noto Serif',Times New Roman,serif",
  direction: 'ltr',

  colors: {
    primary: '#006298', // link color blue
    focus: '#027EE1',
    focusInverse: 'rgba(255,255,255,0.7)',
    foundation: '#00263E',
    foundation02: '#003865',
    foundation03: '#00A9E0',
    foundation04: '#71C5E8',
    pop: '#E0004D',
    pop02: '#FC4C02',
    pop03: '#F2A900',
    pop04: '#FFC72C',
    pop05: '#92278F',
    pop06: '#007A6D',
    success: '#3A8200',
    success02: '#48A200',
    successInverse: '#91CF60',
    danger: '#C61D23',
    dangerInverse: '#F59295',
    neutral: '#3F3F3F', // main dark grey text color
    neutral02: '#575757',
    neutral03: '#727272',
    neutral04: '#8f8f8f', // lightest gray that meets 3:1 contrast ratio
    neutral05: '#BFBFBF',
    neutral06: '#DFDFDF',
    neutral07: '#F7F7F7',
    neutral08: '#FFFFFF', // white
    disabledText: 'rgba(114,114,114,0.6)',
    disabledInverseText: 'rgba(255,255,255,0.25)',
    toggleBoxShadow:
      '0 2px 2px -1px rgba(0, 0, 0, 0.3), 0 0 4px 0 rgba(0, 0, 0, 0.24),0 0 5px 0 rgba(0, 0, 0, 0.22)',
    shade: 'rgba(0,0,0,0.05)',
    shade02: 'rgba(0,0,0,0.3)',
    tint: 'rgba(255,255,255,0.05)',
    tint02: 'rgba(255,255,255,0.1)',
    tint03: 'rgba(255,255,255,0.1)',
    tint04: 'rgba(255,255,255,0.4)',
    tone: 'rgba(63,63,63,0.07)',
    tone02: 'rgba(63,63,63,0.1)',
  },

  // breakpoints
  breakpoints: {
    xs: 0,
    small: 600,
    medium: 768,
    large: 1024,
    xl: 1200,
  },

  spaceScale: {
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
  },

  // Typography
  typeScale: typeScale,
  typographyVisualStyles: {
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
    headingXLarge: {
      mobile: typeScale.size08,
      desktop: typeScale.size11,
      fontWeight: 600,
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
};
