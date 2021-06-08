export interface ThemeCheckbox {
  uncheckedColor: string;
  checkedColor: string;
  inverse: {
    uncheckedColor: string;
    checkedColor: string;
  };
  disabled: {
    uncheckedColor: string;
    checkedColor: string;
    inverse: {
      uncheckedColor: string;
      checkedColor: string;
    };
  };
}

export const buildThemeCheckbox = colors => {
  return {
    uncheckedColor: colors.neutral02,
    checkedColor: colors.primary,
    inverse: {
      uncheckedColor: colors.neutral08,
      checkedColor: colors.neutral08,
    },
    disabled: {
      uncheckedColor: colors.neutral05,
      checkedColor: colors.neutral05,
      inverse: {
        uncheckedColor: colors.tint04,
        checkedColor: colors.tint04,
      },
    },
  };
};
