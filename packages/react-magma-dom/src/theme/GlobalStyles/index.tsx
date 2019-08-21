import * as React from 'react';
import { Global, css } from '@emotion/core';
import { ThemeContext } from '../ThemeContext';

function getStyles(theme) {
  return css`
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i');

    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    *:focus {
      outline: 2px dotted ${theme.colors.pop02};
      outline-offset: 3px;
      transition: outline 0.1s linear;
    }

    html {
      scroll-behavior: smooth;
    }

    html,
    body {
      margin: 0;
      padding: 0;
    }

    body {
      background: ${theme.colors.neutral08};
      color: ${theme.colors.neutral02};
      font-family: ${theme.bodyFont};
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 22px;
    }

    a {
      color: ${theme.colors.primary};
      cursor: pointer;
      text-decoration: underline;

      &:hover,
      &:focus {
        color: ${theme.colors.foundation01};
        text-decoration: none;
      }
    }
  `;
}

export const GlobalStyles: React.FunctionComponent = () => {
  return (
    <ThemeContext.Consumer>
      {theme => <Global styles={getStyles(theme)} />}
    </ThemeContext.Consumer>
  );
};
