import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import IntroImage from './intro-image'

export const StyledSection = styled.section`
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 100vh;
    max-width: 1100px;
    margin: 0 auto;
`;

const ImgContainer = styled.div`
    max-height: 315px;
    max-width: 315px;
    flex-shrink: 0;
    height: 315px;
    margin-right: 30px;
    width: 315px;
`;

const IntroSection = ({ children, id }) => (
    <StyledSection id={id}>
        <ImgContainer>
            <IntroImage />
        </ImgContainer>
        <div>
            {children}
        </div>
    </StyledSection>
);

IntroSection.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired
}

export default IntroSection

