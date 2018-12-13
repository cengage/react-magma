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
  primary01: string;
  primary02: string;
  primary03: string;
  primary04: string;
  primary05: string;
  secondary01: string;
  secondary02: string;
  secondary03: string;
  secondary04: string;
  secondary05: string;
  secondary06: string;
  secondary07: string;
  secondary08: string;
  secondary09: string;
  secondary10: string;
  accent01: string;
  accent02: string;
  accent03: string;
  accent04: string;
  accent05: string;
  accent06: string;
  limited01: string;
  limited02: string;
  limited03: string;
  limited04: string;
  limited05: string;
  sizeXs: string;
  sizeSm: string;
  sizeMd: string;
  sizeLg: string;
}

export const magma = {
  bodyFont: '"Open Sans", sans-serif',
  headingFont: 'gnuolane, sans-serif',

  colors: {
    primary: '#006298', // link color blue
    foundation01: '#003865',
    foundation02: '#006298',
    foundation03: '#006298',
    foundation04: '#006298',
    pop01: '#006298',
    pop02: '#FA6600',
    pop03: '#F2A900',
    pop04: '#FFC72C',
    success01: '#3A8200',
    success02: '#53BB00',
    danger: '#E70000',
    neutral01: '#00263E',
    neutral02: '#3F3F3F', // main dark grey text color
    neutral03: '#575757',
    neutral04: '#727272',
    neutral05: '#BFBFBF',
    neutral06: '#DFDFDF',
    neutral07: '#F7F7F7',
    neutral08: '#FFFFFF', // white
    disabledText: 'rgba(114, 114, 114, 0.6)',
    disabledInverseText: 'rgba(255, 255, 255, 0.25)'
  },

  // primary colors
  primary01: '#3f3f3f',
  primary02: '#007db8',
  primary03: '#f7f7f7',
  primary04: '#ffffff',
  primary05: '#00263e',

  // secondary colors
  secondary01: '#063961',
  secondary02: '#2e9cd4',
  secondary03: '#575757',
  secondary04: '#7a7a7a',
  secondary05: '#bfbfbf',
  secondary06: '#dfdfdf',
  secondary07: '#006298',
  secondary08: '#71c5e8',
  secondary09: '#87d6f8',
  secondary10: '#d0d3d4',

  // accent colors
  accent01: '#6f9823',
  accent02: '#90b82e',
  accent03: '#9bca43',
  accent04: '#c1510a',
  accent05: '#fa6600',
  accent06: '#f2981d',

  // limited colors
  limited01: '#ef0000',
  limited02: '#ff5858',
  limited03: '#ececec',
  limited04: '#e0004d',
  limited05: '#ffc72c',

  // screen sizes
  sizeXs: '576px',
  sizeSm: '768px',
  sizeMd: '992px',
  sizeLg: '1200px'
};
