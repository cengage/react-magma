import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 24.42 24.42","paths":[{"d":"M14.84,10.1,9.67,5.42l1.86-1.86L9.32,1.79,1.56,9.56l1.77,2.2L5.18,9.9l4.74,5.24c-2.7,4.13.82,8.42.82,8.42l5.63-5.63,7.45,7.45,2.15.83-.82-2.16L17.69,16.6,23.33,11s-4.72-3.59-8.49-.87Z","transform":"translate(-1.56 -1.79)"}]}
  
  export const PinIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);