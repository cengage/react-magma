import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  inverse?: boolean;
  theme?: any;
  testId?: string;
}

const StyledLabel = styled.label<LabelProps>`
  color: ${props =>
    props.inverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral02};
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
  max-width: 100%;
`;

function renderLabel(props) {
  const { children, inverse, testId, ...other } = props;

  return (
    <ThemeContext.Consumer>
      {theme => (
        <StyledLabel
          {...other}
          data-testid={testId}
          inverse={inverse}
          theme={theme}
        >
          {children}
        </StyledLabel>
      )}
    </ThemeContext.Consumer>
  );
}

export const Label: React.FunctionComponent<LabelProps> = (props: LabelProps) =>
  renderLabel(props);
