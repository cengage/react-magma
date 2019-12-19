import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { BreadCrumbContext } from './';

import { HyperLink } from '../HyperLink';
import { AngleRightIcon } from '../Icon/types/AngleRightIcon';

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLElement> {
  ref?: any;
  testId?: string;
  to?: string;
}

const StyledItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledSpan = styled.span<{ inverse?: boolean }>`
  color: ${props =>
    props.inverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral03};

  svg {
    margin: 0 10px;
  }
`;

export const BreadcrumbItem: React.FunctionComponent<BreadcrumbItemProps> = (
  props: BreadcrumbItemProps
) => {
  const { children, ref, to, testId } = props;
  const theme = React.useContext(ThemeContext);
  const { inverse } = React.useContext(BreadCrumbContext);

  return (
    <StyledItem data-testid={testId} ref={ref}>
      {to ? (
        <>
          <HyperLink to={to} inverse={inverse}>
            {children}
          </HyperLink>
          <StyledSpan inverse={inverse} theme={theme}>
            <AngleRightIcon size={10} />
          </StyledSpan>
        </>
      ) : (
        <StyledSpan aria-current="page" inverse={inverse} theme={theme}>
          {children}
        </StyledSpan>
      )}
    </StyledItem>
  );
};
