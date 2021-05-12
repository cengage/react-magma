import { button } from './components/button';
import { transitions } from './components/transition';

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

export const colors = {
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
  neutral03: '#707070',
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
  border: '#DFDFDF',
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
  bodyFont: '"Open Sans",Helvetica,sans-serif',
  bodyExpressiveFont: '"Open Sans",Helvetica,sans-serif',
  bodyNarrativeFont: "'Noto Serif',Times New Roman,serif",
  borderRadius: '4px',
  colors: colors,
  headingFont: '"Open Sans",Helvetica,sans-serif',
  headingExpressiveFont: '"Open Sans",Helvetica,sans-serif',
  headingNarrativeFont: "'Noto Serif',Times New Roman,serif",
  direction: 'ltr',
  spacingMultiplier: 8,
  transitions,
  button: button(colors),
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

  appBar: {
    backgroundColor: colors.neutral08,
    height: '88px',
    padding: `${spaceScale.spacing06} ${spaceScale.spacing05}`,
    textColor: colors.neutral,
    compact: {
      height: '56px',
      padding: `${spaceScale.spacing05} ${spaceScale.spacing05} ${spaceScale.spacing05} ${spaceScale.spacing06}`,
    },
    inverse: {
      backgroundColor: colors.foundation02,
      textColor: colors.neutral08,
    },
  },

  combobox: {
    menu: {
      maxHeight: '250px',
    },
  },

  hyperlink: {
    textColor: colors.primary,
    textHoverColor: colors.foundation02,
    inverse: {
      textColor: colors.neutral08,
      textHoverColor: colors.neutral07,
    },
  },

  modal: {
    width: {
      small: '300px',
      medium: '600px',
      large: '900px',
    },
  },

  dropdown: {
    content: {
      maxHeight: '250px',
    },
  },

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

  tooltip: {
    arrowSize: '4px',
    arrowSizeDoubled: '8px',
    backgroundColor: colors.neutral,
    fontWeight: 600,
    maxWidth: '300px',
    textColor: colors.neutral08,
    typeScale: typeScale.size01,
    zIndex: 999,
    inverse: {
      backgroundColor: colors.neutral08,
      textColor: colors.neutral,
    },
  },
};
