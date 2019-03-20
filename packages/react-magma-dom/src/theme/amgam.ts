interface Colors {
  primary: string;
  foundation01: string;
  foundation02: string;
  foundation03: string;
  foundation04: string;
  pop01: string;
  pop02: string;
  pop03: string;
  pop04: string;
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
}

export interface ThemeInterface {
  bodyFont: string;
  headingFont: string;
  colors: Colors;
  sizeXs: string;
  sizeSm: string;
  sizeMd: string;
  sizeLg: string;
}

export const amgam = {
  bodyFont: '"Open Sans", sans-serif',
  headingFont: 'gnuolane, sans-serif',

  colors: {
    primary: '#FF9D67', // link color blue
    foundation01: '#FFC79A',
    foundation02: '#FF9D67',
    foundation03: '#ff9d67',
    foundation04: '#006298',
    pop01: '#1FFFB2',
    pop02: '#0D56FF',
    pop03: '#F2A900',
    pop04: '#0038D3',
    success01: '#C57DFF',
    success02: '#AC44FF',
    danger: '#FFD9C1',
    neutral01: '#00263E',
    neutral02: '#C0C0C0', // main dark grey text color
    neutral03: '#A8A8A8',
    neutral04: '#8D8D8D',
    neutral05: '#404040',
    neutral06: '#202020',
    neutral07: '#080808',
    neutral08: '#000000', // white
    disabledText: 'rgba(114, 114, 114, 0.6)',
    disabledInverseText: 'rgba(255, 255, 255, 0.25)'
  },

  // screen sizes
  sizeXs: '576px',
  sizeSm: '768px',
  sizeMd: '992px',
  sizeLg: '1200px'
};
