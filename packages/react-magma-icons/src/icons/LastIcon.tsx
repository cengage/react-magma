import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 21 21',
  paths: [
    {
      d:
        'M24.5,3.5v21H21V14.88l-8.75,8.74V14.88L3.5,23.62V4.38l8.75,8.74V4.38L21,13.12V3.5Z',
      transform: 'translate(-3.5 -3.5)',
    },
  ],
};

export const LastIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
