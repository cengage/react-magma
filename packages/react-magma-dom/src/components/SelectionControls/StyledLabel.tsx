import * as React from 'react';

import styled from '@emotion/styled';

import { ThemeContext } from '../../theme/ThemeContext';

export interface StyledLabelProps {
  as?: 'div' | 'label';
  children?: any;
  htmlFor?: string;
  isInverse?: boolean;
  style?: React.CSSProperties;
  textColor?: string;
}

const StyledLabelComponent = styled.label<StyledLabelProps>`
  align-items: flex-start;
  color: ${props =>
    props.textColor
      ? props.textColor
      : props.isInverse
        ? props.theme.colors.neutral0
        : props.theme.colors.neutral700};
  display: flex;
  font-size: ${props => props.theme.typeScale.size03.fontSize};
  font-family: ${props => props.theme.bodyFont};
  line-height: ${props => props.theme.typeScale.size03.lineHeight};
  margin: 0;
  padding: ${props => props.theme.spaceScale.spacing03} 0;
`;

const StyledLabelDivComponent = StyledLabelComponent.withComponent('div');

export const StyledLabel: React.FunctionComponent<StyledLabelProps> = ({
  as = 'label',
  children,
  htmlFor,
  isInverse,
  style,
  textColor,
}: StyledLabelProps) => (
  <ThemeContext.Consumer>
    {theme => {
      const Component =
        as === 'div' ? StyledLabelDivComponent : StyledLabelComponent;

      return (
        <Component
          htmlFor={as === 'label' ? htmlFor : undefined}
          isInverse={isInverse}
          style={style}
          textColor={textColor}
          theme={theme}
        >
          {children}
        </Component>
      );
    }}
  </ThemeContext.Consumer>
);
