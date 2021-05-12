import { magma } from '../magma';
import { button } from '../magma/components/button';

const colors = {
  ...magma.colors,
  primary: '#FFCC01', // brand yellow
  focus: '#027EE1',
  focusInverse: '#FFCC01',
  foundation: '#000000',
  foundation02: '#FFCC01',
  foundation03: '#EC1D24',
  foundation04: '#71C5E8',
};

export const ngl = {
  ...magma,
  borderRadius: '0',
  colors: colors,
  appBar: {
    ...magma.appBar,
    inverse: {
      backgroundColor: colors.foundation,
      textColor: colors.primary,
    },
  },
  hyperlink: {
    textColor: colors.foundation,
    textHoverColor: colors.foundation,
    inverse: {
      textColor: colors.primary,
      textHoverColor: colors.primary,
    },
  },
  button: {
    ...button(colors),
    primary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      textColor: colors.foundation,
      inverse: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        textColor: colors.foundation,
      },
      outline: {
        borderColor: colors.primary,
        textColor: colors.foundation,
        inverse: {
          borderColor: colors.primary,
          textColor: colors.primary,
        },
      },
    },
    marketing: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      textColor: colors.foundation,
      inverse: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        textColor: colors.foundation,
      },
      outline: {
        borderColor: colors.primary,
        textColor: colors.foundation,
        inverse: {
          borderColor: colors.primary,
          textColor: colors.primary,
        },
      },
    },
  },
};
