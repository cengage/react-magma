import * as React from 'react';
import { SvgIcon } from './SvgIcon';

export interface IconProps {
  id?: string;
  title?: string;
  color?: string;
  size?: number;
}

export function renderIcon(props: IconProps, iconType: any) {
  const { id, title, color, size } = props;

  return iconType ? (
    <SvgIcon id={id} title={title} color={color} size={size} {...iconType} />
  ) : null;
}
