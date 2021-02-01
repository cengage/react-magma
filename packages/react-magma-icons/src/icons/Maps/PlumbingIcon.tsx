import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M8.32 5.99c.58-.59 1.53-.59 2.12 0l3.18 3.18.71-.71a.987.987 0 011.41.01l2.12 2.12c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0l-9.19 9.2c-.86.86-2.31.77-3.05-.26-.59-.81-.41-1.95.29-2.65l7-7-3.18-3.18c-.59-.58-.59-1.53 0-2.12zm-.36 3.18l2.12 2.13-2.47 2.47c-.58.59-1.53.59-2.12 0-.59-.59-.59-1.54 0-2.13l2.47-2.47zm6.37-6.36c.78-.78 2.05-.78 2.83 0l2.12 2.12c1.17 1.17 1.17 3.07 0 4.25l-3.54-3.54-2.12 2.12-2.12-2.12z',
    },
  ],
  circles: [],
};

export const PlumbingIcon = (props: IconProps) => renderIcon(props, iconType);
