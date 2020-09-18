import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M14,0A14,14,0,1,0,28,14,14,14,0,0,0,14,0Zm0,25.38A11.38,11.38,0,1,1,25.38,14,11.39,11.39,0,0,1,14,25.38Z'
    },
    { d: 'M12.25,14l7-5.25v10.5Z' },
    { d: 'M8.75,8.75h3.5v10.5H8.75Z' }
  ]
};

export const PreviousIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
