import React from 'react';
import { TabsContainerContext } from './TabsContainer';
import styled from '@emotion/styled';

const StyledTabPanel = styled.div<{
  isInverse?: boolean;
}>`
  background: ${props =>
    props.isInverse
      ? 'var(--colors-foundation02)'
      : 'var(--colors-neutral08)'};
  color: ${props =>
    props.isInverse
      ? 'var(--colors-neutral08)'
      : 'var(--colors-neutral)'};
  flex: 1;
  height: 100%;
  padding: 20px;
`;

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @internal
   */
  index?: number;
  isInverse?: boolean;
  testId?: string;
}

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  (props, ref) => {
    const { index, isInverse, testId, children, ...other } = props;

    const { activeTabIndex } = React.useContext(TabsContainerContext);
    const activeTab = activeTabIndex === index;

    return activeTab ? (
      <StyledTabPanel
        ref={ref}
        data-testid={testId}
        isInverse={isInverse}
        {...other}
      >
        {children}
      </StyledTabPanel>
    ) : null;
  }
);
