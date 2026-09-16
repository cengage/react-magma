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
  text-transform: uppercase;
  margin: 0;
  margin-top: 44px;
  color: ${props =>
    props.isInverse ? magma.colors.neutral100 : magma.colors.neutral500};
  font-weight: 500;
  padding: 12px 16px;
`;

// Side navigation
export const StyledNavTabs = styled(NavTabs)`
  width: 240px;
  max-height: calc(100vh - 150px);
  margin-right: 24px;
  align-items: stretch;
  overflow-y: auto;

  > div ul {
    align-items: flex-start;
    width: 100%;
    > div {
      width: 100%;
    }
  }

  > div ul > li::after {
    width: 2px;
  }
`;

export const StyledNavTab = styled(NavTab)`
  font-size: ${magma.typeScale.size02.fontSize};
  font-weight: 400;
  line-height: ${magma.typeScale.size02.lineHeight};
  padding-bottom: ${magma.spaceScale.spacing03};
  padding-top: ${magma.spaceScale.spacing03};
  text-transform: none;

  &&:not([aria-current='page']) {
    color: ${props =>
      props.isInverse ? magma.colors.neutral100 : magma.colors.neutral700};
  }
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

  const isInverse = useIsInverse();

  const headings = useMemo(
    () => pageData?.node?.fields.headings || [],
    [pageData?.node?.fields.headings]
  );

  const hasHeadings = headings.length > 0;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.location.hash) {
      return;
    }

    const initialSectionId = window.location.hash.substring(1);
    const index = headings.findIndex(
      heading => convertTextToId(heading) === initialSectionId
    );

    if (index !== -1) {
      setActiveTab(index);
    }
  }, [headings]);

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
        const html = document.querySelector('html');
        const previousScrollBehavior = html?.style.scrollBehavior;

        if (html) {
          html.style.scrollBehavior = 'auto';
        }
        window.scrollTo(0, elementPosition + offset);
        window.requestAnimationFrame(() => {
          if (html) {
            html.style.scrollBehavior = previousScrollBehavior;
          }
        });

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
      typeof window === 'undefined' ||
      !window.IntersectionObserver ||
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
  }, [headings, isScrolling]);

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
      <StyledNavTabWrapper isInverse={isInverse}>
        <StyledTabHeading isInverse={isInverse}>On this page</StyledTabHeading>
        <StyledNavTabs
          isInverse={isInverse}
          orientation={TabsOrientation.vertical}
        >
          {renderPageNavTabs()}
        </StyledNavTabs>
      </StyledNavTabWrapper>
    </Wrapper>
  );
};

SubPageTabs.propTypes = {
  pageData: PropTypes.object,
  hasHorizontalNav: PropTypes.bool,
};

export default SubPageTabs;
