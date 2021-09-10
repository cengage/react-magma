import styled from '@emotion/styled';
import * as React from 'react';
import { ProgressBarProps, ProgressBarDirection } from '../ProgressBar';


export const Tooltip = styled.div<ProgressBarProps>`
  background: ${props =>
    props.isInverse
      ? props.theme.tooltip.inverse.backgroundColor
      : props.theme.tooltip.backgroundColor};
  border-radius: ${props => props.theme.borderRadius};
  bottom: 30px;
  color: ${props =>
    props.isInverse
      ? props.theme.tooltip.inverse.textColor
      : props.theme.tooltip.textColor};
  font-size: ${props => props.theme.tooltip.typeScale.fontSize};
  font-weight: ${props => props.theme.tooltip.fontWeight};
  line-height: ${props => props.theme.tooltip.typeScale.lineHeight};
  max-width: ${props => props.theme.tooltip.maxWidth};
  min-height: 2.5em;
  padding: ${props => props.theme.spaceScale.spacing03}
    ${props => props.theme.spaceScale.spacing04};
  z-index: ${props => props.theme.tooltip.zIndex};
  &&,
  &&:before {
    display: block;
    height: ${props => props.theme.tooltip.arrowSizeDoubled};
    position: absolute;
    width: auto;
    /* z-index: -1; */
  }
  &&::before {
    content: '';
    transform: rotate(45deg);
    bottom: -4px;
    left: calc(50% - 4px);
    width: 8px;
    background: ${props =>
      props.isInverse
        ? props.theme.tooltip.inverse.backgroundColor
        : props.theme.tooltip.backgroundColor};
  }
`;