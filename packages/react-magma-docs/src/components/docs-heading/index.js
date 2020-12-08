import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import {
  Heading,
  Hyperlink,
  Paragraph,
  TypographyVisualStyle,
  magma,
  TypographyColor,
} from 'react-magma-dom';
import { CodeIcon, PaletteIcon } from 'react-magma-icons';

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${magma.breakpoints.small}px) {
    align-items: center;
    flex-direction: row;
  }
`;

const ButtonContainer = styled.div`
  margin-bottom: ${magma.spaceScale.spacing06};
  @media (min-width: ${magma.breakpoints.small}px) {
    margin: 0;
  }
`;

const ButtonSpan = styled.span`
  padding-left: ${magma.spaceScale.spacing03};
`;

const DocsHeading = ({ children, to, type }) => (
  <Container>
    <div>
      <Paragraph
        color={TypographyColor.subdued}
        noMargins
        visualStyle={TypographyVisualStyle.heading2XSmall}
      >
        {type === 'api' ? 'Component API' : 'Design Guidelines'}
      </Paragraph>
      <Heading level={1}>{children}</Heading>
    </div>
    {type === 'api' && to && (
      <ButtonContainer>
        <Hyperlink color="secondary" styledAs="Button" to={to}>
          {linkProps => (
            <Link {...linkProps}>
              <PaletteIcon size="16" />
              <ButtonSpan>View Design Guidelines</ButtonSpan>
            </Link>
          )}
        </Hyperlink>
      </ButtonContainer>
    )}

    {type === 'design' && to && (
      <ButtonContainer>
        <Hyperlink color="secondary" styledAs="Button" to={to}>
          {linkProps => (
            <Link {...linkProps}>
              <CodeIcon size="16" />
              <ButtonSpan>View Component API</ButtonSpan>
            </Link>
          )}
        </Hyperlink>
      </ButtonContainer>
    )}
  </Container>
);

DocsHeading.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  type: PropTypes.oneOf(['api', 'design']).isRequired,
};

export default DocsHeading;
