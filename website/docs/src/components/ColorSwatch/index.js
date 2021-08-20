import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { magma, useIsInverse } from '@react-magma/dom';

const SwatchContainer = styled.div`
  border: 1px solid
    ${props =>
      props.isInverse ? magma.colors.borderInverse : magma.colors.border};
  border-radius: ${magma.borderRadius};
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 6px 0px;
  margin: 0 ${magma.spaceScale.spacing06} ${magma.spaceScale.spacing06} 0;
  overflow: hidden;
  width: 200px;

  @media (max-width: ${magma.breakpoints.small}px) {
    margin-right: 0;
    width: 100%;
  }
`;

const SwatchColor = styled.div`
  background: ${props => props.color};
  height: 100px;
`;

const ColorDetails = styled.div`
  border-top: 1px solid
    ${props =>
      props.isInverse ? magma.colors.borderInverse : magma.colors.border};
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

export const ColorSwatch = ({ children, color }) => {
  const isInverse = useIsInverse();
  return (
    <SwatchContainer isInverse={isInverse}>
      <SwatchColor color={color}></SwatchColor>
      <ColorDetails isInverse={isInverse}>{children}</ColorDetails>
    </SwatchContainer>
  );
};

ColorSwatch.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.any.isRequired,
};
