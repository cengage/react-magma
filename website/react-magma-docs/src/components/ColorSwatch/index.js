import React from 'react';

import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { magma, useIsInverse } from 'react-magma-dom';

export const ColorRampGrid = styled.div`
  display: grid;
  gap: 48px 32px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 32px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${magma.breakpoints.small}px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Ramp = styled.section`
  min-width: 0;
`;

const RampHeading = styled.h3`
  color: ${props =>
    props.isInverse ? magma.colors.neutral0 : magma.colors.brand.navy};
  font-family: ${magma.headingFont};
  font-size: ${magma.typographyVisualStyles.headingXSmall.mobile.fontSize};
  font-weight: ${magma.typographyVisualStyles.headingXSmall.fontWeight};
  line-height: ${magma.typographyVisualStyles.headingXSmall.mobile.lineHeight};
  margin: 0 0 24px;

  @media (min-width: ${magma.breakpoints.small}px) {
    font-size: ${magma.typographyVisualStyles.headingXSmall.desktop.fontSize};
    line-height: ${magma.typographyVisualStyles.headingXSmall.desktop
      .lineHeight};
  }
`;

const RampList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const RampItem = styled.li`
  align-items: center;
  display: grid;
  gap: 16px;
  grid-template-columns: 56px minmax(0, 1fr);

  && {
    margin: 0;
  }
`;

const SwatchColor = styled.div`
  background: ${props => props.color};
  border: 1px solid
    ${props =>
      props.isInverse ? magma.colors.neutral800 : magma.colors.neutral200};
  border-radius: 8px;
  box-sizing: border-box;
  height: 56px;
  width: 56px;
`;

const ColorDetails = styled.div`
  min-width: 0;
`;

const Shade = styled.p`
  color: ${props =>
    props.isInverse ? magma.colors.neutral0 : magma.colors.brand.navy};
  font-size: ${magma.typeScale.size02.fontSize};
  font-weight: 600;
  line-height: ${magma.typeScale.size02.lineHeight};
  margin: 0;
`;

const ColorValue = styled.p`
  color: ${props =>
    props.isInverse ? magma.colors.neutral300 : magma.colors.neutral700};
  font-size: ${magma.typeScale.size02.fontSize};
  line-height: ${magma.typeScale.size02.lineHeight};
  margin: 0;
`;

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  const normalized =
    value.length === 3
      ? value
          .split('')
          .map(character => `${character}${character}`)
          .join('')
      : value;
  const number = Number.parseInt(normalized, 16);

  return `${(number >> 16) & 255}, ${(number >> 8) & 255}, ${number & 255}`;
}

const brandColors = [
  { name: 'sky-blue', color: magma.colors.brand.cyan },
  { name: 'ocean-teal', color: magma.colors.brand.cyanDeep },
  { name: 'electric-cyan', color: magma.colors.brand.cyanElectric },
  { name: 'sunrise-orange', color: magma.colors.brand.sunriseOrange },
  {
    name: 'gale-orange',
    color: magma.colors.brand.galeOrange || '#F03500',
  },
  { name: 'navy', color: magma.colors.brand.navy },
];

export const BrandColorRamp = () => {
  const isInverse = useIsInverse();

  return (
    <Ramp aria-labelledby="brand-color-ramp">
      <RampHeading id="brand-color-ramp" isInverse={isInverse}>
        Brand
      </RampHeading>
      <RampList>
        {brandColors.map(({ color, name }) => (
          <RampItem key={name}>
            <SwatchColor aria-hidden color={color} isInverse={isInverse} />
            <ColorDetails>
              <Shade isInverse={isInverse}>{name}</Shade>
              <ColorValue isInverse={isInverse}>
                {color.toUpperCase()}
              </ColorValue>
              <ColorValue isInverse={isInverse}>{hexToRgb(color)}</ColorValue>
            </ColorDetails>
          </RampItem>
        ))}
      </RampList>
    </Ramp>
  );
};

export const ColorRamp = ({ colorPrefix, name, shades }) => {
  const isInverse = useIsInverse();

  return (
    <Ramp aria-labelledby={`${colorPrefix}-color-ramp`}>
      <RampHeading id={`${colorPrefix}-color-ramp`} isInverse={isInverse}>
        {name}
      </RampHeading>
      <RampList>
        {shades.map(shade => {
          const color = magma.colors[`${colorPrefix}${shade}`];

          return (
            <RampItem key={shade}>
              <SwatchColor aria-hidden color={color} isInverse={isInverse} />
              <ColorDetails>
                <Shade isInverse={isInverse}>{shade}</Shade>
                <ColorValue isInverse={isInverse}>
                  {color.toUpperCase()}
                </ColorValue>
                <ColorValue isInverse={isInverse}>{hexToRgb(color)}</ColorValue>
              </ColorDetails>
            </RampItem>
          );
        })}
      </RampList>
    </Ramp>
  );
};

ColorRamp.propTypes = {
  colorPrefix: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  shades: PropTypes.arrayOf(PropTypes.number).isRequired,
};
