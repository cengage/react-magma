import * as React from 'react';
import { ICONS } from './types/icons';
import { SvgIcon } from './SvgIcon';

export interface IconProps {
  id?: string;
  title?: string;
  type: string;
  color?: string;
  size?: number;
}

function renderIcon(props) {
  const { id, title, type, color, size } = props;
  const iconType = ICONS[type];

  return iconType ? (
    <SvgIcon id={id} title={title} color={color} size={size} {...iconType} />
  ) : null;
}

export const Icon: React.FunctionComponent<IconProps> = (props: IconProps) =>
  renderIcon(props);
