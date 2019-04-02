import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M28,0V11.38L23.62,7l-5.24,5.25L15.75,9.62,21,4.38,16.62,0ZM12.25,18.38,7,23.62,11.38,28H0V16.62L4.38,21l5.24-5.25Z'
    }
  ]
};

export const Enlarge2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
