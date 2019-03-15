import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 24.5 19.25","paths":[{"d":"M1.75,4.38h24.5V9.62H1.75Zm0,7h24.5v5.24H1.75Zm0,7h24.5v5.24H1.75Z","transform":"translate(-1.75 -4.38)"}]}
  
  export const MenuIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);