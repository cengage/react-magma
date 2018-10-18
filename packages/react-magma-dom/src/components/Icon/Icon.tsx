import * as React from 'react';
// import { IconMap } from './IconMap';
import { ICONS } from './types/icons';
import { SvgIcon } from './SvgIcon';
const styled = require('styled-components').default;

export interface IconProps {
  id: string;
  title: string;
  type: string;
  color?: string;
  size?: number;
}

function renderIcon(props) {
  const { id, title, type, color, size } = props;
  const iconType = ICONS[type];

  return iconType ? (
    <span className={type}>
      <SvgIcon id={id} title={title} color={color} size={size} {...iconType} />
    </span>
  ) : null;
}

export const Icon: React.SFC<IconProps> = (props: IconProps): JSX.Element =>
  renderIcon(props);

export default Icon;
