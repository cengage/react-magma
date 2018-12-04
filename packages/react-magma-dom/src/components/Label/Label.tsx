import * as React from 'react';
const styled = require('styled-components').default;

export interface LabelProps {
  children: React.ReactChild | React.ReactChild[];
  htmlFor?: string;
}

const StyledLabel = styled.label`
  display: inline-block;
  font-weight: bold;
  margin-bottom: 5px;
  max-width: 100%;
`;

function renderLabel(props) {
  const { children, htmlFor } = props;

  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
}

export const Label: React.FunctionComponent<LabelProps> = (
  props: LabelProps
): JSX.Element => renderLabel(props);

export default Label;
