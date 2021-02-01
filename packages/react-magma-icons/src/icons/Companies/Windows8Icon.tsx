import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M2.0073 11.3333L2 4.832l8-1.0867v7.588H2.0073zm9.326-7.7813L21.9973 2v9.3333h-10.664V3.552zM22 12.6667L21.9973 22l-10.664-1.5v-7.8333H22zM10 20.33l-7.9933-1.096-.0007-6.5673H10V20.33z',
    },
  ],
  circles: [],
};

export const Windows8Icon = (props: IconProps) => renderIcon(props, iconType);
