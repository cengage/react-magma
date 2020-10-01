import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 24.5',
  paths: [
    {
      d:
        'M14,1.75a14,14,0,0,0-9.9,4.1L0,1.75v10.5H10.5L6.57,8.33A10.5,10.5,0,1,1,20.94,23.62l2.32,2.63A14,14,0,0,0,14,1.75Z',
      transform: 'translate(0 -1.75)',
    },
  ],
};

export const UndoIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
