export interface ThemeDocs {
  backgroundColor: string;
  isInverse: boolean;
  tabsBackground: string;
  textColor: string;
}

export const docs = colors => {
  return {
    backgroundColor: `linear-gradient(
            to bottom,
            ${colors.foundation02} 0%,
            ${colors.pop} 100%
          )`,
    isInverse: true,
    tabsBackground: colors.foundation,
    textColor: colors.neutral08,
  };
};
