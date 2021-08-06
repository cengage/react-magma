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
  cursor: pointer;
  display: inline-flex;
  margin-right: 24px;
  padding: 0;
`;

const ColorSwatch = styled.span`
  border: ${props => (props.color ? 'none' : '3px solid black')};
  border-radius: 4px;
  display: inline-block;
  height: 28px;
  margin-right: 8px;
  width: 28px;
  background: ${props => props.color};
`;

export const LegendButton = React.forwardRef<HTMLButtonElement, any>(
  (props, ref) => {
    const {
      children,
      color,
      dataIndex,
      isHidden,
      onClick,
      focusCurrentLine,
      resetLineFocus,
      ...other
    } = props;

    function handleClick() {
      onClick && typeof onClick === 'function' && onClick(dataIndex);

      if (!isHidden) {
        resetLineFocus &&
          typeof resetLineFocus === 'function' &&
          resetLineFocus();
      }
    }

    function handleOnMouseEnterOrFocus() {
      if (!isHidden) {
        focusCurrentLine &&
          typeof focusCurrentLine === 'function' &&
          focusCurrentLine(dataIndex);
      }
    }

    return (
      <StyledButton
        onBlur={resetLineFocus}
        onClick={handleClick}
        onFocus={handleOnMouseEnterOrFocus}
        onMouseEnter={handleOnMouseEnterOrFocus}
        onMouseLeave={resetLineFocus}
        ref={ref}
        {...other}
      >
        <ColorSwatch color={!isHidden ? color : null} />
        {children}
      </StyledButton>
    );
  }
);
