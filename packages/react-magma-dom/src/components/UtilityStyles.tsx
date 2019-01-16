import * as React from 'react';
import styled, { css } from '../theme/styled-components';
import { magma } from '../theme/magma';

export const HiddenStyles = css`
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  position: absolute;
  overflow: hidden;
  top: auto;
  white-space: nowrap;
  width: 1px;
`;

export const FocusStyles = css`
  outline: 2px dotted ${magma.colors.pop03};
`;
