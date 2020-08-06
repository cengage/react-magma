import * as React from 'react';
import { SvgIcon } from './SvgIcon';

export interface IconProps {
  color?: string;
  id?: string;
  size?: number;
  style?: React.CSSProperties;
  testId?: string;
  title?: string;
}

export function renderIcon(props: IconProps, iconType: any) {
  const { id, testId, title, color, size, style } = props;

  return iconType ? (
    <SvgIcon
      id={id}
      testId={testId}
      title={title}
      color={color}
      size={size}
      style={style}
      {...iconType}
    />
  ) : null;
}
