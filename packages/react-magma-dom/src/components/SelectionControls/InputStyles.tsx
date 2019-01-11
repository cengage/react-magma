import * as React from 'react';
import styled, { css } from '../../theme/styled-components';

export const DisplayInputStyles = css`
  align-items: center;
  border: 2px solid;
  display: flex;
  height: 20px;
  flex-shrink: 0;
  justify-content: center;
  margin: 2px 10px 0 10px;
  position: relative;
  transition: all 0.2s ease-out;
  width: 20px;

  &:before,
  &:after { // focus and active states
    content: '';
    position: absolute;
  }

  &:after { // active state
    border-radius: 50%;
    height: 40px;
    left: -12px;
    opacity: 0;
    padding: 50%;
    top: 50%
    transform: scale(1);
    transition: opacity 1s, transform 0.5s;
    width: 40px;
  }
`;
