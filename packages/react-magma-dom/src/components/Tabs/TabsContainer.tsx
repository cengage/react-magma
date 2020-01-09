import React from 'react';
import styled from '@emotion/styled';

const StyledTabsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

interface ITabsContainer {
  testId?: string;
}

export type State = {
  activeTabIndex?: number;
  numberOfTabs?: number;
};

interface Action {
  type: string;
  payload: {
    activeTabIndex?: number;
    numberOfTabs?: number;
  };
}

// export const darkTheme = (tabsTheme: any) => {
//   return {
//     bgColor: tabsTheme.colors.neutral01,
//     color: tabsTheme.colors.neutral08,
//     opacity: '70%',
//     hoverOpacity: '100%',
//     activeColor: tabsTheme.colors.neutral08,
//     hoverColor: tabsTheme.colors.neutral08,
//     colorBorder: tabsTheme.colors.pop02,
//     bgHoverColor: tabsTheme.colors.shade02,
//     font: tabsTheme.bodyFont,
//     boxShadow: '0px 5px 13px 1px rgba(0,0,0,0.10)',
//     border: 'none',
//     colorOfArrows: tabsTheme.colors.neutral08,
//     focusColor: tabsTheme.colors.focus
//   };
// };

// export const lightTheme = (tabsTheme: any) => {
//   return {
//     bgColor: tabsTheme.colors.neutral08,
//     color: tabsTheme.colors.neutral01,
//     opacity: '70%',
//     hoverOpacity: '70%',
//     hoverColor: tabsTheme.colors.neutral01,
//     activeColor: tabsTheme.colors.primary,
//     colorBorder: tabsTheme.colors.primary,
//     bgHoverColor: tabsTheme.colors.shade01,
//     font: tabsTheme.bodyFont,
//     boxShadow: 'none',
//     border: `1px solid ${tabsTheme.colors.neutral06}`,
//     colorOfArrows: tabsTheme.colors.neutral02,
//     focusColor: tabsTheme.colors.focus
//   };
// };

// export const blueTheme = (tabsTheme: any) => {
//   return {
//     bgColor: tabsTheme.colors.foundation02,
//     color: tabsTheme.colors.neutral08,
//     opacity: '70%',
//     hoverOpacity: '100%',
//     activeColor: tabsTheme.colors.neutral08,
//     hoverColor: tabsTheme.colors.neutral08,
//     colorBorder: tabsTheme.colors.pop02,
//     bgHoverColor: 'rgba(0,0,0,0.25)',
//     font: tabsTheme.bodyFont,
//     boxShadow: '0px 5px 13px 1px rgba(0,0,0,0.10)',
//     border: 'none',
//     colorOfArrows: tabsTheme.colors.neutral08,
//     focusColor: tabsTheme.colors.focus
//   };
// };

export const TabsContext = React.createContext({} as {
  state: State;
  dispatch: React.Dispatch<Action>;
});

const initialState = {
  activeTabIndex: 0,
  numberOfTabs: 0
};

function tabReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_ACTIVE_TAB_INDEX':
      return {
        ...state,
        activeTabIndex: action.payload.activeTabIndex
      };
    case 'SET_NUMBER_OF_TABS':
      return {
        ...state,
        numberOfTabs: action.payload.numberOfTabs
      };
    default:
      return initialState;
  }
}

export const TabsContainer: React.FunctionComponent<
  ITabsContainer
> = React.forwardRef((props, ref: React.Ref<any>) => {
  const { children, testId } = props;

  const [stateWithoutMemo, dispatch] = React.useReducer(
    tabReducer,
    initialState
  );

  const state = React.useMemo(() => {
    return stateWithoutMemo;
  }, [stateWithoutMemo]);

  return (
    <TabsContext.Provider value={{ state, dispatch }}>
      <StyledTabsContainer ref={ref} data-testid={testId}>
        {children}
      </StyledTabsContainer>
    </TabsContext.Provider>
  );
});

TabsContainer.displayName = 'TabsContainer';

export const useTabsContext = () => React.useContext(TabsContext);
