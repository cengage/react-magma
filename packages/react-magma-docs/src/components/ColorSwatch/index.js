import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const SwatchContainer = styled.div`
  width: 200px;
  margin: 0 20px 20px 0;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 6px 0px;

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
  color: #3f3f3f;
  border-top: 1px solid #dfdfdf;
  font-size: 13px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 5px;
  }

  span:last-of-type {
    margin-bottom: 0;
  }
`;

export const ColorSwatch = ({ children, color }) => (
  <SwatchContainer>
    <SwatchColor color={color}></SwatchColor>
    <ColorDetails>{children}</ColorDetails>
  </SwatchContainer>
);

ColorSwatch.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.any.isRequired,
};
