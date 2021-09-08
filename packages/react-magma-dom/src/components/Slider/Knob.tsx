import styled from '@emotion/styled';
import { ProgressBarProps, ProgressBarDirection } from '../ProgressBar';

export const Knob = styled.div<ProgressBarProps>`
  border-radius: 50%;
  border: none;
  width: 16px;
  height: 16px;
  box-shadow: inset 0 0 0 1px ${props => props.theme.colors.neutral04},
    0 0 4px ${props => props.theme.colors.shade02};
  background: ${props => props.theme.colors.neutral08};
  cursor: pointer;
  position: absolute;
  bottom: ${props =>
    props.direction === ProgressBarDirection.vertical ? 'inherit' : '-4px'};
  left: ${props =>
    props.direction === ProgressBarDirection.vertical ? '-4px' : '-8px'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  &:focus {
    outline: none;
  }
  &:focus:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 0 10px rgb(2 126 225 / 20%);
    border-radius: 3rem;
  }
  &:focus:after {
    content: '';
    position: absolute;
    top: -11px;
    left: -11px;
    width: calc(100% + 22px);
    height: calc(100% + 22px);
    border: 2px dotted#027EE1;
    border-radius: 3rem;
  }
`;
