import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { stringIncludesUnit } from '../../utils';
import { ThemeInterface } from '../../theme/magma';
import styled from '@emotion/styled';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The color of the spinner border
   * @default theme.colors.primary (#3942B0)
   */
  color?: string;
  isInverse?: boolean;
  /**
   * The height and width of the spinner.  Can be a string or number; if number is provided, the size is in px.
   * @default 16
   */
  size?: string | number;
  /**
   * @internal
   */
  theme?: ThemeInterface;
  /**
   * @internal
   */
  testId?: string;
}

const StyledSpinner = styled.span<SpinnerProps>`
  animation: spinner-border 0.75s linear infinite;
  border: 2px solid ${props => props.color};
  border-right-color: transparent;
  border-radius: 50%;
  display: inline-block;
  height: ${props => props.size};
  width: ${props => props.size};

  @keyframes spinner-border {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (props, ref) => {
    const { 'aria-label': ariaLabel, color, size, testId, ...other } = props;

    const theme = React.useContext(ThemeContext);
    const i18n = React.useContext(I18nContext);

    const sizeString = size
      ? typeof size === 'number' ||
        (typeof size === 'string' && !stringIncludesUnit(size))
        ? `${size}px`
        : size
      : theme.spaceScale.spacing05;

    return (
      <StyledSpinner
        {...other}
        aria-label={ariaLabel ? ariaLabel : i18n.spinner.ariaLabel}
        color={
          color
            ? color
            : props.isInverse
            ? theme.colors.tertiary
            : theme.colors.primary
        }
        data-testid={testId}
        ref={ref}
        role="img"
        size={sizeString}
      />
    );
  }
);
