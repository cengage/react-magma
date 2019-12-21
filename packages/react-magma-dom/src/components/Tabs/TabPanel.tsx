import React from 'react';
import { useTabsContext } from './TabsContainer';
import { StyledTabPanel } from './StylesTabPanel';

export interface ITabPanelProps {
  activeIndex?: number;
  index: number;
  testId?: string;
}

export const TabPanel: React.FunctionComponent<
  ITabPanelProps
> = React.forwardRef((props, ref: React.Ref<any>) => {
  const { activeIndex, index, testId, children } = props;

  const {
    state: { activeTabIndex }
  } = useTabsContext();
  const activeTab = activeIndex === index;

  if (!activeIndex && activeTabIndex >= 0)
    return activeTabIndex === index ? (
      <StyledTabPanel ref={ref} data-testid={testId}>
        {children}
      </StyledTabPanel>
    ) : null;

  return activeTab ? (
    <StyledTabPanel ref={ref} data-testid={testId}>
      {children}
    </StyledTabPanel>
  ) : null;
});

TabPanel.displayName = 'TabPanel';
