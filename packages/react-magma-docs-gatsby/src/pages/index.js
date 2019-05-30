import React from 'react'
import Layout from '../components/layout'
import { Button, CodeIcon, PaletteIcon } from 'react-magma-dom'
import IntroHeading from '../components/intro/intro-heading'
import IntroSection from '../components/intro/intro-section'
import IntroNav from '../components/intro/intro-nav'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled';
import "animate.css/animate.min.css";

import ColorLogo from '../images/React_Magma_Logo_Color.svg'
import ImageAccessible from '../images/img-accessible.svg'
import ImageComponents from '../images/img-component-based.svg'
import ImageDevice from '../images/img-device-agnostic.svg'
import ImageEvolving from '../images/img-evolving.svg'
import ImageQuality from '../images/img-quality.svg'

const Heading = styled.h1`
  font-family:  "Open Sans", sans-serif;  
  font-size: 3.4em;
  font-weight: normal;
  text-align: center;      
  text-transform: uppercase;

  @media (min-width: 768px) {
    font-size: 6.4em;
  }

  @media (min-width: 600px) {
    text-align: left;
  }
`;

const Footer = styled.footer`
    background: #00263E;
    padding: 80px 10%;
    text-align: center;
`;

const ButtonContainer = styled.div`
    text-align: center;

    @media (min-width: 600px) {
      text-align: left;
    }
`;

const IndexPage = () => (
  <Layout>
    <Global styles={css`
      @import url('https://fonts.googleapis.com/css?family=Abel');
      .content { background: #00263E; color: #fff; padding: 0; overflow: hidden; } 
      .content-article { background: #003865; margin: 0; max-width: none; padding: 0; width: auto; } 
    `} />
    <IntroNav />

    <IntroSection
      id="sectionIntro"
      image={<ColorLogo style={{width: '100%'}} />}
      noAnimate
      style={{marginTop: '70px'}}>
        <Heading>React Magma</Heading>
        <p style={{marginBottom: '20px'}}>React Magma is a suite of React components based on the Magma design system that make it easy to create powerful and consistent experiences for students and instructors using Cengage products.</p>
        <ButtonContainer>
          <Button
            icon={<CodeIcon />}
            iconPosition='left'
            inverse
            style={{minWidth: '325px', marginBottom: '20px'}}>Develop with React Magma</Button><br/>
          <Button
            icon={<PaletteIcon />}
            iconPosition='left'
            inverse
            style={{minWidth: '325px'}}>Design with React Magma</Button>
        </ButtonContainer>
    </IntroSection>

    <IntroSection
      id="sectionComponents"
      image={<ImageComponents style={{width: '100%'}} />}>
      <IntroHeading number='01' name='Component-based' />
      <p>Components are the building blocks of React applications. With React Magma, we've built on this fundamental concept to provide ready-to-go user interface elements. These elements have quality, accessibility and branding baked in. This means you can focus your energy on solving problems for students and instructors without having to worry about the atomic building blocks for the UI.</p>
    </IntroSection>

    <IntroSection
      id="sectionQuality"
      image={<ImageQuality style={{width: '100%'}} />}>
      <IntroHeading name="Quality" number="02" />
      <p>Every component goes through a rigorous process to ensure it meets our standards for quality. This includes design, branding, performance, and WCAG 2.0 compliance.</p>
    </IntroSection>

    <IntroSection
      id="sectionAccessible"
      image={<ImageAccessible style={{width: '100%'}} />}>
      <IntroHeading name="Accessible" number="03" />
      <p>React Magma components come with accessibility already baked in, including keyboard behavior and the management of ARIA roles and properties.</p>
    </IntroSection>

    <IntroSection
      id="sectionDevice"
      image={<ImageDevice style={{width: '100%'}} />}>
      <IntroHeading name="Device" number="04"/>
      <p>React Magma is designed and developed to provide a single system that unifies the user experience across platforms, devices, and input methods.</p>
      <p>React Native components coming soon!</p>
    </IntroSection>
    
    <IntroSection
      id="sectionEvolving"
      image={<ImageEvolving style={{width: '100%'}} />}>
      <IntroHeading  name="Always Evolving" number="05" />
      <p>The React Magma team actively designs, develops, tests, and maintains the design system. If you have any requests for new components or if you find any bugs, please contact the team.</p>
    </IntroSection>

    <Footer>
      <h2 style={{margin: '0 0 0.5em 0', padding: 0, textTransform: 'uppercase'}}>Contact us anytime</h2>
      <p style={{ fontSize: '1.5em', lineHeight: '1.5em'}}>If you have questions or you’d like to be personally involved in helping React Magma be the best it can be, please reach out to us on Slack — #magma.</p>
    </Footer>
  </Layout>
)

export default IndexPage
