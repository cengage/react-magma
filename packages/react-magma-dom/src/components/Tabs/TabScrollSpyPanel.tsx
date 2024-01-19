import React from 'react';
import styled from '@emotion/styled';

interface TabScrollSpyPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  /*
   * For use with icon tabs.
   */
  icon?: any;
  /*
   * Label for each nav item, appears chronologically.
   */
  tabLabel?: string;
}

const StyledTabScrollSpyPanel = styled.section``;

export const TabScrollSpyPanel = React.forwardRef<
  HTMLDivElement,
  TabScrollSpyPanelProps
>(props => {
  const {
    children,
    tabLabel,
    // icon,
    // disabled
  } = props;

  return (
    <StyledTabScrollSpyPanel
      id={tabLabel}
      data-nav-title={tabLabel}
      data-scrollspy
    >
      {children}
    </StyledTabScrollSpyPanel>
  );
});
