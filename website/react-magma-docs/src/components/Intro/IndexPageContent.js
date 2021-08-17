/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Button } from 'react-magma-dom';
import { Card, CardBody, CardHeading } from 'react-magma-dom';
import { Flex } from 'react-magma-dom';
import { Grid, GridItem } from 'react-magma-dom';
import { Heading, TypographyVisualStyle } from 'react-magma-dom';
import {
  ArchitectureIcon,
  CodeIcon,
  AccessibilityIcon,
  PaletteIcon,
  DevicesIcon,
  ExtensionIcon,
  TimelineIcon,
  GroupsIcon,
} from 'react-magma-icons';
import { Logo } from '../Logo';
import { magma } from 'react-magma-dom';
import styled from '@emotion/styled';

const StyledGrid = styled(Grid)`
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  padding: 2em;

  @media (max-width: ${magma.breakpoints.small}px) {
    display: block;
  }
`;

const StyledGridItem = styled(GridItem)`
  display: grid;
  width: 100%;

  @media (max-width: ${magma.breakpoints.small}px) {
    display: block;
    margin-bottom: ${magma.spaceScale.spacing06};
  }
`;

const HeaderBlock = styled.div`
  display: flex;
  align-items: center;
  padding: ${magma.spaceScale.spacing06};

  svg {
    justify-self: flex-end;
    padding: 0 1em 0 2em;
    height: 200px;
    width: 200px;
    margin: auto;
  }

  @media (max-width: ${magma.breakpoints.small}px) {
    svg {
      display: none;
    }
  }
`;

const CenterBlock = styled.div`
  grid-column: 1 / 3;
  text-align: center;
  margin: auto;
  max-width: 400px;

  button {
    margin: auto;
  }
`;

const CardGrid = styled(Card)`
  display: grid;
  grid-template-columns: min-content auto;
`;

const CardButton = styled(Button)`
  display: flex;
  margin-top: 2em;
`;

const backgroundColors = {
  yellow: magma.colors.pop04,
  pink: magma.colors.pop,
  teal: magma.colors.pop06,
  blue: magma.colors.foundation02,
  green: magma.colors.success02,
  orange: magma.colors.pop02,
  purple: magma.colors.pop05,
};

const setCardIconColor = props => {
  return backgroundColors[props.color] || backgroundColors.yellow;
};

const CardIcon = styled(Flex)`
  height: 72px;
  width: 72px;
  border-radius: 50%;
  margin: ${magma.spaceScale.spacing06};
  background-color: ${props => setCardIconColor(props)};

  > * {
    align-self: center;
    justify-self: center;
    margin: auto;
    height: ${magma.iconSizes.xLarge}px;
    width: ${magma.iconSizes.xLarge}px;
  }
`;

export function IndexPageContent() {
  return (
    <>
      <HeaderBlock>
        <div>
          <Heading level={1}>React Magma Design System</Heading>
          <Heading level={2} visualStyle={TypographyVisualStyle.bodyLarge}>
            React Magma is Cengage's open source design system for creating
            digital experiences with React.
          </Heading>
        </div>
        <Logo />
      </HeaderBlock>
      <StyledGrid gridGap={magma.spaceScale.spacing06}>
        <StyledGridItem>
          <CardGrid background={magma.colors.neutral07}>
            <CardIcon color="yellow">
              <ArchitectureIcon />
            </CardIcon>
            <CardBody>
              <CardHeading>Designing</CardHeading>
              Start working in Sketch with ready-made UI components such as
              inputs, buttons, and more! To see how a component works and
              behaves, please refer to the usage guidelines on this site.
              <CardButton>Start Designing</CardButton>
            </CardBody>
          </CardGrid>
        </StyledGridItem>

        <StyledGridItem>
          <CardGrid background={magma.colors.neutral07}>
            <CardIcon color="yellow">
              <CodeIcon />
            </CardIcon>
            <CardBody>
              <CardHeading>Developing</CardHeading>
              Use the documentation on this site to guide your development, and
              grab the code on github when you're ready to get started.
              <CardButton>Start Developing</CardButton>
            </CardBody>
          </CardGrid>
        </StyledGridItem>

        <CenterBlock>
          <Heading level={2}>Working smarter, not harder</Heading>
          <p>
            Standardized cmponents support collaboration, reinforce branding,
            and provide a consistent look and user experience.
          </p>
        </CenterBlock>
        <StyledGridItem gridColumn="1">
          <CardGrid background={magma.colors.neutral07}>
            <CardIcon color="pink">
              <AccessibilityIcon color="white" />
            </CardIcon>
            <CardBody>
              <CardHeading>Accessible</CardHeading>
              Designed and developed for WCAG 2.1 compliance.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <StyledGridItem gridColumn="2">
          <CardGrid background={magma.colors.neutral07}>
            <CardIcon color="teal">
              <PaletteIcon color="white" />
            </CardIcon>
            <CardBody>
              <CardHeading>Themeable</CardHeading>
              Easily theme all components with your brand's specific styles.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <StyledGridItem gridColumn="1">
          <CardGrid background={magma.colors.neutral07}>
            <CardIcon color="blue">
              <DevicesIcon color="white" />
            </CardIcon>
            <CardBody>
              <CardHeading>Platform Agnostic</CardHeading>
              Design and develop experiences for any platform.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <StyledGridItem gridColumn="2">
          <CardGrid background={magma.colors.neutral07}>
            <CardIcon color="green">
              <ExtensionIcon color="white" />
            </CardIcon>
            <CardBody>
              <CardHeading>Scalable</CardHeading>
              Manage design at scale with a design system that evolves as needs
              change.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <StyledGridItem gridColumn="1">
          <CardGrid background={magma.colors.neutral07}>
            <CardIcon color="orange">
              <TimelineIcon color="white" />
            </CardIcon>
            <CardBody>
              <CardHeading>Efficient</CardHeading>
              Save time so you can focus on larger issues of usability and
              meaning.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <StyledGridItem gridColumn="2">
          <CardGrid background={magma.colors.neutral07}>
            <CardIcon color="purple">
              <GroupsIcon color="white" />
            </CardIcon>
            <CardBody>
              <CardHeading>Living</CardHeading>
              Open source design system that is constantly expanding.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <CenterBlock>
          <Heading level={2}>Want to contribute?</Heading>
          <p>
            We welcome all ideas and feedback to help us produce the best
            possible experience for our users. If you're interested in
            contributing, review our contribution guidelines to get started.
          </p>
          <Button>Start Contributing</Button>
        </CenterBlock>
      </StyledGrid>
    </>
  );
}
