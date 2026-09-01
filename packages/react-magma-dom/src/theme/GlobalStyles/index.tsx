import * as React from 'react';

import { Global, css } from '@emotion/react';

import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../magma';
import { ThemeContext } from '../ThemeContext';

function getGlobalImports() {
  return css`
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');
  `;
}

export function getGlobalLinkColor(
  theme: ThemeInterface,
  isInverse: boolean,
  state: 'default' | 'hover' | 'focus'
) {
  if (state === 'hover') {
    return isInverse ? theme.colors.cyan400 : theme.colors.cyan800;
  }

  return isInverse ? theme.colors.cyan500 : theme.colors.cyan700;
}

function getStyles(theme, isInverse: boolean) {
  return css`
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    *:focus {
      outline: 2px solid
        ${isInverse ? theme.colors.focusInverse : theme.colors.focus};
      outline-offset: -1px;
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
        ? theme.colors.primary600
        : theme.colors.neutral0};
      color: ${isInverse ? theme.colors.neutral0 : theme.colors.neutral};
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
      color: ${getGlobalLinkColor(theme, isInverse, 'default')};
      cursor: pointer;
      text-decoration: underline;

      &:hover {
        color: ${getGlobalLinkColor(theme, isInverse, 'hover')};
      }
      &:focus {
        color: ${getGlobalLinkColor(theme, isInverse, 'focus')};
        outline: 2px solid
          ${isInverse ? theme.colors.focusInverse : theme.colors.focus};
        outline-offset: 2px;
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
  const isInverse = useIsInverse();

  return (
    <ThemeContext.Consumer>
      {theme => (
        <>
          <Global styles={getGlobalImports()} />
          <Global styles={getStyles(theme, isInverse)} />
        </>
      )}
    </ThemeContext.Consumer>
  );
};
