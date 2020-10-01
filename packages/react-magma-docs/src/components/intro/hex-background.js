import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import BackgroundImage from 'gatsby-background-image';

const BackgroundContainer = ({ className, children }) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "hex-bg-1.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.desktop.childImageSharp.fluid;
      return (
        <BackgroundImage
          Tag="div"
          className={className}
          fluid={imageData}
          backgroundColor={`transparent`}
        >
          {children}
        </BackgroundImage>
      );
    }}
  />
);

const HexBackground = styled(BackgroundContainer)`
  background-attachment: fixed;
  background-size: 498px auto;
  background-repeat: repeat;
  height: 100%;
  width: 100%;
`;

export default HexBackground;
