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
