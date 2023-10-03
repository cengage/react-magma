import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface StyledLabelProps {
  children?: any;
  htmlFor: string;
  isInverse?: boolean;
  style?: React.CSSProperties;
}

const StyledLabelComponent = styled.label<StyledLabelProps>`
  align-items: flex-start;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  display: flex;
  font-size: ${props => props.theme.typeScale.size03.fontSize};
  font-family: ${props => props.theme.bodyFont};
  line-height: ${props => props.theme.typeScale.size03.lineHeight};
  margin: 0;
  padding: ${props => props.theme.spaceScale.spacing03} 0;
`;

export const StyledLabel: React.FunctionComponent<StyledLabelProps> = ({
  children,
  htmlFor,
  isInverse,
  style,
}: StyledLabelProps) => (
  <ThemeContext.Consumer>
    {theme => (
      <StyledLabelComponent
        htmlFor={htmlFor}
        isInverse={isInverse}
        style={style}
        theme={theme}
      >
        {children}
      </StyledLabelComponent>
    )}
  </ThemeContext.Consumer>
);
