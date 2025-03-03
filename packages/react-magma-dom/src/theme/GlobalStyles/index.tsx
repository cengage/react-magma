import * as React from 'react';

import { Global, css } from '@emotion/react';

import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../ThemeContext';

function getGlobalImports() {
  return css`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
  `;
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
        : theme.colors.neutral100};
      color: ${isInverse ? theme.colors.neutral100 : theme.colors.neutral};
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
      color: ${isInverse ? theme.colors.tertiary : theme.colors.primary};
      cursor: pointer;
      text-decoration: underline;

      &:hover,
      &:focus {
        color: ${isInverse ? theme.colors.neutral100 : theme.colors.primary700};
      }
      &:focus {
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
