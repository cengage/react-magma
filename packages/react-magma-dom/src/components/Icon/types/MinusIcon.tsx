import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 28 7',
  paths: [
    {
      d:
        'M0,11.38v5.24a.87.87,0,0,0,.88.88H27.12a.87.87,0,0,0,.88-.88V11.38a.87.87,0,0,0-.88-.88H.88A.87.87,0,0,0,0,11.38Z',
      transform: 'translate(0 -10.5)'
    }
  ]
};

export const MinusIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
