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
  align-items: stretch;
  overflow-y: hidden;

  > div ul {
    align-items: flex-start;
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
    () => pageData?.node?.fields.headings || [],
    [pageData?.node?.fields.headings]
  );

  const hasHeadings = headings.length > 0;

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.location.hash) {
      const timeout = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, []);

  const initialSectionId = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash ? window.location.hash.substring(1) : null;
    }

    return null;
  }, []);

  const scrollToElement = useCallback(
    elementId => {
      if (typeof window === 'undefined') return false;

      const element = document.getElementById(elementId);

      if (!element) return false;

      setIsScrolling(true);

      try {
        const offset = -40;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo(0, elementPosition + offset);

        if (window.history && window.history.pushState) {
          window.history.pushState(null, null, `#${elementId}`);
        }

        const index = headings.findIndex(
          heading => convertTextToId(heading) === elementId
        );

        if (index !== -1) {
          setActiveTab(index);
        }

        return true;
      } catch (error) {
        console.error('Error scrolling to element:', error);

        return false;
      } finally {
        setTimeout(() => {
          setIsScrolling(false);
        }, 100);
      }
    },
    [headings, setIsScrolling]
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
    if (
      initialSectionId &&
      hasHeadings &&
      !initialScrollApplied &&
      !isScrolling
    ) {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }

      const timer = setTimeout(() => {
        let success = scrollToElement(initialSectionId);

        setInitialScrollApplied(true);

        if (!success) {
          const retry1 = setTimeout(() => {
            success = scrollToElement(initialSectionId);

            if (!success) {
              const retry2 = setTimeout(() => {
                scrollToElement(initialSectionId);
              }, 800);

              return () => clearTimeout(retry2);
            }
          }, 400);

          return () => clearTimeout(retry1);
        }
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setInitialScrollApplied(true);
    }
  }, [
    initialSectionId,
    hasHeadings,
    initialScrollApplied,
    scrollToElement,
    isScrolling,
  ]);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !window.IntersectionObserver ||
      !initialScrollApplied ||
      isScrolling
    ) {
      return;
    }

    const rootMarginValue = `0px 0px -70% 0px`;

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

    return headings.map((heading, index) => {
      const id = convertTextToId(heading);

      return (
        <StyledNavTab
          key={id}
          to={`#${id}`}
          isInverse={isInverse}
          isActive={activeTab === index}
          onClick={e => handleAnchorLinkClick(id, index, e)}
        >
          {heading}
        </StyledNavTab>
      );
    });
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
