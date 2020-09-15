import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 40 40',
  paths: [
    {
      d:
        'M0,13.5016667 L0,26.5016667 L8.66666667,26.5016667 L19.5,37.335 L19.5,2.66833333 L8.66666667,13.5016667 L0,13.5016667 Z M29.25,20.0016667 C29.25,16.1666667 27.04,12.8733333 23.8333333,11.27 L23.8333333,28.7116667 C27.04,27.13 29.25,23.8366667 29.25,20.0016667 Z'
    }
  ]
};

export const VolumeDownIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
