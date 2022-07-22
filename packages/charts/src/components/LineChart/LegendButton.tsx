import * as React from 'react';
import { ThemeContext, Checkbox } from 'react-magma-dom';

export interface DataTableProps {
  name?: string;
  color?: string;
}

export const LegendButton = React.forwardRef<HTMLButtonElement, any>(
  (props, ref) => {
    const {
      children,
      color,
      dataIndex,
      isHidden,
      onClick,
      name,
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
      <div
        style={{ display: 'inline-flex' }}
        onMouseEnter={handleOnMouseEnterOrFocus}
        onMouseLeave={resetLineFocus}
      >
        <Checkbox
          checked={!isHidden}
          color={color}
          containerStyle={{
            alignItems: 'center',
            border: '0',
            boxShadow: '0 0 0',
            color: theme.colors.neutral,
            display: 'inline-flex',
            margin: '0 36px 20px 0',
            padding: '0',
          }}
          inputStyle={{
            border: color ? `none` : `2px solid ${theme.colors.neutral800}`,
            borderRadius: '4px',
          }}
          labelText={name}
          onBlur={resetLineFocus}
          onClick={handleClick}
          onFocus={handleOnMouseEnterOrFocus}
          ref={ref}
          theme={theme}
          {...other}
        />
      </div>
    );
  }
);
