import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';

export const StyledSection = styled.section`
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 100vh;
    max-width: 1100px;
    margin: 0 auto;
`;

const ImgContainer = styled.div`
    flex-shrink: 0;
    margin-right: 30px;
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

