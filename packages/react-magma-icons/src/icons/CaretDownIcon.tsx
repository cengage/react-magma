import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 16 9',
  paths: [
    {
      d:
        'M16,10.5a.94.94,0,0,1-.3.7l-7,7a1,1,0,0,1-.7.3.94.94,0,0,1-.7-.3l-7-7a1,1,0,0,1,0-1.4A.94.94,0,0,1,1,9.5H15a1,1,0,0,1,.7.3A.94.94,0,0,1,16,10.5Z',
      transform: 'translate(0 -9.5)'
    }
  ]
};

export const CaretDownIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
