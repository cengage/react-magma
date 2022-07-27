import React from 'react';
import styled from '@emotion/styled';
import { ProgressBarDirection, ProgressBarProps } from '../ProgressBar';
import { useDimensions } from '../../hooks/useDimensions';

export interface MarkerProps extends ProgressBarProps {
  dimensions: DOMRect;
  label?: string;
  percentage: number;
  trackLength: number;
  isInverse?: boolean;
  theme?: any;
}

const getAlignment = ({ dimensions, percentage, trackLength }: MarkerProps) => {
  const position = (trackLength * percentage) / 100;
  const width = dimensions.width / 2;
  // console.log(position, width);

  return width > position
    ? 'calc(0% + 2px)'
    : width > trackLength - position
    ? 'calc(100% - 7px)'
    : '50%';
};

const getMargin = ({ dimensions, percentage, trackLength }: MarkerProps) => {
  const position = (trackLength * percentage) / 100;
  const width = dimensions.width / 2;
  // console.log(position, width);

  return width > position
    ? 0
    : width > trackLength - position
    ? dimensions.width * -1
    : dimensions.width / -2;
};

export const StyledMarker = styled.div<MarkerProps>`
  position: absolute;
  left: ${props =>
    props.direction === ProgressBarDirection.vertical
      ? '0'
      : props.percentage}%;
  margin-left: ${props =>
    props.direction === ProgressBarDirection.vertical
      ? '0'
      : getMargin(props)}px;
  margin-bottom: ${props =>
    props.direction === ProgressBarDirection.vertical
      ? getMargin(props)
      : '-24'}px;
  bottom: ${props =>
    props.direction === ProgressBarDirection.vertical
      ? `calc(${props.percentage}% - 12px);`
      : '0'}%;
  &:before {
    content: '';
    position: absolute;
    height: 4px;
    width: 4px;
    background: ${props =>
      props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.neutral700};
    border-radius: 4px;
    left: ${props =>
      props.direction === ProgressBarDirection.vertical
        ? '2px'
        : getAlignment(props)};
    top: ${props =>
      props.direction === ProgressBarDirection.vertical ? '10px' : '-4px'};
    transform: translate(-${props => getAlignment(props)}, 0);
  }
`;
export const StyledMarkerLabel = styled.div<ProgressBarProps>`
  font-size: 14px;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  margin: ${props =>
    props.direction === ProgressBarDirection.vertical
      ? '0 0 0 18px'
      : '2px 0 0 0'};
`;

export const Marker = ({
  direction,
  isInverse,
  theme,
  label,
  ...rest
}: MarkerProps) => {
  const [handleRef, handleDimensions] = useDimensions<HTMLDivElement>();

  return (
    <StyledMarker
      ref={handleRef}
      dimensions={handleDimensions}
      direction={direction}
      isInverse={isInverse}
      theme={theme}
      {...rest}
    >
      <StyledMarkerLabel
        direction={direction}
        isInverse={isInverse}
        theme={theme}
      >
        {label}
      </StyledMarkerLabel>
    </StyledMarker>
  );
};
