import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { BreadcrumbItemProps, renderBreadcrumbItem } from './Item';

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLOListElement> {
  inverse?: boolean;
}

const StyledBreadcrumb = styled.ol<BreadcrumbProps>`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Breadcrumb: React.FunctionComponent<
  BreadcrumbProps
> = React.forwardRef(({ children, inverse }: BreadcrumbProps, ref: any) => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <StyledBreadcrumb inverse={inverse} ref={ref} theme={theme}>
          {children}
        </StyledBreadcrumb>
      )}
    </ThemeContext.Consumer>
  );
});

export const BreadcrumbItem: React.FunctionComponent<BreadcrumbItemProps> = (
  props: BreadcrumbItemProps
) => renderBreadcrumbItem(props);
