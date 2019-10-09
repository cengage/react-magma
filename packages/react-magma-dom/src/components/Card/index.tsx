import * as React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { renderCardHeading, CardHeadingProps } from './CardHeading';
import { renderCardBody } from './CardBody';

export interface CardProps extends React.LabelHTMLAttributes<HTMLDivElement> {
  align?: CardAlignment;
  background?: boolean;
  calloutType?: CardCalloutType;
  hasDropShadow?: boolean;
  inverse?: boolean;
  width?: string;
}

export enum CardAlignment {
  center = 'center',
  left = 'left',
  right = 'right'
}

export enum CardCalloutType {
  danger = 'danger',
  primary = 'primary',
  success = 'success',
  warning = 'warning'
}

export function buildCalloutBackground(props) {
  switch (props.calloutType) {
    case 'danger':
      return props.theme.colors.danger;
    case 'success':
      return props.theme.colors.success01;
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
    props.inverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral02};
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

function renderCard(props) {
  const {
    align,
    background,
    children,
    calloutType,
    hasDropShadow,
    inverse,
    testId,
    width,
    ...other
  } = props;

  return (
    <ThemeContext.Consumer>
      {theme => (
        <StyledCard
          {...other}
          align={align ? align : CardAlignment.left}
          background={background}
          data-testid={testId}
          calloutType={calloutType}
          hasDropShadow={hasDropShadow}
          inverse={inverse}
          width={width ? width : 'auto'}
          theme={theme}
        >
          {children}
        </StyledCard>
      )}
    </ThemeContext.Consumer>
  );
}

export const Card: React.FunctionComponent<CardProps> = (props: CardProps) =>
  renderCard(props);

export const CardBody: React.FunctionComponent<CardProps> = (
  props: CardProps
) => renderCardBody(props);

export const CardHeading: React.FunctionComponent<CardHeadingProps> = (
  props: CardProps
) => renderCardHeading(props);
