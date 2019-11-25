import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 40 40',
  paths: [
    {
      d:
        'M36,4 L4,4 C1.8,4 0.02,5.8 0.02,8 L0,32 C0,34.2 1.8,36 4,36 L36,36 C38.2,36 40,34.2 40,32 L40,8 C40,5.8 38.2,4 36,4 Z M26,32 L4,32 L4,24 L26,24 L26,32 Z M26,22 L4,22 L4,14 L26,14 L26,22 Z M36,32 L28,32 L28,14 L36,14 L36,32 Z'
    }
  ]
};

export const CourseIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
