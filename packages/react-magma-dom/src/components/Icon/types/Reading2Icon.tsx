import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 25.3 17.51","paths":[{"d":"M4.43,9.24h7v1.62h-7Z","transform":"translate(-0.97 -5.24)"},{"d":"M4.43,13h7v1.62h-7Z","transform":"translate(-0.97 -5.24)"},{"d":"M4.43,16.92h7v1.62h-7Z","transform":"translate(-0.97 -5.24)"},{"d":"M15.67,9.24h7v1.62h-7Z","transform":"translate(-0.97 -5.24)"},{"d":"M15.67,13h7v1.62h-7Z","transform":"translate(-0.97 -5.24)"},{"d":"M15.67,16.92h7v1.62h-7Z","transform":"translate(-0.97 -5.24)"},{"d":"M1,5.24V22.76h25.3V5.24Zm1.62,15.9V6.86H13.08V21.14Zm22.06,0H14.05V6.86h10.6Z","transform":"translate(-0.97 -5.24)"}]}
  
  export const Reading2Icon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);