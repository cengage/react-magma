import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M14,0A14,14,0,1,1,0,14,14,14,0,0,1,14,0Zm0,25.38A11.38,11.38,0,1,0,2.62,14,11.39,11.39,0,0,0,14,25.38Z',
    },
    { d: 'M15.75,14l-7-5.25v10.5Z' },
    { d: 'M19.25,8.75h-3.5v10.5h3.5Z' },
  ],
};

export const NextIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
