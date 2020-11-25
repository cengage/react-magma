import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { magma } from 'react-magma-dom';

const SwatchContainer = styled.div`
  width: 200px;
  margin: 0 ${magma.spaceScale.spacing05} ${magma.spaceScale.spacing05} 0;
  border: 1px solid ${magma.colors.neutral06};
  border-radius: ${magma.borderRadius};
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 6px 0px;

  @media (max-width: ${magma.breakpoints.small}px) {
    width: 100%;
    margin: ${magma.spaceScale.spacing03};
  }
`;

const SwatchColor = styled.div`
  background: ${props => props.color};
  height: 100px;
`;

const ColorDetails = styled.div`
  color: ${magma.colors.neutral};
  border-top: 1px solid ${magma.colors.neutral06};
  font-size: ${magma.typeScale.size01.fontSize};
  line-height: ${magma.typeScale.size01.lineHeight};
  padding: ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing05};
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: ${magma.spaceScale.spacing02};
  }

  span:last-of-type {
    margin-bottom: 0;
  }
`;

const ColorSwatch = ({ children, color }) => (
  <SwatchContainer>
    <SwatchColor color={color}></SwatchColor>
    <ColorDetails>{children}</ColorDetails>
  </SwatchContainer>
);

ColorSwatch.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.any.isRequired,
};

export default ColorSwatch;
