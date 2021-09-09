import * as React from 'react';
import { ThemeContext, styled } from 'react-magma-dom';

export interface DataTableProps {
  children?: any;
  color?: string;
}

const StyledButton = styled.button`
  align-items: center;
  background: none;
  border: 0;
  box-shadow: 0 0 0;
  color: ${props => props.theme.colors.neutral};
  cursor: pointer;
  display: inline-flex;
  margin: 0 36px 20px 0;
  padding: 0;
`;

const ColorSwatch = styled.span`
  border: ${props =>
    props.color ? `none` : `2px solid ${props.theme.colors.neutral02}`};
  border-radius: 4px;
  display: inline-block;
  height: 20px;
  margin-right: 10px;
  width: 20px;
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

    const theme = React.useContext(ThemeContext);

    return (
      <StyledButton
        onBlur={resetLineFocus}
        onClick={handleClick}
        onFocus={handleOnMouseEnterOrFocus}
        onMouseEnter={handleOnMouseEnterOrFocus}
        onMouseLeave={resetLineFocus}
        ref={ref}
        theme={theme}
        {...other}
      >
        <ColorSwatch color={!isHidden ? color : null} theme={theme} />
        {children}
      </StyledButton>
    );
  }
);
