import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M14,2A12,12,0,1,0,26,14,12,12,0,0,0,14,2Zm0,21.68A9.68,9.68,0,1,1,23.68,14,9.68,9.68,0,0,1,14,23.68ZM18.42,8.57l-1.61,6.67a1.26,1.26,0,0,1-.33.57l-5,4.73a1.16,1.16,0,0,1-1.93-1.11l1.62-6.67a1.16,1.16,0,0,1,.32-.57l5-4.73a1.16,1.16,0,0,1,1.93,1.11ZM14,12.45A1.55,1.55,0,1,0,15.55,14,1.55,1.55,0,0,0,14,12.45Z',
      transform: 'translate(-2 -2)',
    },
  ],
};

export const CompassIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
