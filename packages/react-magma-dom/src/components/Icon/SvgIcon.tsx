import * as React from 'react';

const defaultSize = 24;

interface Path {
  d: string;
  transform?: string;
}

interface SvgIconProps {
  id: string;
  title: string;
  viewBox: string;
  paths: Path[];
  color?: string;
  size?: number;
}

function renderPaths(paths) {
  return paths.map(({ d, transform }, index) => (
    <path key={index} d={d} transform={transform} />
  ));
}

export const SvgIcon: React.SFC<SvgIconProps> = ({
  color,
  size,
  id,
  title,
  viewBox,
  paths
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
    {renderPaths(paths)}
  </svg>
);

export default SvgIcon;
