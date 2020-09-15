import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M14,0A13.91,13.91,0,0,0,0,14,13.91,13.91,0,0,0,14,28,13.91,13.91,0,0,0,28,14,13.91,13.91,0,0,0,14,0Zm-.31,13.69h4.38v5.73a13.29,13.29,0,0,1-2,.49,13.35,13.35,0,0,1-1.92.14,4.86,4.86,0,0,1-3.82-1.47A6.12,6.12,0,0,1,9,14.36a5.54,5.54,0,0,1,1.53-4.17,5.82,5.82,0,0,1,4.25-1.5,8.31,8.31,0,0,1,3.28.68l-.78,1.87a5.63,5.63,0,0,0-2.52-.6,3.11,3.11,0,0,0-2.43,1,4,4,0,0,0-.92,2.74,4.42,4.42,0,0,0,.74,2.75,2.56,2.56,0,0,0,2.14,1A7.61,7.61,0,0,0,15.78,18V15.64H13.69Z'
    }
  ]
};

export const CountsTowardsGradeIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
