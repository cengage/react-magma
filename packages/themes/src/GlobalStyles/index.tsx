import * as React from 'react';
import { Global, css } from '@emotion/react';
import { ThemeContext } from '../ThemeContext';
import { ThemeInterface } from '../magma';
import { useIsInverse } from '../inverse';
import {magma, v3 as theme} from '../magma';

import { convertThemeToCssVariables } from '../utils';

const vars = convertThemeToCssVariables(theme);

function getStyles(theme: ThemeInterface, isInverse: boolean) {
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

export const GlobalStyles: React.FunctionComponent = () => {
  const isInverse = useIsInverse() ||  false;
  console.log(getStyles(magma, false))
  return (
    <ThemeContext.Consumer>
      {theme => <Global styles={getStyles(theme, isInverse)} />}
    </ThemeContext.Consumer>
  );
};
