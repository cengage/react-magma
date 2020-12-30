import React from 'react';
import { TabsContainerContext } from './TabsContainer';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';
import { ThemeInterface } from '../../theme/magma';

const StyledTabPanel = styled.div<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.foundation02
      : props.theme.colors.neutral08};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral};
  flex: 1;
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

    const theme = React.useContext(ThemeContext);

    const { activeTabIndex } = React.useContext(TabsContainerContext);
    const activeTab = activeTabIndex === index;

    return activeTab ? (
      <StyledTabPanel
        ref={ref}
        data-testid={testId}
        isInverse={isInverse}
        theme={theme}
        {...other}
      >
        {children}
      </StyledTabPanel>
    ) : null;
  }
);
