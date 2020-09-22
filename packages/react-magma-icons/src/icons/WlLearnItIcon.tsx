import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 16.55 26',
  paths: [
    { d: 'M5.4,1H.65V27H17.19V22.29H5.4Z', transform: 'translate(-0.65 -1)' }
  ]
};

export const WlLearnItIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
