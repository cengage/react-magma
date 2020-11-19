import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IconProps } from './iconProps';

const defaultSize = 24;

interface Path {
  d: string;
  transform?: string;
}

export interface SvgIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  id: string;
  testId?: string;
  title?: string;
  viewBox: string;
  paths: Path[];
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

function renderPaths(paths: Path[]) {
  return paths.map(({ d, transform }, index) => (
    <path key={index} d={d} transform={transform} />
  ));
}

export const SvgIcon: React.FunctionComponent<SvgIconProps> = (
  props: SvgIconProps
) => {
  const { color, id: defaultId, size, title, testId, paths, ...other } = props;
  const id = useGenerateId(defaultId);

  return (
    <svg
      {...other}
      className="icon"
      height={size || defaultSize}
      width={size || defaultSize}
      fill={color || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={title ? id : undefined}
      data-testid={testId}
    >
      {title && <title id={id}>{title}</title>}
      {renderPaths(paths)}
    </svg>
  );
};

export function renderIcon(props: IconProps, iconType: any) {
  return iconType ? <SvgIcon {...props} {...iconType} /> : null;
}
