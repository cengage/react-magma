import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';

const StyledHeading = styled.h2`
   font-size: 36px;
   text-align: center;
   text-transform: uppercase;

    @media (min-width: 600px) {
      text-align: left;
    }
`;

const HeadingNum = styled.span`
   display: block;
   font-family: 'Abel', sans-serif;
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

