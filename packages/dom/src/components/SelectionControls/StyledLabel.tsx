import * as React from 'react';
import styled from '@emotion/styled';

export interface StyledLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isInverse?: boolean;
}

const StyledLabelComponent = styled.label<StyledLabelProps>`
  align-items: flex-start;
  color: ${props =>
    props.isInverse ? 'var(--colors-neutral08)' : 'inherit'};
  display: flex;
  font-size: var(--typeScale-size03-fontSize);
  line-height: var(--typeScale-size03-lineHeight);
  margin: 0;
  padding: var(--spaceScale-spacing03) 0;
`;

export const StyledLabel: React.FunctionComponent<StyledLabelProps> = ({
  children,
  htmlFor,
  isInverse,
  style,
}: StyledLabelProps) => (
  <StyledLabelComponent
    htmlFor={htmlFor}
    isInverse={isInverse}
    style={style}
  >
    {children}
  </StyledLabelComponent>
);
