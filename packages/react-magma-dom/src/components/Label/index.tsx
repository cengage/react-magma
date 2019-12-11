import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { InputSize } from '../Input';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  inverse?: boolean;
  size?: InputSize;
  theme?: any;
  testId?: string;
}

const StyledLabel = styled.label<LabelProps>`
  color: ${props =>
    props.inverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral01};
  display: inline-block;
  font-size: ${props => (props.size === InputSize.large ? '16px' : '13px')};
  font-weight: 600;
  margin-bottom: 5px;
  max-width: 100%;
  text-align: left;
`;

export const Label: React.FunctionComponent<LabelProps> = (
  props: LabelProps
) => {
  const { children, inverse, size, testId, ...other } = props;
  const theme = React.useContext(ThemeContext);

  return (
    <StyledLabel
      {...other}
      data-testid={testId}
      inverse={inverse}
      size={size ? size : InputSize.medium}
      theme={theme}
    >
      {children}
    </StyledLabel>
  );
};
