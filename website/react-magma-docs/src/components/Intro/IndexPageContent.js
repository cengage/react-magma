/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Grid, GridItem } from 'react-magma-dom';
import { Heading } from 'react-magma-dom';
import { Button } from 'react-magma-dom';
import { Card, CardBody, CardHeading } from 'react-magma-dom';
import { magma } from 'react-magma-dom';

export class IndexPageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 'sectionIntro',
    };

    this.handleAnimateIn = this.handleAnimateIn.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  handleAnimateIn(id, v) {
    if (v.inViewport) {
      this.setState({
        activeSection: id,
      });
    }
  }

  handleNavClick(id) {
    this.setState({
      activeSection: id,
    });
    const focused = document.querySelector(`#${id}H`);
    focused.focus({ preventScroll: true });
    window.scrollTo({ top: focused.offsetTop, behavior: 'smooth' });
  }

  render() {
    return (
      <Grid
        gridTemplateColumns="1fr 1fr"
        gridTemplateRows="auto"
        gridGap="1em"
        style={{ padding: '2em 1em' }}
      >
        <GridItem gridColumn="1 / 3">
          <Heading level={1}>React Magma Design System</Heading>
          <p>
            React Magma is Cengage's open source design system for creating
            digital experiences with React.
          </p>
        </GridItem>

        <Card background={magma.colors.neutral07}>
          <CardBody>
            <CardHeading>Designing</CardHeading>
            Start working in Sketch with ready-made UI components such as
            inputs, buttons, and more! To see how a component works and behaves,
            please refer to the usage guidelines on this site.
            <Button>Start Designing</Button>
          </CardBody>
        </Card>

        <Card background={magma.colors.neutral07}>
          <CardBody>
            <CardHeading>Developing</CardHeading>
            Use the documentation on this site to guide your development, and
            grab the code on github when you're ready to get started.
            <Button>Start Developing</Button>
          </CardBody>
        </Card>

        <GridItem gridColumn="1 / 3" style={{ textAlign: 'center' }}>
          <Heading level={2}>Working smarter, not harder</Heading>
          <p>
            Standardized cmponents support collaboration, reinforce branding,
            and provide a consistent look and user experience.
          </p>
        </GridItem>
        <GridItem gridColumn="1">
          <Card background={magma.colors.neutral07}>
            <CardBody>
              <CardHeading>Accessible</CardHeading>
              Designed and developed for WCAG 2.1 compliance.
            </CardBody>
          </Card>
        </GridItem>
        <GridItem gridColumn="2">
          <Card background={magma.colors.neutral07}>
            <CardBody>
              <CardHeading>Themeable</CardHeading>
              Easily theme all components with your brand's specific styles.
            </CardBody>
          </Card>
        </GridItem>
        <GridItem gridColumn="1">
          <Card background={magma.colors.neutral07}>
            <CardBody>
              <CardHeading>Platform Agnostic</CardHeading>
              Design and develop experiences for any platform.
            </CardBody>
          </Card>
        </GridItem>
        <GridItem gridColumn="2">
          <Card background={magma.colors.neutral07}>
            <CardBody>
              <CardHeading>Scalable</CardHeading>
              Manage design at scale with a design system that evolves as needs
              change.
            </CardBody>
          </Card>
        </GridItem>
        <GridItem gridColumn="1">
          <Card background={magma.colors.neutral07}>
            <CardBody>
              <CardHeading>Efficient</CardHeading>
              Save time so you can focus on larger issues of usability and
              meaning.
            </CardBody>
          </Card>
        </GridItem>
        <GridItem gridColumn="2">
          <Card background={magma.colors.neutral07}>
            <CardBody>
              <CardHeading>Living</CardHeading>
              Open source design system that is constantly expanding.
            </CardBody>
          </Card>
        </GridItem>
        <GridItem gridColumn="1 / 3" style={{ textAlign: 'center' }}>
          <Heading level={2}>Want to contribute?</Heading>
          <p>
            We welcome all ideas and feedback to help us produce the best
            possible experience for our users. If you're interested in
            contributing, review our contribution guidelines to get started.
          </p>
          <Button>Start Contributing</Button>
        </GridItem>
      </Grid>
    );
  }
}
