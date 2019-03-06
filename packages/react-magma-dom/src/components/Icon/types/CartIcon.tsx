import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 26.25","paths":[{"d":"M10.5,25.38a2.63,2.63,0,1,1-2.62-2.63A2.62,2.62,0,0,1,10.5,25.38Z","transform":"translate(0 -1.75)"},{"d":"M28,25.38a2.63,2.63,0,1,1-2.62-2.63A2.62,2.62,0,0,1,28,25.38Z","transform":"translate(0 -1.75)"},{"d":"M28,14V3.5H7A1.75,1.75,0,0,0,5.25,1.75H0V3.5H3.5L4.82,14.77A3.46,3.46,0,0,0,3.5,17.5,3.5,3.5,0,0,0,7,21H28V19.25H7A1.75,1.75,0,0,1,5.25,17.5v0Z","transform":"translate(0 -1.75)"}]}
  
  export const CartIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);