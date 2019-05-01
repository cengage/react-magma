import * as React from 'react';
import { Global, css } from '@emotion/core';
import { ThemeContext } from '../themeContext';

function getStyles(theme) {
  return css`
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i');
    @import url('https://use.typekit.net/rwr6vzk.css');

    *,
    *:before,
    *:after {
      box-sizing: border-box;
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

      &:focus {
        outline: 2px dotted ${theme.colors.pop03};
        outline-offset: 3px;
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: ${theme.headingFont};
      font-weight: 500;
      line-height: 1.1;
      margin: 20px 0 10px;
    }

    h1 {
      font-size: 40px;
    }

    h2 {
      font-size: 32px;
    }

    h3 {
      font-size: 26px;
    }

    h4 {
      font-size: 23px;
    }

    h5 {
      font-size: 20px;
    }

    h6 {
      font-size: 18px;
    }
  `;
}

export const GlobalStyles: React.FunctionComponent = () => {
  return (
    <ThemeContext.Consumer>
      {theme => theme && <Global styles={getStyles(theme)} />}
    </ThemeContext.Consumer>
  );
};
