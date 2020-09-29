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
    props.isInverse ? props.theme.colors.neutral08 : 'inherit'};
  display: flex;
  line-height: 24px;
  margin: 0;
  padding: 10px 0;
`;

export const StyledLabel: React.FunctionComponent<StyledLabelProps> = ({
  children,
  htmlFor,
  isInverse,
  style
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
