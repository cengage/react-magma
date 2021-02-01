import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M4.78 15.27l2.54-.29c.61-.07 1.21.14 1.64.57l1.84 1.84c2.83-1.44 5.15-3.75 6.59-6.59l-1.85-1.85c-.43-.43-.64-1.03-.57-1.64l.29-2.52c.12-1.01.97-1.77 1.99-1.77h1.73c1.13 0 2.07.94 2 2.07-.53 8.54-7.36 15.36-15.89 15.89-1.13.07-2.0701-.87-2.0701-2v-1.73C3.01 16.24 3.77 15.39 4.78 15.27z',
    },
  ],
  circles: [],
};

export const PhoneEnabledIcon = (props: IconProps) =>
  renderIcon(props, iconType);
