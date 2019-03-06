import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 22.75","paths":[{"d":"M28,14.88l-3.5-7H19.25V4.38A1.76,1.76,0,0,0,17.5,2.62H1.75A1.76,1.76,0,0,0,0,4.38v14l1.75,1.74H4a3.5,3.5,0,1,0,6.06,0h9.69a3.5,3.5,0,1,0,6.06,0H28V14.88Zm-8.75,0V9.62h3.63l2.62,5.26Z","transform":"translate(0 -2.63)"}]}
  
  export const TruckIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);