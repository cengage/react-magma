import React from 'react';
import { TabsContainerContext } from './TabsContainer';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';
import { ThemeInterface } from '../../theme/magma';

const StyledTabPanel = styled('div')<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  background: none;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  font-family: ${props => props.theme.bodyFont};
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
  /**
   * @internal
   */
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
