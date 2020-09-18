import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 23.6 28',
  paths: [
    {
      d:
        'M16.88,6.79V0l10.5,10.5L16.88,21V14.06C4.66,13.77,5.19,22.37,8.3,28,.62,19.7,2.25,6.41,16.88,6.79Z',
      transform: 'translate(-3.78)'
    }
  ]
};

export const ForwardIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
