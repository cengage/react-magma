import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';

export interface CardProps extends React.LabelHTMLAttributes<HTMLDivElement> {
  align?: CardAlignment;
  background?: boolean;
  calloutType?: CardCalloutType;
  hasDropShadow?: boolean;
  isInverse?: boolean;
  testId?: string;
  width?: string | number;
}

export enum CardAlignment {
  center = 'center',
  left = 'left',
  right = 'right',
}

export enum CardCalloutType {
  danger = 'danger',
  primary = 'primary',
  success = 'success',
  warning = 'warning',
}

export function buildCalloutBackground(
  props: CardProps & { theme: ThemeInterface }
) {
  switch (props.calloutType) {
    case 'danger':
      return props.theme.colors.danger;
    case 'success':
      return props.theme.colors.success;
    case 'warning':
      return props.theme.colors.pop04;
    default:
      return props.theme.colors.primary;
  }
}

const StyledCard = styled.div<CardProps>`
  background: ${props =>
    props.background ? props.background : props.theme.colors.neutral08};
  border: 1px solid
    ${props =>
      props.background ? props.background : props.theme.colors.neutral06};
  border-radius: 5px;
  box-shadow: ${props =>
    props.hasDropShadow ? '0 2px 6px 0 rgba(0,0,0,0.18)' : '0 0 0'};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: ${props => (props.calloutType ? '5px' : '0')};
  position: relative;
  text-align: ${props => props.align};
  width: ${props => props.width};

  ${props =>
    props.calloutType &&
    css`
      &:before {
        background: ${buildCalloutBackground(props)};
        border-radius: 5px 0 0 5px;
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        left: 0;
        width: 5px;
      }
    `}
`;

export const Card: React.FunctionComponent<CardProps> = (props: CardProps) => {
  const { align, children, testId, width, ...other } = props;

  const theme = React.useContext(ThemeContext);

  const widthString = width
    ? typeof width === 'number'
      ? `${width}px`
      : width
    : 'auto';

  return (
    <StyledCard
      {...other}
      align={align ? align : CardAlignment.left}
      data-testid={testId}
      width={widthString}
      theme={theme}
    >
      {children}
    </StyledCard>
  );
};
