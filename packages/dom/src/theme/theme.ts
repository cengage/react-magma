const theme = {
  defaults: {
    borderRadius: '4px',
    breakpoints: {
      xs: 0,
      small: 600,
      medium: 768,
      large: 1024,
      xl: 1200,
    },
    colors: {
      primary: '#006298', // link color blue
      primaryInverse: '#70CDFF', // link color inverse blue
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
    },
    fonts: {
      primary: '"Open Sans",Helvetica,sans-serif',
      expressive: '"Open Sans",Helvetica,sans-serif',
      narrative: "'Noto Serif',Times New Roman,serif",
      heading: '"Open Sans",Helvetica,sans-serif',
      headingExpressive: '"Open Sans",Helvetica,sans-serif',
      headingNarrative: "'Noto Serif',Times New Roman,serif",
    },
    fontSize: {
      '01': '12px',
      '02': '14px',
      '03': '16px',
      '04': '18px',
      '05': '20px',
      '06': '24px',
      '07': '28px',
      '08': '32px',
      '09': '36px',
      '10': '42px',
      '11': '48px',
      '12': '54px',
      '13': '60px',
    },
    lineHeight: {
      '01': '16px',
      '02': '20px',
      '03': '24px',
      '04': '24px',
      '05': '32px',
      '06': '32px',
      '07': '40px',
      '08': '40px',
      '09': '48px',
      '10': '48px',
      '11': '48px',
      '12': '64px',
      '13': '72px',
    },
    spacing: {
      spacingMultiplier: 8,
      '01': '2px',
      '02': '4px',
      '03': '8px',
      '04': '12px',
      '05': '16px',
      '06': '24px',
      '07': '28px',
      '08': '32px',
      '09': '40px',
      '10': '48px',
      '11': '56px',
      '12': '64px',
      '13': '96px',
      '14': '160px',
    },
  },
  components: {
    Alert: {
      components: {
        AlertContents: {
          alignSelf: 'center',
          flexGrow: 1,
          padding: 'var(--spacing-04) 0',

          props: {
            '@media': {
              maxWidth: {
                [`${breakpoints.small}px`]: {
                  paddingLeft: 'var(--spacing-04)',
                },
              },
            },
          },
        },
        AlertInner: {
          backgroundColor: [`${buildAlertBackground(props)}`],
          color: 'var(--colors-neutral)',
          borderRadius: 'var(--borderRadius)',
          display: 'flex',
          position: 'relative',

          props: {
            isInverse: {
              color: 'var(--colors-neutral08)',
            },
            isToast: {
              animation: 'placeholder and keyframes',
              minWidth: '375px',
              margin: '0 auto',
            },
            '@media': {
              maxWidth: {
                [`${breakpoints.small}px`]: {
                  minWidth: 0,
                  width: '100%',
                },
              },
            },
          },
        },
        IconStyles: {
          alignItems: 'center',
          display: 'flex',
          flexShrink: 0,
          marginRight: '1px',
        },
      },
      default: {
        color: 'var(--colors-neutral08)',
        backgroundColor: 'var(--colors-neutral)',
        fontSize: 'var(--fontSize-03)',
        lineHeight: 'var(--lineHeight-03)',
        marginBottom: 'var(--spacing06)',
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        padding: 0,
        position: 'relative',
        animation: 'placeholder and keyframes',

        a: {
          color: 'inherit',
          fontWeight: '600',
          textDecoration: 'underline',

          '&:focus': {
            outline: '2px dotted var(--colors-focus)',
          },
          isInverse: {
            '&:focus': {
              outline: '2px dotted var(--colors-focusInverse)',
            },
          },
        },

        '&:focus': {
          outline: '2px dotted var(--colors-focus)',
        },
        '@media': {
          maxWidth: {
            [`${breakpoints.small}px`]: {
              fontSize: 'var(--fontSize-02)',
              lineHeight: 'var(--lineHeight-02)',
            },
          },
        },
      },
      props: {
        success: {
          color: 'var(--colors-neutral08)',
          backgroundColor: 'var(--colors-success)',
        },
        warning: {
          color: 'var(--colors-neutral)',
          backgroundColor: 'var(--colors-pop04)',
        },
        danger: {
          color: 'var(--colors-neutral08)',
          backgroundColor: 'var(--colors-danger)',
        },
        isInverse: {
          color: 'var(--colors-neutral08)',

          '&:focus': {
            outline: '2px dotted var(--colors-forcusInverse)',
          },
        },
        isToast: {
          animation: 'placeholder and keyframes',
          minWidth: '375px',
          margin: '0 auto',

          '@media': {
            maxWidth: {
              [`${breakpoints.small}px`]: {
                minWidth: 0,
                width: '100%',
              },
            },
          },
        },
      },
    },
  },
};
