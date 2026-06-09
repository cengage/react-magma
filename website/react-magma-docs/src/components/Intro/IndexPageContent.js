import React from 'react';

import styled from '@emotion/styled';
import { Link } from 'gatsby';
import {
  Card,
  CardBody,
  CardHeading,
  Flex,
  Grid,
  GridItem,
  IconButton,
  magma,
  Heading,
  TypographyVisualStyle,
  Hyperlink,
} from 'react-magma-dom';
import {
  ArchitectureIcon,
  CodeIcon,
  AccessibilityIcon,
  PaletteIcon,
  DevicesIcon,
  ExtensionIcon,
  TimelineIcon,
  GroupsIcon,
  GithubIcon,
} from 'react-magma-icons';

import { Logo } from '../Logo';

const StyledGrid = styled(Grid)`
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  padding: 0 ${magma.spaceScale.spacing06} ${magma.spaceScale.spacing06};

  @media (max-width: ${magma.breakpoints.small}px) {
    display: block;
    padding: 0 1em 1em;
  }
`;

const StyledGridTop = styled(Grid)`
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  grid-template-rows: auto;
  padding: 0 ${magma.spaceScale.spacing06} ${magma.spaceScale.spacing06};

  @media (max-width: ${magma.breakpoints.medium}px) {
    display: block;
    padding: 0;
    margin: ${magma.spaceScale.spacing06};
  }

  @media (max-width: ${magma.breakpoints.small}px) {
    display: block;
    padding: 0 1em 1em;
    margin: 0;
  }
`;

const StyledGridItem = styled(GridItem)`
  display: grid;
  width: 100%;
  justify-self: center;

  @media (max-width: ${magma.breakpoints.small}px) {
    display: block;
    padding: 0;
    margin-bottom: ${magma.spaceScale.spacing05};
  }
`;

const StyledGridHeroItem = styled(GridItem)`
  display: grid;
  width: 100%;
  justify-self: center;

  @media (max-width: ${magma.breakpoints.medium}px) {
    margin: 0;
    margin-bottom: ${magma.spaceScale.spacing05};
  }

  @media (max-width: ${magma.breakpoints.small}px) {
    display: block;
    margin-bottom: ${magma.spaceScale.spacing05};
  }
`;

const HeaderBlock = styled.div`
  display: flex;
  align-items: center;
  padding: ${magma.spaceScale.spacing06} ${magma.spaceScale.spacing06}
    ${magma.spaceScale.spacing06} ${magma.spaceScale.spacing10};
  text-align: left;

  svg {
    justify-self: flex-end;
    padding: 0 1em 0 2em;
    height: 200px;
    width: 200px;
    margin: auto;
    filter: drop-shadow(0 2px 6px rgba(0 0 0 / 0.18));
  }

  @media (max-width: ${magma.breakpoints.medium}px) {
    padding: ${magma.spaceScale.spacing10} ${magma.spaceScale.spacing10} 0;
    svg {
      height: 220px;
      width: 220px;
      padding: 0 1em;
    }
  }

  @media (max-width: ${magma.breakpoints.small}px) {
    padding: ${magma.spaceScale.spacing10};
    flex-direction: column;
    text-align: center;

    svg {
      height: 140px;
      width: 140px;
      padding: 0;
    }
  }
`;

const HeaderText = styled.div`
  width: 66%;

  @media (max-width: ${magma.breakpoints.small}px) {
    width: 100%;
  }
`;

const CenterBlock = styled.div`
  grid-column: 1 / 3;
  text-align: center;
  margin: auto;
  max-width: 60%;

  @media (max-width: ${magma.breakpoints.medium}px) {
    margin: auto;
    max-width: 90%;
  }
`;

const CardGrid = styled(Card)`
  display: grid;
  grid-template-columns: min-content auto;
`;

const HeroCardGrid = styled(Card)`
  display: grid;
  grid-template-columns: min-content auto;

  @media (max-width: ${magma.breakpoints.small}px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    svg {
      width: 300px;
    }
  }
`;

const CardButton = styled.div`
  margin-top: 1em;
`;

const CardIcon = styled(Flex)`
  height: 56px;
  width: 56px;
  border-radius: 50%;
  margin: ${magma.spaceScale.spacing06} 0 0 ${magma.spaceScale.spacing06};
  background-color: ${magma.colors.primary500};

  > * {
    align-self: center;
    justify-self: center;
    margin: auto;
    height: ${magma.spaceScale.spacing08};
    width: ${magma.spaceScale.spacing08};
  }

  @media (max-width: ${magma.breakpoints.small}px) {
    height: ${magma.spaceScale.spacing09};
    width: ${magma.spaceScale.spacing09};
    margin: ${magma.spaceScale.spacing05} ${magma.spaceScale.spacing03} 0
      ${magma.spaceScale.spacing05};

    > * {
      height: ${magma.spaceScale.spacing07};
      width: ${magma.spaceScale.spacing07};
    }
  }
`;

const HeroCardIcon = styled(Flex)`
  height: 72px;
  width: 72px;
  border-radius: 50%;
  margin: ${magma.spaceScale.spacing06} 0 0 ${magma.spaceScale.spacing06};
  background-color: ${magma.colors.tertiary};

  > * {
    align-self: center;
    justify-self: center;
    margin: auto;
    height: ${magma.spaceScale.spacing10};
    width: ${magma.spaceScale.spacing10};
  }

  @media (max-width: ${magma.breakpoints.small}px) {
    height: ${magma.spaceScale.spacing11};
    width: ${magma.spaceScale.spacing11};
    margin: ${magma.spaceScale.spacing06} 0 ${magma.spaceScale.spacing03};

    > * {
      height: ${magma.spaceScale.spacing08};
      width: ${magma.spaceScale.spacing08};
    }
  }
`;

export function IndexPageContent() {
  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <HeaderBlock>
        <HeaderText>
          <Heading level={1}>React Magma Design&nbsp;System</Heading>
          <Heading level={2} visualStyle={TypographyVisualStyle.bodyLarge}>
            React Magma is Cengage's open source design system for creating
            digital experiences with React.
          </Heading>
        </HeaderText>
        <Logo />
      </HeaderBlock>

      <StyledGridTop gridGap={magma.spaceScale.spacing06}>
        <StyledGridHeroItem>
          <HeroCardGrid isInverse background={magma.colors.primary}>
            <HeroCardIcon>
              <ArchitectureIcon color={magma.colors.primary} />
            </HeroCardIcon>
            <CardBody>
              <CardHeading>Designing</CardHeading>
              Start working in Sketch with ready-made UI components such as
              inputs, buttons, and more! To see how a component works and
              behaves, please refer to the usage guidelines on this site.
              <CardButton>
                <Hyperlink
                  styledAs="Button"
                  to="/design-intro/get-started/"
                  isInverse
                  color="marketing"
                >
                  {linkProps => (
                    <Link {...linkProps}>
                      <span>Start Designing</span>
                    </Link>
                  )}
                </Hyperlink>
              </CardButton>
            </CardBody>
          </HeroCardGrid>
        </StyledGridHeroItem>

        <StyledGridHeroItem>
          <HeroCardGrid isInverse background={magma.colors.primary}>
            <HeroCardIcon>
              <CodeIcon color={magma.colors.primary} />
            </HeroCardIcon>
            <CardBody>
              <CardHeading>Developing</CardHeading>
              Use the documentation on this site to guide your development, and
              grab the code on github when you're ready to get started.
              <CardButton>
                <Hyperlink
                  styledAs="Button"
                  to="/api-intro/introduction"
                  isInverse
                  color="marketing"
                >
                  {linkProps => (
                    <Link {...linkProps}>
                      <span>Start Developing</span>
                    </Link>
                  )}
                </Hyperlink>
              </CardButton>
            </CardBody>
          </HeroCardGrid>
        </StyledGridHeroItem>
      </StyledGridTop>

      <StyledGrid gridGap={magma.spaceScale.spacing06}>
        <CenterBlock>
          <Heading level={2}>Working smarter, not&nbsp;harder</Heading>
          <div>
            Standardized components support collaboration, reinforce branding,
            and provide a consistent look and user experience.
          </div>
        </CenterBlock>

        <StyledGridItem gridColumn="1">
          <CardGrid background={magma.colors.neutral200}>
            <CardIcon>
              <AccessibilityIcon color={magma.colors.neutral100} />
            </CardIcon>
            <CardBody>
              <CardHeading>Accessible</CardHeading>
              Designed and developed for WCAG 2.1 compliance.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <StyledGridItem gridColumn="2">
          <CardGrid background={magma.colors.neutral200}>
            <CardIcon>
              <PaletteIcon color={magma.colors.neutral100} />
            </CardIcon>
            <CardBody>
              <CardHeading>Themeable</CardHeading>
              Easily theme all components with your brand's specific styles.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <StyledGridItem gridColumn="1">
          <CardGrid background={magma.colors.neutral200}>
            <CardIcon>
              <DevicesIcon color={magma.colors.neutral100} />
            </CardIcon>
            <CardBody>
              <CardHeading>Platform Agnostic</CardHeading>
              Design and develop experiences for any platform.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <StyledGridItem gridColumn="2">
          <CardGrid background={magma.colors.neutral200}>
            <CardIcon>
              <ExtensionIcon color={magma.colors.neutral100} />
            </CardIcon>
            <CardBody>
              <CardHeading>Scalable</CardHeading>
              Manage design at scale with a design system that evolves as needs
              change.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <StyledGridItem gridColumn="1">
          <CardGrid background={magma.colors.neutral200}>
            <CardIcon>
              <TimelineIcon color={magma.colors.neutral100} />
            </CardIcon>
            <CardBody>
              <CardHeading>Efficient</CardHeading>
              Save time so you can focus on larger issues of usability and
              meaning.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <StyledGridItem gridColumn="2">
          <CardGrid background={magma.colors.neutral200}>
            <CardIcon>
              <GroupsIcon color={magma.colors.neutral100} />
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

          <IconButton
            icon={<GithubIcon />}
            aria-label="Start Contributing"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.open(
                  'https://github.com/cengage/react-magma/',
                  '_blank'
                );
              }
            }}
          >
            Start Contributing
          </IconButton>
        </CenterBlock>
      </StyledGrid>
    </div>
  );
}
