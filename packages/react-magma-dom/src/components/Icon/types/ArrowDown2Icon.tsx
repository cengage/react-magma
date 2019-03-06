import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 21 24.5","paths":[{"d":"M24,16.9l-8.75,8.75a1.74,1.74,0,0,1-2.48,0L4,16.9a1.75,1.75,0,1,1,2.48-2.47l5.76,5.76V3.42a1.75,1.75,0,0,1,3.5,0V20.19l5.76-5.76a1.76,1.76,0,0,1,1.24-.52,1.72,1.72,0,0,1,1.24.52A1.75,1.75,0,0,1,24,16.9Z","transform":"translate(-3.5 -1.67)"}]}
  
  export const ArrowDown2Icon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);