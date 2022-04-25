import * as React from 'react';
import { Global, css } from '@emotion/core';
import { ThemeContext } from '../ThemeContext';
import { useIsInverse } from '../../inverse';

function getStyles(theme, isInverse: boolean) {
  return css`
    @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    *:focus {
      outline: 2px solid
        ${isInverse ? theme.colors.focusInverse : theme.colors.focus};
      outline-offset: 2px;
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
  const isInverse = useIsInverse();
  return (
    <ThemeContext.Consumer>
      {theme => <Global styles={getStyles(theme, isInverse)} />}
    </ThemeContext.Consumer>
  );
};
