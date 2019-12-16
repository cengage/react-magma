import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLOListElement> {
  ariaLabel?: string;
  inverse?: boolean;
  minWidthToShow?: number;
}

const StyledNav = styled.nav<{ breakpoint?: string }>`
  display: none;

  @media (min-width: ${props => props.breakpoint}) {
    display: block;
  }
`;

const StyledList = styled.ol<BreadcrumbProps>`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Breadcrumb: React.FunctionComponent<
  BreadcrumbProps
> = React.forwardRef(
  (
    { ariaLabel, children, inverse, minWidthToShow }: BreadcrumbProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);

    return (
      <StyledNav
        aria-label={ariaLabel ? ariaLabel : 'Breadcrumb'}
        breakpoint={minWidthToShow ? `${minWidthToShow}px` : '0'}
      >
        <StyledList inverse={inverse} ref={ref} theme={theme}>
          {children}
        </StyledList>
      </StyledNav>
    );
  }
);
