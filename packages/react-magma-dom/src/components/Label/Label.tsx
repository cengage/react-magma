import * as React from 'react';
// const styled = require('styled-components').default;
import styled from '../../theme/styled-components';

export interface LabelProps {
  children: React.ReactChild | React.ReactChild[];
  htmlFor?: string;
  style?: React.CSSProperties;
}

const StyledLabel = styled.label`
  display: inline-block;
  font-weight: bold;
  margin-bottom: 5px;
  max-width: 100%;
`;

function renderLabel(props) {
  const { children, htmlFor, style } = props;

  return (
    <StyledLabel style={style} htmlFor={htmlFor}>
      {children}
    </StyledLabel>
  );
}

export const Label: React.FunctionComponent<LabelProps> = (props: LabelProps) =>
  renderLabel(props);
