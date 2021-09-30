interface ThemeInterface {
  [key: string]: string | number | ThemeInterface;
}

export const convertThemeToCssVariables = (theme: ThemeInterface, path:string ='-') =>
  Object.keys(theme).reduce((acc: Record<string, string>, key) => {
    if (typeof theme[key] === 'object') {
      acc = {...acc, ...convertThemeToCssVariables(theme[key] as ThemeInterface, `${path}-${key}`)};
    } else {
      acc[`${path}-${key}`] = theme[key] as string;
    }
    return acc;
  }, {});