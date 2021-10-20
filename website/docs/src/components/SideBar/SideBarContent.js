import React from 'react';
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

export const SideBarContent = (
  <>
    <StyledAccordion>
      <AccordionItem>
        <h3>
          <StyledAccordionButton>Designing</StyledAccordionButton>
        </h3>
        <SubNavWrapper>
          <StyledAccordionPanel>
            <Hyperlink>Getting started</Hyperlink>
          </StyledAccordionPanel>
          <StyledAccordionPanel>
            <Hyperlink>Color</Hyperlink>
          </StyledAccordionPanel>
          <StyledAccordionPanel>
            <Hyperlink>Layout</Hyperlink>
          </StyledAccordionPanel>
          <StyledAccordionPanel>
            <Hyperlink>Spacing</Hyperlink>
          </StyledAccordionPanel>
          <StyledAccordionPanel>
            <Hyperlink>Typography</Hyperlink>
          </StyledAccordionPanel>
        </SubNavWrapper>
      </AccordionItem>

      <AccordionItem>
        <h3>
          <StyledAccordionButton>Developing</StyledAccordionButton>
        </h3>
        <SubNavWrapper>
          <StyledAccordionPanel>
            <Hyperlink>Getting started</Hyperlink>
          </StyledAccordionPanel>
          <StyledAccordionPanel>
            <Hyperlink>Usage</Hyperlink>
          </StyledAccordionPanel>
          <StyledAccordionPanel>
            <Hyperlink>Custom styles</Hyperlink>
          </StyledAccordionPanel>
          <StyledAccordionPanel>
            <Hyperlink>Versions</Hyperlink>
          </StyledAccordionPanel>
          <StyledAccordionPanel>
            <Hyperlink>Changelog</Hyperlink>
          </StyledAccordionPanel>
        </SubNavWrapper>
      </AccordionItem>

      <AccordionItem>
        <h3>
          <StyledAccordionLink>
            <Hyperlink>Contributing</Hyperlink>
          </StyledAccordionLink>
        </h3>
      </AccordionItem>

      <AccordionItem>
        <h3>
          <StyledAccordionButton>Components</StyledAccordionButton>
        </h3>
        <StyledAccordionPanel>
          <h3>
            <StyledAccordionSubHeader>Layout</StyledAccordionSubHeader>
          </h3>
          <SubNavWrapper>
            <StyledAccordionPanel>
              <Hyperlink>AppBar</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Breakpoints Container</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Container</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Flex</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Hide at Breakpoint</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Spacer</Hyperlink>
            </StyledAccordionPanel>
          </SubNavWrapper>
          <h3>
            <StyledAccordionSubHeader>Data Display</StyledAccordionSubHeader>
          </h3>
          <SubNavWrapper>
            <StyledAccordionPanel>
              <Hyperlink>Accordion</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Badge</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Card</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Heading</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Icons</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Modal</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Paragraph</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Table</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Tabs</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Tags</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Tooltip</Hyperlink>
            </StyledAccordionPanel>
          </SubNavWrapper>

          <h3>
            <StyledAccordionSubHeader>Inputs</StyledAccordionSubHeader>
          </h3>
          <SubNavWrapper>
            <StyledAccordionPanel>
              <Hyperlink>Button</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Checkbox</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Combobox</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Date Picker</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Dropdown</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>File Uploader</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Form</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Form Group</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Icon Button</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Indeterminate Checkbox</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Input</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Password input</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Radio button</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Search</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Select</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Textarea</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Time Picker</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Toggle</Hyperlink>
            </StyledAccordionPanel>
          </SubNavWrapper>
          <h3>
            <StyledAccordionSubHeader>Feedback</StyledAccordionSubHeader>
          </h3>
          <SubNavWrapper>
            <StyledAccordionPanel>
              <Hyperlink>Alert</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Banner</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Loading Indicator</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Progress Bar</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Spinner</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Toast</Hyperlink>
            </StyledAccordionPanel>
          </SubNavWrapper>
          <h3>
            <StyledAccordionSubHeader>Navigation</StyledAccordionSubHeader>
          </h3>
          <SubNavWrapper>
            <StyledAccordionPanel>
              <Hyperlink>Breadcrumb</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Hyperlink</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Nav Tabs</Hyperlink>
            </StyledAccordionPanel>
          </SubNavWrapper>
          <h3>
            <StyledAccordionSubHeader>Utilities</StyledAccordionSubHeader>
          </h3>
          <SubNavWrapper>
            <StyledAccordionPanel>
              <Hyperlink>Global Styles</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Internationalization</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Theming</Hyperlink>
            </StyledAccordionPanel>
          </SubNavWrapper>

          <h3>
            <StyledAccordionSubHeader>Accessibility</StyledAccordionSubHeader>
          </h3>
          <SubNavWrapper>
            <StyledAccordionPanel>
              <Hyperlink>Announce</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Visually Hidden</Hyperlink>
            </StyledAccordionPanel>
            <StyledAccordionPanel>
              <Hyperlink>Skip link</Hyperlink>
            </StyledAccordionPanel>
          </SubNavWrapper>

          <h3>
            <StyledAccordionSubHeader>Hooks</StyledAccordionSubHeader>
          </h3>
          <SubNavWrapper>
            <StyledAccordionPanel>
              <Hyperlink>useMediaQuery Hook</Hyperlink>
            </StyledAccordionPanel>
          </SubNavWrapper>
        </StyledAccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h3>
          <StyledAccordionButton>Data Visualization</StyledAccordionButton>
        </h3>
        <SubNavWrapper>
          <StyledAccordionPanel>
            <Hyperlink>
              bricks meant for charts/dataviz published to a
              @react-magma/data-viz or some similar name
            </Hyperlink>
          </StyledAccordionPanel>
        </SubNavWrapper>
      </AccordionItem>

      <AccordionItem>
        <h3>
          <StyledAccordionButton>Patterns</StyledAccordionButton>
        </h3>
        <SubNavWrapper>
          <StyledAccordionPanel>
            <Hyperlink>Getting Started</Hyperlink>
          </StyledAccordionPanel>
          <StyledAccordionPanel>
            <Hyperlink>Header</Hyperlink>
          </StyledAccordionPanel>
        </SubNavWrapper>
      </AccordionItem>

      <AccordionItem>
        <h3>
          <StyledAccordionButton>Tools</StyledAccordionButton>
        </h3>
        <SubNavWrapper>
          <StyledAccordionPanel>
            <Hyperlink>
              Anything that relates to react-magma to help but isn't a
              component, dataviz, or a pattern. Example: a drag and drop builder
            </Hyperlink>
          </StyledAccordionPanel>
        </SubNavWrapper>
      </AccordionItem>
    </StyledAccordion>
  </>
);
