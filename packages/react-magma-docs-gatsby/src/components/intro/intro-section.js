import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';

export const StyledSection = styled.section`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: auto;
    max-width: 1100px;
    margin: 0 auto;
    padding: 80px 5%;

    @media (min-width: 600px) {
        flex-direction: row;
        height: 100vh;
        padding: 0 10%;
    }
`;

const ImgContainer = styled.div`
    flex-shrink: 0;
    width: 100%;

    @media (min-width: 600px) {
        margin-right: 30px;
        width: 30%;
    }
`;

const IntroSection = ({ children, id, image }) => (
    <StyledSection id={id}>
        { image && 
            <ImgContainer>
                {image}
            </ImgContainer> 
        }
        <div>
            {children}
        </div>
    </StyledSection>
);

IntroSection.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.node
}

export default IntroSection

