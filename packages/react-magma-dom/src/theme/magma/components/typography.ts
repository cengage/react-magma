export interface TypographyColors {
  color: string;
  inverse: {
    color: string;
  };
  danger: {
    color: string;
    inverse: {
      color: string;
    };
  };
  expressive: {
    color: string;
    inverse: {
      color: string;
    };
  };
  success: {
    color: string;
    inverse: {
      color: string;
    };
  };
  subdued: {
    color: string;
    inverse: {
      color: string;
    };
  };
}

export const buildTypographyColors = colors => {
  return {
    color: colors.neutral,
    inverse: {
      color: colors.neutral08,
    },
    danger: {
      color: colors.danger,
      inverse: {
        color: colors.dangerInverse,
      },
    },
    expressive: {
      color: colors.foundation02,
      inverse: {
        color: colors.neutral08,
      },
    },
    success: {
      color: colors.success,
      inverse: {
        color: colors.successInverse,
      },
    },
    subdued: {
      color: colors.neutral03,
      inverse: {
        color: colors.focusInverse,
      },
    },
  };
};
