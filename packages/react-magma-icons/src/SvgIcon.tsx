import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IconProps } from './IconProps';

interface Path {
  d: string;
  transform?: string;
}
interface Circle {
  cx: number;
  cy: number;
  r: number;
}

export interface SvgIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  id: string;
  testId?: string;
  title?: string;
  viewBox: string;
  paths?: Path[];
  circles?: Circle[];
  style?: React.CSSProperties;
  color?: string;
  size?: number;
}

function generateId(id?: string) {
  return id ? id : uuidv4();
}

function useGenerateId(newId?: string) {
  const [id, updateId] = React.useState<string>(generateId(newId));
  React.useEffect(() => {
    newId && updateId(generateId(newId));
  }, [newId]);
  return id;
}

function renderPaths(paths: Path[] = []) {
  return paths
    .filter(a => a)
    .map(({ d, transform }, index) => (
      <path key={index} d={d} transform={transform} />
    ));
}

function renderCircles(circles: Circle[] = []) {
  return circles
    .filter(a => a)
    .map(({ cx, cy, r }, index) => (
      <circle key={index} cx={cx} cy={cy} r={r} />
    ));
}

export const SvgIcon = ({
  color = 'currentColor',
  size = 24,
  id: defaultId,
  title,
  testId,
  paths = [],
  circles = [],
  ...other
}: SvgIconProps) => {
  const id = useGenerateId(defaultId);

  return (
    <svg
      {...other}
      className="icon"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      height={size}
      width={size}
      aria-labelledby={title ? id : undefined}
      data-testid={testId}
    >
      {title && <title id={id}>{title}</title>}
      {paths.length !== 0 && renderPaths(paths)}
      {circles.length !== 0 && renderCircles(circles)}
    </svg>
  );
};

export function renderIcon(props: IconProps, iconType: any) {
  return iconType ? <SvgIcon {...props} {...iconType} /> : null;
}
