import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 15.59 9.09',
  paths: [
    {
      d:
        'M16.79,10.75a.49.49,0,0,1-.15.36L9.36,18.39a.54.54,0,0,1-.36.16.5.5,0,0,1-.36-.16L1.36,11.11a.49.49,0,0,1,0-.72l.78-.78a.5.5,0,0,1,.36-.16.54.54,0,0,1,.36.16L9,15.75l6.14-6.14a.5.5,0,0,1,.36-.16.54.54,0,0,1,.36.16l.78.78A.49.49,0,0,1,16.79,10.75Z',
      transform: 'translate(-1.2 -9.45)'
    }
  ]
};

export const AngleDownIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
