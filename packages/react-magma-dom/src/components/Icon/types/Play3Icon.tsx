import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 17.5 21","paths":[{"d":"M5.25,3.5,22.75,14,5.25,24.5Z","transform":"translate(-5.25 -3.5)"}]}
  
  export const Play3Icon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);