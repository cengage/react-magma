/** @jsx jsx */
import * as React from 'react';
import { ButtonStyles } from '../Button';
import { css, jsx, ClassNames } from '@emotion/core';
import { omit, Omit } from '../../utils';
import { ThemeContext } from '../../theme/ThemeContext';
import { buttonStyles } from '../StyledButton';
import { buildPropsWithDefaultButtonStyles } from '../StyledButton/styles';

export interface HyperlinkProps
  extends ButtonStyles,
    Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      'color' | 'type' | 'href'
    > {
  children: string | React.ReactNode | ((props: object) => React.ReactNode);
  styledAs?: 'Button' | 'Link';
  testId?: string;
  to: string;
}

const linkStyles = props => css`
  color: ${props.isInverse
    ? props.theme.colors.neutral08
    : props.theme.colors.primary};
  text-decoration: underline;

  &:not([disabled]) {
    &:hover,
    &:focus {
      color: ${props.isInverse
        ? props.theme.colors.neutral07
        : props.theme.colors.foundation02};
    }

    &:focus {
      outline: 2px dotted
        ${props.isInverse ? props.theme.focusInverse : props.theme.colors.focus};
      outline-offset: 3px;
    }
  }
`;

export const Hyperlink = React.forwardRef<HTMLAnchorElement, HyperlinkProps>(
  (props, ref) => {
    const composedProps = buildPropsWithDefaultButtonStyles(props);
    const { children, to, styledAs, isInverse, testId, ...rest } = props;

    const other = omit(['textTransform', 'positionTop', 'positionLeft'], rest);
    const theme = React.useContext(ThemeContext);

    const composedStyle =
      styledAs === 'Button'
        ? buttonStyles({ ...composedProps, theme })
        : linkStyles({ ...props, theme });

    if (typeof children === 'function') {
      return (
        <ClassNames>
          {({ css: composedCss }) => {
            const className = composedCss(composedStyle);
            return (children as (props: object) => React.ReactNode)({
              to,
              className,
            });
          }}
        </ClassNames>
      );
    } else {
      return (
        <a
          {...other}
          ref={ref}
          data-testid={testId}
          href={to}
          css={composedStyle}
        >
          {children}
        </a>
      );
    }
  }
);
