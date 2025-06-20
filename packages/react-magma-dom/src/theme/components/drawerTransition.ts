import { ThemeTransitions } from './transition';

export const drawerTransitions: ThemeTransitions = {
  fade: {
    motion: {
      exit: {
        opacity: 0,
        transition: {
          opacity: {
            duration: 0.25,
            ease: 'easeOut',
          },
        },
      },
      enter: {
        opacity: 1,
        transition: {
          duration: 0.25,
          ease: 'easeIn',
        },
      },
    },
    baseStyle: {},
  },
  slideTop: {
    motion: {
      exit: {
        y: '-100%',
        transition: {
          y: {
            duration: 0.25,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      },
      enter: {
        y: '0',
        transition: {
          y: {
            duration: 0.25,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      },
    },
    baseStyle: {
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
    },
  },
  slideBottom: {
    motion: {
      exit: {
        y: '100%',
        transition: {
          y: {
            duration: 0.25,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      },
      enter: {
        y: '0',
        transition: {
          y: {
            duration: 0.25,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      },
    },
    baseStyle: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      left: 0,
    },
  },
  slideRight: {
    motion: {
      exit: {
        x: '100%',
        transition: {
          x: {
            duration: 0.25,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      },
      enter: {
        x: '0',
        transition: {
          x: {
            duration: 0.25,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      },
    },
    baseStyle: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
    },
  },
  slideLeft: {
    motion: {
      exit: {
        x: '-100%',
        transition: {
          x: {
            duration: 0.25,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      },
      enter: {
        x: '0',
        transition: {
          x: {
            duration: 0.25,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      },
    },
    baseStyle: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
    },
  },
};
