import { blocked } from "../../../..";
import { Flex } from "../../dist";

const theme = {
  defaults: {
    borderRadius: '4px',
    breakpoints: {
      xs: 0,
      small: '600px',
      medium: '768px',
      large: '1024px',
      xl: '1200px',
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
    iconSizes: {
      xSmall: '16px',
      small: '20px',
      medium: '24px',
      large: '32px',
      xLarge: '54px',
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
          default: {
            alignSelf: 'center',
            flexGrow: 1,
            padding: 'var(--spacing-04) 0',
          },
          props: {
            '@media': {
              maxWidth: {
                [`${breakpoints.small}`]: {
                  paddingLeft: 'var(--spacing-04)',
                },
              },
            },
          },
        },
        AlertInner: {
          default: {
            backgroundColor: 'var(--colors-neutral)',
            color: 'var(--colors-neutral)',
            borderRadius: 'var(--borderRadius)',
            display: 'flex',
            position: 'relative',
          },
          props: {
            danger: {
              default: {
                backgroundColor: 'var(--colors-danger)',
              },
            },
            success: {
              default: {
                backgroundColor: 'var(--colors-success)',
              },
            },
            warning: {
              default: {
                backgroundColor: 'var(--colors-pop04)',
              },
            },
            isInverse: {
              default: {
                color: 'var(--colors-neutral08)',
              },
            },
            isToast: {
              default: {
                animation: 'placeholder and keyframes',
                minWidth: '375px',
                margin: '0 auto',
              },
            },
            '@media': {
              maxWidth: {
                [`${breakpoints.small}`]: {
                  minWidth: 0,
                  width: '100%',
                },
              },
            },
          },
        },
        DismissButton: {
          default: {
            alignSelf: 'stretch',
            borderRadius: '0 var(--borderRadius) var(--borderRadius) 0',
            color: 'inherit',
            height: 'auto',
            padding: '0 var(--spacing04)',
            width: 'auto',

            '&&:focus:not(:disabled)': {
              outlineOffset: '0 !important',
              outline: '2px dotted var(--colors-focus)',
            },
            '&:hover': {
              ':not(:disabled):before':{
                opacity: '0.15',
                background: 'var(--colors-focus)',
              },
            },
            '&:focus': {
              ':not(:disabled):before':{
                opacity: '0.15',
                background: 'var(--colors-focus)',
              },
            },
            '&:after': {
              display: 'none',
            },
          },
          
          props:{
            warning: {
              background: 'var(--colors-focusInverse)',
              '&&:focus:not(:disabled)': {
                outline: '2px dotted var(--colors-focusInverse)',
              },
            }
          },
        },
        IconWrapper: {
          default: {
            padding: '0 var(--spacing03) 0 var(--spacing04)',
          },
          props: {
            '@media': {
              maxWidth: {
                [`${breakpoints.small}`]: {
                  display: 'none',
                },
              },
            },
          },
        },
        IconWrapperStyles: {
          default: {
            alignItems: 'center',
            display: 'flex',
            flexShrink: 0,
            marginRight: '1px',
          },
        },
        ProgressRingWrapper: {
          default: {
            opacity: '0.7',
            marginTop: 'var(--spacing01)',
            position: 'absolute',
            top: 'var(--spacing01)',
            right: 'var(--spacing02)',
          },
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
            [`${breakpoints.small}`]: {
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
              [`${breakpoints.small}`]: {
                minWidth: 0,
                width: '100%',8
              },
            },
          },
        },
      },
    },
    AppBar: {
      default: {
        alignItems: 'center',
        background: 'var(--appBar-backgroundColor)',
        borderBottom: '1px solid var(--colors-neutral06)',
        boxShadow: '0 0 0',
        color: 'var(--appBar-textColor)',
        display: 'flex',
        height: 'var(--appBar-height)',
        left: '0',
        padding: 'var(--appBar-padding)',
        right: '0',
        top: '0',
        zIndex: '10',
        position: 'static',
      },
      props: {
        isCompact: {
          height: 'var(--appBar-compact-height)',
          padding: 'var(--appBar-compact-padding)',
        },
        isInverse: {
          background: 'var(--appBar-inverse-backgroundColor)',
          borderBottom: '1px solid var(--colors-foundation)',
          color: 'var(--appBar-inverse-textColor)',
        },
        sticky: {
          boxShadow: '0 2px 3px 0 rgb(0 0 0 / 37%)',
        },
        fixed: {
          boxShadow: '0 2px 3px 0 rgb(0 0 0 / 37%)',
        },
        position: {
          absolute: 'absolute',
          fixed: 'fixed',
          relative: 'relative',
          static: 'static', // default
          sticky: 'sticky',
        },
      },
    },
    Badge: {
      components: {
        StyledButton: {
          default: {
            cursor: 'pointer',
            transition: 'background 0.35s',

            '&:hover': {
              background: `${buildBadgeFocusBackground(props)}`,
            },
            '&:focus': {
              background: `${buildBadgeFocusBackground(props)}`,
            },
            '&:active': {
              background: `${buildBadgeActiveBackground(props)}`
            },
          },
        },
      },
      default: {
        background: `${buildBadgeBackground(props)}`,
        border: '1px solid',
        borderColor: 'transparent',
        borderRadius: 'var(--borderRadius)',
        color: 'var(--colors-neutral08)',
        display: 'inline-block',
        fontWeight: 'bold',
        fontSize: 'var(--typeScale-size01-fontSize)',
        lineHeight: 'var(--typeScale-size01-lineHeight)',
        margin: '0 var(--spaceScale-spacing03) 0 0',
        maxHeight: 'auto',
        minWidth: 'var(--spaceScale-spacing06)',
        padding: 'var(--spaceScale-spacing01) var(--spaceScale-spacing02)',
        textAlign: 'inherit',
      },
      props: {
        counter: {
          borderRadius: 'var(--spaceScale-spacing06)',
          fontSize: 'var(--typeScale-size02-fontSize)',
          lineHeight: 'var(--typeScale-size02-lineHeight)',
          margin: '0 0 0 var(--spaceScale-spacing03)',
          maxHeight: 'var(--spaceScale-spacing06)',
          padding: '1px var(--spaceScale-spacing02)',
          textAlign: 'center',
        },
        color: {
          light: {
            borderColor: 'var(--colors-neutral06)',
            color: 'var(--colors-neutral)',
          },
        },
      },
    },
    Banner: {
      components: {
        BannerContents: {
          default: {
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'flex-start',
            padding: 'var(--spaceScale-spacing04)',

            '@media': {
              maxWidth: {
                [`${breakpoints.small}`]: {
                  justifyContent: 'flex-start',
                },
              },
            },
          },
        },
        ButtonWrapper: {
          default: {
            alignItems: 'center',
            display: 'flex',
            flexShrink: '0',
          },
        },
        DismissButton: {
          default: {
            alignSelf: 'stretch',
            borderRadius: '0',
            color: 'var(--colors-neutral08)',
            height: 'auto',
            padding: '0 var(--spaceScale-spacing05)',
            width: 'auto',

            '&&:focus:not(:disabled)': {
              outline: '2px dotted var(--colors-neutral08)',
              outlineOffset: '0 !important',
            },

            '&:hover': {
              ':not(:disabled)': {
                '&:before': {
                  background: 'var(--colors-neutral08)',
                  opacity: '0.15',
                },
                '&:after': {
                  display: 'none',
                },
              },
            },

            '&:focus': {
              ':not(:disabled)': {
                '&:before': {
                  background: 'var(--colors-neutral08)',
                  opacity: '0.15',
                },
                '&:after': {
                  display: 'none',
                },
              },
            },
          },
        },
        IconWrapper: {
          default: {
            display: 'inline-flex',
            paddingRight: 'var(--spaceScale-spacing03)',

            '@media': {
              maxWidth: {
                [`${breakpoints.small}`]: {
                  display: 'none',
                },
              },
            },
          },
        },
      },
      default: {
        alignItems: 'stretch',
        background: `${buildAlertBackground(props)}`,
        color: 'var(--colors-neutral08)',
        display: 'flex',
        fontSize: 'var(--typeScale-size03-fontSize)',
        lineHeight: 'var(--typeScale-size03-lineHeight)',
        position: 'relative',
        textAlign: 'left',

        '@media': {
          maxWidth: {
            [`${breakpoints.small}`]: {
              textAlign: 'left',
              fontSize: 'var(--typeScale-size02-fontSize)',
              lineHeight: 'var(--typeScale-size02-lineHeight)',
            },
          },
        },
      },
      props: {
        warning: {
          color: 'var(--colors-neutral)',

          '&&:focus:not(:disabled)': {
            outline: '2px dotted var(--colors-neutral)',
          },

          '&:hover': {
            ':not(:disabled)': {
              '&:before': {
                background: 'var(--colors-neutral)',
              },
            },
          },

          '&:focus': {
            ':not(:disabled)': {
              '&:before': {
                background: 'var(--colors-neutral)',
              },
            },
          },
        },
      },
    },
    Breadcrumb: {
      components: {
        BreadcrumbItem: {
          default: {
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
          },
          StyledSpan: {
            color: 'var(--colors-neutral03)',

            'svg': {
              margin: '0 var(--spaceScale-spacing02)',
            },
          },

          props: {
            isInverse: {
              StyledSpan: {
                color: 'var(--colors-neutral08)',
              },
            },
          },
        },
      },
      default: {
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: 'var(--typeScale-size02-fontSize)',
        lineHeight: 'var(--typeScale-size02-lineHeight)',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },
    },
    Card: {
      components: {
        CardBody: {
          default: {
            padding: 'var(--spaceScale-spacing05)',
            textAlign: `${props.align}`,

            '@media': {
              maxWidth: {
                [`${breakpoints.small}`]: {
                  padding: 'var(--spaceScale-spacing06)',
                },
              },
            },
          },
        },
        CardHeading: {
          default: {
            marginTop: '0',
          },
        },
      },
      default: {
        borderRadius: 'var(--borderRadius)',
        boxShadow: '0 0 0',
        color: 'var(--colors-neutral)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'visible',
        paddingLeft: '0',
        position: 'relative',
        textAlign: `${props.align}`,
        width: `${props.width}`,
      },
      props: {
        background: {
          background: 'var(--colors-neutral08)',
          border: '1px solid var(--colors-neutral06)',

          isInverse: {
            background: 'var(--colors-foundation)',
          },
        },
        calloutType: {
          paddingLeft: 'var(--spaceScale-spacing02)',

          '&:before' {
            background: `${buildCalloutBackground(props)}`,
            borderRadius: 'var(--borderRadius) 0 0 var(--borderRadius)',
            content: '',
            display: 'block',
            height: '100%',
            position: 'absolute',
            left: 0,
            width: 'var(--spaceScale-spacing02)',
          },
        },
        hasDropShadow: {
          boxShadow: '0 2px 6px 0 rgba(0,0,0,0.18)',
        },
        isInverse: {
          color: 'var(--colors-neutral08)',
        },
      },
    },
    Checkbox: {
      default: {
        border: '2px solid',
        borderColor: `${buildDisplayInputBorderColor(props)}`,
        color: `${buildCheckIconColor(props)}`,
        cursor: 'pointer',
        margin: '0 var(--spaceScale-spacing03) 0 0',

        'svg': {
          flexShrink: 0,
          pointerEvents: 'none',
          transition: 'all 0.2s ease-out',
        },

        '&:after': {
          background: `${buildDisplayInputActiveBackground(props)}`,
          top: '-10px',
          left: '-10px',
        },
      },
      props: {
        disabled: {
          cursor: 'not-allowed',
        },
        textPosition: {
          left: {
            margin: 'var(--spaceScale-spacing01) 0 0 var(--spaceScale-spacing03)',
          },
        },
      },
    },
    ComboboxInput: {
      components: {
        StyledInput: {
          default: {
            border: 0,
            display: 'flex',
            flexGrow: 1,
            height: 'var(--spaceScale-spacing08)',
            minWidth: 'var(--spaceScale-spacing07)',
            paddingLeft: 'var(--spaceScale-spacing02)',
            width: 0,

            '&:focus': {
              outline: 0,
            },
          },
        },
      },
      default: {
        alignItems: 'center',
        background: 'var(--colors-neutral08)',
        border: '1px solid',
        borderColor: 'var(--colors-neutral03)',
        borderRadius: 'var(--borderRadius)',
        display: 'flex',
        minHeight: 'var(--spaceScale-spacing09)',
        minWidth: 'var(--spaceScale-spacing13)',
        padding: '0 var(--spaceScale-spacing03) 0 0',
        width: '100%',
      },
      props: {
        disabled: {
          background: 'var(--colors-neutral07)',
          borderColor: 'var(--colors-neutral05)',
          color: 'var(--colors-disabledText)',
          cursor: 'not-allowed',
          outline: 0,

          '&::placeholder': {
            color: 'var(--colors-disabledText)',
          },
        },
        hasError: {
          borderColor: 'var(--colors-danger)',
          boxShadow: '0 0 0 1px var(--colors-danger)',
          isInverse: {
            boxShadow: '0 0 0 1px var(--colors-neutral08)',
          },
        },
        isFocused: {
          outline: '2px dotted var(--colors-focus)',
          outlineOffset: '4px',
          isInverse: {
            outline: '2px dotted var(--colors-focusInverse)',
          },
        },
        isInverse: {
          borderColor: 'var(--colors-neutral08)',
        }
      },
    },
    Container: {
      default: {
        background: 'var(--colors-neutral08)',
        color: 'var(--colors-neutral)',
        display: 'flow-root',
        margin: '0 auto',
        maxWidth: `${props.maxWidth}`,
        padding: `${`0 ${props.gutterWidth}`}`,
      },
      props: {
        isInverse: {
          background: 'var(--colors-foundation)',
          color: 'var(--colors-neutral08)',
        },
      },
    },
    DatePicker: {
      components: {
        CalendarDay: {
          components: {
            CalendarDayCell: {
              default: {
                border: '1px solid var(--colors-neutral06)',
                color: 'var(--colors-neutral)',
                fontSize: 'var(--typeScale-size03-fontsize)',
                lineHeight: 'var(--typeScale-size03-lineHeight)',
                height: 'var(--spaceScale-spacing09)',
                padding: '0',
                position: 'relative',
                textAlign: 'center',
                width: 'var(--spaceScale-spacing09)',
              },
            },
            CalendarDayInner: {
              default: {
                alignItems: 'center',
                background: 'var(--colors-neutral08)',
                border: '2px solid transparent',
                borderRadius: '100%',
                color: 'var(--colors-neutral)',
                cursor: 'pointer',
                display: 'flex',
                height: 'calc(var(--spaceScale-spacing09) - 4px)',
                justifyContent: 'center',
                margin: 'var(--spaceScale-spacing01)',
                overflow: 'hidden',
                outlineOffset: '0',
                position: 'relative',
                transition: 'background 0.5s ease-in-out 0s',
                width: 'calc(var(--spaceScale-spacing09) - 4px)',

                '&:focus': {
                  outline: '2px dotted var(--colors-focus)',
                },

                '&:before': {
                  background: 'var(--colors-neutral)',
                  content: '',
                  height: '200%',
                  left: '0',
                  opacity: '0',
                  position: 'absolute',
                  top: '-50%',
                  transition: '0.2s',
                  width: '200%',
                },

                '&:hover': {
                  '&:before': {
                    opacity: '0.1',
                  },
                },
              },
              props: {
                disabled: {
                  color: 'var(--colors-disabledText)',
                  cursor: 'not-allowed',

                  '&:hover': {
                    '&:before': {
                      opacity: '0',
                    },
                  },
                },
                isChosen: {
                  background: 'var(--colors-foundation02)',
                  color: 'var(--colors-neutral08)',
                },
              },
            },
            EmptyCell: {
              default: {
                border: '0',
                padding: '0',
              },
            },
            TodayIndicator: {
              default: {
                borderLeft: '8px solid var(--colors-pop)',
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                bottom: '-6px',
                display: 'block',
                height: '0',
                position: 'absolute',
                transform: 'rotate(45deg)',
                right: '-2px',
                width: '0',
              },
            },
          },
        },
        CalendarHeader: {
          components: {
            CalendarHeaderContainer: {
              default: {
                alignItems: 'center',
                display: 'flex',
                padding: 'var(--spaceScale-spacing10) 0 var(--spaceScale-spacing03)',
                marginTop: 'calc(var(--spaceScale-spacing01) * -1))',
              },
            },
            CalendarHeaderText: {
              default: {
                captionSide: 'initial',
                color: 'var(--colors-neutral)',
                fontSize: 'var(--typeScale-size03-fontSize)',
                lineHeight: 'var(--typeScale-size03-lineHeight)',
                order: '1',
                textAlign: 'center',
                flexGrow: '0',
                flexWidth: '90%',
                flexBasis: '90%',
              },
            },
            CalendarIconButton: {
              default: {
                flexGrow: '0',
                flexWidth: '10%',
                flexBasis: '10%',
                order: '0',
              },
              props: {
                next: {
                  order: '2',
                },
              },
            },
          },
        },
        CalendarMonth: {
          components: {
            CalendarContainer: {
              default: {
                background: 'var(--colors-neutral08)',
                padding: '0 var(--spaceScale-spacing05) var(--spaceScale-spacing03)',
              },
            },
            CloseButton: {
              default: {
                position: 'absolute',
                right: 'var(--spaceScale-spacing01)',
                top: 'var(--spaceScale-spacing01)',
                zIndex: '1',
              }, 
            },
            HelperButton: {
              default: {
                bottom: 'var(--spaceScale-spacing01)',
                position: 'absolute',
                right: 'var(--spaceScale-spacing01)',
                zIndex: '2',
              },
            },
            MonthContainer: {
              default: {
                background: 'var(--colors-neutral08)',
                textAlign: 'center',
                userSelect: 'none',
                verticalAlign: 'top',
              },
            },
            Table: {
              default: {
                borderCollapse: 'collapse',
                borderSpacing: '0',
                marginBottom: 'var(--spaceScale-spacing09)',
              },
            },
            Th: {
              default: {
                border: '0',
                color: 'var(--colors-neutral)',
                fontSize: 'var(--typeScale-size02-fontSize)',
                lineHeight: 'var(--typeScale-size02-lineHeight)',
                fontWeight: 'normal',
                padding: '0',
                textAlign: 'center',
              },
            },
          },
        },
        HelperInformation: {
          components: {
            KeyboardShortcutButtonWrapper: {
              default: {
                background: 'rgb(242, 242, 242)',
                fontFamily: 'monospace',
                fontSize: 'var(--typeScale-size02-fontSize)',
                lineHeight: 'var(--typeScale-size02-lineHeight)',
                marginRight: 'var(--spaceScale-spacing03)',
                padding: 'var(--spaceScale-spacing02) var(--spaceScale-spacing04)',
                textTransform: 'uppercase',
              },
            },
            List: {
              default: {
                listStyle: 'none',
                margin: '0',
                padding: '0',
                textAlign: 'left',
              },
            },
            Item: {
              default: {
                display: 'flex',
                listStyle: 'none',
              },
            },
          },
        },
      },
      default: {
        border: '1px solid var(--colors-neutral06)',
        borderRadius: 'var(--borderRadius)',
        boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.15)',
        display: 'none',
        marginTop: 'calc(var(--spaceScale-spacing07) * -1))',
        opacity: '0',
        overflow: 'hidden',
        position: 'absolute',
        transition: 'opacity 0.2s ease-in-out 0s',
        width: '320px',
        zIndex: '-1',
      },
      props: {
        opened: {
          display: 'block',
          opacity: 1,
          zIndex: '998',
        },
      },
    },
    Dropdown: {
      components: {
        DropdownContent: {
          components: {
            StyledCard: {
              default: {
                display: 'none',
                left: 'var(--spaceScale-spacing02)',
                opacity: '0',
                outline: '0',
                overflowY: 'auto',
                padding: 'var(--spaceScale-spacing03) 0',
                position: 'absolute',
                transition: 'opacity 0.3s',
                whiteSpace: 'nowrap',
              },
              props: {
                dropDirection: {
                  end: {
                    left: 'auto',
                    right: 'var(--spaceScale-spacing02)',

                    'left': {
                      bottom: 'var(--spaceScale-spacing02)',
                      top: 'auto',
                    },
                    'right': {
                      bottom: 'var(--spaceScale-spacing02)',
                      top: 'auto',
                    },
                  },
                  left: {
                    left: 'auto',
                    right: '100%',
                    top: 'var(--spaceScale-spacing02)',
                  },
                  right: {
                    left: '100%',
                    top: 'var(--spaceScale-spacing02)',
                  },
                  up: {
                    top: 'auto',
                    bottom: '100%',
                  },
                },
                isOpen: {
                  display: 'block',
                  opacity: '1',
                },
                maxHeight: {
                  maxHeight: 'var(--dropdown-content-maxHeight)',
                },
                width: {
                  whiteSpace: 'normal',
                  width: `${props.width}`,
                },
              },
            },
            StyledDiv: {
              default: {
                padding: 'var(--spaceScale-spacing02) 0',
              },
            },
          },
        },
        DropdownDivider: {
          components: {
            StyledHr: {
              default: {
                background: 'var(--colors-neutral06)',
                border: '0',
                height: '1px',
                margin: 'var(--spaceScale-spacing02) 0',
              },
            },
          },
        },
        DropdownHeader: {
          components: {
            StyledDiv: {
              default: {
                color: 'var(--colors-neutral03)',
                fontSize: 'var(--typeScale-size01-fontSize)',
                lineHeight: 'var(--typeScale-size01-lineHeight)',
                fontWeight: 'bold',
                margin: ',',
                padding: 'var(--spaceScale-spacing03) var(--spaceScale-spacing05) var(--spaceScale-spacing02)',
                textTransform: 'uppercase',
              },
            },
          },
        },
        DropdownMenuItem: {
          components: {
            IconWrapper: {
              default: {
                color: 'var(--colors-neutral03)',
                display: 'inline-flex',
                marginRight: 'var(--spaceScale-spacing05)',

                svg: {
                  height: 'var(--iconSizes-medium) px',
                  width: 'var(--iconSizes-medium) px',
                },
              }, 
            },
            MenuItemStyles: {
              default: {
                alignItems: 'center',
                color: 'var(--colors-neutral)',
                cursor: 'pointer',
                display: 'flex',
                fontSize: 'var(--typeScale-size03-fontSize)',
                lineHeight: 'var(--typeScale-size03-lineHeight)',
                margin: '0',
                padding: 'var(--spaceScale-spacing03) var(--spaceScale-spacing05)',
                whiteSpace: 'nowrap',

                '&:hover': {
                  background: 'var(--colors-neutral07)',
                },

                '&:focus': {
                  background: 'var(--colors-neutral07)',
                  outlineOffset: '-3px',
                },
              },
              props: {
                disabled: {
                  color: 'var(--colors-disabledText)',
                  cursor: 'not-allowed',

                  '&:hover': {
                    background: 'none',
                  },

                  '&:focus': {
                    background: 'none',
                  },
                },
                isFixedWidth: {
                  whiteSpace: 'normal',
                },
                isInactive: {
                  padding: 'var(--spaceScale-spacing03) var(--spaceScale-spacing05) var(--spaceScale-spacing03) var(--spaceScale-spacing11)',
                },
              },
            },
          },
        },
        DropdownMenuNavItem: {
          components: {
            StyledItem: {
              default: {
                textDecoration: 'none',
              },
            },
          },
        },
      },
      default: {
        display: 'inline-block',
        position: 'relative',
      },
    },
    Form: {
      components: {
        FormAction: {
          default: {
            display: 'flex',
            justifyContent: 'flex-end',
          },
        },
      },
      default: {
        background: 'var(--colors-neutral08)',
        color: 'var(--colors-neutral)',
      },
      props: {
        isInverse: {
          background: 'var(--colors-foundation)',
          color: 'var(--colors-neutral08)',
        },
      },
    },
    FormFieldContainer: {
      default: {
        color: 'var(--colors-neutral)',
        marginBottom: 'var(--spaceScale-spacing03)',
      },
      props: {
        isInverse: {
          color: 'var(--colors-neutral08)',
        },
      },
    },
    Hyperlink: {
      default: {
        color: 'var(--colors-primary)',
        textDecoration: 'underline',

        '&:not([disabled])': {
          '&:hover': {
            color: 'var(--colors-foundation02)',
          },
          '&:focus': {
            color: 'var(--colors-foundation02)',
          },
        },

        '&:focus': {
          outline: '2px dotted var(--colors-focus)',
          outlineOffset: '3px',
        },
      },
      props: {
        isInverse: {
          color: 'var(--colors-primaryInverse)',

          '&:not([disabled])': {
            '&:hover': {
              color: 'var(--colors-primaryInverse)',
            },
            '&:focus': {
              color: 'var(--colors-primaryInverse)',
            },
          },

          '&:focus': {
            outline: '2px dotted var(--colors-focusInverse)',
          },
        },
      },
    },
    Input: {
      components: {
        InputMessage: {
          default: {
            alignItems: 'center',
            borderRadius: 'var(--borderRadius)',
            color: `${BuildMessageColor(props)}`,
            display: 'flex',
            fontSize: 'var(typeScale-size02-fontSize)',
            lineHeight: 'var(typeScale-size02-lineHeight)',
            marginTop: 'var(--spaceScale-spacing02)',
            minHeight: 'var(--spaceScale-spacing06)',
            textAlign: 'left',
          },
          props: {
            InputSize: {
              large: {
                marginTop: 'var(--spaceScale-spacing03)',
              },
            },
          },
        },
        IconWrapper: {
          default: {
            display: 'inline-flex',
            flexShrink: '0',
            paddingRight: 'var(--spaceScale-spacing02)',
          },
        },
      },
    },
    InputBase: {
      components: {
        IconButtonContainer: {
          default: {
            backgroundColor: 'var(--colors-neutral08)',
            height: 'auto',
            margin: '0',
            position: 'relative',
            right: 'var(--spaceScale-spacing01)',

            svg: {
              height: 'var(--iconSizes-medium)px',
              width: 'var(--iconSizes-medium)px',
            },
          },
          props: {
            disabled: {
              backgroundColor: 'var(--colors-neutral07)',
            },
            InputSize: {
              large: {
                right: 'var(--spaceScale-spacing02)',

                svg: {
                  height: 'var(--iconSizes-large)px',
                  width: 'var(--iconSizes-large)px',
                },
              },
            },
          },
        },
        IconWrapper: {
          color: 'var(--colors-neutral)',
          left: 'auto',
          position: 'absolute',
          top: 'var(--spaceScale-spacing03',

          props: {
            IconPosition: {
              left: {
                'left': 'var(--spaceScale-spacing03)',
              },
              right: {
                'right': 'var(--spaceScale-spacing03)',
              },
            },
            IconSize: {
              large: {
                left: 'auto',
                right: 'auto',
                top: 'var(--spaceScale-spacing04)',

                props: {
                  IconPosition: {
                    left: {
                      'left': 'var(--spaceScale-spacing04)',
                    },
                    right: {
                      'right': 'var(--spaceScale-spacing04)',
                    },
                  },
                },
              },
            },
          },
        },
        IsClearableContainer: {
          backgroundColor: 'var(--colors-neutral08)',
          position: 'relative',
          right: 'var(--spaceScale-spacing01)',

          props: {
            disabled: {
              backgroundColor: 'var(--colors-neutral07)',
            },
            InputSize: {
              large: {
                right: 'var(--spaceScale-spacing02)',
              },
            },
          },
        },
      },
      default: {
        border: '0',
        borderRadius: 'var(--borderRadius)',
        background: 'var(--colors-neutral08)',
        color: 'var(--colors-neutral)',
        display: 'block',
        fontSize: 'var(--typeScale-size03-fontSize)',
        lineHeight: 'var(--typeScale-size03-lineHeight)',
        fontFamily: 'var(--bodyFont)',
        height: 'var(--spaceScale-spacing09)',
        padding: 'var(--spaceScale-spacing03)',
        '-webkit-appearance': 'none',
        width: '100%',

        '&::placeholder': {
          color: 'var(--colors-neutral03)',
          opacity: '1',
        },

        '&:focus': {
          outline: '0',
        },

        '&[type="search"]': {
          '&::-webkit-search-decoration': {
            display: 'none',
          },
          '&::-webkit-search-cancel-button': {
            display: 'none',
          },
          '&::-webkit-search-results-button': {
            display: 'none',
          },
          '&::-webkit-search-results-decoration': {
            display: 'none',
          },
        },
      },
      props: {
        disabled: {
          background: 'var(--colors-neutral07)',
          color: 'var(--colors-disabledText)',
          cursor: 'not-allowed',

          '&::placeholder': {
            color: 'var(--colors-disabledText)',
          },
        },
        iconPosition: {
          left: {
            paddingLeft: 'var(--spaceScale-spacing09)',

            inputSize: {
              large: {
                paddingLeft: 'var(--spaceScale-spacing10)',
              },
            },
          },
          right: {
            paddingRight: 'var(--spaceScale-spacing09)',

            inputSize: {
              large: {
                paddingRight: 'var(--spaceScale-spacing10)',
              },
            },
          },
        },
        inputSize: {
          large: {
            fontSize: 'var(--typeScale-size04-fontSize)',
            lineHeight: 'var(--typeScale-size04-lineHeight)',
            height: 'var(--spaceScale-spacing11)',
            padding: '0 var(--spaceScale-spacing04)'
          },
        },
      },
    },
    Label: {
      default: {
        color: 'var(--colors-neutral)',
        display: 'inline-block',
        fontSize: 'var(--typeScale-size03-fontSize)',
        fontWeight: '600',
        lineHeight: 'var(--typeScale-size02-lineHeight)',
        margin: '0 0 var(--spaceScale-spacing03)',
        maxWidth: '100%',
        textAlign: 'left',
        whiteSpace: 'nowrap',
      },
      props: {
        labelPosition: {
          left: {
            margin: '0 var(--spaceScale-spacing05) 0 0',
          },
        },
        inputSize: {
          large: {
            fontSize: 'var(--typeScale-size02-fontSize)',
          },
        },
        isInverse: {
          color: 'var(--colors-neutral08)',
        },
      },
    },
    LoadingIndicator: {
      components: {
        Message: {
          default: {
            opacity: '1',
            position: 'absolute',
            transition: 'opacity 0.3s',
            width: '100%',
          },
          props: {
            hide: {
              opacity: '0',
            },
          },
        },
        MessageContainer: {
          default: {
            fontSize: 'var(--typeScale-size02-fontSize)',
            lineHeight: 'var(--typeScale-size02-lineHeight)',
            marginTop: 'var(--spaceScale-spacing05)',
            minHeight: '5em',
            position: 'relative',
            textAlign: 'center',
          },
        },
      },
      default: {
        textAlign: 'center',
      },
    },
    Modal: {
      components: {
        CloseBtn: {
          default: {
            position: 'absolute',
            top: '0',
            right: '0',
          },
        },
        H1: {
          default: {
            fontSize: 'var(--typographyVisualStyles-headingSmall-desktop-fontSize)',
            lineHeight: 'var(--typographyVisualStyles-headingSmall-desktop-lineHeight)',
            margin: '0',
            paddingRight: 'var(--spaceScale-spacing10)',
          },
        },
        ModalBackdrop: {
          default: {
            backdropFilter: 'blur(3px)',
            background: 'rgba(0, 0, 0, 0.6)',
            bottom: '0',
            left: '0',
            right: '0',
            top: '0',
            zIndex: '997',
            position: 'fixed',
          },
        },
        ModalBody: {
          default: {
            padding: 'var(--spaceScale-spacing05)',

            '@media': {
              maxWidth: {
                [`${breakpoints.small}`]: {
                  padding: 'var(--spaceScale-spacing06)',
                },
              },
            },
          },
        },
        ModalContent: {
          default: {
            background: 'var(--colors-neutral08)',
            border: '1px solid',
            borderColor: 'var(--colors-neutral06)',
            borderRadius: 'var(--borderRadius)',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
            color: 'var(--colors-neutral)',
            margin: '0 auto',
            position: 'relative',
            zIndex: '1000',

            '@media': {
              maxWidth: {
                [`${breakpoints.small}`]: {
                  margin: 'var(--spaceScale-spacing08) auto',
                },
              },
            },
          },
          props: {
            size: {
              default: {
                maxWidth: 'var(--modal-width-medium)',
              },
              large: {
                maxWidth: 'var(--modal-width-large)',
              },
              small: {
                maxWidth: 'var(--modal-width-small)',
              },
            },
          },
        },
        ModalHeader: {
          padding: 'var(--spaceScale-spacing03) var(--spaceScale-spacing05) 0 var(--spaceScale-spacing05)',

          '@media': {
            maxWidth: {
              [`${breakpoints.small}`]: {
                padding: 'var(--spaceScale-spacing05) var(--spaceScale-spacing06) 0 var(--spaceScale-spacing06)',
              },
            },
          },
        },
      },
      default: {
        bottom: '0',
        left: '0',
        overflowY: 'auto',
        padding: 'var(--spaceScale-spacing03)',
        right: '0',
        top: '0',
        zIndex: '998',
      },
    },
    Pagination: {
      components: {
        NavButton: {
          default: {
            borderTop: `${BuildBorder}`,
            borderRight: `${BuildBorder}`,
            borderBottom: `${BuildBorder}`,
            borderLeft: `${BuildBorder}`,
            height: `${BuildButtonSize}`,
            margin: '0',
            padding: '0',
            width: `${BuildButtonSize}`,
            '&:focus': {
              zIndex: 1,
              outline: '0 !important',
              outlineOffset: 0,
              overflow: 'visible',
            },
            '&:focus:before': {
              content: '',
              border: 'var(--spaceScale-spacing01) solid var(--colors-focus)',
              borderStyle: 'dotted',
              height: 'calc(100% + 14px)',
              left: '-7px',
              position: 'absolute',
              top: '-7px',
              width: 'calc(100% + 14px)',
            },
          },
          props: {
            isInverse: {
              '&:focus:before': {
                border: 'var(--spaceScale-spacing01) solid var(--colors-focusInverse)',
              },
            },
          },
        },
        StyledEllipsis: {
          alignItems: 'center',
          borderTop: `${BuildBorder}`,
          borderRight: `${BuildBorder}`,
          borderBottom: `${BuildBorder}`,
          display: 'flex',
          fontSize: `${pageButtonTypeSize}`,
          height: `${BuildButtonSize}`,
          justifyContent: 'center',
          width: `${BuildButtonSize}`,
        },
        StyledList: {
          display: 'flex',
          margin: '0',
          padding: '0',
        },
        StyledListItem: {
          listStyleType: 'none',
          '&:last-child': {
            'button': {
              borderLeft: 'none',            
            },
          },
        },
        StyledNav: {
          minWidth: '0',
        },
        StyledPageButton: {
          border: 'none',
          borderTop: `${BuildBorder}`,
          borderRight: `${BuildBorder}`,
          borderBottom: `${BuildBorder}`,
          borderRadius: '0',
          boxShadow: `${boxShadowColor}`,
          fontSize: `${pageButtonTypeSize} !important`,
          height: `${buttonSize}`,
          margin: '0',
          minWidth: '0',
          padding: '0',
          width: `${buttonSize}`,

          '&:focus': {
            borderColor: `${hoverBorder}`,
            boxShadow: `${hoverBoxShadowColor}`,
            outline: '0 !important',
            outlineOffset: '0',
            overflow: 'visible',
            zIndex: '1',
          },

          '&:focus:before': {
            content: '',
            border: 'var(--spaceScale-spacing01) solid var(--colors-focus)',
            borderStyle: 'dotted',
            height: 'calc(100% + 14px)',
            left: '-7px',
            position: 'absolute',
            top: '-7px',
            width: 'calc(100% + 14px)',
          },

          props: {
            isInverse: {
              '&:focus:before': {
                border: 'var(--spaceScale-spacing01) solid var(--colors-focusInverse)',
              },
            },
          },
        },
      },
    },
    ProgressBar: {
      components: {
        Bar: {
          default: {
            background: `${buildProgressBarBackground(props)}`,
            borderRadius: '50em',
            display: 'flex',
            transition: 'width 0.3s',
            width: `${props.percentage}%`,
          },
          props: {
            isAnimated: {
              backgroundImage: 'linear-gradient( to right, ${buildProgressBarBackground(props)} 0%, rgba(255, 255, 255, 0.5) 20%, ${buildProgressBarBackground(props)} 40%, ${buildProgressBarBackground(props)} 100%)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1800px 104px',
              display: 'inline-block',
              position: 'relative',
              animation: 'hasAnimation',
            },
          },
        },
        Container: {
          default: {
            alignItems: 'center',
            display: 'flex',
          },
          props: {
            isLoadingIndicator: {
              display: 'block',
            },
          },
        },
        Percentage: {
          default: {
            fontSize: 'var(--typeScale-size02-fontSize)',
            lineHeight: 'var(--typeScale-size02-lineHeight)',
            marginLeft: 'var(--spaceScale-spacing03)',
          },
        },
        TopPercentage: {
          default: {
            fontSize: 'var(--typeScale-size05-fontSize)',
            lineHeight: 'var(--typeScale-size05-lineHeight)',
            marginBottom: 'var(--spaceScale-spacing03)',
            textAlign: 'center',
          },
        },
        Track: {
          default: {
            background: 'var(--colors-neutral08)',
            boxShadow: 'inset 0 0 0 1px var(--colors-neutral04)',
            borderRadius: '50em',
            overflow: 'hidden',
            display: 'flex',
            height: `${props.height}`,
            width: '100%',
          },
          props: {
            isInverse: {
              background: 'rgba(0,0,0,0.25)',
              boxShadow: 'inset 0 0 0 1px var(--colors-tint)',
            },
          },
        },
      },
    },
    ProgressRing: {
      default: {
        transition: 'stroke-dashoffset 0.35s',
        transform: 'rotate(-90deg)',
        transformOrigin: '50% 50%',
      },
    },
    Radio: {
      skipping: 'for now',
    },
    Select: {
      components: {
        ChildrenContainer: {
          default: {
            alignItems: 'center',
            display: 'flex',
            flexGrow: '1',
            flexWrap: 'wrap',
          },
        },
        InputMessageContainer: {
          default: {
            flexGrow: '1',
          },
        },
        NoItemsMessage: {
          default: {
            color: 'var(--colors-neutral04)',
            display: 'block',
            paddingTop: 'var(--spaceScale-spacing03)',
            textAlign: 'center',
          },
        },
        SelectContainerElement: {
          default: {
            alignItems: 'baseline',
            display: 'block',
            position: 'relative',
          },
          props: {
            left: {
              display: 'flex',
            },
          },
        },
        Shared: {
          components: {
            IconWrapper: {
              default: {
                paddingLeft: '12px',
              },
            },
            SelectContainer: {
              default: {
                position: 'relative',
              },
            },
            SelectText: {
              default: {
                flexGrow: '1',
                padding: '0 8px 0 4px',
              },
            },
            SelectedItemButton: {
              default: {
                alignSelf: 'center',
                background: 'var(--colors.neutral06)',
                borderRadius: '4px',
                border: '0',
                boxShadow: '0 0 0',
                display: 'flex',
                fontSize: '12px',
                lineHeight: '16px',
                height: '24px',
                margin: '4px 2px 4px 4px',
                padding: 'var(--spaceScale-spacing02) var(--spaceScale-spacing02) var(--spaceScale-spacing02) var(--spaceScale-spacing03)',
                position: 'relative',
                whiteSpace: 'nowrap',
              },
            },
            SelectedItemsWrapper: {
              default: {
                display: 'flex',
                flexGrow: '1',
                flexWrap: 'wrap',
                padding: '0 0 0 4px',
              },
            },
            StyledButton: {
              default: {
                alignItems: 'center',
                display: 'flex',
                textAlign: 'left',
              },
            },
            StyledCard: {
              default: {
                display: 'none',
                left: '4px',
                marginTop: '4px',
                padding: '4px 0 0',
                position: 'absolute',
                right: '4px',
                top: 'auto',
                zIndex: '2',
              },
              props: {
                isOpen: {
                  display: 'block',
                },
              },
            },
            StyledItem: {
              default: {
                alignSelf: 'center',
                background: 'transparent',
                border: '2px dotted',
                borderColor: 'transparent',
                cursor: 'default',
                lineHeight: '24px',
                margin: '0',
                padding: '8px 16px',
              },
              props: {
                isFocused: {
                  background: 'var(--colors-neutral06)',
                  borderColor: 'var(--colors-focus)',
                },
              },
            },
            StyledList: {
              default: {
                display: 'none',
                listStyle: 'none',
                margin: '0 0 4px',
                outline: 'none',
                padding: '0',
                maxHeight: `${props.maxHeight}`,
                overflowY: 'auto',
              },
              props: {
                isOpen: {
                  display: 'block',
                }
              },
            },
          },
        },
        StyledButton: {
          default: {
            alignItems: 'center',
            display: 'flex',
            height: 'auto',
            minHeight: 'var(--spaceScale-spacing09)',
            padding: '0 var(--spaceScale-spacing03) 0 var(--spaceScale-spacing02)',
            textAlign: 'left',
          },
        },
      },
    },
    SelectionControls: {
      components: {
        InputStyles: {
          components: {
            DisplayInputActiveStyles: {
              default: {
                opacity: '0.4',
                transform: 'scale(0)',
                transition: 'transform 0s',
              },
            },
            DisplayInputStyles: {
              default: {
                alignItems: 'center',
                display: 'flex',
                height: 'var(--spaceScale-spacing06)',
                flexShrink: '0',
                justifyContent: 'center',
                position: 'relative',
                transition: 'all 0.2s ease-out',
                width: 'var(--spaceScale-spacing06)',

                '&:before': {
                  content: '',
                  position: 'absolute',
                },

                '&:after': {
                  content: '',
                  position: 'absolute',
                  borderRadius: '50%',
                  height: 'var(--spaceScale-spacing09)',
                  left: 'calc(var(--spaceScale-spacing03) * -1)',
                  opacity: '0',
                  padding: '50%',
                  top: 'calc(var(--spaceScale-spacing03) * -1)',
                  transform: 'scale(1)',
                  transition: 'opacity 1s, transform 0.5s',
                  width: 'var(--spaceScale-spacing09)',
                },
              },
            },
          },
        },
        StyledContainer: {
          default: {
            alignItems: 'baseline',
            display: 'flex',
            flexWrap: 'nowrap',
            position: 'relative',
          },
        },
        StyledLabel: {
          default: {
            alignItems: 'flex-start',
            color: 'inherit',
            display: 'flex',
            fontSize: 'var(--typeScale-size03-fontSize)',
            lineHeight: 'var(--typeScale-size03-lineHeight)',
            margin: '0',
            padding: 'var(--spaceScale-spacing03) 0',
          },
          props: {
            isInverse: {
              color: 'var(--colors-neutral08)',
            },
          },
        },
      },
    },
    SkipLink: {
      left: '-9999px',
      position: 'fixed',
      top: '-9999px',

      '&:focus': {
        left: `${props.positionLeft}px`,
        top: `${props.positionTop}px`,
        zIndex: '99999',
      },
    },
    Spinner: {
      default: {
        animation: 'spinner-border 0.75s linear infinite',
        border: `2px solid ${props.color}`,
        borderRightColor: 'transparent',
        borderRadius: '50%',
        display: 'inline-block',
        height: `${props.size}`,
        width: `${props.size}`,

        '@keyframes spinner-border': {
          'to': {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
    StyledButton: {
      components: {
        buttonStyles: {
          default: {
            alignItems: 'center',
            background: 'var(--colors-primary)',
            border: '0',
            borderColor: 'var(--colors-primary)',
            borderRadius: 'var(--borderRadius)',
            color: 'var(--colors-neutral08)',
            cursor: 'pointer',
            display: 'inline-flex',
            flexShrink: '0',
            fontFamily: 'var(--bodyFont)',
            fontSize: 'var(--typeScale-size03-fontSize)',
            fontWeight: '600',
            height: 'var(--spaceScale-spacing09)',
            justifyContent: 'center',
            lineHeight: 'var(--typeScale-size03-lineHeight)',
            margin: 'var(--spaceScale-spacing02)',
            minWidth: 'var(--spaceScale-spacing13)',
            overflow: 'hidden',
            padding: 'var(--spaceScale.-spacing04) var(--spaceScale.-spacing05)',
            position: 'relative',
            textAlign: 'center',
            textDecoration: 'none',
            textTransform: `${props.textTransform || 'uppercase'}`,
            touchAction: 'manipulation',
            transition: 'background 0.35s, border-color 0.35s, box-shadow 0.35s, color 0.35s',
            verticalAlign: 'middle',
            whiteSpace: 'nowrap',

            'svg': {
              flexShrink: '0',
            },

            '&:not(:disabled)': {
              '&:active': {
                background: `${buildActiveBackground(props)}`,
                color: `${buildActiveColor(props)}`,

                '&:after': {
                  opacity: '0.4',
                  transform: 'translate(-50%, -50%) scale(0)',
                  transition: 'transform 0s',
                }
              },
              '&:after': {
                background: `${buildAfterBackground(props)}`,
                borderRadius: '50%',
                content: '',
                height: 'var(--spaceScale-spacing07)',
                left: '50%',
                opacity: '0',
                padding: '50%',
                position: 'absolute',
                top: '50%',
                transform: 'translate(-50%, -50%) scale(1)',
                transition: 'opacity 1s, transform 0.5s',
                width: 'var(--spaceScale-spacing07)',
              },
              '&:focus': {
                outline: '2px dotted var(--colors-focus)',
                outlineOffset: '3px',
              },
              '&:hover': {
                background: `${buildFocusBackground(props)}`,
                color: `${buildFocusColor(props)}`,
              },
            },
          },
          props: {
            colors: {
              danger: {
                background: 'var(--colors-danger)',
                borderColor: 'var(--colors-danger)',
                color: 'var(--colors-danger)',
              },
              marketing: {
                background: 'var(--colors-pop04)',
                borderColor: 'var(--colors-pop04)',
                color: 'var(--colors-foundation02)',
              },
              secondary: {
                background: 'var(--colors-neutral08)',
                border: '2px solid',
                color: 'var(--colors-neutral)',
              },
              success: {
                background: 'var(--colors-success)',
                borderColor: 'var(--colors-success)',
                color: 'var(--colors-success)',
              },
            },
            disabled: {
              default: {
                background: 'var(--colors-neutral06)',
                borderColor: 'var(--colors-neutral06)',
                color: 'var(--colors-disabledText)',
                cursor: 'not-allowed',
              },
              props: {
                isInverse: {
                  props: {
                    outline: {
                      borderColor: 'var(--colors-disabledInverseText)',
                      color: 'var(--colors-disabledInverseText)',
                    },
                  },
                },
              },
            },
            isFullWidth: {
              display: 'flex',
              margin: 'var(--spaceScale-spacing02) 0',
              width: '100%',
            },
            isIconOnly: {
              default: {
                display: 'inline-flex',
                justifyContent: 'center',
                lineHeight: '1',
                minWidth: '0',
                padding: '0',
                width: 'var(--spaceScale-08)',
              },
              size: {
                small: {
                  width: 'var(--spaceScale-08)'
                },
                large: {
                  width: 'var(--spaceScale-08)'
                },
              },
            },
            isInverse: {
              default: {
                background: 'var(--colors-neutral08)',
                borderColor: 'var(--colors-neutral08)',
                color: 'var(--colors-neutral08)',
                
                '&:not(:disabled)': {
                  '&:focus': {
                    outline: '2px dotted var(--colors-focusInverse)',
                    outlineOffset: '3px',
                  },
                },
              },
            },
            outline: {
              default: {
                border: '2px solid',
              },             
            },
            shape: {
              leftCap: {
                borderRadius: 'var(--borderRadius) 0 0 var(--borderRadius)',
              },
              rightCap: {
                borderRadius: '0 var(--borderRadius) var(--borderRadius) 0',
              },
              round: {
                borderRadius: '100%',
              },
            },
            size: {
              large: {
                default: {
                  fontSize: 'var(--typeScale-size04-fontSize)',
                  height: 'var(--spaceScale-spacing11)',
                  lineHeight: 'var(--typeScale-size04-lineHeight)',
                  padding: 'var(--spaceScale.-spacing04) var(--spaceScale.-spacing06)',
                },
              },
              small: {
                default: {
                  fontSize: 'var(--typeScale-size01-lineHeight)',
                  height: 'var(--spaceScale-spacing07)',
                  lineHeight: 'var(--typeScale-size01-lineHeight)',
                  minWidth: '0',
                  padding: 'var(--spaceScale.-spacing02) var(--spaceScale.-spacing03)',
                },
              },
            },
          },
        },
      },
    },
  },
};
