import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    { d: 'M28,0H16.62L21,4.38,15.75,9.62l2.63,2.63L23.62,7,28,11.38Z' },
    { d: 'M28,28V16.62L23.62,21l-5.24-5.25-2.63,2.63L21,23.62,16.62,28Z' },
    { d: 'M0,28H11.38L7,23.62l5.25-5.24L9.62,15.75,4.38,21,0,16.62Z' },
    { d: 'M0,0V11.38L4.38,7l5.24,5.25,2.63-2.63L7,4.38,11.38,0Z' }
  ]
};

export const EnlargeIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
