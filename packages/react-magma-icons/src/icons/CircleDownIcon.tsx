import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M28,14A14,14,0,1,0,14,28,14,14,0,0,0,28,14ZM2.62,14A11.38,11.38,0,1,1,14,25.38,11.39,11.39,0,0,1,2.62,14Z'
    },
    { d: 'M8.68,9.7,6.2,12.17,14,20l7.8-7.8L19.32,9.7,14,15Z' }
  ]
};

export const CircleDownIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
