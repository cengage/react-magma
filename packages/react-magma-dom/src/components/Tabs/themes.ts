import { TabsTheme } from './TabsContainer';

export const darkTheme = (tabsTheme: any) => {
  return {
    bgColor: tabsTheme.colors.neutral02,
    color: tabsTheme.colors.neutral05,
    hoverColor: tabsTheme.colors.neutral08,
    activeColor: tabsTheme.colors.neutral08,
    disabledColor: tabsTheme.colors.neutral04,
    colorBorder: '#f46603',
    bgHoverColor: 'rgba(0,0,0,.5)',
    font: tabsTheme.bodyFont,
    boxShadow: '0px 5px 13px 1px rgba(0,0,0,0.10)',
    border: 'none',
    colorOfArrows: tabsTheme.colors.neutral08
  };
};

export const greyTheme = (tabsTheme: any) => {
  return {
    bgColor: tabsTheme.colors.neutral07,
    color: 'rgb(114, 114, 111)',
    hoverColor: '#737373',
    activeColor: tabsTheme.colors.foundation02,
    colorBorder: tabsTheme.colors.foundation02,
    disabledColor: tabsTheme.colors.neutral05,
    bgHoverColor: 'rgba(0,0,0,.05)',
    font: tabsTheme.bodyFont,
    boxShadow: '0px 5px 13px 1px rgba(0,0,0,0.10)',
    border: 'none',
    colorOfArrows: tabsTheme.colors.neutral02
  };
};

export const lightTheme = (tabsTheme: any) => {
  return {
    bgColor: tabsTheme.colors.neutral08,
    color: 'rgb(114, 114, 111)',
    hoverColor: '#737373',
    activeColor: tabsTheme.colors.foundation02,
    colorBorder: tabsTheme.colors.foundation02,
    disabledColor: tabsTheme.colors.neutral05,
    bgHoverColor: 'rgba(0,0,0,.05)',
    font: tabsTheme.bodyFont,
    boxShadow: 'none',
    border: `1px solid ${tabsTheme.colors.neutral06}`,
    colorOfArrows: tabsTheme.colors.neutral02
  };
};

export const blueTheme = (tabsTheme: any) => {
  return {
    bgColor: '#0f3765',
    color: '#aabccc',
    activeColor: tabsTheme.colors.neutral08,
    hoverColor: tabsTheme.colors.neutral08,
    colorBorder: '#f46603',
    disabledColor: '#6587a1',
    bgHoverColor: 'rgba(0,0,0,.5)',
    font: tabsTheme.bodyFont,
    boxShadow: '0px 5px 13px 1px rgba(0,0,0,0.10)',
    border: 'none',
    colorOfArrows: tabsTheme.colors.neutral08
  };
};

export const darkBlueTheme = (tabsTheme: any) => {
  return {
    bgColor: '#08263e',
    color: '#aabccc',
    activeColor: tabsTheme.colors.neutral08,
    hoverColor: tabsTheme.colors.neutral08,
    colorBorder: '#f46603',
    disabledColor: '#6587a1',
    bgHoverColor: 'rgba(0,0,0,.5)',
    font: tabsTheme.bodyFont,
    boxShadow: '0px 5px 13px 1px rgba(0,0,0,0.10);',
    colorOfArrows: tabsTheme.colors.neutral08
  };
};

export const defineTheme = (themeContext: any, themeValue: TabsTheme) => {
  switch (themeValue) {
    case 'dark':
      return darkTheme(themeContext);
    case 'light':
      return lightTheme(themeContext);
    case 'blue':
      return blueTheme(themeContext);
    case 'darkBlue':
      return darkBlueTheme(themeContext);
    case 'grey':
      return greyTheme(themeContext);
    default:
      return lightTheme(themeContext);
  }
};
