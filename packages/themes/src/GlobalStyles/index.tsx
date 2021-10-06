import { Global, css } from '@emotion/react';

import { ThemeContext } from '../ThemeContext';
import { ThemeInterface } from '../ThemeInterface';
import { useIsInverse } from '../inverse';
import {v3} from '../magma';
import { mergeThemes } from '../utils';

import { convertThemeToCssVariables } from '../utils';

function getStyles(theme: any, isInverse: boolean, vars: Record<string, string>) {
  return css`
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

    :root {
      ${vars}
    }

    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    *:focus {
      outline: 2px dotted
        ${isInverse ? theme.colors.focusInverse : theme.colors.focus};
      outline-offset: 4px;
    }

    html {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      font-size: ${theme.typeScale.size03.fontSize};
      line-height: ${theme.typeScale.size03.lineHeight};
      scroll-behavior: smooth;
    }

    html,
    body {
      background: ${isInverse
        ? theme.colors.foundation
        : theme.colors.neutral08};
      color: ${isInverse ? theme.colors.neutral08 : theme.colors.neutral};
      margin: 0;
      padding: 0;
    }

    body {
      font-family: ${theme.bodyFont};
      font-style: normal;
      font-weight: 400;
      font-size: ${theme.typeScale.size03.fontSize};
      line-height: ${theme.typeScale.size03.lineHeight};
    }

    a {
      color: ${isInverse ? theme.colors.neutral07 : theme.colors.primary};
      cursor: pointer;
      text-decoration: underline;

      &:hover,
      &:focus {
        color: ${isInverse ? theme.colors.neutral06 : theme.colors.focus};
      }
    }

    button,
    input,
    optgroup,
    select,
    textarea {
      font: inherit;
      margin: 0;
    }

    svg:not(:root) {
      overflow: hidden;
    }
  `;
}

export const GlobalStyles= ({theme}:{theme:ThemeInterface}) => {
  const isInverse = useIsInverse() ||  false;
  const vars = convertThemeToCssVariables(mergeThemes(theme, v3));
  return (
    <ThemeContext.Consumer>
      {(theme: any) => <Global styles={getStyles(theme, isInverse, vars)} />}
    </ThemeContext.Consumer>
  );
};
