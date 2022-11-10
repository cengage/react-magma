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

export const StyledNavTabs = styled(NavTabs)`
  border-left: 1px solid
    ${props =>
      props.isInverse ? magma.colors.primary400 : magma.colors.neutral300};
  > div ul {
    align-items: start;
  }
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

  function renderPageNavTabs() {
    if (headings && headings.length > 0) {
      return (
        <>
          <StyledTabHeading isInverse={isInverse}>
            On this page
          </StyledTabHeading>
          {headings.map((page, index) => {
            const id = convertTextToId(page);
            return (
              <NavTab
                key={index}
                to={`#${id}`}
                isInverse={isInverse}
                isActive={activeTab === index}
                onClick={() => setActiveTab(index)}
              >
                {page}
              </NavTab>
            );
          })}
        </>
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
