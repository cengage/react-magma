import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 17 11',
  paths: [
    {
      d:
        'M7.44166667,13.1416667 L3.8,9.5 L7.44166667,5.85833333 L6.33333333,4.75 L1.58333333,9.5 L6.33333333,14.25 L7.44166667,13.1416667 Z M11.5583333,13.1416667 L15.2,9.5 L11.5583333,5.85833333 L12.6666667,4.75 L17.4166667,9.5 L12.6666667,14.25 L11.5583333,13.1416667 L11.5583333,13.1416667 Z',
      transform: 'translate(0 -4)'
    }
  ]
};

export const CodeIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
