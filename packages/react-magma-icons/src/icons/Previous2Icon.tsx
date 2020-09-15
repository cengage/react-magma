import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 12.25 21',
  paths: [
    {
      d: 'M7.88,24.5V3.5h3.5v9.62l8.74-8.74V23.62l-8.74-8.74V24.5Z',
      transform: 'translate(-7.88 -3.5)'
    }
  ]
};

export const Previous2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
