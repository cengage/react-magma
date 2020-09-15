import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 33.72 23.69',
  paths: [
    {
      d:
        'M36.56,3.8V23.94A1.11,1.11,0,0,1,35.83,25a1.39,1.39,0,0,1-.47.09,1.15,1.15,0,0,1-.85-.35l-7.58-7.46v3.07a5.09,5.09,0,0,1-1.59,3.77,5.29,5.29,0,0,1-3.83,1.57H8.26a5.29,5.29,0,0,1-3.83-1.57,5.09,5.09,0,0,1-1.59-3.77v-13A5.09,5.09,0,0,1,4.43,3.59,5.25,5.25,0,0,1,8.26,2H21.51a5.25,5.25,0,0,1,3.83,1.57,5.07,5.07,0,0,1,1.59,3.76v3.06L34.51,3a1.13,1.13,0,0,1,.85-.36,1.42,1.42,0,0,1,.47.1A1.1,1.1,0,0,1,36.56,3.8Z',
      transform: 'translate(-2.84 -2.02)'
    }
  ]
};

export const VideoCameraIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
