import * as React from 'react';
import { SvgIcon } from './SvgIcon';

export interface IconProps {
  id?: string;
  testId?: string;
  title?: string;
  color?: string;
  size?: number;
}

export function renderIcon(props: IconProps, iconType: any) {
  const { id, testId, title, color, size } = props;

  return iconType ? (
    <SvgIcon
      id={id}
      testId={testId}
      title={title}
      color={color}
      size={size}
      {...iconType}
    />
  ) : null;
}
