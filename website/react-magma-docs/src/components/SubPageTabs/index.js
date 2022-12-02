import React from 'react';
import PropTypes from 'prop-types';
// import { Router, Location } from '@reach/router';
import styled from '@emotion/styled';
import { convertTextToId } from '../../utils';
import {
  useIsInverse,
  NavTabs,
  NavTab,
  magma,
  TabsOrientation,
} from 'react-magma-dom';

export const StyledNavTabs = styled(NavTabs)`
  width: 272px;
  margin-right: 24px;
  > div ul {
    align-items: start;
  }
`;

export const StyledNavTab = styled(NavTab)`
  text-transform: none;
`;

export const StyledNavTabWrapper = styled.div`
  border-left: 1px solid
    ${props =>
      props.isInverse ? magma.colors.primary400 : magma.colors.neutral300};
  margin-top: 32px;
`;

export const StyledTabHeading = styled.p`
  font-size: ${magma.typeScale.size01.fontSize};
  line-height: ${magma.typeScale.size01.lineHeight};
  letter-spacing: ${magma.typeScale.size01.letterSpacing};
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  color: ${props =>
    props.isInverse ? magma.colors.neutral100 : magma.colors.neutral700};
  padding: 12px 16px;
`;

export const SubPageTabs = ({ pageData }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const isInverse = useIsInverse();
  const headings = pageData?.node?.headings?.map(heading => heading.value);

  const handleAnchorLinkClick = (id, index, e) => {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
    e.preventDefault();
    const targetID = id;
    const targetAnchor = document.getElementById(id);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);
  
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
  
    const checkIfDone = setInterval(function () {
      const atBottom =
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
      if (distanceToTop(targetAnchor) === 0 || atBottom) {
        targetAnchor.tabIndex = '-1';
        targetAnchor.focus();
        window.history.pushState('', '', '#' + targetID);
        clearInterval(checkIfDone);
      }
    }, 100);
  
    setActiveTab(index);
  };

  function renderPageNavTabs() {
    if (headings && headings.length > 0) {
      return (
        <StyledNavTabWrapper>
          <StyledTabHeading isInverse={isInverse}>
            On this page
          </StyledTabHeading>
          {headings.map((page, index) => {
            const id = convertTextToId(page);
            return (
              <StyledNavTab
                key={index}
                to={`#${id}`}
                isInverse={isInverse}
                isActive={activeTab === index}
                onClick={(e) => handleAnchorLinkClick(id, index, e)}
              >
                {page}
              </StyledNavTab>
            );
          })}
        </StyledNavTabWrapper>
      );
    }
  }

  return (
    <>
      <StyledNavTabs
        isInverse={isInverse}
        orientation={TabsOrientation.vertical}
      >
        {renderPageNavTabs()}
      </StyledNavTabs>
    </>
  );
};

SubPageTabs.propTypes = {
  pageData: PropTypes.object,
};
