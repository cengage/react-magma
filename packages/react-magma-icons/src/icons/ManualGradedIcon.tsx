import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M14,0A13.91,13.91,0,0,0,0,14,13.91,13.91,0,0,0,14,28,13.91,13.91,0,0,0,28,14,13.91,13.91,0,0,0,14,0Zm5.8,19.4h-2V10.8L15,19.4H12.8l-2.6-8.6v8.6h-2V8.6h3.2L14,17l2.8-8.4H20V19.4Z'
    }
  ]
};

export const ManualGradedIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
