import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3c2.7614 0 5 2.2386 5 5s-2.2386 5-5 5-5-2.2386-5-5 2.2386-5 5-5z',
    },
  ],
  circles: [],
};

export const RadioButtonCheckedIcon = (props: IconProps) =>
  renderIcon(props, iconType);
