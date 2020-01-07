import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  isInverse?: boolean;
  minWidthToShow?: number;
  testId?: string;
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

export interface BreadCrumbContextInterface {
  isInverse?: boolean;
}

export const BreadCrumbContext = React.createContext<
  BreadCrumbContextInterface
>({
  isInverse: false
});

export const Breadcrumb: React.FunctionComponent<
  BreadcrumbProps
> = React.forwardRef(
  (
    {
      'aria-label': ariaLabel,
      children,
      isInverse,
      minWidthToShow,
      testId,
      ...other
    }: BreadcrumbProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);

    return (
      <BreadCrumbContext.Provider value={{ isInverse }}>
        <StyledNav
          {...other}
          aria-label={ariaLabel ? ariaLabel : 'Breadcrumb'}
          breakpoint={minWidthToShow ? `${minWidthToShow}px` : '0'}
          data-testid={testId}
        >
          <StyledList isInverse={isInverse} ref={ref} theme={theme}>
            {children}
          </StyledList>
        </StyledNav>
      </BreadCrumbContext.Provider>
    );
  }
);
