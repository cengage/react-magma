import React from 'react';
import { useTabsContext } from './TabsContainer';
import styled from '@emotion/styled';

const StyledTabPanel = styled.div`
  flex: 1;
  padding: 20px;
`;

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  testId?: string;
}

export const TabPanel: React.FunctionComponent<
  TabPanelProps
> = React.forwardRef((props, ref: React.Ref<any>) => {
  const { index, testId, children, ...other } = props;

  const { activeTabIndex } = useTabsContext();
  const activeTab = activeTabIndex === index;

  return activeTab ? (
    <StyledTabPanel ref={ref} data-testid={testId} {...other}>
      {children}
    </StyledTabPanel>
  ) : null;
});
