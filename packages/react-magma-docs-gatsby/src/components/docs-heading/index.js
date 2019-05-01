import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import { Link } from 'gatsby'
import { Button, CodeIcon, PaletteIcon } from 'react-magma-dom'

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

        {(type === 'design' && to)  && (
            <Button as={Link} color="secondary" icon={<PaletteIcon />} to={to}>
                View Design Guidelines
            </Button>
        )}

        {(type === 'code' && to)  && (
            <Button as={Link} color="secondary" icon={<CodeIcon />} to={to}>
                View Component API
            </Button>
        )}
        
    </StyledDiv>
);

DocsHeading.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    type: PropTypes.oneOf(['code', 'design'])
  }

export default DocsHeading
