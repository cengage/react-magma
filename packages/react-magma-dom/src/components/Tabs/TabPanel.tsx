import React from 'react';
import { useTabsContext } from './TabsContainer';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';

const StyledTabPanel = styled.div<{ isInverse?: boolean }>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.foundation02
      : props.theme.colors.neutral08};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral01};
  flex: 1;
  padding: 20px;
`;

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  isInverse: boolean;
  testId?: string;
}

export const TabPanel: React.FunctionComponent<
  TabPanelProps
> = React.forwardRef((props, ref: React.Ref<any>) => {
  const { index, testId, children, ...other } = props;

  const theme = React.useContext(ThemeContext);

  const { activeTabIndex, isInverseContainer } = useTabsContext();
  const activeTab = activeTabIndex === index;

  const isInverse =
    typeof props.isInverse !== 'undefined'
      ? Boolean(props.isInverse)
      : isInverseContainer;

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
});
