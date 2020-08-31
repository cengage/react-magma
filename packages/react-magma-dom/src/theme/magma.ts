export interface Colors {
  primary: string;
  focus: string;
  focusInverse: string;
  foundation01: string;
  foundation02: string;
  foundation03: string;
  foundation04: string;
  pop01: string;
  pop02: string;
  pop03: string;
  pop04: string;
  pop05: string;
  pop06: string;
  success01: string;
  success02: string;
  danger: string;
  neutral01: string;
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
  shade01: string;
  shade02: string;
  tint01: string;
  tint02: string;
  tint03: string;
  tone01: string;
  tone02: string;
}

export interface Breakpoints {
  xs: number;
  small: number;
  medium: number;
  large: number;
  xl: number;
}

export interface TypographyVariants {
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

export interface ExpressiveTypographyVariants {
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

export interface ThemeInterface {
  bodyFont: string;
  expressiveTypographyVariants: ExpressiveTypographyVariants;
  headingFont: string;
  narrativeFont: string;
  colors: Colors;
  breakpoints: Breakpoints;
  typographyVariants: TypographyVariants;
}

const typeScale = {
  size01: {
    fontSize: '12px',
    lineHeight: '16px'
  },
  size02: {
    fontSize: '14px',
    lineHeight: '20px'
  },
  size03: {
    fontSize: '16px',
    lineHeight: '24px'
  },
  size04: {
    fontSize: '18px',
    lineHeight: '32px'
  },
  size05: {
    fontSize: '20px',
    lineHeight: '32px'
  },
  size06: {
    fontSize: '24px',
    lineHeight: '32px'
  },
  size07: {
    fontSize: '28px',
    lineHeight: '40px'
  },
  size08: {
    fontSize: '32px',
    lineHeight: '40px'
  },
  size09: {
    fontSize: '36px',
    lineHeight: '48px'
  },
  size10: {
    fontSize: '42px',
    lineHeight: '48px'
  },
  size11: {
    fontSize: '48px',
    lineHeight: '56px'
  },
  size12: {
    fontSize: '54px',
    lineHeight: '64px'
  },
  size13: {
    fontSize: '60px',
    lineHeight: '72px'
  }
};

export const magma = {
  bodyFont: '"Open Sans", Helvetica, sans-serif',
  headingFont: '"Open Sans", Helvetica, sans-serif',
  narrativeFont: "'Noto Serif',Times New Roman,serif",
  direction: 'ltr',

  colors: {
    primary: '#006298', // link color blue
    focus: '#027EE1',
    focusInverse: 'rgba(255,255,255,0.7)',
    foundation01: '#00263E',
    foundation02: '#003865',
    foundation03: '#00A9E0',
    foundation04: '#71C5E8',
    pop01: '#E0004D',
    pop02: '#FC4C02',
    pop03: '#F2A900',
    pop04: '#FFC72C',
    pop05: '#92278F',
    pop06: '#007A6D',
    success01: '#3A8200',
    success02: '#48A200',
    danger: '#C61D23',
    neutral01: '#3F3F3F', // main dark grey text color
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
    shade01: 'rgba(0,0,0,0.05)',
    shade02: 'rgba(0,0,0,0.3)',
    tint01: 'rgba(255,255,255,0.05)',
    tint02: 'rgba(255,255,255,0.1)',
    tint03: 'rgba(255,255,255,0.1)',
    tint04: 'rgba(255,255,255,0.4)',
    tone01: 'rgba(63,63,63,0.07)',
    tone02: 'rgba(63,63,63,0.1)'
  },

  // breakpoints
  breakpoints: {
    xs: 0,
    small: 600,
    medium: 768,
    large: 1024,
    xl: 1200
  },
  typeScale: typeScale,
  typographyVariants: {
    headingXLarge: {
      mobile: typeScale.size07,
      desktop: typeScale.size08
    },
    headingLarge: {
      mobile: typeScale.size06,
      desktop: typeScale.size07
    },
    headingMedium: {
      mobile: typeScale.size05,
      desktop: typeScale.size06
    },
    headingSmall: {
      mobile: typeScale.size04,
      desktop: typeScale.size05
    },
    headingXSmall: {
      mobile: typeScale.size04,
      desktop: typeScale.size04
    },
    headingXXSmall: {
      mobile: typeScale.size01,
      desktop: typeScale.size01
    },
    bodyLarge: {
      mobile: typeScale.size04,
      desktop: typeScale.size05
    },
    bodyMedium: {
      mobile: typeScale.size03,
      desktop: typeScale.size03
    },
    bodySmall: {
      mobile: typeScale.size02,
      desktop: typeScale.size02
    },
    bodyXSmall: {
      mobile: typeScale.size01,
      desktop: typeScale.size01
    }
  },
  expressiveTypographyVariants: {
    headingXLarge: {
      mobile: typeScale.size08,
      desktop: typeScale.size11
    },
    headingLarge: {
      mobile: typeScale.size07,
      desktop: typeScale.size09
    },
    headingMedium: {
      mobile: typeScale.size06,
      desktop: typeScale.size07
    },
    headingSmall: {
      mobile: typeScale.size05,
      desktop: typeScale.size06
    },
    headingXSmall: {
      mobile: typeScale.size04,
      desktop: typeScale.size05
    },
    headingXXSmall: {
      mobile: typeScale.size03,
      desktop: typeScale.size03
    },
    bodyLarge: {
      mobile: typeScale.size05,
      desktop: typeScale.size06
    },
    bodyMedium: {
      mobile: typeScale.size03,
      desktop: typeScale.size03
    },
    bodySmall: {
      mobile: typeScale.size02,
      desktop: typeScale.size02
    },
    bodyXSmall: {
      mobile: typeScale.size01,
      desktop: typeScale.size01
    }
  }
};
