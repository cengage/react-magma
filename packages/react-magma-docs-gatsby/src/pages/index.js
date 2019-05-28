import React from 'react'
import Layout from '../components/layout'
import { Button } from 'react-magma-dom'
import IntroHeading from '../components/intro/intro-heading'


const IndexPage = () => (
  <Layout>
      <div style={{color: '#fff', background: '#00263E', padding: '20px'}}>
       
        <section id="sectionIntro">
          <h1>React Magma</h1>
          <p>React Magma is a suite of React components based on the Magma design system that make it easy to create powerful and consistent experiences for students and instructors using Cengage products.</p>
          <Button inverse>Develop with React Magma</Button>
          <Button inverse>Design with React Magma</Button>
        </section>
        <section id="sectionComponents">
          <IntroHeading number="01">
            Component-based
          </IntroHeading>
          <p>Components are the building blocks of React applications. With React Magma, we've built on this fundamental concept to provide ready-to-go user interface elements. These elements have quality, accessibility and branding baked in. This means you can focus your energy on solving problems for students and instructors without having to worry about the atomic building blocks for the UI.</p>
        </section>
        <section id="sectionQuality">
          <IntroHeading number="02">
            Quality
          </IntroHeading>
          <p>Every component goes through a rigorous process to ensure it meets our standards for quality. This includes design, branding, performance, and WCAG 2.0 compliance.</p>
        </section>
        <section id="sectionAccessible">
          <IntroHeading number="03">
            Accessible
          </IntroHeading>
          <p>React Magma components come with accessibility already baked in, including keyboard behavior and the management of ARIA roles and properties.</p>
        </section>
        <section id="sectionDevice">
          <IntroHeading number="04">
            Device
          </IntroHeading>
          <p>React Magma is designed and developed to provide a single system that unifies the user experience across platforms, devices, and input methods.</p>
          <p>React Native components coming soon!</p>
        </section>
        <section id="sectionEvolving">
          <IntroHeading number="05">
            Always Evolving
          </IntroHeading>
          <p>The React Magma team actively designs, develops, tests, and maintains the design system. If you have any requests for new components or if you find any bugs, please contact the team.</p>
        </section>
      </div>
  </Layout>
)

export default IndexPage
