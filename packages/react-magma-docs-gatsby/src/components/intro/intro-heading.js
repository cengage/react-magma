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

const IntroHeading = ({ name, number }) => (
    <StyledHeading>
        <HeadingNum>{number}</HeadingNum>
        {name}
    </StyledHeading>
);

IntroHeading.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
}

export default IntroHeading

