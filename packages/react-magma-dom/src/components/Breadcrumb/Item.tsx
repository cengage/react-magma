import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { BreadCrumbContext } from '.';

import { HyperLink } from '../HyperLink';
import { AngleRightIcon } from 'react-magma-icons';

export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  ref?: any;
  testId?: string;
  to?: string;
}

const StyledItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledSpan = styled.span<{ isInverse?: boolean }>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral03};

  svg {
    margin: 0 10px;
  }
`;

export const BreadcrumbItem: React.FunctionComponent<BreadcrumbItemProps> = (
  props: BreadcrumbItemProps
) => {
  const { children, ref, to, testId, ...other } = props;
  const theme = React.useContext(ThemeContext);
  const { isInverse } = React.useContext(BreadCrumbContext);

  return (
    <StyledItem {...other} data-testid={testId} ref={ref}>
      {to ? (
        <>
          <HyperLink to={to} isInverse={isInverse}>
            {children}
          </HyperLink>
          <StyledSpan isInverse={isInverse} theme={theme}>
            <AngleRightIcon size={10} />
          </StyledSpan>
        </>
      ) : (
        <StyledSpan aria-current="page" isInverse={isInverse} theme={theme}>
          {children}
        </StyledSpan>
      )}
    </StyledItem>
  );
};
