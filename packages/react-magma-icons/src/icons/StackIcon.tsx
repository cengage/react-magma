import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 24.5',
  paths: [
    {
      d:
        'M28,8.75l-14-7-14,7,14,7ZM14,4.07l9.35,4.68L14,13.43,4.65,8.75ZM25.2,12.6,28,14,14,21,0,14l2.8-1.4L14,18.2Zm0,5.25,2.8,1.4-14,7-14-7,2.8-1.4L14,23.45Z',
      transform: 'translate(0 -1.75)'
    }
  ]
};

export const StackIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
