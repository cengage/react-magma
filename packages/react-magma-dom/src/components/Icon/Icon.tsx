import * as React from 'react';
import { IconMap } from './IconMap';
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
  const IconType = IconMap[type];

  return IconType ? (
    <span className={type}>
      <IconType id={id} title={title} color={color} size={size} />
    </span>
  ) : null;
}

export const Icon: React.SFC<IconProps> = (props: IconProps): JSX.Element =>
  renderIcon(props);

export default Icon;
