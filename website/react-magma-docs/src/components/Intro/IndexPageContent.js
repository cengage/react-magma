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
      margin: 0 auto ${magma.spaceScale.spacing05};
      order: -1;
    }
  }
`;

const HeaderText = styled.div`
  width: 66%;

  > h1 {
    margin-bottom: 16px;
  }

  > h2 {
    margin-top: 0;
  }

  @media (max-width: ${magma.breakpoints.small}px) {
    width: 100%;
  }
`;

const CenterBlock = styled.div`
  grid-column: 1 / 3;
  margin: auto;
  text-align: center;
`;

const IntroCenterBlock = styled(CenterBlock)`
  padding-bottom: 24px;

  > h2 {
    margin-bottom: 16px;
    margin-top: 24px;
  }
`;

const CardGrid = styled(Card)`
  display: grid;
  grid-template-columns: min-content auto;

  h4 {
    margin-bottom: 0;
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${magma.spaceScale.spacing04};
  margin-top: ${magma.spaceScale.spacing05};

  @media (max-width: ${magma.breakpoints.small}px) {
    justify-content: center;
  }
`;

const HeroDivider = styled.hr`
  border: 0;
  border-top: 1px solid ${magma.colors.neutral200};
  margin: 40px ${magma.spaceScale.spacing06} ${magma.spaceScale.spacing06};
`;

const ContributeButton = styled(IconButton)`
  margin-bottom: 24px;
`;

const CardIcon = styled(Flex)`
  height: 56px;
  width: 56px;
  border-radius: 8px;
  margin: ${magma.spaceScale.spacing06} 0 0 ${magma.spaceScale.spacing06};
  background-color: ${magma.colors.neutral150};

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

export function IndexPageContent() {
  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <HeaderBlock>
        <HeaderText>
          <Heading level={1}>Magma Design&nbsp;System</Heading>
          <Heading level={2} visualStyle={TypographyVisualStyle.bodyLarge}>
            Magma is Cengage's open source design system for creating digital
            experiences with React.
          </Heading>
          <HeroActions>
            <Hyperlink
              styledAs="Button"
              to="/design-intro/get-started/"
              color="marketing"
            >
              {linkProps => (
                <Link {...linkProps}>
                  <span>Start Designing</span>
                </Link>
              )}
            </Hyperlink>
            <Hyperlink
              styledAs="Button"
              to="/api-intro/introduction"
              color="marketing"
            >
              {linkProps => (
                <Link {...linkProps}>
                  <span>Start Developing</span>
                </Link>
              )}
            </Hyperlink>
          </HeroActions>
        </HeaderText>
        <Logo />
      </HeaderBlock>

      <HeroDivider />

      <StyledGrid gridGap={magma.spaceScale.spacing06}>
        <IntroCenterBlock>
          <Heading level={2}>Working smarter, not&nbsp;harder</Heading>
          <div>
            Standardized components support collaboration, reinforce branding,
            and provide a consistent look and user experience.
          </div>
        </IntroCenterBlock>

        <StyledGridItem gridColumn="1">
          <CardGrid>
            <CardIcon>
              <AccessibilityIcon color={magma.colors.brand.navy} />
            </CardIcon>
            <CardBody>
              <CardHeading>Accessible</CardHeading>
              Designed and developed for WCAG 2.2 compliance.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <StyledGridItem gridColumn="2">
          <CardGrid>
            <CardIcon>
              <PaletteIcon color={magma.colors.brand.navy} />
            </CardIcon>
            <CardBody>
              <CardHeading>Themeable</CardHeading>
              Easily theme all components with your brand's specific styles.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <StyledGridItem gridColumn="1">
          <CardGrid>
            <CardIcon>
              <DevicesIcon color={magma.colors.brand.navy} />
            </CardIcon>
            <CardBody>
              <CardHeading>Platform Agnostic</CardHeading>
              Design and develop experiences for any platform.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <StyledGridItem gridColumn="2">
          <CardGrid>
            <CardIcon>
              <ExtensionIcon color={magma.colors.brand.navy} />
            </CardIcon>
            <CardBody>
              <CardHeading>Scalable</CardHeading>
              Manage design at scale with a design system that evolves as needs
              change.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <StyledGridItem gridColumn="1">
          <CardGrid>
            <CardIcon>
              <TimelineIcon color={magma.colors.brand.navy} />
            </CardIcon>
            <CardBody>
              <CardHeading>Efficient</CardHeading>
              Save time so you can focus on larger issues of usability and
              meaning.
            </CardBody>
          </CardGrid>
        </StyledGridItem>
        <StyledGridItem gridColumn="2">
          <CardGrid>
            <CardIcon>
              <GroupsIcon color={magma.colors.brand.navy} />
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
            contributing, review our{' '}
            <Hyperlink hasUnderline to="/contribution-guidelines/">
              {linkProps => <Link {...linkProps}>contribution guidelines</Link>}
            </Hyperlink>{' '}
            to get started.
          </p>

          <ContributeButton
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
          </ContributeButton>
        </CenterBlock>
      </StyledGrid>
    </div>
  );
}
