import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 21 21',
  paths: [
    {
      d: 'M3.5,3.5h8.75v21H3.5Zm12.25,0H24.5v21H15.75Z',
      transform: 'translate(-3.5 -3.5)',
    },
  ],
};

export const Pause2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
