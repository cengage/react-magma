/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';

import {
  TabsAriaLabel,
  TabsOrientationVertical,
  TabsOrientationHorizontal,
  TabsBorderPositionVertical,
  TabsBorderPositionHorizontal
} from './Tabs';

export const StyledTabs = styled.div<{
  ['aria-label']: TabsAriaLabel;
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
}>(
  {
    textTransform: 'uppercase',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    position: 'relative',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  ({ orientation }) =>
    orientation === 'vertical'
      ? {
          flexBasis: '100%'
        }
      : {
          flexBasis: '100%',
          flexDirection: 'row'
        }
);

export const StyledTabsChild = styled.div<{
  isActive: boolean;
  length: number;
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
  theme: any;
}>(
  ({ length }) => ({
    display: 'flex',
    flexGrow: 0,
    flexBasis: `${100 / length}%`,
    textAlign: 'center',
    listStyle: 'none',
    alignSelf: 'center',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'inherit',
    tabIndex: 1
  }),
  ({ orientation, theme, length }): any =>
    orientation === 'vertical'
      ? {
          display: 'flex',
          justifyContent: 'center',
          flexBasis: `${100 / length}%`,
          height: 'auto',
          zIndex: '0',
          position: 'relative',
          minHeight: '50px',
          color: theme.color,
          maxHeight: '60px',
          width: '100%'
        }
      : {
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
          zIndex: '0',
          flexBasis: `${100 / length}%`,
          width: `${100 / length}%`,
          minWidth: '150px',
          color: theme.color,
          height: '100%'
        }
);

const getTransitionSpeed = (index: number, activeTabIndex: number) => {
  let speed = 0.3;
  let indexDifference = 0;

  index < activeTabIndex
    ? (indexDifference = (activeTabIndex - index) / 2)
    : (indexDifference = (index - activeTabIndex) / 2);

  // 4 = 4 tab components
  // For each step in 4 tab components speed will be increased
  speed -= (indexDifference / 4) * 0.05;

  if (speed < 0.2) {
    return 0.2;
  } else {
    return speed;
  }
};

export const BottomLineStyled = styled.div<{
  length: number;
  previousActiveTab: number;
  activeTabIndex: number;
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
  borderPosition: TabsBorderPositionVertical | TabsBorderPositionHorizontal;
  theme: any;
}>(
  ({ previousActiveTab, activeTabIndex, theme }) => ({
    position: 'absolute',
    border: 'none',
    backgroundColor: theme.colorBorder,
    transition: `${getTransitionSpeed(
      previousActiveTab,
      activeTabIndex
    )}s ease-in-out`,
    zIndex: 0,
    borderRadius: '8px'
  }),
  ({ length, activeTabIndex, orientation }) =>
    orientation === 'vertical'
      ? {
          top: `${(100 / length) * activeTabIndex}%`,
          height: `${100 / length}%`,
          minHeight: `${100 / length}%`,
          width: '3px'
        }
      : {
          left: `${(100 / length) * activeTabIndex}%`,
          height: 3,
          width: `${100 / length}%`,
          minWidth: '85px'
        },
  ({ orientation, borderPosition }) =>
    orientation === 'vertical' && borderPosition === 'left'
      ? {
          left: 0
        }
      : {
          right: 0
        },
  ({ orientation, borderPosition }) =>
    orientation === 'horizontal' && borderPosition === 'top'
      ? {
          top: 0
        }
      : {
          bottom: 0
        }
);

export const StyledTabsWrapper = styled.div<{
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
}>(
  ({ orientation }) =>
    orientation === 'vertical'
      ? {
          overflow: 'hidden'
        }
      : {
          overflowX: 'auto'
        },
  {
    display: 'flex',
    overflowY: 'hidden',
    height: 'auto',
    position: 'relative',
    flexBasis: '100%',
    ['&::-webkit-scrollbar']: {
      width: '0',
      height: '0'
    },
    overflow: '-moz-scrollbars-none'
  }
);

export const StyledButtonNext = styled.div<{
  buttonVisible: boolean;
}>(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    width: '50px',
    height: 'auto'
  },
  ({ buttonVisible }) =>
    buttonVisible
      ? {
          visibility: 'visible'
        }
      : {
          visibility: 'hidden'
        }
);

export const StyledButtonPrev = styled.div<{
  buttonVisible: boolean;
}>(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    width: '50px',
    height: 'auto'
  },
  ({ buttonVisible }) =>
    buttonVisible
      ? {
          visibility: 'visible'
        }
      : {
          visibility: 'hidden'
        }
);

export const StyledContainer = styled.div<{
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
  theme: any;
  styles: { [key: string]: any };
}>(
  ({ styles }): any => ({
    display: 'flex',
    overflowX: 'auto',
    ...styles
  }),
  ({ orientation, theme }) =>
    orientation === 'vertical'
      ? {
          backgroundColor: theme.bgColor,
          boxShadow: theme.boxShadow,
          border: theme.border
        }
      : {
          flexBasis: '100%',
          flexDirection: 'row',
          backgroundColor: theme.bgColor,
          boxShadow: theme.boxShadow,
          borderBottom: theme.border
        }
);

export const StyledTabsLayer = styled.div<{
  centered: boolean;
}>(
  {
    display: 'flex',
    alignItems: 'stretch'
  },
  ({ centered }): any =>
    centered
      ? {
          width: '100%'
        }
      : {}
);
