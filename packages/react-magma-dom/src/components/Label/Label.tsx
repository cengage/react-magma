import * as React from 'react';
import { styled } from '../../theme/styled-components';
import { magma } from '../../theme/magma';

export interface LabelProps {
  children: React.ReactChild | React.ReactChild[];
  htmlFor?: string;
  inverse?: boolean;
  style?: React.CSSProperties;
}

const StyledLabel = styled<LabelProps, 'label'>('label')`
  color: ${props =>
    props.inverse ? magma.colors.neutral08 : magma.colors.neutral02};
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
  max-width: 100%;
`;

function renderLabel(props) {
  const { children, htmlFor, inverse, style } = props;

  return (
    <StyledLabel style={style} htmlFor={htmlFor} inverse={inverse}>
      {children}
    </StyledLabel>
  );
}

export const Label: React.FunctionComponent<LabelProps> = (props: LabelProps) =>
  renderLabel(props);
