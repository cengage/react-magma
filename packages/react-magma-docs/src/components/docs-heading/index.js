import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { Hyperlink } from 'react-magma-dom';
import { CodeIcon, PaletteIcon } from 'react-magma-icons';

const StyledDiv = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (min-width: 600px) {
    align-items: center;
    flex-direction: row;
  }
`;

const Heading = styled.h1`
  margin: 0 0 20px;

  @media (min-width: 600px) {
    margin: 0;
  }
`;

const DocsHeading = ({ children, to, type }) => (
  <StyledDiv>
    <Heading>{children}</Heading>

    {type === 'design' && to && (
      <Hyperlink color="secondary" styledAs="Button" to={to}>
        {linkProps => (
          <Link {...linkProps}>
            <PaletteIcon size="16" />
            <span style={{ paddingLeft: '8px' }}>View Design Guidelines</span>
          </Link>
        )}
      </Hyperlink>
    )}

    {type === 'code' && to && (
      <Hyperlink color="secondary" styledAs="Button" to={to}>
        {linkProps => (
          <Link {...linkProps}>
            <CodeIcon size="16" />
            <span style={{ paddingLeft: '8px' }}>View Component API</span>
          </Link>
        )}
      </Hyperlink>
    )}
  </StyledDiv>
);

DocsHeading.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  type: PropTypes.oneOf(['code', 'design']),
};

export default DocsHeading;
