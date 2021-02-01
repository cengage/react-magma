import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M9.6364 11.091h5.4545V5.6363H9.6364v5.4545zM6 22h3.6364v-7.2727h9.0909V2H6v20z',
    },
  ],
  circles: [],
};

export const WlPracticeItIcon = (props: IconProps) =>
  renderIcon(props, iconType);
