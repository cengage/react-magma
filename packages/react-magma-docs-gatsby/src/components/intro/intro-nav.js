import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';

const StyledList = styled.ol`
   display: flex;
`;


const StyledItem = styled.li`
   
`;

const StyledLink = styled.a`
   color: #fff;
`;

const IntroNav = ({ children, number }) => (
    <nav>
        <StyledList>
        <StyledItem><StyledLink href="#sectionIntro">Intro</StyledLink></StyledItem>
        <StyledItem><StyledLink href="#sectionComponents">Component-based</StyledLink></StyledItem>
        <StyledItem><StyledLink href="#sectionQuality">Quality</StyledLink></StyledItem>
        <StyledItem><StyledLink href="#sectionAccessible">Accessible</StyledLink></StyledItem>
        <StyledItem><StyledLink href="#sectionDevice">Device-agnostic</StyledLink></StyledItem>
        <StyledItem><StyledLink href="#sectionEvolving">Always evolving</StyledLink></StyledItem>
        </StyledList>
    </nav>
);

IntroNav.propTypes = {
    children: PropTypes.node.isRequired,
    number: PropTypes.string.isRequired
}

export default IntroNav

