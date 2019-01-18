// styled-components.ts
import * as styledComponents from 'styled-components';

import { ThemeInterface } from './magma';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  ThemeInterface
>;

export { styled, css, createGlobalStyle, keyframes, ThemeProvider };
