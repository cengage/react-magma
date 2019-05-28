import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';

const StyledHeading = styled.h2`
   font-size: 36px;
   text-transform: uppercase;
`;

const HeadingNum = styled.span`
   display: block;
   font-size: 17px;
`;

const IntroHeading = ({ children, number }) => (
    <StyledHeading>
        <HeadingNum>{number}</HeadingNum>
        {children}
    </StyledHeading>
);

IntroHeading.propTypes = {
    children: PropTypes.node.isRequired,
    number: PropTypes.string.isRequired
}

export default IntroHeading

