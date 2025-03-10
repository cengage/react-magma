import React, { useState, useEffect, useCallback, useMemo } from 'react';

import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {
  useIsInverse,
  NavTabs,
  NavTab,
  magma,
  TabsOrientation,
} from 'react-magma-dom';

import { convertTextToId } from '../../utils';

export const StyledTabHeading = styled.p`
  font-size: ${magma.typeScale.size01.fontSize};
  line-height: ${magma.typeScale.size01.lineHeight};
  letter-spacing: ${magma.typeScale.size01.letterSpacing};
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  margin-top: 44px;
  color: ${props =>
    props.isInverse ? magma.colors.neutral100 : magma.colors.neutral700};
  padding: 12px 16px;
`;

// Side navigation
export const StyledNavTabs = styled(NavTabs)`
  width: 272px;
  height: calc(100vh - 150px);
  margin-right: 24px;
  > div ul {
    align-items: start;
    width: 100%;
    > div {
      width: 100%;
    }
  }
`;

export const StyledNavTab = styled(NavTab)`
  text-transform: none;
`;

export const StyledNavTabWrapper = styled.div`
  border-left: 1px solid
    ${props =>
      props.isInverse ? magma.colors.primary400 : magma.colors.neutral300};
`;

const Wrapper = styled.div`
  position: sticky;
  top: ${props => (props.hasHorizontalNav ? '102px' : '80px')};
  height: calc(100vh - 200px);
`;

export const SubPageTabs = ({ pageData, hasHorizontalNav }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [initialScrollApplied, setInitialScrollApplied] = useState(false);

  const isInverse = useIsInverse();

  const headings = useMemo(
    () => pageData?.node?.headings?.map(heading => heading.value) || [],
    [pageData?.node?.headings]
  );

  const hasHeadings = headings.length > 0;

  // Get the initial section ID from URL hash if it exists
  const initialSectionId = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash ? window.location.hash.substring(1) : null;
    }
    return null;
  }, []);

  const getDistanceToTop = useCallback(
    el => Math.floor(el.getBoundingClientRect().top),
    []
  );

  const scrollToElement = useCallback(
    (elementId, smooth = true) => {
      const element = document.getElementById(elementId);

      if (!element) return false;

      setIsScrolling(true);

      const offset = -25;
      const elementPosition = getDistanceToTop(element);

      window.scrollBy({
        top: elementPosition + offset,
        left: 0,
        behavior: smooth ? 'smooth' : 'auto',
      });

      // Update URL without reloading the page
      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, `#${elementId}`);
      }

      // Find and set the active tab
      const index = headings.findIndex(
        heading => convertTextToId(heading) === elementId
      );

      if (index !== -1) {
        setActiveTab(index);
      }

      // Reset scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 400);

      return true;
    },
    [headings, getDistanceToTop]
  );

  const handleAnchorLinkClick = useCallback(
    (id, index, e) => {
      e.preventDefault();
      if (!isScrolling) {
        scrollToElement(id);
      }
    },
    [scrollToElement, isScrolling]
  );

  useEffect(() => {
    if (initialSectionId && hasHeadings && !initialScrollApplied) {
      const timer = setTimeout(() => {
        const success = scrollToElement(initialSectionId);
        setInitialScrollApplied(true);

        if (!success) {
          setTimeout(() => {
            scrollToElement(initialSectionId);
          }, 400);
        }
      }, 300);

      return () => clearTimeout(timer);
    }

    setInitialScrollApplied(true);
  }, [initialSectionId, hasHeadings, initialScrollApplied, scrollToElement]);

  useEffect(() => {
    if (!initialScrollApplied || isScrolling) return;

    const rootMarginValue = `0px 0px -80% 0px`;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isScrolling) {
            const index = headings.findIndex(
              heading => convertTextToId(heading) === entry.target.id
            );

            if (index !== -1) {
              setActiveTab(index);
            }
          }
        });
      },
      { rootMargin: rootMarginValue }
    );

    headings?.forEach(page => {
      const id = convertTextToId(page);
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings, initialScrollApplied, isScrolling]);

  const renderPageNavTabs = useCallback(() => {
    if (!hasHeadings) return null;

    return (
      <StyledNavTabWrapper isInverse={isInverse}>
        {headings.map((heading, index) => {
          const id = convertTextToId(heading);
          return (
            <StyledNavTab
              key={index}
              to={`#${id}`}
              isInverse={isInverse}
              isActive={activeTab === index}
              onClick={e => handleAnchorLinkClick(id, index, e)}
            >
              {heading}
            </StyledNavTab>
          );
        })}
      </StyledNavTabWrapper>
    );
  }, [headings, isInverse, activeTab, handleAnchorLinkClick, hasHeadings]);

  if (!hasHeadings) return null;

  return (
    <Wrapper hasHorizontalNav={hasHorizontalNav}>
      <StyledTabHeading isInverse={isInverse}>On this page</StyledTabHeading>

      <StyledNavTabs
        isInverse={isInverse}
        orientation={TabsOrientation.vertical}
      >
        {renderPageNavTabs()}
      </StyledNavTabs>
    </Wrapper>
  );
};

SubPageTabs.propTypes = {
  pageData: PropTypes.object,
  hasHorizontalNav: PropTypes.bool,
};

export default SubPageTabs;
