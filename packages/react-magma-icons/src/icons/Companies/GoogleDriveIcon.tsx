import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M10.9711 14.5489l-3.3327 5.7748h11.0281L22 14.5489H10.9711zm10.0832-1.6371L15.3331 3h-6.667l5.722 9.9118h6.6662zM7.7191 4.6407L2 14.5489l3.3335 5.7748 5.719-9.9083-3.3334-5.7747z',
    },
  ],
  circles: [],
};

export const GoogleDriveIcon = (props: IconProps) =>
  renderIcon(props, iconType);
