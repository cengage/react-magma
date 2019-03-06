import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 24.5 28","paths":[{"d":"M19.2,8.82,17.43,7.05,8.54,15.93a3.77,3.77,0,0,0,5.33,5.33L24.53,10.6a6.28,6.28,0,0,0-8.88-8.88L4.46,12.91l0,0A8.76,8.76,0,0,0,16.82,25.32l0,0h0l7.64-7.64-1.77-1.77-7.64,7.64,0,0a6.24,6.24,0,0,1-8.83-8.83l0,0h0L17.42,3.49a3.77,3.77,0,0,1,5.33,5.33L12.1,19.48a1.26,1.26,0,0,1-1.78-1.78L19.2,8.82Z","transform":"translate(-1.87 0.12)"}]}
  
  export const AttachmentIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);