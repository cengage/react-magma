import React from 'react';
import styled from '@emotion/styled';

import { toCamelCase } from '../../utils';
import { AppleIcon } from 'react-magma-icons';

export interface TabScrollSpyPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  /*
   * For use with icon tabs.
   */
  icon?: React.ReactElement<any> | React.ReactElement<any>[];

  /*
   * Label for each nav item, appears chronologically.
   */
  tabLabel?: string;
}

interface TabScrollSpyPanelContextInterface {
  disabled?: boolean;
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
}

export const TabScrollSpyPanelContext =
  React.createContext<TabScrollSpyPanelContextInterface>({});

const StyledTabScrollSpyPanel = styled.section<{
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
}>``;

export const TabScrollSpyPanel = React.forwardRef<
  HTMLDivElement,
  TabScrollSpyPanelProps
>((props, ref) => {
  const { children, tabLabel, disabled } = props;

  const tabLabelCamelCase = toCamelCase(tabLabel);

  return (
    <TabScrollSpyPanelContext.Provider
      value={{ icon: props.icon || <AppleIcon />, disabled }}
    >
      <StyledTabScrollSpyPanel
        id={tabLabelCamelCase}
        data-disabled={disabled}
        data-nav-title={tabLabel}
        data-scrollspy
        ref={ref}
      >
        {children}
      </StyledTabScrollSpyPanel>
    </TabScrollSpyPanelContext.Provider>
  );
});
