import * as React from 'react';

const defaultSize = 24;

interface SvgIconProps {
  id: string;
  title: string;
  viewBox: string;
  d: string;
  transform: string;
  color?: string;
  size?: number;
}

export const SvgIcon: React.SFC<SvgIconProps> = ({
  color,
  size,
  id,
  title,
  viewBox,
  d,
  transform
}): JSX.Element => (
  <svg
    className="icon"
    height={size || defaultSize}
    width={size || defaultSize}
    fill={color || 'currentColor'}
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewBox}
    aria-labelledby={id}
  >
    <title id={id}>{title}</title>
    <path d={d} transform={transform} />
  </svg>
);

export default SvgIcon;
