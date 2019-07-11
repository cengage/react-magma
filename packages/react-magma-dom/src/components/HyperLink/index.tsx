/** @jsx jsx */
import * as React from 'react';
import { ButtonStyles } from '../Button';
import { jsx } from '@emotion/core';
import { Omit } from '../utils';
import { ThemeContext } from '../../theme/ThemeContext';
import { buttonStyles } from '../StyledButton';
import { buildPropsWithDefaultButtonStyles } from '../StyledButton/styles';

interface anchorAttributesRemoveColor
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {}

interface anchorAttributesRemoveType
  extends Omit<anchorAttributesRemoveColor, 'type'> {}

export interface HyperLinkProps
  extends ButtonStyles,
    anchorAttributesRemoveType {
  children: string | React.ReactNode | ((props: object) => React.ReactNode);
  styledAs?: 'Button';
  testId?: string;
  to: string;
}

export const HyperLink: React.FunctionComponent<
  HyperLinkProps
> = React.forwardRef((props: HyperLinkProps, ref: any) => {
  const composedProps = buildPropsWithDefaultButtonStyles(props);
  const { children, to, testId, styledAs, ...other } = props;

  return (
    <ThemeContext.Consumer>
      {theme => {
        const composedStyle =
          styledAs === 'Button'
            ? buttonStyles({ ...composedProps, theme })
            : null;

        if (typeof children === 'function') {
          return children({ to, style: composedStyle });
        } else {
          return (
            <a {...other} href={to} css={composedStyle}>
              {children}
            </a>
          );
        }
      }}
    </ThemeContext.Consumer>
  );
});
