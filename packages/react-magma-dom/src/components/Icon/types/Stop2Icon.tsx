import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 21 21',
  paths: [{ d: 'M3.5,3.5h21v21H3.5Z', transform: 'translate(-3.5 -3.5)' }]
};

export const Stop2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
