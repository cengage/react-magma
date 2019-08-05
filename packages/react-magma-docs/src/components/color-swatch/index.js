import React from 'react'
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const SwatchContainer = styled.div`
    width: 150px;
    margin: 0 10px 10px 0;
    border: 1px solid #dfdfdf;

    @media (max-width: 400px) {
        width: 100%;
        margin-right: 0;
    }
`;

const SwatchColor = styled.div`
    background: ${props => props.color};
    height: 100px;
`;

const ColorDetails = styled.div`
    height: 116px;
    background: #fff;
    color: #3f3f3f;
    border-top: 1px solid #dfdfdf;
    font-size: 13px;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;

    span {
      margin-bottom: 5px;
    }

    span:last-of-type {
      margin-bottom: 0;
    }
`;

const ColorSwatch = ({ children, color }) => (
  <SwatchContainer>
    <SwatchColor color={color}></SwatchColor>
    <ColorDetails>
        {children}
    </ColorDetails>
  </SwatchContainer>
);

ColorSwatch.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.any.isRequired
  }

export default ColorSwatch
