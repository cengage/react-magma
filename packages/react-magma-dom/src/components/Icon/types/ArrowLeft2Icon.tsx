import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 24.5 21","paths":[{"d":"M11.1,24,2.35,15.24a1.74,1.74,0,0,1,0-2.48L11.1,4a1.75,1.75,0,1,1,2.47,2.48L7.81,12.25H24.58a1.75,1.75,0,0,1,0,3.5H7.81l5.76,5.76a1.76,1.76,0,0,1,.52,1.24A1.72,1.72,0,0,1,13.57,24,1.75,1.75,0,0,1,11.1,24Z","transform":"translate(-1.84 -3.5)"}]}
  
  export const ArrowLeft2Icon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);