interface ThemeButton {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  inverse: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
  };
  outline: {
    borderColor: string;
    textColor: string;
    inverse: {
      borderColor: string;
      textColor: string;
    };
  };
}

export interface ThemeButtons {
  primary: ThemeButton;
  secondary: ThemeButton;
  success: ThemeButton;
  danger: ThemeButton;
  marketing: ThemeButton;
  disabled: ThemeButton;
}

export const button = colors => {
  return {
    primary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      textColor: colors.neutral08,
      inverse: {
        backgroundColor: colors.neutral08,
        borderColor: colors.neutral08,
        textColor: colors.primary,
      },
      outline: {
        borderColor: colors.primary,
        textColor: colors.primary,
        inverse: {
          borderColor: colors.neutral08,
          textColor: colors.neutral08,
        },
      },
    },
    secondary: {
      backgroundColor: colors.neutral08,
      borderColor: colors.neutral05,
      textColor: colors.neutral,
      inverse: {
        backgroundColor: colors.neutral08,
        borderColor: colors.neutral08,
        textColor: colors.neutral,
      },
      outline: {
        borderColor: colors.neutral05,
        textColor: colors.neutral,
        inverse: {
          borderColor: colors.neutral08,
          textColor: colors.neutral08,
        },
      },
    },
    success: {
      backgroundColor: colors.success,
      borderColor: colors.success,
      textColor: colors.neutral08,
      inverse: {
        backgroundColor: colors.neutral08,
        borderColor: colors.neutral08,
        textColor: colors.success,
      },
      outline: {
        borderColor: colors.success,
        textColor: colors.success,
        inverse: {
          borderColor: colors.neutral08,
          textColor: colors.neutral08,
        },
      },
    },
    danger: {
      backgroundColor: colors.danger,
      borderColor: colors.danger,
      textColor: colors.neutral08,
      inverse: {
        backgroundColor: colors.neutral08,
        borderColor: colors.neutral08,
        textColor: colors.danger,
      },
      outline: {
        borderColor: colors.danger,
        textColor: colors.danger,
        inverse: {
          borderColor: colors.neutral08,
          textColor: colors.neutral08,
        },
      },
    },
    marketing: {
      backgroundColor: colors.pop04,
      borderColor: colors.pop04,
      textColor: colors.foundation02,
      inverse: {
        backgroundColor: colors.pop04,
        borderColor: colors.pop04,
        textColor: colors.foundation02,
      },
      outline: {
        borderColor: colors.pop04,
        textColor: colors.foundation02,
        inverse: {
          borderColor: colors.pop04,
          textColor: colors.foundation02,
        },
      },
    },
    disabled: {
      backgroundColor: colors.neutral06,
      borderColor: colors.neutral06,
      textColor: colors.disabledText,
      inverse: {
        backgroundColor: colors.neutral06,
        borderColor: colors.neutral06,
        textColor: colors.disabledText,
      },
      outline: {
        borderColor: colors.disabledText,
        textColor: colors.disabledText,
        inverse: {
          borderColor: colors.disabledInverseText,
          textColor: colors.disabledInverseText,
        },
      },
    },
  };
};
