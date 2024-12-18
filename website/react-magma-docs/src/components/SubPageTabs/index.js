import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { convertTextToId } from '../../utils';
import {
  useIsInverse,
  NavTabs,
  NavTab,
  magma,
  TabsOrientation,
} from 'react-magma-dom';

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

export const SubPageTabs = ({ pageData, hasHorizontalNav }) => {
  const Wrapper = styled.div`
    position: sticky;
    top: ${hasHorizontalNav ? '102px' : '80px'};
    height: calc(100vh - 200px);
  `;

  const [activeTab, setActiveTab] = React.useState(0);

  const isInverse = useIsInverse();
  const headings = pageData?.node?.headings?.map(heading => heading.value);
  const hasHeadings = headings?.length > 0;

  const handleAnchorLinkClick = (id, index, e) => {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
    e.preventDefault();
    const targetID = id;
    const targetAnchor = document.getElementById(id);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor) - 25;

    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });

    window.history.pushState('', '', '#' + targetID);
  };

  function renderPageNavTabs() {
    if (hasHeadings) {
      return (
        <StyledNavTabWrapper>
          {headings.map((page, index) => {
            const id = convertTextToId(page);
            return (
              <StyledNavTab
                key={index}
                to={`#${id}`}
                isInverse={isInverse}
                isActive={activeTab === index}
                onClick={e => handleAnchorLinkClick(id, index, e)}
              >
                {page}
              </StyledNavTab>
            );
          })}
        </StyledNavTabWrapper>
      );
    }
  }

  React.useEffect(() => {
    const rootMarginValue = `0px 0px -80% 0px`;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = headings?.findIndex(
              page => convertTextToId(page) === entry.target.id
            );

            setActiveTab(index);
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

    return () => {
      headings?.forEach(page => {
        const id = convertTextToId(page);
        const element = document.getElementById(id);

        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  return (
    <>
      {hasHeadings ? (
        <Wrapper hasHorizontalNav={hasHorizontalNav}>
          <StyledTabHeading isInverse={isInverse}>
            On this page
          </StyledTabHeading>

          <StyledNavTabs
            isInverse={isInverse}
            orientation={TabsOrientation.vertical}
          >
            {renderPageNavTabs()}
          </StyledNavTabs>
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  );
};

SubPageTabs.propTypes = {
  pageData: PropTypes.object,
  hasHorizontalNav: PropTypes.bool,
};
