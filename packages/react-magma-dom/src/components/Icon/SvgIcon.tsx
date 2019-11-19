import * as React from 'react';
import { useGenerateId } from '../utils';

const defaultSize = 24;

interface Path {
  d: string;
  transform?: string;
}

interface SvgIconProps {
  id: string;
  testId?: string;
  title?: string;
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

export const SvgIcon: React.FunctionComponent<SvgIconProps> = (
  props: SvgIconProps
) => {
  const id = useGenerateId(props.id);

  const { color, size, title, testId, viewBox, paths } = props;

  return (
    <svg
      className="icon"
      height={size || defaultSize}
      width={size || defaultSize}
      fill={color || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      aria-labelledby={title ? id : null}
      data-testid={testId}
    >
      {title && <title id={id}>{title}</title>}
      {renderPaths(paths)}
    </svg>
  );
};
