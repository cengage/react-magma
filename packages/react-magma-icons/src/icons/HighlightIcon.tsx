import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 18.06 18.17',
  paths: [
    {
      d:
        'M10.2,5.55,5.6,10.14a1.87,1.87,0,0,0,0,2.64l9.7,9.69a2.67,2.67,0,0,0,2,.71h5.85V17.27a2.74,2.74,0,0,0-.63-2L12.82,5.58A1.82,1.82,0,0,0,10.2,5.55Z',
      transform: 'translate(-5.07 -5.01)',
    },
  ],
};

export const HighlightIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
