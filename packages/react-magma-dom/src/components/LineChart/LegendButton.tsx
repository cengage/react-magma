import * as React from 'react';
import styled from '@emotion/styled';

export interface DataTableProps {
  children?: any;
  color?: string;
}

const StyledButton = styled.button`
  align-items: center;
  background: none;
  border: 0;
  box-shadow: 0 0 0;
  display: inline-flex;
  margin-right: 24px;
  padding: 0;
`;

const ColorSwatch = styled.span`
  border-radius: 4px;
  display: inline-block;
  height: 28px;
  margin-right: 8px;
  width: 28px;
  background: ${props => props.color};
`;

export const LegendButton = props => {
  const { children, color, dataIndex, onClick } = props;

  function handleClick() {
    onClick(dataIndex);
  }

  return (
    <StyledButton onClick={handleClick}>
      <ColorSwatch color={color} />
      {children}
    </StyledButton>
  );
};
