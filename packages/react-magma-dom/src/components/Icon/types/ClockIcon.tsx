import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 21.13 21.13","paths":[{"d":"M13.62,3.43A10.57,10.57,0,1,0,24.18,14,10.57,10.57,0,0,0,13.62,3.43ZM14.45,23V20.64H12.58V23A9,9,0,0,1,4.65,15H7V13.17H4.65A9.08,9.08,0,0,1,12.58,5V7.57h1.87V5a9.2,9.2,0,0,1,8.14,8.14H20.05V15h2.54A9.1,9.1,0,0,1,14.45,23Z","transform":"translate(-3.05 -3.43)"},{"d":"M14.45,9.54H12.58v4.85l1.92,1.86,3.08,3.05L18.85,18l-4.4-4.36Z","transform":"translate(-3.05 -3.43)"}]}
  
  export const ClockIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);