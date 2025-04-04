import * as React from 'react';

import { Variant } from 'framer-motion';

export type MotionVariants<T extends string> = Record<T, Variant>;

export interface ThemeTransitions {
  [key: string]: {
    motion: MotionVariants<'enter' | 'exit'>;
    baseStyle: React.CSSProperties;
  };
}

export const reducedMotionTransitions: ThemeTransitions = {
  fade: {
    motion: {
      exit: {
        opacity: 0,
        transition: {
          opacity: {
            duration: 0,
            ease: 'easeOut',
          },
        },
      },
      enter: {
        opacity: 1,
        transition: {
          duration: 0,
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
            duration: 0,
            ease: 'easeInOut',
          },
        },
      },
      enter: {
        y: '0',
        transition: {
          y: {
            type: 'spring',
            damping: 25,
            stiffness: 180,
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
            duration: 0,
            ease: 'easeInOut',
          },
        },
      },
      enter: {
        y: '0',
        transition: {
          y: {
            type: 'spring',
            damping: 25,
            stiffness: 180,
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
            duration: 0,
            ease: 'easeInOut',
          },
        },
      },
      enter: {
        x: '0',
        transition: {
          x: {
            type: 'spring',
            damping: 25,
            stiffness: 180,
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
            duration: 0,
            ease: 'easeInOut',
          },
        },
      },
      enter: {
        x: '0',
        transition: {
          x: {
            type: 'spring',
            damping: 25,
            stiffness: 180,
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
  nudgeTop: {
    motion: {
      exit: {
        y: '-50px',
        transition: {
          y: {
            duration: 0,
            ease: 'easeInOut',
          },
        },
      },
      enter: {
        y: '0',
        transition: {
          y: {
            type: 'spring',
            damping: 25,
            stiffness: 180,
          },
        },
      },
    },
    baseStyle: {},
  },
  nudgeBottom: {
    motion: {
      exit: {
        y: '50px',
        transition: {
          y: {
            duration: 0,
            ease: 'easeInOut',
          },
        },
      },
      enter: {
        y: '0',
        transition: {
          y: {
            type: 'spring',
            damping: 25,
            stiffness: 180,
          },
        },
      },
    },
    baseStyle: {},
  },
  nudgeRight: {
    motion: {
      exit: {
        x: '50px',
        transition: {
          x: {
            duration: 0,
            ease: 'easeInOut',
          },
        },
      },
      enter: {
        x: '0',
        transition: {
          x: {
            type: 'spring',
            damping: 25,
            stiffness: 180,
          },
        },
      },
    },
    baseStyle: {},
  },
  nudgeLeft: {
    motion: {
      exit: {
        x: '-50px',
        transition: {
          x: {
            duration: 0,
            ease: 'easeInOut',
          },
        },
      },
      enter: {
        x: '0',
        transition: {
          x: {
            type: 'spring',
            damping: 25,
            stiffness: 180,
          },
        },
      },
    },
    baseStyle: {},
  },
  scale: {
    motion: {
      exit: {
        scale: 0.95,
        transition: {
          scale: {
            duration: 0,
            ease: 'easeOut',
          },
        },
      },
      enter: {
        scale: 1,
        transition: {
          scale: {
            duration: 0,
            ease: 'easeInOut',
          },
        },
      },
    },
    baseStyle: {},
  },
  rotate45: {
    motion: {
      exit: {
        rotate: 0,
        transition: {
          rotate: {
            type: 'tween',
            stiffness: 50,
            duration: 0,
          },
        },
      },
      enter: {
        rotate: -45,
        transition: {
          rotate: {
            type: 'tween',
            stiffness: 50,
            duration: 0,
          },
        },
      },
    },
    baseStyle: {},
  },
  rotate90: {
    motion: {
      exit: {
        rotate: 0,
        transition: {
          rotate: {
            type: 'tween',
            stiffness: 50,
            duration: 0,
          },
        },
      },
      enter: {
        rotate: -90,
        transition: {
          rotate: {
            type: 'tween',
            stiffness: 50,
            duration: 0,
          },
        },
      },
    },
    baseStyle: {},
  },
  rotate180: {
    motion: {
      exit: {
        rotate: 0,
        transition: {
          rotate: {
            type: 'tween',
            stiffness: 50,
            duration: 0,
          },
        },
      },
      enter: {
        rotate: -180,
        transition: {
          rotate: {
            type: 'tween',
            stiffness: 50,
            duration: 0,
          },
        },
      },
    },
    baseStyle: {},
  },
  collapse: {
    motion: {
      exit: {},
      enter: {},
    },
    baseStyle: {
      overflow: 'visible',
    },
  },
};
