import React from 'react';
import { Link } from 'gatsby';
import { CodeIcon, PaletteIcon } from 'react-magma-icons';
import { Hyperlink, ThemeContext } from 'react-magma-dom';
import IntroHeading from './intro-heading';
import IntroSection from './intro-section';
import NavItem from './nav-item';
import HexBackground from './hex-background';
import styled from '@emotion/styled';

import ColorLogo from '../../images/React_Magma_Logo_Color.svg';
import ImageAccessible from '../../images/img-accessible.svg';
import ImageComponents from '../../images/img-component-based.svg';
import ImageDevice from '../../images/img-device-agnostic.svg';
import ImageEvolving from '../../images/img-evolving.svg';
import ImageQuality from '../../images/img-quality.svg';

const Heading = styled.h1`
  && {
    color: inherit;
    font-family: ${props => props.theme.bodyFont};
    font-size: 56px;
    font-weight: 600;
    line-height: 64px;
    text-align: center;
    margin-top: -240px;
    padding-top: 240px;
    text-align: center;
    text-transform: uppercase;

    &:focus {
      border-bottom: 2px dotted ${props => props.theme.colors.neutral08};
    }

    @media (min-width: ${props => props.theme.breakpoints.medium}px) {
      font-size: 6.4em;
      line-height: 1.2;
    }

    @media (min-width: ${props => props.theme.breakpoints.small}px) {
      text-align: left;
    }
  }
`;

const List = styled.ol`
  display: none;

  @media (min-width: ${props => props.theme.breakpoints.medium}px) {
    background-color: ${props => props.theme.colors.foundation01};
    display: flex;
    left: 0;
    list-style: none;
    justify-content: space-between;
    margin: 0;
    padding: 0 20px;
    position: fixed;
    right: 0;
    top: 80px;
    z-index: 2;
  }

  @media (min-width: ${props => props.theme.breakpoints.large}px) {
    left: 280px;
  }
`;

const ButtonContainer = styled.div`
  text-align: center;

  a {
    min-width: 325px;

    span {
      margin-left: 10px;
    }
  }

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    text-align: left;
  }
`;

const Footer = styled.footer`
  background: ${props => props.theme.colors.foundation01};
  padding: 80px 10%;
  position: relative;
  text-align: center;
`;

const FooterPara = styled.p`
  font-size: 1.5em;
  line-height: 1.5em;
  margin: 0 auto;
  max-width: 750px;

  a {
    color: inherit !important;
  }
`;

export class IndexPageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 'sectionIntro'
    };

    this.handleAnimateIn = this.handleAnimateIn.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  handleAnimateIn(id, v) {
    if (v.inViewport) {
      this.setState({
        activeSection: id
      });
    }
  }

  handleNavClick(id) {
    this.setState({
      activeSection: id
    });
    const focused = document.querySelector(`#${id}H`);
    focused.focus({ preventScroll: true });
    window.scrollTo({ top: focused.offsetTop, behavior: 'smooth' });
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <>
            <nav aria-label="Introduction to React Magma navigation">
              <List theme={theme}>
                <NavItem
                  activeSection={this.state.activeSection}
                  number="00"
                  onClick={this.handleNavClick}
                  section="sectionIntro"
                  text="Intro"
                />
                <NavItem
                  activeSection={this.state.activeSection}
                  number="01"
                  onClick={this.handleNavClick}
                  section="sectionComponents"
                  text="Component-based"
                />
                <NavItem
                  activeSection={this.state.activeSection}
                  number="02"
                  onClick={this.handleNavClick}
                  section="sectionQuality"
                  text="Quality"
                />
                <NavItem
                  activeSection={this.state.activeSection}
                  number="03"
                  onClick={this.handleNavClick}
                  section="sectionAccessible"
                  text="Accessible"
                />
                <NavItem
                  activeSection={this.state.activeSection}
                  number="04"
                  onClick={this.handleNavClick}
                  section="sectionDevice"
                  text="Device-agnostic"
                />
                <NavItem
                  activeSection={this.state.activeSection}
                  number="05"
                  onClick={this.handleNavClick}
                  section="sectionEvolving"
                  text="Always evolving"
                />
              </List>
            </nav>

            <HexBackground>
              <IntroSection
                section="sectionIntro"
                image={<ColorLogo style={{ width: '100%' }} />}
                afterAnimatedIn={this.handleAnimateIn}
                style={{ marginTop: '70px' }}
              >
                <Heading id="sectionIntroH" tabIndex={-1} theme={theme}>
                  React Magma
                </Heading>
                <p style={{ marginBottom: '20px' }}>
                  React Magma is a suite of React components based on the Magma
                  design system that make it easy to create powerful and
                  consistent experiences for students and instructors using
                  Cengage products.
                </p>
                <ButtonContainer theme={theme}>
                  <Hyperlink
                    styledAs="Button"
                    isInverse
                    to="/api-intro/introduction"
                  >
                    {({ stylesClass }) => (
                      <Link
                        className={stylesClass}
                        to="/api-intro/introduction"
                        style={{ marginBottom: '20px' }}
                      >
                        <CodeIcon size="16" />
                        <span>Develop with React Magma</span>
                      </Link>
                    )}
                  </Hyperlink>
                  <br />
                  <Hyperlink
                    styledAs="Button"
                    isInverse
                    to="/design-intro/introduction"
                  >
                    {({ stylesClass }) => (
                      <Link
                        className={stylesClass}
                        to="/design-intro/introduction"
                      >
                        <PaletteIcon size="16" />
                        <span>Design with React Magma</span>
                      </Link>
                    )}
                  </Hyperlink>
                </ButtonContainer>
              </IntroSection>

              <IntroSection
                section="sectionComponents"
                image={<ImageComponents style={{ width: '100%' }} />}
                afterAnimatedIn={this.handleAnimateIn}
              >
                <IntroHeading
                  id="sectionComponentsH"
                  number="01"
                  name="Component-based"
                />
                <p>
                  Components are the building blocks of React applications. With
                  React Magma, we've built on this fundamental concept to
                  provide ready-to-go user interface elements. These elements
                  have quality, accessibility and branding baked in. This means
                  you can focus your energy on solving problems for students and
                  instructors without having to worry about the atomic building
                  blocks for the UI.
                </p>
              </IntroSection>

              <IntroSection
                section="sectionQuality"
                image={<ImageQuality style={{ width: '100%' }} />}
                afterAnimatedIn={this.handleAnimateIn}
              >
                <IntroHeading id="sectionQualityH" name="Quality" number="02" />
                <p>
                  Every component goes through a rigorous process to ensure it
                  meets our standards for quality. This includes design,
                  branding, performance, and WCAG 2.0 compliance.
                </p>
              </IntroSection>

              <IntroSection
                section="sectionAccessible"
                image={<ImageAccessible style={{ width: '100%' }} />}
                afterAnimatedIn={this.handleAnimateIn}
              >
                <IntroHeading
                  id="sectionAccessibleH"
                  name="Accessible"
                  number="03"
                />
                <p>
                  React Magma components come with accessibility already baked
                  in, including keyboard behavior and the management of ARIA
                  roles and properties.
                </p>
              </IntroSection>

              <IntroSection
                section="sectionDevice"
                image={<ImageDevice style={{ width: '100%' }} />}
                afterAnimatedIn={this.handleAnimateIn}
              >
                <IntroHeading
                  id="sectionDeviceH"
                  name="Device-agnostic"
                  number="04"
                />
                <p>
                  React Magma is designed and developed to provide a single
                  system that unifies the user experience across platforms,
                  devices, and input methods.
                </p>
                <p>React Native components coming soon!</p>
              </IntroSection>

              <IntroSection
                section="sectionEvolving"
                image={<ImageEvolving style={{ width: '100%' }} />}
                afterAnimatedIn={this.handleAnimateIn}
              >
                <IntroHeading
                  id="sectionEvolvingH"
                  name="Always Evolving"
                  number="05"
                />
                <p>
                  The React Magma team actively designs, develops, tests, and
                  maintains the design system. If you have any requests for new
                  components or if you find any bugs, please contact the team.
                </p>
              </IntroSection>
            </HexBackground>

            <Footer theme={theme}>
              <IntroHeading isCta name="Contact us anytime" />
              <FooterPara>
                If you have questions or you’d like to be personally involved in
                helping React Magma be the best it can be, please reach out to
                us on Slack —{' '}
                <a href="https://cengage.slack.com/app_redirect?channel=react-magma">
                  #react-magma
                </a>
                .
              </FooterPara>
            </Footer>
          </>
        )}
      </ThemeContext.Consumer>
    );
  }
}
