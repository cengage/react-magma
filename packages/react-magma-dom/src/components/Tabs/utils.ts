import React, { useLayoutEffect } from 'react';

import { TabsOrientation } from './shared';
import {
  animate,
  debounce,
  detectScrollType,
  getNormalizedScrollLeft,
} from '../../utils';

export function useTabsMeta(theme, orientation, backgroundColor, isInverse) {
  const isRtl = theme.direction === 'rtl';
  const vertical = orientation === TabsOrientation.vertical;
  const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
  const clientSize = vertical ? 'clientHeight' : 'clientWidth';

  const approxTabSize = vertical
    ? theme.tabs.approxTabSize.vertical
    : theme.tabs.approxTabSize.horizontal;

  const background = backgroundColor ? backgroundColor : 'transparent';

  const [displayScroll, setDisplayScroll] = React.useState({
    start: false,
    end: false,
  });

  const tabsWrapperRef = React.useRef<HTMLDivElement>();
  const prevButtonRef = React.useRef<HTMLButtonElement>();
  const nextButtonRef = React.useRef<HTMLButtonElement>();

  function scroll(scrollValue) {
    animate(scrollStart, tabsWrapperRef.current, scrollValue);
  }

  function moveTabsScroll(delta) {
    let scrollValue = tabsWrapperRef.current[scrollStart];

    if (vertical) {
      scrollValue += delta;
    } else {
      scrollValue += delta * (isRtl ? -1 : 1);
      // Fix for Edge
      scrollValue *= isRtl && detectScrollType() === 'reverse' ? -1 : 1;
    }

    scroll(scrollValue);
  }

  function handleStartScrollClick() {
    moveTabsScroll(-tabsWrapperRef.current[clientSize] + approxTabSize);
  }

  function handleEndScrollClick() {
    moveTabsScroll(tabsWrapperRef.current[clientSize] - approxTabSize);
  }

  function updateScrollButtonState() {
    const { scrollTop, scrollHeight, clientHeight, scrollWidth, clientWidth } =
      tabsWrapperRef.current;
    let showStartScroll;
    let showEndScroll;

    if (vertical) {
      showStartScroll = scrollTop > 1;
      showEndScroll = scrollTop < scrollHeight - clientHeight - 1;
    } else {
      const scrollLeft = getNormalizedScrollLeft(
        tabsWrapperRef.current,
        theme.direction
      );

      // use 1 for the potential rounding error with browser zooms.
      showStartScroll = isRtl
        ? scrollLeft < scrollWidth - clientWidth - 1
        : scrollLeft > 1;
      showEndScroll = !isRtl
        ? scrollLeft < scrollWidth - clientWidth - 1
        : scrollLeft > 1;
    }

    if (
      showStartScroll !== displayScroll.start ||
      showEndScroll !== displayScroll.end
    ) {
      setDisplayScroll({ start: showStartScroll, end: showEndScroll });
    }
  }

  React.useEffect(() => {
    const handleResize = debounce(updateScrollButtonState, 100);

    window.addEventListener('resize', handleResize);

    return () => {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScrollButtonState]);

  const handleTabsScroll = React.useCallback(
    debounce(updateScrollButtonState, 100),
    [updateScrollButtonState]
  );

  React.useEffect(() => {
    return () => {
      handleTabsScroll.clear();
    };
  }, [handleTabsScroll]);

  React.useEffect(updateScrollButtonState);

  return [
    { vertical, background, displayScroll, scrollStart },
    { handleStartScrollClick, handleEndScrollClick, handleTabsScroll, scroll },
    { prevButtonRef, nextButtonRef, tabsWrapperRef },
  ];
}

// ScrollSpy by Dewaun Ayers:
// https://blog.devgenius.io/diy-scrollspy-4f1c270cafaf

export const ScrollSpy = ({ handleScroll }) => {
  const isInViewPort = (entry, offset = 0) => {
    const rect = entry.boundingClientRect;

    return rect.top <= offset && rect.bottom >= offset;
  };

  useLayoutEffect(() => {
    const eachArea = document.querySelectorAll('[data-scrollspy]');
    const scrollables = [].slice.call(eachArea);

    for (const scrollable of scrollables) {
      //Fixes Jest
      if (!window.IntersectionObserver) return;

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            handleScroll && handleScroll(entry, isInViewPort(entry));
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: Array.from({ length: 1000 }, (_, i) => (i + 1) * 0.001),
        }
      );

      observer.observe(scrollable);
    }
  }, [handleScroll]);

  return null;
};
