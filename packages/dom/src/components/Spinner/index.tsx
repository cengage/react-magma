import * as React from 'react';
import styled from '@emotion/styled';
import { I18nContext } from '../../i18n';
import { stringIncludesUnit } from '../../utils';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The color of the spinner border
   * @default "#006298"
   */
  color?: string;
  /**
   * The height and width of the spinner.  Can be a string or number; if number is provided, the size is in px.
   * @default 16
   */
  size?: string | number;
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

    const i18n = React.useContext(I18nContext);

    const sizeString = size
      ? typeof size === 'number' ||
        (typeof size === 'string' && !stringIncludesUnit(size))
        ? `${size}px`
        : size
      : 'var(--spaceScale-spacing05)';

    return (
      <StyledSpinner
        {...other}
        aria-label={ariaLabel ? ariaLabel : i18n.spinner.ariaLabel}
        color={color ? color : 'var(--colors-primary)'}
        data-testid={testId}
        ref={ref}
        role="img"
        size={sizeString}
      />
    );
  }
);
