import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Hyperlink,
  magma,
} from '@react-magma/dom';

const StyledAccordion = styled(Accordion)`
  background: ${magma.colors.neutral07};
  border-bottom: inherit;
  a {
    text-decoration: none;
    color: inherit;
    display: block;
    &:hover {
      color: inherit;
    }
  }
`;

const StyledAccordionButton = styled(AccordionButton)`
  background: none;
  border-top: inherit;
`;

const StyledAccordionLink = styled.span`
  display: flex;
  font-size: ${magma.typeScale.size03.fontSize};
  line-height: ${magma.typeScale.size03.lineHeight};
  font-weight: 600;
  padding: ${magma.spaceScale.spacing04} ${magma.spaceScale.spacing05};
`;

const SubNavWrapper = styled.ul`
  padding: 0;
  margin: 0;
  a {
    padding: 6px 24px;
    &:active {
      background: ${magma.colors.neutral06};
      position: relative;
    }
    &:active:before {
      content: '';
      position: absolute;
      width: 4px;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: 2px;
      background: ${magma.colors.primary};
    }
  }
`;

const StyledAccordionPanel = styled(AccordionPanel)`
  background: none;
  font-size: ${magma.typeScale.size02.fontSize};
  padding: 0;
`;

const StyledAccordionSubHeader = styled.label`
  font-size: ${magma.typeScale.size01.fontSize};
  font-weight: 700;
  text-transform: uppercase;
  display: inline-block;
  text-indent: 0;
  padding-left: 16px;
  padding-top: 20px;
`;

const setValue = (pagePath, page, pages) => {
  if (pagePath.length > 1) {
    pages[pagePath[0]] = pages[pagePath[0]] || {};
    return setValue(pagePath.slice(1), page, pages[pagePath[0]]);
  } else {
    pages[pagePath[0]] = page;
    return pages;
  }
};

const iteratePages = pages =>
  pages.reduce((pages, page) => {
    const pagePath = page.fields.pagePath.split('/').slice(1);
    setValue(pagePath, page, pages);
    return pages;
  }, {});

const buildSidebar = (pages, level = 0) => {
  return Object.keys(pages).map(page => {
    return level === 0 ? (
      buildCategory({ page, children: buildSidebar(pages[page], 1) })
    ) : (
      <>
        {pages[page].fields && pages[page].fields.pagePath
          ? buildLink(page, pages[page])
          : buildGroup({ page, children: buildSidebar(pages[page], level++) })}
      </>
    );
  });
};

const buildCategory = ({ page, children }) => (
  <AccordionItem>
    <StyledAccordionButton>
      <h3>{page}</h3>
    </StyledAccordionButton>
    <SubNavWrapper>{children}</SubNavWrapper>
  </AccordionItem>
);
const buildGroup = ({ page, children }) => (
  <StyledAccordionPanel>
    <StyledAccordionSubHeader>
      <h3>{page}</h3>
    </StyledAccordionSubHeader>
    <SubNavWrapper>{children}</SubNavWrapper>
  </StyledAccordionPanel>
);

const buildLink = (page, details) => {
  return (
    <StyledAccordionPanel>
      <Hyperlink to={details.fields.pagePath} as={Link}>
        {page}
      </Hyperlink>
    </StyledAccordionPanel>
  );
};

export const Content = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allFile(filter: { sourceInstanceName: { eq: "documentation" } }) {
            nodes {
              fields {
                pagePath
                type
              }
            }
          }
        }
      `}
      render={data => (
        <StyledAccordion>
          {buildSidebar(iteratePages(data.allFile.nodes))}
        </StyledAccordion>
      )}
    />
  );
};
