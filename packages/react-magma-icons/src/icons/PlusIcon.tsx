import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M27.12,10.5H17.5V.88A.87.87,0,0,0,16.62,0H11.38a.87.87,0,0,0-.88.88V10.5H.88a.87.87,0,0,0-.88.88v5.24a.87.87,0,0,0,.88.88H10.5v9.62a.87.87,0,0,0,.88.88h5.24a.87.87,0,0,0,.88-.88V17.5h9.62a.87.87,0,0,0,.88-.88V11.38A.87.87,0,0,0,27.12,10.5Z',
    },
  ],
};

export const PlusIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
