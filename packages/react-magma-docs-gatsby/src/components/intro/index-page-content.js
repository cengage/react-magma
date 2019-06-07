import React from 'react'
import { Link } from 'gatsby'
import { Button, CodeIcon, PaletteIcon, ThemeContext } from 'react-magma-dom'
import IntroHeading from './intro-heading'
import IntroSection from './intro-section'
import NavItem from './nav-item'
import HexBackground from './hex-background'
import styled from '@emotion/styled'

import ColorLogo from '../../images/React_Magma_Logo_Color.svg'
import ImageAccessible from '../../images/img-accessible.svg'
import ImageComponents from '../../images/img-component-based.svg'
import ImageDevice from '../../images/img-device-agnostic.svg'
import ImageEvolving from '../../images/img-evolving.svg'
import ImageQuality from '../../images/img-quality.svg'

const Heading = styled.h1`
  font-family:  ${props => props.theme.bodyFont};  
  font-size: 3.4em;
  font-weight: 600;
  text-align: center;      
  text-transform: uppercase;

  @media (min-width: ${props => props.theme.sizeSm}) {
    font-size: 6.4em;
  }

  @media (min-width: ${props => props.theme.sizeXs}) {
    text-align: left;
  }
`;

const List = styled.ol`
    display: none;

    @media (min-width: ${props => props.theme.sizeSm}) {
        background-color: ${props => props.theme.colors.neutral01};
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

    @media (min-width: ${props => props.theme.sizeMd}) {
        left: 280px;
    }
`;

const ButtonContainer = styled.div`
    text-align: center;

    @media (min-width: ${props => props.theme.sizeXs}) {
      text-align: left;
    }
`;

const Footer = styled.footer`
    background: ${props => props.theme.colors.neutral01};
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
      })
    }
  };

  handleNavClick(id) {
    this.setState({
      activeSection: id
    })
  };

  render() {
    return(
      <ThemeContext.Consumer>
        {theme => (
          <>
            <nav>
              <List theme={theme}>
                  <NavItem
                    activeSection={this.state.activeSection}
                    id="sectionIntro"
                    number="00"
                    onClick={this.handleNavClick}
                    text="Intro"  />
                  <NavItem
                    activeSection={this.state.activeSection}
                    id="sectionComponents"
                    number="01"
                    onClick={this.handleNavClick}
                    text="Component-based"  />
                  <NavItem
                    activeSection={this.state.activeSection}
                    id="sectionQuality"
                    number="02"
                    onClick={this.handleNavClick}
                    text="Quality"  />
                  <NavItem
                    activeSection={this.state.activeSection}
                    id="sectionAccessible"
                    number="03"
                    onClick={this.handleNavClick}
                    text="Accessible"  />
                  <NavItem
                    activeSection={this.state.activeSection}
                    id="sectionDevice"
                    number="04"
                    onClick={this.handleNavClick}
                    text="Device-agnostic"  />
                  <NavItem
                    activeSection={this.state.activeSection}
                    id="sectionEvolving"
                    number="05"
                    onClick={this.handleNavClick}
                    text="Always evolving"  />
              </List>
            </nav>

            <HexBackground>
              <IntroSection
                id="sectionIntro"
                image={<ColorLogo style={{width: '100%'}} />}
                afterAnimatedIn={this.handleAnimateIn}
                style={{marginTop: '70px'}}>
                  <Heading theme={theme}>React Magma</Heading>
                  <p style={{marginBottom: '20px'}}>React Magma is a suite of React components based on the Magma design system that make it easy to create powerful and consistent experiences for students and instructors using Cengage products.</p>
                  <ButtonContainer theme={theme}>
                    <Button
                      as={Link}
                      icon={<CodeIcon />}
                      iconPosition='left'
                      inverse
                      style={{minWidth: '325px', marginBottom: '20px'}}
                      to="/api-introduction">Develop with React Magma</Button><br/>
                    <Button
                      as={Link}
                      icon={<PaletteIcon />}
                      iconPosition='left'
                      inverse
                      style={{minWidth: '325px'}}
                      to="/design-introduction">Design with React Magma</Button>
                  </ButtonContainer>
                </IntroSection>

                <IntroSection
                  id="sectionComponents"
                  image={<ImageComponents style={{width: '100%'}} />}
                  afterAnimatedIn={this.handleAnimateIn}>
                  <IntroHeading number='01' name='Component-based' />
                  <p>Components are the building blocks of React applications. With React Magma, we've built on this fundamental concept to provide ready-to-go user interface elements. These elements have quality, accessibility and branding baked in. This means you can focus your energy on solving problems for students and instructors without having to worry about the atomic building blocks for the UI.</p>
                </IntroSection>

                <IntroSection
                  id="sectionQuality"
                  image={<ImageQuality style={{width: '100%'}} />}
                  afterAnimatedIn={this.handleAnimateIn}>
                  <IntroHeading name="Quality" number="02" />
                  <p>Every component goes through a rigorous process to ensure it meets our standards for quality. This includes design, branding, performance, and WCAG 2.0 compliance.</p>
                </IntroSection>

                <IntroSection
                  id="sectionAccessible"
                  image={<ImageAccessible style={{width: '100%'}} />}
                  afterAnimatedIn={this.handleAnimateIn}>
                  <IntroHeading name="Accessible" number="03" />
                  <p>React Magma components come with accessibility already baked in, including keyboard behavior and the management of ARIA roles and properties.</p>
                </IntroSection>

                <IntroSection
                  id="sectionDevice"
                  image={<ImageDevice style={{width: '100%'}} />}
                  afterAnimatedIn={this.handleAnimateIn}>
                  <IntroHeading name="Device" number="04"/>
                  <p>React Magma is designed and developed to provide a single system that unifies the user experience across platforms, devices, and input methods.</p>
                  <p>React Native components coming soon!</p>
                </IntroSection>
                
                <IntroSection
                  id="sectionEvolving"
                  image={<ImageEvolving style={{width: '100%'}} />}
                  afterAnimatedIn={this.handleAnimateIn}>
                  <IntroHeading  name="Always Evolving" number="05" />
                  <p>The React Magma team actively designs, develops, tests, and maintains the design system. If you have any requests for new components or if you find any bugs, please contact the team.</p>
                </IntroSection>
            </HexBackground>
            
            <Footer theme={theme}>
              <IntroHeading isCta name="Contact us anytime" />
              <FooterPara>If you have questions or you’d like to be personally involved in helping React Magma be the best it can be, please reach out to us on Slack — <a href="https://cengage.slack.com/app_redirect?channel=magma">#magma</a>.</FooterPara>
            </Footer>
          </>
        )}
      </ThemeContext.Consumer>
    )
  }
}