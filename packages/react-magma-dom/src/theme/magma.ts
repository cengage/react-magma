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
}

export interface Breakpoints {
  xs: number;
  small: number;
  medium: number;
  large: number;
  xl: number;
}

export interface ThemeInterface {
  bodyFont: string;
  headingFont: string;
  colors: Colors;
  breakpoints: object;
}

export const magma = {
  bodyFont: '"Open Sans", sans-serif',
  headingFont: '"Open Sans", sans-serif',

  colors: {
    primary: '#006298', // link color blue
    focus: '#027EE1',
    focusInverse: 'rgba(255,255,255,0.7)',
    foundation01: '#00263E',
    foundation02: '#003865',
    foundation03: '#00A9E0',
    foundation04: '#71C5E8',
    pop01: '#E0004D',
    pop02: '#FA6600',
    pop03: '#F2A900',
    pop04: '#FFC72C',
    pop05: '#92278F',
    success01: '#3A8200',
    success02: '#48A200',
    danger: '#E70000',
    neutral01: '#3F3F3F', // main dark grey text color
    neutral02: '#575757',
    neutral03: '#727272',
    neutral04: '#8f8f8f', // lightest gray that meets 3:1 contrast ratio
    neutral05: '#BFBFBF',
    neutral06: '#DFDFDF',
    neutral07: '#F7F7F7',
    neutral08: '#FFFFFF', // white
    disabledText: 'rgba(114, 114, 114, 0.6)',
    disabledInverseText: 'rgba(255,255,255,0.25)',
    toggleBoxShadow:
      '0 2px 2px -1px rgba(0, 0, 0, 0.3), 0 0 4px 0 rgba(0, 0, 0, 0.24),0 0 5px 0 rgba(0, 0, 0, 0.22)',
    shade01: 'rgba(0,0,0,0.05)',
    shade02: 'rgba(0,0,0,0.3)'
  },

  // breakpoints
  breakpoints: {
    xs: 0,
    small: 600,
    medium: 768,
    large: 1024,
    xl: 1200
  }
};
