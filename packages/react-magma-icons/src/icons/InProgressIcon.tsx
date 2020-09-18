import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M14,0A13.91,13.91,0,0,1,28,14,13.91,13.91,0,0,1,14,28,13.91,13.91,0,0,1,0,14,13.91,13.91,0,0,1,14,0Zm5.16,14.37a2.58,2.58,0,1,0,2.58-2.58A2.58,2.58,0,0,0,19.16,14.37Zm-2.58,0A2.58,2.58,0,1,0,14,17,2.59,2.59,0,0,0,16.58,14.37Zm-7.74,0A2.58,2.58,0,1,0,6.26,17,2.58,2.58,0,0,0,8.84,14.37Z'
    }
  ]
};

export const InProgressIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
