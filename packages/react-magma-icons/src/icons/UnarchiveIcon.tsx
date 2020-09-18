import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M27.3,3.45,25.14.84A2.38,2.38,0,0,0,23.33,0H4.67A2.26,2.26,0,0,0,2.88.86L.72,3.46a3,3,0,0,0-.72,2V24.89A3.11,3.11,0,0,0,3.11,28H24.89A3.12,3.12,0,0,0,28,24.89V5.45a3.22,3.22,0,0,0-.7-2ZM14,10.11l8.56,8.56H17.11v3.11H10.89V18.67H5.45Zm-10.7-7L4.57,1.56H23.24l1.45,1.55Z',
      transform: 'translate(0 0)'
    }
  ]
};

export const UnarchiveIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
