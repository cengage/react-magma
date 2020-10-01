import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 15.59 9.09',
  paths: [
    {
      d:
        'M16.79,17.25a.51.51,0,0,1-.15.36l-.78.78a.54.54,0,0,1-.36.16.5.5,0,0,1-.36-.16L9,12.25,2.86,18.39a.54.54,0,0,1-.36.16.5.5,0,0,1-.36-.16l-.78-.78a.48.48,0,0,1,0-.72L8.64,9.61A.5.5,0,0,1,9,9.45a.54.54,0,0,1,.36.16l7.28,7.28A.51.51,0,0,1,16.79,17.25Z',
      transform: 'translate(-1.2 -9.45)',
    },
  ],
};

export const AngleUpIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
