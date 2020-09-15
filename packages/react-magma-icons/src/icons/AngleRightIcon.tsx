import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 9.09 15.59',
  paths: [
    {
      d:
        'M9.55,14a.46.46,0,0,1-.16.36L2.11,21.64a.5.5,0,0,1-.36.16.5.5,0,0,1-.35-.16l-.79-.78a.51.51,0,0,1,0-.72L6.76,14,.61,7.86A.49.49,0,0,1,.46,7.5a.51.51,0,0,1,.15-.36l.79-.78a.5.5,0,0,1,.35-.16.5.5,0,0,1,.36.16l7.28,7.28A.46.46,0,0,1,9.55,14Z',
      transform: 'translate(-0.46 -6.2)'
    }
  ]
};

export const AngleRightIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
