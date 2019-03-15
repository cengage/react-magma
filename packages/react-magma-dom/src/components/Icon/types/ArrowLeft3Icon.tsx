import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 23 24.34","paths":[{"d":"M23.5,13v2A2.07,2.07,0,0,1,23,16.41a1.67,1.67,0,0,1-1.32.59h-11l4.58,4.59a2,2,0,0,1,0,2.82l-1.17,1.18a1.92,1.92,0,0,1-1.41.58,2,2,0,0,1-1.42-.58L1.08,15.41A1.92,1.92,0,0,1,.5,14a2,2,0,0,1,.58-1.42L11.25,2.42a2,2,0,0,1,2.83,0l1.17,1.16A1.91,1.91,0,0,1,15.84,5a1.91,1.91,0,0,1-.59,1.42L10.67,11h11a1.67,1.67,0,0,1,1.32.59A2.07,2.07,0,0,1,23.5,13Z","transform":"translate(-0.5 -1.83)"}]}
  
  export const ArrowLeft3Icon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);