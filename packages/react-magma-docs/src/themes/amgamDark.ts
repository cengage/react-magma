import { magma } from 'react-magma-dom'

// Can not spread props because there is no babel transpiling and Edge/Safari does not currently support the spread operator

export const amgamDark = Object.assign({}, magma, {
  colors: Object.assign({}, magma.colors, {
    primary: '#FF9D67', // link color
    foundation01: '#00263E',
    foundation02: '#FFC79A',
    foundation03: '#ff9d67',
    foundation04: '#006298',
    pop01: '#1FFFB2',
    pop02: '#0599FF',
    pop03: '#0D56FF',
    pop04: '#0038D3',
    success01: '#C57DFF',
    success02: '#AC44FF',
    danger: '#18FFFF',
    neutral01: '#C0C0C0',
    neutral02: '#A8A8A8',
    neutral03: '#8D8D8D',
    neutral05: '#404040',
    neutral06: '#202020',
    neutral07: '#080808',
    neutral08: '#000000',
    disabledText: 'rgba(114, 114, 114, 0.6)',
    disabledInverseText: 'rgba(255, 255, 255, 0.25)',
    toggleBoxShadow:
      '0 2px 2px -1px rgba(255,255,255, 0.3), 0 0 4px 0 rgba(255,255,255, 0.24),0 0 5px 0 rgba(255,255,255, 0.22)',
  }),
})
