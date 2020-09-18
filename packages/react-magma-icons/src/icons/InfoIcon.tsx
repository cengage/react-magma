import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 25.63 25.63',
  paths: [
    {
      d:
        'M15.26,10.15V7.56H12.74v2.59Zm0,10.29v-7.7H12.74v7.7ZM14,1.18A12.82,12.82,0,1,1,1.18,14,12.79,12.79,0,0,1,14,1.18Z',
      transform: 'translate(-1.18 -1.18)'
    }
  ]
};

export const InfoIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
