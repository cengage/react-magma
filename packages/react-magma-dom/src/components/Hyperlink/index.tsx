/** @jsx jsx */
import * as React from 'react';
import { ButtonStyles } from '../Button';
import { css, jsx, ClassNames } from '@emotion/core';
import { omit, Omit } from '../../utils';
import { ThemeContext } from '../../theme/ThemeContext';
import { buttonStyles } from '../StyledButton';
import { buildPropsWithDefaultButtonStyles } from '../StyledButton/styles';

interface anchorAttributesRemoveColor
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {}

interface anchorAttributesRemoveType
  extends Omit<anchorAttributesRemoveColor, 'type'> {}

export interface HyperlinkProps
  extends ButtonStyles,
    anchorAttributesRemoveType {
  children: string | React.ReactNode | ((props: object) => React.ReactNode);
  styledAs?: 'Button' | 'Link';
  testId?: string;
  to: string;
  positionLeft?: number;
  positionTop?: number;
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

export const Hyperlink: React.FunctionComponent<HyperlinkProps> = React.forwardRef(
  (props: HyperlinkProps, ref: any) => {
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
            const stylesClass = composedCss(composedStyle);
            return children({ to, stylesClass });
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
