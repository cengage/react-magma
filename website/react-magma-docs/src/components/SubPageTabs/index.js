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
  color: ${magma.colors.neutral700};
`;

export const SubPageTabs = ({ pageData }) => {
  const isInverse = useIsInverse();
  const headings = pageData?.node?.headings?.map(heading => heading.value);

  function renderPageNavTabs() {
    if (headings && headings.length > 0) {
      return (
        <>
          <StyledTabHeading>On this page</StyledTabHeading>
          {headings.map((page, index) => {
            const id = convertTextToId(page);
            return (
              <NavTab
                key={index}
                to={`#${id}`}
                isInverse={isInverse}
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
      <NavTabs isInverse={isInverse} orientation={TabsOrientation.vertical}>
        {renderPageNavTabs()}
      </NavTabs>
    </>
  );
};

SubPageTabs.propTypes = {
  pageData: PropTypes.object,
};
