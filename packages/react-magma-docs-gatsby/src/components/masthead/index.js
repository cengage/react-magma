import React from 'react'
import Logo from '../Logo'
import styled from '@emotion/styled';

const StyledHeader = styled.header`
    background: #003865;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,0.37);
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    grid-area: masthead;
    position: sticky;
    text-transform: uppercase;
    top: 0;
    z-index: 2;

    @media (min-width: 600px) {
        font-size: 20px;
    }
`;

const InnerHeader = styled.div`
    align-items: center;
    display: flex;
    height: 50px;
    justify-content: center;
    margin: 0 auto;
    max-width: 750px;
    width: 80%;

    @media (min-width: 600px) {
        height: 80px;
        margin: 0 0 0 60px;
        justify-content: flex-start;
    }

    @media (min-width: 1024px) {
        margin: 0 0 0 20px;
    }
`;

const LogoContainer = styled.div`
    height: 32px;
    margin-right: 20px;
    width: 28px;

    @media (min-width: 600px) {
        height: 40px;   
        width: 35px;
    }
`;

const Masthead = () => (
    <StyledHeader>
        <InnerHeader>
            <LogoContainer>
                <Logo />
            </LogoContainer>
            React Magma
        </InnerHeader>
    </StyledHeader>
);

export default Masthead
