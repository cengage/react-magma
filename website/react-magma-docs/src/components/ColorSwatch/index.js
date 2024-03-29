import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {
  magma,
  useIsInverse,
  Badge,
  Paragraph,
  BadgeColor,
} from 'react-magma-dom';

const SwatchContainer = styled('div')`
  border: 1px solid
    ${props =>
      props.isInverse ? magma.colors.borderInverse : magma.colors.border};
  border-radius: ${magma.borderRadius};
  margin: 0 ${magma.spaceScale.spacing06} ${magma.spaceScale.spacing06} 0;
  overflow: hidden;
  background: ${magma.colors.neutral200};
  width: 240px;

  @media (max-width: ${magma.breakpoints.small}px) {
    margin-right: 0;
    width: 100%;
  }
`;

const SwatchColor = styled('div')`
  background: ${props => props.color};
  height: 88px;
  display: flex;
  justify-content: center;
`;

const ColorDetails = styled('div')`
  border-top: 1px solid
    ${props =>
      props.isInverse ? magma.colors.borderInverse : magma.colors.border};
  font-size: ${magma.typeScale.size01.fontSize};
  line-height: ${magma.typeScale.size01.lineHeight};
  padding: ${magma.spaceScale.spacing05};
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: ${magma.spaceScale.spacing02};
  }

  span:last-of-type {
    margin-bottom: 0;
  }
`;

const ColorTestContainer = styled('div')`
  flex: 0 0 auto;
  text-align: center;
  align-self: flex-end;
  margin: ${magma.spaceScale.spacing03};
`;

const ResultBadge = styled(Badge)`
  margin: 0;
  font-weight: 600;
`;

export const ColorSwatch = ({
  children,
  color,
  passesDarkTest,
  passesLightTest,
}) => {
  const isInverse = useIsInverse();
  return (
    <SwatchContainer isInverse={isInverse}>
      <SwatchColor color={color}>
        <ColorTestContainer>
          <Paragraph className="color-test-dark">A</Paragraph>
          <ResultBadge color={BadgeColor.secondary}>
            {passesDarkTest ? 'PASS' : 'FAIL'}
          </ResultBadge>
        </ColorTestContainer>
        <ColorTestContainer>
          <Paragraph className="color-test-light">A</Paragraph>
          <ResultBadge color={BadgeColor.secondary}>
            {passesLightTest ? 'PASS' : 'FAIL'}
          </ResultBadge>
        </ColorTestContainer>
      </SwatchColor>
      <ColorDetails isInverse={isInverse}>{children}</ColorDetails>
    </SwatchContainer>
  );
};

ColorSwatch.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.any.isRequired,
  // Whether the color swatch passes or fails contrast test
  passesDarkTest: PropTypes.bool,
  passesLightTest: PropTypes.bool,
};
