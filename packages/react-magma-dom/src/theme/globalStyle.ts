import { createGlobalStyle } from 'styled-components';
import { magma } from './magma';

// tslint:disable:no-unused-expression
export const Theme = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i');
  @import url('https://use.typekit.net/rwr6vzk.css');

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  & body {
    color: ${magma.colors.neutral02};
  	font-family: ${magma.bodyFont};
  	font-style: normal;
  	font-weight: 400;
  	font-size: 15px;
  	line-height: 22px;
  }

  a {
    color: ${magma.colors.primary};
    cursor: pointer;
    text-decoration: none;

    &:hover,
    &:focus {
      color: ${magma.colors.foundation01};
      text-decoration: underline;
    }
  }
`;
