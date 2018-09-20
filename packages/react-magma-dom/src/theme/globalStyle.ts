import { injectGlobal } from 'styled-components';
import { magma } from './magma';

// tslint:disable:no-unused-expression
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  @import url('https://use.typekit.net/rwr6vzk.css');

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  & body {
    color: ${magma.primary01};
  	font-family: ${magma.bodyFont};
  	font-style: normal;
  	font-weight: 400;
  	font-size: 15px;
  	line-height: 22px;
  }

  a {
    color: ${magma.primary02};
    cursor: pointer;
    text-decoration: none;

    &:hover,
    &:focus {
      color: ${magma.secondary01};
      text-decoration: underline;
    }
  }

  h1 {
    color: ${magma.primary02};
    &:before {
      display: none;
    }
  }
`;
